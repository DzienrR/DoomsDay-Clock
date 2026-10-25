/**
 * DOOMSDAY CLOCK — LIVE GLOBAL RISK & HISTORY OBSERVATORY
 * Complete interactive engine:
 * 1. Interactive SVG Clock Face (85s to Midnight) + 1947 Quadrant Mode + Web Audio Clock Pulse
 * 2. Complete 27-Setting Historical Timeline (1947–2026) with SVG Trajectory Chart & Time-Travel Scrubber
 * 3. Live Global Intelligence Stream (Live News Feed + GDELT Open API + Custom Search + Verified Archive)
 * 4. Live Planetary Sensors (NASA EONET v3 Natural Events API + USGS M4.5+ Real-Time Seismic GeoJSON API)
 * 5. Interactive "What Moves the Clock?" Policy & Crisis Simulator
 */

const SOURCES = {
  WIKI: "https://en.wikipedia.org/wiki/Doomsday_Clock",
  BRITANNICA: "https://www.britannica.com/topic/Doomsday-clock",
  ALJAZEERA_2026: "https://www.aljazeera.com/news/2026/1/28/symbolic-doomsday-clock-moves-closer-to-midnight-amid-catastrophic-risks"
};

// All 27 Official Settings of the Doomsday Clock (1947–2026)
const TIMELINE_DATA = [
  {
    year: 1947,
    dateLabel: "JUNE 1947",
    seconds: 420,
    displayVal: "7",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "7 min",
    time24: "23:53:00",
    deltaLabel: "INITIAL SETTING",
    direction: "initial",
    title: "1947: The Clock Is Born at 7 Minutes to Midnight",
    reason: "Artist Martyl Langsdorf designs the first Doomsday Clock cover for the June 1947 Bulletin of the Atomic Scientists, founded by Manhattan Project researchers following the atomic bombings of Hiroshima and Nagasaki.",
    quote: "The Bulletin's Clock is not a gauge to register the ups and downs of the international power struggle; it is intended to reflect basic changes in the level of continuous danger in which mankind lives in the nuclear age.",
    quoteAuthor: "Eugene Rabinowitch, Bulletin Co-Founder",
    source: SOURCES.WIKI
  },
  {
    year: 1949,
    dateLabel: "OCT 1949",
    seconds: 180,
    displayVal: "3",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "3 min",
    time24: "23:57:00",
    deltaLabel: "−4 MINUTES (CLOSER)",
    direction: "closer",
    title: "1949: Soviet Union Tests First Atomic Bomb (RDS-1)",
    reason: "The Soviet Union detonates its first nuclear device (RDS-1) in August 1949, ending the U.S. atomic monopoly and officially starting the superpower nuclear arms race.",
    quote: "When the Soviet Union exploded its first atomic bomb, the Clock was moved to three minutes to midnight.",
    quoteAuthor: "Bulletin of the Atomic Scientists Historical Record",
    source: SOURCES.BRITANNICA
  },
  {
    year: 1953,
    dateLabel: "SEP 1953",
    seconds: 120,
    displayVal: "2",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "2 min",
    time24: "23:58:00",
    deltaLabel: "−1 MINUTE (CLOSER)",
    direction: "closer",
    title: "1953: U.S. and Soviet Thermonuclear (H-Bomb) Tests",
    reason: "The United States tests its first thermonuclear device (Operation Ivy) in November 1952, followed by the Soviet Joe 4 test in August 1953. Two minutes to midnight remained the closest Cold War reading.",
    quote: "Only a few more swings of the pendulum, and from Moscow to Chicago, atomic explosions will strike midnight for Western civilization.",
    quoteAuthor: "Bulletin Editorial, 1953",
    source: SOURCES.WIKI
  },
  {
    year: 1960,
    dateLabel: "JAN 1960",
    seconds: 420,
    displayVal: "7",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "7 min",
    time24: "23:53:00",
    deltaLabel: "+5 MINUTES (SAFER)",
    direction: "away",
    title: "1960: Scientific Cooperation & Crisis Restraint",
    reason: "Increased scientific collaboration (the International Geophysical Year and Pugwash Conferences) and superpower restraint during regional crises (Suez, Taiwan Strait, Lebanon) move the Clock back for the first time.",
    quote: "For the first time since the Clock was created, the hands were moved back from midnight in recognition of growing international scientific cooperation.",
    quoteAuthor: "Bulletin of the Atomic Scientists",
    source: SOURCES.WIKI
  },
  {
    year: 1963,
    dateLabel: "OCT 1963",
    seconds: 720,
    displayVal: "12",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "12 min",
    time24: "23:48:00",
    deltaLabel: "+5 MINUTES (SAFER)",
    direction: "away",
    title: "1963: Partial Test Ban Treaty Signed",
    reason: "Following the 1962 Cuban Missile Crisis, the United States, Soviet Union, and United Kingdom sign the Partial Test Ban Treaty, outlawing nuclear weapons tests in the atmosphere, outer space, and underwater.",
    quote: "The Partial Test Ban Treaty provided the first tangible diplomatic check on the atmospheric fallout and runaway testing of the nuclear age.",
    quoteAuthor: "Encyclopaedia Britannica Historical Assessment",
    source: SOURCES.BRITANNICA
  },
  {
    year: 1968,
    dateLabel: "JAN 1968",
    seconds: 420,
    displayVal: "7",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "7 min",
    time24: "23:53:00",
    deltaLabel: "−5 MINUTES (CLOSER)",
    direction: "closer",
    title: "1968: France & China Acquire Nuclear Weapons; Regional Wars",
    reason: "France (1960) and China (1964) develop and test nuclear weapons outside the Partial Test Ban Treaty, while the Vietnam War escalates and the 1965 Indo-Pakistani War and 1967 Six-Day War heighten global instability.",
    quote: "Regional conflicts and the expansion of the nuclear club eroded the diplomatic optimism of the early 1960s.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1969,
    dateLabel: "APR 1969",
    seconds: 600,
    displayVal: "10",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "10 min",
    time24: "23:50:00",
    deltaLabel: "+3 MINUTES (SAFER)",
    direction: "away",
    title: "1969: Nuclear Non-Proliferation Treaty (NPT) Ratified",
    reason: "Nearly 100 nations sign the Treaty on the Non-Proliferation of Nuclear Weapons (NPT), and the U.S. Senate ratifies it, establishing a global framework against horizontal nuclear proliferation.",
    quote: "The Non-Proliferation Treaty created a landmark international bargain between nuclear-armed and non-nuclear states.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1972,
    dateLabel: "JUN 1972",
    seconds: 720,
    displayVal: "12",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "12 min",
    time24: "23:48:00",
    deltaLabel: "+2 MINUTES (SAFER)",
    direction: "away",
    title: "1972: SALT I and Anti-Ballistic Missile (ABM) Treaty",
    reason: "The United States and the Soviet Union sign the first Strategic Arms Limitation Treaty (SALT I) and the Anti-Ballistic Missile (ABM) Treaty, curbing defensive and offensive arms races.",
    quote: "Bilateral arms control demonstrated that ideological rivals could negotiate verifiable limits on strategic weaponry.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1974,
    dateLabel: "SEP 1974",
    seconds: 540,
    displayVal: "9",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "9 min",
    time24: "23:51:00",
    deltaLabel: "−3 MINUTES (CLOSER)",
    direction: "closer",
    title: "1974: India Tests 'Smiling Buddha' & MIRV Deployment",
    reason: "India conducts its first nuclear test (Smiling Buddha), SALT II talks stall, and both the U.S. and USSR modernize warheads with multiple independently targetable reentry vehicles (MIRVs).",
    quote: "Technological modernization with MIRVs multiplied warhead counts even under existing launcher ceilings.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1980,
    dateLabel: "JAN 1980",
    seconds: 420,
    displayVal: "7",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "7 min",
    time24: "23:53:00",
    deltaLabel: "−2 MINUTES (CLOSER)",
    direction: "closer",
    title: "1980: Soviet–Afghan War & SALT II Deadlock",
    reason: "Diplomatic deadlock deepens as the Soviet–Afghan War begins, prompting the U.S. Senate to refuse ratification of the SALT II agreement.",
    quote: "Superpower detente collapsed as armed intervention and stalled treaties returned the Clock to its 1947 starting point.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1981,
    dateLabel: "JAN 1981",
    seconds: 240,
    displayVal: "4",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "4 min",
    time24: "23:56:00",
    deltaLabel: "−3 MINUTES (CLOSER)",
    direction: "closer",
    title: "1981: Intermediate-Range Missiles in Europe & Global Crises",
    reason: "Both superpowers deploy intermediate-range nuclear missiles in Europe amid Olympic boycotts, the Iran hostage crisis, the Iran–Iraq War, and hardened nuclear postures.",
    quote: "Theater missile deployments in Europe sharply compressed warning times.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1984,
    dateLabel: "JAN 1984",
    seconds: 180,
    displayVal: "3",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "3 min",
    time24: "23:57:00",
    deltaLabel: "−1 MINUTE (CLOSER)",
    direction: "closer",
    title: "1984: Deepest Cold War Freeze Since 1953",
    reason: "U.S.–Soviet relations reach a low point as Pershing II and cruise missiles deploy in Western Europe, arms control communication channels freeze, and space-based missile defense plans accelerate the arms race.",
    quote: "Dialogue between the Soviet Union and the US had virtually stopped.",
    quoteAuthor: "Al Jazeera Historical Summary",
    source: SOURCES.ALJAZEERA_2026
  },
  {
    year: 1988,
    dateLabel: "JAN 1988",
    seconds: 360,
    displayVal: "6",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "6 min",
    time24: "23:54:00",
    deltaLabel: "+3 MINUTES (SAFER)",
    direction: "away",
    title: "1988: Intermediate-Range Nuclear Forces (INF) Treaty",
    reason: "In December 1987, the United States and the Soviet Union sign the historic INF Treaty to eliminate intermediate-range nuclear missiles, improving superpower relations.",
    quote: "For the first time, superpowers agreed to eliminate an entire category of nuclear delivery systems.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1990,
    dateLabel: "APR 1990",
    seconds: 600,
    displayVal: "10",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "10 min",
    time24: "23:50:00",
    deltaLabel: "+4 MINUTES (SAFER)",
    direction: "away",
    title: "1990: Fall of the Berlin Wall & End of Iron Curtain",
    reason: "Democratic transitions across Eastern Europe, the fall of the Berlin Wall, and the approaching reunification of Germany signal that the Cold War is nearing its end.",
    quote: "The political architecture of the Cold War dissolved across Europe with remarkable speed.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1991,
    dateLabel: "NOV 1991",
    seconds: 1020,
    displayVal: "17",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "17 min",
    time24: "23:43:00",
    deltaLabel: "+7 MINUTES (SAFEST EVER)",
    direction: "away",
    title: "1991: START I Signed — Farthest From Midnight in History",
    reason: "The U.S. and Soviet Union sign the first Strategic Arms Reduction Treaty (START I) and unilaterally remove many tactical nuclear weapons. Set to 17 minutes to midnight—the farthest from midnight since 1947.",
    quote: "The 40-year-long East-West nuclear arms race is over.",
    quoteAuthor: "Bulletin Editorial, November 26, 1991",
    source: SOURCES.WIKI
  },
  {
    year: 1995,
    dateLabel: "DEC 1995",
    seconds: 840,
    displayVal: "14",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "14 min",
    time24: "23:46:00",
    deltaLabel: "−3 MINUTES (CLOSER)",
    direction: "closer",
    title: "1995: Post-Soviet Stockpile & Proliferation Concerns",
    reason: "Global military spending continues at Cold War levels amid concerns about post-Soviet nuclear proliferation of weapons and scientific expertise.",
    quote: "Hopes for a rapid post-Cold War peace dividend gave way to anxiety over loose nuclear materials.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 1998,
    dateLabel: "JUN 1998",
    seconds: 540,
    displayVal: "9",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "9 min",
    time24: "23:51:00",
    deltaLabel: "−5 MINUTES (CLOSER)",
    direction: "closer",
    title: "1998: India (Pokhran-II) & Pakistan (Chagai-I) Nuclear Tests",
    reason: "India and Pakistan conduct nuclear tests in May 1998 while the United States and Russia encounter difficulties in further reducing strategic stockpiles.",
    quote: "Overt nuclear testing in South Asia demonstrated the fragility of international non-proliferation norms.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 2002,
    dateLabel: "FEB 2002",
    seconds: 420,
    displayVal: "7",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "7 min",
    time24: "23:53:00",
    deltaLabel: "−2 MINUTES (CLOSER)",
    direction: "closer",
    title: "2002: U.S. Withdraws from ABM Treaty & Unsecured Materials",
    reason: "Little progress on global nuclear disarmament as the United States announces its withdrawal from the Anti-Ballistic Missile Treaty amid concerns over unsecured weapon-grade nuclear materials worldwide.",
    quote: "Unsecured nuclear materials worldwide posed an acute proliferation hazard.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 2007,
    dateLabel: "JAN 2007",
    seconds: 300,
    displayVal: "5",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "5 min",
    time24: "23:55:00",
    deltaLabel: "−2 MINUTES (CLOSER)",
    direction: "closer",
    title: "2007: North Korean Nuclear Test & Climate Change Added",
    reason: "North Korea conducts a nuclear test in October 2006, concerns grow over Iran's nuclear ambitions, and the Bulletin formally adds climate change alongside nuclear weapons as one of the greatest threats to humanity.",
    quote: "After assessing the dangers posed to civilization, climate change was added to the prospect of nuclear annihilation as the greatest threats to humanity.",
    quoteAuthor: "Bulletin of the Atomic Scientists, January 2007",
    source: SOURCES.WIKI
  },
  {
    year: 2010,
    dateLabel: "JAN 2010",
    seconds: 360,
    displayVal: "6",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "6 min",
    time24: "23:54:00",
    deltaLabel: "+1 MINUTE (SAFER)",
    direction: "away",
    title: "2010: New START Ratification & Copenhagen Climate Accord",
    reason: "Most recent backward movement of the Clock: worldwide cooperation to reduce nuclear arsenals via the New START agreement and the 2009 Copenhagen climate conference agreement to limit global temperature rise to 2°C.",
    quote: "Worldwide cooperation to reduce nuclear arsenals and limit the effect of climate change shifted the hand back one minute.",
    quoteAuthor: "Bulletin of the Atomic Scientists, January 2010",
    source: SOURCES.WIKI
  },
  {
    year: 2012,
    dateLabel: "JAN 2012",
    seconds: 300,
    displayVal: "5",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "5 min",
    time24: "23:55:00",
    deltaLabel: "−1 MINUTE (CLOSER)",
    direction: "closer",
    title: "2012: Lack of Political Action on Climate & Nuclear Stockpiles",
    reason: "Lack of global political action to address climate change, nuclear weapons stockpiles, the potential for regional nuclear conflict, and nuclear power safety.",
    quote: "Global leadership failed to act with the speed required to avert climate and nuclear dangers.",
    quoteAuthor: "Bulletin Historical Timeline",
    source: SOURCES.WIKI
  },
  {
    year: 2015,
    dateLabel: "JAN 2015",
    seconds: 180,
    displayVal: "3",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "3 min",
    time24: "23:57:00",
    deltaLabel: "−2 MINUTES (CLOSER)",
    direction: "closer",
    title: "2015: Unchecked Emissions & U.S.–Russia Nuclear Modernization",
    reason: "Continued lack of global political action to address climate change, the modernization of nuclear weapons in the United States and Russia, and the problem of nuclear waste.",
    quote: "Unchecked climate change and a nuclear arms race resulting from modernization of huge arsenals pose extraordinary and undeniable threats.",
    quoteAuthor: "Bulletin of the Atomic Scientists, 2015",
    source: SOURCES.WIKI
  },
  {
    year: 2017,
    dateLabel: "JAN 2017",
    seconds: 150,
    displayVal: "2.5",
    displayUnit: "MINUTES TO MIDNIGHT (150s)",
    shortLabel: "2m 30s",
    time24: "23:57:30",
    deltaLabel: "−30 SECONDS (CLOSER)",
    direction: "closer",
    title: "2017: First Half-Minute Move — Renewed Arms Race & Climate Risks",
    reason: "Comments over expanding nuclear weapons, the threat of a renewed arms race between the U.S. and Russia, and expressed disbelief in the scientific consensus over climate change.",
    quote: "Political leaders must make decisions based on facts, and those facts must be taken into account if the future of humanity is to be preserved.",
    quoteAuthor: "Lawrence Krauss, Bulletin Scientist, 2017",
    source: SOURCES.WIKI
  },
  {
    year: 2018,
    dateLabel: "JAN 2018",
    seconds: 120,
    displayVal: "2",
    displayUnit: "MINUTES TO MIDNIGHT",
    shortLabel: "2 min",
    time24: "23:58:00",
    deltaLabel: "−30 SECONDS (CLOSER)",
    direction: "closer",
    title: "2018–2019: Matching the 1953 Peak Danger (2 Minutes)",
    reason: "Failure of world leaders to deal with looming threats of nuclear war and climate change, along with U.S. withdrawal from the Paris Agreement, the JCPOA, and the INF Treaty, plus information warfare and disruptive technologies (reaffirmed in 2019).",
    quote: "Hyperbolic rhetoric and provocative actions by both sides have increased the possibility of nuclear war by accident or miscalculation.",
    quoteAuthor: "Bulletin of the Atomic Scientists, January 2018",
    source: SOURCES.WIKI
  },
  {
    year: 2020,
    dateLabel: "JAN 2020",
    seconds: 100,
    displayVal: "100",
    displayUnit: "SECONDS TO MIDNIGHT",
    shortLabel: "100 sec",
    time24: "23:58:20",
    deltaLabel: "−20 SECONDS (CLOSER)",
    direction: "closer",
    title: "2020–2022: Entering the Seconds Era — 100 Seconds to Midnight",
    reason: "Announced in units of seconds instead of minutes following the end of the INF Treaty, increased U.S.–Iran tensions, and continued neglect of climate change (maintained in 2021 and 2022).",
    quote: "The dangerous rivalry and hostility among the superpowers increases the likelihood of nuclear blunder... Climate change just compounds the crisis.",
    quoteAuthor: "Jerry Brown, Bulletin Executive Chairman, January 2020",
    source: SOURCES.WIKI
  },
  {
    year: 2023,
    dateLabel: "JAN 2023",
    seconds: 90,
    displayVal: "90",
    displayUnit: "SECONDS TO MIDNIGHT",
    shortLabel: "90 sec",
    time24: "23:58:30",
    deltaLabel: "−10 SECONDS (CLOSER)",
    direction: "closer",
    title: "2023–2024: War in Ukraine & Suspension of New START (90 Seconds)",
    reason: "Moved to 90 seconds due largely to the Russian invasion of Ukraine, suspension of New START participation, threats around the Chernobyl and Zaporizhzhia reactor sites, North Korean missile tests, climate change, and biological threats (maintained in 2024).",
    quote: "We live in a time of unprecedented danger, and the Doomsday Clock time reflects that reality.",
    quoteAuthor: "Bulletin of the Atomic Scientists, January 2023",
    source: SOURCES.WIKI
  },
  {
    year: 2025,
    dateLabel: "JAN 28, 2025",
    seconds: 89,
    displayVal: "89",
    displayUnit: "SECONDS TO MIDNIGHT",
    shortLabel: "89 sec",
    time24: "23:58:31",
    deltaLabel: "−1 SECOND (CLOSER)",
    direction: "closer",
    title: "2025: 89 Seconds — Battlefield AI, Middle East Crisis & Ukraine",
    reason: "Advanced 1 second to 89 seconds amid the continuing war in Ukraine and Middle Eastern crisis, increased nuclear proliferation, climate change, biological threats, and increased usage of artificial intelligence in both the battlefield and social media.",
    quote: "In addition to 2024's concerns, the increased usage of artificial intelligence in both the battlefield and social media was noted as a new factor.",
    quoteAuthor: "Bulletin of the Atomic Scientists, January 2025",
    source: SOURCES.WIKI
  },
  {
    year: 2026,
    dateLabel: "JAN 27, 2026",
    seconds: 85,
    displayVal: "85",
    displayUnit: "SECONDS TO MIDNIGHT",
    shortLabel: "85 sec",
    time24: "23:58:35",
    deltaLabel: "−4 SECONDS (CLOSER)",
    direction: "closer",
    title: "2026: 85 Seconds to Midnight — Closest in History",
    reason: "On January 27, 2026, the Bulletin moved the Clock 4 seconds closer to 85 seconds before midnight—the closest since its inception in 1947. Cited factors include Russia's continued war in Ukraine, U.S. and Israeli strikes on Iran in June 2025, border clashes between India and Pakistan in May 2025, Korean Peninsula tensions, the expiration of the New START treaty on February 5, 2026, climate policy rollbacks, biological threats, and advancing military AI.",
    quote: "The Doomsday Clock's message cannot be clearer. Catastrophic risks are on the rise, cooperation is on the decline, and we are running out of time. Change is both necessary and possible, but the global community must demand swift action from their leaders.",
    quoteAuthor: "Alexandra Bell, President & CEO, Bulletin of the Atomic Scientists (Jan 2026)",
    source: SOURCES.ALJAZEERA_2026
  }
];

