<template>
  <div class="team-container">
    <div
        class="team-card"
        v-for="(teamMember, index) in teamData.team"
        :key="index"
    >
      <div
          class="team-image"
          :style="{ backgroundImage: `url(${require(`@/assets/${teamMember.image}`)})` }"
      ></div>
      <div class="team-description">
        <h3 class="team-description-name">{{ teamMember.name }}</h3>
        <small class="team-description-role">{{ teamMember.role }}</small>
        <div class="team-description-socials">
          <a v-if="teamMember.socials.linkedin" :href="teamMember.socials.linkedin" target="_blank" title="LinkedIn">
            <LinkedInIcon :employeeName="teamMember.name" />
          </a>
          <a v-if="teamMember.socials.instagram" :href="teamMember.socials.instagram" target="_blank" title="Instagram">
            <InstagramIcon :employeeName="teamMember.name" />
          </a>
          <a v-if="teamMember.socials.email" :href="`mailto:${teamMember.socials.email}`" target="_blank" title="Email">
            <EmailIcon :employeeName="teamMember.name" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import anime from 'animejs';
import { onMounted } from 'vue';
import LinkedInIcon from '@/components/shorts/LinkedInIcon.vue';
import EmailIcon from '@/components/shorts/EmailIcon.vue';
import InstagramIcon from '@/components/shorts/InstagramIcon.vue';
import teamData from '@/assets/json/teamData.json';

onMounted(() => {
  anime({
    targets: '.hero-title, .hero-wrapper small',
    translateY: [-20, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(200),
  });
});
</script>

<style scoped>
.team-container {
  display: grid;
  grid-template-columns: repeat(4, auto);
  place-items: center;
  gap: 36px 56px;
  width: 100%;
  justify-content: center;
}

.team-card {
  background: #191919;
  height: 420px;
  width: 300px;
  border-radius: 12px;
  box-shadow: 20px 20px 60px #000000, -20px -20px 60px #000000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.team-image {
  height: 80%;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-bottom: 2px solid white;
}

.team-description {
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

.team-description-name {
  margin-bottom: 2px;
  font-size: 18px;
  font-weight: 400;
  color: white;
}

.team-description-role {
  font-size: 14px;
  color: #5b71c9;
}

.team-description-socials {
  margin: 8px 0;
}
.team-description-socials a {
  color: inherit;
  margin: 8px 12px;
}

@media (max-width: 768px) {
  .team-container {
    grid-template-columns: 1fr;
    padding: 24px;
    transform: scale(0.9);
  }

  .team-card {
    width: 100%;
    height: 500px;
  }
}
</style>