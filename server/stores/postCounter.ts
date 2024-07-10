// stores/postCounter.ts
import { defineStore } from 'pinia';

export const usePostCounterStore = defineStore('postCounter', {
  state: () => ({
    postCount: 0,
    opportunityCount: 0,
  }),
  getters: {
    treatedPercentage: (state) => {
      return state.postCount > 0 ? (state.opportunityCount / state.postCount) * 100 : 0;
    }
  },
  actions: {
    incrementPostCount() {
      this.postCount += 1;
    },
    incrementOpportunityCount() {
      this.opportunityCount += 1;
    }
  },
});