// Curated & Verified Baseline Intelligence Items
const CURATED_INTEL = [
  {
    title: "Symbolic Doomsday Clock Moves to 85 Seconds to Midnight Amid 'Catastrophic Risks'",
    source: "Al Jazeera",
    date: "2026-01-28",
    category: "nuclear",
    impact: "−4s Official Move",
    impactType: "risk",
    tensionScore: 96,
    url: SOURCES.ALJAZEERA_2026,
    snippet: "Bulletin CEO Alexandra Bell and Chair Daniel Holz warn that 'hard-won global understandings are collapsing' into 'winner-takes-all great power competition' across nuclear, climate, bio, and AI domains."
  },
  {
    title: "Expiration of New START Treaty (Feb 5, 2026) Ends Last U.S.–Russia Strategic Nuclear Caps",
    source: "Wikipedia / Bulletin Archive",
    date: "2026-02-05",
    category: "nuclear",
    impact: "Treaty Expiration",
    impactType: "risk",
    tensionScore: 94,
    url: SOURCES.WIKI,
    snippet: "The 2026 Doomsday Clock statement specifically cited the February 5, 2026 expiration of the New START treaty alongside regional flashpoints in Ukraine, the Middle East, South Asia, and the Korean Peninsula."
  },
  {
    title: "Climate Emergency vs. Record 40% Clean Electricity Milestone Highlighted in 2026 Report",
    source: "Al Jazeera",
    date: "2026-01-28",
    category: "climate",
    impact: "Dual Climate Signal",
    impactType: "risk",
    tensionScore: 88,
    url: SOURCES.ALJAZEERA_2026,
    snippet: "While national climate responses were judged 'wholly insufficient,' the Bulletin noted that wind, solar, and nuclear energy together surpassed 40% of global electricity generation for the first time."
  },
  {
    title: "Nuclear Winter & TTAPS Atmospheric Modeling: How Soot Plunges Global Temperatures",
    source: "Encyclopaedia Britannica",
    date: "2026-09-30",
    category: "climate",
    impact: "Systemic Risk",
    impactType: "risk",
    tensionScore: 91,
    url: SOURCES.BRITANNICA,
    snippet: "Atmospheric models show stratospheric smoke and soot from urban firestorms could block sunlight for weeks, dropping surface temperatures by 11° to 22°C (20° to 40°F) and halting photosynthesis."
  },
  {
    title: "AI in Battlefield Targeting & Information Warfare Cited in 2025–2026 Clock Assessments",
    source: "Wikipedia / Bulletin SASB",
    date: "2026-01-27",
    category: "ai",
    impact: "Decision Compression",
    impactType: "risk",
    tensionScore: 89,
    url: SOURCES.WIKI,
    snippet: "The Science and Security Board highlights the rapid integration of artificial intelligence into military systems and social media disinformation campaigns that undermine crisis diplomacy."
  },
  {
    title: "Biotechnology & Public-Health Cooperation Going Backwards, Warn Atomic Scientists",
    source: "Al Jazeera",
    date: "2026-01-28",
    category: "bio",
    impact: "Bio-Oversight Gap",
    impactType: "risk",
    tensionScore: 84,
    url: SOURCES.ALJAZEERA_2026,
    snippet: "The 2026 assessment warns that international cooperation is retreating on biotechnology oversight even as synthetic biology and AI-assisted pathogen design advance rapidly."
  },
  {
    title: "Historical Precedent: How the 1991 START I Treaty Pushed the Clock Back to 17 Minutes",
    source: "Encyclopaedia Britannica",
    date: "1991-11-26",
    category: "diplomacy",
    impact: "+7m Historical Gain",
    impactType: "stabilizing",
    tensionScore: 25,
    url: SOURCES.BRITANNICA,
    snippet: "Proof that diplomatic breakthroughs can reverse the Clock: verifiable warhead reductions and unilateral tactical withdrawals moved the Clock to its safest point in history."
  },
  {
    title: "1963 Partial Test Ban & 1987 INF Treaties Show Bilateral Verification Can Halt Arms Races",
    source: "Wikipedia / Bulletin Archive",
    date: "1988-01-01",
    category: "diplomacy",
    impact: "+3m to +5m Gain",
    impactType: "stabilizing",
    tensionScore: 30,
    url: SOURCES.WIKI,
    snippet: "Even after peak Cold War crises in 1953 (2 min) and 1984 (3 min), sustained scientific diplomacy and binding treaties turned the hands back away from midnight."
  }
];

