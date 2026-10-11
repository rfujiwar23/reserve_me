<script setup lang="ts">
// Simple landing page
</script>

<template>
  <div class="hero">
    <h1>{{ $t('hero.title') }}</h1>
    <p>{{ $t('hero.subtitle') }}</p>
    <button class="book-btn">{{ $t('hero.book') }}</button>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-top: 5rem;
}
h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.book-btn {
  margin-top: 2rem;
  background-color: #42b883;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>