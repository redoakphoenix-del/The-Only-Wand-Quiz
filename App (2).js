import { useState, useCallback } from "react";

const QUESTIONS_RAW = [
  { id: "v1",  trait: "volatility",    text: "I get angry easily." },
  { id: "v2",  trait: "volatility",    text: "I rarely get irritated.",           reverse: true },
  { id: "v3",  trait: "volatility",    text: "I get upset easily." },
  { id: "v4",  trait: "volatility",    text: "I keep my emotions under control.", reverse: true },
  { id: "v5",  trait: "volatility",    text: "I change my mood a lot." },
  { id: "v6",  trait: "volatility",    text: "I rarely lose my composure.",       reverse: true },
  { id: "v7",  trait: "volatility",    text: "I am a person whose moods go up and down easily." },
  { id: "v8",  trait: "volatility",    text: "I am not easily annoyed.",          reverse: true },
  { id: "v9",  trait: "volatility",    text: "I get easily agitated." },
  { id: "v10", trait: "volatility",    text: "I can be stirred up easily." },
  { id: "w1",  trait: "withdrawal",   text: "I seldom feel blue.",               reverse: true },
  { id: "w2",  trait: "withdrawal",   text: "I am filled with doubts about things." },
  { id: "w3",  trait: "withdrawal",   text: "I feel comfortable with myself.",   reverse: true },
  { id: "w4",  trait: "withdrawal",   text: "I feel threatened easily." },
  { id: "w5",  trait: "withdrawal",   text: "I rarely feel depressed.",          reverse: true },
  { id: "w6",  trait: "withdrawal",   text: "I worry about things." },
  { id: "w7",  trait: "withdrawal",   text: "I am easily discouraged." },
  { id: "w8",  trait: "withdrawal",   text: "I am not embarrassed easily.",      reverse: true },
  { id: "w9",  trait: "withdrawal",   text: "I become overwhelmed by events." },
  { id: "w10", trait: "withdrawal",   text: "I am afraid of many things." },
  { id: "c1",  trait: "compassion",   text: "I am not interested in other people's problems.", reverse: true },
  { id: "c2",  trait: "compassion",   text: "I feel others' emotions." },
  { id: "c3",  trait: "compassion",   text: "I inquire about others' well-being." },
  { id: "c4",  trait: "compassion",   text: "I can't be bothered with other people's needs.", reverse: true },
  { id: "c5",  trait: "compassion",   text: "I sympathize with others' feelings." },
  { id: "c6",  trait: "compassion",   text: "I am indifferent to the feelings of others.", reverse: true },
  { id: "c7",  trait: "compassion",   text: "I take no time for others.",        reverse: true },
  { id: "c8",  trait: "compassion",   text: "I take an interest in other people's lives." },
  { id: "c9",  trait: "compassion",   text: "I don't have a soft side.",         reverse: true },
  { id: "c10", trait: "compassion",   text: "I like to do things for others." },
  { id: "p1",  trait: "politeness",   text: "I respect authority." },
  { id: "p2",  trait: "politeness",   text: "I insult people.",                  reverse: true },
  { id: "p3",  trait: "politeness",   text: "I hate to seem pushy." },
  { id: "p4",  trait: "politeness",   text: "I believe that I am better than others.", reverse: true },
  { id: "p5",  trait: "politeness",   text: "I avoid imposing my will on others." },
  { id: "p6",  trait: "politeness",   text: "I rarely put people under pressure." },
  { id: "p7",  trait: "politeness",   text: "I take advantage of others.",       reverse: true },
  { id: "p8",  trait: "politeness",   text: "I seek conflict.",                  reverse: true },
  { id: "p9",  trait: "politeness",   text: "I love a good fight.",              reverse: true },
  { id: "p10", trait: "politeness",   text: "I am out for my own personal gain.", reverse: true },
  { id: "e1",  trait: "enthusiasm",   text: "I make friends easily." },
  { id: "e2",  trait: "enthusiasm",   text: "I am hard to get to know.",         reverse: true },
  { id: "e3",  trait: "enthusiasm",   text: "I keep others at a distance.",      reverse: true },
  { id: "e4",  trait: "enthusiasm",   text: "I reveal little about myself.",     reverse: true },
  { id: "e5",  trait: "enthusiasm",   text: "I warm up quickly to others." },
  { id: "e6",  trait: "enthusiasm",   text: "I rarely get caught up in the excitement.", reverse: true },
  { id: "e7",  trait: "enthusiasm",   text: "I am not a very enthusiastic person.", reverse: true },
  { id: "e8",  trait: "enthusiasm",   text: "I show my feelings when I am happy." },
  { id: "e9",  trait: "enthusiasm",   text: "I have a lot of fun." },
  { id: "e10", trait: "enthusiasm",   text: "I laugh a lot." },
  { id: "a1",  trait: "assertiveness",text: "I take charge." },
  { id: "a2",  trait: "assertiveness",text: "I have a strong personality." },
  { id: "a3",  trait: "assertiveness",text: "I lack the talent for influencing people.", reverse: true },
  { id: "a4",  trait: "assertiveness",text: "I know how to captivate people." },
  { id: "a5",  trait: "assertiveness",text: "I wait for others to lead the way.", reverse: true },
  { id: "a6",  trait: "assertiveness",text: "I see myself as a good leader." },
  { id: "a7",  trait: "assertiveness",text: "I can talk others into doing things." },
  { id: "a8",  trait: "assertiveness",text: "I hold back my opinions.",          reverse: true },
  { id: "a9",  trait: "assertiveness",text: "I am the first to act." },
  { id: "a10", trait: "assertiveness",text: "I do not have an assertive personality.", reverse: true },
  { id: "i1",  trait: "intellect",    text: "I am quick to understand things." },
  { id: "i2",  trait: "intellect",    text: "I have difficulty understanding abstract ideas.", reverse: true },
  { id: "i3",  trait: "intellect",    text: "I can handle a lot of information." },
  { id: "i4",  trait: "intellect",    text: "I like to solve complex problems." },
  { id: "i5",  trait: "intellect",    text: "I avoid philosophical discussions.", reverse: true },
  { id: "i6",  trait: "intellect",    text: "I avoid difficult reading material.", reverse: true },
  { id: "i7",  trait: "intellect",    text: "I have a rich vocabulary." },
  { id: "i8",  trait: "intellect",    text: "I think quickly." },
  { id: "i9",  trait: "intellect",    text: "I learn things slowly.",            reverse: true },
  { id: "i10", trait: "intellect",    text: "I formulate ideas clearly." },
  { id: "as1", trait: "aesthetic",    text: "I enjoy the beauty of nature." },
  { id: "as2", trait: "aesthetic",    text: "I believe in the importance of art." },
  { id: "as3", trait: "aesthetic",    text: "I love to reflect on things." },
  { id: "as4", trait: "aesthetic",    text: "I get deeply immersed in music." },
  { id: "as5", trait: "aesthetic",    text: "I do not like poetry.",             reverse: true },
  { id: "as6", trait: "aesthetic",    text: "I see beauty in things that others might not notice." },
  { id: "as7", trait: "aesthetic",    text: "I need a creative outlet." },
  { id: "as8", trait: "aesthetic",    text: "I seldom get lost in thought.",     reverse: true },
  { id: "as9", trait: "aesthetic",    text: "I seldom daydream.",                reverse: true },
  { id: "as10",trait: "aesthetic",    text: "I seldom notice the emotional aspects of paintings.", reverse: true },
  { id: "at1", trait: "athleticism",  text: "I am stronger than most people." },
  { id: "at2", trait: "athleticism",  text: "I am more agile than most people." },
  { id: "at3", trait: "athleticism",  text: "I am faster than most people." },
  { id: "at4", trait: "athleticism",  text: "I have more physical endurance than most people." },
  { id: "at5", trait: "athleticism",  text: "I am more physically capable than most people." },
  { id: "at6", trait: "athleticism",  text: "I am less coordinated than most people.", reverse: true },
  { id: "at7", trait: "athleticism",  text: "I recover from physical exertion faster than most people." },
  { id: "at8", trait: "athleticism",  text: "My body is less powerful than average.", reverse: true },
  { id: "at9", trait: "athleticism",  text: "I have better physical reflexes than most people." },
  { id: "at10",trait: "athleticism",  text: "I am more physically resilient than most people." },
];

