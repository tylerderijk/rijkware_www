<template>
  <div class="app">
    <CookieBanner v-if="showBanner" :class="{ 'app__banner--active': showBanner }" @hideBanner="showBanner = false"
                  @acceptBanner="handleCookieBanner(true)"/>
    <div :class="{ 'app__content': showBanner }" class="app__content">
      <NavBar :showMobileNav="showMobileNav" @toggle-menu="toggleMenu"></NavBar>
      <AboutUsComponent/>
      <ManifestoComponent/>
      <ContactComponent/>
      <FooterComponent/>
    </div>
  </div>
</template>

<script>
import CookieBanner from "@/components/shorts/CookieBanner.vue";
import NavBar from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import AboutUsComponent from "@/components/AboutUsComponent.vue";
import ContactComponent from "@/components/ContactComponent.vue";
import ManifestoComponent from "@/components/ManifestoComponent.vue";

export default {
  name: 'App',
  data() {
    return {
      showMobileNav: false,
      isMobile: false,
      showBanner: !localStorage.getItem('posthog_user_consent')
    };
  },
  components: {
    ContactComponent,
    NavBar,
    AboutUsComponent,
    ManifestoComponent,
    FooterComponent,
    CookieBanner,
  },
  watch: {
    $route(to) {
      this.setBodyStyle(to);
     }
  },
  methods: {
    toggleMenu() {
      this.showMobileNav = !this.showMobileNav;
    },
    setBodyStyle(route) {
      const path = route.path;
      if (path === '/' || path !== '/manifesto') {
        document.body.style.backgroundColor = 'black';
      } else if (path === '/manifesto') {
        document.body.style.backgroundColor = '#e9e9e9';
      }
    },


  },
  mounted() {
    this.setBodyStyle(this.$route);
   },
  beforeUnmount() {
    this.destroyScroll();
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
