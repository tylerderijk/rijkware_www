<script setup>

</script>

<template>
  <div class="content-wrapper">
    <div class="content">
      <h1>Cookie Policy</h1>
      <h2>Introduction</h2>
      <p>This Cookie Policy explains how we use cookies and similar tracking technologies on our website. By using our
        website, you agree to our use of cookies as described in this policy.</p>

      <h3>What Are Cookies?</h3>
      <p>Cookies are small text files that are placed on your device when you visit our website. They help us understand
        how you interact with our site, enabling us to improve your experience and gather insights into how our site is
        being used.</p>

      <h3>Types of Cookies We Use</h3>
      <ul>
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be
          switched off in our systems.
        </li>
        <li><strong>Performance and Analytics Cookies:</strong> We use these cookies to collect information about how
          visitors interact with our website. This includes data on page visits, session duration, and user
          interactions.
        </li>
        <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make and
          provide enhanced, more personalized features.
        </li>
      </ul>

      <h3>PostHog Tracking and Analytics</h3>
      <p>We use PostHog to analyze how our users interact with our website. The following features are enabled:</p>
      <ul>
        <li><strong>Autocapture:</strong> Automatically tracks user interactions such as clicks, form submissions, and
          other events.
        </li>
        <li><strong>Heatmaps:</strong> Visual representations of how users interact with our site, including clicks and
          scrolling behavior.
        </li>
        <li><strong>Web Vitals Autocapture:</strong> Tracks important web vitals such as page load times and user
          experience metrics.
        </li>
        <li><strong>Session Replay:</strong> Records user sessions to understand user behavior and identify issues.</li>
        <li><strong>Log Capture:</strong> Collects logs to assist in debugging and understanding user interactions.</li>
        <li><strong>Canvas Capture:</strong> Captures interactions on canvas elements.</li>
        <li><strong>Network Capture:</strong> Monitors network requests made by the browser.</li>
        <li><strong>Surveys:</strong> Allows us to deploy surveys and gather user feedback directly on our website.</li>
      </ul>
      <p>These tools use cookies and other tracking technologies to gather and analyze data. The information collected
        is used to improve our website, monitor performance, and enhance user experience.</p>

      <h3>Managing Cookies</h3>
      <p>You can manage or disable cookies through your browser settings. However, please note that disabling cookies
        may impact your experience on our website.</p>

      <h3>Changes to This Policy</h3>
      <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated
        revision date.</p>

      <h3>Contact Us</h3>
      <p>If you have any questions about our use of cookies, please contact us on the contact page.</p>
    </div>
  </div>

</template>

<style scoped>
.content {
  max-width: 800px;
  text-align: start;
  display: flex;
  flex-direction: column;
}
.hero-title {
  font-size: 36px;
}
.hero-wrapper {
  margin: 0;
}
hr {
  display: none;
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

.content-wrapper h2,
.content-wrapper h3 {
  margin-top: 16px;
}

.content-wrapper ul {
  margin-left: 20px;
}

.content-wrapper p {
  margin-bottom: 16px;
}
</style>