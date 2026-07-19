// PasadoPH — PayMongo webhook: auto-grants premium after successful payment.
// Env vars required (set in Netlify → Site settings → Environment variables):
//   SUPABASE_URL              e.g. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY (Supabase → Project Settings → API → service_role)
//   PAYMONGO_WEBHOOK_SECRET   (shown when you create the webhook in PayMongo)

const crypto = require("crypto");

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

    return { statusCode: 200, body: "premium granted: " + (updated.join(", ") || "no matching account — manual check needed") };
  } catch (e) {
    return { statusCode: 500, body: "error: " + e.message };
  }
};