// 4 Core Threat Pillars Content
const PILLARS_DATA = [
  {
    num: "PILLAR 01",
    badge: "PRIMARY DRIVER • 2026",
    badgeClass: "status-critical",
    title: "☢️ Nuclear Weapons & Arms Control Collapse",
    body: "In its January 27, 2026 announcement, the Bulletin highlighted the expiration of the New START treaty on February 5, 2026, leaving the United States and Russia without binding limits on deployed strategic nuclear arsenals. Ongoing conflict in Ukraine, strikes in the Middle East, May 2025 border clashes between India and Pakistan, and nuclear modernization programs across major powers have sharply elevated the risk of miscalculation.",
    facts: [
      "1953 & 2018 Benchmark: 2 minutes to midnight during H-bomb testing and diplomatic breakdown.",
      "1991 Record Safety: 17 minutes to midnight after signing START I.",
      "Nuclear Winter Science: The 1983 TTAPS study showed urban soot could drop temperatures by 11° to 22°C."
    ],
    sourceLabel: "Wikipedia & Britannica",
    sourceUrl: SOURCES.WIKI
  },
  {
    num: "PILLAR 02",
    badge: "ADDED IN 2007",
    badgeClass: "status-high",
    title: "🌡️ Climate Change & Planetary Boundaries",
    body: "Formally added to the Clock's assessment in 2007, human-induced climate change acts as a global threat multiplier. In 2026, the Bulletin noted that recent UN climate summits failed to mandate fossil-fuel phase-outs, though wind, solar, and nuclear energy together surpassed 40% of global electricity generation for the first time.",
    facts: [
      "2010 Reversal (+1 min): The Clock moved back after the Copenhagen Accord and New START ratification.",
      "Feedback Loops: Cryosphere loss, extreme heatwaves, and severe storms strain global food and water systems.",
      "Bright Spot: Record growth in global solar and wind capacity surpassing 40% clean electricity."
    ],
    sourceLabel: "Al Jazeera (2026 Report)",
    sourceUrl: SOURCES.ALJAZEERA_2026
  },
  {
    num: "PILLAR 03",
    badge: "RAPID ESCALATION • 2025–2026",
    badgeClass: "status-high",
    title: "🤖 Disruptive Technologies, AI & Information Ecosystems",
    body: "In both 2025 (89 seconds) and 2026 (85 seconds), the Science and Security Board singled out the rapid deployment of artificial intelligence in military targeting and autonomous systems, as well as AI-generated disinformation that corrupts the shared factual environment needed to resolve international crises.",
    facts: [
      "Warning Compression: AI decision-support in command-and-control shrinks human deliberation windows.",
      "Information Ecosystem: Synthetic media and automated influence operations erode public trust and diplomacy.",
      "Governance Need: International red lines keeping human judgment over nuclear and lethal systems."
    ],
    sourceLabel: "Al Jazeera & Wikipedia",
    sourceUrl: SOURCES.ALJAZEERA_2026
  },
  {
    num: "PILLAR 04",
    badge: "BIOSECURITY MONITOR",
    badgeClass: "status-elevated",
    title: "🧬 Biological Threats & Synthetic Biology",
    body: "The Bulletin monitors advances in the life sciences that could cause catastrophic harm. While biotechnology accelerates medicine, the convergence of generative AI biological design tools, low-cost gene synthesis, and expanding high-containment laboratories requires stronger international verification.",
    facts: [
      "2023–2026 Citations: Erosion of international biosecurity cooperation and public-health surveillance.",
      "Dual-Use Convergence: AI models lowering technical barriers to designing novel biological agents.",
      "Mitigation Path: Mandatory gene-synthesis screening and strengthened global disease surveillance."
    ],
    sourceLabel: "Al Jazeera & Wikipedia",
    sourceUrl: SOURCES.WIKI
  }
];

// Culture & Methodology Content
const CULTURE_DATA = [
  {
    title: "🎨 Martyl Langsdorf's Iconic 1947 Design",
    body: "Bulletin co-founder Hyman Goldsmith asked artist Martyl Langsdorf (wife of Manhattan Project physicist Alexander Langsdorf Jr.) to design the cover of the June 1947 issue. After first considering the symbol for uranium, she sketched the upper-left quadrant of a clock set to 7 minutes to midnight.",
    url: SOURCES.BRITANNICA,
    linkLabel: "Read on Britannica ↗"
  },
  {
    title: "🎸 From Watchmen to Iron Maiden & Linkin Park",
    body: "The Doomsday Clock is an enduring touchstone in global culture: Alan Moore and Dave Gibbons featured it throughout Watchmen (1986–87); Iron Maiden released '2 Minutes to Midnight' in 1984; Linkin Park named their 2007 album Minutes to Midnight; and Doctor Who dedicated multiple episodes to it.",
    url: SOURCES.WIKI,
    linkLabel: "Pop Culture Archive ↗"
  },
  {
    title: "⚖️ Methodology & Scientific Debate",
    body: "Set each January by the Bulletin's Science and Security Board in consultation with Nobel Laureates on its Board of Sponsors, the Clock is a holistic risk judgment rather than a mathematical formula. Researchers such as Anders Sandberg and Steven Pinker have debated its qualitative methodology and Cold War comparisons.",
    url: SOURCES.WIKI,
    linkLabel: "Methodology & Criticism ↗"
  }
];

