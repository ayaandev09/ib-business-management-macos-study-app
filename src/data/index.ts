import { UnitPart, TopicData, UnitId, ConceptId } from "./types";
import { UNIT_1_TOPICS } from "./unit1Topics";
import { UNIT_2_TOPICS } from "./unit2Topics";
import { UNIT_3_TOPICS } from "./unit3Topics";
import { UNIT_4_TOPICS } from "./unit4Topics";
import { UNIT_5_TOPICS } from "./unit5Topics";
import { BMT_TOPICS } from "./bmtTopics";

export * from "./types";
export * from "./metadata";

export const SYLLABUS_UNITS: UnitPart[] = [
  {
    id: "unit-1",
    unitNumber: 1,
    title: "Unit 1: Introduction to Business",
    subtitle: "Enterprise, Corporate Objectives, Stakeholders, Growth & MNCs",
    badge: "FOUNDATIONS",
    overview:
      "Explores the fundamental nature of economic activity, the four factors of production, forms of legal ownership (for-profit and social enterprises), strategic goal hierarchies (Vision, Mission, SMART, CSR), internal vs external stakeholders, economies of scale, organic and inorganic growth, and the global impact of multinational corporations.",
    strategicArc:
      "From basic entrepreneurial input-transformation-output mechanisms to transnational corporate governance and host-nation dynamics.",
    dominantConcepts: ["ethics", "change", "sustainability"],
    topics: UNIT_1_TOPICS,
  },
  {
    id: "unit-2",
    unitNumber: 2,
    title: "Unit 2: Human Resource Management",
    subtitle: "Workforce Planning, Structures, Leadership, Motivation & Culture",
    badge: "HUMAN CAPITAL",
    overview:
      "Examines the management of human capital: strategic workforce planning, demographics, organizational design (hierarchies, delayering, Handy's shamrock model), management functions vs leadership styles (autocratic to situational), motivation theories (Taylor, Maslow, Herzberg, Adams, Pink), reward systems, Edgar Schein's corporate culture levels, communication barriers, and collective bargaining industrial relations.",
    strategicArc:
      "Balancing operational cost efficiency and labor flexibility against worker motivation, organizational trust, and psychological safety.",
    dominantConcepts: ["change", "ethics", "creativity"],
    topics: UNIT_2_TOPICS,
  },
  {
    id: "unit-3",
    unitNumber: 3,
    title: "Unit 3: Finance and Accounts",
    subtitle: "Expenditure, Sources, Final Accounts, Ratios, Cash Flow & Appraisal",
    badge: "FINANCIAL ENGINE",
    overview:
      "Provides the quantitative foundation of corporate solvency and accounting: CapEx vs OpEx, internal and external sources of finance, cost classification, Statement of Profit or Loss, Balance Sheet equilibrium, profitability and liquidity ratios, HL gearing and efficiency ratios, monthly cash flow forecasts, overtrading turnarounds, investment appraisal (PBP, ARR, NPV), and budgetary variance analysis.",
    strategicArc:
      "Mastering the distinction between accounting profit and cash liquidity to ensure perpetual enterprise solvency and optimal capital allocation.",
    dominantConcepts: ["sustainability", "change"],
    topics: UNIT_3_TOPICS,
  },
  {
    id: "unit-4",
    unitNumber: 4,
    title: "Unit 4: Marketing",
    subtitle: "Orientation, Market Research, The 7 Ps & Global Strategy",
    badge: "VALUE CREATION",
    overview:
      "Investigates how organizations identify and satisfy consumer desires: product vs market orientation, STP (Segmentation, Targeting, Positioning), perception mapping, quantitative sales forecasting using moving averages, primary and secondary market research, probability and non-probability sampling, the complete 7 Ps marketing mix (PLC, pricing strategies, ATL/BTL promotion, channels, service mix), and international marketing glocalisation.",
    strategicArc:
      "Translating consumer psychological insights and market research data into an integrated, defensible marketing mix that drives market share.",
    dominantConcepts: ["creativity", "change", "ethics"],
    topics: UNIT_4_TOPICS,
  },
  {
    id: "unit-5",
    unitNumber: 5,
    title: "Unit 5: Operations Management",
    subtitle: "Methods, Lean & Quality, Location, Breakeven, Planning & MIS",
    badge: "OPERATIONAL EXCELLENCE",
    overview:
      "Focuses on the transformation process that turns inputs into valuable outputs: Job, Batch, Flow, and Cellular production; Lean methods (Kaizen, JIT, Kanban, Andon); Total Quality Management; Cradle-to-Cradle (C2C) circular design; location selection and reshoring; break-even analysis; production planning (stock control charts, capacity utilisation, defect rates, make-or-buy CTB vs CTM); crisis management; R&D; and Management Information Systems.",
    strategicArc:
      "Eliminating waste, optimizing capacity, and engineering circular regenerative systems to achieve operational resilience at scale.",
    dominantConcepts: ["sustainability", "creativity", "change"],
    topics: UNIT_5_TOPICS,
  },
  {
    id: "bmt",
    unitNumber: 7,
    title: "Business Management Toolkit (BMT 1–15)",
    subtitle: "Strategic Decision-Making, Analytical Models & Quantitative Tools",
    badge: "EXAM TOOLKIT",
    overview:
      "The comprehensive suite of 15 analytical and decision-making tools tested across the IB syllabus: SWOT Analysis, Ansoff Matrix, STEEPLE Analysis, BCG Matrix, Business Planning, Decision Trees, Descriptive Statistics, Circular Business Models, Gantt Charts (HL), Porter's Generic Strategies (HL), Hofstede's Cultural Dimensions (HL), Force Field Analysis (HL), Critical Path Analysis CPA (HL), Contribution Analysis, and Simple Linear Regression (HL).",
    strategicArc:
      "Deploying rigorous quantitative calculations and structured qualitative matrices to formulate and justify strategic recommendations.",
    dominantConcepts: ["change", "creativity", "sustainability"],
    topics: BMT_TOPICS,
  },
];

export const ALL_TOPICS: TopicData[] = [
  ...UNIT_1_TOPICS,
  ...UNIT_2_TOPICS,
  ...UNIT_3_TOPICS,
  ...UNIT_4_TOPICS,
  ...UNIT_5_TOPICS,
  ...BMT_TOPICS,
];

export const TOTAL_TOPICS_COUNT = ALL_TOPICS.length;
export const TOTAL_SUBSECTIONS_COUNT = ALL_TOPICS.reduce(
  (acc, topic) => acc + topic.subSections.length,
  0
);
export const TOTAL_READING_MINUTES = ALL_TOPICS.reduce(
  (acc, topic) => acc + topic.readingTimeMinutes,
  0
);
export const TOTAL_CASES_COUNT = ALL_TOPICS.reduce(
  (acc, topic) => acc + topic.cases.length,
  0
);

// Map of topics by ID for instantaneous lookups
export const TOPICS_MAP: Record<string, TopicData> = ALL_TOPICS.reduce(
  (acc, topic) => {
    acc[topic.id] = topic;
    return acc;
  },
  {} as Record<string, TopicData>
);
