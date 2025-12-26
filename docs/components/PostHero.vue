<template>
  <section class="post-hero">
    <div class="post-hero__eyebrow">
      <span class="post-hero__badge">Post</span>
      <span v-if="sectionLabel" class="post-hero__path">{{ sectionLabel }}</span>
    </div>
    <h1 class="post-hero__title">{{ title }}</h1>
    <p v-if="description" class="post-hero__desc">{{ description }}</p>
    <div class="post-hero__meta">
      <span v-if="publishedAt">{{ publishedAt }}</span>
      <span v-if="updatedAt">Updated {{ updatedAt }}</span>
      <span v-if="readingMinutes">~{{ readingMinutes }} min read</span>
      <span v-if="wordCount">{{ wordCount }} words</span>
    </div>
    <div v-if="tags.length" class="post-hero__tags">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        class="post-hero__tag"
        @click="openOverlay(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <div class="post-hero__actions">
      <a class="post-hero__action" :href="withBase('/page/blog')">Back to Blog</a>
      <button class="post-hero__action" type="button" @click="copyLink">
        {{ copied ? 'Copied' : 'Copy link' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue';
import { useData, useRoute, withBase, inBrowser } from 'vitepress';

const { frontmatter, page } = useData();
const route = useRoute();

const tags = computed(() => {
  const raw = frontmatter.value?.tags;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
});

const title = computed(() => frontmatter.value?.title || '');
const description = computed(() => frontmatter.value?.desc || frontmatter.value?.description || '');

const publishedAt = computed(() => formatDay(frontmatter.value?.date));
const updatedAt = computed(() => formatDay(page.value?.lastUpdated));

const sectionLabel = computed(() => {
  const path = route.path || '';
  const parts = path.split('/').filter(Boolean);
  const postsIndex = parts.indexOf('posts');
  if (postsIndex === -1 || parts.length <= postsIndex + 1) return '';
  return parts
    .slice(postsIndex + 1, postsIndex + 3)
    .map((part) => decodeURIComponent(part))
    .join(' / ');
});

const wordCount = ref(0);
const readingMinutes = computed(() => {
  if (!wordCount.value) return 0;
  return Math.max(1, Math.round(wordCount.value / 220));
});

const copied = ref(false);

const openOverlay = (tag) => {
  if (!inBrowser || !tag) return;
  const params = new URLSearchParams(window.location.search);
  params.set('tag', tag);
  const query = params.toString();
  const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', next);
  window.dispatchEvent(new Event('popstate'));
};

const copyLink = async () => {
  if (!inBrowser) return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (error) {
    copied.value = false;
  }
};

const updateWordCount = () => {
  if (!inBrowser) return;
  const content = document.querySelector('.vp-doc');
  if (!content) return;
  const text = String(content.textContent || '').replace(/\s+/g, ' ').trim();
  if (!text) {
    wordCount.value = 0;
    return;
  }
  const latinWords = text.match(/[A-Za-z0-9]+/g) || [];
  const cjkChars = text.match(/[\u4e00-\u9fff]/g) || [];
  wordCount.value = latinWords.length + cjkChars.length;
};

const formatDay = (raw) => {
  if (typeof raw === 'number') {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? '' : formatISODate(date);
  }
  const text = String(raw || '');
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  if (match) return match[0];
  if (/^\d+$/.test(text)) {
    const date = new Date(Number(text));
    return Number.isNaN(date.getTime()) ? '' : formatISODate(date);
  }
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? '' : formatISODate(date);
};

const formatISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

onMounted(() => {
  nextTick(updateWordCount);
});

watch(
  () => route.path,
  () => nextTick(updateWordCount)
);
</script>
