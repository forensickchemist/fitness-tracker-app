<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  errorMessage: {
    type: String,
    default: ''
  },

  successMessage: {
    type: String,
    default: ''
  },

  loading: {
    type: Boolean,
    default: false
  },

  submitText: {
    type: String,
    default: 'Submit'
  },

  loadingText: {
    type: String,
    default: 'Submitting...'
  }
})

defineEmits(['submit'])
</script>

<template>
  <section class="form-card">


<header
  v-if="title || description"
  class="form-header"
>
  <h1 v-if="title">
    {{ title }}
  </h1>

  <p v-if="description">
    {{ description }}
  </p>
</header>

<form @submit.prevent="$emit('submit')">

  <slot />

  <p
    v-if="errorMessage"
    class="form-message form-message-error"
    role="alert"
  >
    {{ errorMessage }}
  </p>

  <p
    v-if="successMessage"
    class="form-message form-message-success"
    role="status"
  >
    {{ successMessage }}
  </p>

  <BaseButton
    type="submit"
    :loading="loading"
    :loading-text="loadingText"
    full-width
  >
    {{ submitText }}
  </BaseButton>

</form>

<footer
  v-if="$slots.footer"
  class="form-footer"
>
  <slot name="footer" />
</footer>


  </section>
</template>

<style scoped>
.form-card {
  width: 100%;
  max-width: 480px;

  margin-inline: auto;

  padding: var(--spacing-2xl);

  background-color: var(--color-surface);

  border:
    var(--border-width-thin)
    solid
    var(--color-border);

  border-radius: var(--border-radius-xl);

  box-shadow: var(--shadow-lg);
}


/* HEADER */

.form-header {
  margin-bottom: var(--spacing-xl);

  text-align: center;
}

.form-header h1 {
  margin-bottom: var(--spacing-sm);

  color: var(--color-text);

  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.form-header p {
  color: var(--color-text-secondary);

  font-size: var(--font-size-base);
}


/* MESSAGES */

.form-message {
  margin-top: var(--spacing-lg);

  padding: var(--spacing-md);

  border-radius: var(--border-radius-md);

  font-size: var(--font-size-sm);
}

.form-message-error {
  color: var(--color-danger);

  background-color:
    rgb(var(--color-danger-rgb) / 0.08);

  border:
    var(--border-width-thin)
    solid
    rgb(var(--color-danger-rgb) / 0.20);
}

.form-message-success {
  color: var(--color-success);

  background-color:
    rgb(var(--color-success-rgb) / 0.08);

  border:
    var(--border-width-thin)
    solid
    rgb(var(--color-success-rgb) / 0.20);
}


/* FOOTER */

.form-footer {
  margin-top: var(--spacing-xl);

  color: var(--color-text-muted);

  text-align: center;
  font-size: var(--font-size-sm);
}


/* RESPONSIVE */

@media (max-width: 480px) {
  .form-card {
    padding: var(--spacing-xl);

    border-radius: var(--border-radius-lg);
  }
}
</style>
