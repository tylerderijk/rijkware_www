<template>
  <div class="cookie-banner">
    <div class="cookie-banner-content">
      <button class="close-button" @click="acceptCookies">x</button>
      <p>By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively.</p>
      <div class="cookie-banner-buttons">
        <button class="cookie-button cookie-button-accept" @click="acceptCookies">Accept</button>
        <button class="cookie-button" @click="declineCookies">Deny</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookieBanner',
  methods: {
    acceptCookies() {
      localStorage.setItem('posthog_user_consent', 'accepted');
      this.$posthog.opt_in_capturing();
      this.$emit('hideBanner');
    },
    declineCookies() {
      localStorage.setItem('posthog_user_consent', 'declined');
      this.$posthog.opt_out_capturing();
      this.$emit('hideBanner');
    }
  }
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  z-index: 99999;
  height: fit-content;
  color: #e1e1e1;
  padding: 18px 0;
  background-color: rgba(255, 255, 255, 0.074);
  width: 100%;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(12px);
  top: 0;
  left: 0;
}

p {
  padding: 0 48px;
}

.cookie-banner-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: 0px;
  right: 20px;
  background: transparent;
  border: none;
  color: #757575;
  font-size: 16px;
  cursor: pointer;
}

.cookie-button {
  color: dimgray;
  margin: 0 8px;
  padding: 4px 12px;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.cookie-button-accept:first-child {
  background: #24b924;
  color: black;
}

@media (max-width: 768px) {
  p {
    padding: 6px;
  }
  button {
    border-radius: 4px;
    padding: 4px 12px;
  }
  .close-button {
    display: none;
  }
}

</style>