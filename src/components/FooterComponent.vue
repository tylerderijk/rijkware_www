<script>
import ExternalLinkSVG from "@/components/shorts/ExternalLinkSVG.vue";

export default {
  name: "FooterComponent",
  components: { ExternalLinkSVG },
  data() {
    return {
      currentPhoneImage: require("../assets/WatNuMOCKEPS.png"),
      currentLaptopImage: require("../assets/project_overpowered.png")
    };
  },
  methods: {
    getImageUrl(imageName) {
      return require(`@/assets/${imageName}`);
    },
    scrollToSection(sectionId) {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  }
}
</script>
<template>
  <div class="footer">
    <div class="footer__hero">
      <div class="footer__hero-cover"></div>
      <img class="footer__hero-iphone" alt="iPhone showcasing WatNu iOS app" :src="currentPhoneImage">
      <img class="footer__hero-laptop" alt="Laptop showcasing Rijkware website" :src="currentLaptopImage">
    </div>
    <div class="footer__container">
      <div class="footer__wrapper">
        <section class="footer__top">
          <div class="footer__top-text-container">
            <div class="footer__top-text">
              <h2>Become a <br><span class="u-text-gradient--blue">Student Developer</span></h2>
              <h4>Find work related to the field you wish to grow in.</h4>
              <a href="#contact" class="footer__contact-button" @click.prevent="scrollToSection('contact')">Contact Us</a>
            </div>
          </div>
          <img alt="Students" src="../assets/PictureStudentDevs.jpg" class="footer__top-image">
        </section>
      </div>
      <div class="footer__ending">

        <div class="footer__bottom">
          <div class="footer__bottom-identity">
            <img alt="Rijkware" src="../assets/RijkwareLogo-2024-v2.png" class="footer__bottom-logo">
            <h3>Rijkware</h3>
            <h3 class="u-text-gradient--blue footer__bottom-identity-text">Student<br>Developers</h3>
          </div>
          <div>
            <small class="footer__bottom-label">Company</small>
            <ul class="footer__bottom-list">
              <li>
                <a href="#about" @click="scrollToSection('about')">About us</a>
              </li>
              <li>
                <a href="#manifesto" @click="scrollToSection('manifesto')">Why</a>
              </li>
              <li>
                <a href="#manifesto" @click="scrollToSection('manifesto')">Manifesto</a>
              </li>
              <li>
                <a href="#contact" @click="scrollToSection('contact')">Contact</a>
              </li>
              <li>
                <a href="#contact" @click="scrollToSection('contact')">FAQ's</a>
              </li>
            </ul>
          </div>
          <div>
            <small class="footer__bottom-label">Legal</small>
            <ul class="footer__bottom-list">
              <li><a target="_blank" href="https://www.kvk.nl/bestellen/#/77829115000045497664">KvK - CoC
                <ExternalLinkSVG/>
              </a></li>
              <li>
                <a href="#" @click.prevent>Terms & Conditions</a>
              </li>
              <li>
                <a href="#" @click.prevent>Privacy Policy</a>
              </li>
              <li>
                <a href="#" @click.prevent>Cookies</a>
              </li>
            </ul>
          </div>
          <div>
            <small class="footer__bottom-label">Follow us</small>
            <ul class="footer__bottom-list">
              <li><a target="_blank" href="https://www.instagram.com/rijkware/">Instagram
                <ExternalLinkSVG/>
              </a></li>
              <li><a target="_blank" href="https://www.linkedin.com/company/rijkware">LinkedIn
                <ExternalLinkSVG/>
              </a></li>
              <li><a target="_blank" href="https://www.facebook.com/rijkware">Facebook
                <ExternalLinkSVG/>
              </a></li>
              <li><a target="_blank" href="https://twitter.com/rijkware">X
                <ExternalLinkSVG/>
              </a></li>
            </ul>
          </div>
          <div>
            <small class="footer__bottom-label">Help</small>
            <ul class="footer__bottom-list">
              <li class="footer__help-item">
                <small class="footer__help-label">For support/contact</small><br>
                <span class="footer__help-value"><a target="_blank" href="mailto:contact@rijkware.nl">contact@rijkware.nl</a></span>
              </li>
              <li class="footer__help-item">
                <small class="footer__help-label">Mobile (Dutch)</small><br>
                <span class="footer__help-value"><a target="_blank" href="tel:+31642068928">+31 6 420 68 928</a></span>
              </li>
              <li class="footer__help-item">
                <small class="footer__help-label">Address</small><br>
                <span
                    class="footer__help-value">Gelrestraat 84<br>1079MZ Amsterdam<br>North-Holland, the Netherlands</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer__credits-container">
          <div class="footer__credits">
            <h5>Rijkware | Hire Student Developers</h5>
            <small>
              Copyright © Rijkware | Gelrestraat 84, 1079MZ Amsterdam, the Netherlands | VAT, tax code, and number of
              registration with the
              Kamer van Koophandel Register: 77829115
            </small>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #cbcbcb;
  }
}

