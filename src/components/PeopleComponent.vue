<template>
  <div class="hero-wrapper">
    <h1 class="hero-title">{{ peopleData.hero_title }}</h1>
    <small>{{ peopleData.hero_subtitle }}</small>
  </div>
  <hr style="border: 1px solid rgba(233,233,233,0.3); width: 70%;">
  <section class="people-section">
    <article class="people-article" v-for="person in peopleData.people" :key="person.name">
      <h2 class="blue-gradient">{{ person.role }}</h2>
      <div class="people-wrapper" v-if="!person.team">
        <img class="people-image" :src="getImageUrl(person.image)" :alt="person.name">
        <div class="people-description">
          <h3>{{ person.name }}
            <small v-if="person.email">
              <a class="people-href-mailto" target="_blank" :href="`mailto:${person.email}`">{{ person.email }}</a>
            </small>
          </h3>
          <span>{{ person.description }}</span>
          <div class="people-socials">
            <a class="people-social" v-if="person.socials.linkedin" :href="person.socials.linkedin" target="_blank"
               title="LinkedIn">
              <LinkedInIcon :employeeName="person.name"/>
            </a>
            <a class="people-social" v-if="person.socials.instagram" :href="person.socials.instagram" target="_blank"
               title="Instagram">
              <InstagramIcon :employeeName="person.name"/>
            </a>
            <a class="people-social" v-if="person.socials.email" :href="person.socials.email" target="_blank"
               title="E-Mail">
              <EmailIcon :employeeName="person.name"/>
            </a>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="people-wrapper" v-for="teamMember in person.team" :key="teamMember.name">
          <img class="people-image" :src="getImageUrl(teamMember.image)" :alt="teamMember.name">
          <div class="people-description">
            <h3>{{ teamMember.name }} <small v-if="teamMember.email">{{ teamMember.email }}</small></h3>
            <span>{{ teamMember.description }}</span>
            <div class="people-socials">
              <a class="people-social" v-if="teamMember.socials.linkedin" :href="teamMember.socials.linkedin"
                 target="_blank" title="LinkedIn">
                <LinkedInIcon :employeeName="teamMember.name"/>
              </a>
              <a class="people-social" v-if="teamMember.socials.email" :href="teamMember.socials.email" target="_blank"
                 title="E-Mail">
                <EmailIcon :employeeName="teamMember.name"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import LinkedInIcon from "@/components/shorts/LinkedInIcon.vue";
import InstagramIcon from "@/components/shorts/InstagramIcon.vue";
import EmailIcon from "@/components/shorts/EmailIcon.vue";
import peopleData from '@/assets/json/People.json';
import anime from 'animejs';
import {onMounted} from "vue";

const getImageUrl = (imageName) => {
  return require(`@/assets/${imageName}`);
}

onMounted(() => {
  anime({
    targets: '.hero-title, .hero-wrapper small',
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(200)
  });

  anime({
    targets: '.people-article',
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(300, { start: 500 })
  });

  anime({
    targets: '.people-image',
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuad',
    delay: anime.stagger(300, { start: 1000 })
  });
});
</script>

<style scoped>
.people-href-mailto:hover {
  font-weight: 500;
}
.people-href-mailto {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  transition: all 100ms ease-in-out;
}

.people-social {
  cursor: pointer;
  color: inherit;
  padding: 6px 12px 0 0;
}

.people-social:hover {
  color: inherit;
}

.people-socials {
  color: #989898;
  margin-top: 8px;
}

.people-description h3 {
}

.people-description span {
  color: #989898;
}

.people-description {
  max-width: 600px;
  text-align: start;
  padding-left: 28px;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 90%;
}

.people-image {
  z-index: 1111111;
  width: 200px;
  border-radius: 50%;
}

.people-wrapper {
  display: flex;
  flex-direction: row;
  margin: 28px 0;
}

.people-article {
  margin: 36px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 800px;
}

.people-section {
  display: flex;
  align-items: center;
  flex-direction: column;
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
  .hero-title {
    font-size: 36px;
  }
  hr {
    display: none;
  }
  h2 {
    text-align: start;
  }

  .people-article {
    width: 90vw;
  }

  .people-description {
    padding-left: 0;
  }

  .people-image {
    width: 100px;
  }

  .people-wrapper {
    flex-direction: column;
  }

  .hero-wrapper {
    margin-top: 0px;
    width: 100%;
  }
}
</style>