const CONDITIONAL_QUESTIONS = [
  { id: "cond_condemn", text: "Do you condemn your peers?",         note: "Answer honestly. The wand will know." },
  { id: "cond_callous", text: "Are you proud of your callousness?", note: "There is no wrong answer — only a true one." },
];

function shuffleQuestions(qs) {
  const byTrait = {};
  qs.forEach(q => {
    if (!byTrait[q.trait]) byTrait[q.trait] = [];
    byTrait[q.trait].push(q);
  });
  const result = [];
  const traitOrder = Object.keys(byTrait);
  const maxLen = Math.max(...traitOrder.map(t => byTrait[t].length));
  for (let i = 0; i < maxLen; i++) {
    const round = traitOrder.map(t => byTrait[t][i]).filter(Boolean);
    for (let j = round.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [round[j], round[k]] = [round[k], round[j]];
    }
    result.push(...round);
  }
  return result;
}

const SCALE = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

function computeScores(answers, questions) {
  const traits = {
    assertiveness: [], enthusiasm: [], compassion: [], politeness: [],
    volatility: [], withdrawal: [], intellect: [], aesthetic: [], athleticism: []
  };
  questions.forEach(q => {
    const raw = answers[q.id];
    if (raw == null) return;
    const val = q.reverse ? 6 - raw : raw;
    traits[q.trait].push({ val, loading: q.loading || 1 });
  });
  const avg = {};
  for (const t in traits) {
    const arr = traits[t];
    if (!arr.length) { avg[t] = 3; continue; }
    const totalWeight = arr.reduce((s, x) => s + x.loading, 0);
    avg[t] = arr.reduce((s, x) => s + x.val * x.loading, 0) / totalWeight;
  }
  return avg;
}

function getIntroversion(scores) {
  const extScore = (scores.assertiveness + scores.enthusiasm) / 2;
  if (extScore >= 3.67) return "extroverted";
  if (extScore <= 2.33) return "introverted";
  return "ambivert";
}

function getSecondaryTrait(scores) {
  const agreeableness = (scores.compassion + scores.politeness) / 2;
  const neuroticism   = (scores.volatility + scores.withdrawal) / 2;
  const openness      = (scores.intellect + scores.aesthetic) / 2;
  const MODERATE_MIN = 2.5, MODERATE_MAX = 3.5;
  const isMod = v => v >= MODERATE_MIN && v <= MODERATE_MAX;
  if (isMod(agreeableness) && isMod(neuroticism) && isMod(openness)) {
    const aDist = Math.abs(agreeableness - 3);
    const nDist = Math.abs(neuroticism - 3);
    return aDist >= nDist ? "moderate_agreeableness" : "moderate_neuroticism";
  }
  const candidates = [
    { key: agreeableness >= 3 ? "agreeable" : "low_agreeableness", dist: Math.abs(agreeableness - 3) },
    { key: neuroticism >= 3 ? "neurotic" : "low_neuroticism",       dist: Math.abs(neuroticism - 3) },
    ...(openness >= 3 ? [{ key: "high_openness", dist: Math.abs(openness - 3) }] : []),
  ];
  candidates.sort((a, b) => b.dist - a.dist);
  return candidates[0].key;
}

function getCore(introversion, secondary) {
  if (secondary === "moderate_agreeableness" || secondary === "moderate_neuroticism") {
    const isAgreeable = secondary === "moderate_agreeableness";
    const metal = introversion === "extroverted" ? "Gold" : introversion === "introverted" ? "Silver" : "Copper";
    if (!isAgreeable && metal === "Gold")   return { core: "Fwooper Feather" };
    if (isAgreeable  && metal === "Silver") return { core: "Thestral Hair" };
    if (isAgreeable  && metal === "Gold")   return { core: "Antipodean Opaleye Heartstring" };
    if (isAgreeable  && metal === "Copper") return { core: "Swedish Shortsnout Heartstring" };
    if (!isAgreeable && metal === "Silver") return { core: "Ukrainian Ironbelly Heartstring" };
    if (!isAgreeable && metal === "Copper") return { core: "Catalonian Fireball Heartstring" };
    return { core: "Catalonian Fireball Heartstring" };
  }
  const map = {
    extroverted: {
      agreeable:         { core: "Unicorn Hair" },
      neurotic:          { core: "Thunderbird Feather" },
      low_agreeableness: { core: "Occamy Feather" },
      low_neuroticism:   { core: "Romanian Longhorn Heartstring" },
      high_openness:     { core: "Zouwu Heartstring" },
    },
    ambivert: {
      agreeable:         { core: "Kitsune Hair" },
      neurotic:          { core: "Werewolf Hair" },
      low_agreeableness: { core: "Vampire Hair" },
      low_neuroticism:   { core: "Centaur Hair" },
      high_openness:     { core: "Sphinx Hair" },
    },
    introverted: {
      agreeable:         { core: "Qilin Hair" },
      neurotic:          { core: "Phoenix Feather" },
      low_agreeableness: { core: "Basilisk Fang" },
      low_neuroticism:   { core: "Graphorn Tusk" },
      high_openness:     { core: "Kelpie Heartstring" },
    },
  };
  return map[introversion]?.[secondary] ?? { core: "Unicorn Hair" };
}

