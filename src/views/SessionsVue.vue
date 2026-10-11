<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Updated session list with images, dates, and times (Mocked for Oct/Nov 2026)
const sessionList = [
  { id: 'anime', icon: '🎤', image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=800', date: '2026-10-24', time: '19:00 - 22:00' },
  { id: 'pop90', icon: '💿', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', date: '2026-10-31', time: '18:00 - 21:00' },
  { id: 'pop70', icon: '🎸', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800', date: '2026-11-07', time: '19:00 - 22:00' },
  { id: 'jazz', icon: '🎷', image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=800', date: '2026-11-14', time: '18:30 - 21:30' },
  { id: 'country', icon: '🤠', image: 'https://images.unsplash.com/photo-1559184511-b1e779f64834?auto=format&fit=crop&q=80&w=800', date: '2026-11-21', time: '19:00 - 22:00' }
]

const selectedSession = ref<string | null>(null)
const isSubmitted = ref(false)

const reservationForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  instrument: 'vocal',
  otherInstrumentName: '',
  isBringingInstrument: true,
  isBringingDrumsticks: false,
  isRentingDrumsticks: false
})

const openBookingModal = (sessionId: string) => {
  selectedSession.value = sessionId
  isSubmitted.value = false
}

const closeBookingModal = () => {
  selectedSession.value = null
  reservationForm.value = { 
    firstName: '', 
    lastName: '', 
    email: '', 
    instrument: 'vocal',
    otherInstrumentName: '',
    isBringingInstrument: true,
    isBringingDrumsticks: false,
    isRentingDrumsticks: false
  }
}

const submitBooking = () => {
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

    <!-- Instagram Style Card Grid -->
    <div class="ig-grid">
      <div v-for="session in sessionList" :key="session.id" class="ig-card">
        
        <!-- Header: Avatar & Username mimic -->
        <div class="ig-card-header">
          <div class="ig-avatar">{{ session.icon }}</div>
          <span class="ig-username">JamStationLive</span>
        </div>

        <!-- Image -->
        <img :src="session.image" :alt="t(`sessions.${session.id}`)" class="ig-image" loading="lazy" />

        <!-- Content -->
        <div class="ig-card-body">
          <div class="ig-actions">
            <span class="heart-icon">❤️</span>
            <span class="comment-icon">💬</span>
            <span class="share-icon">↗️</span>
          </div>
          
          <h4 class="ig-title">{{ t(`sessions.${session.id}`) }}</h4>
          
          <p class="ig-description">
            <strong>studio_vue_live</strong> {{ t(`sessions.${session.id}Desc`) }}
          </p>

          <div class="ig-meta">
            <span class="ig-date">📅 {{ session.date }}</span>
            <span class="ig-time">⏰ {{ session.time }}</span>
          </div>

          <button class="ig-book-btn" @click="openBookingModal(session.id)">
            {{ t('sessions.bookBtn') }}
          </button>
        </div>

      </div>
    </div>

    <!-- Booking Modal Overlay (Unchanged Form Logic) -->
    <div v-if="selectedSession" class="modal-overlay" @click.self="closeBookingModal">
      <div class="modal-content">
        
        <div v-if="isSubmitted" class="success-message">
          <h3>🎉 {{ t('sessions.success') }}</h3>
          <button @click="closeBookingModal" class="close-btn">{{ t('sessions.cancel') }}</button>
        </div>

        <div v-else>
          <h3>{{ t('sessions.bookTitle', { session: t(`sessions.${selectedSession}`) }) }}</h3>
          
          <form @submit.prevent="submitBooking" class="booking-form">
            
            <div class="form-row">
              <div class="form-group half-width">
                <label for="firstName">{{ t('sessions.firstName') }} *</label>
                <input type="text" id="firstName" v-model="reservationForm.firstName" required />
              </div>
              <div class="form-group half-width">
                <label for="lastName">{{ t('sessions.lastName') }} *</label>
                <input type="text" id="lastName" v-model="reservationForm.lastName" required />
              </div>
            </div>

            <div class="form-group">
              <label for="email">{{ t('sessions.email') }} *</label>
              <input 
                type="email" 
                id="email" 
                v-model="reservationForm.email" 
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                required 
              />
            </div>

            <div class="form-group">
              <label for="instrument">{{ t('sessions.instrument') }} *</label>
              <select id="instrument" v-model="reservationForm.instrument" required>
                <option value="vocal">{{ t('sessions.instruments.vocal') }}</option>
                <option value="guitar">{{ t('sessions.instruments.guitar') }}</option>
                <option value="electric_bass">{{ t('sessions.instruments.electric_bass') }}</option>
                <option value="upright_bass">{{ t('sessions.instruments.upright_bass') }}</option>
                <option value="piano">{{ t('sessions.instruments.piano') }}</option>
                <option value="drums">{{ t('sessions.instruments.drums') }}</option>
                <option value="other">{{ t('sessions.instruments.other') }}</option>
              </select>
            </div>

            <div class="instrument-logic-section">
              
              <div v-if="reservationForm.instrument === 'other'" class="form-group">
                <input 
                  type="text" 
                  v-model="reservationForm.otherInstrumentName" 
                  :placeholder="t('sessions.otherInstrumentPlaceholder')" 
                  required 
                />
              </div>

              <div v-if="['guitar', 'electric_bass'].includes(reservationForm.instrument)" class="checkbox-group">
                <input type="checkbox" id="bringInst" v-model="reservationForm.isBringingInstrument" />
                <label for="bringInst">{{ t('sessions.bringInstrument') }}</label>
              </div>

              <p v-else-if="['piano', 'upright_bass'].includes(reservationForm.instrument)" class="info-text success-text">
                {{ t('sessions.instrumentProvided') }}
              </p>

              <div v-else-if="reservationForm.instrument === 'drums'" class="drum-logic">
                <p class="info-text success-text" style="margin-bottom: 0.8rem;">
                  {{ t('sessions.instrumentProvided') }}
                </p>
                <div class="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="bringSticks" 
                    v-model="reservationForm.isBringingDrumsticks"
                    @change="reservationForm.isRentingDrumsticks = false"
                  />
                  <label for="bringSticks">{{ t('sessions.bringDrumsticks') }}</label>
                </div>
                <div class="checkbox-group" style="margin-top: 0.5rem;">
                  <input 
                    type="checkbox" 
                    id="rentSticks" 
                    v-model="reservationForm.isRentingDrumsticks"
                    @change="reservationForm.isBringingDrumsticks = false"
                  />
                  <label for="rentSticks">{{ t('sessions.rentDrumsticks') }}</label>
                </div>
              </div>

              <p v-else-if="reservationForm.instrument === 'other'" class="info-text warning-text" style="margin-top: 0.5rem;">
                {{ t('sessions.mustBring') }}
              </p>

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
.sessions-container { max-width: 1000px; margin: 0 auto; position: relative; }
.subtitle { text-align: center; margin-bottom: 3rem; font-size: 1.2rem; color: #555; }

/* IG Grid & Cards */
.ig-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  justify-items: center;
}
.ig-card {
  width: 100%;
  max-width: 400px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  color: #262626;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.ig-card-header {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  gap: 0.8rem;
}
.ig-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: white;
}
.ig-username {
  font-weight: 600;
  font-size: 0.9rem;
}

.ig-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
}

.ig-card-body {
  padding: 1rem;
}
.ig-actions {
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
}
.ig-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
}
.ig-description {
  margin: 0 0 0.8rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
}
.ig-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #8e8e8e;
  margin-bottom: 1rem;
}
.ig-book-btn {
  width: 100%;
  padding: 0.6rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.ig-book-btn:hover { background-color: #3aa876; }

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
    gap: 1.2rem; }

.form-row { 
    display: flex; 
    gap: 1rem; 
}

.half-width { 
    flex: 1; 
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
.instrument-logic-section { 
    margin-top: 0.5rem; 
    padding: 1rem; 
    background-color: #f9f9f9; 
    border-radius: 8px; 
    border-left: 4px solid #42b883; 
}

.checkbox-group { 
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 
    font-size: 0.95rem; 
}
.info-text { 
    margin: 0; 
    font-size: 0.9rem; 
    font-weight: bold; 
}

.success-text { 
    color: #2e8b57; 
}

.warning-text { 
    color: #d9534f; 
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