<template>
  <CookieBanner v-if="showBanner" :class="{ bannerActive: showBanner }" @hideBanner="showBanner = false" @acceptBanner="handleCookieBanner(true)"/>
  <div :class="{ application: showBanner }">
    <NavBar :showMobileNav="showMobileNav" @toggle-menu="toggleMenu"></NavBar>
    <router-view/>
    <FooterComponent></FooterComponent>
    <div class="cursor-glow" ref="cursorGlow"></div>
  </div>
</template>

<script>
import CookieBanner from "@/components/shorts/CookieBanner.vue";
import NavBar from "@/components/NavBarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

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
    NavBar,
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
      if (this.showMobileNav) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
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
    document.body.classList.remove('no-scroll');
    this.setBodyStyle(this.$route);
  },
  beforeUnmount() {
  },
};
</script>


<style>
.bannerActive {
  display: block;
}
.application {
  transition: all 0.5s ease-in-out;
  transform: translateY(0px);
}
.no-scroll {
  overflow: hidden;
  height: 100%;
  position: fixed;
  width: 100%;
}

body {
  background-color: black;
}

#app {
  letter-spacing: 0.5px;
  font-family: Lexend, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e9e9e9;
  box-sizing: border-box;
  position: relative;
}

.title-animation-wrapper {
  position: relative;
  text-align: center;
  display: inline-block;
}

#title-animation {
  width: 100%;
  display: block;
}

.title-animation-header {
  text-shadow: #191919 1px 1px 20px;
  font-family: "Quicksand", system-ui;
  font-size: 56px;
  font-weight: 700;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#title-animation {
  filter: contrast(0%) blur(5px);
}

.grey-gradient {
  background: -webkit-linear-gradient(180deg, #ffffff, #bebebe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blue-gradient {
  background: -webkit-linear-gradient(180deg, #5B71C9, #8193DC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white-blue-gradient-1 {
  background: -webkit-linear-gradient(45deg, #9baae8, #7994ff, #e9e9e9, #e9e9e9, #e9e9e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white-blue-gradient-2 {
  background: -webkit-linear-gradient(45deg, #e9e9e9, #9baae8, #7994ff, #e9e9e9, #e9e9e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white-blue-gradient-3 {
  background: -webkit-linear-gradient(45deg, #e9e9e9, #e9e9e9, #9baae8, #7994ff, #e9e9e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white-blue-gradient-4 {
  background: -webkit-linear-gradient(45deg, #e9e9e9, #e9e9e9, #e9e9e9, #9baae8, #7994ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white-blue-gradient-5 {
  background: -webkit-linear-gradient(45deg, #7994ff, #e9e9e9, #68afff, #e9e9e9, #9baae8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


</style>