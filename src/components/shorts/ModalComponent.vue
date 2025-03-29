<template>
  <div v-if="show" class="modal">
    <div class="modal__overlay" @click="$emit('close')"></div>
    <div class="modal__content">
      <button class="modal__close" @click="$emit('close')">&times;</button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  mounted() {
    if (this.show) {
      document.body.style.overflow = 'hidden';
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(3px);
  }

  &__content {
    position: relative;
    background-color: #1a1a1a;
    border-radius: 8px;
    padding: 20px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    z-index: 100001;
    color: #e9e9e9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #e9e9e9;
    z-index: 100002;
    
    &:hover {
      color: #cbcbcb;
    }
  }
}
</style>