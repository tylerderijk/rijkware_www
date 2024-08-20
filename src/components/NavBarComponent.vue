<script>
import anime from 'animejs';
import MenuIcon from "@/components/shorts/MenuIcon.vue";
import MenuCloseIcon from "@/components/shorts/MenuCloseIcon.vue";

export default {
  name: "NavBar",
  components: {MenuCloseIcon, MenuIcon},
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
        targets: '.mobile-nav',
        opacity: [0, 1],
        translateY: [400, 0],
        easing: 'easeInOutQuad',
        duration: 400,
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
  <nav>
    <div class="logo-hamburger">
      <router-link v-if="showMobileNav" to="/rijkware" @click="handleClick">
        <img src="../assets/RijkwareLogo-2024-v2-Long.png" class="rijkware-logo d-inline-block align-top" alt="">
      </router-link>
      <router-link v-else to="/rijkware">
      <img src="../assets/RijkwareLogo-2024-v2.png" class="rijkware-logo d-inline-block align-top" alt="">
      </router-link>
      <button v-if="!showMobileNav" @click="handleClick" class="hamburger-button"><MenuIcon/></button>
      <button v-else @click="handleClick" class="hamburger-button"><MenuCloseIcon/></button>
    </div>
    <ul class="navbar-nav">
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
    <div class="mobile-nav-wrapper">
      <div class="mobile-nav" v-show="showMobileNav">
        <h4 class="mobile-nav-current-path">{{ currentPath === '/' ? "About" : currentPath.charAt(1).toUpperCase() + currentPath.slice(2) }}</h4>
        <ul class="mobile-nav-ul">
          <li class="nav-item" v-if="!isMobile || currentPath !== '/'">
            <router-link to="/" @click="handleClick">About us</router-link>
          </li>
          <li class="nav-item" v-if="!isMobile || currentPath !== '/manifesto'">
            <router-link to="manifesto" @click="handleClick">Manifesto</router-link>
          </li>
          <li class="nav-item" v-if="!isMobile || currentPath !== '/cases'">
            <router-link to="cases" @click="handleClick">Cases</router-link>
          </li>
          <li class="nav-item" v-if="!isMobile || currentPath !== '/people'">
            <router-link to="people" @click="handleClick">People</router-link>
          </li>
          <li class="nav-item" v-if="!isMobile || currentPath !== '/contact'">
            <router-link to="contact" @click="handleClick">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
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

.mobile-nav {
  width: 100vw;
  height: 100vh;
}

.navbar-nav {
  opacity: 0.3;
  transition: all 350ms ease-out
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
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(4px);
}

ul {
  list-style-type: none;
}

.nav-item {
  color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 10px 2vw;
  padding: 8px;
  font-weight: 300;
  font-size: 20px;
  font-family: "Lexend", system-ui;
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

.router-link-active, .router-link-exact-active {
  position: relative;
  font-weight: 500;
}


.rijkware-logo {
  cursor: pointer;
  height: 36px;
  margin: 24px 48px 0 0;
  opacity: 0.9;
}

.mobile-nav {
  display: none;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 350ms ease-in-out;
}

.hamburger-button {
  display: none;
  cursor: pointer;
  font-size: 42px;
  background: none;
  border: none;
  color: #e9e9e9;
  padding-right: 16px;
}

.mobile-nav-current-path {
  color: #e9e9e9;
  font-size: 24px;
  font-weight: 300;
}

@media (max-width: 820px) {
  .router-link-active, .router-link-exact-active {
    display: none;
    transform: none;
  }

  .nav-item {
    margin: 0;
    font-size: 36px;
  }

  .nav-item:hover {
    transform: none;
  }

  .rijkware-logo {
    margin: 16px;
  }

  nav {
    background: rgba(0, 0, 0, 0.5);
    flex-direction: column;
  }

  .hamburger-button {
    display: block;
  }

  .navbar-nav {
    display: none;
  }

  .mobile-nav-ul {
    flex-direction: column;
  }

  .mobile-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>