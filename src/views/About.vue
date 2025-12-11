<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <button class="back-btn" @click="router.push('/')">← Back to Search</button>
      
      <h1>About ByteAB</h1>

      <section class="hero-section">
        <div class="hero-icon">⚡</div>
        <p class="hero-text">
          ByteAB is a free, open-source tool that helps you build advanced search queries 
          without memorizing complex search operators.
        </p>
      </section>

      <section>
        <h2>Our Mission</h2>
        <p>
          Search engines are powerful tools, but their advanced features remain hidden from most users. 
          Operators like <code>site:</code>, <code>filetype:</code>, and exact match quotes can dramatically 
          improve search results, yet few people know how to use them effectively.
        </p>
        <p>
          ByteAB bridges this gap by providing an intuitive, visual interface for constructing 
          advanced search queries. No more memorizing syntax – just click, type, and search.
        </p>
      </section>

      <section>
        <h2>Key Features</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <h3>Per-Keyword Exact Match</h3>
            <p>Control exactly which words should be matched as phrases</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🌐</span>
            <h3>Multi-Engine Support</h3>
            <p>Works with Google, Bing, Baidu, DuckDuckGo, and more</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔒</span>
            <h3>100% Private</h3>
            <p>Everything runs locally – no data ever leaves your device</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">💾</span>
            <h3>Save Your Sites</h3>
            <p>Add custom sites for quick filtering in future searches</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🌍</span>
            <h3>Multi-Language</h3>
            <p>Available in Chinese, English, Spanish, Korean, and Japanese</p>
          </div>
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <h3>Instant Results</h3>
            <p>Build your query visually, then jump directly to search results</p>
          </div>
        </div>
      </section>

      <section>
        <h2>How It Works</h2>
        <ol class="steps-list">
          <li>
            <strong>Enter your keywords</strong> – Type what you're looking for, mark specific 
            words as "exact match" if needed
          </li>
          <li>
            <strong>Add filters</strong> – Limit results to specific sites, exclude unwanted 
            domains, filter by file type or time range
          </li>
          <li>
            <strong>Choose your engine</strong> – Select from 8 popular search engines
          </li>
          <li>
            <strong>Search</strong> – Click the search button to open results in a new tab
          </li>
        </ol>
      </section>

      <section>
        <h2>Privacy First</h2>
        <p>
          ByteAB is designed with privacy as a core principle:
        </p>
        <ul>
          <li>No user accounts or registration required</li>
          <li>No analytics or tracking scripts</li>
          <li>No data collection of any kind</li>
          <li>All preferences stored locally in your browser</li>
          <li>Open source code for full transparency</li>
        </ul>
      </section>

      <section>
        <h2>Technology</h2>
        <p>
          ByteAB is built with modern web technologies:
        </p>
        <ul>
          <li><strong>Vue 3</strong> – Progressive JavaScript framework</li>
          <li><strong>Vite</strong> – Next-generation frontend tooling</li>
          <li><strong>Vue I18n</strong> – Internationalization support</li>
          <li><strong>Pure CSS</strong> – No heavy UI frameworks</li>
        </ul>
      </section>

      <section>
        <h2>Open Source</h2>
        <p>
          ByteAB is open source software. You can view the source code, report issues, 
          or contribute on GitHub. We welcome contributions from the community!
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
  margin-bottom: 2rem;
}

.hero-section {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #fdf4ff 100%);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.hero-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-text {
  font-size: 1.1rem;
  color: var(--color-text);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}

section {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

code {
  background: var(--color-bg-input);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  color: var(--color-primary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.feature-item {
  padding: 1.25rem;
  background: var(--color-bg);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.feature-icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.feature-item h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.feature-item p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 0;
}

.steps-list {
  padding-left: 1.5rem;
  counter-reset: step;
}

.steps-list li {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
  position: relative;
}

.steps-list li strong {
  color: var(--color-text);
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

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>

