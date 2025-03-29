<template>
  <section class="quote-container" aria-labelledby="quote-heading">
    <div class="quote-box">
      <blockquote class="quote-text">
        <h3 id="quote-heading">
          "This website was designed and built by me, showcasing the quality and potential that students can deliver."
        </h3>
      </blockquote>
      <figure class="quote-author">
        <img
            :src="require('@/assets/TylerRijkwareInspired2024.png')"
            alt="Portrait of Tyler de Rijk"
        />
        <figcaption>Tyler de Rijk</figcaption>
      </figure>
    </div>
  </section>
</template>

<script>
export default {
  name: "QuoteComponent",
};
</script>

<style lang="scss" scoped>
.quote {
  &-container {
    position: relative;
    width: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  &-box {
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 800px;
    background: rgba(25, 25, 25, 0.27);
    border-radius: 12px;
    padding: 24px;
  }

  &-text {
    font-size: 24px;
    font-style: italic;
    text-align: center;
    line-height: 1.6;
    flex-grow: 1;
  }

  &-author {
    text-align: center;

    img {
      border: 2px solid #dedede;
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    figcaption {
      font-family: "Lexend", Helvetica, Arial, sans-serif;
      margin-top: 8px;
      color: #8c8c8c;
    }
  }
}

blockquote {
  border: none;
  padding: 0 0 10px 0;
  border-radius: 32px;
}

h3 {
  font-weight: 200;
}
</style>
