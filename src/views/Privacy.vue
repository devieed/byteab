<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <button class="back-btn" @click="router.push('/')">← Back to Search</button>
      
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last updated: December 2024</p>

      <section>
        <h2>Overview</h2>
        <p>
          ByteAB is a client-side search query builder tool. We are committed to protecting your privacy. 
          This Privacy Policy explains how we handle information when you use our service.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p><strong>We do not collect any personal information.</strong></p>
        <p>
          ByteAB operates entirely in your browser. All search queries, preferences, and custom sites 
          you create are stored locally on your device using browser's localStorage. This data never 
          leaves your device and is never transmitted to any server.
        </p>
      </section>

      <section>
        <h2>Data Storage</h2>
        <p>The following data is stored locally on your device:</p>
        <ul>
          <li><strong>Language Preference:</strong> Your selected interface language</li>
          <li><strong>Custom Sites:</strong> Website domains you add for quick filtering</li>
        </ul>
        <p>
          You can clear this data at any time by clearing your browser's localStorage or using 
          your browser's "Clear browsing data" feature.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          When you click the search button, you will be redirected to your selected search engine 
          (Google, Bing, Baidu, etc.). These third-party services have their own privacy policies, 
          and we encourage you to review them.
        </p>
        <p>
          ByteAB does not send any data to these search engines beyond the search query you construct. 
          We do not track which searches you perform or which search engines you use.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          ByteAB does not use cookies. We use browser localStorage solely for storing your preferences 
          and custom sites locally on your device.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          We do not use any analytics or tracking services. We do not collect usage statistics, 
          IP addresses, or any other information about how you use ByteAB.
        </p>
      </section>

      <section>
        <h2>Children's Privacy</h2>
        <p>
          ByteAB does not collect any personal information from anyone, including children under 13. 
          Our service is safe for users of all ages.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page 
          with an updated revision date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please open an issue on our GitHub repository.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 2rem 1rem;
}

.legal-container {
  max-width: 720px;
  margin: 0 auto;
  background: var(--color-bg-card);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--color-text-secondary);
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--color-bg-hover);
  color: var(--color-primary);
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.last-updated {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 2.5rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

li {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 0.5rem;
}

strong {
  color: var(--color-text);
}

@media (max-width: 640px) {
  .legal-container {
    padding: 1.5rem;
  }

  h1 {
    font-size: 1.75rem;
  }
}
</style>