.footer {
  &__hero {
    position: relative;
    padding-top: 48px;
    background-color: black;

    &-cover {
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      height: 600px;
      width: 100%;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.99), black);
    }

    &-iphone,
    &-laptop {
      position: relative;
      height: 600px;
    }
  }

  &__credits {
    width: 90%;
    padding: 24px 0;
    box-shadow: white 0 -1px;
    max-width: 1240px;

    h5 {
      margin: 0;
    }

    &-container {
      display: flex;
      justify-content: center;
      line-height: 1.2;
      text-align: start;
      margin-top: 12px;
      width: 100%;

      small {
        color: #989898;
      }
    }
  }

  &__help {
    margin-top: 6px;

    &-item {
      margin-top: 6px;
    }

    &-label {
      color: #989898;
      font-size: 12px;
    }

    &-value {
      display: block;
      font-size: 12px;
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    height: fit-content;
    max-width: 1400px;

    div {
      text-align: start;
    }

    &-identity {
      margin-top: 10px;

      h3 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 8px;
      }

      &-text {
        margin: 0;
      }
    }

    &-logo {
      height: 50px;
    }

    &-label {
      color: #989898;
      font-size: 10px;
    }

    &-list {
      list-style-type: none;
      padding: 0;
      margin-top: 12px;

      li {
        font-size: 16px;
        padding: 2px 0;
        font-weight: 200;
      }
    }
  }

  &__container {
    background-color: black;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 48px;
  }

  &__top {
    display: flex;
    align-items: center;

    &-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 36px;
      text-align: start;
      max-width: 600px;
      min-width: 600px;
      height: 100%;

      > h4 {
        @media (max-width: 820px) {
          width: 90vw;
        }
      }
    }

    &-text-container {
      box-shadow: white 0 1px;
      height: 100%;
      width: 100%;
    }

    &-image {
      filter: grayscale(30%);
      border-radius: 8px 8px 8px 0;
      max-height: 500px;
      margin-bottom: -2px;
    }
  }

  &__wrapper {
    width: 90%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
    padding-bottom: 36px;
  }

  &__contact-button {
    font-family: "Quicksand", system-ui;
    background-color: #e9e9e9;
    border: 0.125em solid #e9e9e9;
    color: #191919;
    border-radius: 8px;
    width: fit-content;
    padding: 0.8em 2em;
    text-align: center;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    font-weight: bold;
    font-size: 16px;

    &:disabled {
      pointer-events: none;
    }

    &:hover {
      color: #fff;
      background-color: #1A1A1A;
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: none;
      transform: translateY(0);
    }
  }

  &__ending {
    height: fit-content;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 90%;
  }
}

hr {
  border-top: 10px solid red;
}

h2 {
  font-family: "Unbounded", system-ui;
  font-weight: 300;
  font-size: 36px;
}

h4 {
  font-weight: 300;
  color: #989898;
}

template {
  width: 100vw;
}

@media (max-width: 1300px) {
  .footer {
    &__top {
      width: 100%;
      align-items: start;
      gap: 36px;
      padding: 0;
      flex-direction: column;
    }

    &__hero-laptop {
      display: none;
    }

    &__top-image {
      object-fit: none;
      object-position: top;
      border-radius: 0;
      width: 100%;
    }
  }
}

@media (max-width: 820px) {
  .footer {
    &__top-image {
      display: none;
      height: fit-content;
    }

    &__container {
      padding: 0;
    }

    &__top-text {
      padding: 5vw;
      min-width: 90vw;
    }

    &__top-text-container {
      box-shadow: none;
      max-width: 90vw;
      min-width: 90vw;
      width: 90vw;
    }

    &__wrapper {
      width: 100%;
    }

    &__bottom {
      gap: 32px;
      flex-direction: column;
    }
  }
}
</style>
