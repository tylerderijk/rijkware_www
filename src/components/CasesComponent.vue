<template>
  <div class="hero-wrapper">
    <h1 class="hero-title">{{ lang.hero_title }}</h1>
    <small>{{ lang.hero_subtitle }}</small>
  </div>
  <hr style="border: 1px solid rgba(233,233,233,0.3); width: 60%;">
  <div class="container">
    <div id="cards">
      <div v-for="caseItem in lang.cases"
           :key="caseItem.title"
           class="card"
           @click="toggleCard(caseItem)"
           @mousemove="updateMousePosition"
           @mouseenter="caseItem.isHovered = true"
           @mouseleave="caseItem.isHovered = false">
        <img :src="getImgUrl(caseItem.isHovered ? caseItem.image : caseItem.logo)"
             v-if="!caseItem.isClicked && !isMobile"
             class="case-image"
             :alt="`${caseItem.title}`">
        <img :src="getImgUrl(caseItem.image)"
             v-if="!caseItem.isClicked && isMobile"
             class="case-image case-image-mobile"
             :alt="`${caseItem.title}`">
        <small class="case-click-me" v-if="!caseItem.isClicked && !isMobile">Click me</small>
        <div class="case-texts">
          <h2 v-if="caseItem.isClicked" class="case-title blue-gradient">{{ caseItem.title }}</h2>
          <p v-if="caseItem.isClicked" class="case-description">{{ caseItem.description }}</p>
          <p v-if="caseItem.isClicked" class="case-small">{{ caseItem.extra }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CasesData from '@/assets/json/Cases.json';
import anime from 'animejs';

export default {
  name: 'CasesComponent',
  data() {
    return {
      lang: CasesData
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
      targets: ['.case-texts', '.case-button-wrapper'],
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(400),
      easing: 'easeInOutQuad'
    });
    anime({
      targets: '.case-image',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 390,
      delay: anime.stagger(400, {start: 400}) ,
      easing: 'easeInOutQuad'
    });

    window.addEventListener('mousemove', this.updateMousePosition);
  },
  methods: {
    getImgUrl(path) {
      let images = require.context('../assets/', false, /\.png$/);
      return images('./' + path + ".png");
    },
    toggleCard(caseItem) {
      caseItem.isClicked = !caseItem.isClicked;
    },
    updateMousePosition(event) {
      if (this.isMobile) {
        return;
      }

      let card = event.currentTarget;

      if (!card || !card.classList || !card.classList.contains('card')) {
        card = event.target.closest('.card');
      }

      if (card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    }
  },
  computed: {
    isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    },
  }
}
</script>
<style scoped>
.card:hover::before {
  opacity: 1;
}

.card::before,
.card::after {
  border-radius: inherit;
  content: "";
  height: 100%;
  left: 0px;
  opacity: 0;
  position: absolute;
  top: 0px;
  transition: opacity 500ms;
  width: 100%;
}

.card::before {
  background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(185, 201, 255, 0.16),
      transparent 40%
  );
  z-index: 3;
}

.card::after {
  background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
  );
  z-index: 1;
}





.case-description {
  font-size: medium;
  margin: 12px 0;
  text-align: start;
}

.case-title {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: start;
}

.case-small {
  text-align: start;
  font-size: small;
  color: gray;
}

.case-texts {
  padding: 16px;
}


.container {
  display: flex;
  justify-content: center;
}

#cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1016px;
  width: calc(100% - 20px);
}

.card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  height: 400px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  flex-direction: column;
}
.card::before {
  border-radius: inherit;
}




.case-image {
  padding: 24px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}

.case-image:hover {
  padding: 12px;
}

.case-image-mobile {
  padding: 0;
}
.case-image-mobile:hover {
  padding: 0;
}

.case-click-me {
  opacity: 0;
  transition: transform 0.4s ease-out;
}

.card:hover .case-click-me {
  transform: translateY(-30%);
  opacity: 1;
}

.case-title {
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.card:hover .case-image {
  opacity: 0.8;
}

.card .case-title {
  opacity: 1;
}

.hero-title {
  font-size: 56px;
}

.hero-wrapper {
  margin-top: 48px;
  position: relative;
  z-index: 1;
}

.container {
  margin-bottom: 64px;
}

@media (max-width: 768px) {
  .hero-wrapper {
    margin-top: 0;
  }

  .case-image {
    margin: 36px;
  }

  .card {
    height: fit-content;
  }
}
</style>
