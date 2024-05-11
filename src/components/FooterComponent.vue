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
  watch: {
    '$route'() {
      this.setFooterImages();
    }
  },
  methods: {
    getImageUrl(imageName) {
      return require(`@/assets/${imageName}`);
    },
    setFooterImages() {
      switch (this.$route.path) {
        case "/manifesto":
          this.currentLaptopImage = this.getImageUrl("project_auctioneer.png");
          this.currentPhoneImage = this.getImageUrl("WatNuMOCKEPS_3.png");
          break;
        case "/cases":
          this.currentLaptopImage = this.getImageUrl("project_greenoffice.png");
          this.currentPhoneImage = this.getImageUrl("WatNuMOCKEPS_2.png");
          break;
        case "/people":
          this.currentLaptopImage = this.getImageUrl("project_rembrandt.png");
          this.currentPhoneImage = this.getImageUrl("WatNuMOCKEPS_4.png");
          break;
        case "/contact":
          this.currentLaptopImage = this.getImageUrl("project_fridaymascara.png");
          this.currentPhoneImage = this.getImageUrl("WatNuMOCKEPS_2.png");
          break;
        case "/terms-and-conditions":
          this.currentLaptopImage = this.getImageUrl("project_portfolio.png");
          break;
        default:
          this.currentLaptopImage = this.getImageUrl("project_overpowered.png");
          this.currentPhoneImage = this.getImageUrl("WatNuMOCKEPS.png");
          break;
      }
    }
  }
}
</script>
<template>
  <div>
    <div class="footer-hero-wrapper">
      <div class="footer-hero-cover"></div>
      <img class="footer-hero-iphone" alt="iPhone showcasing WatNu iOS app" :src="currentPhoneImage">
      <img class="footer-hero-laptop" alt="Laptop showcasing Rijkware website" :src="currentLaptopImage">
    </div>
    <div class="footer-container">
      <div class="footer-wrapper">
        <section class="footer-top">
          <div class="footer-top-text-wrapper">
            <div class="footer-top-text">
              <h2>Become a <br><span class="blue-gradient">Student Developer</span></h2>
              <h4>Find work related to the field you wish to grow in.</h4>
              <router-link class="contact-button" to="/contact">Contact Us</router-link>
            </div>
          </div>
          <img alt="Students" src="../assets/PictureStudentDevs.jpg" class="footer-top-image">
        </section>
      </div>
      <div class="footer-ending">

        <div class="footer-bottom-wrapper">
          <div class="footer-bottom-identity">
            <img alt="Rijkware" src="../assets/RijkwareLogo-2024-v2.png" class="footer-bottom-logo">
            <h3>Rijkware</h3>
            <h3 class="blue-gradient footer-bottom-identity-text">Student<br>Developers</h3>
          </div>
          <div>
            <small class="footer-bottom-small">Company</small>
            <ul class="footer-bottom-ul">
              <li>
                <router-link to="/">About us</router-link>
              </li>
              <li>
                <router-link to="/manifesto">Manifesto</router-link>
              </li>
              <li>
                <router-link to="/cases">Cases</router-link>
              </li>
              <li>
                <router-link to="/people">People</router-link>
              </li>
              <li>
                <router-link to="/contact">Contact</router-link>
              </li>
            </ul>
          </div>
          <div>
            <small class="footer-bottom-small">Legal</small>
            <ul class="footer-bottom-ul">
              <li><a target="_blank" href="https://www.kvk.nl/bestellen/#/77829115000045497664">KvK - CoC
                <ExternalLinkSVG/>
              </a></li>
              <li>
                <router-link to="/terms-and-conditions">Terms & Conditions</router-link>
              </li>
              <li>
                <router-link to="/privacy-policy">Privacy Policy</router-link>
              </li>
              <li>
                <router-link to="/cookies">Cookies</router-link>
              </li>
            </ul>
          </div>
          <div>
            <small class="footer-bottom-small">Follow us</small>
            <ul class="footer-bottom-ul">
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
            <small class="footer-bottom-small">Help</small>
            <ul class="footer-bottom-ul">
              <li class="footer-help">
                <small class="footer-help-tag">For support/contact</small><br>
                <span class="footer-help-value"><a target="_blank" href="mailto:contact@rijkware.nl">contact@rijkware.nl</a></span>
              </li>
              <li class="footer-help">
                <small class="footer-help-tag">Mobile (Dutch)</small><br>
                <span class="footer-help-value"><a target="_blank" href="tel:+31642068928">+31 6 420 68 928</a></span>
              </li>
              <li class="footer-help">
                <small class="footer-help-tag">Address</small><br>
                <span
                    class="footer-help-value">Gelrestraat 84<br>1079MZ Amsterdam<br>North-Holland, the Netherlands</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-credits-wrapper">
          <div class="footer-credits">
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

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: #cbcbcb;
}

