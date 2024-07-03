<!-- pages/index.vue -->
<template>
  <div>
    <p>Redirection en cours...</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  router.push('/post-counter');
});
</script>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>

  