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
      targets: '.manifesto__title, .manifesto__subtitle',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(200)
    });

    anime({
      targets: '.manifesto__text',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(300),
      easing: 'easeInOutQuad'
    });
  }
}
</script>

<template>
  <div class="manifesto">
    <div class="manifesto__header">
      <h2 class="manifesto__title u-text-gradient--white-blue-3">{{ lang.hero_title }}</h2>
      <p class="manifesto__subtitle">{{ lang.hero_subtitle }}</p>
    </div>

    <div class="manifesto__content">
      <div class="manifesto__card">
        <p class="manifesto__text" v-for="(text, index) in lang.text_sections" :key="index">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manifesto {
  margin-bottom: 128px;
  position: relative;
  background: linear-gradient(to bottom, transparent, rgba(61, 78, 135, 0.25), black);
  color: #e9e9e9;

  &__header {
    text-align: center;
    margin-bottom: 48px;
  }

  &__title {
    font-family: "Unbounded", system-ui;
    font-size: 48px;
    font-weight: 400;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 36px;
    }
  }

  &__subtitle {
    font-size: 20px;
    font-weight: 300;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -100%);
      width: 70vh;
      height: 70vh;
      background: radial-gradient(circle, rgba(91, 113, 201, 0.3) 0%, rgba(0, 0, 0, 0) 60%);
      filter: blur(150px);
      z-index: -1;
      pointer-events: none;
    }
  }

  &__card {
    background-color: rgba(229, 229, 229, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 32px;
    width: 90%;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      padding: 24px 16px;
    }
  }

  &__text {
    font-weight: 300;
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 24px;
    text-align: left;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
</style>
