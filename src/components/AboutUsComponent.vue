<template>
  <div class="hero-wrapper">
    <video src="../assets/RijkwareLogoRenderTrans2.webm" id="rijkware-animation" class="d-inline-block align-top" autoplay loop muted playsinline oncontextmenu="return false;">
      Your browser does not support the video tag.
    </video>
    <div class="hero-text_wrapper">
      <h2 class="hero-text white-blue-gradient-1">{{ lang.hero_texts.title }}</h2>
      <h2 class="hero-text white-blue-gradient-2">{{ lang.hero_texts.subtitle1 }}</h2>
      <h2 class="hero-text white-blue-gradient-3">{{ lang.hero_texts.subtitle2 }}</h2>
      <h2 class="hero-text white-blue-gradient-4">{{ lang.hero_texts.subtitle3 }}</h2>
      <small>{{ lang.hero_texts.manifesto_link_text }}
        <router-link class="hero-text-manifesto" to="manifesto">Manifesto</router-link>.
      </small>
    </div>
  </div>
  <section class="why-section">
    <img src="../assets/WhyChooseRijkware.png" class="why-texts-img" alt="Why Choose Rijkware?">
    <div class="why-wrapper">
      <div class="why-reason-wrapper">
        <div class="why-reason" v-for="reason in lang.reasons" :key="reason.title">
          <h2 class="why-reason-title">{{ reason.title }}</h2>
          <p class="why-reason-text">{{ reason.description }}</p>
        </div>
      </div>
    </div>
    <div class="why-success-cases">
      <small>{{ lang.cases_link_text }}
        <router-link class="hero-text-manifesto" to="cases">Cases</router-link>.
      </small>
    </div>
  </section>
</template>

<script>
import AboutUsData from '@/assets/json/AboutUs.json';
import anime from 'animejs';

export default {
  name: 'AboutUs',
  data() {
    return {
      lang: AboutUsData
    }
  },
  mounted() {
    anime({
      targets: '#rijkware-animation',
      height: ['80vh','50vh'],
      duration: 3500,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: '.hero-text',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(1400),
      easing: 'easeInOutQuad'
    });

    this.updateHeroTextOpacity();

    window.addEventListener('scroll', this.updateHeroTextOpacity);

    const whyReasons = document.querySelectorAll('.why-reason');
    whyReasons.forEach((reason) => {
      reason.style.opacity = 0;
      reason.style.transition = 'opacity 2s';
      window.addEventListener('scroll', () => {
        if (reason.getBoundingClientRect().top < window.innerHeight) {
          reason.style.opacity = 1;
        }
      });
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateHeroTextOpacity);
  },
  methods: {
    updateHeroTextOpacity() {
      const heroTexts = document.querySelectorAll('.hero-text');
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
    }
  }
}
</script>

<style scoped>
.hero-text {
  font-family: "Unbounded", system-ui;
  font-weight: 300;
  padding: 56px 0;
  max-width: 760px;
  text-align: start;
  transition: opacity 0.3s ease-in-out;
}

.hero-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero-text_wrapper {
  display: flex;
  flex-direction: column;
}

.why-success-cases {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}


.why-texts-img {
  margin: 36px 0;
}

.why-section {
  margin-top: 128px;
  height: 1200px;
  background: linear-gradient(black, #040e33, #081548, #000933, black);
}

.why-reason-text {
  font-family: "Lexend", Helvetica, Arial, sans-serif;
  font-size: 18px;
  font-weight: 200;
}

.why-reason-title {
  font-family: "Unbounded", system-ui;
  font-size: 28px;
  font-weight: 400;
}

.why-reason-wrapper {
  max-width: 1500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 20px;
}

.why-reason {
  flex-basis: calc(50% - 20px);
  max-width: 500px;
  text-align: start;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 84px;
}

.why-wrapper {
  position: relative;
  text-align: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: fit-content;
}



#rijkware-animation {
  max-height: fit-content;
  min-height: 50vh;
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

.why-success-cases .hero-text-manifesto {
  margin-left: 4px;
  color: #c2c2c2;
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media (max-width: 768px) {
  .why-texts-img {
    width: 100%;
  }
  .CTA {
    max-width: 90vw;
  }
  .CTA-wrapper {
    margin-bottom: 156px;
  }
  .hero-text_wrapper {
    max-width: 90vw;
  }
  .hero-text {
    font-size: 24px;

  }
  .why-reason {
    flex-basis: 100%;
    max-width: 100%;
  }
}
</style>