function getFlexibility(scores) {
  const sum = scores.intellect + scores.aesthetic + scores.assertiveness + scores.enthusiasm;
  const idx = Math.round(((sum - 4) / 16) * 17);
  const clamped = 17 - Math.max(0, Math.min(17, idx));
  const flexibilities = [
    "Whippy","Pliant","Swishy","Quite Flexible","Flexible","Supple",
    "Reasonably Supple","Surprisingly Swishy","Slightly Springy","Springy",
    "Sturdy","Firm","Hard","Solid","Stiff","Rigid","Unbending","Unyielding"
  ];
  return flexibilities[clamped];
}

function getLength(scores) {
  const diff = scores.compassion - scores.volatility;
  const clampedDiff = Math.max(-4, Math.min(4, diff));
  const raw = 12.5 + clampedDiff * (3.5 / 4);
  return Math.round(raw * 2) / 2;
}

function formatLength(length) {
  const whole = Math.floor(length);
  const frac = length - whole;
  if (frac === 0) return `${whole}`;
  if (Math.abs(frac - 0.25) < 0.01) return `${whole}\u00bc`;
  if (Math.abs(frac - 0.5)  < 0.01) return `${whole}\u00bd`;
  if (Math.abs(frac - 0.75) < 0.01) return `${whole}\u00be`;
  return length.toFixed(1);
}

function getRuggedness(scores) {
  const val = scores.athleticism;
  if (val >= 4.0) return "Rugged";
  if (val >= 3.0) return "Natural";
  if (val >= 2.0) return "Formed";
  return "Civil";
}

function getVolume(scores) {
  const diff = scores.volatility - scores.politeness;
  if (diff <= -2.5) return "Slim";
  if (diff <= -1.0) return "Lean";
  if (diff <=  1.0) return "Balanced";
  if (diff <=  2.5) return "Blooming";
  return "Broadened";
}

function getWandShape(condAnswers) {
  const condemn = condAnswers["cond_condemn"] ?? 0;
  if (condemn >= 4) return "Wavy";
  const callous = condAnswers["cond_callous"] ?? 0;
  if (callous >= 4) return "Single Curve";
  return "Solid Beam";
}

function getWoodTraits(scores, coreSecondary) {
  const coreMacroMap = {
    agreeable:              ["compassion","politeness"],
    low_agreeableness:      ["compassion","politeness"],
    moderate_agreeableness: ["compassion","politeness"],
    neurotic:               ["volatility","withdrawal"],
    low_neuroticism:        ["volatility","withdrawal"],
    moderate_neuroticism:   ["volatility","withdrawal"],
    high_openness:          ["intellect","aesthetic"],
  };
  const excludedTraits = coreMacroMap[coreSecondary] || [];
  const allTraits = [
    { name: "assertiveness", val: scores.assertiveness, macro: "extroversion" },
    { name: "enthusiasm",    val: scores.enthusiasm,    macro: "extroversion" },
    { name: "compassion",    val: scores.compassion,    macro: "agreeableness" },
    { name: "politeness",    val: scores.politeness,    macro: "agreeableness" },
    { name: "volatility",    val: scores.volatility,    macro: "neuroticism" },
    { name: "withdrawal",    val: scores.withdrawal,    macro: "neuroticism" },
    { name: "intellect",     val: scores.intellect,     macro: "openness" },
    { name: "aesthetic",     val: scores.aesthetic,     macro: "openness" },
  ].filter(t => !excludedTraits.includes(t.name));
  const sorted = [...allTraits].sort((a, b) => Math.abs(b.val - 3) - Math.abs(a.val - 3));
  const first = sorted[0];
  const second = sorted.find(t => t.macro !== first.macro);
  return [first, second].filter(Boolean).map(t => ({ name: t.name, val: t.val }));
}

function traitToWoodKey(name, val) {
  const high = val >= 3;
  const map = {
    assertiveness: high ? "assertive" : "passive",
    enthusiasm:    high ? "lively" : "reserved",
    compassion:    high ? "softhearted" : "callous",
    politeness:    high ? "accommodating" : "unaccommodating",
    volatility:    high ? "volatile" : "stable",
    withdrawal:    high ? "avoidant" : "unworried",
    intellect:     "puzzling",
    aesthetic:     "aesthetically sensitive",
  };
  return map[name] || name;
}

