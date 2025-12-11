<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <button class="back-btn" @click="router.push('/')">← Back to Search</button>
      
      <h1>Terms of Service</h1>
      <p class="last-updated">Last updated: December 2024</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using ByteAB ("the Service"), you accept and agree to be bound by 
          these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>
          ByteAB is a free, client-side web application that helps users construct advanced 
          search queries for various search engines. The Service:
        </p>
        <ul>
          <li>Provides a visual interface for building search queries</li>
          <li>Runs entirely in your web browser</li>
          <li>Does not collect, store, or transmit any user data to external servers</li>
          <li>Redirects users to third-party search engines to execute searches</li>
        </ul>
      </section>

      <section>
        <h2>3. No Warranty</h2>
        <p>
          The Service is provided "as is" and "as available" without any warranties of any kind, 
          either express or implied, including but not limited to:
        </p>
        <ul>
          <li>Merchantability or fitness for a particular purpose</li>
          <li>Accuracy or reliability of search results</li>
          <li>Uninterrupted or error-free operation</li>
          <li>Compatibility with all search engines or browsers</li>
        </ul>
      </section>

      <section>
        <h2>4. Limitation of Liability</h2>
        <p>
          In no event shall ByteAB, its creators, or contributors be liable for any direct, 
          indirect, incidental, special, consequential, or punitive damages arising out of or 
          related to your use of the Service.
        </p>
        <p>
          This includes, but is not limited to, damages for loss of profits, data, goodwill, 
          or other intangible losses, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>
          ByteAB redirects users to third-party search engines (Google, Bing, Baidu, DuckDuckGo, 
          Yahoo, Yandex, Sogou, 360 Search, etc.) to execute searches. These services are operated 
          by independent companies with their own terms of service and privacy policies.
        </p>
        <p>
          We are not responsible for:
        </p>
        <ul>
          <li>The content, accuracy, or availability of search results</li>
          <li>Any actions taken by third-party search engines</li>
          <li>Changes to third-party search syntax or functionality</li>
          <li>Any data collected by third-party services</li>
        </ul>
      </section>

      <section>
        <h2>6. Acceptable Use</h2>
        <p>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. 
          You agree not to:
        </p>
        <ul>
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Attempt to interfere with or disrupt the Service</li>
          <li>Reverse engineer or attempt to extract the source code (note: the code is open source)</li>
          <li>Use the Service to harass, abuse, or harm others</li>
        </ul>
      </section>

      <section>
        <h2>7. Intellectual Property</h2>
        <p>
          ByteAB is open source software. The source code is available under an open source license. 
          You are free to use, modify, and distribute the code in accordance with the applicable 
          license terms.
        </p>
        <p>
          The ByteAB name and logo are trademarks and may not be used without permission for 
          purposes other than referring to this Service.
        </p>
      </section>

      <section>
        <h2>8. Modifications to Service</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service at any time without 
          notice. We shall not be liable to you or any third party for any modification, suspension, 
          or discontinuation of the Service.
        </p>
      </section>

      <section>
        <h2>9. Changes to Terms</h2>
        <p>
          We may revise these Terms of Service at any time. Changes will be effective immediately 
          upon posting. Your continued use of the Service after any changes constitutes acceptance 
          of the new Terms.
        </p>
      </section>

      <section>
        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, 
          without regard to conflict of law principles.
        </p>
      </section>

      <section>
        <h2>11. Contact</h2>
        <p>
          If you have any questions about these Terms of Service, please open an issue on our 
          GitHub repository.
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
  font-size: 1.125rem;
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

