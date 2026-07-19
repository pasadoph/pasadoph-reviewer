/* PasadoPH — analytical bank (50 items, auto-balanced choice order) */
window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS.analytical = [
  {
    "q": "DOCTOR : HOSPITAL :: TEACHER : ______",
    "choices": [
      "School",
      "Lesson",
      "Book",
      "Student"
    ],
    "answer": 0,
    "solution": "The relationship is worker : workplace. A doctor works in a hospital; a teacher works in a school.\nState the bridge as a sentence — \"A doctor works in a hospital\" — then test each choice in the same sentence. \"Student\" is who a teacher serves, not where a teacher works."
  },
  {
    "q": "PEN : WRITE :: SCISSORS : ______",
    "choices": [
      "Sharp",
      "Cut",
      "Metal",
      "Paper"
    ],
    "answer": 1,
    "solution": "The relationship is tool : function. A pen is used to write; scissors are used to cut.\n\"Paper\" is what scissors act on, \"sharp\" and \"metal\" are qualities — none expresses the tool's FUNCTION."
  },
  {
    "q": "HAPPY : ECSTATIC :: SAD : ______",
    "choices": [
      "Miserable",
      "Tired",
      "Angry",
      "Calm"
    ],
    "answer": 0,
    "solution": "The relationship is degree of intensity: ecstatic is an extreme form of happy, so the answer must be an extreme form of sad — miserable.\n\"Angry\" is a different emotion entirely, not an intensified sadness. Analogies of degree are common; always ask whether the second word is simply a stronger version of the first."
  },
  {
    "q": "PESO : PHILIPPINES :: YEN : ______",
    "choices": [
      "Thailand",
      "Japan",
      "China",
      "Korea"
    ],
    "answer": 1,
    "solution": "The relationship is currency : country. The peso is the currency of the Philippines; the yen is the currency of Japan.\nChina uses the yuan, Korea the won, and Thailand the baht — knowing neighboring currencies helps eliminate distractors."
  },
  {
    "q": "DROUGHT : RAIN :: FAMINE : ______",
    "choices": [
      "Hunger",
      "Disease",
      "Poverty",
      "Food"
    ],
    "answer": 3,
    "solution": "The relationship is a shortage : the thing lacking. A drought is a prolonged lack of rain; a famine is a prolonged lack of food.\n\"Hunger\" is the EFFECT of famine, not the missing resource — a subtle but decisive difference."
  },
  {
    "q": "PAGE : BOOK :: BRICK : ______",
    "choices": [
      "Mason",
      "Clay",
      "Cement",
      "Wall"
    ],
    "answer": 3,
    "solution": "The relationship is part : whole. Pages make up a book; bricks make up a wall.\n\"Clay\" is what a brick is made of (material, not whole), \"cement\" joins bricks, and a \"mason\" lays them — only \"wall\" is the larger structure composed of bricks."
  },
  {
    "q": "THERMOMETER : TEMPERATURE :: BAROMETER : ______",
    "choices": [
      "Air pressure",
      "Wind",
      "Rainfall",
      "Humidity"
    ],
    "answer": 0,
    "solution": "The relationship is instrument : quantity measured. A thermometer measures temperature; a barometer measures atmospheric (air) pressure.\nRelated instruments worth memorizing: anemometer — wind speed; hygrometer — humidity; rain gauge — rainfall; seismograph — earthquakes."
  },
  {
    "q": "GENEROUS : STINGY :: HUMBLE : ______",
    "choices": [
      "Poor",
      "Honest",
      "Arrogant",
      "Quiet"
    ],
    "answer": 2,
    "solution": "The relationship is antonyms: generous is the opposite of stingy, so we need the opposite of humble — arrogant.\n\"Quiet\" is sometimes associated with humility but is not its opposite; opposites must directly negate the quality."
  },
  {
    "q": "SEED : TREE :: EGG : ______",
    "choices": [
      "Bird",
      "Nest",
      "Feather",
      "Shell"
    ],
    "answer": 0,
    "solution": "The relationship is origin : mature form. A seed grows into a tree; an egg develops into a bird.\n\"Nest,\" \"shell,\" and \"feather\" are associated with eggs and birds but do not express growth into a mature organism."
  },
  {
    "q": "LIBRARY : BOOKS :: GRANARY : ______",
    "choices": [
      "Grain",
      "Tools",
      "Animals",
      "Farmers"
    ],
    "answer": 0,
    "solution": "The relationship is storage place : thing stored. A library stores books; a granary stores grain.\nEven if \"granary\" is unfamiliar, its root \"gran-\" (as in grains) points to the answer — use word roots when a term is new."
  },
  {
    "q": "CHAPTER : NOVEL :: EPISODE : ______",
    "choices": [
      "Script",
      "Series",
      "Actor",
      "Camera"
    ],
    "answer": 1,
    "solution": "The relationship is part : whole in storytelling. Chapters make up a novel; episodes make up a series.\n\"Actor,\" \"camera,\" and \"script\" relate to production, not to the part-whole structure of the work itself."
  },
  {
    "q": "OBSCURE : CLARITY :: CHAOTIC : ______",
    "choices": [
      "Order",
      "Confusion",
      "Noise",
      "Speed"
    ],
    "answer": 0,
    "solution": "The relationship is adjective : quality it lacks. Something obscure lacks clarity; something chaotic lacks order.\nThe trap \"confusion\" describes what chaos HAS, but the analogy requires what it LACKS — always confirm the direction of the relationship in the first pair before answering."
  },
  {
    "q": "All government employees must file a SALN. Maria is a government employee. Therefore:",
    "choices": [
      "Maria must file a SALN.",
      "No conclusion can be drawn.",
      "Maria may choose not to file a SALN.",
      "Maria is exempted from filing."
    ],
    "answer": 0,
    "solution": "This is a valid syllogism. Major premise: ALL government employees file a SALN. Minor premise: Maria belongs to that group. Conclusion: Maria must file.\nWhen the major premise says ALL and the subject clearly belongs to the group, the conclusion follows with certainty."
  },
  {
    "q": "All birds have feathers. A penguin is a bird. Which conclusion is valid?",
    "choices": [
      "A penguin has feathers.",
      "A penguin can fly.",
      "All feathered animals are penguins.",
      "Penguins are not birds."
    ],
    "answer": 0,
    "solution": "The premises guarantee only one thing: penguins, being birds, have feathers.\n\"A penguin can fly\" imports outside knowledge (and is false anyway) — the premises say nothing about flying. \"All feathered animals are penguins\" illegally reverses the first premise. In syllogisms, use ONLY what the premises state."
  },
  {
    "q": "Some employees are athletes. All athletes are disciplined. Which conclusion is valid?",
    "choices": [
      "Some employees are disciplined.",
      "All employees are disciplined.",
      "All disciplined people are athletes.",
      "No employees are disciplined."
    ],
    "answer": 0,
    "solution": "The employees who are athletes must be disciplined (since ALL athletes are). Therefore at least SOME employees are disciplined.\nWe cannot conclude ALL employees are disciplined — the premises cover only the athlete-employees. \"Some\" conclusions are the safest when a premise begins with \"Some.\""
  },
  {
    "q": "If it rains, the streets get wet. The streets are wet. Which conclusion is valid?",
    "choices": [
      "It did not rain.",
      "It may or may not have rained — the wet streets do not prove rain.",
      "It certainly rained.",
      "The streets are dry."
    ],
    "answer": 1,
    "solution": "This is the classic fallacy of AFFIRMING THE CONSEQUENT. Rain guarantees wet streets, but wet streets do not guarantee rain — a burst pipe or street cleaning could also wet them.\nOnly two valid moves exist for \"If P then Q\": (1) P is true, so Q is true; (2) Q is false, so P is false. Anything else proves nothing."
  },
  {
    "q": "If an examinee arrives late, he will not be admitted. Carlo was admitted. Which conclusion is valid?",
    "choices": [
      "Carlo took a different exam.",
      "Carlo arrived late.",
      "Carlo did not arrive late.",
      "No conclusion can be drawn."
    ],
    "answer": 2,
    "solution": "This is the valid form called MODUS TOLLENS (denying the consequent). The rule: late → not admitted. Carlo WAS admitted — the consequence \"not admitted\" is false, so the condition \"late\" must also be false. Therefore Carlo did not arrive late.\nCompare with the previous item: denying the consequent is valid; affirming it is not."
  },
  {
    "q": "No lazy person passes the exam. Dina passed the exam. Which conclusion is valid?",
    "choices": [
      "The exam was easy.",
      "Dina is lazy.",
      "Some lazy persons pass.",
      "Dina is not lazy."
    ],
    "answer": 3,
    "solution": "\"No lazy person passes\" means every passer falls outside the lazy group. Dina passed, so she cannot be lazy.\n\"Some lazy persons pass\" directly contradicts the premise, and \"the exam was easy\" introduces information the premises never mention."
  },
  {
    "q": "All A are B. All B are C. Which conclusion is valid?",
    "choices": [
      "No A are C.",
      "All A are C.",
      "All C are A.",
      "Some C are not B."
    ],
    "answer": 1,
    "solution": "This is a chain syllogism: A sits inside B, and B sits inside C, so A must sit inside C — all A are C.\nThe reverse, \"All C are A,\" is invalid: C is the biggest circle and may contain many things that are not A. Drawing quick circle (Venn) sketches makes chain arguments easy to verify."
  },
  {
    "q": "Either the report was submitted on time, or a penalty was imposed. No penalty was imposed. Which conclusion is valid?",
    "choices": [
      "The report was submitted on time.",
      "The report was late.",
      "The penalty was waived.",
      "No conclusion can be drawn."
    ],
    "answer": 0,
    "solution": "In an either-or (disjunctive) statement, if one option is eliminated, the other must be true. No penalty was imposed eliminates the second option, so the first — on-time submission — must hold.\nThis valid pattern is called disjunctive syllogism: either P or Q; not Q; therefore P."
  },
  {
    "q": "Statement: \"All contractual workers in the office received training. Jose did not receive training.\" Which conclusion is valid?",
    "choices": [
      "Jose is not a contractual worker in that office.",
      "Jose refused the training.",
      "The training was optional.",
      "Jose is a contractual worker."
    ],
    "answer": 0,
    "solution": "Every contractual worker received training, but Jose did not — so Jose cannot belong to that group. This is modus tollens applied to group membership.\n\"Jose refused the training\" and \"the training was optional\" invent explanations the premises never provide."
  },
  {
    "q": "Ana is taller than Bea. Bea is taller than Carla. Dana is shorter than Carla. Who is the tallest?",
    "choices": [
      "Bea",
      "Dana",
      "Ana",
      "Carla"
    ],
    "answer": 2,
    "solution": "Chain the comparisons: Ana > Bea > Carla > Dana. Ana stands at the top.\nFor ordering problems, write the chain out with symbols (> or a vertical list) instead of holding it in your head — transcription errors under time pressure are the main cause of wrong answers here."
  },
  {
    "q": "If today is Wednesday, what day will it be 100 days from now?",
    "choices": [
      "Sunday",
      "Saturday",
      "Friday",
      "Thursday"
    ],
    "answer": 2,
    "solution": "Days repeat in cycles of 7. Divide: 100 ÷ 7 = 14 remainder 2. The 98 days (14 full weeks) land back on Wednesday, and the remaining 2 days move to Thursday, then Friday.\nRule: only the REMAINDER matters when counting days of the week."
  },
  {
    "q": "Five friends finished a race. Rico finished ahead of Simon but behind Tomas. Uma finished ahead of Tomas. Vince finished last. Who won the race?",
    "choices": [
      "Tomas",
      "Uma",
      "Rico",
      "Simon"
    ],
    "answer": 1,
    "solution": "Build the order from the clues: Tomas is ahead of Rico, who is ahead of Simon (Tomas > Rico > Simon). Uma is ahead of Tomas, and Vince is last. Final order: Uma, Tomas, Rico, Simon, Vince — Uma won.\nProcess clues one at a time and keep an updated line; never try to satisfy all clues simultaneously in your head."
  },
  {
    "q": "Statement: \"Employees should take the stairs instead of the elevator to improve their health.\" Which assumption underlies this statement?",
    "choices": [
      "Elevators frequently break down.",
      "Climbing stairs provides health benefits.",
      "Employees dislike elevators.",
      "The building has only two floors."
    ],
    "answer": 1,
    "solution": "An assumption is the unstated belief that must be true for the argument to make sense. The advice only works if stair-climbing actually improves health — that is the hidden premise.\nThe other options are neither stated nor required: the argument stands even if elevators never break down."
  },
  {
    "q": "Statement: \"The city government will distribute free umbrellas to traffic enforcers this June.\" Which assumption underlies this action?",
    "choices": [
      "June is a holiday month.",
      "Traffic enforcers requested new uniforms.",
      "Umbrellas are expensive.",
      "Traffic enforcers are frequently exposed to sun and rain."
    ],
    "answer": 3,
    "solution": "The action makes sense only if enforcers need protection from weather — meaning they are exposed to sun and rain while working. That unstated need justifies the distribution.\nTo find assumptions, ask: \"What must be true for this action to be reasonable?\" — then check that the choice is required, not merely related."
  },
  {
    "q": "Argument: \"Sales of umbrellas doubled this month. Therefore, the rainy season has begun.\" What is the FLAW in this argument?",
    "choices": [
      "Umbrella sales never change.",
      "It uses statistics.",
      "It assumes only one possible cause for the increase in sales.",
      "It is too short."
    ],
    "answer": 2,
    "solution": "The argument leaps from an effect (higher sales) to a single cause (rain), ignoring alternatives — a promotion, a new store, intense summer heat driving umbrella use for shade. Concluding one specific cause from an effect that has many possible causes is a classic causal fallacy."
  },
  {
    "q": "Statement: \"Since the new one-way scheme started, travel time along the avenue dropped by 15 minutes.\" Which conclusion is BEST supported?",
    "choices": [
      "The one-way scheme should be implemented nationwide.",
      "Travel along the avenue became faster after the scheme started.",
      "All commuters are satisfied with the scheme.",
      "Accidents have decreased."
    ],
    "answer": 1,
    "solution": "The data supports only what it measures: travel time on that avenue fell after the scheme began. Expanding nationwide, commuter satisfaction, and accident rates all go beyond the evidence.\nThe best-supported conclusion is the most modest one that restates the evidence — beware of choices that overgeneralize."
  },
  {
    "q": "Statement: \"Every time our team wears red, we win. We should wear red in the championship.\" What error does this reasoning commit?",
    "choices": [
      "It cites too much data.",
      "It relies on expert opinion.",
      "It confuses correlation with causation.",
      "It uses a valid syllogism."
    ],
    "answer": 2,
    "solution": "Wearing red merely coincided with winning; nothing shows the color CAUSED the wins (skill, opponents, and luck are the real factors). Treating a coincidence as a cause is the correlation-causation fallacy — one of the most tested reasoning errors in the CSE."
  },
  {
    "q": "Statement: \"Attendance at the seminar is required for all division chiefs. Attendance is optional for the rest of the staff.\" Which of the following MUST be true?",
    "choices": [
      "All staff members will attend.",
      "Rank-and-file employees are prohibited from attending.",
      "The seminar is not important.",
      "A division chief who skips the seminar violates the requirement."
    ],
    "answer": 3,
    "solution": "Required attendance means a division chief who skips it fails to comply — that follows necessarily. \"Optional\" for other staff means they may attend or not, so neither universal attendance nor prohibition follows.\nFor MUST-BE-TRUE items, reject any choice that is merely possible or likely; only logical necessity qualifies."
  },
  {
    "q": "Argument: \"My neighbor's herbal drink cured his cough, so it will cure any illness.\" What is the flaw?",
    "choices": [
      "Overgeneralizing from a single case",
      "Using scientific evidence",
      "Quoting an authority",
      "Understating the benefits"
    ],
    "answer": 0,
    "solution": "One person's recovery from one ailment cannot establish that the drink cures ALL illnesses — the sample is a single case and the claim is universal. This is hasty generalization: stretching thin evidence over a sweeping conclusion."
  },
  {
    "q": "Statement: \"If the budget is approved, the road project will start in March. The budget was approved in January.\" Which conclusion follows?",
    "choices": [
      "The project started in January.",
      "The budget was insufficient.",
      "The road project was cancelled.",
      "The road project will start in March."
    ],
    "answer": 3,
    "solution": "This is modus ponens, the most basic valid form: If P then Q; P is true; therefore Q. The budget (P) was approved, so the March start (Q) follows.\nThe project starting in January confuses the budget's approval date with the project's start date — read conditional statements precisely."
  },
  {
    "q": "Survey result: \"70% of respondents in an online poll of a gadget website prefer working from home.\" Why should we be cautious about concluding that most Filipino workers prefer working from home?",
    "choices": [
      "Working from home is illegal.",
      "The percentage is too high to be real.",
      "Surveys are always wrong.",
      "Online tech-site respondents may not represent all Filipino workers."
    ],
    "answer": 3,
    "solution": "The sample is biased: visitors of a gadget website are likely tech-savvy people whose jobs suit remote work. They do not mirror farmers, drivers, factory workers, or field personnel. A conclusion about ALL workers requires a representative sample — this is the sampling-bias flaw."
  },
  {
    "q": "Statement: \"The office will procure 50 new computers because most existing units are more than eight years old and frequently break down.\" Which conclusion is best supported?",
    "choices": [
      "All 50 computers will arrive next week.",
      "The procurement is intended to replace aging, unreliable equipment.",
      "Employees caused the breakdowns.",
      "The old computers will be sold to employees."
    ],
    "answer": 1,
    "solution": "The stated reasons — old age and frequent breakdowns — directly support replacement as the purpose. Selling old units, delivery dates, and blame for breakdowns are all unstated.\nAnchor conclusions to the reasons explicitly given, nothing more."
  },
  {
    "passage": "Monthly sales of a cooperative store (in thousand pesos):\nJanuary — 120\nFebruary — 150\nMarch — 90\nApril — 180\nMay — 160",
    "q": "In which month were sales the LOWEST?",
    "choices": [
      "January",
      "February",
      "March",
      "May"
    ],
    "answer": 2,
    "solution": "Scan the values: 120, 150, 90, 180, 160. The smallest is 90, recorded in March.\nFor lowest/highest questions, resist computing anything — a single careful scan answers it."
  },
  {
    "passage": "Monthly sales of a cooperative store (in thousand pesos):\nJanuary — 120\nFebruary — 150\nMarch — 90\nApril — 180\nMay — 160",
    "q": "What is the average monthly sales over the five months?",
    "choices": [
      "₱140 thousand",
      "₱130 thousand",
      "₱145 thousand",
      "₱150 thousand"
    ],
    "answer": 0,
    "solution": "Add all values: 120 + 150 + 90 + 180 + 160 = 700. Divide by the number of months: 700 ÷ 5 = 140, so ₱140 thousand.\nGroup numbers that add neatly (120 + 180 = 300; 150 + 160 = 310; +90 = 700) to reduce arithmetic slips."
  },
  {
    "passage": "Monthly sales of a cooperative store (in thousand pesos):\nJanuary — 120\nFebruary — 150\nMarch — 90\nApril — 180\nMay — 160",
    "q": "By what percent did sales increase from March to April?",
    "choices": [
      "50%",
      "90%",
      "100%",
      "75%"
    ],
    "answer": 2,
    "solution": "Change: 180 − 90 = 90. Percent increase = change ÷ original = 90 ÷ 90 = 1 = 100%.\nSales doubled from March to April, and doubling is always a 100% increase — a fact worth internalizing for data questions."
  },
  {
    "passage": "An office's 40 employees chose their preferred training topic:\nComputer skills — 16\nCommunication — 10\nLeadership — 8\nRecords management — 6",
    "q": "What fraction of the employees chose computer skills?",
    "choices": [
      "2/5",
      "1/4",
      "1/2",
      "1/3"
    ],
    "answer": 0,
    "solution": "16 out of 40 chose computer skills: 16/40. Divide both by 8: 2/5.\nCheck the total first (16 + 10 + 8 + 6 = 40 ✓) — the exam sometimes includes tables that do not sum, which changes the denominator."
  },
  {
    "passage": "An office's 40 employees chose their preferred training topic:\nComputer skills — 16\nCommunication — 10\nLeadership — 8\nRecords management — 6",
    "q": "What percent of employees chose either leadership or records management?",
    "choices": [
      "35%",
      "20%",
      "40%",
      "14%"
    ],
    "answer": 0,
    "solution": "Combine the two groups: 8 + 6 = 14 employees. Convert to percent: 14 ÷ 40 = 0.35 = 35%.\nThe trap answer 14% repeats the raw count as if it were the percentage — always divide by the total."
  },
  {
    "passage": "Examinees per testing center:\nCenter A — 250\nCenter B — 300\nCenter C — 200\nCenter D — 250",
    "q": "What is the ratio of examinees in Center C to Center B, in lowest terms?",
    "choices": [
      "3:2",
      "2:3",
      "4:6",
      "1:2"
    ],
    "answer": 1,
    "solution": "Center C : Center B = 200 : 300. Divide both by 100: 2 : 3.\nWatch the order — the question names C first, so C's number leads. The reversed 3:2 is the standard order trap, and 4:6 is correct in value but not in lowest terms."
  },
  {
    "passage": "Examinees per testing center:\nCenter A — 250\nCenter B — 300\nCenter C — 200\nCenter D — 250",
    "q": "Center B's examinees make up what percent of all examinees?",
    "choices": [
      "25%",
      "33%",
      "30%",
      "35%"
    ],
    "answer": 2,
    "solution": "Total examinees: 250 + 300 + 200 + 250 = 1,000. Center B's share: 300 ÷ 1,000 = 0.30 = 30%.\nA total of 1,000 makes percentages effortless — each 10 examinees is 1%."
  },
  {
    "passage": "A household's monthly budget of ₱20,000:\nFood — 40%\nRent — 25%\nUtilities — 15%\nTransportation — 10%\nSavings — 10%",
    "q": "How much is allotted to rent?",
    "choices": [
      "₱8,000",
      "₱5,000",
      "₱4,000",
      "₱6,000"
    ],
    "answer": 1,
    "solution": "Rent is 25% of ₱20,000: 0.25 × 20,000 = ₱5,000.\nShortcut: 25% is one-fourth, and one-fourth of 20,000 is 5,000. The trap ₱8,000 is the food allocation (40%)."
  },
  {
    "passage": "A household's monthly budget of ₱20,000:\nFood — 40%\nRent — 25%\nUtilities — 15%\nTransportation — 10%\nSavings — 10%",
    "q": "How much MORE is spent on food than on utilities?",
    "choices": [
      "₱8,000",
      "₱3,000",
      "₱5,000",
      "₱6,000"
    ],
    "answer": 2,
    "solution": "Food: 40% of 20,000 = ₱8,000. Utilities: 15% of 20,000 = ₱3,000. Difference: 8,000 − 3,000 = ₱5,000.\nShortcut: the difference in percentages is 40% − 15% = 25%, and 25% of 20,000 = ₱5,000 — same answer, fewer steps."
  },
  {
    "passage": "Applicants processed per day, Monday to Friday: 45, 52, 38, 60, 55.",
    "q": "How many MORE applicants must be processed on Saturday for the six-day total to reach 300?",
    "choices": [
      "55",
      "50",
      "300",
      "45"
    ],
    "answer": 1,
    "solution": "Add Monday–Friday: 45 + 52 + 38 + 60 + 55 = 250. To reach 300: 300 − 250 = 50 applicants on Saturday.\nPair for easy addition: 45 + 55 = 100, 52 + 38 = 90, +60 = 250."
  },
  {
    "q": "Four employees — P, Q, R, and S — sit in a row of four chairs numbered 1 to 4 from left to right. Q sits on chair 1. R sits beside Q. P does not sit beside R. On which chair does P sit?",
    "choices": [
      "Chair 4",
      "Cannot be determined",
      "Chair 2",
      "Chair 3"
    ],
    "answer": 0,
    "solution": "Fix the certain positions first: Q is on chair 1, and R sits beside Q, so R is on chair 2. The chairs left for P and S are 3 and 4.\nNow apply P's constraint: P does not sit beside R (chair 2), so P cannot take chair 3. That forces P onto chair 4, and S takes chair 3.\nCheck: Q(1), R(2), S(3), P(4) — R is beside Q ✓, and P (chair 4) is not adjacent to R (chair 2) ✓. In seating problems, lock in the fixed positions first, then let each restriction eliminate chairs one by one."
  },
  {
    "q": "Five files — V, W, X, Y, Z — are stacked. X is at the top. Z is directly below X. W is at the bottom. Y is directly above W. What is the position of V from the top?",
    "choices": [
      "Third",
      "Second",
      "Fourth",
      "First"
    ],
    "answer": 0,
    "solution": "Place the certain positions: X is 1st, Z is 2nd (directly below X), W is 5th (bottom), Y is 4th (directly above W). Only the 3rd slot remains, so V is third from the top.\nStack and row problems become trivial once you draw the five slots and fill in the fixed positions first — the leftover slot answers the question."
  },
  {
    "q": "In a queue of five people, Mia is ahead of Noel but behind Oscar. Pia is at the very front. Ruel is behind Noel. Who is exactly in the middle of the queue?",
    "choices": [
      "Mia",
      "Noel",
      "Oscar",
      "Ruel"
    ],
    "answer": 0,
    "solution": "Pia is 1st. The clues give the chain Oscar > Mia > Noel > Ruel (Oscar ahead of Mia, Mia ahead of Noel, Ruel behind Noel). Slot them after Pia: Pia (1), Oscar (2), Mia (3), Noel (4), Ruel (5). The middle — third position — is Mia."
  },
  {
    "q": "Three officemates hold different positions: accountant, engineer, and lawyer. Alma is not the engineer. Bino is not the accountant. The lawyer is not Bino and not Cita. Who is the lawyer?",
    "choices": [
      "Bino",
      "Cannot be determined",
      "Alma",
      "Cita"
    ],
    "answer": 2,
    "solution": "The lawyer is not Bino and not Cita — with only three people, the lawyer must be Alma.\nThen Bino, who is not the accountant, must be the engineer, leaving Cita as the accountant. Elimination grids (people vs. positions, crossing out impossibilities) solve every puzzle of this type mechanically."
  },
  {
    "q": "A meeting is attended by exactly four officials seated around a square table, one per side. The director sits opposite the treasurer. The secretary sits to the RIGHT of the director. Who sits opposite the secretary?",
    "choices": [
      "The director",
      "Cannot be determined",
      "The auditor",
      "The treasurer"
    ],
    "answer": 2,
    "solution": "Four seats, four officials: director, treasurer, secretary, and one more — the auditor (the only remaining attendee among the choices). The director and treasurer occupy one opposite pair, so the secretary and the auditor must form the other opposite pair. Therefore the auditor sits opposite the secretary.\nIn round/square-table items, opposite pairs partition the seats — identify the pairs before worrying about left and right."
  },
  {
    "q": "Four runners — Kiko, Lito, Manny, and Nilo — wear jerseys numbered 1 to 4, each with a different number. Kiko's number is twice Lito's number. Manny's number is 3. Nilo's number is not 1. What is Kiko's number?",
    "choices": [
      "3",
      "2",
      "1",
      "4"
    ],
    "answer": 1,
    "solution": "The doubling pairs possible within 1–4 are (Lito 1, Kiko 2) and (Lito 2, Kiko 4). Manny is fixed at 3.\nTest (Lito 2, Kiko 4): the only number left for Nilo is 1 — but Nilo's number is NOT 1, so this case is impossible.\nTherefore Lito is 1, Kiko is 2, and Nilo takes the remaining 4. Check: all different ✓, Kiko (2) is twice Lito (1) ✓, Manny is 3 ✓, Nilo is 4, not 1 ✓. Kiko wears 2. When a puzzle offers two candidate assignments, test each against EVERY constraint — exactly one will survive."
  }
];
