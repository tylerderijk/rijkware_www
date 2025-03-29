<script>
import ContactData from "@/assets/json/Contact.json";
import emailjs from '@emailjs/browser';
import PhoneIcon from "@/components/shorts/PhoneIcon.vue";
import FaqIcon from "@/components/shorts/FaqIcon.vue";
import anime from 'animejs';

export default {
  name: 'ContactComponent',
  components: {FaqIcon, PhoneIcon},
  inheritAttrs: false,
  data() {
    return {
      lang: ContactData,
      contactForm: {
        message: "",
        email: "",
        phone: "",
        dataConsent: false
      },
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      formIsValid: false,
      sendingFormMessage: false
    };
  },
  mounted() {
    anime({
      targets: '.contact__title, .contact__subtitle',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(200)
    });

    anime({
      targets: '.contact__form-section, .contact__phone-card, .contact__faq, .contact__subtitle',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(300, { start: 500 })
    });

    anime({
      targets: '.contact__faq-item',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutQuad',
      delay: anime.stagger(300, { start: 800 })
    });
  },
  methods: {
    validateForm() {
      this.formIsValid = this.emailRegex.test(this.contactForm.email) && this.contactForm.dataConsent;
    },
    async submitForm() {
      if (this.formIsValid) {
        this.sendingFormMessage = true;
        await this.postMessage();
      } else {
        alert('Please enter a valid email address.');
      }
    },
    async postMessage() {
      const keys = {
        service_id: process.env.VUE_APP_EMAIL_SERVICE_ID,
        template_id: process.env.VUE_APP_EMAIL_TEMPLATE_ID,
        public_key: process.env.VUE_APP_EMAIL_PUBLIC_KEY,
      };

      emailjs.sendForm(
          keys.service_id,
          keys.template_id,
          this.$refs.form,
          keys.public_key
      ).then(
          () => {
            alert('Message sent, thank you for contacting us!');
            this.clearFormFields();
          },
          (error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
          }
      ).finally(() => {
        this.sendingFormMessage = false;
      });
    },
    clearFormFields() {
      this.contactForm = {
        message: "",
        email: "",
        phone: "",
        dataConsent: false
      };
    }
  }
}
</script>

<template>
  <div id="contact" class="contact" v-bind="$attrs">
    <div class="contact__form-section">
      <h2 class="contact__title">Start the Conversation</h2>
      <form @submit.prevent="submitForm" class="contact__form" ref="form">
        <div class="contact__loader" ref="loader" v-if="this.sendingFormMessage">
          <div class="contact__spinner"></div>
        </div>
        <div class="contact__form-container">
          <textarea v-model="contactForm.message" maxlength="500" placeholder="Write your message here. (required)"
                    name="message" id="message" rows="5" class="contact__input contact__input--message" required></textarea>
          <small class="contact__char-count">{{ contactForm.message.length }}/500</small>
          <input v-model="contactForm.email" @blur="validateForm" placeholder="E-Mail (required)" type="text"
                 name="from_email" id="from_email" class="contact__input" required>
          <input name="from_phone" id="from_phone" v-model="contactForm.phone" placeholder="Phone Number" type="text"
                 class="contact__input">
          <div class="contact__checkbox-container">
            <input type="checkbox" id="dataConsent" name="dataConsent" v-model="contactForm.dataConsent" @change="validateForm" required class="contact__checkbox">
            <label for="dataConsent" class="contact__checkbox-label">By submitting this form, you agree to Rijkware processing your data to respond to your inquiry.</label>
          </div>
          <button type="submit" class="contact__submit-btn">Send Message</button>
        </div>
      </form>
    </div>
    <div class="contact__info-section">
      <div class="contact__info-container">
        <h3 class="contact__subtitle">Can't wait for an e-mail reply?</h3>
        <a class="contact__phone-card" href="tel:+31642068928">
          <PhoneIcon/>
          <h4 class="contact__phone-number">Give us a call</h4>
        </a>
        <section class="contact__faq">
          <h2 class="contact__title">Frequently Asked Questions</h2>
          <details class="contact__faq-item" v-for="(faq, index) in lang.faqs" v-bind:key="index">
            <summary class="contact__faq-summary">
              <h3 class="contact__faq-question">
                <FaqIcon/>
                {{ faq["summary"] }}
              </h3>
            </summary>
            <div class="contact__faq-answer">
              <p>
                {{ faq["text"] }}
              </p>
            </div>
          </details>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Base styles
