<template>
  <div id="about" class="hero">
    <video src="../assets/RijkwareLogoRenderTrans2.webm" id="rijkware-animation"
           class="hero__animation d-inline-block align-top"
           autoplay loop muted playsinline
           aria-label="Rijkware Logo Animation" 
           @contextmenu.prevent>
      Your browser does not support the video tag.
    </video>
    <div class="hero__text-container">
      <h2 class="hero__text u-text-gradient--white-blue-5">{{ lang.hero_texts.title }}</h2>
      <h2 class="hero__text u-text-gradient--white-blue-5">{{ lang.hero_texts.subtitle1 }}</h2>
      <h2 class="hero__text u-text-gradient--white-blue-5">{{ lang.hero_texts.subtitle2 }}</h2>
      <h2 class="hero__text u-text-gradient--white-blue-3">{{ lang.hero_texts.subtitle3 }}</h2>
    </div>
  </div>
  <section class="why" id="why">
    <img src="../assets/WhyChooseRijkware.png" class="why__image" alt="Why Choose Rijkware?">
    <div class="why__container">
      <div class="why__reasons">
        <div class="why__reason" v-for="reason in lang.reasons" :key="reason.title">
          <h2 class="why__reason-title">{{ reason.title }}</h2>
          <p class="why__reason-text">{{ reason.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AboutUsData from '@/assets/json/AboutUs.json';
import anime from 'animejs';

export default {
  name: 'AboutUs',
  components: {},
  data() {
    return {
      lang: AboutUsData,
    }
  },
  mounted() {
    anime({
      targets: '#rijkware-animation',
      minHeight: ['90vh', '50vh'],
      duration: 3000,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: '.hero__text',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(1400),
      easing: 'easeInOutQuad'
    });

    this.updateHeroTextOpacity();
    this.updateHeroTextGradient();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [20, 0],
            duration: 750,
            easing: 'easeOutQuad',
          });
          observer.unobserve(entry.target);
        }
      });
    });

    const whyReasons = document.querySelectorAll('.why__reason');
    whyReasons.forEach((reason) => {
      observer.observe(reason);
    });

    const whyTextsImg = document.querySelector('.why__image');
    observer.observe(whyTextsImg);

    // Use a single debounced scroll handler for better performance
    this.debouncedScrollHandler = this.debounce(() => {
      this.updateHeroTextOpacity();
      this.updateHeroTextGradient();
    }, 10);

    window.addEventListener('scroll', this.debouncedScrollHandler);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.debouncedScrollHandler);
  },
  methods: {
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    updateHeroTextOpacity() {
      const heroTexts = document.querySelectorAll('.hero__text');
      const windowCenter = window.innerHeight / 2;

      let closestElement = null;
      let closestDistance = Infinity;

      heroTexts.forEach((text) => {
        const rect = text.getBoundingClientRect();
        const textCenter = rect.top + rect.height / 2;
        const distanceToCenter = Math.abs(windowCenter - textCenter);

        if (distanceToCenter < closestDistance) {
          closestDistance = distanceToCenter;
          closestElement = text;
        }
      });

      heroTexts.forEach((text) => {
        if (text === closestElement) {
          text.style.opacity = 1;
        } else {
          text.style.opacity = 0.3;
        }
      });
    },
    updateHeroTextGradient() {
      const heroTexts = document.querySelectorAll('.hero__text');
      const scrollY = window.scrollY;

      heroTexts.forEach((text, index) => {
        const offset = (scrollY / 10) + index * 20; // Adjust gradient movement
        text.style.backgroundPosition = `${offset}% 50%`;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.hero {
  padding-top: 0;
  padding-bottom: 64px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__animation {
    max-width: fit-content;
  }

  &__text {
    font-family: "Unbounded", system-ui;
    font-weight: 300;
    padding: 56px 24px;
    max-width: 760px;
    text-align: start;
    transition: opacity 0.5s ease-in-out, background-position 0.3s ease-in-out;
    background-size: 200%; /* Enable movement of gradient */
    background-position: 0% 50%;
  }

  &__text-container {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
}

.why {
  padding-top: 48px;

  &__success-cases {
    margin-top: 24px;
    display: flex;
    justify-content: center;
  }

  &__image {
    margin: 36px 0;
    width: 100%;
    max-width: 500px;
  }

  &__reason {
    flex-basis: calc(50% - 20px);
    max-width: 500px;
    text-align: start;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 48px;
    margin: 8px 0;

    &-text {
      color: #f8f8f8;
      font-family: "Lexend", Helvetica, Arial, sans-serif;
      font-size: 18px;
      font-weight: 200;
    }

    &-title {
      font-family: "Unbounded", system-ui;
      font-size: 28px;
      font-weight: 400;
    }
  }

  &__reasons {
    max-width: 975px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    gap: 20px;
  }

  &__container {
    position: relative;
    text-align: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: fit-content;
  }
}

.hero-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 90vh; /* Ensures the space is reserved */
  position: relative;
  transition: min-height 0.5s ease-in-out; /* Smooth transition */
}

#rijkware-animation {
  height: 50vh; /* Final height */
  min-height: 50vh;
  width: 100%;
  object-fit: cover; /* Ensures the video scales correctly */
  transition: height 3s ease-in-out; /* Smoothly transitions height */
}

.why__container {
  margin-top: 0; /* Remove unnecessary margin to reduce gaps */
  padding: 48px 0; /* Adjust spacing */
  background: linear-gradient(transparent, rgba(61, 78, 135, 0.18), rgba(61, 78, 135, 0.18), rgba(61, 78, 135, 0.1), transparent);
  width: 100%;
  margin-bottom: 84px;
}

small {
  margin-top: 24px;
  display: flex;
  color: #c2c2c2;
}

.hero-text-manifesto {
  margin-left: 4px;
  color: #c2c2c2;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.why-success-cases {
  .hero-text-manifesto {
    margin-left: 4px;
    color: #c2c2c2;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

@media (max-width: 768px) {
  .why-texts-img {
    width: 100%;
  }

  .CTA {
    max-width: 90vw;

    &-wrapper {
      margin-bottom: 156px;
    }
  }

  .hero-text {
    font-size: 24px;

    &_wrapper {
      max-width: 90vw;

      &::after {
        transform: translate(-40%, -50%);
        background: radial-gradient(circle, rgba(91, 113, 201, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
      }
    }
  }

  .why {
    &__reason {
      flex-basis: 100%;
      max-width: 100%;
    }
  }

}
</style>
