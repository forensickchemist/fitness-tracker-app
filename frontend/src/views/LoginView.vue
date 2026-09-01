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

const errorMessage = ref('')
const isLoading = ref(false)

const login = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  try {
    isLoading.value = true

    await authStore.login(email.value, password.value)

    router.push({ name: 'workouts' })
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
        title="Welcome Back"
        description="Log in to continue tracking your workouts."
        :error-message="errorMessage"
        :loading="isLoading"
        submit-text="Log In"
        loading-text="Logging in..."
        @submit="login"
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
          autocomplete="current-password"
          required
        />

        <template #footer>
          Don't have an account?
          <RouterLink to="/register">
            Create an account
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