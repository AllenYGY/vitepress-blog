<template>
  <section class="home-dashboard">
    <div class="home-dashboard__grid">
      <div class="home-card home-dashboard__activity">
        <div class="home-card__title">Activity</div>
        <ContributionGraph
          :counts="contributionCounts"
          :posts-by-date="contributionPosts"
          title=""
        />
      </div>

      <div class="home-card home-dashboard__intro">
        <div class="home-card__title">Start Here</div>
        <p class="home-card__desc">
          Explore recent notes, jump to key sections, or search by tags to find what you need fast.
        </p>
        <div class="home-quick-links">
          <a class="home-quick-link" :href="withBase('/page/blog')">
            <span class="home-quick-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 3.5h7l4 4v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2z" />
                <path d="M14 3.5v4h4" />
              </svg>
            </span>
            Blog
          </a>
          <a class="home-quick-link" :href="withBase('/page/archive')">
            <span class="home-quick-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
                <path d="M3 5h18" />
                <path d="M10 11h4" />
              </svg>
            </span>
            Archive
          </a>
          <a class="home-quick-link" :href="withBase('/page/tags')">
            <span class="home-quick-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 10l7-7h7l4 4v7l-7 7-11-11z" />
                <path d="M14 6h.01" />
              </svg>
            </span>
            Tags
          </a>
          <a class="home-quick-link" :href="withBase('/page/friends')">
            <span class="home-quick-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 11a3 3 0 1 0-0.001-6.001A3 3 0 0 0 9 11z" />
                <path d="M17 12a2.5 2.5 0 1 0-0.001-5.001A2.5 2.5 0 0 0 17 12z" />
                <path d="M4 19a5 5 0 0 1 10 0" />
                <path d="M14 19a4 4 0 0 1 7 0" />
              </svg>
            </span>
            Friends
          </a>
          <a class="home-quick-link" :href="withBase('/page/note')">
            <span class="home-quick-link__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 5h14v10l-4 4H5z" />
                <path d="M15 19v-4h4" />
              </svg>
            </span>
            Note
          </a>
        </div>
      </div>

      <div class="home-card home-dashboard__stats">
        <div class="home-card__title">Snapshot</div>
        <div class="home-stats">
          <div class="home-stat">
            <div class="home-stat__label">Posts</div>
            <div class="home-stat__value">{{ totalPosts }}</div>
          </div>
          <div class="home-stat">
            <div class="home-stat__label">Tags</div>
            <div class="home-stat__value">{{ totalTags }}</div>
          </div>
          <div class="home-stat">
            <div class="home-stat__label">Latest</div>
            <div class="home-stat__value">{{ latestDate || '—' }}</div>
          </div>
        </div>
      </div>

      <div class="home-card home-dashboard__latest">
        <div class="home-card__title">Latest Notes</div>
        <div class="home-latest">
          <a
            v-for="post in latestPosts"
            :key="post.url"
            class="home-latest__item"
            :href="withBase(post.url)"
          >
            <div class="home-latest__title">{{ post.frontmatter.title }}</div>
            <div class="home-latest__date">{{ formatDate(post.frontmatter.date) }}</div>
          </a>
        </div>
      </div>

      <div class="home-card home-dashboard__tags">
        <div class="home-card__title">Tag Explorer</div>
        <input
          v-model="tagQuery"
          type="search"
          class="home-tag-search"
          placeholder="Type to search tags..."
          aria-label="Search tags"
        />
        <div v-if="tagQuery.trim()" class="home-tag-results">
          <button
            v-for="tag in filteredTags"
            :key="tag.name"
            class="home-tag-pill"
            type="button"
            @click="openTagOverlay(tag.name)"
          >
            <span>{{ tag.name }}</span>
            <span class="home-tag-pill__count">{{ tag.count }}</span>
          </button>
        </div>
        <div v-else class="home-tag-hint">Start typing to see tags.</div>
        <div v-if="tagQuery.trim() && filteredTags.length === 0" class="home-tag-hint">
          No tags matched.
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { withBase, inBrowser } from 'vitepress';
import { data as posts } from '../page/blog-posts.data.js';
import { data as contributionData } from '../page/contribution-graph.data.js';
import ContributionGraph from './ContributionGraph.vue';

const tagQuery = ref('');
const contributionCounts = contributionData?.counts || {};
const contributionPosts = contributionData?.postsByDate || {};

const latestPosts = computed(() => posts.slice(0, 12));

const tagCounts = computed(() => {
  const counts = {};
  posts.forEach((post) => {
    const tags = post.frontmatter.tags || [];
    tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
});

const totalPosts = computed(() => posts.length);
const totalTags = computed(() => Object.keys(tagCounts.value).length);

const latestDate = computed(() => {
  if (!posts.length) return '';
  return formatDate(posts[0].frontmatter.date);
});

const filteredTags = computed(() => {
  const query = tagQuery.value.trim().toLowerCase();
  if (!query) return [];
  return Object.entries(tagCounts.value)
    .filter(([tag]) => tag.toLowerCase().includes(query))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
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