const WOODS = [
  { name: "Acacia",                    tags: ["aesthetically sensitive","callous"] },
  { name: "Apple",                     tags: ["stable","softhearted"] },
  { name: "Ash (Americana)",           tags: ["stable","assertive"] },
  { name: "Alder",                     tags: ["stable","accommodating"] },
  { name: "Aspen (Quaking)",           tags: ["volatile","unaccommodating"] },
  { name: "Banyan",                    tags: ["accommodating","lively"] },
  { name: "Beech (Grandifolia)",       tags: ["accommodating","puzzling"] },
  { name: "Beech (Sylvatica)",         tags: ["aesthetically sensitive","passive"] },
  { name: "Birch (River)",             tags: ["volatile","assertive"] },
  { name: "Birch (Silver)",            tags: ["volatile","callous"] },
  { name: "Bodhi",                     tags: ["softhearted","reserved"] },
  { name: "Cedar",                     tags: ["aesthetically sensitive","lively"] },
  { name: "Cherry (English)",          tags: ["accommodating","passive"] },
  { name: "Cherry (Japanese)",         tags: ["softhearted","passive"] },
  { name: "Chestnut",                  tags: ["callous","passive"] },
  { name: "Cypress (Mediterranean)",   tags: ["stable","aesthetically sensitive"] },
  { name: "Cypress (Monterey)",        tags: ["unworried","aesthetically sensitive"] },
  { name: "Cypress (Montezuma)",       tags: ["aesthetically sensitive","accommodating"] },
  { name: "Dogwood (Florida)",         tags: ["unworried","lively"] },
  { name: "Dogwood (Nuttalli)",        tags: ["softhearted","lively"] },
  { name: "Dragon Blood Tree",         tags: ["avoidant","aesthetically sensitive"] },
  { name: "Ebony (Celebica)",          tags: ["avoidant","callous"] },
  { name: "Ebony (Crassiflora)",       tags: ["avoidant","reserved"] },
  { name: "Ebony (Ebenum)",            tags: ["avoidant","passive"] },
  { name: "Elder (Black)",             tags: ["unworried","unaccommodating"] },
  { name: "Elm (Procera)",             tags: ["callous","reserved"] },
  { name: "Elm (Wych)",                tags: ["volatile","reserved"] },
  { name: "Eucalyptus (Rainbow)",      tags: ["aesthetically sensitive","assertive"] },
  { name: "Fir (Douglas)",             tags: ["stable","unaccommodating"] },
  { name: "Fir (Silver)",              tags: ["unaccommodating","reserved"] },
  { name: "Hawthorn (Monogyna)",       tags: ["avoidant","unaccommodating"] },
  { name: "Hawthorn (Ambigua)",        tags: ["puzzling","unaccommodating"] },
  { name: "Swamp Mayhaw",              tags: ["unaccommodating","passive"] },
  { name: "Hazel",                     tags: ["volatile","aesthetically sensitive"] },
  { name: "Holly",                     tags: ["volatile","softhearted"] },
  { name: "Holly (Yaupon)",            tags: ["volatile","accommodating"] },
  { name: "Hornbeam",                  tags: ["aesthetically sensitive","unaccommodating"] },
  { name: "Ivy",                       tags: ["puzzling","passive"] },
  { name: "Larch",                     tags: ["volatile","lively"] },
  { name: "Laurel",                    tags: ["puzzling","avoidant"] },
  { name: "Lilac",                     tags: ["avoidant","accommodating"] },
  { name: "Lime (Silver)",             tags: ["aesthetically sensitive","softhearted"] },
  { name: "Manchineel",                tags: ["stable","callous"] },
  { name: "Mango",                     tags: ["unworried","puzzling"] },
  { name: "Mahogany",                  tags: ["unaccommodating","assertive"] },
  { name: "Mangrove",                  tags: ["volatile","passive"] },
  { name: "Maple",                     tags: ["unworried","reserved"] },
  { name: "Oak",                       tags: ["stable","lively"] },
  { name: "Oak (Red)",                 tags: ["unaccommodating","lively"] },
  { name: "Oleander",                  tags: ["callous","lively"] },
  { name: "Olive",                     tags: ["unworried","callous"] },
  { name: "Pear",                      tags: ["unworried","passive"] },
  { name: "Pine (Bristlecone)",        tags: ["accommodating","reserved"] },
  { name: "Pine (Sylvetris)",          tags: ["stable","reserved"] },
  { name: "Sycamore",                  tags: ["stable","passive"] },
  { name: "Plum",                      tags: ["avoidant","assertive"] },
  { name: "Blackthorn",                tags: ["callous","assertive"] },
  { name: "Poplar (Alba)",             tags: ["unworried","softhearted"] },
  { name: "Poplar (Eastern)",          tags: ["unworried","assertive"] },
  { name: "Purpleheart Tree",          tags: ["softhearted","avoidant"] },
  { name: "Redwood Tree",              tags: ["stable","puzzling"] },
  { name: "Rosewood (Latifolia)",      tags: ["aesthetically sensitive","reserved"] },
  { name: "Rowan",                     tags: ["puzzling","lively"] },
  { name: "Sea Bean",                  tags: ["unworried","accommodating"] },
  { name: "Spruce (Blue)",             tags: ["accommodating","assertive"] },
  { name: "Grapevine",                 tags: ["softhearted","assertive"] },
  { name: "Walnut (European)",         tags: ["puzzling","assertive"] },
  { name: "Black Walnut",              tags: ["puzzling","softhearted"] },
  { name: "Wisteria",                  tags: ["puzzling","reserved"] },
  { name: "Willow",                    tags: ["avoidant","lively"] },
  { name: "Yew (Baccata)",             tags: ["puzzling","callous"] },
  { name: "Yew (Cuspidata)",           tags: ["volatile","puzzling"] },
];

function findWood(woodKey1, woodKey2) {
  const k1 = woodKey1.toLowerCase();
  const k2 = woodKey2.toLowerCase();
  for (const w of WOODS) {
    const tags = w.tags.map(t => t.toLowerCase());
    if ((tags.includes(k1) && tags.includes(k2)) || (tags.includes(k2) && tags.includes(k1)))
      return w.name;
  }
  const scored = WOODS.map(w => {
    const tags = w.tags.map(t => t.toLowerCase());
    return { name: w.name, score: (tags.includes(k1) ? 1 : 0) + (tags.includes(k2) ? 1 : 0) };
  }).sort((a, b) => b.score - a.score);
  return scored[0].name;
}

const INTRO_PAGES = [
  {
    eyebrow: "A Note from the Makers - Markowitz & Markowitz",
    heading: "We Sailed for This.",
    body: [
      "My name is Malchizedeck Markowitz. My brother Jabez and I are wandmakers - but before we opened this shop, we were sailors. We went looking for the materials that the established wandmakers had never thought to seek.",
      "We noticed something early in our travels that the established houses had either missed or ignored: the rarest and most powerful wand components were not found in the places everyone already knew about.",
      "That is not coincidence. That is the world telling you something about itself. We decided to listen.",
    ],
  },
  {
    eyebrow: "The Arcane Components - Power and Truth",
    heading: "What the World Gave Us",
    body: [
      "Jabez took the southern routes - coastal markets, deep jungle, islands that do not appear on most maps. I took the north and east. We were apart for three years.",
      "There are woods in this shop that have never been used in a wand made in this country. There are cores that most wandmakers would not know how to handle.",
      "We did not do it for commerce. We did it because a wand built from the full truth of the world is a different instrument than one built from habit.",
    ],
  },
  {
    eyebrow: "One Rule - No Exceptions",
    heading: "Do Not Lie to Me.",
    body: [
      "We crossed oceans to make wands that tell the truth about their wielder. The least you can do is answer honestly.",
      "We will suspect a performance. We have been doing this long enough to see one coming before you've finished your first answer.",
      "A mismatch wastes everyone's time and occasionally sets things on fire. We have seen both.",
    ],
    cta: true,
  },
];

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    left: (i * 37.3) % 100, top: (i * 61.7) % 100,
    size: (i % 3) + 1, opacity: 0.1 + (i % 7) * 0.1, delay: i % 4,
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position:"absolute", left:`${s.left}%`, top:`${s.top}%`,
          width:s.size, height:s.size, borderRadius:"50%", background:"#e8d5a3",
          opacity:s.opacity, animation:`twinkle ${2+s.delay}s ease-in-out infinite`,
          animationDelay:`${s.delay}s`,
        }} />
      ))}
    </div>
  );
}