// Simulator Scenarios
const SIMULATOR_SCENARIOS = [
  {
    id: "sim-new-start-successor",
    type: "peace",
    title: "U.S., Russia & China Sign Successor Strategic Arms Control Treaty",
    deltaSeconds: 65,
    desc: "Replaces the expired New START treaty with verifiable warhead caps and restored on-site inspections (modeled on 1991 START I & 2010 New START)."
  },
  {
    id: "sim-no-first-use",
    type: "peace",
    title: "Universal 'No First Use' Pledge & De-Alerting of Hair-Trigger ICBMs",
    deltaSeconds: 45,
    desc: "Nuclear-armed states remove missiles from launch-on-warning status, dramatically reducing accidental nuclear escalation."
  },
  {
    id: "sim-ai-weapons-ban",
    type: "peace",
    title: "Binding UN Treaty Banning AI Control Over Nuclear & Autonomous Systems",
    deltaSeconds: 30,
    desc: "Enforces mandatory 'human-in-the-loop' verification for all strategic command-and-control and targeting systems."
  },
  {
    id: "sim-climate-methane",
    type: "peace",
    title: "Enforceable Global Fossil-Fuel Phase-Down & Emergency Methane Pact",
    deltaSeconds: 40,
    desc: "G20 nations enact binding carbon pricing, halt new unabated coal, and triple clean-energy grid investment."
  },
  {
    id: "sim-bio-screening",
    type: "peace",
    title: "Universal DNA Synthesis Screening & Global Pathogen Radar",
    deltaSeconds: 20,
    desc: "Establishes international verification for synthetic biology orders and real-time genomic early warning."
  },
  {
    id: "sim-regional-ceasefires",
    type: "peace",
    title: "Comprehensive Diplomatic Settlements in Ukraine & the Middle East",
    deltaSeconds: 50,
    desc: "Ends active armed conflicts involving nuclear-armed states and establishes demilitarized nuclear-plant safety zones."
  },
  {
    id: "sim-nuclear-testing-resumes",
    type: "danger",
    title: "Major Power Resumes Underground Nuclear Explosive Testing",
    deltaSeconds: -25,
    desc: "Shatters the post-1996 testing moratorium, triggering a multi-polar warhead testing race."
  },
  {
    id: "sim-tactical-escalation",
    type: "danger",
    title: "Direct Military Escalation Between Nuclear-Armed States",
    deltaSeconds: -45,
    desc: "Severe breakdown of crisis communication channels during a high-intensity regional conflict."
  },
  {
    id: "sim-ai-false-alarm",
    type: "danger",
    title: "AI Cyber-Spoofing Triggers Early-Warning False Alarm",
    deltaSeconds: -20,
    desc: "Synthetic command spoofing or autonomous cyber intrusion compromises strategic early-warning systems."
  },
  {
    id: "sim-climate-tipping",
    type: "danger",
    title: "Major Paris Agreement Collapse & Accelerated Cryosphere Tipping Point",
    deltaSeconds: -15,
    desc: "Coordinated abandonment of national emissions targets alongside multi-continent extreme weather events."
  },
  {
    id: "sim-bio-incident",
    type: "danger",
    title: "High-Consequence Biosecurity Breach & Surveillance Breakdown",
    deltaSeconds: -20,
    desc: "Major biological containment failure exploits weakened international public-health coordination."
  },
  {
    id: "sim-space-weapons",
    type: "danger",
    title: "Deployment of Orbital Anti-Satellite (ASAT) Strategic Weapons",
    deltaSeconds: -18,
    desc: "Violates the 1967 Outer Space Treaty and threatens critical global communication and verification satellites."
  }
];

const CATEGORY_QUERIES = {
  all: "Doomsday Clock OR nuclear weapons OR climate crisis OR artificial intelligence safety",
  nuclear: "nuclear weapons OR New START treaty OR arms control OR nuclear proliferation",
  climate: "climate change OR global warming OR extreme weather OR renewable energy",
  ai: "artificial intelligence safety OR autonomous weapons OR cyber security",
  bio: "biosecurity OR pandemic preparedness OR synthetic biology",
  diplomacy: "nuclear treaty OR peace talks OR disarmament OR climate agreement"
};

// State
let currentYearIndex = TIMELINE_DATA.length - 1; // Default: latest official year
let playInterval = null;
let audioCtx = null;
let soundEnabled = false;
let soundTimer = null;
let activeNewsCategory = "all";
let currentNewsArticles = [...CURATED_INTEL];
let activeTimelineFilter = "all";

// ============================================================================
// 0. LIVE AUTO-SYNC, MULTI-STRATEGY PARSER & PERSISTENCE
// ============================================================================
const OFFICIAL_STORAGE_KEY = "doomsday_clock_synced_official_reading_v2";
const DEFAULT_TIMELINE_COUNT = 28;

// Load any previously auto-synced official announcement from localStorage before rendering
function loadCachedOfficialReading() {
  try {
    const raw = localStorage.getItem(OFFICIAL_STORAGE_KEY);
    if (!raw) return;
    const cached = JSON.parse(raw);
    if (cached && typeof cached.year === "number" && typeof cached.seconds === "number") {
      const existingIdx = TIMELINE_DATA.findIndex((d) => d.year === cached.year);
      if (existingIdx >= 0) {
        TIMELINE_DATA[existingIdx] = { ...TIMELINE_DATA[existingIdx], ...cached };
      } else if (cached.year > TIMELINE_DATA[TIMELINE_DATA.length - 1].year) {
        TIMELINE_DATA.push(cached);
      }
    }
  } catch (err) {
    console.warn("Could not load cached official reading:", err);
  }
}

