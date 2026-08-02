// PasadoPH — PayMongo webhook: auto-grants premium after successful payment.
// Env vars required (set in Netlify → Site settings → Environment variables):
//   SUPABASE_URL              e.g. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY (Supabase → Project Settings → API → service_role)
//   PAYMONGO_WEBHOOK_SECRET   (shown when you create the webhook in PayMongo)

const crypto = require("crypto");

// --- server-side TikTok Purchase via Events API (token stays server-side) ---
// Fires only from the verified webhook, after premium is activated.
// event_id = real PayMongo payment id => TikTok dedupes retries automatically.
async function ttPurchase(opts) {
  var token = process.env.TIKTOK_ACCESS_TOKEN;
  var pixel = process.env.TIKTOK_PIXEL_ID;
  if (!token || !pixel) return "tt-skip-no-config";

  function sha256(s) {
    if (!s) return undefined;
    return crypto.createHash("sha256").update(String(s).trim().toLowerCase()).digest("hex");
  }

  // Identity: email + external_id hashed; only when genuinely available. No phone.
  var user = {};
  var he = sha256(opts.email); if (he) user.email = he;
  var hx = sha256(opts.userId); if (hx) user.external_id = hx;
  // context signals only when legitimately present (never fabricated)
  if (opts.ttclid) user.ttclid = opts.ttclid;
  if (opts.ttp) user.ttp = opts.ttp;
  if (opts.ip) user.ip = opts.ip;
  if (opts.userAgent) user.user_agent = opts.userAgent;
  if (!user.email && !user.external_id) return "tt-skip-no-identity";

  if (!opts.paymentId) return "tt-skip-no-payment-id"; // event_id must be the real payment id

  var body = {
    event_source: "web",
    event_source_id: pixel,
    data: [{
      event: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: opts.paymentId,
      user: user,
      properties: {
        value: 299,
        currency: "PHP",
        content_id: "pasadoph_lifetime",
        content_name: "PasadoPH Lifetime Access",
        content_type: "product"
      },
      page: { url: "https://pasadophreviewer.com/?paid=1" }
    }]
  };

  try {
    var r = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: { "Access-Token": token, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    var j = {};
    try { j = await r.json(); } catch (e) {}
    // TikTok returns { code: 0 } on success even with HTTP 200
    if (r.ok && (j.code === 0 || typeof j.code === "undefined")) return "tt-purchase-sent";
    return "tt-purchase-failed-" + (j.code != null ? j.code : r.status);
  } catch (e) { return "tt-purchase-error"; }
}

// --- server-side Meta Purchase via Conversions API (token stays server-side) ---
async function metaPurchase(opts) {
  var token = process.env.META_CONVERSIONS_API_TOKEN;
  var pixel = process.env.META_PIXEL_ID;
  if (!token || !pixel) return "meta-skip-no-config";
  function sha256(s) {
    if (!s) return undefined;
    return crypto.createHash("sha256").update(String(s).trim().toLowerCase()).digest("hex");
  }
  if (!opts.paymentId) return "meta-skip-no-payment-id"; // event_id must be the real payment id

  var user_data = {};
  var he = sha256(opts.email); if (he) user_data.em = [he];
  var hx = sha256(opts.userId); if (hx) user_data.external_id = [hx];
  if (opts.ip) user_data.client_ip_address = opts.ip;
  if (opts.userAgent) user_data.client_user_agent = opts.userAgent;
  if (opts.fbp) user_data.fbp = opts.fbp;
  if (opts.fbc) user_data.fbc = opts.fbc;
  if (!user_data.em && !user_data.external_id) return "meta-skip-no-identity";

  var body = {
    data: [{
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: opts.paymentId,             // same id as pixel -> Meta dedupes
      action_source: "website",
      event_source_url: "https://pasadophreviewer.com/?buy=1",
      user_data: user_data,
      custom_data: {
        content_ids: ["pasadoph_lifetime"],
        content_name: "PasadoPH Lifetime Access",
        content_type: "product",
        value: 299,
        currency: "PHP",
        num_items: 1
      }
    }]
  };

  try {
    var r = await fetch(
      "https://graph.facebook.com/v19.0/" + encodeURIComponent(pixel) + "/events?access_token=" + encodeURIComponent(token),
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    var j = {};
    try { j = await r.json(); } catch (e) {}
    if (r.ok && j && typeof j.events_received !== "undefined") return "meta-purchase-sent";
    return "meta-purchase-failed-" + (j && j.error && j.error.code ? j.error.code : r.status);
  } catch (e) { return "meta-purchase-error"; }
}



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
    let updatedIds = [];
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
      let rows = await res.json();

      // Email-first funnel: buyer paid without registering -> create the account now.
      if (!(Array.isArray(rows) && rows.length)) {
        try {
          const created = await fetch(url + "/auth/v1/admin/users", {
            method: "POST",
            headers: {
              apikey: key,
              Authorization: "Bearer " + key,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              email_confirm: true,               // no verification wall; they set a password via reset link
              user_metadata: { source: "paid_signup" }
            })
          });
          const cu = await created.json();
          const newId = cu && cu.id;
          if (newId) {
            // profile row is created by the on-signup trigger; flip premium on it
            await fetch(url + "/rest/v1/profiles?id=eq." + encodeURIComponent(newId), {
              method: "PATCH",
              headers: {
                apikey: key,
                Authorization: "Bearer " + key,
                "Content-Type": "application/json",
                Prefer: "return=representation"
              },
              body: JSON.stringify({ is_premium: true, email: email })
            });
            // trigger a password-setup (recovery) email so the buyer can log in
            try {
              await fetch(url + "/auth/v1/recover", {
                method: "POST",
                headers: { apikey: key, "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
              });
            } catch (e) {}
            rows = [{ email: email, id: newId }];
          }
        } catch (e) {}
      }

      if (Array.isArray(rows) && rows.length) {
        updated = updated.concat(rows.map(function (r) { return r.email; }));
        updatedIds = updatedIds.concat(rows.map(function (r) { return r.id; }));
      }
    }

    // Extract the REAL PayMongo payment id for event_id (dedupe key)
    var paymentId = "";
    try {
      var dd = payload.data.attributes.data;
      var at = (dd && dd.attributes) || {};
      // checkout_session.payment.paid / payment.paid shapes
      paymentId =
        (at.payments && at.payments[0] && at.payments[0].id) ||
        (at.payment_intent && at.payment_intent.attributes && at.payment_intent.attributes.payments && at.payment_intent.attributes.payments[0] && at.payment_intent.attributes.payments[0].id) ||
        (dd && dd.id) || "";
    } catch (e) {}

    // Optional TikTok click context, only if forwarded (never fabricated)
    var hdrs = event.headers || {};
    var ttStatus = "tt-skip-no-account";
    var metaStatus = "meta-skip-no-account";
    if (updated.length) {
      var ipAddr = hdrs["x-nf-client-connection-ip"] || hdrs["x-forwarded-for"] || null;
      var ua = hdrs["user-agent"] || null;
      ttStatus = await ttPurchase({
        email: updated[0],
        userId: (updatedIds[0] || ""),
        paymentId: paymentId,
        ip: ipAddr,
        userAgent: ua,
        ttclid: null,   // not available server-side unless captured at checkout; left null legitimately
        ttp: null
      });
      metaStatus = await metaPurchase({
        email: updated[0],
        userId: (updatedIds[0] || ""),
        paymentId: paymentId,
        ip: ipAddr,
        userAgent: ua,
        fbp: null,      // _fbp/_fbc not available server-side unless captured at checkout; left null legitimately
        fbc: null
      });
    }

    return { statusCode: 200, body: "premium granted: " + (updated.join(", ") || "no matching account — manual check needed") + " | tiktok: " + ttStatus + " | meta: " + metaStatus };
  } catch (e) {
    return { statusCode: 500, body: "error: " + e.message };
  }
};