.contact {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 96px auto;

  &__title, &__subtitle {
    font-family: "Quicksand", system-ui;
    color: #e9e9e9;
    text-align: left;
    margin-bottom: 24px;
    width: 100%;
  }

  &__title {
    font-size: 32px;
    font-weight: 600;
  }

  &__subtitle {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  // Form section
  &__form-section {
    width: 100%;
    max-width: 860px;
    margin: 32px auto;
  }

  &__form {
    width: 100%;
    position: relative;
  }

  &__form-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  &__input {
    width: 100%;
    border: 1px solid #5d5d5d;
    border-radius: 8px;
    background-color: #171717;
    padding: 12px;
    color: #e9e9e9;
    transition: border 0.2s ease;
    font-size: 16px;

    &:focus {
      border: 1px solid rgb(2, 58, 162);
      outline: none;

      &::placeholder {
        color: rgb(0, 81, 255);
      }
    }

    &--message {
      min-height: 150px;
      resize: vertical;
    }
  }

  &__char-count {
    align-self: flex-end;
    color: #a0a0a0;
    font-size: 14px;
  }

  &__checkbox-container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 8px;
  }

  &__checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #5d5d5d;
    border-radius: 4px;
    background-color: #171717;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    margin-top: 2px;

    &:checked {
      background-color: rgb(0, 81, 255);
      border-color: rgb(0, 81, 255);

      &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 6px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:focus {
      outline: none;
      border-color: rgb(2, 58, 162);
    }
  }

  &__checkbox-label {
    margin-top: 2px;
    font-size: 14px;
    color: #e9e9e9;
    font-weight: 200;
    text-align: start;
  }

  &__submit-btn {
    background-color: rgba(255, 255, 255, 0.074);
    border: 1px solid rgba(255, 255, 255, 0.222);
    font-weight: 300;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: fit-content;
    padding: 12px 24px;

    &:hover {
      transform: translateY(-3px);
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
      transform: translateY(4px);
    }
  }

  // Loader
  &__loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s;
  }

  &__spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #e7e7e7;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  // Info section
  &__info-section {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
  }

  &__info-container {
    width: 100%;
    max-width: 860px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__phone-card {
    display: flex;
    align-items: center;
    gap: 18px;
    background-color: rgba(255, 255, 255, 0.074);
    border: 1px solid rgba(255, 255, 255, 0.222);
    border-radius: 12px;
    padding: 12px 24px;
    width: fit-content;
    text-decoration: none;
    color: inherit;
    margin-bottom: 32px;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &__phone-number {
    margin: 0;
    font-size: 18px;
    font-family: "Lexend", Helvetica, Arial, sans-serif;
    font-weight: 300;
  }

  // FAQ section
  &__faq {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 48px 0;
  }

  &__faq-item {
    border-radius: 8px;
    border: 1px solid #5d5d5d;
    width: 100%;
    padding: 16px;
    transition: all 0.35s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }

  &__faq-summary {
    display: flex;
    align-items: center;
  }

  &__faq-question {
    color: #e9e9e9;
    display: flex;
    align-items: center;
    text-align: start;
    gap: 16px;
    margin: 0;
    font-weight: 400;
    font-size: 18px;
  }

  &__faq-answer {
    color: #dedede;
    padding: 16px 0 0 40px;
    text-align: start;

    p {
      margin: 0;
      line-height: 1.6;
    }
  }

  // Hover effect for FAQ items
  &__faq:has(&__faq-item:hover) &__faq-item:not(:hover) {
    filter: brightness(50%);
  }
}

// Icon rotation
details[open] .details-icon {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

.details-icon {
  transition: transform 0.3s ease;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Media queries
@media (max-width: 768px) {
  .contact {
    &__form-section,
    &__info-container {
      width: 90%;
      padding: 24px 0;
    }

    &__title {
      font-size: 28px;
    }

    &__subtitle {
      font-size: 22px;
    }

    &__phone-card {
      width: 100%;
      max-width: none;
    }

    &__faq {
      margin-bottom: 24px;
    }

    &__faq-answer {
      padding: 16px 0 0 16px;
    }
  }
}
</style>
