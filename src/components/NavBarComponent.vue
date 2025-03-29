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
        targets: ['.navbar__item'],
        translateY: [5, 0],
        opacity: [0, 1],
        duration: 100,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      anime({
        targets: '.navbar__mobile',
        opacity: [0, 1],
        translateY: [400, 0],
        easing: 'easeInOutQuad',
        duration: 300,
        begin: () => {
          if (this.showMobileNav) {
            this.$el.querySelector('.navbar__mobile').style.display = 'flex';
            this.$el.querySelector('.navbar__logo').style.display = 'flex';
          }
        },
        complete: () => {
          if (!this.showMobileNav) {
            this.$el.querySelector('.navbar__mobile').style.display = 'none';
            this.$el.querySelector('.navbar__logo').style.display = 'flex';
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
  <nav :class="{ 'navbar--blur': showMobileNav }" class="navbar">
    <div class="navbar__logo-container">
      <div class="navbar__mobile-header" v-if="isMobile">
        <router-link to="/rijkware" v-if="showMobileNav">
          <img src="../assets/RijkwareLogo-2024-v2-Long.png" class="navbar__logo d-inline-block align-top" alt="">
        </router-link>
        <router-link to="/rijkware" v-else>
          <img src="../assets/RijkwareLogo-2024-v2.png" class="navbar__logo d-inline-block align-top" alt="">
        </router-link>
        <button v-if="!showMobileNav" @click="handleClick" class="navbar__hamburger">
          <MenuIcon/>
        </button>
        <button v-else @click="handleClick" class="navbar__hamburger">
          <MenuCloseIcon/>
        </button>
      </div>
<!--      <router-link v-else to="/rijkware">-->
<!--        <img src="../assets/RijkwareLogo-2024-v2.png" class="navbar__logo d-inline-block align-top" alt="">-->
<!--      </router-link>-->
    </div>
    <div class="navbar__mobile-wrapper" v-if="isMobile">
      <div class="navbar__mobile" v-show="showMobileNav">
        <ul class="navbar__mobile-list navbar__mobile-list--primary">
          <li class="navbar__item">
            <router-link to="/" @click="handleClick">About us</router-link>
          </li>
          <li class="navbar__item">
            <router-link to="manifesto" @click="handleClick">Manifesto</router-link>
          </li>
          <li class="navbar__item">
            <router-link to="cases" @click="handleClick">Cases</router-link>
          </li>
          <li class="navbar__item">
            <router-link to="people" @click="handleClick">People</router-link>
          </li>
          <li class="navbar__item u-text-gradient--white-blue-5">
            <router-link to="contact" @click="handleClick">Contact</router-link>
          </li>
          <li>
            <div class="navbar__social" v-if="showMobileNav">
              <a href="https://www.instagram.com/rijkware/" target="_blank" class="navbar__social-icon">
                <InstagramIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.linkedin.com/company/rijkware" target="_blank" class="navbar__social-icon">
                <LinkedInIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.facebook.com/cerclair" target="_blank" class="navbar__social-icon">
                <FacebookIcon :employee-name="'Rijkware'"/>
              </a>
              <a href="https://www.x.com/rijkware/" target="_blank" class="navbar__social-icon">
                <XIcon :employee-name="'Rijkware'"/>
              </a>
            </div>
          </li>
        </ul>
        <ul class="navbar__mobile-list navbar__mobile-list--secondary">
          <li class="navbar__item navbar__item--small">
            <router-link to="terms-and-conditions" @click="handleClick" class="navbar__item-text--small">Terms & Conditions</router-link>
          </li>
          <li class="navbar__item navbar__item--small">
            <router-link to="privacy-policy" @click="handleClick" class="navbar__item-text--small">Privacy Policy</router-link>
          </li>
          <li class="navbar__item navbar__item--small">
            <router-link to="cookies" @click="handleClick" class="navbar__item-text--small">Cookies</router-link>
          </li>
        </ul>
      </div>

    </div>
    <ul class="navbar__list" v-else>
      <li class="navbar__item">
        <router-link class="u-text-gradient--white-blue-5 navbar__brand" to="/">Rijkware</router-link>
      </li>
      <li class="navbar__item">
        <router-link to="manifesto">Manifesto</router-link>
      </li>
      <li class="navbar__item">
        <router-link to="cases">Cases</router-link>
      </li>
      <li class="navbar__item">
        <router-link to="people">People</router-link>
      </li>
      <li class="navbar__item">
        <router-link to="contact">Get in Touch</router-link>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
.navbar__social {
  margin-top: 48px;
  width: fit-content;
}
.navbar__social-icon {
  color: #c2c2c2;
  padding: 12px 12px 0 0;
}
.navbar__list:hover .contact {
  opacity: 1;
}

.navbar__item:hover:not {
  opacity: 1;
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

.navbar__logo-container {
  display: flex;
  justify-content: space-between;
}

.navbar__list {
  opacity: 0.3;
  transition: all 350ms ease-out;
}

.navbar__list:hover {
  opacity: 1;
}

.navbar__list, .navbar__mobile-list {
  padding: 0;
  display: flex;
}

.navbar {
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

.navbar--blur {
  height: 100vh;
}

ul {
  list-style-type: none;
}

.navbar__brand {
  font-size: 18px;
  font-weight: 400;
  background: linear-gradient(90deg, white, #237bff, white);
  background-size: 200%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.5s ease;
}

.navbar__brand:hover {
  background-position: 100% 50%;
}

.navbar__item {
  color: #f6f6f6;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 10px 2vw;
  padding: 8px;
  font-weight: 300;
  font-size: 16px;
  transition: all 100ms ease-in-out;
}

.navbar__item:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.navbar__list:hover .contact {
  opacity: 1;
}

.navbar__item:active {
  transform: translateY(0px);
}

a {
  color: inherit;
  text-decoration: none;
}

.navbar__logo {
  cursor: pointer;
  height: 36px;
  margin: 24px 48px 0 0;
  opacity: 0.9;
}

.navbar__mobile-header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar__hamburger {
  display: none;
  cursor: pointer;
  font-size: 42px;
  background: none;
  border: none;
  color: #e9e9e9;
}

.navbar__mobile-wrapper {
  height: 100%;
  width: 100vw;
}

.navbar__mobile-list--primary:first-child {
  padding-left: 16px;
  width: 80%;
}

.navbar__mobile {
  height: 50%;
  margin-top: 28px;
  flex-direction: row;
  justify-content: space-between;
  opacity: 0;
  align-items: start;
  transition: opacity 350ms ease-in-out;
}

.navbar__mobile-list {
  width: 100%;
  flex-direction: column;
}

.navbar__mobile-list--secondary {
  font-size: 90px;
}

.navbar__item--small {
  color: #8c8c8c;
}

.navbar__item-text--small {
  font-weight: 200;
}
.navbar--blur {
  height: auto;
}

@media (max-width: 820px) {
  .navbar--blur {
    height: 100vh;
  }
}

@media (max-width: 820px) {
  .navbar__item {
    font-weight: 400;
    margin: 0;
    font-size: 21px;
    justify-content: start;
    padding: 12px 0;
    text-align: start;
  }

  .navbar__item:hover {
    transform: none;
  }

  .navbar__logo {
    margin: 16px;
    height: 24px;
  }

  .navbar {
    flex-direction: column;
    background: rgba(0, 0, 0, 0.6);
  }

  .navbar__hamburger {
    display: block;
  }

  .navbar__list {
    display: none;
  }
}
</style>
