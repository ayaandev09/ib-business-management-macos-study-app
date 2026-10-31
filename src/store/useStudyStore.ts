"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ALL_TOPICS, SYLLABUS_UNITS, UnitId, ConceptId } from "@/data";

export type ViewMode = "focus" | "stream" | "matrix" | "lexicon";
export type DeviceMode = "mac" | "iphone16e";

interface StudyStoreState {
  // Navigation & View State
  activeTopicId: string;
  activeUnitFilter: UnitId | "all";
  activeConceptFilter: ConceptId | "all";
  viewMode: ViewMode;
  deviceMode: DeviceMode;
  speedReadMode: boolean;
  searchQuery: string;
  sidebarCollapsed: boolean;
  unitSheetOpen: boolean;

  // Persisted Study Progress State
  completedTopics: Record<string, boolean>;
  completedSubSections: Record<string, boolean>;
  bookmarkedCases: Record<string, boolean>;
  topicNotes: Record<string, string>;

  // Navigation Actions
  setActiveTopic: (topicId: string) => void;
  setActiveUnitFilter: (unitId: UnitId | "all") => void;
  setActiveConceptFilter: (conceptId: ConceptId | "all") => void;
  setViewMode: (mode: ViewMode) => void;
  setDeviceMode: (device: DeviceMode) => void;
  toggleSpeedReadMode: () => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setUnitSheetOpen: (open: boolean) => void;

  // Progress Tracking Actions
  toggleTopicComplete: (topicId: string) => void;
  toggleSubSectionComplete: (topicId: string, subSectionId: string) => void;
  toggleUnitComplete: (unitId: UnitId) => void;
  toggleBookmarkCase: (caseId: string) => void;
  setTopicNote: (topicId: string, note: string) => void;
  resetAllProgress: () => void;
  goToNextTopic: () => void;
  goToPrevTopic: () => void;
}

export const useStudyStore = create<StudyStoreState>()(
  persist(
    (set, get) => ({
      activeTopicId: "u1-1",
      activeUnitFilter: "all",
      activeConceptFilter: "all",
      viewMode: "focus",
      deviceMode: "mac",
      speedReadMode: false,
      searchQuery: "",
      sidebarCollapsed: false,
      unitSheetOpen: false,

      completedTopics: {},
      completedSubSections: {},
      bookmarkedCases: {},
      topicNotes: {},

      setActiveTopic: (topicId) =>
        set({
          activeTopicId: topicId,
        }),

      setActiveUnitFilter: (unitId) =>
        set({
          activeUnitFilter: unitId,
        }),

      setActiveConceptFilter: (conceptId) =>
        set({
          activeConceptFilter: conceptId,
        }),

      setViewMode: (mode) =>
        set({
          viewMode: mode,
        }),

      setDeviceMode: (device) =>
        set({
          deviceMode: device,
        }),

      toggleSpeedReadMode: () =>
        set((state) => ({
          speedReadMode: !state.speedReadMode,
        })),

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setUnitSheetOpen: (open) =>
        set({
          unitSheetOpen: open,
        }),

      toggleTopicComplete: (topicId) =>
        set((state) => {
          const isCurrentlyCompleted = !!state.completedTopics[topicId];
          const nextCompleted = !isCurrentlyCompleted;
          const topic = ALL_TOPICS.find((t) => t.id === topicId);

          const updatedSubSections = { ...state.completedSubSections };
          if (topic) {
            topic.subSections.forEach((sub) => {
              updatedSubSections[sub.id] = nextCompleted;
            });
          }

          return {
            completedTopics: {
              ...state.completedTopics,
              [topicId]: nextCompleted,
            },
            completedSubSections: updatedSubSections,
          };
        }),

      toggleSubSectionComplete: (topicId, subSectionId) =>
        set((state) => {
          const nextSubState = !state.completedSubSections[subSectionId];
          const updatedSubSections = {
            ...state.completedSubSections,
            [subSectionId]: nextSubState,
          };

          const topic = ALL_TOPICS.find((t) => t.id === topicId);
          let allSubsDone = false;
          if (topic && topic.subSections.length > 0) {
            allSubsDone = topic.subSections.every(
              (sub) => !!updatedSubSections[sub.id]
            );
          }

          return {
            completedSubSections: updatedSubSections,
            completedTopics: {
              ...state.completedTopics,
              [topicId]: allSubsDone,
            },
          };
        }),

      toggleUnitComplete: (unitId) =>
        set((state) => {
          const unit = SYLLABUS_UNITS.find((u) => u.id === unitId);
          if (!unit) return state;

          const allUnitDone = unit.topics.every(
            (t) => !!state.completedTopics[t.id]
          );
          const targetState = !allUnitDone;

          const updatedTopics = { ...state.completedTopics };
          const updatedSubSections = { ...state.completedSubSections };

          unit.topics.forEach((t) => {
            updatedTopics[t.id] = targetState;
            t.subSections.forEach((sub) => {
              updatedSubSections[sub.id] = targetState;
            });
          });

          return {
            completedTopics: updatedTopics,
            completedSubSections: updatedSubSections,
          };
        }),

      toggleBookmarkCase: (caseId) =>
        set((state) => ({
          bookmarkedCases: {
            ...state.bookmarkedCases,
            [caseId]: !state.bookmarkedCases[caseId],
          },
        })),

      setTopicNote: (topicId, note) =>
        set((state) => ({
          topicNotes: {
            ...state.topicNotes,
            [topicId]: note,
          },
        })),

      resetAllProgress: () =>
        set({
          completedTopics: {},
          completedSubSections: {},
          bookmarkedCases: {},
        }),

      goToNextTopic: () => {
        const { activeTopicId } = get();
        const idx = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
        if (idx >= 0 && idx < ALL_TOPICS.length - 1) {
          set({ activeTopicId: ALL_TOPICS[idx + 1].id });
        }
      },

      goToPrevTopic: () => {
        const { activeTopicId } = get();
        const idx = ALL_TOPICS.findIndex((t) => t.id === activeTopicId);
        if (idx > 0) {
          set({ activeTopicId: ALL_TOPICS[idx - 1].id });
        }
      },
    }),
    {
      name: "ib-bm-hl-study-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        completedSubSections: state.completedSubSections,
        bookmarkedCases: state.bookmarkedCases,
        topicNotes: state.topicNotes,
        activeTopicId: state.activeTopicId,
        deviceMode: state.deviceMode,
        speedReadMode: state.speedReadMode,
      }),
    }
  )
);