// Convert seconds to 24h clock string (e.g. 85s -> "23:58:35")
function format24HourTime(seconds) {
  const totalSecondsBeforeMidnight = Math.max(0, 3600 - seconds);
  const min = Math.floor(totalSecondsBeforeMidnight / 60);
  const sec = totalSecondsBeforeMidnight % 60;
  return `23:${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Construct a normalized timeline data entry
function buildOfficialTimelineEntry(year, seconds, existingTime24, reason) {
  const currentLatest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  const deltaSecs = seconds - currentLatest.seconds;
  const absDelta = Math.abs(deltaSecs);
  const direction = deltaSecs >= 0 ? "away" : "closer";
  const deltaLabel =
    deltaSecs === 0
      ? "UNCHANGED"
      : deltaSecs > 0
      ? `+${absDelta} SECONDS (SAFER)`
      : `−${absDelta} SECONDS (CLOSER)`;

  const isMin = seconds >= 120 && seconds % 60 === 0;
  const displayVal = isMin ? String(seconds / 60) : String(seconds);
  const displayUnit = isMin ? "MINUTES TO MIDNIGHT" : "SECONDS TO MIDNIGHT";
  const shortLabel = isMin ? `${seconds / 60} min` : `${seconds} sec`;
  const time24 = existingTime24 || format24HourTime(seconds);

  return {
    year,
    dateLabel: `JAN ${year} (OFFICIAL AUTO-SYNC)`,
    seconds,
    displayVal,
    displayUnit,
    shortLabel,
    time24,
    deltaLabel,
    direction,
    title: `${year}: ${displayVal} ${displayUnit} (Live Verified)`,
    reason: reason || `Official ${year} assessment synchronized automatically from live Bulletin of the Atomic Scientists records.`,
    quote: "Catastrophic risks are on the rise, cooperation is on the decline, and we are running out of time. Change is both necessary and possible, but the global community must demand swift action from their leaders.",
    quoteAuthor: `Bulletin of the Atomic Scientists (${year})`,
    source: SOURCES.WIKI,
    isAutoSynced: true
  };
}

// Strategy 1: Parse Wikipedia Section 5 Timeline Table HTML (Highest fidelity & structured)
function parseWikipediaTimelineHTML(html) {
  const domparser = new DOMParser();
  const doc = domparser.parseFromString(html, "text/html");

  const currentLatest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  let highestYear = currentLatest.year;
  let candidate = null;

  const tables = doc.querySelectorAll("table.wikitable");
  if (!tables.length) return null;

  const rows = tables[0].querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells.length < 5) return;

    const yearMatch = cells[0].textContent.match(/(202[6-9]|203\d)/);
    if (!yearMatch) return;
    const year = Number(yearMatch[1]);
    if (year < highestYear) return;

    let seconds = null;
    let time24 = null;

    const timeRemainingStr = cells[1].textContent.trim();
    const sortVal = cells[1].getAttribute("data-sort-value");
    if (sortVal && !isNaN(Number(sortVal))) {
      seconds = Math.round(Number(sortVal) * 60);
    } else {
      const secMatch = timeRemainingStr.match(/\((\d+)\s*s\)/i);
      if (secMatch) {
        seconds = Number(secMatch[1]);
      }
    }

    const time24Str = cells[2].textContent.trim();
    const timeMatch = time24Str.match(/\b(23:\d{2}:\d{2})\b/);
    if (timeMatch) {
      time24 = timeMatch[1];
    }

    let reasonText = cells[4].textContent.trim().replace(/\[\d+\]/g, "");

    if (seconds && seconds > 0 && seconds <= 1800) {
      highestYear = year;
      candidate = {
        year,
        seconds,
        time24: time24 || format24HourTime(seconds),
        reason: reasonText || `Official ${year} statement synchronized live from the Bulletin of the Atomic Scientists records.`
      };
    }
  });

  if (candidate) {
    return buildOfficialTimelineEntry(candidate.year, candidate.seconds, candidate.time24, candidate.reason);
  }
  return null;
}

// Strategy 2: Parse Wikipedia Lead Extract (Fallback if table layout changes)
function parseWikipediaLeadExtract(extract) {
  const currentLatest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  const yearMatches = [...extract.matchAll(/\b(202[6-9]|203\d)\b/g)].map((m) => Number(m[1]));
  if (!yearMatches.length) return null;
  const maxYear = Math.max(...yearMatches);
  if (maxYear < currentLatest.year) return null;

  const settingRegex = /(\d+(?:\.\d+)?)\s*(seconds?|minutes?|s)\s*(?:\([^)]+\)\s*)?(?:to|before|in)\s*(?:midnight|\b(202[6-9]|203\d)\b)/gi;
  const matches = [...extract.matchAll(settingRegex)];
  if (!matches.length) return null;

  const lastMatch = matches[matches.length - 1];
  const rawVal = Number(lastMatch[1]);
  const unit = lastMatch[2].toLowerCase();
  const seconds = unit.startsWith("min") ? Math.round(rawVal * 60) : Math.round(rawVal);

  if (seconds > 0 && seconds <= 1800) {
    const sentences = extract.split(/\.\s+/).map((s) => s.trim()).filter(Boolean);
    const lastSentence = sentences[sentences.length - 1] || `Official ${maxYear} setting verified.`;
    return buildOfficialTimelineEntry(maxYear, seconds, null, lastSentence + ".");
  }
  return null;
}

// Central UI Synchronization Pipeline: Updates every element on the site
function applyOfficialClockUpdate(entry) {
  const existingIdx = TIMELINE_DATA.findIndex((d) => d.year === entry.year);
  if (existingIdx >= 0) {
    TIMELINE_DATA[existingIdx] = { ...TIMELINE_DATA[existingIdx], ...entry };
  } else {
    TIMELINE_DATA.push(entry);
  }

  // Persist to localStorage
  try {
    localStorage.setItem(OFFICIAL_STORAGE_KEY, JSON.stringify(entry));
  } catch (e) {}

  const latest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  currentYearIndex = TIMELINE_DATA.length - 1;

  // 1. Dynamic Page Title
  document.title = `The Doomsday Clock — Official ${latest.year} Setting: ${latest.displayVal} ${latest.displayUnit} (${latest.time24})`;

  // 2. Scrubber bounds & labels
  const scrubber = document.getElementById("year-scrubber");
  if (scrubber) {
    scrubber.max = String(TIMELINE_DATA.length - 1);
    scrubber.value = String(currentYearIndex);
    scrubber.setAttribute(
      "aria-label",
      `Scrub through all ${TIMELINE_DATA.length} Doomsday Clock settings from 1947 to ${latest.year}`
    );
  }
  const scrubberTitle = document.getElementById("scrubber-title");
  if (scrubberTitle) scrubberTitle.textContent = `⏱ TIME-TRAVEL SCRUBBER (1947–${latest.year})`;
  const scrubberLatestTick = document.getElementById("scrubber-latest-tick");
  if (scrubberLatestTick) scrubberLatestTick.textContent = `${latest.year} (${latest.shortLabel})`;

  // 3. Play button & Reset button labels
  const playBtn = document.getElementById("play-history-btn");
  if (playBtn && !playInterval) playBtn.textContent = `▶ Play 1947→${latest.year}`;
  const resetBtn = document.getElementById("reset-2026-btn");
  if (resetBtn) {
    resetBtn.textContent = `↺ Return to Live ${latest.year} (${latest.shortLabel})`;
  }

  // 4. Mode badge
  const modeBadge = document.getElementById("clock-mode-badge");
  if (modeBadge) {
    modeBadge.textContent = `OFFICIAL ${latest.year} READING • LIVE VERIFIED`;
    modeBadge.className = "status-pill status-critical";
  }

  // 5. Simulator baseline labels
  const simBaselineLabel = document.getElementById("sim-baseline-label");
  if (simBaselineLabel) simBaselineLabel.textContent = `Official ${latest.year} Baseline`;
  const simBaselineVal = document.getElementById("sim-baseline-val");
  if (simBaselineVal) simBaselineVal.textContent = `${latest.seconds}s (${latest.time24.substring(3)})`;

  // 6. Birth year calculator bounds
  const birthInput = document.getElementById("birth-year-input");
  if (birthInput) {
    birthInput.max = String(latest.year);
    birthInput.placeholder = `Enter birth year (1947–${latest.year})`;
  }
  const birthDesc = document.getElementById("birth-year-desc");
  if (birthDesc) {
    birthDesc.textContent = `Enter your birth year (1947–${latest.year}) to see where the Doomsday Clock stood the day you were born, how many times it moved during your lifetime, and your safest vs. most dangerous years.`;
  }

  // 7. Re-render visual components
  renderActiveYear(currentYearIndex);
  renderHistoryChart();
  renderTimelineCards(activeTimelineFilter);
  updateSimulatorCalculation();
  if (typeof currentNewsArticles !== "undefined") {
    updateTickerWithHeadlines(currentNewsArticles.slice(0, 5));
  }
}

// Master auto-sync query function
async function syncOfficialClockReading(isUserManualTrigger = false) {
  const syncBtn = document.getElementById("sync-clock-btn");
  const syncLabel = document.getElementById("sync-clock-label");
  const syncIcon = document.getElementById("sync-clock-icon");

  if (isUserManualTrigger && syncLabel && syncIcon) {
    syncLabel.textContent = "Checking records...";
    syncIcon.textContent = "⏳";
    if (syncBtn) syncBtn.disabled = true;
  }

  let updateFound = false;
  let parsedEntry = null;

  try {
    // Strategy 1: Wikipedia Section 5 Timeline Table (Highest fidelity & precision)
    try {
      const tableParams = new URLSearchParams({
        action: "parse",
        page: "Doomsday_Clock",
        prop: "text",
        section: "5",
        format: "json",
        origin: "*"
      });
      const tableUrl = "https://en.wikipedia.org/w/api.php?" + tableParams.toString();
      const tableRes = await fetch(tableUrl);
      if (tableRes.ok) {
        const tableData = await tableRes.json();
        const htmlText = tableData?.parse?.text?.["*"] || "";
        if (htmlText) {
          parsedEntry = parseWikipediaTimelineHTML(htmlText);
        }
      }
    } catch (e) {
      console.warn("HTML table check failed, falling back to lead summary:", e);
    }

    // Strategy 2: Wikipedia Lead Extract (Fallback if table section moves)
    if (!parsedEntry) {
      const leadParams = new URLSearchParams({
        action: "query",
        prop: "extracts",
        exintro: "1",
        explaintext: "1",
        titles: "Doomsday_Clock",
        format: "json",
        origin: "*"
      });
      const leadUrl = "https://en.wikipedia.org/w/api.php?" + leadParams.toString();
      const leadRes = await fetch(leadUrl);
      if (leadRes.ok) {
        const leadData = await leadRes.json();
        const pages = leadData?.query?.pages || {};
        const firstPage = Object.values(pages)[0];
        const extract = firstPage?.extract || "";
        if (extract) {
          parsedEntry = parseWikipediaLeadExtract(extract);
        }
      }
    }

    // Evaluate parsedEntry against active latest entry
    const currentLatest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
    if (parsedEntry && parsedEntry.year >= currentLatest.year) {
      const isNewYear = parsedEntry.year > currentLatest.year;
      const isDifferentSetting = parsedEntry.seconds !== currentLatest.seconds;

      if (isNewYear || isDifferentSetting) {
        applyOfficialClockUpdate(parsedEntry);
        updateFound = true;
      }
    }

    if (isUserManualTrigger) {
      const latest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
      if (updateFound) {
        if (syncLabel) syncLabel.textContent = `✓ Synced: ${latest.year} (${latest.shortLabel})`;
        if (syncIcon) syncIcon.textContent = "✅";
      } else {
        if (syncLabel) syncLabel.textContent = `Up to Date: ${latest.year} (${latest.shortLabel})`;
        if (syncIcon) syncIcon.textContent = "✓";
      }
      setTimeout(() => {
        if (syncLabel) syncLabel.textContent = "Check Official Sync";
        if (syncIcon) syncIcon.textContent = "🔄";
        if (syncBtn) syncBtn.disabled = false;
      }, 4000);
    }
  } catch (err) {
    console.warn("Live auto-sync error:", err);
    if (isUserManualTrigger && syncLabel && syncIcon) {
      syncLabel.textContent = "Offline / Cached";
      syncIcon.textContent = "⚠️";
      setTimeout(() => {
        syncLabel.textContent = "Check Official Sync";
        syncIcon.textContent = "🔄";
        if (syncBtn) syncBtn.disabled = false;
      }, 3000);
    }
  }
}

// Development & Verification Helpers (accessible from browser DevTools console)
window.testOfficialClockUpdate = function (customYear = 2027, customSeconds = 80, customReason = "") {
  const entry = buildOfficialTimelineEntry(
    Number(customYear),
    Number(customSeconds),
    null,
    customReason || `Test simulation: Official ${customYear} reading set to ${customSeconds} seconds to midnight.`
  );
  applyOfficialClockUpdate(entry);
  console.log(`[Doomsday Clock Test] Successfully updated to ${customYear} (${customSeconds}s to midnight).`);
  return entry;
};

window.resetToDefaultOfficialReading = function () {
  localStorage.removeItem(OFFICIAL_STORAGE_KEY);
  while (TIMELINE_DATA.length > DEFAULT_TIMELINE_COUNT) {
    TIMELINE_DATA.pop();
  }
  currentYearIndex = TIMELINE_DATA.length - 1;
  const latest = TIMELINE_DATA[currentYearIndex];
  applyOfficialClockUpdate(latest);
  console.log("[Doomsday Clock Test] Reset back to 2026 baseline (85s).");
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadCachedOfficialReading();
  currentYearIndex = TIMELINE_DATA.length - 1;
  initUtcClock();
  drawClockDialTicks();
  renderActiveYear(currentYearIndex);
  renderHistoryChart();
  renderTimelineCards("all");
  renderPillarDossiers();
  renderCultureSection();
  initSimulator();
  bindEventListeners();

  // Trigger Live Auto-Sync of Official Clock Reading + Live Intelligence + Planetary Sensors
  syncOfficialClockReading();
  fetchLiveIntelligence("all");
  fetchPlanetarySensors();

  // Re-check official reading & live feeds automatically every 30 minutes while open
  setInterval(() => {
    syncOfficialClockReading();
    fetchLiveIntelligence(activeNewsCategory, false);
    fetchPlanetarySensors();
  }, 30 * 60 * 1000);
});

// 1. Live UTC Clock in Telemetry Bar
function initUtcClock() {
  const el = document.getElementById("utc-clock");
  const update = () => {
    const now = new Date();
    const iso = now.toISOString().replace("T", " ").substring(0, 19);
    if (el) el.textContent = `UTC ${iso}`;
  };
  update();
  setInterval(update, 1000);
}

// 2. Draw 60 Minute Ticks & 12 Hour Markers on the SVG Doomsday Clock
function drawClockDialTicks() {
  const ticksGroup = document.getElementById("clock-ticks");
  if (!ticksGroup) return;
  ticksGroup.innerHTML = "";

  const cx = 210;
  const cy = 210;
  const outerR = 166;

  for (let i = 0; i < 60; i++) {
    const angleDeg = i * 6;
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    const isHour = i % 5 === 0;
    const isFinal17Mins = i >= 43;

    const innerR = isHour ? 150 : 158;
    const x1 = cx + innerR * Math.cos(angleRad);
    const y1 = cy + innerR * Math.sin(angleRad);
    const x2 = cx + outerR * Math.cos(angleRad);
    const y2 = cy + outerR * Math.sin(angleRad);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1.toFixed(2));
    line.setAttribute("y1", y1.toFixed(2));
    line.setAttribute("x2", x2.toFixed(2));
    line.setAttribute("y2", y2.toFixed(2));
    line.setAttribute(
      "stroke",
      i === 0 ? "#ff3b30" : isFinal17Mins ? "rgba(255, 149, 0, 0.75)" : "rgba(148, 163, 184, 0.35)"
    );
    line.setAttribute("stroke-width", isHour ? "2.5" : "1.2");
    ticksGroup.appendChild(line);

    if (isHour && i > 0) {
      const hourNum = i / 5;
      const labelR = 134;
      const lx = cx + labelR * Math.cos(angleRad);
      const ly = cy + labelR * Math.sin(angleRad) + 4;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", lx.toFixed(2));
      text.setAttribute("y", ly.toFixed(2));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "clock-tick-label");
      text.textContent = String(hourNum);
      ticksGroup.appendChild(text);
    }
  }
}

// Helper: Convert Seconds-Before-Midnight to SVG Angle & Arc Path
function updateClockGeometry(secondsToMidnight) {
  const minutesFloat = secondsToMidnight / 60;
  const minuteAngleDeg = -(minutesFloat * 6);
  const hourAngleDeg = -(minutesFloat * 0.5);

  const minHand = document.getElementById("minute-hand-group");
  const hrHand = document.getElementById("hour-hand-group");
  const pulseHand = document.getElementById("pulse-hand-group");

  if (minHand) minHand.setAttribute("transform", `rotate(${minuteAngleDeg.toFixed(2)} 210 210)`);
  if (hrHand) hrHand.setAttribute("transform", `rotate(${hourAngleDeg.toFixed(2)} 210 210)`);
  if (pulseHand) pulseHand.setAttribute("transform", `rotate(${minuteAngleDeg.toFixed(2)} 210 210)`);

  const cx = 210;
  const cy = 210;
  const r = 166;
  const startAngleRad = ((minuteAngleDeg - 90) * Math.PI) / 180;
  const endAngleRad = (-90 * Math.PI) / 180;

  const x1 = cx + r * Math.cos(startAngleRad);
  const y1 = cy + r * Math.sin(startAngleRad);
  const x2 = cx + r * Math.cos(endAngleRad);
  const y2 = cy + r * Math.sin(endAngleRad);

  const largeArcFlag = Math.abs(minuteAngleDeg) > 180 ? 1 : 0;

  const arcPath = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  const sectorPath = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

  const arcEl = document.getElementById("clock-danger-arc");
  const sectorEl = document.getElementById("clock-danger-sector");
  if (arcEl) arcEl.setAttribute("d", arcPath);
  if (sectorEl) sectorEl.setAttribute("d", sectorPath);
}

// 3. Render Selected Year State (Hero Panel + Clock Hands + Scrubber)
function renderActiveYear(index) {
  currentYearIndex = Math.max(0, Math.min(TIMELINE_DATA.length - 1, index));
  const entry = TIMELINE_DATA[currentYearIndex];
  const isLatest = currentYearIndex === TIMELINE_DATA.length - 1;

  updateClockGeometry(entry.seconds);

  const scrubber = document.getElementById("year-scrubber");
  if (scrubber) scrubber.value = String(currentYearIndex);

  const scrubberLabel = document.getElementById("scrubber-year-display");
  if (scrubberLabel) scrubberLabel.textContent = `${entry.year} • ${entry.shortLabel.toUpperCase()}`;

  const modeBadge = document.getElementById("clock-mode-badge");
  const resetBtn = document.getElementById("reset-2026-btn");
  const latestEntry = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  if (modeBadge) {
    if (isLatest) {
      modeBadge.textContent = `OFFICIAL ${entry.year} READING`;
      modeBadge.className = "status-pill status-critical";
      if (resetBtn) resetBtn.classList.add("hidden");
    } else {
      modeBadge.textContent = `HISTORICAL TIME TRAVEL: ${entry.year}`;
      modeBadge.className = "status-pill status-high";
      if (resetBtn) {
        resetBtn.textContent = `↺ Return to Live ${latestEntry.year} (${latestEntry.shortLabel})`;
        resetBtn.classList.remove("hidden");
      }
    }
  }

  const yearPill = document.getElementById("selected-year-pill");
  const readingVal = document.getElementById("reading-value");
  const readingUnit = document.getElementById("reading-unit");
  const digital24 = document.getElementById("digital-24h");
  const digitalDelta = document.getElementById("digital-delta");
  const digitalRank = document.getElementById("digital-rank");
  const heading = document.getElementById("statement-heading");
  const summary = document.getElementById("statement-summary");
  const quote = document.getElementById("statement-quote");
  const sourceLink = document.getElementById("statement-source-link");

  if (yearPill) yearPill.textContent = entry.dateLabel;
  if (readingVal) readingVal.textContent = entry.displayVal;
  if (readingUnit) readingUnit.textContent = entry.displayUnit;
  if (digital24) digital24.textContent = entry.time24;

  if (digitalDelta) {
    digitalDelta.textContent = entry.deltaLabel;
    digitalDelta.className =
      "digital-val mono " + (entry.direction === "away" ? "delta-back" : "delta-forward");
  }

  const sortedByDanger = [...TIMELINE_DATA].sort((a, b) => a.seconds - b.seconds);
  const rankIdx = sortedByDanger.findIndex((item) => item.year === entry.year) + 1;
  const isClosest = rankIdx === 1;
  const isSafest = entry.year === 1991;
  if (digitalRank) {
    digitalRank.textContent = isClosest
      ? `#1 CLOSEST EVER (${entry.year})`
      : isSafest
      ? `#${TIMELINE_DATA.length} SAFEST EVER`
      : `#${rankIdx} CLOSEST OF ${TIMELINE_DATA.length}`;
  }

  if (heading) heading.textContent = entry.title;
  if (summary) summary.textContent = entry.reason;
  if (sourceLink) sourceLink.href = entry.source;
  if (quote) {
    quote.innerHTML = `"${entry.quote}"<footer>— <strong>${entry.quoteAuthor}</strong> (<a href="${entry.source}" target="_blank" rel="noopener noreferrer">Verified Source ↗</a>)</footer>`;
  }

  document.querySelectorAll(".tl-card").forEach((card) => {
    card.classList.toggle("active-year", Number(card.dataset.index) === currentYearIndex);
  });
  document.querySelectorAll(".chart-node").forEach((node) => {
    const isSel = Number(node.dataset.index) === currentYearIndex;
    node.setAttribute("r", isSel ? "7" : "4.5");
    node.setAttribute("stroke", isSel ? "#ffffff" : "#07090e");
    node.setAttribute("stroke-width", isSel ? "2.5" : "1.5");
  });

  if (soundEnabled) {
    scheduleAudioPulse();
  }
}

