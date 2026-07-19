# PasadoPH — Launch Guide (about 45–60 minutes total)

You will set up 3 free services: **Supabase** (accounts + database),
**Netlify** (hosting), and **PayMongo** (payments). No coding needed —
just paste 3 values into `js/config.js`.

---

## Step 0 — Test it locally first (2 min)

Open `index.html` in your browser. The app runs in **preview mode**:
tap "Continue as guest" to test everything (all 300 questions and the
mock exam are unlocked in preview so you can check the product).

---

## Step 1 — Supabase: accounts + database (15 min)

1. Go to https://supabase.com → Sign up (free) → **New project**.
   - Name: `pasadoph` · Set a strong database password · Region: Southeast Asia (Singapore).
2. When the project is ready, open **SQL Editor** → **New query**.
3. Copy the ENTIRE contents of `supabase.sql` into the editor → **Run**.
   You should see "Success. No rows returned."
4. Go to **Project Settings → API** and copy:
   - **Project URL** → paste into `SUPABASE_URL` in `js/config.js`
   - **anon public key** → paste into `SUPABASE_ANON_KEY` in `js/config.js`
5. (Recommended) **Authentication → Providers → Email**: leave email
   confirmations ON (default). Users confirm their email once, then log in.
6. **IMPORTANT — after Step 3 (Netlify) gives you your live URL:** go to
   **Authentication → URL Configuration** and set **Site URL** to your live
   site (e.g. `https://pasadoph.netlify.app`). Without this, the "Confirm
   your email" link in the verification email redirects users to
   localhost:3000 and they can never finish signing up.

## Step 2 — PayMongo: payment link (15 min)

1. Go to https://paymongo.com → Create a free account (you'll need a
   valid ID; approval for individuals is usually same-day).
2. In the dashboard: **Payment Links → Create Link**.
   - Amount: **₱499** · Description: `PasadoPH Premium — lifetime access.
     IMPORTANT: enter the same email you used for your PasadoPH account.`
3. Copy the link (looks like `https://pm.link/...`) → paste into
   `PAYMONGO_LINK` in `js/config.js`.
4. PayMongo accepts **GCash, Maya, cards, and online banking** — exactly
   what Filipino buyers expect.


### What buyers can pay with (via your PayMongo link)
One link accepts: **GCash, Maya, credit/debit cards (Visa/Mastercard),
GrabPay, and online banking (BPI, UnionBank, etc.)** — coverage depends on
which methods PayMongo activates on your account (GCash + cards are standard).
PayMongo then pays out to your bank account. PayPal is not part of PayMongo;
skip it for v1 — Filipino exam takers overwhelmingly use GCash/Maya. If OFW
buyers ask later, you can add a simple PayPal.Me link as a second option.

> While waiting for PayMongo approval you can already launch — the app
> works, and you can temporarily put your GCash number + instructions in
> the `PAYMONGO_LINK` spot with a notes page, or just launch free-tier
> only and add the link when approved.

## Step 3 — Netlify: put it online (10 min)

1. Go to https://app.netlify.com → Sign up (free).
2. Drag and drop the whole `pasadoph` FOLDER onto the Netlify dashboard
   ("Sites" page). That's it — you get a live URL like
   `https://pasadoph.netlify.app` in seconds.
3. (Optional) Buy a domain like `pasadoph.com` (~₱600/yr) and connect it
   in **Domain settings**. You can do this later.
4. Every time you edit files (e.g., paste your Supabase keys), re-drag
   the folder to redeploy. Takes 10 seconds.

## Step 4 — When someone pays (your daily 30-second task)

1. PayMongo emails you for every successful payment (with the buyer's email).
2. Open Supabase → **Table Editor → profiles** → find the buyer's email
   → set `is_premium` to **true** → Save.
3. Tell the buyer to log out and log back in. Done — they're premium.

Automate this with a PayMongo webhook in week 2 if sales justify it.

---

## Legal compliance (read once — it protects your income)

- **Original questions only.** Every item in `data/` was written from scratch
  for PasadoPH, based only on the officially published CSE-PPT exam scope.
  Never add actual questions from past exams — retaining, reproducing, or
  distributing real exam items violates **R.A. 9416** and is criminally
  penalized. If a "leaked questionnaire" is ever sent to you, do not use it.
- **No CSC branding.** Never use the CSC name, logo, seal, or website look
  in the app or your ads. Say "CSE-PPT reviewer," never "CSC-accredited"
  or "official" — the CSC does not accredit any reviewer.
- **Disclaimers are built in.** The landing page and footer already state:
  independent tool, not affiliated/endorsed, original simulated questions,
  no guarantee of passing. Keep them visible in every redesign.
- **In your marketing**, use the same language: "original practice
  questions patterned after the official exam coverage."

## Marketing quick-start (your SEO skills = unfair advantage)

- Post in Facebook groups: "Civil Service Exam Reviewer" groups have
  100k+ members each. Share a free-tier link + one sample question with
  its full solution as proof of quality.
- TikTok/Reels: film 1 question → countdown → answer + 15-second
  explanation. Link in bio.
- SEO: target "civil service exam reviewer online", "CSE-PPT practice
  test with answers", "civil service exam coverage 2026". You know
  exactly what to do here.
- Timing: demand spikes 2–3 months before each CSE-PPT schedule
  (typically March and August exams) — start content now.

## Files in this project

- `index.html` — the app shell
- `css/styles.css` — design
- `js/config.js` — ← the ONLY file you need to edit
- `js/app.js` — app engine (auth, exams, scoring, review, premium gating)
- `data/*.js` — 6 question banks × 50 items with detailed solutions
- `supabase.sql` — run once in Supabase
