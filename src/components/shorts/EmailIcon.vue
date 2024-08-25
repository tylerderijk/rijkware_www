<script>
export default {
  name: 'EmailIcon',
  props: {
    employeeName: {
      type: String,
      required: true,
    },
  },
  methods: {
    captureCustomEvent() {
      this.$posthog.capture('email_icon_clicked', {
        'employee': this.employeeName
      })
    }
  }
}
</script>

<template>
  <svg @click="captureCustomEvent" width="28" height="28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <path d="m22 6-10 7L2 6"></path>
  </svg>
</template>

<style scoped>

</style>