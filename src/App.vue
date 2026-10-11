<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()

// State for the responsive dropdown menu
const isMenuOpen = ref(false)

const toggleLanguage = () => {
  locale.value = locale.value === 'ja' ? 'en' : 'ja'
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// Automatically close the mobile menu when the route changes
watch(route, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="header">
    <div class="logo"><img src="./assets/logo.svg" alt="Jam Station Live Logo" class="logo-img" /></div>
    
    <!-- Hamburger Button (Visible only on mobile/tablet) -->
    <button class="hamburger" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <!-- Navigation Links -->
    <nav :class="{ 'nav-open': isMenuOpen }">
      <RouterLink to="/">{{ $t('nav.home') }}</RouterLink>
      <RouterLink to="/plans">{{ $t('nav.plans') }}</RouterLink>
      <RouterLink to="/sessions">{{ $t('nav.sessions') }}</RouterLink>
      
      <!-- Moved language button inside nav so it drops down on mobile too -->
      <button @click="toggleLanguage" class="lang-btn">
        {{ locale === 'ja' ? 'English' : '日本語' }}
      </button>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
/* Header Base Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  color: white;
  position: relative; /* Required for absolute positioning of dropdown */
}

/* Logo Styles */
.logo {
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.logo-img {
  height: 45px; /* Adjust this value to make the logo larger or smaller */
  width: auto;
  display: block;
}

/* Desktop Navigation */
nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
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
  transition: background-color 0.2s;
}
.lang-btn:hover {
  background-color: #42b883;
}

/* Hamburger Button (Hidden on Desktop) */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
}
.hamburger .bar {
  width: 28px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease-in-out;
}

/* Main Content Container */
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive Dropdown (Tablet & Mobile) */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .hamburger {
    display: flex;
  }

  nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #1a1a1a;
    flex-direction: column;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
    border-top: 1px solid transparent;
    z-index: 90;
  }

  /* When Menu is Open */
  nav.nav-open {
    max-height: 350px; /* Arbitrary large number to allow content to slide down */
    padding: 1.5rem 0;
    border-top-color: #333;
    box-shadow: 0 10px 15px rgba(0,0,0,0.5);
  }

  nav a {
    width: 100%;
    text-align: center;
    padding: 0.8rem 0;
  }

  .lang-btn {
    margin-top: 1rem;
    width: 80%;
    max-width: 200px;
  }

  /* Hamburger Animation */
  .hamburger[aria-expanded="true"] .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .hamburger[aria-expanded="true"] .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger[aria-expanded="true"] .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style>