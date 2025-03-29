<template>
  <div class="logos">
    <div class="gradient gradient-left"></div>

    <div class="logos-slide">
      <img
          v-for="(logo, index) in logos"
          :key="'slide1-' + index"
          :src="logo"
          :alt="'Logo ' + index"
      />
    </div>
    <div class="logos-slide">
      <img
          v-for="(logo, index) in logos"
          :key="'slide2-' + index"
          :src="logo"
          :alt="'Logo ' + index"
      />
    </div>
    <div class="gradient gradient-right"></div>

  </div>
</template>

<script>
export default {
  name: "BrandLogoSlider",
  data() {
    return {
      logos: [
        require("@/assets/project_greenoffice.png"),
        require("@/assets/project_fridaymascara.png"),
        require("@/assets/project_auctioneer.png"),
        require("@/assets/project_overpowered.png"),
        require("@/assets/project_portfolio.png"),
        require("@/assets/project_rembrandt.png"),
        require("@/assets/project_watnu.png"),
      ],
    };
  }
};
</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Keyframes for Sliding Animation */
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Main Container for the Slider */
.logos {
  overflow: hidden;
  padding: 60px 0;
  white-space: nowrap;
  position: relative;
}

/* Sliding Animation for Each Row */
.logos-slide {
  display: inline-block;
  animation: slide 30s linear infinite;
}

.logos-slide img {
  height: 150px;
  margin: 0 40px;
}

.logos:hover .logos-slide {
  animation-play-state: paused;
}

.gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20%;
  z-index: 2;
  pointer-events: none;
}

.gradient-left {
  left: 0;
  background: linear-gradient(to right, black, transparent);
}

.gradient-right {
  right: 0;
  background: linear-gradient(to left, black, transparent);
}
</style>