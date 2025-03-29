<template>
  <div class="app">
    <CookieBanner v-if="showBanner" :class="{ 'app__banner--active': showBanner }" @hideBanner="showBanner = false"
                  @acceptBanner="handleCookieBanner(true)"/>
    <div :class="{ 'app__content': showBanner }" class="app__content">
      <NavBar 
        :showMobileNav="showMobileNav" 
        @toggle-menu="toggleMenu"
        @open-terms="openTermsModal" 
        @open-privacy="openPrivacyModal" 
        @open-cookies="openCookiesModal"
      ></NavBar>
      <AboutUsComponent/>
      <ManifestoComponent/>
      <ContactComponent/>
      <FooterComponent 
        @open-terms="openTermsModal" 
        @open-privacy="openPrivacyModal" 
        @open-cookies="openCookiesModal"
      />
    </div>

    <!-- Policy Modals -->
    <ModalComponent :show="showTermsModal" @close="closeTermsModal">
      <TermsAndConditions />
    </ModalComponent>

    <ModalComponent :show="showPrivacyModal" @close="closePrivacyModal">
      <PrivacyPolicy @open-cookies="openCookiesModal" />
    </ModalComponent>

    <ModalComponent :show="showCookiesModal" @close="closeCookiesModal">
      <CookiesPolicy />
    </ModalComponent>
  </div>
</template>

<script>
import CookieBanner from "@/components/shorts/CookieBanner.vue";
import NavBar from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import AboutUsComponent from "@/components/AboutUsComponent.vue";
import ContactComponent from "@/components/ContactComponent.vue";
import ManifestoComponent from "@/components/ManifestoComponent.vue";
import ModalComponent from "@/components/shorts/ModalComponent.vue";
import TermsAndConditions from "@/components/TermsAndConditions.vue";
import PrivacyPolicy from "@/components/PrivacyPolicy.vue";
import CookiesPolicy from "@/components/CookiesPolicy.vue";

export default {
  name: 'App',
  data() {
    return {
      showMobileNav: false,
      isMobile: false,
      showBanner: !localStorage.getItem('posthog_user_consent'),
      showTermsModal: false,
      showPrivacyModal: false,
      showCookiesModal: false
    };
  },
  components: {
    ContactComponent,
    NavBar,
    AboutUsComponent,
    ManifestoComponent,
    FooterComponent,
    CookieBanner,
    ModalComponent,
    TermsAndConditions,
    PrivacyPolicy,
    CookiesPolicy,
  },
  methods: {
    toggleMenu() {
      this.showMobileNav = !this.showMobileNav;
    },
    openTermsModal() {
      this.showPrivacyModal = false; // Close privacy modal if it's open
      this.showCookiesModal = false; // Close cookies modal if it's open
      this.showTermsModal = true;
    },
    closeTermsModal() {
      this.showTermsModal = false;
    },
    openPrivacyModal() {
      this.showTermsModal = false; // Close terms modal if it's open
      this.showCookiesModal = false; // Close cookies modal if it's open
      this.showPrivacyModal = true;
    },
    closePrivacyModal() {
      this.showPrivacyModal = false;
    },
    openCookiesModal() {
      this.showPrivacyModal = false; // Close privacy modal if it's open
      this.showTermsModal = false; // Close terms modal if it's open
      this.showCookiesModal = true;
    },
    closeCookiesModal() {
      this.showCookiesModal = false;
    },
  },
  mounted() {
    // Scroll to section if hash is present in URL
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  },
};
</script>

<style lang="scss">
.app {
  letter-spacing: 0.5px;
  font-family: Lexend, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e9e9e9;
  box-sizing: border-box;
  position: relative;

  &__banner--active {
    display: block;
  }

  &__content {
    transition: all 0.5s ease-in-out;
    transform: translateY(0px);
  }

  &__no-scroll {
    overflow: hidden;
    height: 100%;
    position: fixed;
    width: 100%;
  }

  &__title-animation {
    &-container {
      position: relative;
      text-align: center;
      display: inline-block;
    }

    width: 100%;
    display: block;
    filter: contrast(0%) blur(5px);

    &-header {
      text-shadow: #191919 1px 1px 20px;
      font-family: "Quicksand", system-ui;
      font-size: 56px;
      font-weight: 700;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

body {
  background-color: black;
}

.u-text-gradient {
  &--grey {
    background: -webkit-linear-gradient(180deg, #ffffff, #bebebe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--blue {
    background: -webkit-linear-gradient(180deg, #5B71C9, #8193DC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--white-blue-1 {
    background: -webkit-linear-gradient(45deg, #9baae8, #7994ff, #e9e9e9, #e9e9e9, #e9e9e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--white-blue-2 {
    background: -webkit-linear-gradient(45deg, #e9e9e9, #9baae8, #7994ff, #e9e9e9, #e9e9e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--white-blue-3 {
    background: -webkit-linear-gradient(45deg, #e9e9e9, #e9e9e9, #9baae8, #7994ff, #e9e9e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--white-blue-4 {
    background: -webkit-linear-gradient(45deg, #e9e9e9, #e9e9e9, #e9e9e9, #9baae8, #7994ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &--white-blue-5 {
    background: -webkit-linear-gradient(45deg, #7994ff, #e9e9e9, #68afff, #e9e9e9, #9baae8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

html {
  scroll-behavior: smooth;
}

</style>