function IntroPages({ onComplete, totalQuestions }) {
  const [page, setPage] = useState(0);
  const current = INTRO_PAGES[page];
  const isLast = page === INTRO_PAGES.length - 1;
  return (
    <div style={{ animation:"fadeSlideUp 0.7s ease both" }}>
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:24 }}>
        {INTRO_PAGES.map((_, i) => (
          <div key={i} style={{ width:i===page?20:6, height:6, borderRadius:3, background:i===page?"#c8a96e":"rgba(200,169,110,0.25)", transition:"all 0.3s" }} />
        ))}
      </div>
      <div key={page} style={{ animation:"fadeSlideUp 0.45s ease both" }}>
        <div style={{ fontSize:10, letterSpacing:"0.25em", color:"#6a5a3a", textTransform:"uppercase", textAlign:"center", marginBottom:8 }}>{current.eyebrow}</div>
        <h2 style={{ textAlign:"center", fontSize:"clamp(20px,4.5vw,30px)", fontWeight:400, color:"#f0d080", marginBottom:24 }}>{current.heading}</h2>
        <div style={{ background:"rgba(200,169,110,0.05)", border:"1px solid rgba(200,169,110,0.15)", borderRadius:8, padding:"24px 28px", marginBottom:28 }}>
          {current.body.map((para, i) => (
            <p key={i} style={{ margin:i<current.body.length-1?"0 0 16px":0, color:"#c8b882", lineHeight:1.85, fontSize:14 }}>{para}</p>
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
          {page > 0 && (
            <button onClick={() => setPage(page-1)} style={{ background:"transparent", border:"1px solid rgba(200,169,110,0.3)", color:"#a08a5a", padding:"10px 22px", borderRadius:6, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Back</button>
          )}
          {!isLast ? (
            <button onClick={() => setPage(page+1)} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"10px 28px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>Continue</button>
          ) : (
            <button onClick={onComplete} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"12px 32px", borderRadius:6, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Begin — {totalQuestions} Questions</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConditionalQuestion({ question, onAnswer, questionNumber, totalConditional }) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (val) => {
    setSelected(val);
    setTimeout(() => { onAnswer(val); setSelected(null); }, 280);
  };
  return (
    <div style={{ animation:"fadeSlideUp 0.5s ease both" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6a5a3a", marginBottom:8 }}>
          <span style={{ letterSpacing:"0.15em", textTransform:"uppercase" }}>A Final Question</span>
          <span>{questionNumber} of {totalConditional}</span>
        </div>
        <div style={{ height:2, background:"rgba(200,169,110,0.15)", borderRadius:2 }}>
          <div style={{ height:"100%", width:`${(questionNumber/totalConditional)*100}%`, background:"linear-gradient(90deg,#8a6a40,#c8a96e)", borderRadius:2, transition:"width 0.4s ease" }} />
        </div>
      </div>
      <div style={{ background:"rgba(200,169,110,0.06)", border:"1px solid rgba(200,169,110,0.2)", borderRadius:8, padding:"28px 24px", marginBottom:20 }}>
        <p style={{ margin:0, fontSize:"clamp(15px,3vw,18px)", lineHeight:1.6, color:"#f0d080", textAlign:"center" }}>{question.text}</p>
        {question.note && <p style={{ margin:"14px 0 0", fontSize:11, color:"#6a5a3a", textAlign:"center", fontStyle:"italic", letterSpacing:"0.05em" }}>{question.note}</p>}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#6a5a3a", marginBottom:8, letterSpacing:"0.08em" }}>
        <span>Strongly Disagree</span><span>Strongly Agree</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:20 }}>
        {SCALE.map(s => (
          <button key={s.value} className={`btn-choice${selected===s.value?" selected":""}`} onClick={() => handleSelect(s.value)}
            style={{ padding:"14px 4px", borderRadius:6, cursor:"pointer", textAlign:"center", transition:"all 0.18s", fontFamily:"inherit" }}>
            <div style={{ fontSize:17, marginBottom:4, fontWeight:s.value===3?400:600 }}>{s.value}</div>
            <div style={{ fontSize:9, opacity:0.65, lineHeight:1.3 }}>{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function buildNarrativePages(result) {
  const woodDescriptions = {
    assertive:               "drawn to those who lead from the front",
    passive:                 "suited to those who act with quiet deliberation",
    lively:                  "alive in the hands of the warm and gregarious",
    reserved:                "attuned to those who keep their own counsel",
    softhearted:             "responsive to deep wells of empathy and care",
    callous:                 "unbothered by sentiment — precise and unsentimental",
    accommodating:           "yielding and cooperative, made for those who bring people together",
    unaccommodating:         "unyielding, built for those who hold their ground",
    volatile:                "charged with emotional intensity and quick fire",
    stable:                  "grounded and steady, a wand that does not flinch",
    avoidant:                "private and internal, preferring shadow to stage",
    unworried:               "calm under pressure, unburdened by doubt",
    "aesthetically sensitive":"finely tuned to beauty, feeling, and the unseen",
    puzzling:                "drawn to complexity and the life of the mind",
  };
  const w1desc = woodDescriptions[result.woodKey1] || result.woodKey1;
  const w2desc = woodDescriptions[result.woodKey2] || result.woodKey2;

  const flexDesc = {
    "Whippy":              "almost alive in the hand — it moves before you do",
    "Pliant":              "eager and responsive, quick to follow your lead",
    "Swishy":              "light and expressive, built for speed and flourish",
    "Quite Flexible":      "cooperative and willing, with a little give",
    "Flexible":            "balanced between give and resistance",
    "Supple":              "smooth and fluid, it bends without breaking",
    "Reasonably Supple":   "comfortable and reliable, neither stiff nor loose",
    "Surprisingly Swishy": "deceptively quick for its character — it has hidden speed",
    "Slightly Springy":    "a touch of tension, just enough resistance to feel purposeful",
    "Springy":             "coiled energy — it wants to move",
    "Sturdy":              "dependable, solid, not easily pushed around",
    "Firm":                "strong-willed, it resists careless casting",
    "Hard":                "unyielding, demanding precision and intention",
    "Solid":               "immovable in its purpose — it does not forgive sloppiness",
    "Stiff":               "disciplined and exacting, it rewards mastery",
    "Rigid":               "uncompromising — it expects the same from its wielder",
    "Unbending":           "iron in its refusal to yield, built for absolute control",
    "Unyielding":          "the stiffest of all — a wand of total will and dominance",
  }[result.flexibility] || "balanced in its character";

  const introDesc = {
    extroverted: "You move through the world outward — your energy reaches before you do. You need a wand that can keep pace with the room you command.",
    introverted: "You move through the world inward — your power is gathered, not broadcast. You need a wand that respects your silence as much as your intention.",
    ambivert:    "You move between worlds — sometimes the room, sometimes the silence. The wand chosen for you can do both.",
  }[result.introversion] || "";

  const ruggedDesc = {
    "Civil":   "a wand of refinement — its surface is smooth, its finish lacquered, its character unmistakably shaped by intention.",
    "Formed":  "shaped by intention rather than raw nature. It has been worked, finished, and made precise.",
    "Natural": "closer to the tree than the workshop. It bears the marks of where it came from.",
    "Rugged":  "a wand built for punishment. Its grain runs deep, its finish is minimal, and it does not apologize for either.",
  }[result.ruggedness] || "";

  const volumeDesc = {
    "Slim":      "narrow and precise — it cuts through the air like a needle, favouring focus over force.",
    "Lean":      "slender with intention — efficient, unshowy, and direct in its purpose.",
    "Balanced":  "neither broad nor narrow — proportioned for versatility and adaptability across disciplines.",
    "Blooming":  "fuller through the grip, swelling with latent energy — a wand that carries weight with it.",
    "Broadened": "substantial and commanding — its presence is felt before it is used.",
  }[result.volume] || "balanced in its proportions";

  const shapeDesc = {
    "Wavy":         "the shaft undulates in a series of gentle waves — a wand that reflects a turbulent interior, one that judges and is shaped by its judgements.",
    "Single Curve": "a single deliberate arc runs its length — shaped by pride and a willingness to wear one's nature openly.",
    "Solid Beam":   "straight as intention, without curve or deviation — a wand for those who know themselves and do not perform.",
  }[result.wandShape] || "straight and true";

  const flexibleEnough = ["Whippy","Pliant","Swishy","Quite Flexible","Flexible","Supple","Reasonably Supple","Surprisingly Swishy"].includes(result.flexibility);

  return [
    { label:"The Wood",        heading:result.wood,                            body:`The wood chose itself. ${result.wood} is ${w1desc}, and ${w2desc}. ${introDesc}` },
    { label:"The Core",        heading:result.core,                            body:`The core is the truth at the centre of the instrument. ${result.core} was selected not for rarity, but for resonance with what you are.` },
    { label:"The Length",      heading:`${formatLength(result.length)} inches`, body:`Length is measured by the distance between your compassion and your volatility. At ${formatLength(result.length)} inches, this wand reflects a specific balance — or imbalance — between how deeply you feel for others and how quickly you burn.` },
    { label:"The Volume",      heading:result.volume,                          body:`Volume — the wand's girth along its shaft — is determined by the tension between volatility and restraint. ${result.volume}: ${volumeDesc}` },
    { label:"The Flexibility", heading:result.flexibility,                     body:`Flexibility: ${flexDesc}. The wand ${flexibleEnough?"wants to move with you":"asks something of you in return"}.` },
    { label:"The Ruggedness",  heading:result.ruggedness,                      body:`Ruggedness: ${ruggedDesc}` },
    { label:"The Shape",       heading:result.wandShape,                       body:`Shape is the final truth the wand carries about its wielder. ${shapeDesc}` },
  ];
}

function getDefaultStory(result) {
  const shapeNote = {
    "Wavy":         "Its surface ripples faintly, as though disturbed by a current only it can feel.",
    "Single Curve": "It bends in a single quiet arc — sure of itself, as you are of yourself.",
    "Solid Beam":   "It is perfectly straight. It does not equivocate.",
  }[result.wandShape] || "";

  return {
    chapters: [
      { title:"The Arrival",    text:`You step into the dimly lit shop of Markowitz & Markowitz. The smell is wood shavings and something older — salt, perhaps, or time. Rows of long boxes line every wall. Malchizedeck Markowitz is already watching you from behind the counter, expressionless.` },
      { title:"The Rejections", text:`The first wand you try crackles angrily and singes the edge of a nearby shelf. The second produces a sound like a door slamming shut. The third does nothing at all, which Malchizedeck says is somehow worse. He replaces each box without comment.` },
      { title:"The Calling",    text:`Suddenly, a long box on a high shelf begins to glow faintly — the colour of embers. Malchizedeck does not seem surprised. He retrieves it without being asked and sets it on the counter. He does not open it. He waits for you to.` },
      { title:"The Match",      text:`The wand settles perfectly into your hand — ${formatLength(result.length)} inches of ${result.wood}, ${result.flexibility.toLowerCase()}, with a core of ${result.core}. ${shapeNote} Its volume is ${result.volume.toLowerCase()} — ${result.volume==="Slim"||result.volume==="Lean"?"narrow and purposeful":result.volume==="Balanced"?"neither broad nor narrow":"full and weighty"}. Malchizedeck nods once. "That's the one," he says. "It was waiting."` },
    ],
  };
}

function StoryReveal({ result, onDone }) {
  const [story] = useState(() => getDefaultStory(result));
  const [page, setPage] = useState(0);
  const chapters = story.chapters;
  const isLast = page === chapters.length - 1;
  const ch = chapters[page];
  return (
    <div style={{ animation:"fadeSlideUp 0.6s ease both" }}>
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <div style={{ fontSize:10, letterSpacing:"0.3em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:6 }}>Your Story</div>
        <h2 style={{ fontSize:"clamp(18px,4vw,26px)", fontWeight:400, color:"#f0d080", margin:0 }}>{ch.title}</h2>
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:24 }}>
        {chapters.map((_, i) => (
          <div key={i} style={{ width:i===page?20:6, height:6, borderRadius:3, background:i===page?"#c8a96e":"rgba(200,169,110,0.25)", transition:"all 0.3s" }} />
        ))}
      </div>
      <div key={page} style={{ animation:"fadeSlideUp 0.45s ease both" }}>
        <div style={{ background:"rgba(200,169,110,0.05)", border:"1px solid rgba(200,169,110,0.15)", borderRadius:8, padding:"28px 24px", marginBottom:24, position:"relative" }}>
          <div style={{ position:"absolute", top:16, right:20, fontSize:48, color:"rgba(200,169,110,0.08)", fontFamily:"serif" }}>"</div>
          <p style={{ margin:0, color:"#d4c190", lineHeight:1.9, fontSize:14 }}>{ch.text}</p>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
          {page > 0 && <button onClick={() => setPage(p => p-1)} style={{ background:"transparent", border:"1px solid rgba(200,169,110,0.3)", color:"#a08a5a", padding:"10px 22px", borderRadius:6, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Back</button>}
          {!isLast
            ? <button onClick={() => setPage(p => p+1)} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"10px 28px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>Continue</button>
            : <button onClick={onDone} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"12px 32px", borderRadius:6, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Reveal Your Wand</button>}
        </div>
      </div>
    </div>
  );
}

function WandShapeSVG({ shape }) {
  let shaft;
  if (shape === "Wavy") {
    shaft = <path d="M10,14 C30,6 50,22 70,14 C90,6 110,22 130,14 C150,6 165,14 165,14" stroke="#c8a96e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />;
  } else if (shape === "Single Curve") {
    shaft = <path d="M10,18 Q87,4 165,14" stroke="#c8a96e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />;
  } else {
    shaft = <rect x="10" y="12" width="155" height="4" rx="2" fill="#c8a96e" opacity="0.85" />;
  }
  return (
    <svg width="200" height="28" viewBox="0 0 200 28" style={{ display:"block", margin:"0 auto" }}>
      {shaft}
      <rect x="165" y="9" width="28" height="10" rx="5" fill="#8a6a40" />
      <circle cx="10" cy="14" r="5" fill="#f0d080" opacity="0.95" />
      <circle cx="10" cy="14" r="2.5" fill="#fffbe0" />
    </svg>
  );
}

function ResultReveal({ result, onReset }) {
  const [page, setPage] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const pages = buildNarrativePages(result);
  const isLast = page === pages.length - 1;
  const current = pages[page];

  if (showStory && !showStats) return <StoryReveal result={result} onDone={() => setShowStats(true)} />;

  if (showStats) return (
    <div style={{ animation:"fadeSlideUp 0.6s ease both" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}><WandShapeSVG shape={result.wandShape} /></div>
      <div className="result-card" style={{ marginBottom:16 }}>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <div style={{ fontSize:11, letterSpacing:"0.25em", color:"#8a7a5a", textTransform:"uppercase", marginBottom:6 }}>Your Wand</div>
          <div style={{ fontSize:"clamp(22px,5vw,32px)", fontWeight:400, color:"#f0d080" }}>{result.wood}</div>
        </div>
        <div className="divider" style={{ margin:"16px 0" }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, textAlign:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:4 }}>Core</div>
            <div style={{ fontSize:14, color:"#d4c190" }}>{result.core}</div>
          </div>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:4 }}>Length</div>
            <div style={{ fontSize:14, color:"#d4c190" }}>{formatLength(result.length)} inches</div>
          </div>
        </div>
        <div className="divider" style={{ margin:"16px 0" }} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, textAlign:"center" }}>
          {[["Flexibility",result.flexibility],["Volume",result.volume],["Ruggedness",result.ruggedness]].map(([label,val]) => (
            <div key={label}>
              <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:14, color:"#c8a96e" }}>{val}</div>
            </div>
          ))}
        </div>
        <div className="divider" style={{ margin:"16px 0" }} />
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:10, letterSpacing:"0.2em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:4 }}>Shape</div>
          <div style={{ fontSize:14, color:"#c8a96e", marginBottom:14 }}>{result.wandShape}</div>
          <WandShapeSVG shape={result.wandShape} />
        </div>
      </div>
      <div className="result-card" style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, letterSpacing:"0.2em", color:"#8a7a5a", textTransform:"uppercase", marginBottom:14 }}>Personality Profile</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { label:"Social Nature",   val:result.introversion },
            { label:"Dominant Trait",  val:result.secondary.replace(/_/g," ") },
            { label:"Wood Affinities", val:`${result.woodKey1}, ${result.woodKey2}` },
          ].map(item => (
            <div key={item.label} style={{ background:"rgba(200,169,110,0.06)", border:"1px solid rgba(200,169,110,0.12)", borderRadius:6, padding:"10px 12px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.15em", color:"#6a5a3a", textTransform:"uppercase", marginBottom:4 }}>{item.label}</div>
              <div style={{ fontSize:13, color:"#c8b882", textTransform:"capitalize" }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="result-card" style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, letterSpacing:"0.2em", color:"#8a7a5a", textTransform:"uppercase", marginBottom:14 }}>Trait Scores</div>
        {Object.entries(result.scores).map(([trait, val]) => (
          <div key={trait} style={{ marginBottom:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#8a7a5a", marginBottom:3, textTransform:"capitalize" }}>
              <span>{trait==="aesthetic"?"Aesthetic Sensitivity":trait}</span>
              <span>{val.toFixed(1)}</span>
            </div>
            <div style={{ height:4, background:"rgba(200,169,110,0.1)", borderRadius:2 }}>
              <div style={{ height:"100%", width:`${((val-1)/4)*100}%`, background:"linear-gradient(90deg,#8a6a40,#c8a96e)", borderRadius:2 }} />
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center" }}>
        <button onClick={onReset} style={{ background:"transparent", border:"1px solid rgba(200,169,110,0.3)", color:"#a08a5a", padding:"10px 24px", borderRadius:6, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Return to the Harbour</button>
      </div>
    </div>
  );

  return (
    <div style={{ animation:"fadeSlideUp 0.6s ease both" }}>
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:28 }}>
        {pages.map((_, i) => (
          <div key={i} style={{ width:i===page?20:6, height:6, borderRadius:3, background:i===page?"#c8a96e":"rgba(200,169,110,0.25)", transition:"all 0.3s" }} />
        ))}
      </div>
      <div key={page} style={{ animation:"fadeSlideUp 0.5s ease both" }}>
        <div style={{ fontSize:10, letterSpacing:"0.3em", color:"#6a5a3a", textTransform:"uppercase", textAlign:"center", marginBottom:8 }}>{current.label}</div>
        <h2 style={{ textAlign:"center", fontSize:"clamp(22px,5vw,34px)", fontWeight:400, color:"#f0d080", marginBottom:24 }}>{current.heading}</h2>
        <div style={{ background:"rgba(200,169,110,0.05)", border:"1px solid rgba(200,169,110,0.15)", borderRadius:8, padding:"24px 28px", marginBottom:28 }}>
          <p style={{ margin:0, color:"#c8b882", lineHeight:1.85, fontSize:14 }}>{current.body}</p>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
          {page > 0 && <button onClick={() => setPage(p => p-1)} style={{ background:"transparent", border:"1px solid rgba(200,169,110,0.3)", color:"#a08a5a", padding:"10px 22px", borderRadius:6, cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>Back</button>}
          {!isLast
            ? <button onClick={() => setPage(p => p+1)} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"10px 28px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"inherit" }}>Continue</button>
            : <button onClick={() => setShowStory(true)} style={{ background:"linear-gradient(135deg,#8a6a40,#c8a96e)", border:"none", color:"#1a0f2e", padding:"12px 32px", borderRadius:6, cursor:"pointer", fontSize:14, fontWeight:700, fontFamily:"inherit" }}>Read Your Story</button>}
        </div>
      </div>
    </div>
  );
}

export default function WandQuiz() {
  const [questions] = useState(() => shuffleQuestions(QUESTIONS_RAW));
  const [phase, setPhase] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [condAnswers, setCondAnswers] = useState({});
  const [condIdx, setCondIdx] = useState(0);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);

  const finalize = useCallback((ans, cond) => {
    try {
      const scores       = computeScores(ans, questions);
      const introversion = getIntroversion(scores);
      const secondary    = getSecondaryTrait(scores);
      const coreObj      = getCore(introversion, secondary);
      const flexibility  = getFlexibility(scores);
      const length       = getLength(scores);
      const ruggedness   = getRuggedness(scores);
      const volume       = getVolume(scores);
      const wandShape    = getWandShape(cond);
      const woodTraits   = getWoodTraits(scores, secondary);
      const woodKey1     = traitToWoodKey(woodTraits[0]?.name, woodTraits[0]?.val);
      const woodKey2     = traitToWoodKey(woodTraits[1]?.name, woodTraits[1]?.val);
      const wood         = findWood(woodKey1, woodKey2);
      setResult({ introversion, secondary, core:coreObj.core, flexibility, length, ruggedness, volume, wandShape, scores, wood, woodKey1, woodKey2 });
      setPhase("result");
    } catch(e) {
      console.error("Finalize error:", e);
    }
  }, [questions]);

  const handleAnswer = useCallback((val) => {
    const q = questions[currentQ];
    if (!q) return;
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    setSelected(val);
    setTimeout(() => {
      setSelected(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(prev => prev + 1);
      } else {
        setPhase("conditional");
        setCondIdx(0);
      }
    }, 280);
  }, [currentQ, answers, questions]);

  const handleBack = useCallback(() => {
    setSelected(null);
    setCurrentQ(prev => Math.max(0, prev - 1));
  }, []);

  const handleCondAnswer = useCallback((val) => {
    const cq = CONDITIONAL_QUESTIONS[condIdx];
    const newCond = { ...condAnswers, [cq.id]: val };
    setCondAnswers(newCond);
    if (cq.id === "cond_condemn") {
      if (val >= 4) { finalize(answers, newCond); } else { setCondIdx(1); }
    } else if (cq.id === "cond_callous") {
      finalize(answers, newCond);
    }
  }, [condIdx, condAnswers, answers, finalize]);

  const reset = useCallback(() => {
    setPhase("intro"); setCurrentQ(0); setAnswers({}); setCondAnswers({});
    setResult(null); setSelected(null); setCondIdx(0);
  }, []);

  const progress = (currentQ / questions.length) * 100;
  const q = phase === "quiz" ? questions[currentQ] : null;

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(ellipse at 50% 0%, #1a0f2e 0%, #0d0a18 60%, #080610 100%)", fontFamily:"'Palatino Linotype', Palatino, Georgia, serif", color:"#d4c190" }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.8} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .btn-choice { background:rgba(255,255,255,0.04); border:1px solid rgba(200,169,110,0.2); color:#c8b882; cursor:pointer; }
        .btn-choice:hover { background:rgba(200,169,110,0.15); border-color:rgba(200,169,110,0.5); color:#f0d080; }
        .btn-choice.selected { background:rgba(200,169,110,0.28); border-color:#c8a96e; color:#f0d080; }
        .result-card { background:rgba(255,255,255,0.04); border:1px solid rgba(200,169,110,0.15); border-radius:8px; padding:20px 24px; }
        .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(200,169,110,0.3),transparent); }
        .glow-text { text-shadow:0 0 20px rgba(200,169,110,0.6),0 0 40px rgba(200,169,110,0.3); }
      `}</style>
      <Stars />
      <div style={{ position:"relative", zIndex:1, maxWidth:640, margin:"0 auto", padding:"32px 20px 60px" }}>
        <div style={{ textAlign:"center", marginBottom:32, animation:"fadeSlideUp 0.8s ease both" }}>
          <div style={{ fontSize:11, letterSpacing:"0.3em", color:"#8a7a5a", textTransform:"uppercase", marginBottom:8 }}>Markowitz & Markowitz</div>
          <h1 className="glow-text" style={{ fontSize:"clamp(24px,5.5vw,40px)", fontWeight:400, margin:0, lineHeight:1.2, color:"#f0d080" }}>Wandmakers to the Discerning</h1>
          <div style={{ fontSize:11, letterSpacing:"0.2em", color:"#7a6a4a", marginTop:8, fontStyle:"italic" }}>Est. by sail — Port Unknown</div>
        </div>

        {phase === "intro" && <IntroPages onComplete={() => setPhase("quiz")} totalQuestions={questions.length + CONDITIONAL_QUESTIONS.length} />}

        {phase === "quiz" && q && (
          <div style={{ animation:"fadeSlideUp 0.5s ease both" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6a5a3a", marginBottom:8 }}>
                <span>Question {currentQ+1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div style={{ height:2, background:"rgba(200,169,110,0.15)", borderRadius:2 }}>
                <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#8a6a40,#c8a96e)", borderRadius:2, transition:"width 0.4s ease" }} />
              </div>
            </div>
            <div key={currentQ} style={{ animation:"fadeSlideUp 0.4s ease both" }}>
              <div style={{ background:"rgba(200,169,110,0.06)", border:"1px solid rgba(200,169,110,0.2)", borderRadius:8, padding:"28px 24px", marginBottom:20 }}>
                <p style={{ margin:0, fontSize:"clamp(15px,3vw,18px)", lineHeight:1.6, color:"#f0d080" }}>
                  {q.text}{q.reverse && <span style={{ color:"#c8a96e", marginLeft:4 }}>*</span>}
                </p>
                {q.reverse && <p style={{ margin:"12px 0 0", fontSize:11, color:"#6a5a3a", fontStyle:"italic" }}>* This question is reverse-scored.</p>}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#6a5a3a", marginBottom:8, letterSpacing:"0.08em" }}>
                <span>Strongly Disagree</span><span>Strongly Agree</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:20 }}>
                {SCALE.map(s => {
                  const isSelected = selected === s.value || (selected === null && answers[q.id] === s.value);
                  return (
                    <button key={s.value} className={`btn-choice${isSelected?" selected":""}`} onClick={() => handleAnswer(s.value)}
                      style={{ padding:"14px 4px", borderRadius:6, cursor:"pointer", textAlign:"center", transition:"all 0.18s", fontFamily:"inherit" }}>
                      <div style={{ fontSize:17, marginBottom:4, fontWeight:s.value===3?400:600 }}>{s.value}</div>
                      <div style={{ fontSize:9, opacity:0.65, lineHeight:1.3 }}>{s.label}</div>
                    </button>
                  );
                })}
              </div>
              {currentQ > 0 && (
                <div style={{ textAlign:"center" }}>
                  <button onClick={handleBack} style={{ background:"transparent", border:"1px solid rgba(200,169,110,0.2)", color:"#6a5a3a", padding:"8px 20px", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"inherit" }}>Previous Question</button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "conditional" && (
          <ConditionalQuestion
            question={CONDITIONAL_QUESTIONS[condIdx]}
            onAnswer={handleCondAnswer}
            questionNumber={condIdx+1}
            totalConditional={2}
          />
        )}

        {phase === "result" && result && <ResultReveal result={result} onReset={reset} />}
      </div>
    </div>
  );
}
