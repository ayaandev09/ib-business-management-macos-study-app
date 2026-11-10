import {
  ConceptDefinition,
  BMTToolDossier,
  TheoristProfile,
  FormulaItem,
  GlossaryTerm,
  ConceptId,
} from "./types";

export const CONCEPTS_TAXONOMY: Record<ConceptId, ConceptDefinition> = {
  creativity: {
    id: "creativity",
    name: "Creativity",
    shortName: "CREA",
    color: "#a855f7",
    badgeBg: "bg-purple-500/15",
    badgeBorder: "border-purple-400/35",
    badgeText: "text-purple-300",
    glowColor: "rgba(168, 85, 247, 0.4)",
    description:
      "The process of generating novel ideas and transforming them into value-creating business practices, products, processes, or disruptive market models.",
    coreMechanism:
      "Drives competitive advantage through product differentiation, lean process engineering, marketing innovation, and R&D breakthrough.",
    examTips:
      "In Paper 1 / Paper 2 Section C: link creativity to intellectual property, adaptive vs innovative R&D, and the risk of competitor mimicry.",
  },
  change: {
    id: "change",
    name: "Change",
    shortName: "CHNG",
    color: "#0ea5e9",
    badgeBg: "bg-sky-500/15",
    badgeBorder: "border-sky-400/35",
    badgeText: "text-sky-300",
    glowColor: "rgba(14, 165, 233, 0.4)",
    description:
      "The continuous adaptation of business strategies, internal structures, and operations in response to dynamic internal tensions and STEEPLE external shifts.",
    coreMechanism:
      "Requires strategic leadership, change management models (Kotter & Schlesinger, Lewin Force-Field), and agile organizational restructuring.",
    examTips:
      "Evaluate driving vs restraining forces; address employee resistance to change and the time lag between strategic decisions and operational results.",
  },
  ethics: {
    id: "ethics",
    name: "Ethics",
    shortName: "ETHC",
    color: "#10b981",
    badgeBg: "bg-emerald-500/15",
    badgeBorder: "border-emerald-400/35",
    badgeText: "text-emerald-300",
    glowColor: "rgba(16, 185, 129, 0.4)",
    description:
      "The moral guidelines and values governing organizational conduct, stakeholder treatment, transparency, and Corporate Social Responsibility (CSR).",
    coreMechanism:
      "Balances short-term shareholder profit maximisation against long-term societal welfare, fair labor standards, and authentic stakeholder governance.",
    examTips:
      "Contrast compliance vs genuine CSR; critique greenwashing and explore stakeholder conflicts (e.g. higher worker wages vs lower shareholder dividends).",
  },
  sustainability: {
    id: "sustainability",
    name: "Sustainability",
    shortName: "SUST",
    color: "#f59e0b",
    badgeBg: "bg-amber-500/15",
    badgeBorder: "border-amber-400/35",
    badgeText: "text-amber-300",
    glowColor: "rgba(245, 158, 11, 0.4)",
    description:
      "Meeting the needs of current generations without compromising the economic, ecological, and social viability for future generations.",
    coreMechanism:
      "Implemented through Circular Economy models, Cradle-to-Cradle (C2C) closed loops, renewable supply chains, and prudent cash/capital preservation.",
    examTips:
      "Assess the trade-off between upfront capital expenditure for sustainable tech vs long-term operational cost reduction and brand equity.",
  },
};

