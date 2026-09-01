<script setup>
import { onMounted, ref } from 'vue'
import { useWorkoutStore } from '../../stores/workout.js'

import WorkoutCard from './WorkoutCard.vue'

const emit = defineEmits(['edit'])

const workoutStore = useWorkoutStore()

const actionError = ref('')

const loadWorkouts = async () => {
  actionError.value = ''

  try {
    await workoutStore.getMyWorkouts()
  } catch (error) {
    actionError.value = error.message
  }
}

const completeWorkout = async (workout) => {
  actionError.value = ''

  try {
    await workoutStore.completeWorkoutStatus(workout._id)
  } catch (error) {
    actionError.value = error.message
  }
}

const deleteWorkout = async (workout) => {
  actionError.value = ''

  const confirmed = window.confirm(
    `Are you sure you want to delete "${workout.name}"?`
  )

  if (!confirmed) {
    return
  }

  try {
    await workoutStore.deleteWorkout(workout._id)
  } catch (error) {
    actionError.value = error.message
  }
}

onMounted(() => {
  loadWorkouts()
})
</script>

<template>
  <section class="workout-list">

    <header class="list-header">
      <div>
        <h2>Your Workouts</h2>

        <p>
          {{ workoutStore.workoutCount }}
          {{ workoutStore.workoutCount === 1 ? 'workout' : 'workouts' }}
        </p>
      </div>

      <button
        type="button"
        class="refresh-button"
        :disabled="workoutStore.isLoading"
        @click="loadWorkouts"
      >
        {{ workoutStore.isLoading ? 'Refreshing...' : 'Refresh' }}
      </button>
    </header>

    <p
      v-if="actionError"
      class="list-message list-message-error"
      role="alert"
    >
      {{ actionError }}
    </p>

    <div
      v-if="workoutStore.isLoading && !workoutStore.workouts.length"
      class="list-state"
    >
      Loading your workouts...
    </div>

    <div
      v-else-if="!workoutStore.workouts.length"
      class="list-state"
    >
      <h3>No workouts yet</h3>

      <p>
        Add your first workout to start tracking your progress.
      </p>
    </div>

    <div
      v-else
      class="workout-items"
    >
      <WorkoutCard
        v-for="workout in workoutStore.workouts"
        :key="workout._id"
        :workout="workout"
        @edit="emit('edit', $event)"
        @complete="completeWorkout"
        @delete="deleteWorkout"
      />
    </div>

  </section>
</template>

<style scoped>
.workout-list {
  width: 100%;
}


/* HEADER */

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--spacing-lg);

  margin-bottom: var(--spacing-lg);
}

.list-header h2 {
  margin-bottom: var(--spacing-xs);

  font-size: var(--font-size-2xl);
}

.list-header p {
  color: var(--color-text-muted);

  font-size: var(--font-size-sm);
}


/* REFRESH BUTTON */

.refresh-button {
  padding:
    var(--spacing-sm)
    var(--spacing-md);

  color: var(--color-text);
  background-color: var(--color-surface);

  border:
    var(--border-width-thin)
    solid
    var(--color-border);

  border-radius: var(--border-radius-md);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.refresh-button:hover:not(:disabled) {
  background-color: var(--color-surface-elevated);

  border-color: var(--color-text-muted);
}

.refresh-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}


/* MESSAGES */

.list-message {
  margin-bottom: var(--spacing-lg);

  padding: var(--spacing-md);

  border-radius: var(--border-radius-md);

  font-size: var(--font-size-sm);
}

.list-message-error {
  color: var(--color-danger);

  background-color:
    rgb(var(--color-danger-rgb) / 0.08);

  border:
    var(--border-width-thin)
    solid
    rgb(var(--color-danger-rgb) / 0.20);
}


/* STATES */

.list-state {
  padding: var(--spacing-2xl);

  color: var(--color-text-secondary);

  background-color: var(--color-surface);

  border:
    var(--border-width-thin)
    solid
    var(--color-border);

  border-radius: var(--border-radius-lg);

  text-align: center;
}

.list-state h3 {
  margin-bottom: var(--spacing-sm);

  font-size: var(--font-size-lg);
}

.list-state p {
  color: var(--color-text-muted);

  font-size: var(--font-size-sm);
}


/* WORKOUT ITEMS */

.workout-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);

  max-height: 520px;

  overflow-y: auto;

  padding-right: var(--spacing-sm);
}


/* WORKOUT LIST SCROLLBAR */

.workout-items::-webkit-scrollbar {
  width: 6px;
}

.workout-items::-webkit-scrollbar-track {
  background-color: transparent;
}

.workout-items::-webkit-scrollbar-thumb {
  background-color: var(--color-border);

  border-radius: var(--border-radius-full);
}

.workout-items::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-text-muted);
}


/* RESPONSIVE */

@media (max-width: 480px) {
  .list-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .refresh-button {
    width: 100%;
  }

  .workout-items {
    max-height: 480px;

    padding-right: 0;
  }
}

</style>