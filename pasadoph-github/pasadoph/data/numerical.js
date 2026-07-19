/* PasadoPH — numerical bank (50 items, auto-balanced choice order) */
window.QUESTION_BANKS = window.QUESTION_BANKS || {};
window.QUESTION_BANKS.numerical = [
  {
    "q": "What is the value of 48 + 27 × 2?",
    "choices": [
      "96",
      "108",
      "150",
      "102"
    ],
    "answer": 3,
    "solution": "Follow the order of operations (MDAS): multiplication comes before addition. Compute 27 × 2 = 54 first, then add: 48 + 54 = 102.\nThe trap answer 150 comes from adding first (48 + 27 = 75, then × 2), which violates MDAS."
  },
  {
    "q": "Evaluate: (144 ÷ 12) + (15 × 3)",
    "choices": [
      "57",
      "45",
      "51",
      "60"
    ],
    "answer": 0,
    "solution": "Solve inside each parenthesis first. 144 ÷ 12 = 12 and 15 × 3 = 45. Then add: 12 + 45 = 57."
  },
  {
    "q": "875 − 398 = ?",
    "choices": [
      "487",
      "497",
      "477",
      "467"
    ],
    "answer": 2,
    "solution": "A fast mental-math trick: subtract 400 instead of 398, then add back 2. 875 − 400 = 475, then 475 + 2 = 477. This avoids borrowing errors under time pressure."
  },
  {
    "q": "36 × 25 = ?",
    "choices": [
      "950",
      "850",
      "800",
      "900"
    ],
    "answer": 3,
    "solution": "Multiplying by 25 is the same as multiplying by 100 then dividing by 4. So 36 × 100 = 3,600 and 3,600 ÷ 4 = 900. Since calculators are not allowed in the CSE, shortcuts like this save precious minutes."
  },
  {
    "q": "What is 1,000 − 4 × 125?",
    "choices": [
      "875",
      "500",
      "600",
      "0"
    ],
    "answer": 1,
    "solution": "MDAS again: multiply before subtracting. 4 × 125 = 500, then 1,000 − 500 = 500.\nThe trap answer 0 comes from subtracting first: (1,000 − 4) is wrong order, and (1,000 − 500) misread as 1,000 − 4 = 996 × ... — always do multiplication first."
  },
  {
    "q": "Evaluate: 15 + (−9) + 22 − (−6)",
    "choices": [
      "28",
      "34",
      "40",
      "22"
    ],
    "answer": 1,
    "solution": "Adding a negative means subtracting; subtracting a negative means adding. Rewrite as 15 − 9 + 22 + 6. Step by step: 15 − 9 = 6; 6 + 22 = 28; 28 + 6 = 34."
  },
  {
    "q": "What is 7² − 3³?",
    "choices": [
      "16",
      "40",
      "13",
      "22"
    ],
    "answer": 3,
    "solution": "7² means 7 × 7 = 49 (not 7 × 2). 3³ means 3 × 3 × 3 = 27 (not 3 × 3 = 9). So 49 − 27 = 22.\nThe trap answer 40 comes from computing 3³ as 9 (49 − 9), a very common exponent mistake."
  },
  {
    "q": "456 ÷ 8 = ?",
    "choices": [
      "57",
      "56",
      "58",
      "52"
    ],
    "answer": 0,
    "solution": "Break 456 into parts divisible by 8: 456 = 400 + 56. Then 400 ÷ 8 = 50 and 56 ÷ 8 = 7. Add the results: 50 + 7 = 57."
  },
  {
    "q": "Evaluate: (25 + 15) ÷ (10 − 2)",
    "choices": [
      "6",
      "5",
      "4",
      "8"
    ],
    "answer": 1,
    "solution": "Parentheses first: 25 + 15 = 40 and 10 − 2 = 8. Then divide: 40 ÷ 8 = 5."
  },
  {
    "q": "0.25 × 0.4 = ?",
    "choices": [
      "0.1",
      "0.65",
      "1.0",
      "0.01"
    ],
    "answer": 0,
    "solution": "Multiply as whole numbers: 25 × 4 = 100. Then count decimal places: 0.25 has two and 0.4 has one, so the answer needs three decimal places: 0.100 = 0.1.\nAlternatively, 0.25 is one-fourth, and one-fourth of 0.4 is 0.1. The trap 0.65 comes from adding instead of multiplying."
  },
  {
    "q": "3/4 + 1/6 = ?",
    "choices": [
      "4/10",
      "11/12",
      "5/6",
      "7/12"
    ],
    "answer": 1,
    "solution": "You cannot add fractions with different denominators directly. Find the least common denominator of 4 and 6, which is 12. Convert: 3/4 = 9/12 and 1/6 = 2/12. Add the numerators: 9/12 + 2/12 = 11/12.\nThe trap answer 4/10 comes from adding tops and bottoms separately (3+1 over 4+6), which is never valid."
  },
  {
    "q": "2/3 × 9/10 = ?",
    "choices": [
      "18/23",
      "11/13",
      "2/5",
      "3/5"
    ],
    "answer": 3,
    "solution": "To multiply fractions, multiply straight across: (2 × 9)/(3 × 10) = 18/30. Simplify by dividing both by 6: 18/30 = 3/5.\nShortcut: cancel before multiplying — 9 and 3 share a factor of 3, and 2 and 10 share a factor of 2, leaving (1 × 3)/(1 × 5) = 3/5."
  },
  {
    "q": "5/8 ÷ 1/4 = ?",
    "choices": [
      "4/5",
      "2 1/2",
      "5/32",
      "1 1/4"
    ],
    "answer": 1,
    "solution": "Dividing by a fraction means multiplying by its reciprocal. 5/8 ÷ 1/4 = 5/8 × 4/1 = 20/8 = 5/2 = 2 1/2.\nThe trap answer 5/32 comes from multiplying by 1/4 instead of flipping it first."
  },
  {
    "q": "Which of the following fractions is the LARGEST?",
    "choices": [
      "5/8",
      "2/3",
      "7/12",
      "3/5"
    ],
    "answer": 1,
    "solution": "Convert each to a decimal to compare: 3/5 = 0.600, 5/8 = 0.625, 2/3 ≈ 0.667, 7/12 ≈ 0.583. The largest is 2/3.\nOn the actual exam, converting to decimals is usually faster and safer than finding a common denominator for four fractions."
  },
  {
    "q": "Express 0.375 as a fraction in lowest terms.",
    "choices": [
      "3/8",
      "375/100",
      "3/4",
      "5/8"
    ],
    "answer": 0,
    "solution": "0.375 = 375/1000. Divide numerator and denominator by 125: 375 ÷ 125 = 3 and 1000 ÷ 125 = 8, giving 3/8.\nIt pays to memorize the common conversions: 1/8 = 0.125, 3/8 = 0.375, 5/8 = 0.625, 7/8 = 0.875 — these appear repeatedly in the CSE."
  },
  {
    "q": "What is 45% of 200?",
    "choices": [
      "80",
      "95",
      "90",
      "85"
    ],
    "answer": 2,
    "solution": "\"Of\" means multiply. Convert 45% to a decimal: 0.45. Then 0.45 × 200 = 90.\nMental shortcut: 10% of 200 is 20, so 40% is 80, and 5% is 10. Add them: 80 + 10 = 90."
  },
  {
    "q": "30 is what percent of 120?",
    "choices": [
      "30%",
      "40%",
      "20%",
      "25%"
    ],
    "answer": 3,
    "solution": "Use the formula: part ÷ whole × 100. So 30 ÷ 120 = 0.25, and 0.25 × 100 = 25%.\nSanity check: 25% means one-fourth, and one-fourth of 120 is indeed 30."
  },
  {
    "q": "A bag originally priced at ₱800 is sold at a 15% discount. What is the sale price?",
    "choices": [
      "₱120",
      "₱685",
      "₱780",
      "₱680"
    ],
    "answer": 3,
    "solution": "First find the discount: 15% of 800 = 0.15 × 800 = ₱120. Subtract from the original price: 800 − 120 = ₱680.\nFaster method: paying after a 15% discount means paying 85%, so 0.85 × 800 = ₱680. The trap answer ₱120 is the discount itself, not the sale price — read what the question asks."
  },
  {
    "q": "A barangay's population grew from 250 to 300 residents. What is the percent increase?",
    "choices": [
      "25%",
      "16.7%",
      "20%",
      "50%"
    ],
    "answer": 2,
    "solution": "Percent increase = (change ÷ ORIGINAL amount) × 100. The change is 300 − 250 = 50. Divide by the original: 50 ÷ 250 = 0.20 = 20%.\nThe trap answer 16.7% comes from dividing by the new amount (50 ÷ 300) — percent change is always measured against the starting value."
  },
  {
    "q": "12% of a number is 60. What is the number?",
    "choices": [
      "7.2",
      "500",
      "720",
      "72"
    ],
    "answer": 1,
    "solution": "Let the number be N. Then 0.12 × N = 60, so N = 60 ÷ 0.12 = 500.\nCheck: 12% of 500 = 0.12 × 500 = 60. ✓ The trap answer 7.2 comes from computing 12% of 60 instead — this question works in reverse."
  },
  {
    "q": "Express 3/5 as a percent.",
    "choices": [
      "53%",
      "65%",
      "60%",
      "35%"
    ],
    "answer": 2,
    "solution": "Divide the numerator by the denominator, then multiply by 100: 3 ÷ 5 = 0.60, and 0.60 × 100 = 60%.\nDo not be fooled by 35% — the digits 3 and 5 in the fraction do not simply combine."
  },
  {
    "q": "An employee earning ₱25,000 a month receives an 8% salary increase. What is the new monthly salary?",
    "choices": [
      "₱25,800",
      "₱26,500",
      "₱2,000",
      "₱27,000"
    ],
    "answer": 3,
    "solution": "The increase is 8% of 25,000 = 0.08 × 25,000 = ₱2,000. Add it to the original salary: 25,000 + 2,000 = ₱27,000.\nShortcut: new salary = 108% of the old = 1.08 × 25,000 = ₱27,000. The trap answer ₱2,000 is only the increase, not the new salary."
  },
  {
    "q": "Two numbers are in the ratio 3:5, and their sum is 64. What is the SMALLER number?",
    "choices": [
      "40",
      "24",
      "18",
      "32"
    ],
    "answer": 1,
    "solution": "A 3:5 ratio means 3 + 5 = 8 equal parts in total. Each part is 64 ÷ 8 = 8. The smaller number has 3 parts: 3 × 8 = 24, and the larger has 5 × 8 = 40.\nCheck: 24 + 40 = 64 ✓ and 24:40 simplifies to 3:5 ✓. The trap answer 40 is the larger number — the question asks for the smaller."
  },
  {
    "q": "If 4 pencils cost ₱30, how much will 10 pencils cost at the same rate?",
    "choices": [
      "₱75",
      "₱60",
      "₱80",
      "₱70"
    ],
    "answer": 0,
    "solution": "Find the unit price first: ₱30 ÷ 4 = ₱7.50 per pencil. Then multiply: 10 × 7.50 = ₱75.\nProportion method: 4/30 = 10/x → 4x = 300 → x = 75."
  },
  {
    "q": "On a map, 1 cm represents 50 km. Two cities are 3.5 cm apart on the map. What is the actual distance between them?",
    "choices": [
      "200 km",
      "150 km",
      "185 km",
      "175 km"
    ],
    "answer": 3,
    "solution": "Multiply the map distance by the scale: 3.5 × 50 = 175 km.\nBreak it down mentally: 3 cm = 150 km and 0.5 cm = 25 km, so 150 + 25 = 175 km."
  },
  {
    "q": "Divide ₱120 among three people in the ratio 1:2:3. How much does the person with the LARGEST share receive?",
    "choices": [
      "₱80",
      "₱20",
      "₱40",
      "₱60"
    ],
    "answer": 3,
    "solution": "Total parts: 1 + 2 + 3 = 6. Each part is 120 ÷ 6 = ₱20. The shares are ₱20, ₱40, and ₱60. The largest share is 3 parts = ₱60.\nCheck: 20 + 40 + 60 = 120 ✓."
  },
  {
    "q": "Six workers can finish a fencing job in 12 days. Working at the same rate, how many days will 8 workers need?",
    "choices": [
      "9 days",
      "8 days",
      "10 days",
      "16 days"
    ],
    "answer": 0,
    "solution": "This is an INVERSE proportion: more workers means fewer days. The total work is 6 × 12 = 72 worker-days. With 8 workers: 72 ÷ 8 = 9 days.\nThe trap answer 16 comes from setting up a direct proportion (6/12 = 8/x), which wrongly assumes more workers take longer."
  },
  {
    "q": "If a:b = 2:3 and b:c = 6:7, what is a:c?",
    "choices": [
      "3:7",
      "12:21",
      "4:7",
      "2:7"
    ],
    "answer": 2,
    "solution": "Make the b values match. In the first ratio b = 3; in the second b = 6. Multiply the first ratio by 2: a:b = 4:6. Now a:b:c = 4:6:7, so a:c = 4:7.\nThe trap answer 2:7 ignores that the two ratios use different scales for b and simply pairs the outer numbers."
  },
  {
    "q": "Ana is twice as old as Ben. The sum of their ages is 36. How old is Ana?",
    "choices": [
      "30",
      "24",
      "18",
      "12"
    ],
    "answer": 1,
    "solution": "Let Ben's age = x, so Ana's age = 2x. Their sum: x + 2x = 36 → 3x = 36 → x = 12. Ben is 12, so Ana is 2 × 12 = 24.\nCheck: 24 + 12 = 36 ✓ and 24 is twice 12 ✓. The trap answer 12 is Ben's age — the question asks for Ana's."
  },
  {
    "q": "A father is three times as old as his son. In 12 years, he will be twice as old as his son. How old is the son NOW?",
    "choices": [
      "12",
      "16",
      "10",
      "14"
    ],
    "answer": 0,
    "solution": "Let the son's age now = S, so the father's age = 3S. In 12 years: father = 3S + 12, son = S + 12, and the father will be twice as old: 3S + 12 = 2(S + 12).\nExpand: 3S + 12 = 2S + 24 → S = 12. Check: son is 12, father is 36; in 12 years they are 24 and 48, and 48 is twice 24 ✓."
  },
  {
    "q": "Marco can paint a room in 6 hours, and Liza can paint the same room in 12 hours. Working together, how long will they take?",
    "choices": [
      "9 hours",
      "3 hours",
      "18 hours",
      "4 hours"
    ],
    "answer": 3,
    "solution": "Work rate = 1 job per time. Marco paints 1/6 of the room per hour, Liza paints 1/12 per hour. Together: 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 of the room per hour. So the whole room takes 4 hours.\nThe trap answer 9 comes from averaging the times (6 + 12) ÷ 2 — combined work time is never the average, and it must always be LESS than the faster worker's time alone."
  },
  {
    "q": "A pipe can fill a tank in 3 hours, while a drain can empty the full tank in 6 hours. If both are open and the tank starts empty, how long until the tank is full?",
    "choices": [
      "6 hours",
      "2 hours",
      "9 hours",
      "4 hours"
    ],
    "answer": 0,
    "solution": "The pipe fills 1/3 of the tank per hour; the drain removes 1/6 per hour. Net rate = 1/3 − 1/6 = 2/6 − 1/6 = 1/6 of the tank per hour. Filling the whole tank takes 6 hours.\nKey idea: opposing rates are subtracted, not added."
  },
  {
    "q": "A bus traveled 240 km in 4 hours. What was its average speed?",
    "choices": [
      "55 kph",
      "50 kph",
      "60 kph",
      "65 kph"
    ],
    "answer": 2,
    "solution": "Speed = distance ÷ time = 240 ÷ 4 = 60 kph. Memorize the triangle: Distance = Speed × Time; rearrange for whichever quantity is missing."
  },
  {
    "q": "A train travels at 80 kph for 2.5 hours. How far does it go?",
    "choices": [
      "200 km",
      "220 km",
      "160 km",
      "180 km"
    ],
    "answer": 0,
    "solution": "Distance = speed × time = 80 × 2.5 = 200 km.\nMental math: 80 × 2 = 160, plus 80 × 0.5 = 40, so 160 + 40 = 200 km."
  },
  {
    "q": "Two cars start at the same time from towns 300 km apart and drive toward each other, one at 40 kph and the other at 60 kph. After how many hours will they meet?",
    "choices": [
      "3 hours",
      "5 hours",
      "2 hours",
      "4 hours"
    ],
    "answer": 0,
    "solution": "When moving toward each other, ADD the speeds: they close the gap at 40 + 60 = 100 kph. Time to close 300 km: 300 ÷ 100 = 3 hours.\nCheck: in 3 hours one car covers 120 km and the other 180 km; 120 + 180 = 300 km ✓."
  },
  {
    "q": "What is the average of 85, 90, 78, and 95?",
    "choices": [
      "86",
      "88",
      "87",
      "85"
    ],
    "answer": 2,
    "solution": "Average = sum ÷ count. Sum: 85 + 90 + 78 + 95 = 348. Divide by 4: 348 ÷ 4 = 87."
  },
  {
    "q": "A student scored 82, 88, and 90 on three tests. What score does she need on a fourth test to make her average exactly 87?",
    "choices": [
      "88",
      "87",
      "90",
      "86"
    ],
    "answer": 0,
    "solution": "For an average of 87 over 4 tests, the total must be 87 × 4 = 348. Her current total is 82 + 88 + 90 = 260. Required fourth score: 348 − 260 = 88.\nAlways work with totals in average problems — it is faster and avoids fraction errors."
  },
  {
    "q": "How many liters of a 60% alcohol solution must be mixed with a 20% solution to make 10 liters of a 30% solution?",
    "choices": [
      "2 liters",
      "5 liters",
      "4 liters",
      "2.5 liters"
    ],
    "answer": 3,
    "solution": "Let x = liters of the 60% solution, so (10 − x) = liters of the 20% solution. The pure alcohol must total 30% of 10 L = 3 L:\n0.60x + 0.20(10 − x) = 3 → 0.6x + 2 − 0.2x = 3 → 0.4x = 1 → x = 2.5 liters.\nCheck: 2.5 L of 60% gives 1.5 L alcohol; 7.5 L of 20% gives 1.5 L; total 3 L in 10 L = 30% ✓."
  },
  {
    "q": "A cashier has 20 coins made up of ₱5 and ₱10 coins with a total value of ₱145. How many ₱10 coins are there?",
    "choices": [
      "10",
      "11",
      "9",
      "8"
    ],
    "answer": 2,
    "solution": "Let x = number of ₱5 coins, so (20 − x) = number of ₱10 coins. Total value: 5x + 10(20 − x) = 145 → 5x + 200 − 10x = 145 → −5x = −55 → x = 11.\nSo there are 11 five-peso coins and 20 − 11 = 9 ten-peso coins. Check: 11(5) + 9(10) = 55 + 90 = ₱145 ✓. The trap answer 11 is the count of ₱5 coins."
  },
  {
    "q": "A worker earns ₱540 for 9 hours of work. At the same rate, how much does he earn in an 8-hour day?",
    "choices": [
      "₱420",
      "₱480",
      "₱460",
      "₱500"
    ],
    "answer": 1,
    "solution": "Hourly rate: 540 ÷ 9 = ₱60 per hour. For 8 hours: 60 × 8 = ₱480."
  },
  {
    "q": "An item priced at ₱1,200 is given a 10% discount, then an additional 5% discount on the reduced price. What is the final price?",
    "choices": [
      "₱1,020",
      "₱1,080",
      "₱1,026",
      "₱1,140"
    ],
    "answer": 2,
    "solution": "Successive discounts apply one after the other, not combined. After 10%: 1,200 × 0.90 = ₱1,080. After the additional 5%: 1,080 × 0.95 = ₱1,026.\nThe trap answer ₱1,020 comes from adding the discounts (15% off 1,200) — successive discounts are always slightly less than their sum because the second discount applies to a smaller amount."
  },
  {
    "q": "How much simple interest does ₱10,000 earn at 5% per year for 2 years?",
    "choices": [
      "₱500",
      "₱1,500",
      "₱2,000",
      "₱1,000"
    ],
    "answer": 3,
    "solution": "Simple interest formula: I = P × r × t = 10,000 × 0.05 × 2 = ₱1,000.\nOne year earns ₱500 (5% of 10,000); two years earn twice that. The trap answer ₱500 forgets the 2-year period."
  },
  {
    "q": "What comes next? 2, 5, 8, 11, ___",
    "choices": [
      "15",
      "13",
      "16",
      "14"
    ],
    "answer": 3,
    "solution": "The difference between consecutive terms is constant: +3 each time (2→5→8→11). Next term: 11 + 3 = 14. This is an arithmetic sequence — always test for a constant difference first."
  },
  {
    "q": "What comes next? 3, 6, 12, 24, ___",
    "choices": [
      "36",
      "48",
      "50",
      "30"
    ],
    "answer": 1,
    "solution": "Each term is double the previous one (×2): 3→6→12→24. Next: 24 × 2 = 48. This is a geometric sequence.\nThe trap answer 30 assumes the pattern is +6, but the gaps are 3, 6, 12 — not constant — so it cannot be simple addition."
  },
  {
    "q": "What comes next? 1, 4, 9, 16, 25, ___",
    "choices": [
      "30",
      "32",
      "49",
      "36"
    ],
    "answer": 3,
    "solution": "These are perfect squares: 1², 2², 3², 4², 5². The next term is 6² = 36.\nRecognizing squares (1, 4, 9, 16, 25, 36, 49, 64, 81, 100) and cubes (1, 8, 27, 64, 125) on sight is one of the highest-value memorizations for this subtest."
  },
  {
    "q": "What comes next? 80, 40, 20, 10, ___",
    "choices": [
      "5",
      "2",
      "0",
      "8"
    ],
    "answer": 0,
    "solution": "Each term is half the previous one (÷2): 80→40→20→10. Next: 10 ÷ 2 = 5.\nThe trap answer 0 assumes the series subtracts, but the gaps (40, 20, 10) shrink by half — a division pattern, not subtraction."
  },
  {
    "q": "What comes next? 2, 3, 5, 8, 12, ___",
    "choices": [
      "18",
      "16",
      "15",
      "17"
    ],
    "answer": 3,
    "solution": "Look at the differences: +1, +2, +3, +4 — they increase by 1 each step. The next difference is +5, so 12 + 5 = 17.\nWhen the first differences are not constant, check whether the differences THEMSELVES form a pattern."
  },
  {
    "q": "What comes next? 1, 1, 2, 3, 5, 8, ___",
    "choices": [
      "13",
      "11",
      "16",
      "12"
    ],
    "answer": 0,
    "solution": "This is the Fibonacci sequence: each term is the sum of the two before it. 1+1=2, 1+2=3, 2+3=5, 3+5=8, so the next is 5 + 8 = 13. The Fibonacci pattern appears regularly in CSE number series — check for it whenever adding neighbors seems to work."
  },
  {
    "q": "What comes next? 100, 96, 88, 76, ___",
    "choices": [
      "60",
      "68",
      "64",
      "62"
    ],
    "answer": 0,
    "solution": "The differences are −4, −8, −12 — each subtraction grows by 4. The next subtraction is −16, so 76 − 16 = 60.\nThe trap answer 64 assumes a constant −12, but the gaps are clearly widening."
  },
  {
    "q": "What comes next? 5, 10, 9, 18, 17, 34, ___",
    "choices": [
      "66",
      "33",
      "35",
      "68"
    ],
    "answer": 1,
    "solution": "This is an alternating two-step pattern: ×2, then −1, repeating. 5×2=10, 10−1=9, 9×2=18, 18−1=17, 17×2=34, and next 34 − 1 = 33.\nWhen a series seems to jump around, test whether TWO alternating rules are at work."
  }
];