export const BMT_TOOLS_CATALOGUE: BMTToolDossier[] = [
  {
    id: "bmt-1",
    number: 1,
    name: "SWOT Analysis",
    category: "Strategic Planning",
    hlOnly: false,
    description:
      "A 2x2 analytical framework evaluating internal Strengths & Weaknesses against external Opportunities & Threats.",
    quadrantOrSteps: [
      { label: "Strengths (Internal)", detail: "Proprietary tech, brand equity, skilled labour, healthy liquidity." },
      { label: "Weaknesses (Internal)", detail: "High gearing, obsolete machinery, narrow product portfolio, poor culture." },
      { label: "Opportunities (External)", detail: "Emerging overseas markets, favorable exchange rates, AI automation." },
      { label: "Threats (External)", detail: "New market entrants, regulatory tightening, raw material inflation, STEEPLE shocks." },
    ],
    evaluationStrengths: [
      "Provides rapid visual synthesis of internal vs external reality.",
      "Facilitates proactive strategy formulation (SO, ST, WO, WT strategies).",
    ],
    evaluationLimitations: [
      "Static snapshot that rapidly becomes outdated in volatile markets.",
      "Subjective and vulnerable to management confirmation bias without quantitative weighting.",
    ],
    examTips: "Do not just list bullet points; always pair internal strengths with external opportunities to evaluate actionable strategic moves.",
    realWorldExample: "Apple leverages internal brand equity & cash reserves (S) to capture growing demand for healthcare wearables (O).",
  },
  {
    id: "bmt-2",
    number: 2,
    name: "Ansoff Matrix",
    category: "Growth & Marketing Strategy",
    hlOnly: false,
    description:
      "A strategic growth decision model categorizing corporate expansion along Market (Existing vs New) and Product (Existing vs New) dimensions.",
    quadrantOrSteps: [
      { label: "Market Penetration (Low Risk)", detail: "Existing Products in Existing Markets: Loyalty programs, competitive pricing, increased promotion." },
      { label: "Product Development (Moderate Risk)", detail: "New Products in Existing Markets: Brand extensions, R&D improvements, complementary goods." },
      { label: "Market Development (Moderate Risk)", detail: "Existing Products in New Markets: International expansion, new target demographic, new distribution channels." },
      { label: "Diversification (High Risk)", detail: "New Products in New Markets: Related or conglomerate expansion; requires new capabilities and market intelligence." },
    ],
    evaluationStrengths: [
      "Explicitly outlines the relative risk profiles of four distinct strategic growth pathways.",
      "Aligns corporate R&D investment directly with market positioning.",
    ],
    evaluationLimitations: [
      "Oversimplifies complex global markets into a rigid 2x2 grid.",
      "Fails to account for competitive counter-strikes and operational integration hurdles.",
    ],
    examTips: "In 10-mark evaluation questions, contrast lower-risk Market Penetration against high-return Diversification using risk vs return criteria.",
    realWorldExample: "Coca-Cola: Diet Coke (Product Dev), entering emerging African markets (Market Dev), acquiring Costa Coffee (Diversification).",
  },
  {
    id: "bmt-3",
    number: 3,
    name: "STEEPLE Analysis",
    category: "External Macro-Environment",
    hlOnly: false,
    description:
      "A macroeconomic framework surveying seven external macro-environmental influences impacting organizational decision-making.",
    quadrantOrSteps: [
      { label: "Social & Cultural", detail: "Demographics, consumer lifestyle shifts, ageing populations, work-life balance expectations." },
      { label: "Technological", detail: "Automation, e-commerce, cloud infrastructure, AI adoption, cyber vulnerabilities." },
      { label: "Economic", detail: "Interest rates, exchange rate fluctuations, inflation, unemployment, GDP growth cycles." },
      { label: "Environmental", detail: "Carbon emission quotas, extreme weather risks, resource depletion, circularity mandates." },
      { label: "Political", detail: "Government stability, trade tariffs, fiscal subsidies, geopolitical conflicts." },
      { label: "Legal", detail: "Minimum wage legislation, health & safety statutes, anti-monopoly laws, consumer protection." },
      { label: "Ethical", detail: "Fair Trade certification, executive pay transparency, supply chain human rights." },
    ],
    evaluationStrengths: [
      "Comprehensive panoramic audit that prevents strategic blind spots.",
      "Crucial for risk forecasting before international market entry.",
    ],
    evaluationLimitations: [
      "Information overload; does not rank or prioritise which external forces are most urgent.",
      "Factors are entirely outside organizational control and fluctuate unpredictably.",
    ],
    examTips: "Always identify the single most critical STEEPLE variable driving the case study scenario rather than summarizing all 7 superficially.",
    realWorldExample: "Tesla's European Gigafactory expansion navigating German environmental regulations (E) and EU EV subsidies (P/L).",
  },
  {
    id: "bmt-4",
    number: 4,
    name: "BCG Matrix (Boston Consulting Group)",
    category: "Product Portfolio Management",
    hlOnly: false,
    description:
      "A product portfolio analysis tool evaluating strategic business units across Market Share (Relative) and Market Growth Rate.",
    quadrantOrSteps: [
      { label: "Stars (High Growth, High Share)", detail: "Market leaders requiring high capital reinvestment to defend market dominance against fast competitors." },
      { label: "Cash Cows (Low Growth, High Share)", detail: "Mature, highly profitable cash generators requiring minimal investment; surplus profits fund Stars and Question Marks." },
      { label: "Question Marks / Problem Children (High Growth, Low Share)", detail: "Uncertain bets; require massive capital injection to build market share or face divestment/harvesting." },
      { label: "Dogs (Low Growth, Low Share)", detail: "Stagnant products generating low profit or losses; candidates for divestment, rationalisation, or deletion." },
    ],
    evaluationStrengths: [
      "Allows multi-product conglomerates to balance internal cash flow cycles effectively.",
      "Guides clear capital allocation across product life cycles.",
    ],
    evaluationLimitations: [
      "Assumes market share is the sole driver of profitability (ignores margin differentiation).",
      "Defining what constitutes high vs low growth is arbitrary and relative.",
    ],
    examTips: "Always link BCG quadrants to the Product Life Cycle (Question Mark = Introduction, Star = Growth, Cash Cow = Maturity, Dog = Decline).",
    realWorldExample: "Apple: iPhone is a Cash Cow generating cash for Apple Vision Pro / AI Services (Question Marks/Stars).",
  },
  {
    id: "bmt-5",
    number: 5,
    name: "Business Planning",
    category: "Strategic Foundation",
    hlOnly: false,
    description:
      "A structured formal document detailing corporate objectives, marketing plans, operations, human resources, and financial forecasts.",
    quadrantOrSteps: [
      { label: "Executive Summary", detail: "High-level overview of core business proposition, value proposition, and financing requirements." },
      { label: "Marketing & Operational Plan", detail: "7 Ps marketing mix, target segments, production methods, supply chain, location." },
      { label: "Human Resources Plan", detail: "Organizational chart, staffing requirements, remuneration strategy, training protocols." },
      { label: "Financial Forecasts", detail: "Projected cash flow statement, break-even analysis, profit & loss, balance sheet, capital budget." },
    ],
    evaluationStrengths: [
      "Essential prerequisite for securing external financing from banks, venture capital, and business angels.",
      "Provides internal benchmark metrics to track milestone variance and performance.",
    ],
    evaluationLimitations: [
      "Extremely time-consuming; static forecasts quickly fail in unpredictable macroeconomic conditions.",
      "May produce managerial overconfidence if based on optimistic sales projections.",
    ],
    examTips: "Highlight that a business plan is a dynamic living roadmap, not a guaranteed prophecy of financial success.",
    realWorldExample: "Startup securing seed venture funding by demonstrating 3-year cash flow runway and unit economics in its business plan.",
  },
  {
    id: "bmt-6",
    number: 6,
    name: "Decision Trees",
    category: "Quantitative Decision Making",
    hlOnly: false,
    description:
      "A quantitative decision-making diagram mapping choices, probability-weighted outcomes, Expected Monetary Values (EMV), and Net Gains.",
    quadrantOrSteps: [
      { label: "Decision Nodes (Squares)", detail: "Points where management must choose between competing strategic options." },
      { label: "Chance Nodes (Circles)", detail: "Points where uncertain external events occur with associated probabilities (summing to 1.0)." },
      { label: "Expected Monetary Value (EMV)", detail: "Calculated as: Σ (Outcome Payoff × Probability of Outcome)." },
      { label: "Net Gain", detail: "Calculated as: EMV minus Initial Investment Cost of the option." },
    ],
    evaluationStrengths: [
      "Forces management to assign rigorous quantitative estimates to risk and payoff scenarios.",
      "Provides clear visual comparison of financial net gains across multiple pathways.",
    ],
    evaluationLimitations: [
      "Probabilities and estimated payoffs are subjective forecasts prone to optimism bias.",
      "Ignores qualitative factors (ethical ramifications, brand reputation, employee morale).",
    ],
    examTips: "Always show all working for EMV and Net Gain. Remember to prune the inferior branch with a double slash (//)!",
    realWorldExample: "Pharmaceutical company choosing whether to invest $50M in clinical trials: 0.7 probability of $120M payoff, 0.3 probability of $0.",
  },
  {
    id: "bmt-7",
    number: 7,
    name: "Descriptive Statistics",
    category: "Quantitative Analysis",
    hlOnly: false,
    description:
      "Statistical techniques to summarise, organize, and interpret numerical business datasets (Mean, Median, Mode, Range, Standard Deviation).",
    quadrantOrSteps: [
      { label: "Measures of Central Tendency", detail: "Mean (arithmetic average), Median (middle value robust to outliers), Mode (most frequent value)." },
      { label: "Measures of Dispersion", detail: "Range (Max - Min), Interquartile Range (IQR = Q3 - Q1), Standard Deviation (measure of variance around mean)." },
      { label: "Data Visualization", detail: "Bar charts, histograms, pie charts, scatterplots, box-and-whisker plots." },
      { label: "Critical Evaluation", detail: "Detecting skewed distributions, sample size biases, and misleading graphical axes." },
    ],
    evaluationStrengths: [
      "Transforms overwhelming raw market datasets into actionable management metrics.",
      "Enables rigorous quality control tracking (defect rates, cycle times).",
    ],
    evaluationLimitations: [
      "Can easily conceal critical variations or extreme outliers when using mean alone.",
      "Vulnerable to intentional visual manipulation (distorted Y-axis scaling).",
    ],
    examTips: "State why the median is superior to the mean when executive salaries or real estate prices are heavily right-skewed by extreme outliers.",
    realWorldExample: "Analyzing customer satisfaction scores across 50 retail branches to target underperforming outlets.",
  },
  {
    id: "bmt-8",
    number: 8,
    name: "Circular Business Models (CBM)",
    category: "Operations & Sustainability",
    hlOnly: false,
    description:
      "A sustainable economic model replacing linear 'take-make-waste' systems with regenerative, closed-loop resource cycles.",
    quadrantOrSteps: [
      { label: "Biological Cycle", detail: "Non-toxic biodegradable materials that can safely return to the biosphere after cascading use." },
      { label: "Technical Cycle", detail: "Inorganic materials (metals, polymers) designed for recovery, refurbishment, remanufacture, and continuous recycling." },
      { label: "The 7R Hierarchy", detail: "Rethink, Reduce, Reuse, Repair, Refurbish, Remanufacture, Recycle." },
      { label: "Product-as-a-Service (PaaS)", detail: "Retaining ownership of hardware while leasing continuous performance or utility to clients." },
    ],
    evaluationStrengths: [
      "Shields business against raw material resource scarcity and commodity price spikes.",
      "Builds formidable brand equity among environmentally conscious consumers.",
    ],
    evaluationLimitations: [
      "High upfront redesign and reverse-logistics infrastructure expenditure.",
      "Requires consumer behavioral cooperation in product return systems.",
    ],
    examTips: "Link CBM directly to Cradle-to-Cradle (C2C) certification in Unit 5.3 and evaluate whether short-term costs impede cash flow.",
    realWorldExample: "Patagonia's Worn Wear repair program and Philips 'Pay-per-Lux' lighting model.",
  },
  {
    id: "bmt-9",
    number: 9,
    name: "Gantt Charts (HL)",
    category: "Project Management",
    hlOnly: true,
    description:
      "A horizontal bar chart visualising project schedule schedules, task dependencies, milestone deadlines, and resource allocation across time.",
    quadrantOrSteps: [
      { label: "Task Decomposition", detail: "Breaking complex business projects down into individual operational activities with estimated durations." },
      { label: "Precedence & Dependencies", detail: "Identifying sequential tasks (predecessors) vs concurrent activities that run simultaneously." },
      { label: "Milestones", detail: "Key delivery dates and checkpoints marked along the horizontal chronological timeline." },
      { label: "Tracking Progress", detail: "Shading completed task bars to immediately spot project delays and bottlenecks." },
    ],
    evaluationStrengths: [
      "Exceptional visual tool for cross-functional team coordination during complex operations.",
      "Prevents scheduling conflicts and identifies idle resource bottlenecks.",
    ],
    evaluationLimitations: [
      "Does not calculate critical path float times mathematically like CPA does.",
      "Must be constantly updated when task durations slip in dynamic environments.",
    ],
    examTips: "Differentiate between dependent serial tasks and concurrent parallel tasks when analyzing project delay scenarios.",
    realWorldExample: "Boeing or Airbus scheduling thousands of supplier assembly sub-phases for commercial aircraft manufacturing.",
  },
  {
    id: "bmt-10",
    number: 10,
    name: "Porter's Generic Strategies (HL)",
    category: "Competitive Strategy",
    hlOnly: true,
    description:
      "Michael Porter's framework outlining how a firm can achieve superior competitive advantage through Strategic Scope and Strategic Advantage.",
    quadrantOrSteps: [
      { label: "Cost Leadership (Broad Scope)", detail: "Lowest operational cost producer in industry via massive economies of scale and automation (e.g. Walmart, Ryanair)." },
      { label: "Differentiation (Broad Scope)", detail: "Unique, premium-value offerings justifying price premiums via innovation and brand prestige (e.g. Apple, Nike)." },
      { label: "Cost Focus (Narrow Scope)", detail: "Low-cost advantage targeted exclusively at a distinct niche market segment." },
      { label: "Differentiation Focus (Narrow Scope)", detail: "Highly customized premium products tailored to an exclusive luxury or specialist niche (e.g. Ferrari, Rolls-Royce)." },
    ],
    evaluationStrengths: [
      "Guides clear strategic focus and warns against dangerous strategic ambiguity.",
      "Highlights the grave risk of getting 'Stuck in the Middle' without cost or differentiation edge.",
    ],
    evaluationLimitations: [
      "In modern tech industries, hybrid models (e.g. Amazon, IKEA) successfully deliver both low cost and differentiation.",
      "Dynamic markets allow nimble competitors to copy differentiation features rapidly.",
    ],
    examTips: "Warn against being 'Stuck in the Middle' where a company has neither the low costs to beat discounters nor the prestige to charge premiums.",
    realWorldExample: "Ryanair pursues relentless Cost Leadership while Singapore Airlines delivers premium Differentiation.",
  },
  {
    id: "bmt-11",
    number: 11,
    name: "Hofstede's Cultural Dimensions (HL)",
    category: "Organizational Culture & International Business",
    hlOnly: true,
    description:
      "A framework identifying six national cultural dimensions that influence international management, communication, and leadership behavior.",
    quadrantOrSteps: [
      { label: "Power Distance Index (PDI)", detail: "Degree of inequality accepted between subordinates and hierarchical leaders." },
      { label: "Individualism vs Collectivism (IDV)", detail: "Preference for loose individual autonomy vs cohesive, loyal group interdependence." },
      { label: "Masculinity vs Femininity (MAS)", detail: "Drive for assertiveness, achievement and competition vs consensus, care and quality of life." },
      { label: "Uncertainty Avoidance Index (UAI)", detail: "Tolerance for ambiguity and unstructured situations vs strict formal rules and procedures." },
      { label: "Long-Term vs Short-Term Orientation (LTO)", detail: "Focus on future perseverance, thrift and adaptation vs short-term tradition and immediate results." },
      { label: "Indulgence vs Restraint (IVR)", detail: "Societal gratification of human desires vs strict societal norms and self-regulation." },
    ],
    evaluationStrengths: [
      "Invaluable for multinational companies managing cross-border mergers and foreign direct investment.",
      "Reduces ethnocentric management blunders in international marketing campaigns.",
    ],
    evaluationLimitations: [
      "Prone to national stereotyping; ignores regional, generational, and corporate sub-cultural diversity.",
      "Original IBM research sample was culturally biased towards corporate tech employees.",
    ],
    examTips: "Use Hofstede when evaluating why an MNC's standardized HR motivation policy failed in a host country with divergent cultural dimensions.",
    realWorldExample: "Walmart's failed expansion into Germany caused by cultural mismatches with German labor expectations and retail etiquette.",
  },
  {
    id: "bmt-12",
    number: 12,
    name: "Force Field Analysis (HL)",
    category: "Change Management",
    hlOnly: true,
    description:
      "Kurt Lewin's decision model analyzing the balance of power between Driving Forces (pushing for change) and Restraining Forces (resisting change).",
    quadrantOrSteps: [
      { label: "Current Equilibrium", detail: "The existing organizational status quo maintained by opposing forces of equal magnitude." },
      { label: "Driving Forces", detail: "Factors pushing towards change: STEEPLE pressures, falling profits, new leadership, technological obsolescence." },
      { label: "Restraining Forces", detail: "Factors resisting change: Fear of unknown, inertia, sunk costs, trade union resistance, lack of skills." },
      { label: "Score & Strategic Action", detail: "Forces are numerically weighted (1-5); strategy involves strengthening driving forces while mitigating restraining forces." },
    ],
    evaluationStrengths: [
      "Visualises why change initiatives stall and provides concrete targets for resistance mitigation.",
      "Encourages stakeholder consultation to convert opponents into change agents.",
    ],
    evaluationLimitations: [
      "Numerical weighting of forces is subjective and prone to confirmation bias.",
      "Pushing driving forces too aggressively can trigger even fiercer counter-resistance from staff.",
    ],
    examTips: "Remember Lewin's three-step change model: Unfreeze ➔ Change ➔ Refreeze. Reducing restraining forces is safer than forcing driving forces.",
    realWorldExample: "Traditional automaker transitioning to electric vehicles weighting engineering momentum against factory retooling costs and dealer resistance.",
  },
  {
    id: "bmt-13",
    number: 13,
    name: "Critical Path Analysis - CPA (HL)",
    category: "Project & Operations Planning",
    hlOnly: true,
    description:
      "A mathematical network scheduling tool identifying the sequential chain of critical activities that dictates the shortest possible project completion time.",
    quadrantOrSteps: [
      { label: "Activity Networks", detail: "Nodes represent events; arrows indicate task duration and chronological dependencies." },
      { label: "Earliest Start Time (EST)", detail: "Calculated via Forward Pass: EST = highest (prior EST + duration) of incoming paths." },
      { label: "Latest Finish Time (LFT)", detail: "Calculated via Backward Pass: LFT = lowest (subsequent LFT - duration) of outgoing paths." },
      { label: "Critical Path & Float Time", detail: "Critical activities have EST = LFT (Zero Float). Total Float = LFT - Duration - EST." },
    ],
    evaluationStrengths: [
      "Pinpoints activities where zero delays can be tolerated, enabling laser-focused managerial control.",
      "Identifies non-critical tasks with float time where resources can be temporarily reallocated.",
    ],
    evaluationLimitations: [
      "Requires accurate time forecasts; supply chain disruptions or bad weather invalidate network timings.",
      "Managing complex networks with hundreds of dependencies requires software, not manual diagrams.",
    ],
    examTips: "Always show EST and LFT in each node box. Remember: any delay on the Critical Path automatically delays the entire project!",
    realWorldExample: "Construction of a new hotel resort where concrete foundation curing has zero float while interior furniture delivery has 14 days float.",
  },
  {
    id: "bmt-14",
    number: 14,
    name: "Contribution Analysis",
    category: "Management Accounting",
    hlOnly: false,
    description:
      "Financial calculation of revenue remaining after deducting variable costs, which contributes towards covering fixed costs and generating profit.",
    quadrantOrSteps: [
      { label: "Unit Contribution", detail: "Price per unit minus Variable Cost per unit (P - VC)." },
      { label: "Total Contribution", detail: "Unit Contribution × Quantity Sold, or Total Revenue minus Total Variable Costs." },
      { label: "Profit Determination", detail: "Profit = Total Contribution minus Total Fixed Costs." },
      { label: "Special Order Decisions", detail: "A special order at a discount is acceptable if Price > Variable Cost and spare capacity exists." },
    ],
    evaluationStrengths: [
      "Crucial for product portfolio decisions (identifying which products cover fixed overheads).",
      "Forms the mathematical engine for break-even calculations and margin of safety.",
    ],
    evaluationLimitations: [
      "Assumes fixed costs remain constant across all production levels (ignores step-fixed costs).",
      "Special orders at low contribution may cannibalize normal sales or destroy brand equity.",
    ],
    examTips: "Never confuse Contribution with Profit! Contribution must first cover Fixed Costs before any Profit is realized.",
    realWorldExample: "Airline filling empty standby seats for $150 when variable cost of fuel/food is $40: positive contribution of $110 towards aircraft lease.",
  },
  {
    id: "bmt-15",
    number: 15,
    name: "Simple Linear Regression (HL)",
    category: "Quantitative Forecasting",
    hlOnly: true,
    description:
      "A statistical forecasting technique modeling the linear relationship between an independent explanatory variable (x) and dependent variable (y).",
    quadrantOrSteps: [
      { label: "Scatter Diagram", detail: "Plotting paired historical data points to identify underlying correlation patterns." },
      { label: "Line of Best Fit (Trendline)", detail: "Drawn mathematically ($y = mx + c$) minimising the sum of squared residuals." },
      { label: "Correlation Coefficient (r)", detail: "Measures strength and direction of linear relationship (-1.0 to +1.0)." },
      { label: "Interpolation vs Extrapolation", detail: "Interpolation (predicting within data range: reliable); Extrapolation (predicting into future: risky)." },
    ],
    evaluationStrengths: [
      "Provides objective mathematical basis for demand forecasting, marketing budgeting, and revenue modeling.",
      "Reveals whether advertising expenditure actually correlates with sales growth.",
    ],
    evaluationLimitations: [
      "Assumes past historical patterns will persist identically into the future.",
      "Cannot account for sudden external STEEPLE shocks or non-linear market saturation.",
    ],
    examTips: "State clearly that correlation does NOT imply causation! Highlight the danger of long-term extrapolation.",
    realWorldExample: "Fast-food chain forecasting ice cream unit sales against ambient summer temperature forecasts.",
  },
];