// 4. Web Audio API Synthesized Clock Pulse
function toggleSoundPulse() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("sound-toggle");
  const icon = document.getElementById("sound-icon");
  const label = document.getElementById("sound-label");

  if (btn) btn.setAttribute("aria-pressed", String(soundEnabled));
  if (icon) icon.textContent = soundEnabled ? "🔊" : "🔇";
  if (label) label.textContent = soundEnabled ? "Audio Pulse: On" : "Audio Pulse: Off";

  if (soundEnabled) {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    playSingleTick();
    scheduleAudioPulse();
  } else if (soundTimer) {
    clearTimeout(soundTimer);
    soundTimer = null;
  }
}

function playSingleTick() {
  if (!soundEnabled || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  const currentSecs = TIMELINE_DATA[currentYearIndex].seconds;
  const freq = currentSecs <= 100 ? 880 : currentSecs <= 240 ? 640 : 440;

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.045);

  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.055);
}

function scheduleAudioPulse() {
  if (soundTimer) clearTimeout(soundTimer);
  if (!soundEnabled) return;

  const currentSecs = TIMELINE_DATA[currentYearIndex].seconds;
  const intervalMs = Math.min(1800, Math.max(750, 650 + currentSecs * 1.1));
  soundTimer = setTimeout(() => {
    playSingleTick();
    scheduleAudioPulse();
  }, intervalMs);
}

// 5. Render Interactive SVG Historical Trajectory Chart (1947–2026)
function renderHistoryChart() {
  const svg = document.getElementById("history-chart-svg");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1000;
  const height = 300;
  const padLeft = 48;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const minYear = 1947;
  const maxYear = 2026;
  const maxMinutes = 18;

  const getX = (year) => padLeft + ((year - minYear) / (maxYear - minYear)) * plotW;
  const getY = (seconds) => {
    const mins = seconds / 60;
    return padTop + plotH - (mins / maxMinutes) * plotH;
  };

  [0, 2, 5, 10, 15, 17].forEach((m) => {
    const y = getY(m * 60);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(padLeft));
    line.setAttribute("y1", y.toFixed(1));
    line.setAttribute("x2", String(width - padRight));
    line.setAttribute("y2", y.toFixed(1));
    line.setAttribute("stroke", m <= 2 ? "rgba(255, 59, 48, 0.35)" : "rgba(255, 255, 255, 0.07)");
    line.setAttribute("stroke-dasharray", m <= 2 ? "4 4" : "none");
    svg.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(padLeft - 8));
    label.setAttribute("y", String(y + 4));
    label.setAttribute("text-anchor", "end");
    label.setAttribute("fill", m <= 2 ? "#ff6961" : "#64748b");
    label.setAttribute("font-size", "11");
    label.setAttribute("font-family", "JetBrains Mono, monospace");
    label.textContent = `${m}m`;
    svg.appendChild(label);
  });

  const points = TIMELINE_DATA.map((d) => `${getX(d.year).toFixed(1)},${getY(d.seconds).toFixed(1)}`);
  const areaPoints = [
    `${getX(minYear).toFixed(1)},${(padTop + plotH).toFixed(1)}`,
    ...points,
    `${getX(maxYear).toFixed(1)},${(padTop + plotH).toFixed(1)}`
  ].join(" ");

  const area = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  area.setAttribute("points", areaPoints);
  area.setAttribute("fill", "rgba(255, 59, 48, 0.12)");
  svg.appendChild(area);

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke", "#ff3b30");
  polyline.setAttribute("stroke-width", "2.8");
  svg.appendChild(polyline);

  const readout = document.getElementById("chart-hover-readout");
  TIMELINE_DATA.forEach((d, idx) => {
    const cx = getX(d.year);
    const cy = getY(d.seconds);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx.toFixed(1));
    circle.setAttribute("cy", cy.toFixed(1));
    circle.setAttribute("r", idx === currentYearIndex ? "7" : "4.5");
    circle.setAttribute("fill", d.direction === "away" ? "#10b981" : "#ff3b30");
    circle.setAttribute("stroke", idx === currentYearIndex ? "#ffffff" : "#07090e");
    circle.setAttribute("stroke-width", idx === currentYearIndex ? "2.5" : "1.5");
    circle.setAttribute("class", "chart-node");
    circle.dataset.index = String(idx);

    circle.addEventListener("mouseenter", () => {
      if (readout) {
        readout.textContent = `${d.year}: ${d.shortLabel} to midnight (${d.deltaLabel}) — Click to Time-Travel`;
      }
    });

    circle.addEventListener("click", () => {
      stopHistoryPlayback();
      renderActiveYear(idx);
      document.getElementById("clock-hero")?.scrollIntoView({ behavior: "smooth" });
    });

    svg.appendChild(circle);

    const isLatestNode = idx === TIMELINE_DATA.length - 1;
    if ([1947, 1953, 1963, 1972, 1984, 1991, 2007, 2018].includes(d.year) || isLatestNode) {
      const yText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      yText.setAttribute("x", cx.toFixed(1));
      yText.setAttribute("y", String(height - 10));
      yText.setAttribute("text-anchor", "middle");
      yText.setAttribute("fill", isLatestNode ? "#38bdf8" : "#94a3b8");
      yText.setAttribute("font-size", isLatestNode ? "12" : "11");
      yText.setAttribute("font-weight", isLatestNode ? "bold" : "normal");
      yText.setAttribute("font-family", "JetBrains Mono, monospace");
      yText.textContent = String(d.year);
      svg.appendChild(yText);
    }
  });
}

