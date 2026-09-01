<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import BaseForm from '../components/ui/BaseForm.vue'
import BaseInput from '../components/ui/BaseInput.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const register = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    isLoading.value = true

    await authStore.register(email.value, password.value)

    successMessage.value =
      'Registration successful! Redirecting to login...'

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="auth-page">

    <div class="container">

      <BaseForm
        title="Create Account"
        description="Start tracking your workouts today."
        :error-message="errorMessage"
        :success-message="successMessage"
        :loading="isLoading"
        submit-text="Create Account"
        loading-text="Creating Account..."
        @submit="register"
      >

        <BaseInput
          id="email"
          v-model="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          autocomplete="email"
          required
        />

        <BaseInput
          id="password"
          v-model="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autocomplete="new-password"
          required
        />

        <BaseInput
          id="confirm-password"
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          autocomplete="new-password"
          required
        />

        <template #footer>
          Already have an account?
          <RouterLink to="/login">
            Log in
          </RouterLink>
        </template>

      </BaseForm>

    </div>

  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;

  display: flex;
  align-items: center;

  padding: var(--spacing-xl) 0;
}
</style>