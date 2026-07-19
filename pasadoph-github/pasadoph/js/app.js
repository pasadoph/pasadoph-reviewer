/* ============================================================
   PasadoPH — app engine
   Views: landing → auth → dashboard → exam → results/review
   Auth + sync: Supabase. Works in local preview mode until
   config.js is filled in (accounts disabled in preview).
   ============================================================ */

(function () {
  "use strict";

  var CFG = window.PASADO_CONFIG || {};
  var BANKS = window.QUESTION_BANKS || {};
  var PASS_MARK = 80;

  var TOPICS = [
    { id: "verbal",     name: "Verbal Ability",        level: "Both levels",        desc: "Grammar, vocabulary, paragraph organization, reading comprehension" },
    { id: "numerical",  name: "Numerical Ability",      level: "Both levels",        desc: "Basic operations, fractions & percentages, word problems, number series" },
    { id: "analytical", name: "Analytical Ability",     level: "Professional",       desc: "Logic, syllogisms, assumptions & conclusions, data interpretation" },
    { id: "clerical",   name: "Clerical Ability",       level: "Subprofessional",    desc: "Spelling, filing, alphabetizing, office procedures" },
    { id: "geninfo1",   name: "General Info I",         level: "Both levels",        desc: "Philippine Constitution & RA 6713 (Code of Conduct)" },
    { id: "geninfo2",   name: "General Info II",        level: "Both levels",        desc: "Peace & human rights, environment management & protection" }
  ];

  var supa = null;
  var isConfigured =
    CFG.SUPABASE_URL && CFG.SUPABASE_URL.indexOf("PASTE_") !== 0 &&
    CFG.SUPABASE_ANON_KEY && CFG.SUPABASE_ANON_KEY.indexOf("PASTE_") !== 0;

  if (isConfigured && window.supabase) {
    supa = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY);
  }

  var state = {
    user: null,          // supabase user or {preview:true}
    premium: false,
    view: "landing",
    exam: null,          // active exam session
    lastResult: null,
    bests: {}            // topicId -> best %
  };

  var $app = document.getElementById("app");
  var $actions = document.getElementById("topbarActions");
  document.getElementById("brandBtn").addEventListener("click", function () {
    go(state.user ? "dashboard" : "landing");
  });
  var $contactLink = document.getElementById("contactLink");
  if ($contactLink) $contactLink.addEventListener("click", function (e) {
    e.preventDefault();
    go("contact");
  });

  /* ---------------- helpers ---------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function letter(i) { return ["A", "B", "C", "D", "E"][i] || "?"; }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function topicById(id) {
    for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].id === id) return TOPICS[i];
    return null;
  }
  function bankFor(id) { return BANKS[id] || []; }

  function freeLimit() { return CFG.FREE_QUESTIONS_PER_TOPIC || 10; }

  /* ---------------- auth ---------------- */

  async function initAuth() {
    if (!supa) return;
    var res = await supa.auth.getSession();
    if (res.data && res.data.session) {
      state.user = res.data.session.user;
      await loadProfile();
    }
    supa.auth.onAuthStateChange(function (_evt, session) {
      if (_evt === "PASSWORD_RECOVERY") {
        state.user = session ? session.user : null;
        go("resetpass");
        return;
      }
      var wasIn = !!state.user;
      state.user = session ? session.user : null;
      if (state.user && !wasIn) {
        loadProfile().then(function () { go("dashboard"); });
      }
      if (!state.user && wasIn) { state.premium = false; go("landing"); }
    });
  }

  async function loadProfile() {
    if (!supa || !state.user) return;
    try {
      var p = await supa.from("profiles").select("is_premium").eq("id", state.user.id).single();
      state.premium = !!(p.data && p.data.is_premium);
      var r = await supa.from("results").select("topic,score,total").eq("user_id", state.user.id);
      state.bests = {};
      (r.data || []).forEach(function (row) {
        var pct = Math.round((row.score / row.total) * 100);
        if (!state.bests[row.topic] || pct > state.bests[row.topic]) state.bests[row.topic] = pct;
      });
    } catch (e) { /* non-fatal */ }
  }

  async function saveResult(topic, mode, score, total, answers) {
    var pct = Math.round((score / total) * 100);
    if (!state.bests[topic] || pct > state.bests[topic]) state.bests[topic] = pct;
    if (supa && state.user && !state.user.preview) {
      try {
        await supa.from("results").insert({
          user_id: state.user.id, topic: topic, mode: mode,
          score: score, total: total, answers: answers
        });
      } catch (e) { /* non-fatal */ }
    }
  }

  async function signOut() {
    if (supa) await supa.auth.signOut();
    state.user = null; state.premium = false; state.bests = {};
    go("landing");
  }

  /* ---------------- router ---------------- */

  function go(view, payload) {
    if (state.exam && state.exam.timerId && view !== "exam") {
      clearInterval(state.exam.timerId);
    }
    state.view = view;
    window.scrollTo(0, 0);
    renderTopbar();
    if (view === "landing") renderLanding();
    else if (view === "auth") renderAuth(payload || "login");
    else if (view === "verify") renderVerify(payload);
    else if (view === "contact") renderContact();
    else if (view === "forgot") renderForgot();
    else if (view === "resetpass") renderResetPass();
    else if (view === "dashboard") renderDashboard();
    else if (view === "exam") renderExamQuestion();
    else if (view === "results") renderResults();
    else if (view === "review") renderReview();
    else if (view === "upgrade") renderUpgrade();
  }

  function renderTopbar() {
    if (state.user) {
      $actions.innerHTML =
        '<span class="user-chip">' + esc(state.user.email || "preview") + "</span>" +
        '<button class="btn btn-sm" id="tbDash">My review</button>' +
        '<button class="btn btn-ghost btn-sm" id="tbOut">Log out</button>';
      document.getElementById("tbDash").onclick = function () { go("dashboard"); };
      document.getElementById("tbOut").onclick = signOut;
    } else {
      $actions.innerHTML =
        '<button class="btn btn-sm" id="tbIn">Log in</button>' +
        '<button class="btn btn-primary btn-sm" id="tbUp">Start free</button>';
      document.getElementById("tbIn").onclick = function () { go("auth", "login"); };
      document.getElementById("tbUp").onclick = function () { go("auth", "register"); };
    }
  }

  /* ---------------- landing ---------------- */

  function totalQuestions() {
    var n = 0;
    TOPICS.forEach(function (t) { n += bankFor(t.id).length; });
    return n;
  }

  function renderLanding() {
    var strip = "";
    var fills = [1, 3, 0, 2, 1, 3];
    for (var r = 0; r < 6; r++) {
      strip += '<div class="sheet-row"><span class="sheet-num">' + (r + 1) + '.</span>';
      for (var c = 0; c < 4; c++) {
        strip += '<span class="dot' + (fills[r] === c ? " filled" : "") + '">' + letter(c) + "</span>";
      }
      strip += "</div>";
    }

    $app.innerHTML =
      '<section class="hero">' +
        '<p class="eyebrow">CSE-PPT · Professional & Subprofessional</p>' +
        '<h1>Shade the right bubble. <span class="shade">Every time.</span></h1>' +
        '<p class="lede">' + totalQuestions() + ' practice questions with detailed step-by-step solutions, a timed 170-item mock exam, and score tracking across all your devices. The passing grade is 80 — train until you clear it.</p>' +
        '<div class="hero-ctas">' +
          '<button class="btn btn-primary" id="ctaStart">Start free — no card needed</button>' +
          '<button class="btn" id="ctaLogin">I have an account</button>' +
        "</div>" +
        '<div class="sheet-strip"><div class="sheet-strip-head"><span>Answer sheet</span><span>Set A</span></div>' +
          '<div class="sheet-rows">' + strip + "</div></div>" +
      "</section>" +
      '<section class="feature-grid">' +
        '<div class="feature"><h3>Solutions, not just answers</h3><p>Every item explains why the answer is right and why the traps are wrong — the part free reviewers skip.</p></div>' +
        '<div class="feature"><h3>Real exam simulation</h3><p>Timed 170-item mock exam that mixes topics exactly like the actual CSE-PPT, scored against the 80.00 passing grade.</p></div>' +
        '<div class="feature"><h3>Any device, anywhere</h3><p>Your account and scores sync. Review on your phone during the commute, continue on a laptop at home.</p></div>' +
      "</section>" +
      '<section class="pricing">' +
        '<div class="plan"><span class="tag">Free</span><div class="price">₱0</div>' +
          "<ul><li>" + freeLimit() + " questions per topic</li><li>Instant scoring</li><li>Progress saved to your account</li></ul>" +
          '<button class="btn btn-block" id="planFree">Create free account</button></div>' +
        '<div class="plan premium"><span class="tag">Premium</span><div class="price">' +
          (CFG.PRICE_COMPARE ? '<s style="opacity:0.5;font-weight:400;margin-right:8px">' + esc(CFG.PRICE_COMPARE) + "</s>" : "") +
          esc(CFG.PRICE_LABEL || "₱499 one-time") + "</div>" +
          (CFG.PRICE_URGENCY ? '<p style="font-size:0.78rem;background:var(--sun);color:var(--ink);padding:5px 10px;border-radius:6px;font-weight:700;align-self:flex-start">' + esc(CFG.PRICE_URGENCY) + "</p>" : "") +
          "<ul><li>All " + totalQuestions() + " questions, both exam levels</li><li>Detailed step-by-step solutions</li><li>Timed 170-item mock exam</li><li>Lifetime access — pay once</li></ul>" +
          '<button class="btn btn-primary btn-block" id="planPaid">Get premium</button></div>' +
      "</section>" +
      "";


    document.getElementById("ctaStart").onclick = function () { go("auth", "register"); };
    document.getElementById("ctaLogin").onclick = function () { go("auth", "login"); };
    document.getElementById("planFree").onclick = function () { go("auth", "register"); };
    document.getElementById("planPaid").onclick = function () {
      state.user ? go("upgrade") : go("auth", "register");
    };
  }

  /* ---------------- auth view ---------------- */

  function friendlyAuthError(err) {
    var m = err && err.message ? String(err.message) : "";
    if (!m || m === "{}" || m.toLowerCase().indexOf("fetch") >= 0) {
      return "Could not reach the server. Check your internet connection, turn off any ad-blocker or VPN for this site, and try again.";
    }
    if (m.toLowerCase().indexOf("already registered") >= 0) {
      return "This email already has an account. Tap \"Log in\" below instead.";
    }
    if (m.toLowerCase().indexOf("rate limit") >= 0) {
      return "Too many attempts in a short time. Please wait a few minutes and try again.";
    }
    if (m.toLowerCase().indexOf("invalid login credentials") >= 0) {
      return "Wrong email or password. Please try again.";
    }
    if (m.toLowerCase().indexOf("email not confirmed") >= 0) {
      return "Your email is not verified yet. Check your inbox for the verification link.";
    }
    return m;
  }

  function renderAuth(mode) {
    var isReg = mode === "register";
    var previewNote = !isConfigured
      ? '<div class="form-msg ok">Preview mode: accounts are off until Supabase keys are added in <b>js/config.js</b>. Tap "Continue as guest" to test the app.</div>'
      : "";

    var regFields =
      '<div class="field"><label for="afName">Full name</label><input id="afName" type="text" autocomplete="name" placeholder="Juan Dela Cruz" /></div>' +
      '<div class="field"><label for="afEmail">Email</label><input id="afEmail" type="email" autocomplete="email" placeholder="you@email.com" /></div>' +
      '<div class="field"><label for="afPass">Password</label><input id="afPass" type="password" autocomplete="new-password" placeholder="At least 8 characters" />' +
        '<div class="strength-track"><div class="strength-fill" id="strengthFill"></div></div>' +
        '<div class="strength-label" id="strengthLabel">&nbsp;</div></div>' +
      '<div class="field"><label for="afPass2">Confirm password</label><input id="afPass2" type="password" autocomplete="new-password" placeholder="Re-type your password" /></div>';

    var loginFields =
      '<div class="field"><label for="afEmail">Email</label><input id="afEmail" type="email" autocomplete="email" placeholder="you@email.com" /></div>' +
      '<div class="field"><label for="afPass">Password</label><input id="afPass" type="password" autocomplete="current-password" placeholder="Your password" /></div>';

    $app.innerHTML =
      '<div class="auth-card">' +
        "<h2>" + (isReg ? "Create your account" : "Welcome back") + "</h2>" +
        '<p class="sub">' + (isReg ? "Start reviewing today. Your scores follow you on any device." : "Log in to continue your review.") + "</p>" +
        (isReg ? regFields : loginFields) +
        '<button class="btn btn-primary btn-block" id="afGo">' + (isReg ? "Create account" : "Log in") + "</button>" +
        (isReg ? '<p style="font-size:0.74rem;color:var(--muted);text-align:center;margin-top:10px">Free forever plan. No credit card needed.</p>'
                : '<p class="auth-switch" style="margin-top:10px"><button id="afForgot">Forgot password?</button></p>') +
        (!isConfigured ? '<button class="btn btn-block" id="afGuest" style="margin-top:10px">Continue as guest (preview)</button>' : "") +
        '<div id="afMsg"></div>' + previewNote +
        '<p class="auth-switch">' +
          (isReg ? 'Already registered? <button id="afSwitch">Log in</button>' : 'New here? <button id="afSwitch">Create a free account</button>') +
        "</p>" +
      "</div>";

    document.getElementById("afSwitch").onclick = function () {
      go("auth", isReg ? "login" : "register");
    };
    var forgotBtn = document.getElementById("afForgot");
    if (forgotBtn) forgotBtn.onclick = function () { go("forgot"); };
    var guestBtn = document.getElementById("afGuest");
    if (guestBtn) guestBtn.onclick = function () {
      state.user = { preview: true, email: "guest (preview)" };
      state.premium = true;
      go("dashboard");
    };

    if (isReg) {
      var $pass = document.getElementById("afPass");
      $pass.addEventListener("input", function () {
        var s = passStrength($pass.value);
        var fill = document.getElementById("strengthFill");
        var label = document.getElementById("strengthLabel");
        var names = ["Too short", "Weak", "Fair", "Good", "Strong"];
        var colors = ["#c0392b", "#c0392b", "#d98c00", "#7aa000", "#1e7d4e"];
        fill.style.width = (s * 25) + "%";
        fill.style.background = colors[s];
        label.textContent = $pass.value ? names[s] : "\u00a0";
      });
    }

    document.getElementById("afGo").onclick = async function () {
      var email = document.getElementById("afEmail").value.trim();
      var pass = document.getElementById("afPass").value;
      var $msg = document.getElementById("afMsg");
      var name = "";

      if (isReg) {
        name = document.getElementById("afName").value.trim();
        var pass2 = document.getElementById("afPass2").value;
        if (!name) { $msg.innerHTML = '<div class="form-msg err">Please enter your full name.</div>'; return; }
        if (!email || email.indexOf("@") < 1) { $msg.innerHTML = '<div class="form-msg err">Please enter a valid email address.</div>'; return; }
        if (pass.length < 8) { $msg.innerHTML = '<div class="form-msg err">Password must be at least 8 characters.</div>'; return; }
        if (pass !== pass2) { $msg.innerHTML = '<div class="form-msg err">Passwords do not match.</div>'; return; }
      } else {
        if (!email || !pass) { $msg.innerHTML = '<div class="form-msg err">Enter your email and password.</div>'; return; }
      }

      if (!supa) {
        $msg.innerHTML = '<div class="form-msg err">Accounts are not set up yet. Use "Continue as guest" for now.</div>';
        return;
      }
      this.disabled = true;
      try {
        var out = isReg
          ? await supa.auth.signUp({ email: email, password: pass, options: { data: { full_name: name } } })
          : await supa.auth.signInWithPassword({ email: email, password: pass });
        if (out.error) {
          $msg.innerHTML = '<div class="form-msg err">' + esc(friendlyAuthError(out.error)) + "</div>";
          this.disabled = false;
          return;
        }
        if (isReg && out.data && out.data.user && !out.data.session) {
          go("verify", email);
          return;
        }
        // signed in — onAuthStateChange routes to dashboard
      } catch (e) {
        $msg.innerHTML = '<div class="form-msg err">' + esc(friendlyAuthError(e)) + '</div>';
        this.disabled = false;
      }
    };
  }

  function passStrength(p) {
    if (!p || p.length < 8) return p && p.length >= 5 ? 1 : 0;
    var s = 1;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(4, s);
  }

  function renderVerify(email) {
    $app.innerHTML =
      '<div class="auth-card" style="text-align:center">' +
        '<div class="verify-icon" aria-hidden="true">&#9993;</div>' +
        "<h2>Check your inbox</h2>" +
        '<p class="sub" style="margin-bottom:6px">We sent a verification link to</p>' +
        '<p style="font-weight:700;margin-bottom:14px">' + esc(email || "your email") + "</p>" +
        '<p style="font-size:0.85rem;color:var(--muted);margin-bottom:18px">Click the link in the email to activate your account. If you don\'t see it, check your spam folder.</p>' +
        '<button class="btn btn-block" id="resendBtn">Resend verification email</button>' +
        '<div id="vMsg"></div>' +
        '<p class="auth-switch"><button id="backToLogin">Back to log in</button></p>' +
      "</div>";

    document.getElementById("backToLogin").onclick = function () { go("auth", "login"); };
    document.getElementById("resendBtn").onclick = async function () {
      var btn = this;
      var $msg = document.getElementById("vMsg");
      if (!supa || !email) return;
      btn.disabled = true;
      try {
        var out = await supa.auth.resend({ type: "signup", email: email });
        $msg.innerHTML = out.error
          ? '<div class="form-msg err">' + esc(out.error.message) + "</div>"
          : '<div class="form-msg ok">Verification email sent again. Give it a minute to arrive.</div>';
      } catch (e) {
        $msg.innerHTML = '<div class="form-msg err">Could not resend right now. Try again shortly.</div>';
      }
      setTimeout(function () { btn.disabled = false; }, 30000);
    };
  }

  /* ---------------- dashboard ---------------- */

  function renderDashboard() {
    if (!state.user) { go("auth", "login"); return; }

    var cards = TOPICS.map(function (t) {
      var bank = bankFor(t.id);
      var avail = state.premium ? bank.length : Math.min(freeLimit(), bank.length);
      var best = state.bests[t.id];
      return (
        '<button class="topic-card" data-topic="' + t.id + '">' +
          '<span class="topic-level">' + esc(t.level) + "</span>" +
          "<h3>" + esc(t.name) + "</h3>" +
          '<p style="font-size:0.86rem;color:#38405e">' + esc(t.desc) + "</p>" +
          '<span class="meta">' + avail + " of " + bank.length + " items " + (state.premium ? "" : "· free preview") + "</span>" +
          (best != null ? '<span class="topic-best">Best score: ' + best + "%</span>" : "") +
        "</button>"
      );
    }).join("");

    $app.innerHTML =
      '<div class="dash-head">' +
        "<div><h2>Your review desk</h2>" +
        '<p class="sub">Passing grade is 80.00 — practice by topic, then take the mock exam.</p></div>' +
        '<span class="premium-pill ' + (state.premium ? "paid" : "free") + '">' + (state.premium ? "PREMIUM" : "FREE PLAN") + "</span>" +
      "</div>" +
      '<div class="mock-banner">' +
        "<div><h3>Full mock exam · 170 items · timed</h3>" +
        "<p>Mixed topics in exam proportion, 3 hours 10 minutes on the clock — just like exam day.</p></div>" +
        '<button class="btn btn-primary" id="mockBtn">' + (state.premium ? "Start mock exam" : "Premium only — unlock") + "</button>" +
      "</div>" +
      (!state.premium
        ? '<div style="margin:4px 0 10px"><button class="btn btn-ink btn-block" id="dashUpgrade">Unlock everything — ' + esc(CFG.PRICE_LABEL || "₱499 one-time") + "</button></div>"
        : "") +
      '<div class="topics">' + cards + "</div>";

    Array.prototype.forEach.call(document.querySelectorAll(".topic-card"), function (el) {
      el.onclick = function () { startPractice(el.getAttribute("data-topic")); };
    });
    document.getElementById("mockBtn").onclick = function () {
      state.premium ? startMock() : go("upgrade");
    };
    var up = document.getElementById("dashUpgrade");
    if (up) up.onclick = function () { go("upgrade"); };
  }

  /* ---------------- exam engine ---------------- */

  function startPractice(topicId) {
    var bank = bankFor(topicId);
    if (!bank.length) return;
    var limit = state.premium ? bank.length : Math.min(freeLimit(), bank.length);
    var qs = bank.slice(0, limit);
    state.exam = {
      topicId: topicId,
      mode: "practice",
      title: (topicById(topicId) || {}).name || topicId,
      questions: qs,
      answers: {},           // qIndex -> choiceIndex
      idx: 0,
      timerId: null,
      secondsLeft: null
    };
    go("exam");
  }

  function startMock() {
    // 170 items in rough exam proportion, drawn from all banks
    var plan = [
      ["verbal", 45], ["numerical", 40], ["analytical", 30],
      ["clerical", 15], ["geninfo1", 20], ["geninfo2", 20]
    ];
    var qs = [];
    plan.forEach(function (p) {
      var picked = shuffle(bankFor(p[0])).slice(0, p[1]);
      picked.forEach(function (q) { qs.push(q); });
    });
    qs = shuffle(qs);
    state.exam = {
      topicId: "mock",
      mode: "mock",
      title: "Full Mock Exam",
      questions: qs,
      answers: {},
      idx: 0,
      timerId: null,
      secondsLeft: 190 * 60
    };
    go("exam");
    state.exam.timerId = setInterval(tickTimer, 1000);
  }

  function tickTimer() {
    var ex = state.exam;
    if (!ex || ex.secondsLeft == null) return;
    ex.secondsLeft--;
    var $t = document.getElementById("examTimer");
    if ($t) {
      $t.textContent = fmtTime(ex.secondsLeft);
      if (ex.secondsLeft <= 600) $t.classList.add("low");
    }
    if (ex.secondsLeft <= 0) {
      clearInterval(ex.timerId);
      submitExam();
    }
  }
  function fmtTime(s) {
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return (h > 0 ? h + ":" : "") + String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  function renderExamQuestion() {
    var ex = state.exam;
    if (!ex) { go("dashboard"); return; }
    var q = ex.questions[ex.idx];
    var chosen = ex.answers[ex.idx];
    var answered = Object.keys(ex.answers).length;

    var choices = q.choices.map(function (c, i) {
      return (
        '<button class="choice' + (chosen === i ? " selected" : "") + '" data-c="' + i + '">' +
          '<span class="bubble">' + letter(i) + "</span><span>" + esc(c) + "</span>" +
        "</button>"
      );
    }).join("");

    var palette = ex.questions.map(function (_q, i) {
      var cls = "pal-dot";
      if (ex.answers[i] != null) cls += " answered";
      if (i === ex.idx) cls += " current";
      return '<button class="' + cls + '" data-j="' + i + '">' + (i + 1) + "</button>";
    }).join("");

    $app.innerHTML =
      '<div class="exam-bar">' +
        '<span class="which">' + esc(ex.title) + " · Item " + (ex.idx + 1) + " of " + ex.questions.length + "</span>" +
        (ex.secondsLeft != null ? '<span class="timer" id="examTimer">' + fmtTime(ex.secondsLeft) + "</span>" : "") +
      "</div>" +
      '<div class="progress-track"><div class="progress-fill" style="width:' + Math.round((answered / ex.questions.length) * 100) + '%"></div></div>' +
      '<div class="q-card">' +
        '<p class="q-num">Item ' + (ex.idx + 1) + "</p>" +
        (q.passage ? '<div class="q-passage">' + esc(q.passage) + "</div>" : "") +
        '<p class="q-text">' + esc(q.q) + "</p>" +
        '<div class="choices">' + choices + "</div>" +
      "</div>" +
      '<div class="exam-nav">' +
        '<button class="btn" id="navPrev"' + (ex.idx === 0 ? " disabled" : "") + ">&larr; Back</button>" +
        (ex.idx < ex.questions.length - 1
          ? '<button class="btn btn-ink" id="navNext">Next &rarr;</button>'
          : '<button class="btn btn-primary" id="navSubmit">Submit answers</button>') +
      "</div>" +
      '<div class="palette"><div class="palette-head">Answer sheet · ' + answered + " shaded</div>" +
        '<div class="palette-grid">' + palette + "</div>" +
        '<div style="margin-top:12px"><button class="btn btn-sm" id="submitEarly">Finish & submit now</button> ' +
        '<button class="btn btn-ghost btn-sm" id="quitBtn">Exit without saving</button></div>' +
      "</div>";

    Array.prototype.forEach.call(document.querySelectorAll(".choice"), function (el) {
      el.onclick = function () {
        ex.answers[ex.idx] = parseInt(el.getAttribute("data-c"), 10);
        if (ex.idx < ex.questions.length - 1) { ex.idx++; }
        renderExamQuestion();
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll(".pal-dot"), function (el) {
      el.onclick = function () { ex.idx = parseInt(el.getAttribute("data-j"), 10); renderExamQuestion(); };
    });
    var prev = document.getElementById("navPrev");
    if (prev) prev.onclick = function () { if (ex.idx > 0) { ex.idx--; renderExamQuestion(); } };
    var next = document.getElementById("navNext");
    if (next) next.onclick = function () { ex.idx++; renderExamQuestion(); };
    var sub = document.getElementById("navSubmit");
    if (sub) sub.onclick = submitExam;
    document.getElementById("submitEarly").onclick = function () {
      var blank = ex.questions.length - Object.keys(ex.answers).length;
      if (blank > 0 && !window.confirm(blank + " item(s) are still blank and will be marked wrong. Submit anyway?")) return;
      submitExam();
    };
    document.getElementById("quitBtn").onclick = function () {
      if (window.confirm("Exit this exam? Your answers will not be saved.")) {
        if (ex.timerId) clearInterval(ex.timerId);
        state.exam = null;
        go("dashboard");
      }
    };
  }

  function submitExam() {
    var ex = state.exam;
    if (!ex) return;
    if (ex.timerId) clearInterval(ex.timerId);
    var score = 0;
    ex.questions.forEach(function (q, i) {
      if (ex.answers[i] === q.answer) score++;
    });
    state.lastResult = {
      topicId: ex.topicId, mode: ex.mode, title: ex.title,
      questions: ex.questions, answers: ex.answers,
      score: score, total: ex.questions.length,
      pct: Math.round((score / ex.questions.length) * 1000) / 10
    };
    saveResult(ex.topicId, ex.mode, score, ex.questions.length, ex.answers);
    state.exam = null;
    go("results");
  }

  /* ---------------- results & review ---------------- */

  function renderResults() {
    var r = state.lastResult;
    if (!r) { go("dashboard"); return; }
    var pass = r.pct >= PASS_MARK;
    $app.innerHTML =
      '<div class="score-card">' +
        '<p class="q-num">' + esc(r.title) + " · submitted</p>" +
        '<div class="score-big">' + r.pct + "</div>" +
        '<p class="score-sub">' + r.score + " correct out of " + r.total + " · passing grade is " + PASS_MARK + ".00</p>" +
        '<p class="score-verdict ' + (pass ? "pass" : "fail") + '">' +
          (pass ? "PASADO! You cleared the passing grade — keep this level up." :
                  "Below 80 — review the solutions below, then take it again.") + "</p>" +
      "</div>" +
      '<div class="exam-nav">' +
        '<button class="btn btn-primary" id="revBtn">Review answers & solutions</button>' +
        '<button class="btn" id="backBtn">Back to my review</button>' +
      "</div>";
    document.getElementById("revBtn").onclick = function () { go("review"); };
    document.getElementById("backBtn").onclick = function () { go("dashboard"); };
  }

  function renderReview() {
    var r = state.lastResult;
    if (!r) { go("dashboard"); return; }

    var items = r.questions.map(function (q, i) {
      var chosen = r.answers[i];
      var right = chosen === q.answer;

      var choices = q.choices.map(function (c, ci) {
        var cls = "choice";
        if (ci === q.answer) cls += " correct";
        else if (ci === chosen) cls += " incorrect";
        return '<div class="' + cls + '"><span class="bubble">' + letter(ci) + "</span><span>" + esc(c) + "</span></div>";
      }).join("");

      var solutionBlock;
      if (state.premium) {
        solutionBlock =
          '<div class="solution"><div class="sol-label">Why ' + letter(q.answer) + " is correct</div>" +
          "<p>" + esc(q.solution) + "</p></div>";
      } else {
        solutionBlock =
          '<div class="locked-solution">Detailed solution is a premium feature.<br/>' +
          '<button class="btn btn-primary btn-sm lockedUp">Unlock all solutions — ' + esc(CFG.PRICE_LABEL || "₱499") + "</button></div>";
      }

      return (
        '<div class="q-card">' +
          '<p class="q-num">Item ' + (i + 1) + " · " + (chosen == null ? "BLANK" : right ? "CORRECT" : "WRONG") + "</p>" +
          (q.passage ? '<div class="q-passage">' + esc(q.passage) + "</div>" : "") +
          '<p class="q-text">' + esc(q.q) + "</p>" +
          '<div class="choices">' + choices + "</div>" +
          solutionBlock +
        "</div>"
      );
    }).join("");

    var palette = r.questions.map(function (q, i) {
      var chosen = r.answers[i];
      var cls = "pal-dot " + (chosen === q.answer ? "right" : "miss");
      return '<span class="' + cls + '">' + (i + 1) + "</span>";
    }).join("");

    $app.innerHTML =
      '<div class="dash-head"><div><h2>Review · ' + esc(r.title) + "</h2>" +
      '<p class="sub">Green = correct answer. Red = what you shaded. Read every solution — that is where the learning happens.</p></div>' +
      '<span class="premium-pill ' + (r.pct >= PASS_MARK ? "paid" : "free") + '">' + r.pct + "%</span></div>" +
      '<div class="palette"><div class="palette-head">Your sheet</div><div class="palette-grid">' + palette + "</div></div>" +
      items +
      '<div class="exam-nav" style="margin-top:8px">' +
        '<button class="btn btn-ink" id="againBtn">Take it again</button>' +
        '<button class="btn" id="backBtn2">Back to my review</button>' +
      "</div>";

    Array.prototype.forEach.call(document.querySelectorAll(".lockedUp"), function (el) {
      el.onclick = function () { go("upgrade"); };
    });
    document.getElementById("againBtn").onclick = function () {
      r.mode === "mock" ? startMock() : startPractice(r.topicId);
    };
    document.getElementById("backBtn2").onclick = function () { go("dashboard"); };
  }

  /* ---------------- upgrade ---------------- */

  function renderUpgrade() {
    $app.innerHTML =
      '<div class="upgrade-card">' +
        "<h2>Unlock the full reviewer</h2>" +
        '<div class="score-big" style="font-size:2rem">' +
          (CFG.PRICE_COMPARE ? '<s style="opacity:0.45;font-weight:400;margin-right:10px">' + esc(CFG.PRICE_COMPARE) + "</s>" : "") +
          esc(CFG.PRICE_LABEL || "₱499 one-time") + "</div>" +
        (CFG.PRICE_URGENCY ? '<p style="font-size:0.8rem;background:var(--sun-soft);border:1.5px solid var(--sun);color:var(--ink);padding:6px 12px;border-radius:6px;font-weight:700;display:inline-block;margin-top:6px">' + esc(CFG.PRICE_URGENCY) + "</p>" : "") +
        '<p class="score-sub">All ' + totalQuestions() + " questions · every detailed solution · timed mock exam · lifetime access</p>" +
        "<ol>" +
          "<li>Tap the button below and pay via GCash, Maya, or card.</li>" +
          "<li>Use the <b>same email</b> as your PasadoPH account when paying.</li>" +
          "<li>Your account is upgraded within a few hours (usually much faster). Just log in again.</li>" +
        "</ol>" +
        '<button class="btn btn-primary btn-block" id="payNow">Pay ' + esc(CFG.PRICE_LABEL || "₱499") + " now</button>" +
        '<button class="btn btn-block" id="paidRefresh" style="margin-top:10px">I already paid — activate my access</button>' +
        '<div id="upMsg"></div>' +
        '<p class="upgrade-note">Paid but still locked? <button id="upContact" style="background:none;border:none;font-weight:700;text-decoration:underline;color:var(--muted);cursor:pointer;font-size:inherit">Contact us</button> with your payment reference.</p>' +
        '<button class="btn btn-ghost btn-block" id="upBack" style="margin-top:8px">Maybe later</button>' +
      "</div>";
    document.getElementById("upBack").onclick = function () { go("dashboard"); };
    var payBtn = document.getElementById("payNow");
    if (payBtn) payBtn.onclick = async function () {
      var btn = this;
      btn.disabled = true;
      btn.textContent = "Preparing secure checkout\u2026";
      try {
        var res = await fetch("/.netlify/functions/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: state.user && state.user.email ? state.user.email : "" })
        });
        var out = await res.json();
        if (out && out.url) { window.location.href = out.url; return; }
        throw new Error("no url");
      } catch (e) {
        // fallback to the hosted payment page
        if (CFG.PAYMONGO_LINK) { window.open(CFG.PAYMONGO_LINK, "_blank"); }
        btn.disabled = false;
        btn.textContent = "Pay " + (CFG.PRICE_LABEL || "\u20b1499") + " now";
      }
    };
    var upC = document.getElementById("upContact");
    if (upC) upC.onclick = function () { go("contact"); };
    var pr = document.getElementById("paidRefresh");
    if (pr) pr.onclick = async function () {
      this.disabled = true;
      await loadProfile();
      if (state.premium) { go("dashboard"); return; }
      document.getElementById("upMsg").innerHTML =
        '<div class="form-msg err">Not activated yet. Activation is automatic within a few minutes of payment — if it\'s been longer, use Contact us below with your payment reference.</div>';
      this.disabled = false;
    };
  }



  function renderForgot() {
    $app.innerHTML =
      '<div class="auth-card">' +
        "<h2>Reset your password</h2>" +
        '<p class="sub">Enter your account email and we\'ll send you a reset link.</p>' +
        '<div class="field"><label for="fEmail">Email</label><input id="fEmail" type="email" autocomplete="email" placeholder="you@email.com" /></div>' +
        '<button class="btn btn-primary btn-block" id="fSend">Send reset link</button>' +
        '<div id="fMsg"></div>' +
        '<p class="auth-switch"><button id="fBack">Back to log in</button></p>' +
      "</div>";
    document.getElementById("fBack").onclick = function () { go("auth", "login"); };
    document.getElementById("fSend").onclick = async function () {
      var email = document.getElementById("fEmail").value.trim();
      var $msg = document.getElementById("fMsg");
      if (!email || email.indexOf("@") < 1) {
        $msg.innerHTML = '<div class="form-msg err">Please enter a valid email address.</div>';
        return;
      }
      if (!supa) { $msg.innerHTML = '<div class="form-msg err">Accounts are not set up yet.</div>'; return; }
      this.disabled = true;
      try {
        var out = await supa.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
        $msg.innerHTML = out.error
          ? '<div class="form-msg err">' + esc(friendlyAuthError(out.error)) + "</div>"
          : '<div class="form-msg ok">Reset link sent! Check your inbox (and spam folder), then follow the link.</div>';
      } catch (e) {
        $msg.innerHTML = '<div class="form-msg err">' + esc(friendlyAuthError(e)) + "</div>";
      }
      this.disabled = false;
    };
  }

  function renderResetPass() {
    $app.innerHTML =
      '<div class="auth-card">' +
        "<h2>Choose a new password</h2>" +
        '<p class="sub">You\'re verified — set a new password for your account.</p>' +
        '<div class="field"><label for="rPass">New password</label><input id="rPass" type="password" autocomplete="new-password" placeholder="At least 8 characters" /></div>' +
        '<div class="field"><label for="rPass2">Confirm new password</label><input id="rPass2" type="password" autocomplete="new-password" placeholder="Re-type your password" /></div>' +
        '<button class="btn btn-primary btn-block" id="rGo">Save new password</button>' +
        '<div id="rMsg"></div>' +
      "</div>";
    document.getElementById("rGo").onclick = async function () {
      var p1 = document.getElementById("rPass").value;
      var p2 = document.getElementById("rPass2").value;
      var $msg = document.getElementById("rMsg");
      if (p1.length < 8) { $msg.innerHTML = '<div class="form-msg err">Password must be at least 8 characters.</div>'; return; }
      if (p1 !== p2) { $msg.innerHTML = '<div class="form-msg err">Passwords do not match.</div>'; return; }
      this.disabled = true;
      try {
        var out = await supa.auth.updateUser({ password: p1 });
        if (out.error) {
          $msg.innerHTML = '<div class="form-msg err">' + esc(friendlyAuthError(out.error)) + "</div>";
          this.disabled = false;
          return;
        }
        $msg.innerHTML = '<div class="form-msg ok">Password updated! Taking you to your review desk…</div>';
        await loadProfile();
        setTimeout(function () { go("dashboard"); }, 1200);
      } catch (e) {
        $msg.innerHTML = '<div class="form-msg err">' + esc(friendlyAuthError(e)) + "</div>";
        this.disabled = false;
      }
    };
  }

  function renderContact() {
    $app.innerHTML =
      '<div class="auth-card">' +
        "<h2>Contact us</h2>" +
        '<p class="sub">We usually reply within 24 hours.</p>' +
        '<div class="field"><label for="cName">Your name</label><input id="cName" type="text" placeholder="Juan Dela Cruz" /></div>' +
        '<div class="field"><label for="cEmail">Email address</label><input id="cEmail" type="email" placeholder="you@email.com" value="' + esc(state.user && state.user.email && !state.user.preview ? state.user.email : "") + '" /></div>' +
        '<div class="field"><label for="cTopic">Subject</label>' +
          '<select id="cTopic" style="width:100%;padding:11px 12px;font-size:1rem;border:2px solid var(--ink);border-radius:8px;background:var(--paper);font-family:var(--font-body);color:var(--ink)">' +
            '<option>General inquiry</option>' +
            '<option>Payment & premium access</option>' +
            '<option>Report a problem</option>' +
            '<option>Question or solution feedback</option>' +
          "</select></div>" +
        '<div class="field"><label for="cMsg">Message</label><textarea id="cMsg" rows="5" placeholder="Describe your question or concern in as much detail as possible so we can help you faster..." style="width:100%;padding:11px 12px;font-size:1rem;border:2px solid var(--ink);border-radius:8px;background:var(--paper);font-family:var(--font-body);color:var(--ink);resize:vertical"></textarea></div>' +
        '<button class="btn btn-primary btn-block" id="cSend">Send message</button>' +
        '<div id="cMsgOut"></div>' +
        '<p class="auth-switch"><button id="cBack">Back</button></p>' +
      "</div>";

    document.getElementById("cBack").onclick = function () {
      go(state.user ? "dashboard" : "landing");
    };
    document.getElementById("cSend").onclick = async function () {
      var name = document.getElementById("cName").value.trim();
      var email = document.getElementById("cEmail").value.trim();
      var topic = document.getElementById("cTopic").value;
      var msg = document.getElementById("cMsg").value.trim();
      var $out = document.getElementById("cMsgOut");
      if (!name || !email || email.indexOf("@") < 1 || !msg) {
        $out.innerHTML = '<div class="form-msg err">Please fill in your name, a valid email, and your message.</div>';
        return;
      }
      this.disabled = true;
      try {
        var body = new URLSearchParams({
          "form-name": "contact", "bot-field": "",
          name: name, email: email, subject: topic, message: msg
        }).toString();
        var res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body
        });
        if (res.ok) {
          $out.innerHTML = '<div class="form-msg ok">Message sent! We\'ll get back to you within 24 hours.</div>';
          document.getElementById("cMsg").value = "";
        } else {
          $out.innerHTML = '<div class="form-msg err">Could not send right now. Please try again in a moment.</div>';
          this.disabled = false;
        }
      } catch (e) {
        $out.innerHTML = '<div class="form-msg err">Could not send right now. Please try again in a moment.</div>';
        this.disabled = false;
      }
    };
  }

  /* ---------------- boot ---------------- */

  (async function boot() {
    await initAuth();
    renderTopbar();
    var params = new URLSearchParams(window.location.search);
    var justPaid = params.get("paid") === "1";
    if (params.get("paid") || params.get("cancelled")) {
      try { window.history.replaceState({}, "", window.location.pathname); } catch (e) {}
    }
    if (justPaid && state.user && supa) {
      renderPaidWait();
      return;
    }
    go(state.user ? "dashboard" : "landing");
  })();

  function renderPaidWait() {
    $app.innerHTML =
      '<div class="auth-card" style="text-align:center">' +
        '<div class="verify-icon" aria-hidden="true">\u2713</div>' +
        "<h2>Payment received!</h2>" +
        '<p class="sub">Activating your premium access\u2026 this usually takes a few seconds.</p>' +
        '<div id="pwMsg"></div>' +
      "</div>";
    var tries = 0;
    var timer = setInterval(async function () {
      tries++;
      await loadProfile();
      if (state.premium) {
        clearInterval(timer);
        go("dashboard");
        return;
      }
      if (tries >= 10) {
        clearInterval(timer);
        document.getElementById("pwMsg").innerHTML =
          '<div class="form-msg ok">Payment confirmed \u2014 activation is finishing up. Use the button below in a minute, or Contact us if it takes longer.</div>' +
          '<button class="btn btn-primary btn-block" id="pwRetry" style="margin-top:10px">Check my access</button>';
        document.getElementById("pwRetry").onclick = async function () {
          await loadProfile();
          if (state.premium) go("dashboard");
        };
      }
    }, 3000);
  }
})();
