<script>
import manifesto from "@/assets/json/Manifesto.json";
import anime from 'animejs';

export default {
  name: 'ManifestoComponent',
  data() {
    return {
      lang: manifesto
    }
  },
  mounted() {
    anime({
      targets: '.hero-title, .hero-wrapper small',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(200)
    });
    anime({
      targets: '.manifesto-text',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(400),
      easing: 'easeInOutQuad'
    });
  }
}
</script>

<template>
  <div class="hero-wrapper">
    <h1 class="hero-title">{{ lang.hero_title }}</h1>
    <small>{{ lang.hero_subtitle }}</small>
  </div>
  <hr style="border: 1px solid rgba(0,0,0,0.3); width: 70%; max-width: 900px;">
  <div class="manifesto-wrapper">
    <div class="manifesto-card">
      <p class="manifesto-text" v-for="(text, index) in lang.text_sections" :key="index">{{ text }}</p>
    </div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves-bottom">
    <path fill="black" fill-opacity="1"
          d="M0,128L20,149.3C40,171,80,213,120,229.3C160,245,200,235,240,213.3C280,192,320,160,360,170.7C400,181,440,235,480,240C520,245,560,203,600,192C640,181,680,203,720,197.3C760,192,800,160,840,149.3C880,139,920,149,960,165.3C1000,181,1040,203,1080,213.3C1120,224,1160,224,1200,197.3C1240,171,1280,117,1320,90.7C1360,64,1400,64,1420,64L1440,64L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path>
  </svg>
  <div class="header">
    <div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
           viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:black; stop-opacity:0.4"/>
            <stop offset="100%" style="stop-color:#E9E9E9; stop-opacity:0"/>
          </linearGradient>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="url(#wave-gradient)" opacity="0.08"/>
          <use xlink:href="#gentle-wave" x="48" y="3" fill="url(#wave-gradient)" opacity="0.08"/>
          <use xlink:href="#gentle-wave" x="48" y="5" fill="url(#wave-gradient)" opacity="0.05"/>
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#8193DC" opacity="0.13"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.waves-bottom {
  margin-bottom: -8px;
}


.header {
  position: absolute;
  width: 100%;
  z-index: -1;
}

.waves {
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  margin-bottom: -7px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -9s;
  animation-duration: 14s;
}

.parallax > use:nth-child(2) {
  animation-delay: -17s;
  animation-duration: 20s;
}

.parallax > use:nth-child(3) {
  animation-delay: -2s;
  animation-duration: 26s;
}

.parallax > use:nth-child(4) {
  animation-delay: -15s;
  animation-duration: 40s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}


.manifesto-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: start;
  flex-direction: column;
  margin-top: 6px;
  width: 100%;
}

.manifesto-card {
  background-color: rgba(229, 229, 229, 0.01);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 0.7rem;
  padding: 16px;
}

.manifesto-text {

  font-weight: 350;
  font-size: x-large;
  width: fit-content;
  max-width: 800px;
  margin: 36px 0;
}

.hero-title {
  font-size: 56px;
}

.hero-wrapper {
  margin-top: 48px;
  position: relative;
  z-index: 1;
}

* {
  color: #191919;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  hr {
    display: none;
  }
  .manifesto-text:first-child {
    margin-top: 0;
  }
  .manifesto-text {
    font-size: 20px;
    text-align: start;
    padding: 5vw;
    margin: 16px 0;
  }

  .hero-wrapper {
    margin-top: 0;
    width: 100%;
  }

  .waves {
    height: 1500px;
    min-height: 40px;
  }
}
</style>
