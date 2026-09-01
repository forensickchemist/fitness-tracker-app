<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },

  id: {
    type: String,
    required: true
  },

  label: {
    type: String,
    required: true
  },

  type: {
    type: String,
    default: 'text'
  },

  placeholder: {
    type: String,
    default: ''
  },

  autocomplete: {
    type: String,
    default: ''
  },

  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group label {
  display: block;

  margin-bottom: var(--spacing-sm);

  color: var(--color-text);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.form-group input {
  width: 100%;

  padding: 0.75rem 1rem;

  color: var(--color-text);
  background-color: var(--color-surface-elevated);

  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius-md);

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
}

.form-group input:hover {
  border-color: var(--color-text-muted);
}

.form-group input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgb(var(--color-primary-rgb) / 0.15);
}

.form-group input::placeholder {
  color: var(--color-text-disabled);
}
</style>