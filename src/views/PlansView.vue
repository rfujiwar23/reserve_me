<script setup lang="ts">
</script>

<template>
  <div class="plans-container">
    <h2>{{ $t('plans.title') }}</h2>
    
    <div class="grid">
      <!-- Trial Plan (New) -->
      <div class="card trial-card">
        <h3>{{ $t('plans.trial') }}</h3>
        <p>{{ $t('plans.trialDesc') }}</p>
        <span class="badge trial-badge">{{ $t('plans.onetime') }}</span>
      </div>

      <!-- Band Plan -->
      <div class="card">
        <h3>{{ $t('plans.band') }}</h3>
        <p>{{ $t('plans.bandDesc') }}</p>
        <span class="badge">{{ $t('plans.onetime') }} / {{ $t('plans.member') }}</span>
      </div>
      
      <!-- Solo Plan -->
      <div class="card">
        <h3>{{ $t('plans.solo') }}</h3>
        <p>{{ $t('plans.soloDesc') }}</p>
        <span class="badge">{{ $t('plans.onetime') }} / {{ $t('plans.member') }}</span>
      </div>
    </div>

    <div class="membership-banner">
      <h3>👑 {{ $t('plans.member') }}</h3>
      <p>{{ $t('plans.memberDesc') }}</p>
    </div>
  </div>
</template>

<style scoped>
.plans-container h2 { 
  text-align: center; 
  margin-bottom: 2rem; 
}
.grid { 
  display: flex; 
  gap: 2rem; 
  justify-content: center; 
  flex-wrap: wrap; /* Allows cards to wrap to the next line on smaller screens */
  margin-bottom: 3rem; 
}
.card {
  border: 1px solid #ddd; 
  padding: 2rem; 
  border-radius: 8px; 
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.trial-card {
  border-top: 4px solid #f09433; /* Gives the trial card a distinct accent color */
}
.badge { 
  display: inline-block; 
  margin-top: 1rem; 
  font-size: 0.85rem; 
  color: #666; 
  background-color: #f1f1f1;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
.trial-badge {
  background-color: #ffe8cc;
  color: #d97706;
  font-weight: bold;
}
.membership-banner {
  background-color: #f9f9f9; 
  padding: 2rem; 
  text-align: center; 
  border-radius: 8px; 
  border: 2px solid #42b883;
}
</style>