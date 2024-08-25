<script setup>

</script>

<template>
  <div class="content-wrapper">
    <div class="content">
      <h1>Privacy Policy</h1>
      <h2>Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>Personal identification information (Name, email address, phone number, etc.)</li>
        <li>Log data (IP address, browser type, pages visited, time spent on those pages, etc.)</li>
        <li>Cookies and usage data</li>
        <li>For more information, please refer to <router-link to="/cookies">the cookies page.</router-link></li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We may use the information we collect for the following purposes:</p>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To notify you about changes to our services</li>
        <li>To allow you to participate in interactive features of our services</li>
        <li>To provide customer support</li>
        <li>To gather analysis or valuable information so that we can improve our services</li>
        <li>To monitor the usage of our services</li>
      </ul>

      <h2>How We Share Your Information</h2>
      <p>We do not share your personal information with third parties except in the following cases:</p>
      <ul>
        <li>With your consent</li>
        <li>For legal reasons, such as to comply with legal obligations</li>
        <li>To protect and defend our rights or property</li>
        <li>In connection with any merger, sale, or other transfer of our assets</li>
      </ul>

      <h2>Your Data Protection Rights</h2>
      <p>Depending on your location, you may have the following rights regarding your personal data:</p>
      <ul>
        <li>The right to access your data</li>
        <li>The right to rectify inaccurate data</li>
        <li>The right to erase your data</li>
        <li>The right to restrict processing of your data</li>
        <li>The right to data portability</li>
        <li>The right to object to processing of your data</li>
      </ul>

      <h2>Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us on the contact page.</p>
    </div>
  </div>
</template>

<style scoped>
.hero-title {
  font-size: 56px;
}

.hero-wrapper {
  margin-top: 48px;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  padding: 28px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 800px;
  text-align: start;
  display: flex;
  flex-direction: column;
}

.content-wrapper h2 {
  margin-top: 16px;
}

.content-wrapper p, .content-wrapper ul {
  margin-bottom: 16px;
}

.content-wrapper ul {
  margin-left: 20px;
}
</style>