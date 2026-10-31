import { TopicData } from "./types";

export const UNIT_1_TOPICS: TopicData[] = [
  {
    id: "u1-1",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.1",
    displayCode: "U1.1",
    syllabusRef: "IB Guide 1.1 / Slides 1.1.1–1.1.4",
    title: "Introduction to Business: Inputs, Functions & Enterprise",
    subtitle: "The Nature of Business Activity, Four Factors of Production & Sectoral Evolution",
    level: "SL / HL",
    strategicImportance: "CORE FOUNDATION",
    readingTimeMinutes: 7,
    summary:
      "A business exists to combine the four factors of production (Land, Labour, Capital, Enterprise) to produce goods and services that satisfy human needs and wants. Value addition is created through transformation processes across four interdependent functions: Human Resources, Finance and Accounts, Marketing, and Operations Management. Economic activity progresses across Primary, Secondary, Tertiary, and Quaternary sectors.",
    speedReadBullets: [
      "Four Factors of Production: Land (natural resources & raw materials), Labour (human physical & mental effort), Capital (non-natural machinery, tech, facilities), Enterprise (risk-bearing visionary coordination).",
      "Core Interdependent Functions: Human Resource Management (staffing & culture), Finance (cash flow & capital allocation), Marketing (customer needs & the 7 Ps), Operations (transformation of inputs into outputs).",
      "Sectoral Shift: Emerging economies shift from Primary (extractive) to Secondary (manufacturing), advancing to Tertiary (services) and Quaternary (knowledge, R&D, data).",
      "Entrepreneurs vs Intrapreneurs: Entrepreneurs assume personal financial and reputational risk to launch ventures; intrapreneurs drive internal innovation within established corporations without personal capital liability.",
      "Value Added Engine: Value Added = Selling Price - Cost of Bought-in Raw Materials. Achieved through branding, speed of delivery, packaging, design, and exceptional customer experience.",
    ],
    subSections: [
      {
        id: "u1-1-s1",
        title: "The Four Factors of Production & The Input-Transformation-Output Chain",
        marker: "Economic Architecture",
        content:
          "All commercial organizations operate an input-transformation-output system. Inputs consist of natural resources (Land), physical and intellectual human effort (Labour), manufactured tools and infrastructure (Capital), and the entrepreneurial drive that organizes them (Enterprise). The transformation process adds value so that customers perceive the finished good or service as worth significantly more than the bare cost of bought-in materials.",
        analyticalTakeaway:
          "High-scoring exam responses link the four factors to specific cost drivers on the Profit & Loss statement: Land (rent/raw material costs), Labour (wages/salaries), Capital (interest/depreciation), Enterprise (profit).",
        keyFormulaOrFramework: "Value Added = Selling Price - Cost of External Inputs",
      },
      {
        id: "u1-1-s2",
        title: "The Four Business Functions & Cross-Functional Synergy",
        marker: "Functional Interdependence",
        content:
          "Modern enterprises rely on four foundational departments that cannot operate in isolation: 1. Operations Management designs and executes the transformation process; 2. Marketing conducts market research and drives product positioning; 3. Finance & Accounts controls liquidity, capital expenditure, and budgeting; 4. Human Resource Management recruits, motivates, and optimizes employee output. Operational failure in one department directly jeopardizes the others (e.g. marketing generates surging demand that operations cannot supply due to finance withholding working capital).",
        analyticalTakeaway:
          "When analyzing business problems in Paper 1 or Paper 2, always evaluate how a decision in one department triggers ripple effects across the other three functions.",
      },
      {
        id: "u1-1-s3",
        title: "Sectors of Economic Activity & Industrial De-industrialisation",
        marker: "Macro Structure",
        content:
          "Economies evolve through four sequential sectors: Primary (extraction of natural commodities like agriculture, mining, oil extraction); Secondary (processing and manufacturing raw commodities into finished goods like automotive and electronics assembly); Tertiary (provision of commercial and personal services like banking, tourism, logistics); and Quaternary (information-based, analytical, intellectual and scientific R&D). Developed economies experience de-industrialisation as low-cost automated manufacturing shifts abroad, elevating service and quaternary contributions to GDP.",
        analyticalTakeaway:
          "A business operating in multiple sectors (e.g. an oil company drilling, refining, and running retail petrol stations) achieves vertical integration and captures margins at each stage.",
      },
      {
        id: "u1-1-s4",
        title: "Entrepreneurship, Intrapreneurship & Barriers to Business Setup",
        marker: "Venture Dynamics",
        content:
          "Entrepreneurs are risk-tolerant innovators who spot market gaps and organize capital to launch new enterprises. Intrapreneurs act as internal entrepreneurs within large existing corporations—spearheading new product development and disruptive initiatives using corporate resources while the parent firm absorbs the financial downside. Common barriers to business startup include lack of seed finance, cash flow crunches, intense competitive barriers to entry, lack of managerial expertise, and poor market research.",
        analyticalTakeaway:
          "Intrapreneurship requires an empowering organizational culture (Handy Task culture or Schein shared values); autocratic micromanagement extinguishes intrapreneurial initiative.",
      },
    ],
    analysis: {
      coreThesis:
        "Sustainable business value is not created merely by acquiring factors of production, but by orchestrating dynamic synergy across all four business functions to generate distinctive value-added exceeding competitive alternatives.",
      theoreticalFoundations:
        "Derived from classical factor endowment theory and modern resource-based view (RBV) of the firm, emphasizing that intrapreneurial human capital and cross-functional agility constitute the ultimate barriers to imitation.",
      strategicEvaluationAO3AO4:
        "Evaluating startup success requires balancing aggressive market expansion against cash runway. While entrepreneurship drives macroeconomic creative destruction, over 80% of new ventures fail within five years due to working capital exhaustion rather than poor product concepts.",
      commonMisconceptions: [
        "Confusing Value Added with Profit: Value Added is the difference between selling price and raw material costs; Profit subtracts all overheads, wages, interest, and taxes.",
        "Assuming intrapreneurs enjoy equity ownership: Intrapreneurs usually receive standard compensation or bonuses; the parent corporation retains IP and capital equity.",
      ],
      realWorldConnections:
        "Tesla exemplifies cross-functional integration: vertical integration in lithium supply (Primary/Secondary), automotive production (Secondary), software & supercharging networks (Tertiary), and Full Self-Driving AI R&D (Quaternary).",
      connectedBMTTools: ["SWOT Analysis", "Business Planning", "STEEPLE Analysis"],
    },
    cases: [
      {
        id: "c1-1",
        company: "Tesla Motors",
        context: "Electric vehicle design, automated manufacturing, and proprietary autonomous driving software.",
        application:
          "Demonstrates quaternary sector transformation where software subscriptions and energy storage augment traditional secondary vehicle assembly.",
        concepts: ["creativity", "sustainability"],
        syllabusLink: "1.1 Factors of Production & Sectoral Evolution",
        evaluationAO3AO4:
          "High upfront capital expenditure (Capital) was financed through visionary entrepreneurial equity (Enterprise), yielding immense market capitalization despite initial negative operating cash flows.",
      },
      {
        id: "c1-2",
        company: "Sony (PlayStation Intrapreneurship)",
        context: "Ken Kutaragi engineered the original PlayStation internally despite initial skepticism from conservative executive leadership.",
        application:
          "Textbook intrapreneurship: utilizing Sony's electronic manufacturing infrastructure and balance sheet to build a $30B gaming division.",
        concepts: ["creativity", "change"],
        syllabusLink: "1.1 Intrapreneurship & Corporate Culture",
        evaluationAO3AO4:
          "Illustrates that intrapreneurship succeeds when parent firms tolerate creative friction and provide ring-fenced budgets for disruptive R&D.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "creativity",
        intensity: 4,
        manifestation: "Entrepreneurial identification of unmet consumer pain points and novel transformation processes.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Macro shifts from agrarian and industrial manufacturing towards quaternary knowledge economies.",
      },
      {
        conceptId: "sustainability",
        intensity: 3,
        manifestation: "Responsible stewardship of Land and natural capital during resource transformation.",
      },
    ],
    examPromptTakeaway:
      "When asked to 'Evaluate whether a firm should encourage intrapreneurship', balance the benefits (retaining top creative talent, pioneering new revenue streams) against the risks (internal cannibalization, high R&D failure costs, intellectual property ownership disputes).",
  },
  {
    id: "u1-2",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.2",
    displayCode: "U1.2",
    syllabusRef: "IB Guide 1.2 / Slides 1.2.1–1.2.5",
    title: "Types of Business Organisations: For-Profit & Social Enterprises",
    subtitle: "Sole Traders, Partnerships, Limited Companies (Ltd/PLC), Cooperatives & NGOs",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD HL",
    readingTimeMinutes: 9,
    summary:
      "Business organizations fall into two primary sectors: Private (owned by private individuals) and Public (owned and controlled by the state). For-profit commercial entities range from unincorporated businesses with unlimited liability (Sole Traders, Partnerships) to incorporated corporations with legal personality and limited liability (Private Limited Companies / Ltd, Public Limited Companies / PLC). For-profit social enterprises (Cooperatives, Microfinanciers, Public-Private Partnerships) balance financial returns with social missions, while Non-Governmental Organisations (NGOs) and Charities operate non-profit models.",
    speedReadBullets: [
      "Incorporation & Limited Liability: Incorporation creates a legal identity distinct from owners (the 'corporate veil'). Shareholders risk only their invested capital; unincorporated sole traders risk personal assets for business debts.",
      "Sole Traders & Partnerships: Agile decision-making and full profit retention, but constrained capital raising, unlimited liability, and lack of continuity upon owner demise.",
      "Private Ltd (Ltd) vs Public Ltd (PLC): Ltd shares are sold privately with owner permission (shielding against hostile takeovers); PLC shares trade openly on stock exchanges (unlocking massive capital, but facing regulatory scrutiny and loss of control).",
      "For-Profit Social Enterprises: Cooperatives (democratically run 1-member-1-vote), Microfinance (small collateral-free loans to low-income entrepreneurs), PPPs (joint venture state-private funding of public infrastructure).",
      "Non-Profit Organisations & NGOs: Tax-exempt entities driven by humanitarian or environmental missions; rely on donations, grants, and retail operations; surplus revenue is fully reinvested.",
    ],
    subSections: [
      {
        id: "u1-2-s1",
        title: "Unincorporated Entities: Sole Traders & Partnerships",
        marker: "Unincorporated Forms",
        content:
          "A Sole Trader is an individual who exclusively owns and operates a business, retaining 100% of profits while bearing unlimited personal liability for all commercial debts and legal claims. A Partnership involves 2 to 20 co-owners governed by a Deed of Partnership, allowing pooled capital, shared operational workload, and specialization. However, general partners face joint and several unlimited liability, where one partner's reckless contractual commitment binds the personal wealth of all partners.",
        analyticalTakeaway:
          "Crucial exam distinction: unincorporated businesses lack continuity. If a sole trader passes away or a partner withdraws, the legal entity ceases to exist.",
        keyFormulaOrFramework: "Liability Risk: Personal Assets Vulnerable to Creditor Seizure",
      },
      {
        id: "u1-2-s2",
        title: "Incorporated Companies: Private Limited (Ltd) vs Public Limited (PLC)",
        marker: "Corporate Governance",
        content:
          "Incorporation establishes separate legal personality (the company can sue, be sued, and hold debt in its own name) and grants shareholders limited liability. Private Limited Companies (Ltd) sell shares to invited private investors; shares cannot trade openly on public stock exchanges, preventing hostile takeovers. Public Limited Companies (PLC) list shares on national or global stock exchanges via an Initial Public Offering (IPO). PLCs access vast institutional equity capital but face stringent financial reporting transparency, volatile market fluctuations, and the divorce of ownership (shareholders) from day-to-day control (directors).",
        analyticalTakeaway:
          "In 10-mark conversion questions (e.g. evaluating an Ltd converting to a PLC), always assess the loss of executive control vs the immense influx of permanent equity financing to fund capital expansion.",
      },
      {
        id: "u1-2-s3",
        title: "For-Profit Social Enterprises: Cooperatives, Microfinance & PPPs",
        marker: "Social Hybrid Models",
        content:
          "Social enterprises blend commercial revenue generation with ethical or social missions: 1. Cooperatives are democratically owned and governed by members (consumer, producer, or worker co-ops), operating on a 'one member, one vote' principle with profits distributed as dividends; 2. Microfinance Institutions provide small, affordable financial loans to underprivileged or rural entrepreneurs who lack credit history, bypassing predatory loan sharks; 3. Public-Private Partnerships (PPPs) are collaborative contractual arrangements between state governments and private consortia to fund, construct, and operate major infrastructure (e.g. toll roads, hospitals, schools).",
        analyticalTakeaway:
          "Social enterprises balance the Triple Bottom Line (Profit, People, Planet). Their primary limitation is slow consensus-based governance and difficulty raising conventional venture equity.",
      },
      {
        id: "u1-2-s4",
        title: "Non-Governmental Organisations (NGOs) & Charities",
        marker: "Non-Profit Sector",
        content:
          "Non-Profit Organisations (NPOs) and Non-Governmental Organisations (NGOs) operate in the civil sector independent of direct government control. Their primary objective is social, humanitarian, educational, or environmental advocacy rather than capital accumulation. Any surplus generated from fundraising, grants, commercial merchandising, or charity shops is reinvested into the mission. Charities receive tax exemptions but face intense public auditing, potential donor fatigue, and high reliance on voluntary labor.",
        analyticalTakeaway:
          "NGOs must uphold impeccable ethical standards; any operational mismanagement or high administrative overhead ratio instantly destroys donor trust.",
      },
    ],
    analysis: {
      coreThesis:
        "The choice of legal ownership structure represents an unavoidable trade-off between control autonomy and capital scalability, dictated by liability risk, regulatory disclosure demands, and organizational mission.",
      theoreticalFoundations:
        "Anchored in Principal-Agent Theory (the divergence of interests between shareholders/principals and professional managers/agents in PLCs) and stakeholder stewardship theory in social enterprises.",
      strategicEvaluationAO3AO4:
        "While floating as a PLC provides permanent equity capital without loan interest burdens, it exposes executives to short-term shareholder pressure for quarterly dividend growth, frequently sacrificing long-term R&D and sustainability investments.",
      commonMisconceptions: [
        "Believing limited liability protects directors from criminal fraud: Limited liability protects shareholders from business debts; fraudulent directors remain personally criminally liable.",
        "Thinking non-profits cannot make money: NPOs can and should generate operational surpluses; they simply cannot distribute profits as dividends to private owners.",
      ],
      realWorldConnections:
        "Mars Inc. and IKEA remain private (Ltd/Foundation) to preserve long-term strategic focus without stock market pressure; conversely, Saudi Aramco executed a massive PLC float to diversify state oil wealth.",
      connectedBMTTools: ["SWOT Analysis", "Ansoff Matrix", "STEEPLE Analysis"],
    },
    cases: [
      {
        id: "c1-3",
        company: "Grameen Bank (Muhammad Yunus)",
        context: "Pioneering microcredit lending to rural women in Bangladesh with high peer-support repayment rates.",
        application:
          "Exemplifies microfinance empowering bottom-of-the-pyramid entrepreneurs while generating sustainable loan recovery.",
        concepts: ["ethics", "sustainability"],
        syllabusLink: "1.2 For-Profit Social Enterprises & Microfinance",
        evaluationAO3AO4:
          "Demonstrates that commercial financial mechanisms can alleviate poverty when coupled with peer accountability, though commercial micro-lenders face ethical scrutiny if interest rates spike.",
      },
      {
        id: "c1-4",
        company: "Mondragon Corporation (Spain)",
        context: "Federation of worker cooperatives employing over 70,000 people across industrial, retail, and finance sectors.",
        application:
          "Largest cooperative in the world, capping executive pay ratios at no more than 6x the lowest-paid worker.",
        concepts: ["ethics", "change"],
        syllabusLink: "1.2 Cooperatives & Democratic Governance",
        evaluationAO3AO4:
          "Worker-ownership fostered resilience during financial crises as employees voted to accept temporary pay cuts rather than mass layoffs.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "ethics",
        intensity: 5,
        manifestation: "Institutional design balancing shareholder profit extraction against equitable stakeholder empowerment.",
      },
      {
        conceptId: "sustainability",
        intensity: 4,
        manifestation: "Long-term social enterprise viability through retained surplus rather than donor dependency.",
      },
      {
        conceptId: "change",
        intensity: 3,
        manifestation: "Structural transitions from unincorporated sole proprietorships to incorporated Ltd and PLC entities.",
      },
    ],
    examPromptTakeaway:
      "In questions debating 'Whether a family-owned Ltd should float on the stock market as a PLC', weigh the massive influx of debt-free capital and global prestige against the loss of family control, risk of hostile takeover, and quarterly earnings scrutiny.",
  },
  {
    id: "u1-3",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.3",
    displayCode: "U1.3",
    syllabusRef: "IB Guide 1.3 / Slides 1.3.1–1.3.3",
    title: "Organisational Objectives: Strategy, CSR & The Triple Bottom Line",
    subtitle: "Vision, Mission, Aims, Objectives, Corporate Social Responsibility & Ethical Strategy",
    level: "SL / HL",
    strategicImportance: "STRATEGIC EVALUATION",
    readingTimeMinutes: 8,
    summary:
      "Businesses establish a strategic hierarchy of goals to direct long-term purpose and daily execution. Vision and Mission statements articulate philosophical purpose; Corporate Aims translate vision into long-term goals; Divisional Objectives provide measurable milestones (SMART criteria); while Strategies (long-term master plans) and Tactics (short-term operational maneuvers) implement them. Organizations navigate shifting stakeholder expectations through Corporate Social Responsibility (CSR), ethical objectives, and the Triple Bottom Line (People, Planet, Profit).",
    speedReadBullets: [
      "The Goal Hierarchy: Vision Statement (aspirational future destination) ➔ Mission Statement (core purpose and values today) ➔ Aims (qualitative long-term goals) ➔ Objectives (SMART measurable targets) ➔ Strategies (medium/long-term plans) ➔ Tactics (daily/weekly operational steps).",
      "SMART Objectives: Specific (clear outcome), Measurable (quantitative metric), Agreed/Achievable (realistic buy-in), Realistic/Relevant (resourced), Time-bound (strict deadline).",
      "Corporate Social Responsibility (CSR): Acting morally and transparently towards all stakeholders beyond legal minimums; driven by ethical leadership, risk management, and brand reputation.",
      "Carroll's CSR Pyramid: 1. Economic (be profitable - foundation), 2. Legal (obey laws), 3. Ethical (do what is fair and right), 4. Philanthropic (be a good corporate citizen).",
      "Triple Bottom Line (Elkington): Measures success across Profit (economic viability), People (social responsibility & labor equity), and Planet (environmental regeneration).",
    ],
    subSections: [
      {
        id: "u1-3-s1",
        title: "The Hierarchy of Objectives: Vision to Tactics",
        marker: "Strategic Alignment",
        content:
          "Strategic coherence requires vertical alignment: The Vision statement outlines where the organization envisions itself in the distant future ('to be the earth's most customer-centric company'). The Mission statement grounds this vision in present commercial reality, clarifying what the business does, for whom, and how it differentiates itself. Corporate Aims establish qualitative strategic targets (e.g. international expansion), which are then translated into quantitative SMART Objectives for each department. Strategies define the resource allocation and pathways chosen to achieve objectives (e.g. organic product development), while Tactics specify operational day-to-day actions (e.g. launching a holiday social media ad campaign).",
        analyticalTakeaway:
          "In IB case studies, evaluate whether a company's operational tactics actually align with its stated corporate mission, or if tactical cost-cutting is actively undermining the long-term vision.",
        keyFormulaOrFramework: "SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
      },
      {
        id: "u1-3-s2",
        title: "Corporate Social Responsibility (CSR) & Carroll's CSR Pyramid",
        marker: "Ethical Strategy",
        content:
          "Corporate Social Responsibility encompasses organizational obligations to society and the environment. Archie Carroll's pyramid framework structures CSR into four hierarchical layers: 1. Economic Responsibilities (the fundamental obligation to be profitable, without which the firm ceases to exist); 2. Legal Responsibilities (adhering strictly to statutes and regulations); 3. Ethical Responsibilities (operating morally and avoiding harm even where laws are silent); 4. Philanthropic Responsibilities (voluntary community contributions and charitable donations). Firms that skip economic and legal foundations to market philanthropic gestures are frequently guilty of hypocritical greenwashing.",
        analyticalTakeaway:
          "Ethical objectives create tangible business benefits: enhanced brand loyalty, reduced employee turnover, avoidance of regulatory fines, and eligibility for ethical investment funds (ESG capital).",
      },
      {
        id: "u1-3-s3",
        title: "The Triple Bottom Line & Why Objectives Mutate Over Time",
        marker: "Dynamic Evolution",
        content:
          "John Elkington's Triple Bottom Line framework expands accounting metrics beyond financial profit to encompass three Ps: Profit (economic value generated), People (fair human labor practices and community welfare), and Planet (environmental footprint and carbon neutral stewardship). A business's objectives naturally evolve across its lifecycle: startups prioritize survival and cash breakeven; established firms target revenue growth and market share dominance; mature enterprises prioritize profit maximisation, dividend stability, and corporate social responsibility.",
        analyticalTakeaway:
          "External STEEPLE shocks (recession, pandemic, regulatory shifts) force sudden objective pivots: firms rapidly shelve long-term CSR initiatives to focus purely on short-term cash survival.",
      },
    ],
    analysis: {
      coreThesis:
        "Organizational objectives serve as the navigational compass of enterprise; however, genuine ethical objectives must be deeply integrated into executive compensation and operational budgets rather than treated as peripheral public relations exercises.",
      theoreticalFoundations:
        "Draws from Milton Friedman's shareholder primacy doctrine ('the social responsibility of business is to increase its profits') versus Edward Freeman's Stakeholder Theory and Elkington's Triple Bottom Line.",
      strategicEvaluationAO3AO4:
        "Pursuing aggressive CSR involves significant short-term cost overheads (fair-trade sourcing premiums, sustainable packaging, living wages) that reduce short-term Net Profit Margins. However, in modern consumer markets, unethical firms face devastating social media boycotts and catastrophic brand destruction.",
      commonMisconceptions: [
        "Believing Friedman argued companies should break laws: Friedman explicitly stated firms must maximize profits within the rules of the game and legal compliance.",
        "Confusing Mission with Vision: A vision is forward-looking and aspirational (future); a mission is operational and descriptive (present).",
      ],
      realWorldConnections:
        "Patagonia transfered 100% of voting company stock to an environmental trust to ensure the planet remains the sole shareholder, contrasting with Volkswagen's 'Dieselgate' scandal where engineering fraud destroyed $30B+ in market value.",
      connectedBMTTools: ["SWOT Analysis", "Ansoff Matrix", "STEEPLE Analysis"],
    },
    cases: [
      {
        id: "c1-5",
        company: "Patagonia",
        context: "Outdoor apparel brand operating under the mission statement: 'We're in business to save our home planet.'",
        application:
          "Authentic Triple Bottom Line integration: 1% for the Planet donation, repairing worn garments, and discouraging overconsumption ('Don't Buy This Jacket').",
        concepts: ["ethics", "sustainability"],
        syllabusLink: "1.3 CSR, Triple Bottom Line & Ethical Objectives",
        evaluationAO3AO4:
          "Demonstrates that radical environmental authenticity strengthens consumer brand loyalty and pricing power, enabling sustained commercial profitability without external shareholder pressure.",
      },
      {
        id: "c1-6",
        company: "Volkswagen (Dieselgate)",
        context: "Installation of illegal defeat devices on 11 million diesel vehicles to cheat emissions tests.",
        application:
          "Catastrophic failure of ethical objectives: short-term engineering cost-cutting prioritized over legal compliance and environmental safety.",
        concepts: ["ethics", "change"],
        syllabusLink: "1.3 Ethical Objectives vs Shareholder Pressure",
        evaluationAO3AO4:
          "The scandal inflicted over $35 billion in regulatory fines and legal settlements, forcing a radical strategic pivot towards electric vehicles.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "ethics",
        intensity: 5,
        manifestation: "Establishing moral parameters that govern operations beyond baseline statutory regulations.",
      },
      {
        conceptId: "sustainability",
        intensity: 5,
        manifestation: "Embedding the Triple Bottom Line (People, Planet, Profit) into corporate resource allocation.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Pivoting organizational objectives from startup survival to ESG compliance and circularity.",
      },
    ],
    examPromptTakeaway:
      "For 10-mark evaluation prompts assessing 'Whether a firm should adopt ethical objectives', structure the response by contrasting short-term compliance costs against long-term intangible assets (brand equity, talent recruitment, customer retention, and mitigation of regulatory risk).",
  },
  {
    id: "u1-4",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.4",
    displayCode: "U1.4",
    syllabusRef: "IB Guide 1.4 / Slides 1.4.1",
    title: "Stakeholders: Internal, External & Conflict Resolution",
    subtitle: "Stakeholder Mapping, Power-Interest Matrix & Mutual Conflict Dynamics",
    level: "SL / HL",
    strategicImportance: "CORE FOUNDATION",
    readingTimeMinutes: 7,
    summary:
      "A stakeholder is any individual, group, or institution with a direct or indirect interest in the decisions, actions, and performance of a business. Stakeholders are divided into Internal (Employees, Managers, Shareholders) and External (Customers, Suppliers, Creditors, Government, Competitors, Local Communities, Pressure Groups). Because different stakeholder groups hold divergent priorities, strategic decisions inevitably produce stakeholder conflict, requiring active management via the Mendelow Power-Interest Matrix.",
    speedReadBullets: [
      "Internal vs External Stakeholders: Internal operate within the business structure (Shareholders seek dividends/capital growth; Managers seek prestige/bonuses; Employees seek fair wages/job security). External operate outside (Customers seek quality/value; Suppliers seek prompt payment; Governments seek taxes/legal compliance).",
      "Core Stakeholder Conflicts: 1. Shareholders vs Employees (cutting labor costs to raise dividend payouts); 2. Customers vs Shareholders (raising retail prices to maximize short-term margins); 3. Management vs Local Community (building high-emission factory near residential zones).",
      "Mendelow Power-Interest Matrix: Categorizes stakeholders into 4 quadrants based on their Power to influence decisions and Level of Interest in outcomes.",
      "Matrix Strategies: High Power / High Interest ➔ Manage Closely (key players); High Power / Low Interest ➔ Keep Satisfied (investors, regulators); Low Power / High Interest ➔ Keep Informed (employees, local residents); Low Power / Low Interest ➔ Monitor (minimal effort).",
      "Conflict Resolution Approaches: Stakeholder dialogue, arbitration, employee representation on boards, share ownership schemes, and compromise solutions.",
    ],
    subSections: [
      {
        id: "u1-4-s1",
        title: "Internal vs External Stakeholders & Their Respective Interests",
        marker: "Stakeholder Taxonomy",
        content:
          "Stakeholders possess legitimate stakes in organizational conduct. Internal stakeholders include: Shareholders (voting power, dividend yields, capital appreciation); Directors and Managers (executive autonomy, career advancement, bonus remuneration); and Employees (fair wages, safe conditions, job security, training). External stakeholders encompass: Customers (fair prices, safe products, ethical sourcing); Suppliers (fair contractual terms, consistent order volume, prompt credit settlement); Creditors and Banks (timely debt servicing, healthy liquidity ratios); Government (tax revenue, employment creation, statutory compliance); Local Communities (environmental preservation, infrastructure investment); and Pressure Groups (corporate accountability on climate, human rights, animal welfare).",
        analyticalTakeaway:
          "Do not confuse Stakeholders with Shareholders: All shareholders are stakeholders (as equity owners), but not all stakeholders are shareholders.",
      },
      {
        id: "u1-4-s2",
        title: "Classic Stakeholder Conflicts & The Zero-Sum Dilemma",
        marker: "Conflict Dynamics",
        content:
          "Stakeholder objectives frequently clash in a zero-sum dynamic: 1. Shareholders vs Employees: Management implementing automation or offshoring to boost profitability and share price directly causes employee redundancies and worker demoralisation; 2. Shareholders vs Customers: Aggressive cost-cutting on ingredients or materials enhances profit margins but deteriorates product quality and customer safety; 3. Business vs Local Community & Pressure Groups: Expanding a 24/7 manufacturing hub drives economic growth but inflicts noise pollution, traffic congestion, and carbon emissions on surrounding neighborhoods.",
        analyticalTakeaway:
          "Examiners reward students who demonstrate that short-term stakeholder trade-offs can be harmonized long-term: well-treated employees deliver superior customer service, driving customer loyalty and ultimate shareholder returns.",
      },
      {
        id: "u1-4-s3",
        title: "Mendelow's Power-Interest Matrix & Strategic Engagement",
        marker: "Management Framework",
        content:
          "Aubrey Mendelow's matrix categorizes stakeholders across two axes: Level of Power (ability to coerce or obstruct business decisions) and Level of Interest (how deeply the stakeholder cares about the specific outcome). The four resulting quadrants dictate strategic management: 1. High Power, High Interest (Key Players): Institutional investors, major lenders, government regulators. Strategy: Manage Closely through direct consultation and negotiation; 2. High Power, Low Interest: Wealthy passive shareholders, tax authorities. Strategy: Keep Satisfied to prevent them from exercising obstructive power; 3. Low Power, High Interest: Local residents, trade union shop stewards, frontline workers. Strategy: Keep Informed via transparent newsletters and town halls to prevent opposition; 4. Low Power, Low Interest: Occasional customers, general public. Strategy: Monitor with minimal resource expenditure.",
        analyticalTakeaway:
          "Stakeholder positions on the matrix are dynamic: a low-power pressure group can rapidly migrate to high-power if its viral social media campaign triggers a national consumer boycott.",
        keyFormulaOrFramework: "Mendelow Matrix: Power (Low/High) × Interest (Low/High)",
      },
    ],
    analysis: {
      coreThesis:
        "Modern corporate survival requires transitioning from obsolete shareholder-only primacy towards balanced multi-stakeholder governance, using analytical mapping to prevent catastrophic stakeholder friction.",
      theoreticalFoundations:
        "Rooted in R. Edward Freeman's Stakeholder Theory (1984), positing that a company's systemic long-term survival is contingent upon nurturing healthy relationships with all constituent stakeholder networks.",
      strategicEvaluationAO3AO4:
        "Evaluating stakeholder conflicts requires contextual nuance: during severe liquidity crises, management must prioritize creditors and shareholders to avoid liquidation; during routine operations, employee engagement and customer satisfaction take precedence.",
      commonMisconceptions: [
        "Treating competitors as internal stakeholders: Competitors are external stakeholders whose actions directly impact pricing and strategy.",
        "Assuming Mendelow quadrants are static: High-interest, low-power employees can unionize or strike, instantly escalating into high-power key players.",
      ],
      realWorldConnections:
        "Amazon faced intense public conflict between shareholders celebrating record cloud profits and warehouse workers protesting algorithmic productivity quotas and union-busting.",
      connectedBMTTools: ["SWOT Analysis", "STEEPLE Analysis", "Decision Trees"],
    },
    cases: [
      {
        id: "c1-7",
        company: "Uber Technologies",
        context: "Global expansion clashing with municipal regulators, traditional taxi unions, and gig-economy driver classifications.",
        application:
          "Demonstrates multi-stakeholder warfare: local governments banned the app (High Power), taxi associations launched strikes, while consumers demanded cheap rides.",
        concepts: ["change", "ethics"],
        syllabusLink: "1.4 Stakeholder Mapping & Mendelow Matrix",
        evaluationAO3AO4:
          "Uber initially adopted an aggressive, non-conciliatory approach, but was eventually forced to negotiate with regulators and grant driver benefits in the UK.",
      },
      {
        id: "c1-8",
        company: "Starbucks (Fairtrade Sourcing)",
        context: "Balancing coffee bean pricing with smallholder farmer livelihoods in Latin America and Africa.",
        application:
          "Harmonizing supplier welfare with consumer ethical expectations to insulate against activist pressure campaigns.",
        concepts: ["ethics", "sustainability"],
        syllabusLink: "1.4 Stakeholder Collaboration & Supplier Ethics",
        evaluationAO3AO4:
          "While Fairtrade certification increased input purchasing costs, it protected Starbucks against reputational boycotts and secured high-quality coffee supply.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "ethics",
        intensity: 5,
        manifestation: "Navigating moral compromises when shareholder financial interests harm labor and community welfare.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Stakeholder realignment driven by regulatory shifts, technological automation, and unionisation.",
      },
    ],
    examPromptTakeaway:
      "When responding to 'Discuss how management should resolve a conflict between shareholders and employees regarding factory automation', utilize Mendelow's matrix to evaluate the balance of power, and propose win-win solutions such as worker reskilling and employee profit-sharing schemes.",
  },
  {
    id: "u1-5",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.5",
    displayCode: "U1.5",
    syllabusRef: "IB Guide 1.5 / Slides 1.5.1–1.5.2",
    title: "Growth & Evolution: Economies of Scale & Strategic Expansion",
    subtitle: "Internal vs External Economies of Scale, Diseconomies & Inorganic Growth Methods",
    level: "SL / HL",
    strategicImportance: "HIGH-YIELD HL",
    readingTimeMinutes: 10,
    summary:
      "Businesses pursue growth to capture higher market share, enjoy economies of scale, diversify risk, and enhance profitability. As output expands, Internal Economies of Scale (Purchasing, Technical, Financial, Managerial, Marketing) and External Economies lower long-run average costs. However, excessive growth triggers Diseconomies of Scale due to communication breakdowns, coordination bottlenecks, and worker alienation. Growth can be pursued Internally (organic expansion via retained earnings) or Externally (inorganic expansion via Mergers, Takeovers, Joint Ventures, Strategic Alliances, and Franchising).",
    speedReadBullets: [
      "Internal Economies of Scale (Lower Average Costs): Purchasing/Bulk-buying (discounts on raw materials), Technical (high-capacity automated machinery), Financial (lower bank loan interest rates), Managerial (specialist executive talent), Marketing (spreading fixed ad spend over millions of units).",
      "External Economies of Scale: Cost reductions external to the firm but shared by the entire industry (skilled local labor pool, specialized infrastructure, research universities).",
      "Diseconomies of Scale (Rising Average Costs): Communication distortion across bloated hierarchies, coordination delays between distant divisions, bureaucracy, and employee alienation/demotivation.",
      "Internal (Organic) Growth: Financed through retained profit; slower, lower risk, preserves company culture and control.",
      "External (Inorganic) Growth: Mergers & Acquisitions (rapid market entry, instant scale, high cultural clash risk), Joint Ventures (temporary separate legal entity sharing risk/equity), Strategic Alliances (contractual collaboration without new legal entity), Franchising (selling business model rights for upfront fees and royalties).",
    ],
    subSections: [
      {
        id: "u1-5-s1",
        title: "Internal & External Economies of Scale vs Diseconomies of Scale",
        marker: "Cost Structure Dynamics",
        content:
          "Economies of scale occur when an increase in the scale of production leads to a decrease in the Long-Run Average Cost (LRAC) per unit of output. Internal economies include: 1. Purchasing Economies (monopsony leverage securing bulk raw material discounts); 2. Technical Economies (capital-intensive robotics and container ships operating at indivisible high output); 3. Financial Economies (banks offering prime interest rates to massive conglomerates); 4. Managerial Economies (hiring specialized CFOs, supply chain engineers, and legal teams); 5. Marketing Economies (global advertising campaigns amortized over enormous sales volume). Conversely, pushing scale past the minimum efficient scale (MES) triggers Diseconomies of Scale: communication distortion down 10-layer hierarchies, inter-departmental politics, duplicate overheads, and assembly line worker alienation leading to absenteeism and strikes.",
        analyticalTakeaway:
          "Graphically represent this using a U-shaped Long-Run Average Cost (LRAC) curve. Emphasize that total costs always increase with output; it is the average cost per unit that falls then rises.",
        keyFormulaOrFramework: "Average Cost = Total Cost / Total Output Quantity",
      },
      {
        id: "u1-5-s2",
        title: "Internal (Organic) Growth vs External (Inorganic) Growth",
        marker: "Expansion Strategies",
        content:
          "Internal (Organic) growth involves expanding commercial capacity from within: opening new company-owned stores, developing new product lines, entering overseas territories organically, and investing in internal digital marketing. It is financed primarily through retained profits, avoiding crippling bank interest or shareholder dilution. It preserves corporate culture and organizational control, but is inherently slow and vulnerable to faster rivals seizing market territory. External (Inorganic) growth involves integrating with external organizations: 1. Mergers (two firms mutually combine under single ownership); 2. Takeovers/Acquisitions (one firm buys a controlling 50%+ equity stake, which can be friendly or hostile); 3. Joint Ventures (two firms create a third shared company to tackle a specific project); 4. Strategic Alliances (cooperative agreements without equity exchange).",
        analyticalTakeaway:
          "Over 70% of global M&A deals fail to deliver anticipated shareholder value due to unbridgeable organizational culture clashes and IT integration bottlenecks.",
      },
      {
        id: "u1-5-s3",
        title: "Franchising: The Hybrid Scalability Engine",
        marker: "Franchise Model",
        content:
          "Franchising is a contractual partnership where a franchisor sells the legal right to operate its verified business format, brand name, and trademarks to an independent franchisee. In return, the franchisor receives an upfront franchise purchase fee plus ongoing royalty fees (typically 4%-8% of gross turnover). For the franchisor, it enables exponential global brand expansion with virtually zero capital outlay, since the franchisee funds store leases, fit-outs, and staff. For the franchisee, it offers a proven business model with reduced failure risk and nationwide marketing support. However, franchisors risk brand damage if a rogue franchisee provides substandard hygiene or service, while franchisees suffer strict operational micromanagement and loss of autonomy.",
        analyticalTakeaway:
          "Franchising works exceptionally well for standardized service and food models (McDonald's, Subway, Marriott) where every process can be codified into strict operational manuals.",
      },
    ],
    analysis: {
      coreThesis:
        "Scale is a double-edged sword: while achieving minimum efficient scale unlocks formidable cost advantages, reckless inorganic growth through debt-fueled M&A frequently destroys value through cultural incompatibility and bureaucratic diseconomies.",
      theoreticalFoundations:
        "Grounded in Coase's Theory of the Firm (transaction cost economics) and the Ansoff Matrix (Market Development and Diversification pathways).",
      strategicEvaluationAO3AO4:
        "Evaluating growth methods requires assessing: 1. Financial liquidity and gearing tolerance; 2. Urgency of market entry (first-mover advantage vs fast-follower); 3. Cultural integration risks; 4. Regulatory antitrust scrutiny (competition commission blocking monopolistic mergers).",
      commonMisconceptions: [
        "Confusing Joint Ventures with Strategic Alliances: A Joint Venture legally forms a brand new third entity with shared equity; a Strategic Alliance is purely a cooperative contract with no new legal entity.",
        "Assuming mergers always lower prices for consumers: Monopolistic mergers often reduce competitive pressure, leading to price hikes and reduced consumer choice.",
      ],
      realWorldConnections:
        "AOL Time Warner ($164B) and Daimler-Chrysler represent catastrophic M&A culture clashes; conversely, Disney's acquisitions of Pixar, Marvel, and Lucasfilm unlocked immense creative and financial synergy.",
      connectedBMTTools: ["Ansoff Matrix", "SWOT Analysis", "BCG Matrix", "Porter's Generic Strategies"],
    },
    cases: [
      {
        id: "c1-9",
        company: "McDonald's Corporation",
        context: "Global fast-food powerhouse operating over 40,000 restaurants across 100+ countries, with 95% run by independent franchisees.",
        application:
          "Mastery of the franchise business model: McDonald's owns the prime commercial real estate and collects rents plus royalties, generating consistent high-margin cash flow.",
        concepts: ["creativity", "sustainability"],
        syllabusLink: "1.5 Franchising & Economies of Scale",
        evaluationAO3AO4:
          "Demonstrates how franchising accelerates global market penetration while shifting operational and local labour risks onto franchisees.",
      },
      {
        id: "c1-10",
        company: "Daimler-Chrysler Merger ($36B)",
        context: "1998 cross-border mega-merger between German luxury automaker Daimler-Benz and American mass-market Chrysler.",
        application:
          "Textbook M&A catastrophe: complete clash of cultures (German formal engineering hierarchy vs American free-wheeling bonus culture).",
        concepts: ["change", "ethics"],
        syllabusLink: "1.5 Mergers, Takeovers & Culture Clashes",
        evaluationAO3AO4:
          "Dissolved less than a decade later for a fraction of its purchase price, proving that financial synergy models fail if human organizational cultures cannot integrate.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "change",
        intensity: 5,
        manifestation: "Structural corporate transformation through aggressive cross-border M&A and international franchising.",
      },
      {
        conceptId: "creativity",
        intensity: 4,
        manifestation: "Designing scalable business models and novel joint venture risk-sharing architectures.",
      },
      {
        conceptId: "sustainability",
        intensity: 3,
        manifestation: "Maintaining economic viability by operating at minimum efficient scale without triggering diseconomies.",
      },
    ],
    examPromptTakeaway:
      "When evaluating 'Whether a mid-sized company should expand organically or via takeover', contrast the high speed, immediate customer base, and instant market share of an acquisition against the debt burden, culture clash, and regulatory risks, recommending organic growth if the company possesses a unique artisanal culture and limited capital reserves.",
  },
  {
    id: "u1-6",
    unitId: "unit-1",
    unitNumber: 1,
    topicCode: "1.6",
    displayCode: "U1.6",
    syllabusRef: "IB Guide 1.6 / Slides 1.6.1",
    title: "Multinational Companies (MNCs) & Globalisation",
    subtitle: "Host Country Impacts, FDI Drivers, Ethical Dilemmas & Trade Dynamics",
    level: "SL / HL",
    strategicImportance: "STRATEGIC EVALUATION",
    readingTimeMinutes: 7,
    summary:
      "A Multinational Company (MNC) is an incorporated enterprise registered and operating in more than one country, with headquarters in the home nation and operational subsidiaries in host countries. MNC expansion is propelled by globalisation—the growing interconnectedness of global trade, communications, and capital flows. While Foreign Direct Investment (FDI) brings immense benefits to host nations (job creation, GDP growth, technology transfer), it also generates severe socioeconomic conflicts regarding profit repatriation, environmental degradation, and sweatshop labor exploitation.",
    speedReadBullets: [
      "Definition of MNC: A business that owns or controls production or service facilities in two or more countries.",
      "Drivers of MNC Expansion: Seeking lower labor and land costs, escaping domestic market saturation, accessing raw material deposits, bypassing trade tariffs/quotas, and leveraging brand economies of scale.",
      "Positive Host Country Impacts: Inflow of Foreign Direct Investment (FDI), job creation, technical training for local workforce, tax contributions, infrastructure modernisations, and supply chain multiplier effects for domestic vendors.",
      "Negative Host Country Impacts: Repatriation of profits back to headquarters (draining host balance of payments), environmental destruction, exploitation of lax local labor regulations, tax avoidance via transfer pricing, and wiping out local artisan competitors.",
      "Globalisation Enablers: Containerized ocean shipping, internet communication, World Trade Organization (WTO) tariff reductions, and mobile capital liberalization.",
    ],
    subSections: [
      {
        id: "u1-6-s1",
        title: "The Nature of MNCs & Motivations for Cross-Border Expansion",
        marker: "MNC Foundations",
        content:
          "Multinational Companies operate global supply chains and distribution networks. Corporations expand across borders due to both push and pull factors: Push factors include domestic market saturation, high domestic corporate tax rates, stringent environmental statutes, and rising domestic wage inflation. Pull factors encompass: 1. Cost Reductions (significantly lower manufacturing wages in emerging markets like Vietnam, India, and Mexico); 2. Proximity to Markets (eliminating long maritime shipping lead times and avoiding high import tariffs or trade barriers); 3. Securing Strategic Resources (direct ownership of rare earth mineral mines or agricultural commodities); 4. Risk Diversification (spreading revenue exposure across multiple currencies and geopolitical regions).",
        analyticalTakeaway:
          "MNCs exploit international regulatory arbitrage: relocating high-emission or labor-intensive manufacturing stages to developing jurisdictions with minimal statutory protections.",
      },
      {
        id: "u1-6-s2",
        title: "Host Nation Impacts: Economic Development vs Neo-Colonial Exploitation",
        marker: "Socioeconomic Balance Sheet",
        content:
          "The relationship between an MNC and its host nation is complex and contested: Positive Impacts: 1. Employment Creation (hiring thousands of local workers and raising household incomes); 2. Technology & Knowledge Transfer (introducing advanced automated manufacturing and managerial practices that spill over into local firms); 3. Tax Contributions (corporate taxes and employee income taxes bolstering host public finances); 4. Infrastructure Development (paving roads, building deep-water ports, and financing power grids to support operations). Negative Impacts: 1. Profit Repatriation (siphoning net profits back to home country shareholders, destabilizing host currency reserves); 2. Cultural Imperialism (standardized Western consumer goods displacing indigenous cultural heritage and local food systems); 3. Transfer Pricing (manipulating internal invoicing across subsidiaries in tax havens to pay near-zero local taxes); 4. Regulatory Blackmail (threatening to shift thousands of jobs to competing nations if host governments attempt to impose stricter environmental or safety standards).",
        analyticalTakeaway:
          "When evaluating MNC impact on host nations, always contrast short-term economic stimulation against long-term ecological depletion and local competitive destruction.",
      },
    ],
    analysis: {
      coreThesis:
        "MNCs act as the primary engines of global wealth generation and technological distribution; yet their immense transnational scale creates an asymmetric power dynamic over developing host governments, demanding strict ethical vigilance.",
      theoreticalFoundations:
        "Dunning's Eclectic Paradigm (OLI Framework: Ownership advantages, Location advantages, Internalisation advantages) explaining why firms choose Foreign Direct Investment over domestic licensing.",
      strategicEvaluationAO3AO4:
        "Evaluating MNC host impacts depends heavily on the governance strength of the host state: robust regulatory regimes (e.g. EU host states) extract immense tax and high-skill job benefits, whereas vulnerable developing states frequently suffer environmental destruction and profit repatriation.",
      commonMisconceptions: [
        "Confusing exporting with being an MNC: An exporter simply ships goods across borders; an MNC must physically own and operate productive assets in foreign host nations.",
        "Assuming all foreign direct investment is beneficial: Highly automated MNC factories often create fewer local jobs than advertised while driving indigenous craft firms into bankruptcy.",
      ],
      realWorldConnections:
        "Apple's reliance on Foxconn manufacturing hubs in Henan, China ('iPhone City') transformed regional employment, but sparked intense scrutiny over worker working hours, safety nets, and supply chain vulnerability.",
      connectedBMTTools: ["STEEPLE Analysis", "SWOT Analysis", "Porter's Generic Strategies", "Hofstede's Cultural Dimensions"],
    },
    cases: [
      {
        id: "c1-11",
        company: "Nike Inc.",
        context: "Pioneering the outsourced athletic apparel model across Southeast Asian subcontractor factories.",
        application:
          "Illustrates the MNC ethical crisis: 1990s sweatshop scandals involving child labor and unsafe conditions severely damaged global brand equity.",
        concepts: ["ethics", "change"],
        syllabusLink: "1.6 MNCs & Supply Chain Ethics",
        evaluationAO3AO4:
          "Forced Nike to pioneer the Fair Labor Association, institute transparent factory auditing, and implement living wage benchmarks across offshore suppliers.",
      },
      {
        id: "c1-12",
        company: "Shell (Niger Delta)",
        context: "Decades of oil extraction in Nigeria generating significant government royalties alongside widespread oil spills.",
        application:
          "Demonstrates extreme host country tension: economic dependency on oil exports pitted against devastating ecological poisoning of local fishing communities.",
        concepts: ["sustainability", "ethics"],
        syllabusLink: "1.6 MNC Ecological & Social Impacts on Host Nations",
        evaluationAO3AO4:
          "Highlighting regulatory capture where developing host states fail to enforce environmental cleanup against powerful transnational resource conglomerates.",
      },
    ],
    conceptTracking: [
      {
        conceptId: "ethics",
        intensity: 5,
        manifestation: "Labor rights standards, transfer pricing tax ethics, and corporate accountability in developing host nations.",
      },
      {
        conceptId: "sustainability",
        intensity: 5,
        manifestation: "Preventing environmental exploitation and resource depletion in vulnerable host ecosystems.",
      },
      {
        conceptId: "change",
        intensity: 4,
        manifestation: "Globalisation driving structural economic shifts from domestic manufacturing to offshore transnational supply chains.",
      },
    ],
    examPromptTakeaway:
      "In 10-mark questions evaluating 'Whether a developing host nation should grant tax concessions to attract an MNC', balance immediate GDP injection, job creation, and infrastructure development against the risks of profit repatriation, environmental exploitation, and destruction of indigenous businesses.",
  },
];