export const FORMULA_BANK: FormulaItem[] = [
  {
    id: "f-gpm",
    code: "GPM",
    name: "Gross Profit Margin",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{GPM} = \\left( \\frac{\\text{Gross Profit}}{\\text{Sales Revenue}} \\right) \\times 100",
    variables: [
      { name: "Gross Profit", definition: "Sales Revenue minus Cost of Goods Sold (COGS)." },
      { name: "Sales Revenue", definition: "Total cash and credit sales generated from core operations." },
    ],
    benchmarkGuidance: "High benchmark (40%-60%+ in luxury/tech); lower in grocery retail (15%-25%).",
    evaluationInterpretation:
      "Measures efficiency of direct production and sourcing. Can be improved by raising prices or reducing direct material/labor costs.",
    workedExample: "Revenue = $500,000, COGS = $300,000. Gross Profit = $200,000. GPM = (200,000 / 500,000) * 100 = 40.0%.",
  },
  {
    id: "f-npm",
    code: "NPM",
    name: "Net Profit Margin",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{NPM} = \\left( \\frac{\\text{Net Profit Before Interest and Tax}}{\\text{Sales Revenue}} \\right) \\times 100",
    variables: [
      { name: "Net Profit (Operating)", definition: "Gross Profit minus all indirect operating expenses (overheads)." },
      { name: "Sales Revenue", definition: "Total turnover." },
    ],
    benchmarkGuidance: "Healthy range typically 10%-20%. Above 20% indicates superior overhead cost control.",
    evaluationInterpretation:
      "Measures overall operational profitability after overhead expenses (rent, admin, marketing). A declining NPM alongside stable GPM signals ballooning overheads.",
    workedExample: "Gross Profit = $200,000, Overheads = $125,000. Net Profit = $75,000. NPM = (75,000 / 500,000) * 100 = 15.0%.",
  },
  {
    id: "f-roce",
    code: "ROCE",
    name: "Return on Capital Employed",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{ROCE} = \\left( \\frac{\\text{Net Profit Before Interest and Tax}}{\\text{Capital Employed}} \\right) \\times 100",
    variables: [
      { name: "Net Profit (Operating)", definition: "Earnings before interest and tax (EBIT)." },
      { name: "Capital Employed", definition: "Equity + Non-Current Liabilities (or Total Assets - Current Liabilities)." },
    ],
    benchmarkGuidance: "Must exceed prevailing bank interest rates and corporate cost of capital (benchmark > 12%-15%).",
    evaluationInterpretation:
      "The premier efficiency metric: tells investors how effectively management converts invested long-term capital into operating profit.",
    workedExample: "Net Profit = $75,000. Equity = $300,000, Long-term Debt = $100,000 (Capital Employed = $400,000). ROCE = (75,000 / 400,000) * 100 = 18.75%.",
  },
  {
    id: "f-cr",
    code: "CR",
    name: "Current Ratio",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}}",
    variables: [
      { name: "Current Assets", definition: "Cash + Debtors (Accounts Receivable) + Stock (Inventory)." },
      { name: "Current Liabilities", definition: "Creditors (Accounts Payable) + Short-term loans / overdrafts due within 12 months." },
    ],
    benchmarkGuidance: "Target standard: 1.5 : 1 to 2.0 : 1.",
    evaluationInterpretation:
      "Tests short-term liquidity. Below 1.0 indicates working capital deficit; above 2.5 suggests inefficient cash hoarding or dead inventory.",
    workedExample: "Current Assets = $180,000, Current Liabilities = $100,000. Current Ratio = 1.8 : 1 (Prudent liquidity).",
  },
  {
    id: "f-atr",
    code: "ATR",
    name: "Acid Test (Quick) Ratio",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{Acid Test Ratio} = \\frac{\\text{Current Assets} - \\text{Stock (Inventory)}}{\\text{Current Liabilities}}",
    variables: [
      { name: "Current Assets less Stock", definition: "Liquid cash and short-term accounts receivable only." },
      { name: "Current Liabilities", definition: "Short-term obligations." },
    ],
    benchmarkGuidance: "Target standard: 1.0 : 1.",
    evaluationInterpretation:
      "Stricter liquidity test excluding inventory, which cannot be quickly converted into cash without steep price discounting.",
    workedExample: "Cash ($40k) + Debtors ($60k) = $100,000. Current Liabilities = $100,000. Acid Test Ratio = 1.0 : 1.",
  },
  {
    id: "f-gearing",
    code: "GEAR",
    name: "Gearing Ratio (HL)",
    unit: "Unit 3 – Finance",
    hlOnly: true,
    formula: "\\text{Gearing Ratio} = \\left( \\frac{\\text{Loan Capital (Long-Term Liabilities)}}{\\text{Capital Employed}} \\right) \\times 100",
    variables: [
      { name: "Loan Capital", definition: "Bank loans, debentures, mortgages (interest-bearing debt)." },
      { name: "Capital Employed", definition: "Total Equity + Loan Capital." },
    ],
    benchmarkGuidance: "Safe: < 50%. Highly geared: > 50% (vulnerable to rising interest rates).",
    evaluationInterpretation:
      "Measures long-term financial leverage and solvency risk. Highly geared firms carry heavy fixed interest burdens during economic recessions.",
    workedExample: "Long-term Debt = $250,000, Total Capital Employed = $500,000. Gearing = (250,000 / 500,000) * 100 = 50.0%.",
  },
  {
    id: "f-debtor-days",
    code: "DD",
    name: "Debtor Days Ratio (HL)",
    unit: "Unit 3 – Finance",
    hlOnly: true,
    formula: "\\text{Debtor Days} = \\left( \\frac{\\text{Debtors (Accounts Receivable)}}{\\text{Total Sales Revenue}} \\right) \\times 365",
    variables: [
      { name: "Debtors", definition: "Amounts owed to the business by credit customers." },
      { name: "Total Sales Revenue", definition: "Total annual sales (or credit sales)." },
    ],
    benchmarkGuidance: "Target standard: 30 to 60 days.",
    evaluationInterpretation:
      "Measures the average number of days taken to collect cash from credit customers. High debtor days signal poor credit control and cash flow strain.",
    workedExample: "Debtors = $30,000, Annual Revenue = $365,000. Debtor Days = (30,000 / 365,000) * 365 = 30 days.",
  },
  {
    id: "f-creditor-days",
    code: "CD",
    name: "Creditor Days Ratio (HL)",
    unit: "Unit 3 – Finance",
    hlOnly: true,
    formula: "\\text{Creditor Days} = \\left( \\frac{\\text{Creditors (Accounts Payable)}}{\\text{Cost of Goods Sold (COGS)}} \\right) \\times 365",
    variables: [
      { name: "Creditors", definition: "Amounts owed to suppliers for trade purchases on credit." },
      { name: "Cost of Goods Sold", definition: "Annual direct production costs." },
    ],
    benchmarkGuidance: "Target: 45 to 60 days (ideally longer than debtor days to maintain free working capital).",
    evaluationInterpretation:
      "Measures how long the business takes to pay its suppliers. Extending creditor days boosts short-term liquidity but risks supplier goodwill and discounts.",
    workedExample: "Creditors = $40,000, COGS = $240,000. Creditor Days = (40,000 / 240,000) * 365 = 60.8 days.",
  },
  {
    id: "f-inventory-turnover",
    code: "ITO",
    name: "Inventory Turnover Ratio (HL)",
    unit: "Unit 3 – Finance",
    hlOnly: true,
    formula: "\\text{Inventory Turnover} = \\frac{\\text{Cost of Goods Sold (COGS)}}{\\text{Average Inventory}}",
    variables: [
      { name: "Cost of Goods Sold", definition: "Total direct inventory consumption." },
      { name: "Average Inventory", definition: "(Opening Stock + Closing Stock) / 2." },
    ],
    benchmarkGuidance: "Higher is better; fast fashion/grocery = 10x-20x+; heavy manufacturing = 3x-6x.",
    evaluationInterpretation:
      "Measures how many times inventory is sold and replenished per annum. Low turnover signals obsolete stock, storage waste, and locked-up cash.",
    workedExample: "COGS = $200,000, Average Stock = $25,000. Inventory Turnover = 200,000 / 25,000 = 8.0 times/year (or 45.6 days).",
  },
  {
    id: "f-break-even",
    code: "BEQ",
    name: "Break-Even Quantity",
    unit: "Unit 5 – Operations",
    hlOnly: false,
    formula: "\\text{BEQ} = \\frac{\\text{Fixed Costs}}{\\text{Price} - \\text{Variable Cost per Unit}} = \\frac{\\text{Fixed Costs}}{\\text{Contribution per Unit}}",
    variables: [
      { name: "Fixed Costs", definition: "Expenses that do not change with output level (rent, admin, insurance)." },
      { name: "Contribution per Unit", definition: "Selling Price (P) minus Variable Cost per unit (VC)." },
    ],
    benchmarkGuidance: "Firms strive to keep BEQ well below forecast sales capacity.",
    evaluationInterpretation:
      "The exact level of output where Total Revenue equals Total Costs (Profit = $0). Margin of Safety = Current Output - BEQ.",
    workedExample: "Fixed Costs = $60,000, Price = $50, Variable Cost = $20. Contribution = $30. BEQ = 60,000 / 30 = 2,000 units.",
  },
  {
    id: "f-target-profit",
    code: "TPO",
    name: "Target Profit Output",
    unit: "Unit 5 – Operations",
    hlOnly: false,
    formula: "\\text{Target Profit Output} = \\frac{\\text{Fixed Costs} + \\text{Target Profit}}{\\text{Contribution per Unit}}",
    variables: [
      { name: "Fixed Costs + Target Profit", definition: "Total required contribution." },
      { name: "Contribution per Unit", definition: "P - VC." },
    ],
    benchmarkGuidance: "Guides production capacity planning and seasonal sales targets.",
    evaluationInterpretation:
      "Determines the sales volume required to hit a predetermined net profit objective.",
    workedExample: "Fixed Costs = $60,000, Target Profit = $30,000, Contribution = $30. Target Output = 90,000 / 30 = 3,000 units.",
  },
  {
    id: "f-payback",
    code: "PBP",
    name: "Payback Period",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{PBP} = \\text{Prior Full Years} + \\left( \\frac{\\text{Remaining Unrecovered Cost}}{\\text{Cash Inflow in Next Year}} \\right) \\times 12",
    variables: [
      { name: "Initial Investment", definition: "Upfront capital outlay." },
      { name: "Net Annual Cash Inflows", definition: "Annual cash receipts minus operating cash payments." },
    ],
    benchmarkGuidance: "Shorter payback is preferred; crucial for firms facing liquidity constraints.",
    evaluationInterpretation:
      "Calculates the exact duration needed for net cash flows to fully recover initial capital outlay. Ignores cash flows occurring after the payback date.",
    workedExample: "Cost = $100,000. Year 1: $40k, Year 2: $40k ($20k left). Year 3 inflow = $40k. PBP = 2 yrs + (20/40)*12 = 2 years 6 months.",
  },
  {
    id: "f-arr",
    code: "ARR",
    name: "Average Rate of Return",
    unit: "Unit 3 – Finance",
    hlOnly: false,
    formula: "\\text{ARR} = \\left( \\frac{\\text{Total Net Profit over Lifetime} / \\text{Project Lifetime (Years)}}{\\text{Initial Capital Outlay}} \\right) \\times 100",
    variables: [
      { name: "Total Net Profit", definition: "Total lifetime cash inflows minus initial investment cost." },
      { name: "Initial Capital Outlay", definition: "Original purchase cost." },
    ],
    benchmarkGuidance: "Compare against commercial interest rates and internal hurdle rate (e.g. > 15%).",
    evaluationInterpretation:
      "Measures annual percentage return generated over the life of an asset. Does not adjust for the time value of money.",
    workedExample: "Cost = $100,000 over 5 yrs. Total cash inflows = $160,000. Net Profit = $60,000. Annual profit = $12,000. ARR = (12,000 / 100,000) * 100 = 12.0%.",
  },
  {
    id: "f-capacity-util",
    code: "CUR",
    name: "Capacity Utilisation Rate (HL)",
    unit: "Unit 5 – Operations",
    hlOnly: true,
    formula: "\\text{Capacity Utilisation} = \\left( \\frac{\\text{Actual Output}}{\\text{Maximum Productive Capacity}} \\right) \\times 100",
    variables: [
      { name: "Actual Output", definition: "Current volume produced." },
      { name: "Max Capacity", definition: "Total potential output if plant operates at full sustainable pace." },
    ],
    benchmarkGuidance: "Optimum operating window is 85% to 90% (avoids machine breakdown while spreading fixed overheads).",
    evaluationInterpretation:
      "Low utilization (<70%) increases unit fixed costs; 100% utilization risks employee burnout, machinery failure, and inability to handle rush orders.",
    workedExample: "Factory producing 8,500 units per month out of 10,000 max capacity. CUR = 85.0%.",
  },
  {
    id: "f-defect-rate",
    code: "DEF",
    name: "Defect Rate (HL)",
    unit: "Unit 5 – Operations",
    hlOnly: true,
    formula: "\\text{Defect Rate} = \\left( \\frac{\\text{Total Defective Units}}{\\text{Total Units Produced}} \\right) \\times 100",
    variables: [
      { name: "Defective Units", definition: "Items failing quality standards during QC inspection." },
      { name: "Total Units", definition: "Full production batch size." },
    ],
    benchmarkGuidance: "Six Sigma aims for 3.4 defects per million; typical manufacturing aims < 1.0%.",
    evaluationInterpretation:
      "Primary indicator of operational quality and lean efficiency. High defect rates cause scrap waste, rework expenses, and warranty claims.",
    workedExample: "Batch of 5,000 components produced with 25 defective units. Defect Rate = (25 / 5,000) * 100 = 0.50%.",
  },
  {
    id: "f-labour-turnover",
    code: "LTO",
    name: "Labour Turnover Rate (HL)",
    unit: "Unit 2 – Human Resources",
    hlOnly: true,
    formula: "\\text{Labour Turnover} = \\left( \\frac{\\text{Number of Staff Leaving}}{\\text{Average Total Number of Staff}} \\right) \\times 100",
    variables: [
      { name: "Staff Leaving", definition: "Employees voluntarily or involuntarily departing during the year." },
      { name: "Average Staff", definition: "(Headcount at start + Headcount at end) / 2." },
    ],
    benchmarkGuidance: "Healthy range varies: tech/finance 5%-10%; fast food/hospitality often 30%-50%+.",
    evaluationInterpretation:
      "Key barometer of organizational culture, employee motivation, and management leadership. High turnover inflicts massive recruitment and training costs.",
    workedExample: "15 employees left out of an average workforce of 120. Labour Turnover = (15 / 120) * 100 = 12.5%.",
  },
  {
    id: "f-market-share",
    code: "MS",
    name: "Market Share",
    unit: "Unit 4 – Marketing",
    hlOnly: false,
    formula: "\\text{Market Share} = \\left( \\frac{\\text{Firm's Sales Revenue (or Units)}}{\\text{Total Market Sales (or Units)}} \\right) \\times 100",
    variables: [
      { name: "Firm's Sales", definition: "Company turnover in the specified segment." },
      { name: "Total Market Sales", definition: "Aggregate industry size." },
    ],
    benchmarkGuidance: "High share (>30%) creates market leadership, economies of scale, and retail channel leverage.",
    evaluationInterpretation:
      "Reflects competitive dominance. A firm's revenue can grow while its market share declines if the overall market is expanding even faster.",
    workedExample: "Firm generates $40M revenue in a $200M total market. Market Share = (40 / 200) * 100 = 20.0%.",
  },
];

