<template>
  <div class="cases-hero">
    <h1 class="cases-hero__title">{{ lang.hero_title }}</h1>
    <small class="cases-hero__subtitle">{{ lang.hero_subtitle }}</small>
  </div>
  <hr style="border: 1px solid rgba(233,233,233,0.3); width: 60%;">
  <div class="cases">
    <div class="cases__list">
      <div v-for="caseItem in lang.cases"
           :key="caseItem.title"
           class="cases__card"
           @click="toggleCard(caseItem)"
           @mousemove="updateMousePosition"
           @mouseenter="caseItem.isHovered = true"
           @mouseleave="caseItem.isHovered = false">
        <img :src="getImgUrl(caseItem.isHovered ? caseItem.image : caseItem.logo)"
             v-if="!caseItem.isClicked && !isMobile"
             class="cases__card-image"
             :alt="`${caseItem.title}`">
        <img :src="getImgUrl(caseItem.image)"
             v-if="!caseItem.isClicked && isMobile"
             class="cases__card-image cases__card-image--mobile"
             :alt="`${caseItem.title}`">
        <small class="cases__card-hint" v-if="!caseItem.isClicked && !isMobile">Click me</small>
        <div class="cases__card-content">
          <h2 v-if="caseItem.isClicked" class="cases__card-title u-text-gradient--blue">{{ caseItem.title }}</h2>
          <p v-if="caseItem.isClicked" class="cases__card-description">{{ caseItem.description }}</p>
          <p v-if="caseItem.isClicked" class="cases__card-extra">{{ caseItem.extra }} </p>
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
      targets: ['.case-image'],
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 390,
      delay: anime.stagger(400, {start: 400}) ,
      easing: 'easeInOutQuad'
    });
    anime({
      targets: ['#cards'],
      opacity: [0, 1],
      duration: 390,
      delay: 200,
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

      if (!card || !card.classList || !card.classList.contains('cases__card')) {
        card = event.target.closest('.cases__card');
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
.cases__card:hover::before {
  opacity: 1;
}

.cases__card::before,
.cases__card::after {
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

.cases__card::before {
  background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(185, 201, 255, 0.16),
      transparent 40%
  );
  z-index: 3;
}

.cases__card::after {
  background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
  );
  z-index: 1;
}





.cases__card-description {
  font-size: medium;
  margin: 12px 0;
  text-align: start;
}

.cases__card-title {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: start;
}

.cases__card-extra {
  text-align: start;
  font-size: small;
  color: gray;
}

.cases__card-content {
  padding: 16px;
}


.cases {
  display: flex;
  justify-content: center;
}

.cases__list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1016px;
  width: calc(100% - 20px);
}

.cases__card {
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
.cases__card::before {
  border-radius: inherit;
}




.cases__card-image {
  padding: 24px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}

.cases__card-image:hover {
  padding: 12px;
}

.cases__card-image--mobile {
  padding: 0;
}
.cases__card-image--mobile:hover {
  padding: 0;
}

.cases__card-hint {
  opacity: 0;
  transition: transform 0.4s ease-out;
}

.cases__card:hover .cases__card-hint {
  transform: translateY(-30%);
  opacity: 1;
}

.cases__card-title {
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.cases__card:hover .cases__card-image {
  opacity: 0.8;
}

.cases__card .cases__card-title {
  opacity: 1;
}

.cases-hero__title {
  font-size: 56px;
}

.cases-hero {
  margin-top: 48px;
  position: relative;
  z-index: 1;
}

.cases {
  margin-bottom: 64px;
}

@media (max-width: 768px) {
  .cases-hero__title {
    font-size: 36px;
  }
  hr {
    display: none;
  }
  .cases-hero {
    margin-top: 0;
    margin-bottom: 12px;
  }

  .cases__card-image {
    margin: 36px;
  }

  .cases__card {
    height: fit-content;
  }
}
</style>
