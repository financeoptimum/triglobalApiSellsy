// stores/postCounter.ts
import { defineStore } from 'pinia';

export const usePostCounterStore = defineStore('postCounter', {
  state: () => ({
    postCount: 0,
  }),
  actions: {
    increment() {
      this.postCount += 1;
    },
    setCount(count: number) {
      this.postCount = count;
    }
  },
});
