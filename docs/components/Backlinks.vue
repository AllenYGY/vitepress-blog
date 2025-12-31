<template>
  <section v-if="items.length" class="backlinks">
    <div class="backlinks__title">
      Linked from <span class="backlinks__count">{{ items.length }}</span>
    </div>
    <ul class="backlinks__list">
      <li v-for="item in items" :key="item.url">
        <a class="backlinks__link" :href="withBase(item.url)">
          <span class="backlinks__link-title">{{ item.title }}</span>
          <span class="backlinks__link-arrow">-></span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, withBase } from 'vitepress';
import { data as wikiData } from '../page/wiki-links.data.js';

interface BacklinkEntry {
  title: string;
  url: string;
}

const normalizeUrl = (value: string) => {
  if (!value) return '';
  let url = value.trim().replace(/\.html$/, '');
  if (url.length > 1) url = url.replace(/\/$/, '');
  return url;
};

const route = useRoute();

const items = computed<BacklinkEntry[]>(() => {
  const key = normalizeUrl(route.path);
  const list = (wikiData?.backlinks?.[key] || []) as BacklinkEntry[];
  return [...list].sort((a, b) => a.title.localeCompare(b.title));
});
</script>
