<template>
  <div class="slider-wrapper">
    <small></small>
    <div class="gradient gradient-left"></div>
    <div class="gradient gradient-right"></div>

    <div class="slider-container">
      <div
          class="slider-row"
          v-for="(row, index) in rows"
          :key="index"
          :style="{ animationPlayState: isHovered[index] ? 'paused' : 'running' }"
          @mouseenter="pauseRow(index)"
          @mouseleave="resumeRow(index)"
      >
        <div
            class="slider-track"
            :style="{ transform: `translateX(${currentTranslate[index]}px)` }"
            @transitionend="resetPosition(index)"
        >
          <div
              v-for="(item, idx) in visibleSlidesForRow(index)"
              :key="`row-${index}-item-${idx}`"
              class="slider-item"
          >
            <img :src="item" :alt="'Slide ' + idx" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfinitySlider",
  props: {
    slides: {
      type: Array,
      required: true,
    },
    rows: {
      type: Number,
      default: 3, // Number of horizontal rows
    },
    autoScrollIntervals: {
      type: Array,
      default: () => [2500, 4000, 5000], // Different scroll intervals for rows
    },
  },
  data() {
    return {
      currentTranslate: [],
      isHovered: [],
      autoScrollTimers: [],
    };
  },
  computed: {
    visibleSlidesForRow() {
      return (index) => {
        const shiftedSlides = [
          ...this.slides.slice(index),
          ...this.slides.slice(0, index),
        ];
        return [...shiftedSlides, ...shiftedSlides]; // Duplicate slides for seamless looping
      };
    },
  },
  methods: {
    startAutoScroll(index) {
      this.autoScrollTimers[index] = setInterval(() => {
        this.scrollNext(index);
      }, this.autoScrollIntervals[index % this.autoScrollIntervals.length]);
    },
    stopAutoScroll(index) {
      clearInterval(this.autoScrollTimers[index]);
    },
    scrollNext(index) {
      this.currentTranslate[index] -= 300; // Move the slider left
      if (
          Math.abs(this.currentTranslate[index]) >=
          300 * this.slides.length
      ) {
        this.currentTranslate[index] = 0; // Reset to the initial position
      }
    },
    resetPosition(index) {
      if (
          Math.abs(this.currentTranslate[index]) >=
          300 * this.slides.length
      ) {
        this.currentTranslate[index] = 0;
      }
    },
    pauseRow(index) {
      this.isHovered[index] = true;
      this.stopAutoScroll(index);
    },
    resumeRow(index) {
      this.isHovered[index] = false;
      this.startAutoScroll(index);
    },
  },
  mounted() {
    this.currentTranslate = Array(this.rows).fill(0);
    this.isHovered = Array(this.rows).fill(false);

    for (let i = 0; i < this.rows; i++) {
      this.startAutoScroll(i);
    }
  },
  beforeUnmount() {
    this.autoScrollTimers.forEach((timer, index) => {
      this.stopAutoScroll(index);
    });
  },
};
</script>

<style lang="scss" scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: black;
}

/* Wrapper for the Entire Slider */
.slider {
  &-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%; /* Full height */
    background: black;
  }

  /* Container for Rows */
  &-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  /* Individual Row for Horizontal Slides */
  &-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    width: 100%;
    transition: animation-play-state 0.3s ease;
  }

  /* Sliding Animation */
  &-track {
    display: flex;
    flex-direction: row;
    transition: transform 0.5s ease-in-out;
  }

  /* Each Slide Item */
  &-item {
    width: 300px;
    height: 200px;
    margin: 0 36px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
}

/* Gradient Effect for Left and Right */
.gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 250px;
  z-index: 2;
  pointer-events: none;

  &-left {
    left: 0;
    background: linear-gradient(to right, black, transparent);
  }

  &-right {
    right: 0;
    background: linear-gradient(to left, black, transparent);
  }
}
</style>
