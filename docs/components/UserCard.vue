<template>
  <section v-if="!props.isMobile" class="user-card user-card--desktop" aria-label="Author profile">
    <div class="user-card__avatar" v-if="userConfig?.avatar">
      <img :src="userConfig?.avatar" alt="Portrait of Junya Yang" />
    </div>
    <div class="user-card__identity">
      <div class="user-card__name">{{ userConfig?.name }}</div>
      <div class="user-card__description">{{ userConfig?.describe }}</div>
    </div>
    <div class="user-card__meta">
      <a class="user-card__stat" :href="withBase('/page/blog')">
        <div class="user-card__stat-label">Posts</div>
        <div class="user-card__stat-value">{{ posts.length }}</div>
      </a>
      <a class="user-card__stat" :href="withBase('/page/tags')">
        <div class="user-card__stat-label">Tags</div>
        <div class="user-card__stat-value">{{ tagNum }}</div>
      </a>
      <a class="user-card__stat" :href="withBase('/page/archive')">
        <div class="user-card__stat-label">Years</div>
        <div class="user-card__stat-value">{{ archiveYears }}</div>
      </a>
    </div>
    <div class="user-card__cta">
      <a class="user-card__button user-card__button--primary" :href="withBase('/page/blog')">
        Latest posts <span aria-hidden="true">→</span>
      </a>
      <a class="user-card__button" :href="withBase('/page/archive')">
        Browse archive <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>

  <section v-else class="user-card user-card--mobile" aria-label="Author profile">
    <img
      v-if="userConfig?.avatar"
      :src="userConfig?.avatar"
      alt="Portrait of Junya Yang"
      class="user-card__mobile-avatar"
    />
    <div>
      <div class="user-card__name">{{ userConfig?.name }}</div>
      <div class="user-card__description">{{ userConfig?.describe }}</div>
    </div>
    <a class="user-card__button user-card__button--primary" :href="withBase('/page/blog')">
      Latest posts <span aria-hidden="true">→</span>
    </a>
  </section>
</template>

<script setup lang="ts">
import { data as posts } from '../page/blog-posts.data.js';
import { useData, withBase } from 'vitepress';
import { onMounted, ref } from 'vue';

const { theme } = useData();
const userConfig = theme.value.blog ? theme.value.blog.user : null;

const tagNum = ref<Number>(0);
const tagSet = new Set<String>();
const archiveYears = ref<Number>(0);

onMounted(() => {
  const yearSet = new Set<String>();
  posts.forEach((post: { frontmatter: { tags: Array<string>; date?: string } }) => {
    const postTags = post.frontmatter.tags;
    if (postTags) {
      postTags.forEach((tag: string) => tagSet.add(tag));
    }
    const rawDate = post.frontmatter.date;
    if (rawDate) {
      const match = String(rawDate).match(/\d{4}/);
      if (match) yearSet.add(match[0]);
    }
  });
  tagNum.value = tagSet.size;
  archiveYears.value = yearSet.size;
});

const props = defineProps<{
  isMobile: Boolean;
}>();
</script>
