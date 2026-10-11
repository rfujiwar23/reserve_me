<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Define available sessions to render them dynamically
const sessionList = [
  { id: 'anime', icon: '🎤' },
  { id: 'pop90', icon: '💿' },
  { id: 'pop70', icon: '🎸' },
  { id: 'jazz', icon: '🎷' },
  { id: 'country', icon: '🤠' }
]

// State management for the booking modal
const selectedSession = ref<string | null>(null)
const isSubmitted = ref(false)

const reservationForm = ref({
  name: '',
  email: '',
  instrument: 'vocal'
})

const openBookingModal = (sessionId: string) => {
  selectedSession.value = sessionId
  isSubmitted.value = false
}

const closeBookingModal = () => {
  selectedSession.value = null
  // Reset form data
  reservationForm.value = { name: '', email: '', instrument: 'vocal' }
}

const submitBooking = () => {
  // In a real app, you would send reservationForm.value to a backend API here
  console.log('Booking Payload:', {
    session: selectedSession.value,
    ...reservationForm.value
  })
  isSubmitted.value = true
}
</script>

<template>
  <div class="sessions-container">
    <h2>{{ t('sessions.title') }}</h2>
    <p class="subtitle">{{ t('sessions.subtitle') }}</p>

    <!-- Session List -->
    <ul class="session-list">
      <li 
        v-for="session in sessionList" 
        :key="session.id"
        :class="['session-item', session.id]"
        @click="openBookingModal(session.id)"
      >
        {{ session.icon }} {{ t(`sessions.${session.id}`) }}
      </li>
    </ul>

    <!-- Booking Modal Overlay -->
    <div v-if="selectedSession" class="modal-overlay" @click.self="closeBookingModal">
      <div class="modal-content">
        
        <!-- Success State -->
        <div v-if="isSubmitted" class="success-message">
          <h3>🎉 {{ t('sessions.success') }}</h3>
          <button @click="closeBookingModal" class="close-btn">{{ t('sessions.cancel') }}</button>
        </div>

        <!-- Booking Form -->
        <div v-else>
          <h3>{{ t('sessions.bookTitle', { session: t(`sessions.${selectedSession}`) }) }}</h3>
          
          <form @submit.prevent="submitBooking" class="booking-form">
            <div class="form-group">
              <label for="name">{{ t('sessions.name') }}</label>
              <input type="text" id="name" v-model="reservationForm.name" required />
            </div>

            <div class="form-group">
              <label for="email">{{ t('sessions.email') }}</label>
              <input type="email" id="email" v-model="reservationForm.email" required />
            </div>

            <div class="form-group">
              <label for="instrument">{{ t('sessions.instrument') }}</label>
              <select id="instrument" v-model="reservationForm.instrument" required>
                <option value="vocal">{{ t('sessions.instruments.vocal') }}</option>
                <option value="guitar">{{ t('sessions.instruments.guitar') }}</option>
                <option value="bass">{{ t('sessions.instruments.bass') }}</option>
                <option value="piano">{{ t('sessions.instruments.piano') }}</option>
                <option value="drums">{{ t('sessions.instruments.drums') }}</option>
                <option value="other">{{ t('sessions.instruments.other') }}</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="button" @click="closeBookingModal" class="cancel-btn">{{ t('sessions.cancel') }}</button>
              <button type="submit" class="submit-btn">{{ t('sessions.submit') }}</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.sessions-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
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
  cursor: pointer;
}
.session-item:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Colorful themes */
.anime { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333; }
.pop90 { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }
.pop70 { background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); }
.jazz { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }
.country { background: linear-gradient(135deg, #cd9cf2 0%, #f6f3ff 100%); color: #333; }

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  color: #333;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-group label {
  font-weight: bold;
  font-size: 0.9rem;
}
.form-group input, .form-group select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
.submit-btn, .cancel-btn, .close-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.submit-btn {
  background-color: #42b883;
  color: white;
  font-weight: bold;
}
.cancel-btn {
  background-color: #f1f1f1;
  color: #333;
}
.close-btn {
  background-color: #333;
  color: white;
  margin-top: 1rem;
  width: 100%;
}
.success-message {
  text-align: center;
}
</style>