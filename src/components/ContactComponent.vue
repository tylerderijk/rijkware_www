<script>
import ContactData from "@/assets/json/Contact.json";
import emailjs from '@emailjs/browser';
import PhoneIcon from "@/components/shorts/PhoneIcon.vue";
import FaqIcon from "@/components/shorts/FaqIcon.vue";

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
        phone: ""
      },
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      formIsValid: false,
      sendingFormMessage: false
    };
  },
  mounted() {
    const faqs = document.querySelectorAll('.holder-qna');
    faqs.forEach((reason) => {
      reason.style.opacity = 0;
      reason.style.transition = 'opacity 2s, filter 350ms';
      window.addEventListener('scroll', () => {
        if (reason.getBoundingClientRect().top < window.innerHeight) {
          reason.style.opacity = 1;
        }
      });
    });
  },
  methods: {
    validateEmail() {
      this.formIsValid = this.emailRegex.test(this.contactForm.email);
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
        phone: ""
      };
    }
  }
}
</script>

<template>
  <div class="hero-wrapper">
    <h1 class="hero-title">Contact Us</h1>
    <small>Have questions? We're here to help. (Scroll down for FAQ)</small>
  </div>
  <hr style="border: 1px solid rgba(233,233,233,0.3); width: 70%;">
  <div class="contact-main" v-bind="$attrs">
    <div class="contact-wrapper">
      <form @submit.prevent="submitForm" class="form" ref="form">
        <div class="loader-form" ref="loader" v-if="this.sendingFormMessage">
          <div class="spinner-form"></div>
        </div>
        <div class="contact-container">
          <textarea v-model="contactForm.message" maxlength="500" placeholder="Write your message here. (required)"
                    name="message" id="message" rows="5" class="fInput message" required></textarea>
          <small>{{ contactForm.message.length }}/500</small>
          <input v-model="contactForm.email" @blur="validateEmail" placeholder="E-Mail (required)" type="text"
                 name="from_email" id="from_email" class="fInput email" required>
          <input name="from_phone" id="from_phone" v-model="contactForm.phone" placeholder="Phone Number" type="text"
                 class="fInput email">
          <input type="submit" value="Send Message" class="submit">
        </div>
      </form>
    </div>
    <div class="contact-bottom-wrapper">
      <div class="contact-call-wrapper">
        <h3>Can't wait for an e-mail reply?</h3>
        <a class="contact-call-card" href="tel:+31642068928">
          <PhoneIcon/>
          <h4> +31 420 68 928</h4>
        </a>
        <section class="section-qna">
          <h3>Frequently Asked Questions</h3>
          <details class="holder-qna" v-for="(faq, index) in lang.faqs" v-bind:key="index">
            <summary>
              <h3 class="title-faq-why">
                <FaqIcon/>
                {{ faq["summary"] }}
              </h3>
            </summary>
            <div class="text-why">
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

<style scoped>
.contact-bottom-wrapper {
  display: flex;
  justify-content: center;
}
.section-qna {
  margin: 84px 0 36px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
  gap: 16px;
}

.holder-qna {
  border-radius: 8px;
  border: solid 1px #5d5d5d;
  text-align: start;
  width: 100%;
  padding: 12px;
  transition: all 350ms ease-in-out;
}

.holder-qna:hover {
  cursor: pointer;
}

.holder-qna:focus {
  outline: none;
}

.section-qna:has(.holder-qna:hover)
.holder-qna:not(:hover) {
  filter: brightness(50%);
}

.text-why {
  color: #dedede;
  padding: 16px;
}

summary {
  display: flex;
  align-items: center;
}

.title-faq-why {
  color: #e9e9e9;
  gap: 16px;
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 300;
}

.contact-call-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 128px;
}

.contact-call-card h4 {
  font-family: "Unbounded", system-ui;
  font-size: large;
}

.contact-call-card {
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background-color: #191919;
  border-radius: 8px;
  padding: 8px 0;
  width: 50%;
  transition: all ease-in-out 350ms;
  text-decoration: none;
}

.contact-call-card:hover {
  transform: translateY(2px);
}

.loader-form {
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

.spinner-form {
  width: 50px;
  height: 50px;
  border: 5px solid #e7e7e7;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.contact-wrapper {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 56px 0;
}

.form {
  display: flex;
  text-align: start;
  flex-direction: column;
  width: 50%;
  height: fit-content;
}

.contact-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
  background-color: rgba(255, 0, 0, 0);
}

.fInput {
  border: solid 1px #5d5d5d;
  width: 100%;
  border-radius: 8px;
  background-color: black;
  padding: 10px;
  color: #e9e9e9;
  transition: .1s;
}

.fInput:focus {
  border: 1px rgb(2, 58, 162) solid;
  outline: none;
}

.fInput:focus::placeholder {
  color: rgb(0, 81, 255);
}

.fInput.message {
  padding-bottom: 80px;
}

.submit {
  background-color: #191919;
  border: none;
  color: #e9e9e9;
  height: 56px;
  font-weight: 400;
  padding: 7px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: .5s;
  width: 100%;
}

.submit:hover {
  font-weight: 600;
  opacity: .9;
}

.submit:active {
  transform: translateY(-12px);
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
  .form {
    width: 90%;
  }

  .contact-container {
    align-items: center;
  }

  .contact-wrapper {
    margin: 64px 0;
  }

  .hero-wrapper {
    width: 100%;
  }

  .contact-call-wrapper {
    width: 90vw;
    margin-bottom: 64px;
  }

  .contact-call-card {
    width: 90vw;
  }

  .contact-main {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
