<template>
    <div class="container">
      <h1 class="title">Décompte des Requêtes POST</h1>
      <p class="counter">Nombre de requêtes POST reçues : </p>
    </div>
  </template>
  
  <script setup lang="ts">
//   import { usePostCounterStore } from '~/stores/postCounter';
//   const postCounterStore = usePostCounterStore();
//   const { postCount } = storeToRefs(postCounterStore);
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
  