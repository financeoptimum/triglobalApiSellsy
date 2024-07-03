<template>
  <div class="container">
    <h1>Application de creation Automatique des Opportunités dans Sellsy A Partir des Leads Triglobal</h1>
    <!-- <p>Nombre de Leads Recus : {{ postCount }}</p>
    <p>Heure actuelle : {{ currentTime }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePostCounterStore } from './server/stores/postCounter';

const leadData = ref('');

const sendLead = async () => {
  try {
    const response = await fetch('/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lead: leadData.value })
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du lead:', error);
  }

}
  
const postCount = ref(0);
const currentTime = ref('');
const postCounterStore = usePostCounterStore();

const updateCurrentTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

onMounted(async () => {
  // Fetch the initial count from the server
  const response = await fetch('/countPosts', {
    method: 'POST'
  });
  const data = await response.json();
  postCount.value = data.postCount;
  postCounterStore.setCount(data.postCount);

  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(135deg, #0a0a23, #1b1b3a, #272745); /* Luxurious gradient background */
  color: #ffffff;
  font-family: 'Inter', Arial, sans-serif;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for a lifted effect */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
}
</style>