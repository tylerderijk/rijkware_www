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
      <div class="CTA-wrapper">
        <router-link to="/contact" class="CTA">{{ lang.hero_texts.cta_link }}</router-link>
      </div>
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
  }
}
</script>
<style scoped>
.why-success-cases {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}
.CTA:hover {
  box-shadow: 7px 5px 56px -14px #040f2b;
  text-decoration: none;
  font-weight: bolder;
}

.CTA:active {
  transform: scale(0.97);
  box-shadow: 7px 5px 56px -10px #0094c7;
}

.CTA {
  //outline: solid 1px white;
  box-shadow: rgba(72, 72, 72, 0.1) 1px 1px 8px;
  color: #e9e9e9;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(-45deg, black, black, #002873, black);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
  height: 40px;
  width: 760px;
  padding: 48px 48px 48px 48px;
  transition: all 300ms ease-in-out;
  font-size: 18px;
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

.CTA-wrapper {
  margin: 128px 0 256px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  flex-direction: column;
  gap: 20px;
}


.why-texts-img {
  margin: 36px 0;
}

.why-section {
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
  //padding: 18px 0 0 36px;
}

.why-wrapper {
  position: relative;
  text-align: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: fit-content;
}

.hero-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#rijkware-animation {
  max-height: fit-content;
  min-height: 50vh;
}

.hero-text_wrapper {
  //margin: 96px 0 56px 0;
  display: flex;
  flex-direction: column;
}

.hero-text {
  font-family: "Unbounded", system-ui;
  font-weight: 300;
  margin: 56px 0 56px 0;
  max-width: 760px;
  text-align: start;
}

small {
  margin-top: 24px;
  display: flex;
  color: #c2c2c2;
}

.hero-text-manifesto {
  margin-left: 4px;
  color: #c2c2c2;
  text-decoration-line: underline;
  text-underline: #e9e9e9;
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
