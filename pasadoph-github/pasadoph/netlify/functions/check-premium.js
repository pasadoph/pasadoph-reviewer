// PasadoPH — checks whether an email already has premium access.
// Used by the sales landing page to avoid charging existing buyers twice.
// Uses the service role key server-side only; returns just a boolean.

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
    var body = {};
    try { body = JSON.parse(event.body || "{}"); } catch (e) {}
    var email = String(body.email || "").trim().toLowerCase();
    if (!email || email.indexOf("@") < 1) {
      return { statusCode: 400, body: JSON.stringify({ error: "invalid email" }) };
    }

    var url = process.env.SUPABASE_URL;
    var key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      // If not configured, don't block the funnel — treat as "not premium".
      return { statusCode: 200, body: JSON.stringify({ premium: false, exists: false }) };
    }

    var res = await fetch(
      url + "/rest/v1/profiles?email=ilike." + encodeURIComponent(email) + "&select=is_premium",
      {
        headers: {
          apikey: key,
          Authorization: "Bearer " + key,
          "Content-Type": "application/json"
        }
      }
    );
    var rows = await res.json();
    var exists = Array.isArray(rows) && rows.length > 0;
    var premium = exists && rows.some(function (r) { return r.is_premium === true; });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ premium: premium, exists: exists })
    };
  } catch (e) {
    // On any error, don't block the sale — let checkout proceed.
    return { statusCode: 200, body: JSON.stringify({ premium: false, exists: false }) };
  }
};
