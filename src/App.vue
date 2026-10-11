<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, RouterView } from 'vue-router'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'ja' ? 'en' : 'ja'
}
</script>

<template>
  <header class="header">
    <div class="logo">JamStation</div>
    <nav>
      <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
      <RouterLink to="/plans">{{ $t('nav.plans') }}</RouterLink>
      <RouterLink to="/sessions">{{ $t('nav.sessions') }}</RouterLink>
    </nav>
    <button @click="toggleLanguage" class="lang-btn">
      {{ locale === 'ja' ? 'English' : '日本語' }}
    </button>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
}
nav a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
}
nav a:hover, nav a.router-link-active {
  color: #42b883;
}
.lang-btn {
  background: transparent;
  color: white;
  border: 1px solid #42b883;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>