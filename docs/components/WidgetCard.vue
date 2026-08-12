<template>
  <section v-for="widget in widgets" :key="widget.name || widget.link" class="blog-widget">
    <div class="blog-widget__header">
      <div v-if="widget.name" class="blog-widget__title">{{ widget.name }}</div>
      <a v-if="widget.link" class="blog-widget__link" :href="widget.link" aria-label="Open widget link">
        <IconLink />
      </a>
    </div>
    <div v-html="widget.html" class="blog-widget__content"></div>
  </section>
</template>

<script lang="ts" setup>
import IconLink from './icon/IconLink.vue';
import { useData } from 'vitepress';

const { theme, frontmatter } = useData();
const widgets = [
  ...(theme.value.blog?.widgets || []),
  ...(frontmatter.value.widgets || []),
];
</script>
