import { BorrowerPipelineTabs, getBorrowerPipelineTabsKeyFromValue } from "@/constants/borrower-pipline";
import { ApiService } from "@/services/api.service";
import type { Borrower, BorrowerPipeline } from "@/type/borrower.type";
import type { Broker } from "@/type/broker.type";
import { create } from 'zustand';
import { toast } from "sonner"

interface AppState {
  activeBorrower: Borrower | null;
  activeTab: string;
  borrowers: BorrowerPipeline[];
  activeBroker: Broker | null;
  onboardingWorkflow: string[];
  loading: boolean;
  setActiveBorrower: (borrowerPipeline: BorrowerPipeline) => void;
  setActiveTab: (tab: string) => void;
  getFilteredBorrowers: () => void;
  requestDocuments: (id: string) => void;
  sendToValuer: (id: string) => void;
  approveLone: (id: string) => void;
  escalate: (id: string) => void;
  getBrokerInfo: () => void;
  getOnboardingWorkflow: () => void;
}

export const useAppState = create<AppState>((set, get) => ({
  activeBorrower: null,
  activeTab: BorrowerPipelineTabs.new,
  borrowers: [],
  loading: false,
  successAlerts: null,
  activeBroker: null,
  onboardingWorkflow: [],

  setActiveBorrower: async (borrowerPipeline: BorrowerPipeline) => {
    set({ activeBorrower: null, loading: true });

    try {
      const detail = await ApiService.getBorrowerDetail(borrowerPipeline.id);
      set({ activeBorrower: detail, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  setActiveTab: (tab: string) => set({ activeTab: tab }),

  getFilteredBorrowers: async () => {
    const { activeTab } = get();
    try {
      const pipelines = await ApiService.getBorrowerPipeline();
      const filterTerm = getBorrowerPipelineTabsKeyFromValue(activeTab);
      if (!filterTerm) return;

      const filtered = pipelines[filterTerm];
      set({ borrowers: filtered });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  requestDocuments: async (id: string) => {
    try {
      const response = await ApiService.requestDocuments(id);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  sendToValuer: async (id: string) => {
    try {
      const response = await ApiService.sendToValuer(id);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  approveLone: async (id: string) => {
    try {
      const response = await ApiService.approveLone(id);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  escalate: async (id: string) => {
    try {
      const response = await ApiService.escalate(id);
      toast.success(response.message);
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  getBrokerInfo: async () => {
    set({ activeBroker: null, loading: true });

    try {
      const detail = await ApiService.getBrokerInfo();
      set({ activeBroker: detail, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  getOnboardingWorkflow: async () => {
    set({ onboardingWorkflow: [], loading: true });

    try {
      const detail = await ApiService.getOnboardingWorkflow();
      set({ onboardingWorkflow: detail.steps, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  }
}));