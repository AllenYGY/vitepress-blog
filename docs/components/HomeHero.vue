<template>
  <section class="academic-hero" aria-labelledby="academic-home-title">
    <div class="academic-hero__grid">
      <div class="academic-hero__copy">
        <div class="academic-hero__kicker">
          <span class="academic-hero__status" aria-hidden="true"></span>
          MSc Student · Researcher · Builder
        </div>
        <h1 id="academic-home-title" class="academic-hero__title">
          Junya Yang
          <span>杨钧涯</span>
        </h1>
        <p class="academic-hero__role">
          MSc student in Computer Science at The Chinese University of Hong Kong
        </p>
        <p class="academic-hero__intro">
          My research focuses on <strong>bioinformatics</strong>, <strong>computational biology</strong>,
          and <strong>AI agents</strong>. This site brings together my research work, software
          projects, and a growing public collection of technical notes.
        </p>
        <div class="academic-hero__actions" aria-label="Primary links">
          <a class="academic-button academic-button--primary" href="#research">Research interests <span>→</span></a>
          <a class="academic-button" href="#projects">Selected projects <span>→</span></a>
          <a class="academic-button academic-button--quiet" :href="withBase('/page/blog')">Read the blog <span>↗</span></a>
        </div>
        <div class="academic-hero__links" aria-label="Profile links">
          <a href="https://github.com/AllenYGY" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .08 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.01a9.4 9.4 0 0 1 2.5.34c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.57c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
            GitHub
          </a>
          <a href="https://blog.allenygy.vip" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>
            blog.allenygy.vip
          </a>
          <span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>
            Hong Kong
          </span>
        </div>
      </div>

      <aside class="academic-profile" aria-label="Profile summary">
        <div class="academic-profile__portrait-wrap">
          <div class="academic-profile__ring" aria-hidden="true"></div>
          <img
            class="academic-profile__portrait"
            src="https://avatars.githubusercontent.com/u/121916671?v=4"
            alt="Portrait of Junya Yang"
          />
          <span class="academic-profile__badge">AY</span>
        </div>
        <div class="academic-profile__body">
          <p class="academic-profile__label">Currently exploring</p>
          <div class="academic-profile__focus">
            <span>Bioinformatics</span>
            <span>Computational biology</span>
            <span>AI agents</span>
          </div>
          <div class="academic-profile__metrics">
            <div><strong>{{ totalPosts }}</strong><span>public notes</span></div>
            <div><strong>{{ totalTags }}</strong><span>topics</span></div>
            <div><strong>{{ latestYear }}</strong><span>latest update</span></div>
          </div>
        </div>
      </aside>
    </div>
    <a class="academic-hero__scroll" href="#about" aria-label="Scroll to about section">
      <span>Explore</span><span aria-hidden="true">↓</span>
    </a>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as posts } from '../page/blog-posts.data.js';

const tagCounts = computed(() => {
  const counts = new Set();
  posts.forEach((post) => {
    (post.frontmatter.tags || []).forEach((tag) => counts.add(tag));
  });
  return counts.size;
});

const totalPosts = computed(() => posts.length);
const totalTags = computed(() => tagCounts.value);
const latestYear = computed(() => {
  if (!posts.length) return '—';
  const match = String(posts[0].frontmatter.date || '').match(/\d{4}/);
  return match?.[0] || '—';
});
</script>
