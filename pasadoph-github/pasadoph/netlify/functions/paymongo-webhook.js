// PasadoPH — PayMongo webhook: auto-grants premium after successful payment.
// Env vars required (set in Netlify → Site settings → Environment variables):
//   SUPABASE_URL              e.g. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY (Supabase → Project Settings → API → service_role)
//   PAYMONGO_WEBHOOK_SECRET   (shown when you create the webhook in PayMongo)

const crypto = require("crypto");


// --- send a branded receipt via Brevo (optional; skipped if no API key) ---
async function sendReceipt(email, amountCentavos, refNo) {
  var key = process.env.BREVO_API_KEY;
  if (!key || !email) return "no-receipt";
  var peso = (amountCentavos / 100).toFixed(2);
  var html = ''
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5ef;padding:32px 16px;font-family:Arial,Helvetica,sans-serif">'
    + '<tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:460px;background:#fff;border:2px solid #1b2a55;border-radius:12px;padding:32px">'
    + '<tr><td align="center" style="padding-bottom:6px"><table cellpadding="0" cellspacing="0"><tr><td style="width:56px;height:56px;background:#f5b800;border:3px solid #1b2a55;border-radius:50%;text-align:center;font-size:26px;font-weight:bold;color:#1b2a55">P</td></tr></table></td></tr>'
    + '<tr><td align="center" style="font-size:22px;font-weight:bold;color:#1b2a55;padding-top:12px">PasadoPH</td></tr>'
    + '<tr><td align="center" style="font-size:11px;letter-spacing:2px;color:#6d7386;padding-bottom:20px">CSE-PPT REVIEWER</td></tr>'
    + '<tr><td align="center" style="font-size:19px;font-weight:bold;color:#1e7d4e;padding-bottom:8px">Payment received. Salamat!</td></tr>'
    + '<tr><td align="center" style="font-size:14px;color:#38405e;line-height:1.5;padding-bottom:20px">Your PasadoPH Premium access is now active on this email address. Just log in and start reviewing.</td></tr>'
    + '<tr><td style="border-top:1px dashed #d9d4c5;padding-top:16px;font-size:14px;color:#1b2a55">'
    + '<b>OFFICIAL RECEIPT</b><br/><br/>'
    + 'Item: PasadoPH Premium &mdash; Lifetime Access<br/>'
    + 'Amount paid: <b>PHP ' + peso + '</b><br/>'
    + 'Reference no: ' + (refNo || "-") + '<br/>'
    + 'Account: ' + email + '<br/>'
    + 'Date: ' + new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })
    + '</td></tr>'
    + '<tr><td align="center" style="padding-top:24px"><a href="https://pasadophreviewer.com" style="display:inline-block;background:#f5b800;color:#1b2a55;font-size:15px;font-weight:bold;text-decoration:none;padding:13px 34px;border:2px solid #1b2a55;border-radius:10px">Go to my review desk</a></td></tr>'
    + '<tr><td align="center" style="font-size:11px;color:#9aa0b0;padding-top:22px;line-height:1.5">Questions? Reply to this email or use the Contact us form on our site.<br/>PasadoPH is an independent study tool, not affiliated with the Civil Service Commission.</td></tr>'
    + '</table></td></tr></table>';

  try {
    var r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "PasadoPH", email: process.env.RECEIPT_FROM || "noreply@pasadophreviewer.com" },
        to: [{ email: email }],
        subject: "Your PasadoPH receipt \u2014 Premium access activated",
        htmlContent: html
      })
    });
    return r.ok ? "receipt-sent" : "receipt-failed-" + r.status;
  } catch (e) { return "receipt-error"; }
}

exports.handler = async function (event) {
  try {
    const secret = process.env.PAYMONGO_WEBHOOK_SECRET || "";
    const raw = event.body || "";

    // --- verify PayMongo signature (skips only if no secret configured) ---
    if (secret) {
      const sigHeader = event.headers["paymongo-signature"] || event.headers["Paymongo-Signature"] || "";
      const parts = {};
      sigHeader.split(",").forEach(function (p) {
        const kv = p.split("=");
        if (kv.length === 2) parts[kv[0].trim()] = kv[1].trim();
      });
      const t = parts.t, expected = parts.li || parts.te;
      if (!t || !expected) return { statusCode: 401, body: "missing signature" };
      const computed = crypto.createHmac("sha256", secret).update(t + "." + raw).digest("hex");
      if (computed !== expected) return { statusCode: 401, body: "bad signature" };
    }

    const payload = JSON.parse(raw);
    const evtType = payload && payload.data && payload.data.attributes && payload.data.attributes.type;
    if (!evtType || evtType.indexOf("payment.paid") === -1) {
      return { statusCode: 200, body: "ignored: " + evtType };
    }

    // --- collect every email mentioned anywhere in the event ---
    const found = (raw.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [])
      .map(function (e) { return e.toLowerCase(); })
      .filter(function (e, i, a) {
        return a.indexOf(e) === i &&
          e.indexOf("noreply@") !== 0 &&
          e.indexOf("@paymongo") === -1;
      });

    if (!found.length) return { statusCode: 200, body: "no emails in payload" };

    // amount + reference for the receipt
    var amt = 0, ref = "";
    try {
      var at = payload.data.attributes.data.attributes || {};
      amt = at.amount || (at.payments && at.payments[0] && at.payments[0].attributes && at.payments[0].attributes.amount) || 0;
      ref = at.reference_number || (at.payment_intent && at.payment_intent.id) || payload.data.attributes.data.id || "";
    } catch (e) {}

    // --- flip is_premium for every matching profile ---
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let updated = [];
    for (const email of found) {
      const res = await fetch(
        url + "/rest/v1/profiles?email=ilike." + encodeURIComponent(email),
        {
          method: "PATCH",
          headers: {
            apikey: key,
            Authorization: "Bearer " + key,
            "Content-Type": "application/json",
            Prefer: "return=representation"
          },
          body: JSON.stringify({ is_premium: true })
        }
      );
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length) updated = updated.concat(rows.map(function (r) { return r.email; }));
    }

    // --- send the branded receipt to each activated account ---
    var receiptStatus = "no-recipient";
    var receiptTargets = updated.length ? updated : found;
    for (var i = 0; i < receiptTargets.length; i++) {
      receiptStatus = await sendReceipt(receiptTargets[i], amt, ref);
    }

    return {
      statusCode: 200,
      body: "premium granted: " +
        (updated.join(", ") || "no matching account — manual check needed") +
        " | receipt: " + receiptStatus
    };
  } catch (e) {
    return { statusCode: 500, body: "error: " + e.message };
  }
};
