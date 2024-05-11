<template>
  <div class="hero-wrapper">
    <h1 class="hero-title">{{ lang.hero_title }}</h1>
    <small>{{ lang.hero_subtitle }}</small>
  </div>
  <hr style="border: 1px solid rgba(233,233,233,0.3); width: 70%;">
  <section v-for="caseItem in lang.cases" :key="caseItem.title" class="case-section">
    <div class="case-wrapper">
      <img :src="getImgUrl(caseItem.image)"
           class="case-image"
           :alt="`${caseItem.title}`">
      <div class="case-texts-wrapper">
        <article class="case-texts">
          <h3 class="grey-gradient">{{ caseItem.title }}</h3>
          <p>{{ caseItem.description }}</p>
        </article>
        <article v-if="caseItem.technologies" class="case-texts">
          <h3 class="grey-gradient">Technologies</h3>
          <p>{{ caseItem.technologies }}</p>
        </article>
        <article v-if="caseItem.results" class="case-texts">
          <h3 class="grey-gradient">Results Achieved</h3>
          <p>{{ caseItem.results }}</p>
        </article>
        <article v-if="caseItem.responsibilities" class="case-texts">
          <h3 class="grey-gradient">Responsibilities</h3>
          <p>{{ caseItem.responsibilities }}</p>
        </article>
        <article v-if="caseItem.duration" class="case-texts">
          <h3 class="grey-gradient">Duration</h3>
          <p>{{ caseItem.duration }}</p>
        </article>
        <article v-if="caseItem.features" class="case-texts">
          <h3 class="grey-gradient">Features</h3>
          <p>{{ caseItem.features }}</p>
        </article>
        <article v-if="caseItem.management" class="case-texts">
          <h3 class="grey-gradient">Management</h3>
          <p>{{ caseItem.management }}</p>
        </article>
        <div class="case-button-wrapper">
          <button v-if="caseItem.url">
            <a class="svg-wrapper-1" :href="caseItem.url" target="_blank">
              <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e9e9e9" width="30" height="30"
                     class="icon">
                  <path
                      d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
                  ></path>
                </svg>
              </div>
            </a>
            <a class="case-url" :href="caseItem.url" target="_blank">Visit</a>
          </button>
        </div>
      </div>
    </div>
  </section>
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
      duration: 1000,
      delay: anime.stagger(400),
      easing: 'easeInOutQuad'
    });
  },
  methods: {
    getImgUrl(path) {
      var images = require.context('../assets/', false, /\.png$/)
      return images('./' + path + ".png")
    }
  }
}
</script>
<style scoped>
.case-url {
  color: inherit;
  text-decoration: none;
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button {
  font-size: 18px;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  font-weight: 400;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  transform: scale(1.25);
  transition: 0.5s linear;
}

button:hover svg {
  transform: translateX(1.2em) scale(1.1);
  fill: #fff;
}

button:hover .case-url {
  opacity: 0;
  transition: 0.5s linear;
}

button:active {
  transform: scale(0.95);
}

p {
  color: #EAEAEA;
  font-weight: 300;
}

h3 {
  font-weight: 200;
}

.case-image {
  width: 40%;
  min-width: 400px;
  max-width: 700px;
  object-fit: cover;
}

.case-texts-wrapper {
  max-width: 700px;
  text-align: start;
  width: 60%;
  padding-left: 20px;
  padding-top: 96px;
}

.case-texts {
  margin-bottom: 18px;
}

.case-wrapper {
  gap: 18px;
  padding: 36px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.case-section {
  padding: 28px 5% 128px 5%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}


.hero-title {
  font-size: 56px;
}

.hero-wrapper {
  margin-top: 48px;
  position: relative;
  z-index: 1;
}


@media (max-width: 768px) {
  .case-section {
    padding: 28px 5% 36px 5%;
  }
  .case-texts-wrapper {
    width: 90vw;
    padding-top: 8px;
  }
  .case-wrapper {
    flex-direction: column;
  }

  .case-image {
    min-width: 80vw;
  }
}
</style>
