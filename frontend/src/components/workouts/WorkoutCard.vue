<script setup>
import BaseButton from '../ui/BaseButton.vue'

defineProps({
  workout: {
    type: Object,
    required: true
  }
})

defineEmits([
  'edit',
  'complete',
  'delete'
])
</script>

<template>
  <article class="workout-card">


<div class="workout-content">

  <div class="workout-info">
    <h3 class="workout-name">
      {{ workout.name }}
    </h3>

    <p class="workout-duration">
      {{ workout.duration }} minutes
    </p>

    <p class="workout-date">
      Added:
      {{ new Date(workout.dateAdded).toLocaleDateString() }}
    </p>
  </div>

  <span
    class="workout-status"
    :class="`workout-status-${workout.status}`"
  >
    {{ workout.status }}
  </span>

</div>

<div class="workout-actions">

  <BaseButton
    variant="secondary"
    @click="$emit('edit', workout)"
  >
    Edit
  </BaseButton>

  <BaseButton
    v-if="workout.status !== 'completed'"
    variant="success"
    @click="$emit('complete', workout)"
  >
    Complete
  </BaseButton>

  <BaseButton
    variant="danger"
    @click="$emit('delete', workout)"
  >
    Delete
  </BaseButton>

</div>


  </article>
</template>

<style scoped>
.workout-card {
  padding: var(--spacing-lg);

  background-color: var(--color-surface);

  border:
    var(--border-width-thin)
    solid
    var(--color-border);

  border-radius: var(--border-radius-lg);

  box-shadow: var(--shadow-sm);

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.workout-card:hover {
  border-color: var(--color-text-muted);

  box-shadow: var(--shadow-md);
}


/* CONTENT */

.workout-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.workout-name {
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
}

.workout-duration {
  color: var(--color-text-secondary);

  font-size: var(--font-size-sm);
}

.workout-date {
  margin-top: var(--spacing-sm);

  color: var(--color-text-muted);

  font-size: var(--font-size-xs);
}


/* STATUS */

.workout-status {
  flex-shrink: 0;

  padding:
    var(--spacing-xs)
    var(--spacing-sm);

  border-radius: var(--border-radius-full);

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);

  text-transform: capitalize;
}

.workout-status-pending {
  color: var(--color-warning);

  background-color:
    rgb(var(--color-warning-rgb) / 0.10);
}

.workout-status-completed {
  color: var(--color-success);

  background-color:
    rgb(var(--color-success-rgb) / 0.10);
}


/* ACTIONS */

.workout-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);

  margin-top: var(--spacing-lg);
}


/* RESPONSIVE */

@media (max-width: 480px) {
  .workout-content {
    flex-direction: column;
  }

  .workout-actions {
    flex-direction: column;
  }

  .workout-actions :deep(.base-button) {
    width: 100%;
  }
}
</style>