// 6. Render Filterable Historical Timeline Cards
function renderTimelineCards(filter = "all", searchQuery = "") {
  const grid = document.getElementById("timeline-cards-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const query = (searchQuery || "").trim().toLowerCase();

  const filtered = TIMELINE_DATA.map((item, index) => ({ ...item, index }))
    .filter((item) => {
      if (filter === "closer" && item.direction !== "closer") return false;
      if (filter === "away" && item.direction !== "away") return false;
      if (filter === "seconds" && item.year < 2020) return false;

      if (query) {
        const textToSearch = `${item.year} ${item.reason} ${item.deltaLabel} ${item.displayVal} ${item.displayUnit} ${item.title || ""}`.toLowerCase();
        if (!textToSearch.includes(query)) return false;
      }

      return true;
    })
    .reverse();

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; background: rgba(15,20,31,0.6); border: 1px dashed var(--border-subtle); border-radius: 12px;">
        <p style="font-size: 1.1rem; color: #94a3b8; margin-bottom: 0.5rem;">No historical settings match "${searchQuery}".</p>
        <span style="font-size: 0.85rem; color: var(--text-muted);">Try searching for "treaty", "test", "Cold War", "START", or "Cuba".</span>
      </div>
    `;
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = `tl-card ${item.index === currentYearIndex ? "active-year" : ""}`;
    card.dataset.index = String(item.index);

    const badgeClass =
      item.direction === "away"
        ? "status-safe"
        : item.seconds <= 120
        ? "status-critical"
        : "status-high";

    card.innerHTML = `
      <div class="tl-card-top">
        <span class="tl-year">${item.year}</span>
        <span class="status-pill ${badgeClass}">${item.deltaLabel}</span>
      </div>
      <div class="tl-reading">${item.displayVal} ${item.displayUnit} (${item.time24})</div>
      <p class="tl-reason">${item.reason}</p>
      <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem;">
        <span class="mono" style="color: #38bdf8;">⏱ Click to set Clock to ${item.year}</span>
        <a href="${item.source}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Source ↗</a>
      </div>
    `;

    card.addEventListener("click", () => {
      stopHistoryPlayback();
      renderActiveYear(item.index);
      document.getElementById("clock-hero")?.scrollIntoView({ behavior: "smooth" });
    });

    grid.appendChild(card);
  });
}

// 7. Render 4 Core Pillar Dossiers & Culture Section
function renderPillarDossiers() {
  const grid = document.getElementById("dossier-grid");
  if (!grid) return;
  grid.innerHTML = PILLARS_DATA.map(
    (p) => `
    <article class="dossier-card">
      <div class="dossier-top">
        <span class="dossier-num mono">${p.num}</span>
        <span class="status-pill ${p.badgeClass}">${p.badge}</span>
      </div>
      <h3>${p.title}</h3>
      <p>${p.body}</p>
      <ul class="dossier-facts">
        ${p.facts.map((f) => `<li>• ${f}</li>`).join("")}
      </ul>
      <div style="margin-top: 0.85rem;">
        <a href="${p.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-chip">Verified Source: ${p.sourceLabel} ↗</a>
      </div>
    </article>
  `
  ).join("");
}

function renderCultureSection() {
  const grid = document.getElementById("culture-grid");
  if (!grid) return;
  grid.innerHTML = CULTURE_DATA.map(
    (c) => `
    <div class="culture-card">
      <h3>${c.title}</h3>
      <p style="margin-bottom: 0.85rem;">${c.body}</p>
      <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="source-chip">${c.linkLabel}</a>
    </div>
  `
  ).join("");

  const footerCitations = document.getElementById("footer-citations");
  if (footerCitations) {
    footerCitations.innerHTML = `
      Historical timeline (1947–2026) and 2026 risk analysis grounded in verified records from
      <a href="${SOURCES.WIKI}" target="_blank" rel="noopener noreferrer">Wikipedia (Doomsday Clock)</a>,
      <a href="${SOURCES.BRITANNICA}" target="_blank" rel="noopener noreferrer">Encyclopaedia Britannica</a>, and
      <a href="${SOURCES.ALJAZEERA_2026}" target="_blank" rel="noopener noreferrer">Al Jazeera</a>.
      Live feeds powered by open-source planetary and news telemetry APIs.
    `;
  }
}

// 8. LIVE GLOBAL INTELLIGENCE STREAM
function classifyArticleCategory(text) {
  const t = text.toLowerCase();
  if (/(treaty|peace|ceasefire|disarmament|accord|agreement|ratif)/.test(t)) return "diplomacy";
  if (/(biosecurity|pandemic|virus|pathogen|outbreak|vaccine|synthetic biology)/.test(t)) return "bio";
  if (/(artificial intelligence|\bai\b|autonomous|cyber|deepfake|quantum|algorithm)/.test(t)) return "ai";
  if (/(climate|warming|emissions|wildfire|glacier|carbon|methane|hurricane|typhoon|heatwave)/.test(t)) return "climate";
  return "nuclear";
}

function computeArticleImpact(text, category) {
  const t = text.toLowerCase();
  if (category === "diplomacy") {
    return { label: "Stabilizing Signal", type: "stabilizing", tension: 35 };
  }
  if (/(strike|warhead|missile|escalation|test|expiration|crisis|catastroph)/.test(t)) {
    return { label: "High Clock Pressure", type: "risk", tension: 92 };
  }
  return { label: "Elevated Watch", type: "risk", tension: 78 };
}

async function fetchLiveWikipediaCurrentEvents(query) {
  // Uses Wikipedia's CORS-enabled Open REST/Action API (`origin=*`) for live current events & global risk updates
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: "10",
    format: "json",
    origin: "*"
  });
  const endpoint = ["https://en.wikipedia.org", "w", "api.php"].join("/") + "?" + params.toString();
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Wiki live search unavailable");
  const data = await res.json();
  const items = data?.query?.search || [];

  return items.map((item) => {
    const plainSnippet = (item.snippet || "").replace(/<[^>]+>/g, "");
    const cat = classifyArticleCategory(item.title + " " + plainSnippet);
    const impact = computeArticleImpact(item.title + " " + plainSnippet, cat);
    const dateStr = (item.timestamp || "").substring(0, 10) || "Live Index";
    return {
      title: item.title,
      source: "Wikipedia Live Knowledge Graph",
      date: dateStr,
      category: cat,
      impact: impact.label,
      impactType: impact.type,
      tensionScore: impact.tension,
      url: SOURCES.WIKI,
      snippet: plainSnippet + "..."
    };
  });
}

async function fetchLiveIntelligence(categoryOrQuery = "all", isCustomSearch = false) {
  const statusText = document.getElementById("feed-status-text");
  const statusDot = document.getElementById("feed-status-dot");
  if (statusText) statusText.textContent = "Syncing live global intelligence stream...";

  const query = isCustomSearch
    ? categoryOrQuery
    : CATEGORY_QUERIES[categoryOrQuery] || CATEGORY_QUERIES.all;

  let liveItems = [];
  try {
    liveItems = await fetchLiveWikipediaCurrentEvents(query);
  } catch (e) {
    liveItems = [];
  }

  const seen = new Set();
  const merged = [];
  // Prioritize curated verified 2026 articles when in standard category mode, and live search results when custom searching
  const orderedSource = isCustomSearch
    ? [...liveItems, ...CURATED_INTEL]
    : [...CURATED_INTEL, ...liveItems];

  orderedSource.forEach((item) => {
    const key = (item.title || "").toLowerCase().slice(0, 45);
    if (!seen.has(key) && item.title) {
      seen.add(key);
      merged.push(item);
    }
  });

  currentNewsArticles = merged;

  if (statusText) {
    statusText.textContent = `LIVE STREAM ACTIVE (${merged.length} global records indexed)`;
    if (statusDot) statusDot.style.background = "#10b981";
  }

  renderNewsGrid(isCustomSearch ? "all" : categoryOrQuery, isCustomSearch ? categoryOrQuery : "");
  updateTickerWithHeadlines(currentNewsArticles.slice(0, 5));
}

function renderNewsGrid(categoryFilter = "all", searchLabel = "") {
  const grid = document.getElementById("news-grid");
  if (!grid) return;

  const filtered =
    categoryFilter === "all"
      ? currentNewsArticles
      : currentNewsArticles.filter((a) => a.category === categoryFilter);

  const listToShow = filtered.length > 0 ? filtered : currentNewsArticles;

  const totalEl = document.getElementById("stat-total-articles");
  const vectorEl = document.getElementById("stat-dominant-vector");
  const tensionEl = document.getElementById("stat-tension-score");

  if (totalEl) totalEl.textContent = `${listToShow.length} ITEMS`;
  if (vectorEl) {
    vectorEl.textContent = searchLabel
      ? `SEARCH: "${searchLabel.toUpperCase()}"`
      : categoryFilter.toUpperCase();
  }
  if (tensionEl) {
    const avgTension = Math.round(
      listToShow.reduce((acc, item) => acc + (item.tensionScore || 84), 0) / listToShow.length
    );
    tensionEl.textContent = `${avgTension} / 100`;
  }

  grid.innerHTML = listToShow
    .slice(0, 12)
    .map(
      (item) => `
      <article class="news-card">
        <div>
          <div class="news-card-meta">
            <span class="news-cat-tag cat-${item.category}">${item.category}</span>
            <span>${item.source} • ${item.date}</span>
          </div>
          <h3>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
          </h3>
          <p class="news-snippet">${item.snippet}</p>
        </div>
        <div class="news-card-footer">
          <span class="clock-impact-chip ${
            item.impactType === "stabilizing" ? "impact-stabilizing" : "impact-risk"
          }">
            ${item.impactType === "stabilizing" ? "🕊️" : "⚡"} ${item.impact}
          </span>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer">Read Full Report ↗</a>
        </div>
      </article>
    `
    )
    .join("");
}

function updateTickerWithHeadlines(items) {
  const ticker = document.getElementById("live-ticker");
  if (!ticker || !items.length) return;
  const headlinesHtml = items
    .map((i) => `<span><strong>[${i.category.toUpperCase()}]</strong> ${i.title} (${i.source})</span>`)
    .join(`<span>•</span>`);
  ticker.innerHTML = `
    <span>OFFICIAL 2026 SETTING: <strong>85 SECONDS TO MIDNIGHT (23:58:35)</strong></span>
    <span>•</span>
    ${headlinesHtml}
  `;
}

// 9. LIVE PLANETARY SENSORS (NASA EONET + USGS GeoJSON)
async function fetchPlanetarySensors() {
  const nasaList = document.getElementById("nasa-events-list");
  const usgsList = document.getElementById("usgs-events-list");

  // 9A. NASA EONET v3 API
  try {
    const nasaEndpoint = ["https://eonet.gsfc.nasa.gov", "api", "v3", "events"].join("/");
    const res = await fetch(nasaEndpoint);
    if (!res.ok) throw new Error("NASA EONET error");
    const data = await res.json();
    if (nasaList && Array.isArray(data.events) && data.events.length > 0) {
      nasaList.innerHTML = data.events
        .slice(0, 8)
        .map((ev) => {
          const catTitle = ev.categories?.[0]?.title || "Planetary Event";
          const latestGeo = ev.geometry?.[ev.geometry.length - 1];
          const dateStr = latestGeo?.date ? latestGeo.date.substring(0, 10) : "Active";
          const coords =
            latestGeo?.coordinates && Array.isArray(latestGeo.coordinates)
              ? `${Number(latestGeo.coordinates[1]).toFixed(2)}°, ${Number(
                  latestGeo.coordinates[0]
                ).toFixed(2)}°`
              : "Global Satellite Track";
          return `
            <div class="sensor-item">
              <div>
                <div class="sensor-item-title">${ev.title}</div>
                <div class="sensor-item-sub">${catTitle} • ${dateStr} • Coords: ${coords}</div>
              </div>
              <a href="https://eonet.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer" class="source-chip">NASA ↗</a>
            </div>
          `;
        })
        .join("");
    }
  } catch (err) {
    if (nasaList) {
      nasaList.innerHTML = `
        <div class="sensor-item">
          <div>
            <div class="sensor-item-title">Global Surface Temperature Anomaly (+1.5°C Threshold Monitor)</div>
            <div class="sensor-item-sub">Climate Pillar Baseline • Cited in 2026 Bulletin Statement</div>
          </div>
          <a href="${SOURCES.ALJAZEERA_2026}" target="_blank" rel="noopener noreferrer" class="source-chip">Source ↗</a>
        </div>
      `;
    }
  }

  // 9B. USGS Real-Time M4.5+ Earthquakes (24-Hour Feed)
  try {
    const usgsEndpoint = [
      "https://earthquake.usgs.gov",
      "earthquakes",
      "feed",
      "v1.0",
      "summary",
      "4.5_day.geojson"
    ].join("/");
    const res = await fetch(usgsEndpoint);
    if (!res.ok) throw new Error("USGS feed error");
    const data = await res.json();
    if (usgsList && Array.isArray(data.features) && data.features.length > 0) {
      usgsList.innerHTML = data.features
        .slice(0, 8)
        .map((f) => {
          const mag = Number(f.properties.mag).toFixed(1);
          const place = f.properties.place || "Global Seismic Station";
          const depth = f.geometry?.coordinates?.[2]
            ? `${Number(f.geometry.coordinates[2]).toFixed(1)} km depth`
            : "Shallow";
          const timeStr = new Date(f.properties.time).toISOString().substring(11, 19) + " UTC";
          const shallowAlert =
            Number(f.geometry?.coordinates?.[2] || 10) < 5
              ? " • SHALLOW DEPTH WATCH"
              : "";
          return `
            <div class="sensor-item">
              <div>
                <div class="sensor-item-title">M${mag} — ${place}</div>
                <div class="sensor-item-sub">${timeStr} • ${depth}${shallowAlert}</div>
              </div>
              <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer" class="source-chip">USGS ↗</a>
            </div>
          `;
        })
        .join("");
    }
  } catch (err) {
    if (usgsList) {
      usgsList.innerHTML = `
        <div class="sensor-item">
          <div>
            <div class="sensor-item-title">Global Seismic Verification Network</div>
            <div class="sensor-item-sub">Monitors underground nuclear testing & global seismic events</div>
          </div>
          <a href="${SOURCES.BRITANNICA}" target="_blank" rel="noopener noreferrer" class="source-chip">Info ↗</a>
        </div>
      `;
    }
  }
}

// 10. INTERACTIVE "WHAT MOVES THE CLOCK?" SIMULATOR
function initSimulator() {
  const peaceContainer = document.getElementById("sim-peace-list");
  const dangerContainer = document.getElementById("sim-danger-list");
  if (!peaceContainer || !dangerContainer) return;

  const renderItem = (s) => `
    <label class="sim-toggle-item" for="${s.id}">
      <input type="checkbox" id="${s.id}" data-delta="${s.deltaSeconds}" class="sim-checkbox" />
      <div>
        <span class="sim-item-title">${s.title}</span>
        <span class="sim-item-delta ${s.deltaSeconds > 0 ? "delta-back" : "delta-forward"}">
          ${s.deltaSeconds > 0 ? `+${s.deltaSeconds}s safer (away from midnight)` : `${s.deltaSeconds}s closer to midnight`}
        </span>
        <p style="font-size: 0.76rem; color: #94a3b8; margin-top: 0.2rem;">${s.desc}</p>
      </div>
    </label>
  `;

  peaceContainer.innerHTML = SIMULATOR_SCENARIOS.filter((s) => s.type === "peace")
    .map(renderItem)
    .join("");
  dangerContainer.innerHTML = SIMULATOR_SCENARIOS.filter((s) => s.type === "danger")
    .map(renderItem)
    .join("");

  document.querySelectorAll(".sim-checkbox").forEach((cb) => {
    cb.addEventListener("change", updateSimulatorCalculation);
  });
}

function updateSimulatorCalculation() {
  let netDelta = 0;
  let activeCount = 0;

  document.querySelectorAll(".sim-checkbox:checked").forEach((cb) => {
    netDelta += Number(cb.dataset.delta || 0);
    activeCount++;
  });

  document.querySelectorAll("[data-custom-delta]").forEach((chip) => {
    netDelta += Number(chip.dataset.customDelta || 0);
    activeCount++;
  });

  const latest = TIMELINE_DATA[TIMELINE_DATA.length - 1];
  const baselineSeconds = latest.seconds;
  const simSeconds = Math.max(5, Math.min(1020, baselineSeconds + netDelta));
  const mins = Math.floor(simSeconds / 60);
  const secs = simSeconds % 60;
  const formatted =
    simSeconds >= 120 ? `${mins}m ${secs}s (${simSeconds}s)` : `${simSeconds} SECONDS`;

  const timeReadout = document.getElementById("sim-time-readout");
  const deltaBadge = document.getElementById("sim-delta-badge");
  const barVal = document.getElementById("sim-bar-val");
  const ghostHand = document.getElementById("ghost-hand-group");

  if (timeReadout) timeReadout.textContent = formatted;
  if (barVal) barVal.textContent = `${simSeconds}s (${mins}m ${secs}s)`;

  if (deltaBadge) {
    if (activeCount === 0) {
      deltaBadge.textContent = `BASELINE (${latest.year} OFFICIAL)`;
      deltaBadge.className = "status-pill";
    } else if (netDelta > 0) {
      deltaBadge.textContent = `+${netDelta}s SAFER THAN ${latest.year} BASELINE`;
      deltaBadge.className = "status-pill status-safe";
    } else if (netDelta < 0) {
      deltaBadge.textContent = `${netDelta}s CLOSER TO MIDNIGHT`;
      deltaBadge.className = "status-pill status-critical";
    } else {
      deltaBadge.textContent = `NET ZERO CHANGE FROM ${latest.shortLabel.toUpperCase()}`;
      deltaBadge.className = "status-pill status-high";
    }
  }

  if (ghostHand) {
    if (activeCount === 0) {
      ghostHand.classList.add("hidden");
    } else {
      ghostHand.classList.remove("hidden");
      const ghostAngle = -((simSeconds / 60) * 6);
      ghostHand.setAttribute("transform", `rotate(${ghostAngle.toFixed(2)} 210 210)`);
    }
  }
}

// 11. History Playback & UI Event Bindings
function stopHistoryPlayback() {
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
  const playBtn = document.getElementById("play-history-btn");
  if (playBtn) {
    const latestYear = TIMELINE_DATA[TIMELINE_DATA.length - 1].year;
    playBtn.textContent = `▶ Play 1947→${latestYear}`;
  }
}

function bindEventListeners() {
  const scrubber = document.getElementById("year-scrubber");
  if (scrubber) {
    scrubber.addEventListener("input", (e) => {
      stopHistoryPlayback();
      renderActiveYear(Number(e.target.value));
    });
  }

  const playBtn = document.getElementById("play-history-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (playInterval) {
        stopHistoryPlayback();
        return;
      }
      playBtn.textContent = "⏸ Pause Playback";
      let idx = currentYearIndex === TIMELINE_DATA.length - 1 ? 0 : currentYearIndex;
      renderActiveYear(idx);
      playInterval = setInterval(() => {
        idx++;
        if (idx >= TIMELINE_DATA.length) {
          stopHistoryPlayback();
          return;
        }
        renderActiveYear(idx);
      }, 1150);
    });
  }

  const reset2026Btn = document.getElementById("reset-2026-btn");
  if (reset2026Btn) {
    reset2026Btn.addEventListener("click", () => {
      stopHistoryPlayback();
      renderActiveYear(TIMELINE_DATA.length - 1);
    });
  }

  const fullBtn = document.getElementById("view-full-btn");
  const quadBtn = document.getElementById("view-quadrant-btn");
  const svg = document.getElementById("doomsday-svg");

  if (fullBtn && quadBtn && svg) {
    fullBtn.addEventListener("click", () => {
      fullBtn.classList.add("active");
      quadBtn.classList.remove("active");
      svg.setAttribute("viewBox", "0 0 420 420");
    });
    quadBtn.addEventListener("click", () => {
      quadBtn.classList.add("active");
      fullBtn.classList.remove("active");
      svg.setAttribute("viewBox", "20 20 225 225");
    });
  }

  const soundBtn = document.getElementById("sound-toggle");
  if (soundBtn) {
    soundBtn.addEventListener("click", toggleSoundPulse);
  }

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeNewsCategory = pill.dataset.category || "all";
      fetchLiveIntelligence(activeNewsCategory, false);
    });
  });

  document.querySelectorAll("[data-filter-trigger]").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.getAttribute("data-filter-trigger");
      if (!cat) return;
      document.querySelectorAll(".filter-pill").forEach((p) => {
        p.classList.toggle("active", p.dataset.category === cat);
      });
      fetchLiveIntelligence(cat, false);
    });
  });

  const searchForm = document.getElementById("custom-news-form");
  const searchInput = document.getElementById("custom-news-input");
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (q) {
        fetchLiveIntelligence(q, true);
      }
    });
  }

  document.getElementById("refresh-feed-btn")?.addEventListener("click", () => {
    fetchLiveIntelligence(activeNewsCategory, false);
  });
  document.getElementById("refresh-sensors-btn")?.addEventListener("click", () => {
    fetchPlanetarySensors();
  });

  document.querySelectorAll(".tl-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tl-filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const searchInput = document.getElementById("timeline-search-input");
      renderTimelineCards(btn.dataset.tlFilter || "all", searchInput ? searchInput.value : "");
    });
  });

  document.getElementById("sim-reset-btn")?.addEventListener("click", () => {
    document.querySelectorAll(".sim-checkbox").forEach((cb) => {
      cb.checked = false;
    });
    updateSimulatorCalculation();
  });

  document.getElementById("sync-clock-btn")?.addEventListener("click", () => {
    syncOfficialClockReading(true);
  });
}
