<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedPlan = ref<string | null>(null)

// Step tracking: 1 = Info, 2 = Payment, 3 = Confirm, 4 = Success
const signupStep = ref(1)

const signupForm = ref({
  firstName: '',
  lastName: '',
  email: ''
})

const paymentForm = ref({
  method: 'card', // 'card' or 'paypay'
  cardNumber: '',
  expiry: '',
  cvc: ''
})

const openSignupModal = (planId: string) => {
  selectedPlan.value = planId
  signupStep.value = 1
}

const closeSignupModal = () => {
  selectedPlan.value = null
  signupStep.value = 1
  signupForm.value = { firstName: '', lastName: '', email: '' }
  paymentForm.value = { method: 'card', cardNumber: '', expiry: '', cvc: '' }
}

const proceedToPayment = () => {
  signupStep.value = 2
}

const handleSocialLogin = (provider: string) => {
  // Mock filling the form based on social provider
  signupForm.value.firstName = provider
  signupForm.value.lastName = 'User'
  signupForm.value.email = `mockuser@${provider.toLowerCase()}.com`
  signupStep.value = 2 // Proceed straight to payment
}

const proceedToConfirm = () => {
  signupStep.value = 3
}

const submitFinalRegistration = () => {
  console.log('Final Registration Payload:', {
    plan: selectedPlan.value,
    ...signupForm.value,
    ...paymentForm.value
  })
  signupStep.value = 4 // Show success message
}
</script>

