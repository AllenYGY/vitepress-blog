<template>
  <div
    class="hidden md:flex w-full md:rounded-xl p-5 flex-col justify-center items-center gap-3 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]"
    v-if="!props.isMobile"
  >
    <div class="user-card__avatar" v-if="userConfig?.avatar">
      <img
        :src="userConfig?.avatar"
        alt="avatar"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <div class="text-xl font-bold text-center mt-1">
      {{ userConfig?.name }}
    </div>
    <div class="text-center text-sm font-semibold">{{ userConfig?.describe }}</div>
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
        <div class="user-card__stat-label">Archive</div>
        <div class="user-card__stat-value">{{ archiveYears }}</div>
      </a>
    </div>
    <div class="user-card__cta">
      <a class="user-card__button" :href="withBase('/page/blog')">Latest posts</a>
      <a class="user-card__button user-card__button--ghost" :href="withBase('/page/archive')">
        Browse archive
      </a>
    </div>
  </div>
  <div class="flex md:hidden justify-center items-center w-full mt-10 flex-col gap-3" v-else>
    <img
      :src="userConfig?.avatar"
      v-if="userConfig?.avatar"
      alt="avatar"
      class="object-cover object-center w-32 rounded-full"
    />
    <div class="text-2xl font-bold text-center">{{ userConfig?.name }}</div>
    <div class="text-center text-sm">{{ userConfig?.describe }}</div>
    <div class="user-card__meta user-card__meta--mobile">
      <a class="user-card__stat" :href="withBase('/page/blog')">
        <div class="user-card__stat-label">Posts</div>
        <div class="user-card__stat-value">{{ posts.length }}</div>
      </a>
      <a class="user-card__stat" :href="withBase('/page/tags')">
        <div class="user-card__stat-label">Tags</div>
        <div class="user-card__stat-value">{{ tagNum }}</div>
      </a>
    </div>
    <div class="user-card__cta user-card__cta--mobile">
      <a class="user-card__button" :href="withBase('/page/blog')">Latest posts</a>
    </div>
  </div>
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
      postTags.forEach((tag: string) => {
        tagSet.add(tag);
      });
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
