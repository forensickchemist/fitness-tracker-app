<script setup>
import { ref, computed, watch } from 'vue'
import { useWorkoutStore } from '../../stores/workout.js'

import BaseForm from '../ui/BaseForm.vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseButton from '../ui/BaseButton.vue'

const props = defineProps({
  workout: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['saved', 'cancel'])

const workoutStore = useWorkoutStore()

const name = ref('')
const duration = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const isEditing = computed(() => !!props.workout)

const formTitle = computed(() =>
  isEditing.value ? 'Edit Workout' : 'Add Workout'
)

const formDescription = computed(() =>
  isEditing.value
    ? 'Update your workout details.'
    : 'Add a workout to your fitness tracker.'
)

const submitText = computed(() =>
  isEditing.value ? 'Update Workout' : 'Add Workout'
)

const loadingText = computed(() =>
  isEditing.value ? 'Updating Workout...' : 'Adding Workout...'
)

const resetForm = () => {
  name.value = props.workout?.name || ''
  duration.value = props.workout?.duration
    ? String(props.workout.duration)
    : ''

  errorMessage.value = ''
  successMessage.value = ''
}

watch(
  () => props.workout,
  () => {
    resetForm()
  },
  { immediate: true }
)

const submitWorkout = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!name.value.trim() || !duration.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  const parsedDuration = Number(duration.value)

  if (!Number.isInteger(parsedDuration) || parsedDuration < 1) {
    errorMessage.value =
      'Duration must be a whole number greater than 0.'
    return
  }

  try {
    isLoading.value = true

    if (isEditing.value) {
      await workoutStore.updateWorkout(
        props.workout._id,
        name.value.trim(),
        parsedDuration
      )

      successMessage.value = 'Workout updated successfully.'
    } else {
      await workoutStore.addWorkout(
        name.value.trim(),
        parsedDuration
      )

      successMessage.value = 'Workout added successfully.'
    }

    emit('saved')

    if (!isEditing.value) {
      name.value = ''
      duration.value = ''
    }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <BaseForm
    :title="formTitle"
    :description="formDescription"
    :error-message="errorMessage"
    :success-message="successMessage"
    :loading="isLoading"
    :submit-text="submitText"
    :loading-text="loadingText"
    @submit="submitWorkout"
  >


<BaseInput
  id="workout-name"
  v-model="name"
  label="Workout Name"
  type="text"
  placeholder="e.g. Running"
  autocomplete="off"
  required
/>

<BaseInput
  id="workout-duration"
  v-model="duration"
  label="Duration (minutes)"
  type="number"
  placeholder="e.g. 30"
  autocomplete="off"
  required
/>

<div
  v-if="isEditing"
  class="form-actions"
>
  <BaseButton
    type="button"
    variant="secondary"
    :disabled="isLoading"
    @click="emit('cancel')"
  >
    Cancel
  </BaseButton>
</div>


  </BaseForm>
</template>

<style scoped>
.form-actions {
  display: flex;
  justify-content: flex-end;

  margin-top: var(--spacing-md);
}
</style>
