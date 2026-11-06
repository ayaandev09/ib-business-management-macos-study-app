"use client";

import { ALL_TOPICS, SYLLABUS_UNITS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export type WidgetSyncTrigger = "init" | "flip" | "topic-complete" | "navigation" | "heartbeat" | "force" | "state-change" | "native-load";

interface NativeMessageHandler {
  postMessage: (payload: unknown) => void;
}

function writeWidgetData(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const jsonString = JSON.stringify(payload);

  const handler = (
    window as unknown as {
      webkit?: { messageHandlers?: { studySync?: NativeMessageHandler } };
    }
  ).webkit?.messageHandlers?.studySync;

  if (handler) {
    try {
      handler.postMessage(jsonString);
    } catch (err) {
      console.warn("[WidgetBridge] Failed to postMessage:", err);
    }
  }

  try {
    window.localStorage.setItem("widget_data", jsonString);
    window.localStorage.setItem("study_widget_business", jsonString);
  } catch {
    // LocalStorage fallback
  }
}

export function syncWidgetSnapshot(trigger: WidgetSyncTrigger = "init") {
  const state = useStudyStore.getState();
  const activeTopic =
    ALL_TOPICS.find((topic) => topic.id === state.activeTopicId) || ALL_TOPICS[0];
  const activeUnit =
    SYLLABUS_UNITS.find((unit) => unit.id === activeTopic.unitId) ||
    SYLLABUS_UNITS[0];
  const currentIndex = ALL_TOPICS.findIndex(
    (topic) => topic.id === activeTopic.id
  );
  const nextTopic =
    currentIndex >= 0 && currentIndex < ALL_TOPICS.length - 1
      ? ALL_TOPICS[currentIndex + 1]
      : null;
  const completed = Object.values(state.completedTopics || {}).filter(Boolean).length;
  const total = ALL_TOPICS.length || 21;
  const masteryPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  writeWidgetData({
    appId: "business",
    appTitle: "C-SUITE MATRIX // IB BM",
    subjectBadge: "IB BUSINESS HL",
    iconSystemName: "briefcase.fill",
    subjectName: "IB Business Management",
    activeUnit: activeUnit?.title || "Unit 1: Introduction to business management",
    activeTopicTitle: activeTopic?.title || "What is a Business?",
    activeRevisionModule: `${activeTopic?.displayCode || "1.1"} · ${activeTopic?.title || ""}`,
    nextTopicTitle: nextTopic?.title || "Toolkit complete",
    completedTopics: completed,
    totalTopics: total,
    masteryPercentage,
    remainingMinutes: activeTopic?.readingTimeMinutes || 30,
    highlightQuoteOrFormula: activeTopic?.examPromptTakeaway || "Value Added = Selling Price - Cost of Bought-In Inputs",
    examTip: activeTopic?.analysis?.strategicEvaluationAO3AO4 || "Paper 1/2 AO4: Evaluate primary vs tertiary sector shifts.",
    accentColorHex: "#10B981",
    secondaryColorHex: "#0284C7",
    telemetryTag: "BM 2026 • SYNCED",
    trigger,
    lastUpdated: Date.now() / 1000 - 978307200,
  });
}

if (typeof window !== "undefined") {
  (window as unknown as { __syncStudyWidget?: (trigger?: string) => void }).__syncStudyWidget = (t) => {
    syncWidgetSnapshot((t as WidgetSyncTrigger) || "init");
  };
}