<template>
  <div class="plans-container">
    <h2>{{ t('plans.title') }}</h2>
    
    <div class="grid">
      <!-- Trial Plan -->
      <div class="card trial-card">
        <div class="card-content">
          <h3>{{ t('plans.trial') }}</h3>
          <p>{{ t('plans.trialDesc') }}</p>
          <span class="badge trial-badge">{{ t('plans.onetime') }}</span>
        </div>
        <button class="plan-btn" @click="openSignupModal('trial')">{{ t('plans.selectPlanBtn') }}</button>
      </div>

      <!-- Band Plan -->
      <div class="card">
        <div class="card-content">
          <h3>{{ t('plans.band') }}</h3>
          <p>{{ t('plans.bandDesc') }}</p>
          <span class="badge">{{ t('plans.onetime') }} / {{ t('plans.member') }}</span>
        </div>
        <button class="plan-btn" @click="openSignupModal('band')">{{ t('plans.selectPlanBtn') }}</button>
      </div>
      
      <!-- Solo Plan -->
      <div class="card">
        <div class="card-content">
          <h3>{{ t('plans.solo') }}</h3>
          <p>{{ t('plans.soloDesc') }}</p>
          <span class="badge">{{ t('plans.onetime') }} / {{ t('plans.member') }}</span>
        </div>
        <button class="plan-btn" @click="openSignupModal('solo')">{{ t('plans.selectPlanBtn') }}</button>
      </div>
    </div>

    <div class="membership-banner">
      <h3>👑 {{ t('plans.member') }}</h3>
      <p>{{ t('plans.memberDesc') }}</p>
    </div>

    <!-- Sign Up Modal Overlay -->
    <div v-if="selectedPlan" class="modal-overlay" @click.self="closeSignupModal">
      <div class="modal-content">
        
        <!-- STEP 4: Success -->
        <div v-if="signupStep === 4" class="success-message">
          <h3>🎉 {{ t('plans.successSignup') }}</h3>
          <button @click="closeSignupModal" class="close-btn">{{ t('plans.cancel') }}</button>
        </div>

        <!-- STEP 1 to 3 Wrapper -->
        <div v-else>
          <!-- STEP 1: Personal Info -->
          <div v-if="signupStep === 1">
            <h3>{{ t('plans.signupTitle', { plan: t(`plans.${selectedPlan}`) }) }}</h3>
            <form @submit.prevent="proceedToPayment" class="booking-form">
              <div class="form-row">
                <div class="form-group half-width">
                  <label for="firstName">{{ t('plans.firstName') }} *</label>
                  <input type="text" id="firstName" v-model="signupForm.firstName" required />
                </div>
                <div class="form-group half-width">
                  <label for="lastName">{{ t('plans.lastName') }} *</label>
                  <input type="text" id="lastName" v-model="signupForm.lastName" required />
                </div>
              </div>
              <div class="form-group">
                <label for="email">{{ t('plans.email') }} *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="signupForm.email" 
                  pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                  required 
                />
              </div>
              <div class="form-actions">
                <button type="button" @click="closeSignupModal" class="cancel-btn">{{ t('plans.cancel') }}</button>
                <button type="submit" class="submit-btn">{{ t('plans.nextStep') }}</button>
              </div>
            </form>

            <div class="divider">
              <span>{{ t('plans.orContinueWith') }}</span>
            </div>
            <div class="social-login-group">
              <button type="button" class="social-btn google" @click="handleSocialLogin('Google')">🌐 {{ t('plans.signupGoogle') }}</button>
              <button type="button" class="social-btn apple" @click="handleSocialLogin('Apple')">🍏 {{ t('plans.signupApple') }}</button>
              <button type="button" class="social-btn microsoft" @click="handleSocialLogin('Microsoft')">🪟 {{ t('plans.signupMicrosoft') }}</button>
            </div>
          </div>

          <!-- STEP 2: Payment -->
          <div v-else-if="signupStep === 2">
            <h3>{{ t('plans.paymentTitle') }}</h3>
            <form @submit.prevent="proceedToConfirm" class="booking-form">
              
              <div class="form-group">
                <label>
                  <input type="radio" value="card" v-model="paymentForm.method" />
                  {{ t('plans.creditCard') }}
                </label>
                <label>
                  <input type="radio" value="paypay" v-model="paymentForm.method" />
                  {{ t('plans.paypay') }}
                </label>
              </div>

              <!-- Credit Card Fields -->
              <div v-if="paymentForm.method === 'card'" class="payment-fields">
                <div class="form-group">
                  <label for="cardNumber">{{ t('plans.cardNumber') }} *</label>
                  <input type="text" id="cardNumber" v-model="paymentForm.cardNumber" placeholder="1234 5678 9101 1121" required />
                </div>
                <div class="form-row">
                  <div class="form-group half-width">
                    <label for="expiry">{{ t('plans.expiry') }} *</label>
                    <input type="text" id="expiry" v-model="paymentForm.expiry" placeholder="MM/YY" required />
                  </div>
                  <div class="form-group half-width">
                    <label for="cvc">{{ t('plans.cvc') }} *</label>
                    <input type="text" id="cvc" v-model="paymentForm.cvc" placeholder="123" required />
                  </div>
                </div>
              </div>

              <!-- PayPay Note -->
              <div v-else class="payment-fields paypay-note">
                <p>{{ t('plans.paypayNote') }}</p>
              </div>

              <div class="form-actions">
                <button type="button" @click="signupStep = 1" class="cancel-btn">{{ t('plans.back') }}</button>
                <button type="submit" class="submit-btn">{{ t('plans.nextStep') }}</button>
              </div>
            </form>
          </div>

          <!-- STEP 3: Confirm Details -->
          <div v-else-if="signupStep === 3">
            <h3>{{ t('plans.confirmTitle') }}</h3>
            
            <div class="confirmation-summary">
              <p><strong>{{ t('plans.selectedPlan') }}:</strong> {{ t(`plans.${selectedPlan}`) }}</p>
              <p><strong>{{ t('plans.firstName') }} / {{ t('plans.lastName') }}:</strong> {{ signupForm.firstName }} {{ signupForm.lastName }}</p>
              <p><strong>{{ t('plans.email') }}:</strong> {{ signupForm.email }}</p>
              <p><strong>{{ t('plans.paymentTitle') }}:</strong> 
                {{ paymentForm.method === 'card' ? t('plans.creditCard') : t('plans.paypay') }}
              </p>
            </div>

            <div class="form-actions">
              <button type="button" @click="signupStep = 2" class="cancel-btn">{{ t('plans.back') }}</button>
              <button type="button" @click="submitFinalRegistration" class="submit-btn">{{ t('plans.confirmAndPay') }}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/booking-modal.css';

.plans-container h2 { 
  text-align: center; 
  margin-bottom: 2rem; 
}
.grid { 
  display: flex; 
  gap: 2rem; 
  justify-content: center; 
  flex-wrap: wrap;
  margin-bottom: 3rem; 
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.card-content {
  margin-bottom: 1.5rem;
}
.trial-card {
  border-top: 4px solid #f09433;
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
.plan-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.plan-btn:hover {
  background-color: #3aa876;
}
.membership-banner {
  background-color: #f9f9f9; 
  padding: 2rem; 
  text-align: center; 
  border-radius: 8px; 
  border: 2px solid #42b883;
}

/* Modal specific overrides */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #888;
  font-size: 0.9rem;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}
.divider span {
  padding: 0 10px;
}
.social-login-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.social-btn {
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}
.social-btn:hover {
  background-color: #f5f5f5;
}
.social-btn.google { color: #db4437; }
.social-btn.apple { color: #000000; }
.social-btn.microsoft { color: #00a4ef; }

/* Payment & Confirmation styles */
.payment-fields {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}
.paypay-note {
  color: #555;
  font-weight: 500;
  text-align: center;
}
.confirmation-summary {
  background-color: #f1f8f5;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #c3e6cb;
}
.confirmation-summary p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: #333;
}
</style>