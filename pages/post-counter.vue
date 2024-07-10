<template>
    <div class="container">
      <p class = "title">Leads reçus : {{ postCounterStore.postCount }}</p>
      <p class = "title">Opportunités créées : {{ postCounterStore.opportunityCount }}</p>
      <p class = "counter">Pourcentage de leads traités : {{ postCounterStore.treatedPercentage.toFixed(2) }}%</p>
    </div>
</template>

<script setup lang="ts">
  import { usePostCounterStore } from '../server/stores/postCounter';
  const postCounterStore = usePostCounterStore();
</script>
  
  <style scoped>
  .container {
    text-align: center;
    background-color: #87CEFA;
    color: #333;
    padding: 20px;
    border-radius: 8px;
  }
  .title {
    color: #FFA07A;
    font-size: 2em;
  }
  .counter {
    color: #98FB98;
    font-size: 1.5em;
  }
  </style>
  