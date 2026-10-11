<script setup lang="ts">
</script>

<template>
  <div class="sessions-container">
    <h2>{{ $t('sessions.title') }}</h2>
    <p class="subtitle">{{ $t('sessions.subtitle') }}</p>

    <ul class="session-list">
      <li class="session-item anime">🎤 {{ $t('sessions.anime') }}</li>
      <li class="session-item pop90">💿 {{ $t('sessions.pop90') }}</li>
      <li class="session-item pop70">🎸 {{ $t('sessions.pop70') }}</li>
      <li class="session-item jazz">🎷 {{ $t('sessions.jazz') }}</li>
      <li class="session-item country">🤠 {{ $t('sessions.country') }}</li>
    </ul>
  </div>
</template>

<style scoped>
.sessions-container {
  max-width: 800px;
  margin: 0 auto;
}
.subtitle {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.2rem;
  color: #555;
}
.session-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.session-item {
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  transition: transform 0.2s;
}
.session-item:hover {
  transform: scale(1.02);
  cursor: pointer;
}
/* Colorful themes */
.anime { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333; }
.pop90 { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
.pop70 { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
.jazz { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }
.country { background: linear-gradient(135deg, #cd9cf2 0%, #f6f3ff 100%); color: #333; }
</style>