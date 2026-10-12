<!-- <script setup lang="ts">
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
</style> -->

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSessions = () => {
  router.push('/sessions')
}
</script>

<template>

  <div class="hero-container">

    <img src="../assets/hero-image.jpg" alt="Studio Background" class="hero-bg" />
    
    <!-- Hero Content Overlay -->
    <div class="hero-content">
      <h1>{{ $t('hero.title') }}</h1>
      <p>{{ $t('hero.subtitle') }}</p>
      <button class="book-btn" @click="goToSessions">{{ $t('hero.book') }}</button>
    </div>
  </div>
</template>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  /* Darkens the image by 50% so the white text pops */
  filter: brightness(0.5); 
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: #e0e0e0;
}

.book-btn {
  background-color: #42b883;
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.book-btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1rem;
  }
  .hero-container {
    height: 50vh;
  }
}
</style>