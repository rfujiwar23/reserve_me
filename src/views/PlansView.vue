<script setup lang="ts">
</script>

<template>
  <div class="plans-container">
    <h2>{{ $t('plans.title') }}</h2>
    
    <div class="grid">
      <div class="card">
        <h3>{{ $t('plans.band') }}</h3>
        <p>{{ $t('plans.bandDesc') }}</p>
        <span class="badge">{{ $t('plans.onetime') }} / {{ $t('plans.member') }}</span>
      </div>
      
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
.plans-container h2 { text-align: center; margin-bottom: 2rem; }
.grid { display: flex; gap: 2rem; justify-content: center; margin-bottom: 3rem; }
.card {
  border: 1px solid #ddd; padding: 2rem; border-radius: 8px; width: 300px;
}
.badge { display: inline-block; margin-top: 1rem; font-size: 0.85rem; color: #666; }
.membership-banner {
  background-color: #f9f9f9; padding: 2rem; text-align: center; border-radius: 8px; border: 2px solid #42b883;
}
</style>