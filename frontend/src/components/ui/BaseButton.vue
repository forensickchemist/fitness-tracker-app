<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },

  variant: {
    type: String,
    default: 'primary'
  },

  disabled: {
    type: Boolean,
    default: false
  },

  loading: {
    type: Boolean,
    default: false
  },

  loadingText: {
    type: String,
    default: 'Loading...'
  }
})
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="`base-button-${variant}`"
    :disabled="disabled || loading"
  >
    <span v-if="loading">
      {{ loadingText }}
    </span>


<slot v-else />


  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.7rem 1rem;

  border:
    var(--border-width-thin)
    solid
    transparent;

  border-radius: var(--border-radius-md);

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);

  cursor: pointer;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}


/* PRIMARY */

.base-button-primary {
  color: #ffffff;
  background-color: var(--color-primary);
}

.base-button-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);

  box-shadow:
    0 4px 16px
    rgb(var(--color-primary-rgb) / 0.25);
}

.base-button-primary:active:not(:disabled) {
  background-color: var(--color-primary-active);

  transform: translateY(1px);
}


/* SECONDARY */

.base-button-secondary {
  color: var(--color-text);
  background-color: var(--color-surface-elevated);

  border-color: var(--color-border);
}

.base-button-secondary:hover:not(:disabled) {
  border-color: var(--color-text-muted);
}

.base-button-secondary:active:not(:disabled) {
  transform: translateY(1px);
}


/* SUCCESS */

.base-button-success {
  color: #000000;
  background-color: var(--color-success);
}

.base-button-success:hover:not(:disabled) {
  background-color: var(--color-success-hover);

  box-shadow:
    0 4px 16px
    rgb(var(--color-success-rgb) / 0.20);
}

.base-button-success:active:not(:disabled) {
  transform: translateY(1px);
}


/* DANGER */

.base-button-danger {
  color: #ffffff;
  background-color: var(--color-danger);
}

.base-button-danger:hover:not(:disabled) {
  background-color: var(--color-danger-hover);

  box-shadow:
    0 4px 16px
    rgb(var(--color-danger-rgb) / 0.20);
}

.base-button-danger:active:not(:disabled) {
  transform: translateY(1px);
}


/* DISABLED */

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}


/* FOCUS */

.base-button:focus-visible {
  outline:
    var(--focus-ring-width)
    solid
    var(--focus-ring-color);

  outline-offset: var(--focus-ring-offset);
}


/* REDUCED MOTION */

@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;
  }
}
</style>
