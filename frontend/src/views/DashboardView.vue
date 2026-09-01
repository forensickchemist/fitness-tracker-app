<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import BaseButton from '../components/ui/BaseButton.vue'
import WorkoutForm from '../components/workouts/WorkoutForm.vue'
import WorkoutList from '../components/workouts/WorkoutList.vue'

const router = useRouter()
const authStore = useAuthStore()

const selectedWorkout = ref(null)

const startEditing = (workout) => {
  selectedWorkout.value = workout

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleWorkoutSaved = () => {
  selectedWorkout.value = null
}

const cancelEditing = () => {
  selectedWorkout.value = null
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <main class="dashboard-page">


<div class="container">

  <header class="dashboard-header">

    <div class="dashboard-welcome">
      <p class="dashboard-eyebrow">
        Fitness Tracker
      </p>

      <h1>
        Welcome back!
      </h1>

      <p
        v-if="authStore.user"
        class="dashboard-user"
      >
        {{ authStore.user.email }}
      </p>
    </div>

    <BaseButton
      variant="secondary"
      @click="logout"
    >
      Log Out
    </BaseButton>

  </header>


  <section class="dashboard-content">

    <WorkoutForm
      :workout="selectedWorkout"
      @saved="handleWorkoutSaved"
      @cancel="cancelEditing"
    />

    <WorkoutList
      @edit="startEditing"
    />

  </section>

</div>


  </main>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;

  padding:
    var(--spacing-2xl)
    0;
}


/* =========================================================
   HEADER
   ========================================================= */

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--spacing-lg);

  margin-bottom: var(--spacing-2xl);
}

.dashboard-eyebrow {
  margin-bottom: var(--spacing-xs);

  color: var(--color-primary);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.dashboard-welcome h1 {
  margin-bottom: var(--spacing-xs);

  font-size: var(--font-size-3xl);
}

.dashboard-user {
  color: var(--color-text-primary);

  font-size: var(--font-size-sm);
}


/* =========================================================
   CONTENT
   ========================================================= */

.dashboard-content {
  display: grid;

  grid-template-columns:
    minmax(280px, 400px)
    minmax(0, 1fr);

  gap: var(--spacing-2xl);

  align-items: start;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding:
      var(--spacing-xl)
      0;
  }

  .dashboard-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard-header :deep(.base-button) {
    width: 100%;
  }
}
</style>
