import { usePostCounterStore } from '../stores/postCounter';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'POST') {
    const postCounterStore = usePostCounterStore();
    postCounterStore.increment();
    return { postCount: postCounterStore.postCount };
  } 
});

