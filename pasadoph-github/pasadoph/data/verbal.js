/* PasadoPH — verbal bank (50 items, auto-balanced choice order) */
window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS.verbal = [
  {
    "q": "Choose the correct sentence.",
    "choices": [
      "The list of applicants are posted yesterday.",
      "The list of applicants were posted yesterday.",
      "The list of applicants have been posted yesterday.",
      "The list of applicants was posted yesterday."
    ],
    "answer": 3,
    "solution": "The subject is \"list,\" which is singular — \"of applicants\" is only a prepositional phrase describing it. A singular subject takes the singular verb \"was.\"\nThis is the classic subject-verb agreement trap: the exam places a plural noun (applicants) right before the verb to lure you into choosing \"were.\" Always find the true subject first."
  },
  {
    "q": "Neither the manager nor the staff members ___ present at the meeting.",
    "choices": [
      "were",
      "was",
      "is",
      "has been"
    ],
    "answer": 0,
    "solution": "With \"neither...nor,\" the verb agrees with the subject CLOSER to it. Here, \"staff members\" (plural) is closer, so use the plural \"were.\"\nIf the sentence were reversed — \"Neither the staff members nor the manager\" — the correct verb would be \"was.\" This proximity rule is tested repeatedly in the CSE."
  },
  {
    "q": "Each of the examinees ___ required to bring a valid ID.",
    "choices": [
      "have been",
      "were",
      "is",
      "are"
    ],
    "answer": 2,
    "solution": "\"Each\" is always singular, no matter what follows it. So the verb must be the singular \"is.\"\nThe words each, every, either, neither, anyone, everyone, somebody, and nobody all take singular verbs — memorize this list; it accounts for many CSE grammar items."
  },
  {
    "q": "The committee submitted ___ report before the deadline.",
    "choices": [
      "they're",
      "its",
      "their",
      "there"
    ],
    "answer": 1,
    "solution": "A collective noun like \"committee\" acting as a single unit is treated as singular in formal English, so the correct pronoun is \"its.\"\n\"There\" indicates a place and \"they're\" means \"they are\" — both are sound-alike traps, not possessive pronouns."
  },
  {
    "q": "Between you and ___, the new policy needs revision.",
    "choices": [
      "me",
      "I",
      "mine",
      "myself"
    ],
    "answer": 0,
    "solution": "\"Between\" is a preposition, and pronouns after a preposition take the objective form: me, him, her, us, them. So it is \"between you and me.\"\n\"Between you and I\" sounds formal to many ears, which is exactly why the exam uses it as a trap — hypercorrection is still an error."
  },
  {
    "q": "If I ___ the director, I would approve the request.",
    "choices": [
      "was",
      "am",
      "be",
      "were"
    ],
    "answer": 3,
    "solution": "This is the subjunctive mood, used for hypothetical or contrary-to-fact situations. The correct form is \"were\" for all subjects: \"If I were,\" \"If she were.\"\nSince the speaker is NOT actually the director, the ordinary past \"was\" is incorrect in formal English."
  },
  {
    "q": "The report is different ___ the one submitted last week.",
    "choices": [
      "with",
      "to",
      "than",
      "from"
    ],
    "answer": 3,
    "solution": "The standard idiom in formal English is \"different FROM.\" \"Different than\" is common in casual American speech but is avoided in formal writing, which is the register the CSE tests.\nRelated idioms often tested: \"similar to,\" \"identical with/to,\" \"compare with\" (for differences) and \"compare to\" (for likeness)."
  },
  {
    "q": "She is one of the employees who ___ always on time.",
    "choices": [
      "has been",
      "is",
      "was",
      "are"
    ],
    "answer": 3,
    "solution": "The pronoun \"who\" refers to \"employees\" (plural), not to \"one.\" The sentence means: of the employees who ARE always on time, she is one. So the plural \"are\" is correct.\nTest it by restructuring: \"Of the employees who are always on time...\" — the plural becomes obvious."
  },
  {
    "q": "Choose the sentence with the correct use of the apostrophe.",
    "choices": [
      "The employees lounge is on the third floor.",
      "The employee's lounge is on the third floor.",
      "The employees' lounge is on the third floor.",
      "The employees lounge's is on the third floor."
    ],
    "answer": 2,
    "solution": "The lounge belongs to the employees (plural). For a plural noun ending in s, the apostrophe goes AFTER the s: employees'.\n\"Employee's\" would mean the lounge of a single employee, and the first option shows no possession at all."
  },
  {
    "q": "The Civil Service Commission, together with the regional offices, ___ the examination schedule.",
    "choices": [
      "are announcing",
      "announces",
      "have announced",
      "announce"
    ],
    "answer": 1,
    "solution": "Phrases like \"together with,\" \"along with,\" \"as well as,\" and \"in addition to\" do NOT make the subject plural. The subject remains \"The Civil Service Commission\" (singular), so the verb is \"announces.\"\nOnly the conjunction \"and\" creates a compound (plural) subject."
  },
  {
    "q": "He had already ___ the memo before the meeting started.",
    "choices": [
      "written",
      "wrote",
      "writing",
      "write"
    ],
    "answer": 0,
    "solution": "\"Had\" signals the past perfect tense, which requires the past participle: had written. \"Wrote\" is the simple past and never follows \"had.\"\nIrregular verb sets like write-wrote-written, do-did-done, and go-went-gone are frequent CSE material."
  },
  {
    "q": "Choose the correct sentence.",
    "choices": [
      "She speaks English good.",
      "She speaks English well.",
      "She speaks English goodly.",
      "She speak English well."
    ],
    "answer": 1,
    "solution": "\"Good\" is an adjective and can only describe nouns; \"well\" is the adverb that describes HOW an action is done. Since \"speaks\" is a verb, it needs the adverb \"well.\"\nThe last option fails subject-verb agreement (\"she speak\"), and \"goodly\" is not standard usage here."
  },
  {
    "q": "The number of applicants ___ increasing every year.",
    "choices": [
      "have been",
      "are",
      "is",
      "were"
    ],
    "answer": 2,
    "solution": "\"THE number\" is singular and takes \"is.\" By contrast, \"A number of\" means \"many\" and takes a plural verb: \"A number of applicants ARE waiting.\"\nThis the/a distinction is a favorite CSE item — the article at the start decides the verb."
  },
  {
    "q": "Identify the error: \"The manager (A) gave the documents (B) to Maria and (C) I (D) yesterday.\"",
    "choices": [
      "A — gave",
      "C — I",
      "D — yesterday",
      "B — to"
    ],
    "answer": 1,
    "solution": "The pronoun receives the action (the documents were given TO the person), so it must be in the objective case: \"to Maria and ME.\"\nQuick test: drop the other person. You would say \"gave the documents to me,\" never \"to I\" — the same form stays correct when Maria is added."
  },
  {
    "q": "___ the heavy rain, the outreach program proceeded as scheduled.",
    "choices": [
      "Due to the fact",
      "Because of",
      "Despite",
      "Although"
    ],
    "answer": 2,
    "solution": "The sentence shows contrast: rain would normally stop the program, yet it proceeded. \"Despite\" + noun phrase expresses this correctly.\n\"Although\" also shows contrast but must be followed by a full clause (subject + verb), e.g., \"Although it rained heavily...\" — it cannot sit directly before \"the heavy rain.\" \"Because of\" wrongly signals cause, not contrast."
  },
  {
    "q": "Choose the word most similar in meaning to CANDID.",
    "choices": [
      "Frank",
      "Careful",
      "Hostile",
      "Secretive"
    ],
    "answer": 0,
    "solution": "\"Candid\" means truthful and straightforward — being open about one's real thoughts. \"Frank\" carries the same meaning.\n\"Secretive\" is closer to its opposite, while \"hostile\" (unfriendly) and \"careful\" (cautious) describe different qualities entirely."
  },
  {
    "q": "Choose the word most similar in meaning to DILIGENT.",
    "choices": [
      "Lazy",
      "Punctual",
      "Talented",
      "Hardworking"
    ],
    "answer": 3,
    "solution": "\"Diligent\" means showing steady, earnest effort in one's work — hardworking. \"Punctual\" (on time) and \"talented\" (skilled) are positive traits often confused with it, but neither captures the idea of persistent effort. \"Lazy\" is the direct opposite."
  },
  {
    "q": "Choose the word OPPOSITE in meaning to TRANSPARENT.",
    "choices": [
      "Opaque",
      "Clear",
      "Fragile",
      "Honest"
    ],
    "answer": 0,
    "solution": "\"Transparent\" means able to be seen through, or figuratively, open and honest. Its direct opposite is \"opaque\" — blocking light, or figuratively, unclear and hard to understand.\nWatch the direction of the question: \"clear\" and \"honest\" are synonyms, planted for examinees who miss the word OPPOSITE."
  },
  {
    "q": "The new supervisor was praised for her PRUDENT handling of the budget. \"Prudent\" means:",
    "choices": [
      "Wise and careful",
      "Careless",
      "Wasteful",
      "Strict and harsh"
    ],
    "answer": 0,
    "solution": "\"Prudent\" means acting with good judgment and care, especially about resources or the future — wise and careful. The sentence context helps: praise for budget handling suggests something positive and responsible, immediately eliminating \"wasteful\" and \"careless.\""
  },
  {
    "q": "Choose the word most similar in meaning to MANDATORY.",
    "choices": [
      "Traditional",
      "Optional",
      "Required",
      "Suggested"
    ],
    "answer": 2,
    "solution": "\"Mandatory\" means required by rule or law — not a matter of choice. \"Optional\" is its exact opposite, and \"suggested\" implies a mere recommendation. This word appears constantly in government documents, e.g., \"attendance is mandatory.\""
  },
  {
    "q": "Choose the word OPPOSITE in meaning to AMPLIFY.",
    "choices": [
      "Diminish",
      "Clarify",
      "Enlarge",
      "Repeat"
    ],
    "answer": 0,
    "solution": "\"Amplify\" means to make larger, stronger, or more intense. The opposite is \"diminish\" — to make smaller or weaker.\n\"Enlarge\" is a synonym trap for those who miss the word OPPOSITE."
  },
  {
    "q": "Despite the criticism, the mayor remained STEADFAST in his decision. \"Steadfast\" means:",
    "choices": [
      "Doubtful",
      "Silent",
      "Firm and unwavering",
      "Angry"
    ],
    "answer": 2,
    "solution": "\"Steadfast\" means firmly fixed and unwavering — not changing one's position. The context clue is \"Despite the criticism...remained\" — the sentence structure signals that he did NOT change, pointing directly to firmness."
  },
  {
    "q": "Choose the word most similar in meaning to METICULOUS.",
    "choices": [
      "Fast",
      "Careless",
      "Generous",
      "Very detailed and precise"
    ],
    "answer": 3,
    "solution": "\"Meticulous\" describes someone who shows extreme care about small details — precise and thorough. It is a favorite word in job descriptions (\"meticulous record-keeping\"). \"Careless\" is its opposite."
  },
  {
    "q": "The witness gave an AMBIGUOUS answer. \"Ambiguous\" means:",
    "choices": [
      "Loud",
      "Truthful",
      "Very clear",
      "Having more than one possible meaning"
    ],
    "answer": 3,
    "solution": "\"Ambiguous\" means open to more than one interpretation — unclear because it could mean different things. Do not confuse it with \"ambivalent,\" which means having mixed FEELINGS about something. The exam loves this near-twin pair."
  },
  {
    "q": "Choose the word most similar in meaning to FEASIBLE.",
    "choices": [
      "Achievable",
      "Expensive",
      "Impossible",
      "Popular"
    ],
    "answer": 0,
    "solution": "\"Feasible\" means capable of being done — practical and achievable. A \"feasibility study\" asks exactly this: can the project realistically be carried out? \"Impossible\" is the direct opposite."
  },
  {
    "q": "Choose the word OPPOSITE in meaning to LENIENT.",
    "choices": [
      "Patient",
      "Fair",
      "Strict",
      "Kind"
    ],
    "answer": 2,
    "solution": "\"Lenient\" means permissive and merciful — not harsh in discipline. Its opposite is \"strict.\" A lenient teacher forgives late homework; a strict one enforces every rule."
  },
  {
    "q": "The auditor found several DISCREPANCIES in the financial report. \"Discrepancies\" means:",
    "choices": [
      "Inconsistencies or differences",
      "Signatures",
      "Improvements",
      "Attachments"
    ],
    "answer": 0,
    "solution": "A \"discrepancy\" is a difference between things that should match — an inconsistency. Context confirms it: auditors look for figures that do not agree. This is essential government vocabulary, appearing in COA reports and audit findings."
  },
  {
    "q": "Choose the word most similar in meaning to ADVOCATE (verb).",
    "choices": [
      "Support publicly",
      "Oppose",
      "Question",
      "Postpone"
    ],
    "answer": 0,
    "solution": "To \"advocate\" is to publicly support or argue for a cause or policy. As a noun, an advocate is a supporter. \"Oppose\" is the direct opposite."
  },
  {
    "q": "His explanation was so VAGUE that nobody understood the new procedure. \"Vague\" means:",
    "choices": [
      "Lengthy",
      "Technical",
      "Detailed",
      "Unclear or imprecise"
    ],
    "answer": 3,
    "solution": "\"Vague\" means not clearly expressed or defined. The context clue \"nobody understood\" tells you the meaning must be negative and about clarity — eliminating \"detailed\" instantly. \"Lengthy\" and \"technical\" could confuse people too, but the core meaning of vague is imprecision, not length or difficulty."
  },
  {
    "q": "Choose the word OPPOSITE in meaning to ABUNDANT.",
    "choices": [
      "Cheap",
      "Plentiful",
      "Scarce",
      "Available"
    ],
    "answer": 2,
    "solution": "\"Abundant\" means existing in large quantities — plentiful. The opposite is \"scarce,\" meaning in short supply. \"Plentiful\" is the synonym trap."
  },
  {
    "q": "Arrange into a coherent paragraph:\n1. Finally, submit the accomplished form to the HR office.\n2. First, secure a copy of the leave application form.\n3. Then, fill out all the required fields completely.\n4. Next, have your immediate supervisor sign the form.",
    "choices": [
      "2-3-4-1",
      "3-2-4-1",
      "1-2-3-4",
      "2-4-3-1"
    ],
    "answer": 0,
    "solution": "The transition words dictate the order: \"First\" (2) → \"Then\" (3) → \"Next\" (4) → \"Finally\" (1). Logic confirms it: you must get the form before filling it out, fill it out before it can be signed, and have it signed before submission.\nIn paragraph organization items, hunt for sequence signals first — they solve the item almost by themselves."
  },
  {
    "q": "Arrange into a coherent paragraph:\n1. As a result, many employees now finish their reports in half the time.\n2. The office recently adopted a new records management system.\n3. It automatically organizes files and retrieves documents in seconds.\n4. Training sessions were held so everyone could learn the system.",
    "choices": [
      "2-4-1-3",
      "3-4-2-1",
      "1-2-3-4",
      "2-3-4-1"
    ],
    "answer": 3,
    "solution": "Start with the topic sentence introducing the subject: the office adopted a system (2). \"It\" in sentence 3 refers back to that system, so 3 follows. Training (4) logically comes after describing the system, and \"As a result\" (1) is a concluding phrase that must come last.\nTip: a sentence starting with a pronoun (It, They, This) can never open a paragraph — its referent must appear first."
  },
  {
    "q": "Which sentence does NOT belong in the paragraph?\n1. Regular exercise strengthens the heart and improves circulation.\n2. It also helps maintain a healthy weight.\n3. Many gyms offer discounted annual memberships in January.\n4. In addition, physical activity reduces stress and improves sleep.",
    "choices": [
      "Sentence 4",
      "Sentence 1",
      "Sentence 2",
      "Sentence 3"
    ],
    "answer": 3,
    "solution": "The paragraph's topic is the HEALTH BENEFITS of exercise. Sentences 1, 2, and 4 each state a benefit. Sentence 3 shifts to gym pricing — related to exercise, but not a health benefit, so it breaks the paragraph's unity.\nFor \"does not belong\" items, state the paragraph's single topic in your own words, then eject the sentence that serves a different purpose."
  },
  {
    "q": "Arrange into a coherent paragraph:\n1. This eligibility opens doors to permanent government positions.\n2. Thousands of Filipinos take the Civil Service Exam every year.\n3. Passing it grants career service eligibility.\n4. That is why serious preparation is essential.",
    "choices": [
      "2-3-1-4",
      "4-2-3-1",
      "2-1-3-4",
      "3-2-1-4"
    ],
    "answer": 0,
    "solution": "Sentence 2 introduces the topic (people take the exam). Sentence 3 states what passing gives — eligibility. Sentence 1 begins with \"This eligibility,\" which must directly follow the sentence that mentions eligibility (3). Sentence 4, \"That is why...,\" is a conclusion drawing from everything before it.\nFollow the chain of references: exam → passing → eligibility → conclusion."
  },
  {
    "q": "Which sentence best CONCLUDES this paragraph?\n\"Recycling reduces the volume of waste sent to landfills. It conserves raw materials and saves energy in manufacturing. It also creates livelihood opportunities in collection and processing.\"",
    "choices": [
      "However, some people find recycling inconvenient.",
      "Plastic was invented in the early 20th century.",
      "Landfills are located far from residential areas.",
      "Clearly, recycling benefits both the environment and the community."
    ],
    "answer": 3,
    "solution": "A concluding sentence summarizes or generalizes the points made. The paragraph lists three benefits of recycling, so the conclusion should tie them together — which \"Clearly, recycling benefits both the environment and the community\" does.\nThe \"However\" option introduces a NEW contrasting idea (a job for a following paragraph, not a conclusion), and the other two options drift off-topic."
  },
  {
    "q": "Arrange into a coherent paragraph:\n1. However, the storm suddenly changed direction overnight.\n2. Classes were therefore suspended in several provinces.\n3. Weather forecasters initially predicted the typhoon would miss the country.\n4. By morning, heavy rains had already flooded low-lying areas.",
    "choices": [
      "2-3-1-4",
      "3-1-4-2",
      "3-4-1-2",
      "1-3-4-2"
    ],
    "answer": 1,
    "solution": "Sentence 3 sets the starting situation (prediction of a miss). \"However\" (1) reverses that expectation — the storm turned. Sentence 4 shows the consequence by morning (floods), and \"therefore\" (2) states the resulting action (class suspension).\nThe connectors map the logic: initial situation → reversal (however) → effect → response (therefore)."
  },
  {
    "q": "Which sentence best BEGINS the paragraph?\n\"___. It requires examinees to arrive at least an hour early. Latecomers are not admitted under any circumstances. Valid identification must also be presented at the gate.\"",
    "choices": [
      "The Civil Service Commission enforces strict rules on examination day.",
      "Some examinees travel from distant provinces.",
      "Identification cards can be renewed online.",
      "Examination results are released within sixty days."
    ],
    "answer": 0,
    "solution": "The following sentences all describe exam-day RULES (arrive early, no latecomers, present ID). The opening sentence must introduce that unifying idea — strict rules on examination day. \"It\" in the second sentence also needs a singular referent, which \"The Civil Service Commission enforces strict rules...\" naturally provides.\nThe other options mention side details that the rest of the paragraph never develops."
  },
  {
    "q": "Arrange into a coherent paragraph:\n1. Water it regularly but avoid soaking the soil.\n2. Choose a pot with holes for proper drainage.\n3. Place the plant where it gets morning sunlight.\n4. Start by selecting a healthy seedling from a trusted nursery.",
    "choices": [
      "4-3-2-1",
      "4-2-3-1",
      "1-2-3-4",
      "2-4-1-3"
    ],
    "answer": 1,
    "solution": "\"Start by\" marks sentence 4 as the opener. The natural sequence of planting follows: get the seedling (4), pot it properly (2), position it for light (3), then maintain it with regular watering (1) — ongoing care logically comes last.\nProcess paragraphs follow real-world chronology; picture yourself doing the task."
  },
  {
    "passage": "Republic Act No. 6713 requires all public officials and employees to perform their duties with the highest degree of excellence, professionalism, intelligence, and skill. They must serve with utmost devotion and dedication, and at all times uphold public interest over personal interest. The law reminds every government worker that public office is a public trust.",
    "q": "What is the main idea of the passage?",
    "choices": [
      "Government workers receive many benefits.",
      "Personal interest is important for government employees.",
      "Public officials must serve with excellence and put public interest first.",
      "RA 6713 was passed many years ago."
    ],
    "answer": 2,
    "solution": "The passage repeatedly emphasizes standards of service — excellence, professionalism, devotion — and explicitly states that public interest comes before personal interest. That combined idea is the passage's core.\nThe other choices either contradict the passage (personal interest first), mention something the passage never says (benefits), or focus on a minor detail rather than the main point."
  },
  {
    "passage": "Republic Act No. 6713 requires all public officials and employees to perform their duties with the highest degree of excellence, professionalism, intelligence, and skill. They must serve with utmost devotion and dedication, and at all times uphold public interest over personal interest. The law reminds every government worker that public office is a public trust.",
    "q": "According to the passage, what must be prioritized at all times?",
    "choices": [
      "Public interest",
      "Office schedules",
      "Professional growth",
      "Personal interest"
    ],
    "answer": 0,
    "solution": "The passage states directly that officials must \"at all times uphold public interest over personal interest.\" This is a detail question — the answer is lifted straight from the text, so resist adding your own interpretation and simply locate the line."
  },
  {
    "passage": "Mangroves are among the most productive ecosystems on Earth. Their tangled roots serve as nurseries for fish and shellfish, filter pollutants from coastal waters, and buffer shorelines against storm surges. Yet the Philippines has lost a large portion of its mangrove forests to fishpond conversion and coastal development. Restoring them is now recognized as one of the most cost-effective defenses against typhoon damage.",
    "q": "Which of the following is NOT mentioned as a benefit of mangroves?",
    "choices": [
      "They serve as nurseries for marine life.",
      "They filter pollutants from coastal waters.",
      "They provide timber for furniture-making.",
      "They protect shorelines from storm surges."
    ],
    "answer": 2,
    "solution": "The passage lists three benefits: nurseries for fish and shellfish, filtering pollutants, and buffering storm surges. Timber for furniture is never mentioned.\nFor NOT/EXCEPT questions, check each choice against the text one by one and eliminate everything the passage actually says — what remains is the answer."
  },
  {
    "passage": "Mangroves are among the most productive ecosystems on Earth. Their tangled roots serve as nurseries for fish and shellfish, filter pollutants from coastal waters, and buffer shorelines against storm surges. Yet the Philippines has lost a large portion of its mangrove forests to fishpond conversion and coastal development. Restoring them is now recognized as one of the most cost-effective defenses against typhoon damage.",
    "q": "What can be inferred from the passage?",
    "choices": [
      "Mangroves grow only in the Philippines.",
      "Fishponds are more valuable than mangroves.",
      "Protecting mangroves can reduce the destruction caused by typhoons.",
      "Coastal development has stopped completely."
    ],
    "answer": 2,
    "solution": "The passage says mangroves buffer storm surges and that restoring them is a cost-effective defense against typhoon damage. It logically follows that protecting them reduces typhoon destruction.\nAn inference must be SUPPORTED by the text without being directly stated. The other options overreach: the passage never claims mangroves are exclusive to the Philippines, never compares fishpond value, and never says development stopped."
  },
  {
    "passage": "The barangay is the smallest political unit in the Philippines. It serves as the primary planning and implementing arm of government programs in the community. Barangay officials handle local disputes through the Katarungang Pambarangay, maintain peace and order, and deliver basic services closest to the people.",
    "q": "What is the primary role of the barangay as described in the passage?",
    "choices": [
      "To collect national taxes",
      "To act as the frontline unit delivering government programs and services to the community",
      "To supervise city governments",
      "To manage provincial infrastructure projects"
    ],
    "answer": 1,
    "solution": "The passage calls the barangay the \"primary planning and implementing arm of government programs in the community\" and notes it delivers services \"closest to the people\" — the frontline role.\nTax collection, provincial projects, and supervising cities are functions of other government levels and appear nowhere in the passage."
  },
  {
    "passage": "The barangay is the smallest political unit in the Philippines. It serves as the primary planning and implementing arm of government programs in the community. Barangay officials handle local disputes through the Katarungang Pambarangay, maintain peace and order, and deliver basic services closest to the people.",
    "q": "Based on the passage, the Katarungang Pambarangay is a system for:",
    "choices": [
      "Tax assessment",
      "Electing officials",
      "Settling local disputes",
      "Building infrastructure"
    ],
    "answer": 2,
    "solution": "The passage links it directly: \"Barangay officials handle local disputes through the Katarungang Pambarangay.\" Even if you had never heard the term, the sentence itself defines its function — dispute settlement. Let the text define unfamiliar terms; the answer is usually in the same sentence."
  },
  {
    "passage": "Remote work arrangements expanded rapidly in recent years. Supporters point to reduced commuting time, lower office costs, and improved work-life balance. Critics, however, worry about weaker collaboration, blurred boundaries between work and rest, and unequal access to reliable internet. Many organizations have settled on hybrid schedules as a middle ground.",
    "q": "What is the author's tone in presenting remote work?",
    "choices": [
      "Strongly opposed",
      "Strongly in favor",
      "Sarcastic",
      "Balanced and neutral"
    ],
    "answer": 3,
    "solution": "The author gives equal space to supporters' points and critics' concerns, then notes a compromise (hybrid schedules) without taking sides. Presenting both perspectives without judgment is the mark of a balanced, neutral tone.\nTone questions ask how the author treats the topic — look for loaded words; here there are none."
  },
  {
    "passage": "Remote work arrangements expanded rapidly in recent years. Supporters point to reduced commuting time, lower office costs, and improved work-life balance. Critics, however, worry about weaker collaboration, blurred boundaries between work and rest, and unequal access to reliable internet. Many organizations have settled on hybrid schedules as a middle ground.",
    "q": "Why have many organizations adopted hybrid schedules, according to the passage?",
    "choices": [
      "To eliminate office costs entirely",
      "To increase commuting time",
      "As a compromise between the benefits and drawbacks of remote work",
      "Because the law requires it"
    ],
    "answer": 2,
    "solution": "The passage calls hybrid schedules \"a middle ground\" — that is, a compromise between the advantages supporters cite and the problems critics raise. No law is mentioned, costs are only partly reduced (not eliminated), and increasing commuting time is a benefit to no one."
  },
  {
    "passage": "Financial literacy remains low among many Filipino households. Studies show that a significant number of families have no emergency savings and rely on informal lenders during crises. Basic knowledge of budgeting, interest rates, and insurance can protect families from debt traps. For this reason, several government agencies now integrate financial education into their community programs.",
    "q": "What problem does the passage identify?",
    "choices": [
      "Too many banks in rural areas",
      "Low financial literacy among many Filipino households",
      "Expensive insurance premiums",
      "High salaries of government workers"
    ],
    "answer": 1,
    "solution": "The first sentence states the problem outright: \"Financial literacy remains low among many Filipino households.\" The rest of the passage describes its consequences (no savings, informal lenders) and the response (financial education). The opening sentence of an expository passage usually carries its central problem or thesis."
  },
  {
    "passage": "Financial literacy remains low among many Filipino households. Studies show that a significant number of families have no emergency savings and rely on informal lenders during crises. Basic knowledge of budgeting, interest rates, and insurance can protect families from debt traps. For this reason, several government agencies now integrate financial education into their community programs.",
    "q": "The phrase \"debt traps\" in the passage most nearly means:",
    "choices": [
      "Insurance policies",
      "Bank vaults for storing money",
      "Situations where borrowing leads to debts that are difficult to escape",
      "Government loan programs"
    ],
    "answer": 2,
    "solution": "Context defines it: families \"rely on informal lenders during crises,\" and financial knowledge \"can protect families from debt traps.\" A trap is something difficult to escape, so a debt trap is a cycle of borrowing that becomes hard to break.\nFor vocabulary-in-context items, the surrounding sentences — not a dictionary — supply the intended meaning."
  },
  {
    "passage": "Volcanic soil in many Philippine provinces is exceptionally fertile. Minerals deposited by past eruptions enrich the ground, allowing farmers to grow rice, vegetables, and fruit trees with excellent yields. This explains why communities have historically settled near volcanoes despite the risks. Living in these areas therefore demands both gratitude for the land and preparedness for the hazard.",
    "q": "Why have communities historically settled near volcanoes, according to the passage?",
    "choices": [
      "Volcanoes provide protection from typhoons.",
      "The fertile volcanic soil supports productive farming.",
      "The scenery attracts tourists.",
      "Land near volcanoes is free."
    ],
    "answer": 1,
    "solution": "The passage draws the connection explicitly: mineral-rich volcanic soil produces excellent yields, and \"This explains why communities have historically settled near volcanoes.\" Tourism, typhoon protection, and free land are never mentioned — they are outside-knowledge distractors."
  },
  {
    "passage": "Volcanic soil in many Philippine provinces is exceptionally fertile. Minerals deposited by past eruptions enrich the ground, allowing farmers to grow rice, vegetables, and fruit trees with excellent yields. This explains why communities have historically settled near volcanoes despite the risks. Living in these areas therefore demands both gratitude for the land and preparedness for the hazard.",
    "q": "What is the best title for the passage?",
    "choices": [
      "How to Prevent Volcanic Eruptions",
      "Volcanoes: Fertile Ground and Constant Risk",
      "The History of Philippine Agriculture",
      "Tourist Spots in the Philippines"
    ],
    "answer": 1,
    "solution": "A good title captures the WHOLE passage. The text covers two linked ideas: volcanic soil's fertility (benefit) and the need for preparedness (risk). \"Fertile Ground and Constant Risk\" captures both.\nThe other titles are either too broad (all of Philippine agriculture), off-topic (tourism), or about something the passage never discusses (preventing eruptions — which is impossible anyway)."
  }
];
