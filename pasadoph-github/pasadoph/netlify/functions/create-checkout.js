// PasadoPH — creates a PayMongo Checkout Session with automatic redirect back to the site.
// Env vars: PAYMONGO_SECRET_KEY (sk_live_...), optional PRICE_CENTAVOS (default 39900),
//           optional PAYMENT_METHODS (comma list, default "qrph")

exports.handler = async function (event) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
    var body = {};
    try { body = JSON.parse(event.body || "{}"); } catch (e) {}
    var email = String(body.email || "").trim().toLowerCase();
    if (!email || email.indexOf("@") < 1) return { statusCode: 400, body: JSON.stringify({ error: "missing email" }) };

    var secret = process.env.PAYMONGO_SECRET_KEY;
    if (!secret) return { statusCode: 500, body: JSON.stringify({ error: "server not configured" }) };

    var amount = parseInt(process.env.PRICE_CENTAVOS || "39900", 10);
    var methods = (process.env.PAYMENT_METHODS || "qrph").split(",").map(function (m) { return m.trim(); }).filter(Boolean);
    var site = "https://pasadophreviewer.com";

    var payload = {
      data: {
        attributes: {
          line_items: [{ name: "PasadoPH Lifetime Access", amount: amount, currency: "PHP", quantity: 1 }],
          payment_method_types: methods,
          description: "PasadoPH Premium - lifetime access for " + email,
          metadata: { account_email: email },
          success_url: site + "/?paid=1",
          cancel_url: site + "/?cancelled=1",
          send_email_receipt: true,
          show_line_items: true,
          show_description: true
        }
      }
    };

    var res = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(secret + ":").toString("base64")
      },
      body: JSON.stringify(payload)
    });
    var out = await res.json();
    var url = out && out.data && out.data.attributes && out.data.attributes.checkout_url;
    if (!url) return { statusCode: 502, body: JSON.stringify({ error: "paymongo error", detail: out }) };
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
