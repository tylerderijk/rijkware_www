<template>
  <div class="cookie-banner">
    <div class="cookie-banner-content">
      <button class="close-button" @click="closeBanner">x</button>
      <p>By using this website, you agree to our use of cookies. We use cookies to provide you with a great experience and to help our website run effectively. <a href="#" class="cookies-read-more" @click.prevent="openCookiesInfo"> Read more.</a></p>
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
    closeBanner() {
      try {
        console.log("[CookieBanner] User closed the banner without accepting/declining");
        // Just hide the banner without setting any localStorage values
        this.$emit('hideBanner');
      } catch (e) {
        console.error("[CookieBanner] Error in closeBanner:", e);
        // Still hide the banner even if there's an error
        this.$emit('hideBanner');
      }
    },
    acceptCookies() {
      try {
        console.log("[CookieBanner] User accepted cookies");
        localStorage.setItem('posthog_user_consent', 'accepted');

        // Safely call PostHog methods
        try {
          if (this.$posthog && typeof this.$posthog.opt_in_capturing === 'function') {
            console.log("[CookieBanner] Calling PostHog opt_in_capturing");
            this.$posthog.opt_in_capturing();
          } else {
            console.warn("[CookieBanner] PostHog not available or opt_in_capturing not a function");
          }
        } catch (e) {
          console.error("[CookieBanner] Error calling PostHog opt_in_capturing:", e);
        }

        this.$emit('hideBanner');
        this.$emit('acceptBanner');
      } catch (e) {
        console.error("[CookieBanner] Error in acceptCookies:", e);
        // Still hide the banner even if there's an error
        this.$emit('hideBanner');
      }
    },
    declineCookies() {
      try {
        console.log("[CookieBanner] User declined cookies");
        localStorage.setItem('posthog_user_consent', 'declined');

        // Safely call PostHog methods
        try {
          if (this.$posthog && typeof this.$posthog.opt_out_capturing === 'function') {
            console.log("[CookieBanner] Calling PostHog opt_out_capturing");
            this.$posthog.opt_out_capturing();
          } else {
            console.warn("[CookieBanner] PostHog not available or opt_out_capturing not a function");
          }
        } catch (e) {
          console.error("[CookieBanner] Error calling PostHog opt_out_capturing:", e);
        }

        this.$emit('hideBanner');
      } catch (e) {
        console.error("[CookieBanner] Error in declineCookies:", e);
        // Still hide the banner even if there's an error
        this.$emit('hideBanner');
      }
    },
    openCookiesInfo() {
      try {
        console.log("[CookieBanner] Opening cookies info");
        this.$emit('open-cookies');
      } catch (e) {
        console.error("[CookieBanner] Error in openCookiesInfo:", e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cookies-read-more {
  color: #106691;
  text-decoration: none;
}

.cookie {
  &-banner {
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

    &-content {
      position: relative;
    }

    &-buttons {
      // Empty rule for consistency
    }
  }

  &-button {
    color: dimgray;
    margin: 0 8px;
    padding: 4px 12px;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    border: none;
    transition: all 0.3s;

    &-accept:first-child {
      background: #24b924;
      color: black;
    }
  }
}

p {
  padding: 0 48px;

  @media (max-width: 768px) {
    padding: 6px;
  }
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

  @media (max-width: 768px) {
    display: none;
  }
}

@media (max-width: 768px) {
  button {
    border-radius: 4px;
    padding: 4px 12px;
  }
}

</style>
