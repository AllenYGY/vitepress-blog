<template>
  <section class="home-hero">
    <div class="home-hero__inner">
      <div class="home-hero__content">
        <div class="home-hero__eyebrow">AllenYGY's Knowledge Atlas</div>
        <h1 class="home-hero__title">
          Notes that connect
          <span>systems, research, and everyday practice.</span>
        </h1>
        <p class="home-hero__subtitle">
          A living workspace for algorithms, operating systems, bioinformatics, and the ideas that
          tie them together.
        </p>
        <div class="home-hero__actions">
          <a class="home-hero__button home-hero__button--primary" :href="withBase('/page/blog')">
            Start reading
          </a>
          <a class="home-hero__button" :href="withBase('/page/archive')">Browse archive</a>
        </div>
        <div class="home-hero__meta">
          <span class="home-hero__meta-label">Latest update</span>
          <span class="home-hero__meta-value">{{ latestDate || '—' }}</span>
        </div>
      </div>

      <div class="home-hero__panel">
        <div class="home-hero__panel-block">
          <div class="home-hero__panel-title">Latest notes</div>
          <div class="home-hero__panel-list">
            <a
              v-for="post in latestPosts"
              :key="post.url"
              class="home-hero__panel-item"
              :href="withBase(post.url)"
            >
              <span>{{ post.frontmatter.title }}</span>
              <span class="home-hero__panel-date">{{ formatDate(post.frontmatter.date) }}</span>
            </a>
          </div>
        </div>
        <div class="home-hero__panel-divider"></div>
        <div class="home-hero__panel-block">
          <div class="home-hero__panel-title">Focus tags</div>
          <div class="home-hero__panel-tags">
            <button
              v-for="tag in topTags"
              :key="tag.name"
              type="button"
              class="home-hero__tag"
              @click="openTagOverlay(tag.name)"
            >
              <span>{{ tag.name }}</span>
              <span class="home-hero__tag-count">{{ tag.count }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { withBase, inBrowser } from 'vitepress';
import { data as posts } from '../page/blog-posts.data.js';

const latestPosts = computed(() => posts.slice(0, 3));

const latestDate = computed(() => {
  if (!posts.length) return '';
  return formatDate(posts[0].frontmatter.date);
});

const topTags = computed(() => {
  const counts = {};
  posts.forEach((post) => {
    const tags = post.frontmatter.tags || [];
    tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
});

const openTagOverlay = (tag) => {
  if (!inBrowser || !tag) return;
  const params = new URLSearchParams(window.location.search);
  params.set('tag', tag);
  const query = params.toString();
  const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', next);
  window.dispatchEvent(new Event('popstate'));
};

const formatDate = (value) => {
  if (!value) return '';
  const raw = typeof value === 'string' ? value : String(value);
  const match = raw.match(/\d{4}-\d{2}-\d{2}/);
  if (!match) return raw;
  return match[0];
};
</script>
