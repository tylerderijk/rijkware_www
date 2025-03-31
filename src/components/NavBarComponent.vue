<script>
import anime from 'animejs';
import { nextTick, ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import MenuIcon from "@/components/shorts/MenuIcon.vue";
import MenuCloseIcon from "@/components/shorts/MenuCloseIcon.vue";
import LinkedInIcon from "@/components/shorts/LinkedInIcon.vue";
import InstagramIcon from "@/components/shorts/InstagramIcon.vue";
import FacebookIcon from "@/components/shorts/FacebookIcon.vue";
import XIcon from "@/components/shorts/XIcon.vue";

// Breakpoint for mobile view
const MOBILE_BREAKPOINT = 820;

export default {
  name: "NavigationBar",
  components: { MenuCloseIcon, MenuIcon, InstagramIcon, LinkedInIcon, FacebookIcon, XIcon },
  props: {
    showMobileNav: Boolean
  },
  emits: ['toggle-menu', 'open-terms', 'open-privacy', 'open-cookies'],
  setup(props, { emit }) {
    // Reactive state
    const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
    const navbarRef = ref(null);

    // Computed properties
    const isMobile = computed(() => {
      return windowWidth.value <= MOBILE_BREAKPOINT || 
        (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent));
    });

    // Methods
    const handleClick = (sectionId) => {
      animateMenu();
      emit('toggle-menu');
      toggleBodyScroll();

      if (sectionId) {
        nextTick(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    const toggleBodyScroll = () => {
      if (isMobile.value) {
        if (props.showMobileNav) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
      }
    };

    const animateMenu = () => {
      nextTick(() => {
        // Animate menu items
        anime({
          targets: ['.navigationbar__item'],
          translateY: [5, 0],
          opacity: [0, 1],
          duration: 100,
          easing: 'easeInOutQuad',
          delay: anime.stagger(100)
        });

        // Animate mobile menu
        anime({
          targets: '.navigationbar__mobile',
          opacity: [0, 1],
          translateY: [400, 0],
          easing: 'easeInOutQuad',
          duration: 300
        });
      });
    };

    const handleResize = () => {
      windowWidth.value = window.innerWidth;

      // Close mobile menu if switching to desktop view
      if (windowWidth.value > MOBILE_BREAKPOINT && props.showMobileNav) {
        emit('toggle-menu');
      }
    };

    // Watchers
    watch(() => props.showMobileNav, () => {
      toggleBodyScroll();
    });

    // Lifecycle hooks
    onMounted(() => {
      // Add resize event listener
      window.addEventListener('resize', handleResize);

      // Set initial body scroll state
      toggleBodyScroll();

      // Animate navbar entrance with reduced delay for better UX
      const navbar = navbarRef.value;
      if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';

        // Reduced delay from 2000ms to 500ms for better user experience
        setTimeout(() => {
          anime({
            targets: navbar,
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            duration: 800,
            easing: 'easeOutQuad'
          });
        }, 800);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isMobile,
      handleClick,
      navbarRef
    };
  }
}
</script>

<template>
  <nav 
    ref="navbarRef"
    :class="{ 'navigationbar--blur': showMobileNav }" 
    class="navigationbar"
    role="navigation"
    aria-label="Main Navigation"
  >
    <div class="navigationbar__logo-container">
      <div class="navigationbar__mobile-header" v-if="isMobile">
        <a 
          href="#about" 
          @click.prevent="handleClick('about')" 
          aria-label="Rijkware Home"
        >
          <img 
            :src="showMobileNav 
              ? require('../assets/RijkwareLogo-2024-v2-Long.png') 
              : require('../assets/RijkwareLogo-2024-v2.png')" 
            class="navigationbar__logo" 
            alt="Rijkware Logo"
            width="auto"
            height="36"
          >
        </a>
        <button 
          @click="handleClick" 
          class="navigationbar__hamburger" 
          :aria-label="showMobileNav ? 'Close menu' : 'Open menu'"
          aria-expanded="showMobileNav"
        >
          <MenuIcon v-if="!showMobileNav" />
          <MenuCloseIcon v-else />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="navigationbar__mobile-wrapper" v-if="isMobile">
      <div 
        class="navigationbar__mobile" 
        v-show="showMobileNav"
        aria-hidden="!showMobileNav"
      >
        <ul class="navigationbar__mobile-list navigationbar__mobile-list--primary">
          <li class="navigationbar__item u-text-gradient--white-blue-5">
            <a href="#about" @click="handleClick('about')">About us</a>
          </li>
          <li class="navigationbar__item">
            <a href="#why" @click="handleClick('why')">Why</a>
          </li>
          <li class="navigationbar__item">
            <a href="#manifesto" @click="handleClick('manifesto')">Manifesto</a>
          </li>
          <li class="navigationbar__item">
            <a href="#contact" @click="handleClick('contact')">Contact</a>
          </li>
          <li class="navigationbar__item">
            <a href="#faq" @click="handleClick('faq')">FAQ's</a>
          </li>
          <li>
            <div class="navigationbar__social" v-if="showMobileNav">
              <a 
                href="https://www.instagram.com/rijkware/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="navigationbar__social-icon"
                aria-label="Rijkware Instagram"
              >
                <InstagramIcon :employee-name="'Rijkware'"/>
              </a>
              <a 
                href="https://www.linkedin.com/company/rijkware" 
                target="_blank" 
                rel="noopener noreferrer"
                class="navigationbar__social-icon"
                aria-label="Rijkware LinkedIn"
              >
                <LinkedInIcon :employee-name="'Rijkware'"/>
              </a>
              <a 
                href="https://www.facebook.com/rijkware" 
                target="_blank" 
                rel="noopener noreferrer"
                class="navigationbar__social-icon"
                aria-label="Rijkware Facebook"
              >
                <FacebookIcon :employee-name="'Rijkware'"/>
              </a>
              <a 
                href="https://twitter.com/rijkware" 
                target="_blank" 
                rel="noopener noreferrer"
                class="navigationbar__social-icon"
                aria-label="Rijkware Twitter"
              >
                <XIcon :employee-name="'Rijkware'"/>
              </a>
            </div>
          </li>
        </ul>
        <ul class="navigationbar__mobile-list navigationbar__mobile-list--secondary">
          <li class="navigationbar__item navigationbar__item--small">
            <a href="#" @click.prevent="$emit('open-terms')" class="navigationbar__item-text--small">Terms & Conditions</a>
          </li>
          <li class="navigationbar__item navigationbar__item--small">
            <a href="#" @click.prevent="$emit('open-privacy')" class="navigationbar__item-text--small">Privacy Policy</a>
          </li>
          <li class="navigationbar__item navigationbar__item--small">
            <a href="#" @click.prevent="$emit('open-cookies')" class="navigationbar__item-text--small">Cookies</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <ul class="navigationbar__list" v-else>
      <li class="navigationbar__item">
        <a 
          href="#about" 
          class="u-text-gradient--white-blue-5 navigationbar__brand" 
          @click.prevent="handleClick('about')"
        >
          Rijkware
        </a>
      </li>
      <li class="navigationbar__item">
        <a href="#why" @click.prevent="handleClick('why')">Why</a>
      </li>
      <li class="navigationbar__item">
        <a href="#manifesto" @click.prevent="handleClick('manifesto')">Manifesto</a>
      </li>
      <li class="navigationbar__item">
        <a href="#contact" @click.prevent="handleClick('contact')">Contact</a>
      </li>
      <li class="navigationbar__item">
        <a href="#faq" @click.prevent="handleClick('faq')">FAQ's</a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
// Variables for consistent values
$mobile-breakpoint: 820px;
$navbar-bg-color: rgba(0, 0, 0, 0.35);
$navbar-mobile-bg-color: rgba(0, 0, 0, 0.6);
$text-color: #f6f6f6;
$text-color-secondary: #8c8c8c;
$brand-gradient: linear-gradient(90deg, white, #237bff, white);
$transition-fast: 100ms ease-in-out;
$transition-medium: 350ms ease-out;
$transition-slow: 0.5s ease;

// Main navigation styles
.navigationbar {
  top: 0;
  z-index: 1000;
  display: flex;
  align-content: center;
  justify-content: center;
  position: sticky;
  width: 100%;
  background: $navbar-bg-color;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  // When mobile menu is open
  &--blur {
    height: auto;

    @media (max-width: $mobile-breakpoint) {
      height: 100vh;
    }
  }

  // Social media icons section
  &__social {
    margin-top: 48px;
    width: fit-content;
    display: flex;
    align-items: center;

    &-icon {
      color: #c2c2c2;
      padding: 12px 12px 0 0;
      transition: opacity $transition-fast;

      &:hover {
        opacity: 0.8;
      }

      @media (max-width: $mobile-breakpoint) {
        padding: 0 8px 0 0;
      }
    }
  }

  // Logo container
  &__logo-container {
    display: flex;
    justify-content: space-between;

    @media (max-width: $mobile-breakpoint) {
      width: 100%;
      padding: 0;
      margin: 0;
    }
  }

  // Desktop navigation list
  &__list {
    opacity: 0.4;
    transition: opacity $transition-medium;
    padding: 0;
    display: flex;
    margin-bottom: 0;
    list-style-type: none;

    &:hover {
      opacity: 1;
    }

    @media (max-width: $mobile-breakpoint) {
      display: none;
    }
  }

  // Brand name with gradient
  &__brand {
    font-size: 18px;
    font-weight: 400;
    background: $brand-gradient;
    background-size: 200%;
    background-position: 0% 50%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    transition: background-position $transition-slow;

    &:hover {
      background-position: 100% 50%;
    }
  }

  // Navigation items
  &__item {
    color: $text-color;
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin: 10px 36px;
    padding: 8px;
    font-weight: 300;
    font-size: 16px;
    transition: all $transition-fast;

    &:hover {
      opacity: 1;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &--small {
      color: $text-color-secondary;
    }

    &-text--small {
      font-weight: 200;
    }

    @media (max-width: $mobile-breakpoint) {
      font-weight: 400;
      margin: 0;
      font-size: 21px;
      justify-content: flex-start;
      padding: 12px 0;
      text-align: start;

      &:hover {
        transform: none;
      }
    }
  }

  // Logo styles
  &__logo {
    cursor: pointer;
    height: 36px;
    margin: 24px 48px 0 0;
    opacity: 0.9;
    display: block;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 1;
    }

    @media (max-width: $mobile-breakpoint) {
      margin: 16px 0;
      height: 24px;
    }
  }

  // Mobile menu styles
  &__mobile {
    height: 50%;
    margin-top: 28px;
    flex-direction: row;
    justify-content: space-between;
    opacity: 0;
    align-items: flex-start;
    transition: opacity $transition-medium;
    display: flex;

    &-header {
      width: 100%;
      max-width: 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }

    &-wrapper {
      height: 100%;
      width: 100%;
      max-width: 100vw;
    }

    &-list {
      padding: 0;
      display: flex;
      width: 100%;
      flex-direction: column;
      list-style-type: none;

      &--primary:first-child {
        padding-left: 16px;
        width: 80%;
      }

      &--secondary {
        font-size: 14px; // Corrected from 90px which seems like a mistake
      }
    }
  }

  // Hamburger menu button
  &__hamburger {
    display: none;
    cursor: pointer;
    font-size: 42px;
    background: none;
    border: none;
    color: $text-color;
    padding: 8px;
    transition: opacity $transition-fast;

    &:hover {
      opacity: 0.8;
    }

    &:focus {

    }

    @media (max-width: $mobile-breakpoint) {
      display: block;
    }
  }

  // Mobile styles for the navbar
  @media (max-width: $mobile-breakpoint) {
    flex-direction: column;
    background: $navbar-mobile-bg-color;
  }
}

// Global link styles
a {
  color: inherit;
  text-decoration: none;
}

/* Global style to prevent body scrolling when mobile menu is open */
:global(.no-scroll) {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