.footer-hero-wrapper {
  position: relative;
  padding-top: 48px;
  background-color: black;
}

.footer-hero-cover {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 600px;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.99), black);
}

.footer-hero-iphone,
.footer-hero-laptop {
  position: relative;
  height: 600px;
}

.footer-credits {
  width: 90%;
  padding: 24px 0;
  box-shadow: white 0 -1px;
  max-width: 1240px;
}

.footer-credits h5 {
  margin: 0;
}

.footer-credits-wrapper {
  display: flex;
  justify-content: center;
  line-height: 1.2;
  text-align: start;
  margin-top: 12px;
  width: 100%;
}

.footer-credits-wrapper small {
  color: #989898;
}

.footer-help-tag {
  color: #989898;
  font-size: 12px;
}

.footer-help-value {
  display: block;
  font-size: 12px;
}

.footer-help {
  margin-top: 6px;
}

.footer-bottom-identity h3 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
}

.footer-bottom-identity {
  margin-top: 10px;
}

.footer-bottom-identity-text {
  margin: 0;
}

.footer-bottom-logo {
  height: 50px;
}

.footer-bottom-small {
  color: #989898;
  font-size: 10px;
}

.footer-bottom-ul {
  list-style-type: none;
  padding: 0;
  margin-top: 12px;
}

.footer-bottom-ul li {
  font-size: 16px;
  padding: 2px 0;
  font-weight: 200;
}

.footer-bottom-wrapper div {
  text-align: start;
}

.footer-bottom-wrapper {
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  height: fit-content;
  max-width: 1400px;
}

.footer-container {
  background-color: black;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 48px;
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

.footer-top-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
  text-align: start;
  max-width: 600px;
  min-width: 600px;
  height: 100%;
}

.footer-top {
  display: flex;
  align-items: center;
}

.footer-top-text-wrapper {
  box-shadow: white 0 1px;
  height: 100%;
  width: 100%;
}

.footer-top-image {
  filter: grayscale(30%);
  border-radius: 8px 8px 8px 0;
  max-height: 500px;
}

.footer-wrapper {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  padding-bottom: 36px;

}


template {
  width: 100vw;
}


.contact-button {
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
}

.contact-button:disabled {
  pointer-events: none;
}

.contact-button:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.contact-button:active {
  box-shadow: none;
  transform: translateY(0);
}

.footer-ending {
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
}


@media (max-width: 1300px) {
  .footer-top {
    width: 100%;
  }

  .footer-hero-laptop {
    display: none;
  }

  .footer-top-image {
    object-fit: none;
    object-position: top;
    border-radius: 0;
    width: 100%;
  }

  .footer-top {
    align-items: start;
    gap: 36px;
    padding: 0;
    flex-direction: column;
  }

}

@media (max-width: 820px) {
  .footer-top-image {
    display: none;
  }
}


@media (max-width: 820px) {
  .footer-top-image {
    height: fit-content;
  }

  .footer-container {
    padding: 0;
  }

  .footer-top-text {
    padding: 5vw;
    min-width: 90vw;
  }

  .footer-top-text > h4 {
    width: 90vw;
  }

  .footer-top-text-wrapper {
    box-shadow: none;
    max-width: 90vw;
    min-width: 90vw;
    width: 90vw;
    //box-shadow: none;
  }

  .footer-wrapper {
    width: 100%;
    //justify-content: start;
  }

  .footer-bottom-wrapper {
    gap: 32px;
    flex-direction: column;
  }

  .footer-credits-wrapper {

  }
}
</style>