export const THEORISTS_DOSSIER: TheoristProfile[] = [
  {
    id: "t-taylor",
    name: "Frederick Winslow Taylor",
    schoolOrTheory: "Scientific Management",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Employees are rational economic actors driven purely by financial reward ('economic man'). Managers must scientifically analyze tasks, standardize workflows, and enforce piece-rate pay.",
    keyAssumptions: [
      "Workers seek to minimize effort and maximize financial earnings.",
      "Work should be broken down into repetitive, specialized micro-tasks.",
      "Close supervision and direct piece-rate financial incentives maximize output.",
    ],
    evaluationAO3:
      "Strengths: Dramatically boosted factory efficiency and mass manufacturing throughput. Limitations: Demoralising and repetitive; ignores social, emotional, and self-actualisation needs; causes union resistance.",
    realWorldExample: "Amazon fulfillment centers monitoring worker pick rates per minute with performance-based bonuses.",
  },
  {
    id: "t-maslow",
    name: "Abraham Maslow",
    schoolOrTheory: "Hierarchy of Human Needs",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Human motivation follows a 5-tier pyramid: Physiological ➔ Safety ➔ Love & Belonging ➔ Esteem ➔ Self-Actualisation. Lower-level needs must be satisfied before higher needs motivate.",
    keyAssumptions: [
      "A satisfied need is no longer an active motivator.",
      "Individuals ascend the pyramid sequentially from basic survival to creative self-fulfillment.",
    ],
    evaluationAO3:
      "Strengths: Recognised non-financial intrinsic motivators and personal growth. Limitations: Culturally biased towards Western individualism; people often sacrifice lower needs (e.g. sleep/safety) for higher purpose.",
    realWorldExample: "Google offering free gourmet food and health perks (Physiological/Safety) alongside 20% innovation time (Self-Actualisation).",
  },
  {
    id: "t-herzberg",
    name: "Frederick Herzberg",
    schoolOrTheory: "Two-Factor Motivation-Hygiene Theory",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Differentiates between Hygiene Factors (causes of dissatisfaction if absent: salary, company policy, working conditions) and Motivators (causes of true motivation: achievement, recognition, responsibility).",
    keyAssumptions: [
      "Fixing hygiene factors prevents worker dissatisfaction but never creates active motivation.",
      "True motivation only stems from job enrichment, autonomy, and intrinsic accomplishment.",
    ],
    evaluationAO3:
      "Strengths: Revolutionised modern job design through job enrichment and delegation. Limitations: Assumes clean distinction between hygiene and motivators; what one worker views as hygiene, another views as recognition.",
    realWorldExample: "Tech firms providing competitive base salaries (hygiene) while delegating total product ownership to project teams (motivator).",
  },
  {
    id: "t-adams",
    name: "John Stacey Adams",
    schoolOrTheory: "Equity Theory",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Workers strive for equity between their Inputs (effort, skill, hours, loyalty) and Outputs (salary, recognition, promotions) compared to a relevant Reference Other.",
    keyAssumptions: [
      "Perceived inequity (under-rewarded) triggers demotivation, absenteeism, or reduced effort.",
      "Fairness is subjective and driven by social comparison with colleagues and industry peers.",
    ],
    evaluationAO3:
      "Strengths: Explains why wage transparency or unfair executive bonuses shatter company-wide morale. Limitations: Highly subjective; employees tend to overestimate own inputs and underestimate others' efforts.",
    realWorldExample: "Backlash and strikes when junior engineers discover newly hired peers are receiving 25% higher signing salaries for identical roles.",
  },
  {
    id: "t-pink",
    name: "Daniel Pink",
    schoolOrTheory: "Drive: Autonomy, Mastery & Purpose",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "For 21st-century cognitive and creative tasks, traditional 'carrots and sticks' (extrinsic rewards) crush creativity. Motivation requires Autonomy (direction over task/time), Mastery (getting better), and Purpose.",
    keyAssumptions: [
      "Extrinsic bonuses narrow cognitive focus and harm conceptual problem-solving.",
      "Knowledge workers excel when given self-direction and a transcendent corporate purpose.",
    ],
    evaluationAO3:
      "Strengths: Highly applicable to modern knowledge economies, software engineering, and creative industries. Limitations: Less applicable to basic manual assembly lines where workers prioritize direct wages.",
    realWorldExample: "Atlassian's 'ShipIt Days' giving engineers 24 hours of total autonomy to build any tool that advances company mission.",
  },
  {
    id: "t-handy",
    name: "Charles Handy",
    schoolOrTheory: "Organizational Culture Types & Shamrock Model",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Identifies 4 organizational cultures: Power (web around central ruler), Role (bureaucratic pillar hierarchy), Task (matrix problem-solving teams), and Person (collective of independent experts). Also Shamrock organization (Core, Contract, Flexible staff).",
    keyAssumptions: [
      "Culture must align with industry dynamics and strategic objectives.",
      "Modern flexible firms minimize full-time fixed overhead via core + outsourced flexible shamrock wings.",
    ],
    evaluationAO3:
      "Strengths: Provides clear typology to diagnose culture clashes during M&A. Limitations: Real corporate cultures often blend attributes rather than fitting neatly into four boxes.",
    realWorldExample: "Apple's early Power Culture under Steve Jobs vs traditional banking's Role Culture.",
  },
  {
    id: "t-schein",
    name: "Edgar Schein",
    schoolOrTheory: "Three Levels of Corporate Culture (HL)",
    unit: "Unit 2 – Human Resources",
    coreModel:
      "Culture exists on 3 depth levels: Level 1 Artifacts (visible structures, dress codes, office layout), Level 2 Espoused Values (official missions, slogans, codes of conduct), Level 3 Basic Underlying Assumptions (unconscious beliefs and true drivers).",
    keyAssumptions: [
      "Superficial changes to artifacts (e.g. buying ping-pong tables) fail if underlying assumptions remain unchanged.",
    ],
    evaluationAO3:
      "Strengths: Explains why corporate rebranding exercises fail when executive actions contradict espoused values. Limitations: Difficult to objectively measure unconscious underlying assumptions.",
    realWorldExample: "Enron having 'Integrity' engraved on office walls (Espoused Value) while underlying culture prioritized predatory fraud.",
  },
  {
    id: "t-porter",
    name: "Michael Porter",
    schoolOrTheory: "Generic Strategies & Five Forces (HL)",
    unit: "Unit 1 & Unit 4",
    coreModel:
      "Strategic advantage is sustained either via Cost Leadership or Differentiation across Broad or Narrow market scopes. In-between positioning results in getting 'Stuck in the Middle'.",
    keyAssumptions: [
      "Competitive positioning must be distinct and defendable against industry structural forces.",
    ],
    evaluationAO3:
      "Strengths: Clarifies corporate strategic focus and prevents unprofitable compromise. Limitations: Digital platforms frequently achieve both differentiation and low variable cost simultaneously.",
    realWorldExample: "IKEA achieving cost leadership through flat-pack logistics while maintaining distinct Scandinavian design differentiation.",
  },
  {
    id: "t-lewin",
    name: "Kurt Lewin",
    schoolOrTheory: "Force Field Analysis & 3-Stage Change (HL)",
    unit: "Unit 2 & BMT",
    coreModel:
      "Organizations are held in dynamic equilibrium by competing Driving and Restraining forces. Successful change requires: 1. Unfreezing (breaking complacency), 2. Changing (transitioning), 3. Refreezing (locking in new habits).",
    keyAssumptions: [
      "Directly pushing driving forces increases friction; reducing restraining forces enables smooth transition.",
    ],
    evaluationAO3:
      "Strengths: Systematic psychological diagnosis of organizational inertia. Limitations: Modern business environments are too volatile for permanent 'refreezing'.",
    realWorldExample: "Microsoft shifting from Windows desktop focus to cloud under Satya Nadella by dismantling internal silo politics.",
  },
];

export { GLOSSARY_TERMS } from "./glossaryTerms";
