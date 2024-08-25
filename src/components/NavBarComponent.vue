<script>
import anime from 'animejs';
import MenuIcon from "@/components/shorts/MenuIcon.vue";
import MenuCloseIcon from "@/components/shorts/MenuCloseIcon.vue";
import LinkedInIcon from "@/components/shorts/LinkedInIcon.vue";
import InstagramIcon from "@/components/shorts/InstagramIcon.vue";
import FacebookIcon from "@/components/shorts/FacebookIcon.vue";
import XIcon from "@/components/shorts/XIcon.vue";

export default {
  name: "NavBar",
  components: {MenuCloseIcon, MenuIcon, InstagramIcon, LinkedInIcon, FacebookIcon, XIcon },
  props: {
    showMobileNav: Boolean
  },
  emits: ['toggle-menu'],
  computed: {
    isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    },
    currentPath() {
      return this.$route.path;
    }
  },
  methods: {
    handleClick() {
      this.animateMenu();
      this.$emit('toggle-menu');
    },
    animateMenu() {
      anime({
        targets: ['.nav-item'],
        translateY: [5, 0],
        opacity: [0, 1],
        duration: 100,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      anime({
        targets: '.mobile-nav',
        opacity: [0, 1],
        translateY: [400, 0],
        easing: 'easeInOutQuad',
        duration: 300,
        begin: () => {
          if (this.showMobileNav) {
            this.$el.querySelector('.mobile-nav').style.display = 'flex';
            this.$el.querySelector('.rijkware-logo').style.display = 'flex';
          }
        },
        complete: () => {
          if (!this.showMobileNav) {
            this.$el.querySelector('.mobile-nav').style.display = 'none';
            this.$el.querySelector('.rijkware-logo').style.display = 'flex';
          }
        }
      });
    },
    handleResize() {
      if (window.innerWidth > 820 && !this.isMobile) {
        this.$emit('toggle-menu');
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<template>
  <nav :class="{ 'blur-background': showMobileNav }">
    <div class="logo-hamburger">
      <div class="mobile-nav-header" v-if="isMobile">
        <router-link to="/rijkware" v-if="showMobileNav">
          <img src="../assets/RijkwareLogo-2024-v2-Long.png" class="rijkware-logo d-inline-block align-top" alt="">
        </router-link>
        <router-link to="/rijkware" v-else>
          <img src="../assets/RijkwareLogo-2024-v2.png" class="rijkware-logo d-inline-block align-top" alt="">
        </router-link>
        <button v-if="!showMobileNav" @click="handleClick" class="hamburger-button">
          <MenuIcon/>
        </button>
        <button v-else @click="handleClick" class="hamburger-button">
          <MenuCloseIcon/>
        </button>
      </div>
      <router-link v-else to="/rijkware">
        <img src="../assets/RijkwareLogo-2024-v2.png" class="rijkware-logo d-inline-block align-top" alt="">
      </router-link>
    </div>
    <div class="mobile-nav-wrapper" v-if="isMobile">
      <div class="mobile-nav" v-show="showMobileNav">
        <ul class="mobile-nav-ul mobile-nav-ul-first">
          <li class="nav-item">
            <router-link to="/" @click="handleClick">About us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="manifesto" @click="handleClick">Manifesto</router-link>
          </li>
          <li class="nav-item">
            <router-link to="cases" @click="handleClick">Cases</router-link>
          </li>
          <li class="nav-item">
            <router-link to="people" @click="handleClick">People</router-link>
          </li>
          <li class="nav-item white-blue-gradient-5">
            <router-link to="contact" @click="handleClick">Contact</router-link>
          </li>
          <li>
            <div class="social-media-icons" v-if="showMobileNav">
              <a href="https://www.instagram.com/rijkware/" target="_blank" class="social-media-icon">
                <InstagramIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.linkedin.com/company/rijkware" target="_blank" class="social-media-icon">
                <LinkedInIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.facebook.com/cerclair" target="_blank" class="social-media-icon">
                <FacebookIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.x.com/rijkware/" target="_blank" class="social-media-icon">
                <XIcon :employee-name="'Rijkware'"/>
              </a>
            </div>
          </li>
        </ul>
        <ul class="mobile-nav-ul mobile-nav-ul-second">
          <li class="nav-item nav-item-small">
            <router-link to="terms-and-conditions" @click="handleClick" class="nav-item-small-text">Terms & Conditions</router-link>
          </li>
          <li class="nav-item nav-item-small">
            <router-link to="privacy-policy" @click="handleClick" class="nav-item-small-text">Privacy Policy</router-link>
          </li>
          <li class="nav-item nav-item-small">
            <router-link to="cookies" @click="handleClick" class="nav-item-small-text">Cookies</router-link>
          </li>
        </ul>
      </div>

    </div>
    <ul class="navbar-nav" v-else>
      <li class="nav-item">
        <router-link to="/">About</router-link>
      </li>
      <li class="nav-item">
        <router-link to="manifesto">Manifesto</router-link>
      </li>
      <li class="nav-item">
        <router-link to="cases">Cases</router-link>
      </li>
      <li class="nav-item">
        <router-link to="people">People</router-link>
      </li>
      <li class="nav-item contact-li">
        <router-link to="contact" class="contact">Contact Us</router-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.social-media-icons {
  margin-top: 48px;
  width: fit-content;
}
.social-media-icon {
  color: #c2c2c2;
  padding: 12px 12px 0 0;
}
.navbar-nav:hover .contact {
  opacity: 1;
}

.nav-item:hover:not {
  opacity: 1;
}

.contact:hover {
  box-shadow: 0 0 10px 0 rgba(0, 94, 255, 0.25);
}

.contact {
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: linear-gradient(-45deg, black, #0474ff, #500bff, black);
  padding: 0px 12px;
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
  transition: all 300ms ease-in-out;
  margin: 0 -12px;

}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.logo-hamburger {
  display: flex;
  justify-content: space-between;
}

.navbar-nav {
  opacity: 0.3;
  transition: all 350ms ease-out;
}

.navbar-nav:hover {
  opacity: 1;
}

.navbar-nav, .mobile-nav-ul {
  padding: 0;
  display: flex;
}

nav {
  top: 0;
  z-index: 99999;
  display: flex;
  align-content: center;
  justify-content: center;
  position: sticky;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.blur-background {
  height: 100vh;
}

ul {
  list-style-type: none;
}

.nav-item {
  color: #f6f6f6;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 10px 2vw;
  padding: 8px;
  font-weight: 300;
  font-size: 20px;
  transition: all 100ms ease-in-out;
}

.nav-item:hover {
  opacity: 1;
  transform: translateY(-4px);
}

.navbar-nav:hover .contact {
  opacity: 1;
}

.nav-item:active {
  transform: translateY(0px);
}

a {
  color: inherit;
  text-decoration: none;
}

.rijkware-logo {
  cursor: pointer;
  height: 36px;
  margin: 24px 48px 0 0;
  opacity: 0.9;
}

.mobile-nav-header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hamburger-button {
  display: none;
  cursor: pointer;
  font-size: 42px;
  background: none;
  border: none;
  color: #e9e9e9;
}

.mobile-nav-wrapper {
  height: 100%;
  width: 100vw;
}

.mobile-nav-ul-first:first-child {
  padding-left: 16px;
  width: 80%;
}

.mobile-nav {
  height: 50%;
  margin-top: 28px;
  flex-direction: row;
  justify-content: space-between;
  opacity: 0;
  align-items: start;
  transition: opacity 350ms ease-in-out;
}

.mobile-nav-ul {
  width: 100%;
  flex-direction: column;
}

.mobile-nav-ul-second {
  font-size: 90px;
}

.nav-item-small {
  color: #8c8c8c;
}

.nav-item-small-text {
font-weight: 200;
}

@media (max-width: 820px) {
  .nav-item {
    font-weight: 400;
    margin: 0;
    font-size: 21px;
    justify-content: start;
    padding: 12px 0;
    text-align: start;
  }

  .nav-item:hover {
    transform: none;
  }

  .rijkware-logo {
    margin: 16px;
    height: 24px;
  }

  nav {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.6);
  }

  .hamburger-button {
    display: block;
  }

  .navbar-nav {
    display: none;
  }
}
</style>