import { ALL_TOPICS, SYLLABUS_UNITS, TopicData } from "@/data";

export interface SearchResultItem {
  id: string;
  displayCode: string;
  unitTitle: string;
  title: string;
  subtitle: string;
  matchCategory: "Code" | "BMT" | "Case" | "Concept" | "General";
  matchedCase?: string;
  matchedTool?: string;
  snippet: string;
  score: number;
}

export type SearchFilterTab = "all" | "topics" | "cases" | "bmt" | "concepts";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * High-Precision Multi-Field Search Engine for IB Business Management (2026 Specification)
 */
export function searchBusinessCodex(
  query: string,
  filterTab: SearchFilterTab = "all"
): SearchResultItem[] {
  const rawQ = query.trim();
  if (!rawQ) return [];

  const q = normalizeText(rawQ);
  const tokens = q.split(" ").filter((t) => t.length > 0);

  // Unit / BMT pattern matching (e.g. "u1.2", "u1", "bmt 4", "bmt4", "unit 3")
  const bmtMatch = rawQ.match(/(?:bmt\s*)?(\d+)/i);
  const unitMatch = rawQ.match(/(?:unit|u)\s*([1-5])(?:\.([1-9]))?/i);

  const results: SearchResultItem[] = [];

  for (const topic of ALL_TOPICS) {
    let score = 0;
    let matchCategory: SearchResultItem["matchCategory"] = "General";
    let matchedCase: string | undefined;
    let matchedTool: string | undefined;
    let snippet = topic.summary || "";

    const unitPart = SYLLABUS_UNITS.find((u) => u.id === topic.unitId);
    const unitTitle = unitPart ? unitPart.badge : "Toolkit";

    const isBMT = topic.unitId === "bmt" || topic.topicCode.startsWith("BMT");

    // 1. Direct Display Code Matching (e.g. "U1.2", "BMT 4")
    const normCode = normalizeText(topic.displayCode);
    if (normCode === q || topic.displayCode.toLowerCase() === rawQ.toLowerCase()) {
      score += 1500;
      matchCategory = isBMT ? "BMT" : "Code";
    } else if (normCode.includes(q)) {
      score += 800;
      matchCategory = isBMT ? "BMT" : "Code";
    }

    // 2. Title & Subtitle Matching
    const normTitle = normalizeText(topic.title);
    const normSub = normalizeText(topic.subtitle || "");

    if (normTitle.includes(q)) {
      score += 600;
      if (matchCategory === "General") matchCategory = isBMT ? "BMT" : "Code";
    }
    if (normSub.includes(q)) {
      score += 350;
    }

    // 3. Real-World Case Studies Matching
    if (topic.cases && topic.cases.length > 0) {
      for (const cs of topic.cases) {
        const normCo = normalizeText(cs.company);
        const normApp = normalizeText(cs.application);
        if (normCo.includes(q)) {
          score += 550;
          matchCategory = "Case";
          matchedCase = cs.company;
          snippet = `Case Study (${cs.company}): ${cs.application}`;
          break;
        } else if (normApp.includes(q)) {
          score += 300;
          matchCategory = "Case";
          matchedCase = cs.company;
          snippet = `Case Study (${cs.company}): ${cs.application}`;
          break;
        }
      }
    }

    // 4. BMT Analytical Tools Matching
    if (topic.analysis?.connectedBMTTools && topic.analysis.connectedBMTTools.length > 0) {
      for (const tool of topic.analysis.connectedBMTTools) {
        const normTool = normalizeText(tool);
        if (normTool.includes(q)) {
          score += 450;
          if (matchCategory === "General") matchCategory = "BMT";
          matchedTool = tool;
          snippet = `Connected BMT Tool: ${tool} — ${topic.summary}`;
          break;
        }
      }
    }

    // 5. Syllabus Subsections Matching
    if (topic.subSections && topic.subSections.length > 0) {
      for (const sub of topic.subSections) {
        const normSubTitle = normalizeText(sub.title);
        const normContent = normalizeText(sub.content || "");
        if (normSubTitle.includes(q)) {
          score += 300;
          snippet = `${sub.title}: ${sub.content.slice(0, 140)}...`;
          break;
        } else if (normContent.includes(q)) {
          score += 150;
          snippet = `${sub.title}: ...${sub.content.slice(0, 140)}...`;
          break;
        }
      }
    }

    // Multi-token fallback scoring
    if (score === 0 && tokens.length > 1) {
      let matchedTokens = 0;
      const haystack = `${normCode} ${normTitle} ${normSub} ${normalizeText(topic.summary || "")}`;
      for (const t of tokens) {
        if (haystack.includes(t)) matchedTokens++;
      }
      if (matchedTokens === tokens.length) {
        score += 200;
      } else if (matchedTokens > 0) {
        score += matchedTokens * 40;
      }
    }

    // Filter Tab Validation
    if (score > 0) {
      let keep = true;
      if (filterTab === "topics") {
        keep = !isBMT;
      } else if (filterTab === "bmt") {
        keep = isBMT || matchCategory === "BMT";
      } else if (filterTab === "cases") {
        keep = matchCategory === "Case" || Boolean(topic.cases && topic.cases.length > 0);
      } else if (filterTab === "concepts") {
        keep = Boolean(topic.conceptTracking && topic.conceptTracking.length > 0);
      }

      if (keep) {
        results.push({
          id: topic.id,
          displayCode: topic.displayCode,
          unitTitle,
          title: topic.title,
          subtitle: topic.subtitle || "",
          matchCategory,
          matchedCase,
          matchedTool,
          snippet,
          score,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
