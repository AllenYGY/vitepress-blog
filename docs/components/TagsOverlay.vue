<template>
  <ClientOnly>
    <div v-if="visible" class="vp-tags-overlay" @click.self="close">
      <div class="vp-tags-panel">
        <div class="vp-tags-panel__header">
          <div class="vp-tags-panel__title">
            Tag: {{ activeTag }}
          </div>
          <button class="vp-tags-panel__close" type="button" @click="close">Close</button>
        </div>
        <div class="vp-tags-panel__list" v-if="filteredPosts.length">
          <a
            v-for="post in filteredPosts"
            :key="post.url"
            class="vp-tags-panel__link"
            :href="withBase(post.url)"
          >
            {{ post.frontmatter.title }}
          </a>
        </div>
        <div v-else class="vp-tags-panel__empty">No posts for this tag.</div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed, watchEffect, ref, onMounted, onUnmounted } from "vue";
import { useData, useRoute, withBase, inBrowser } from "vitepress";
import { data as posts } from "../page/blog-posts.data.js";

const route = useRoute();
const { site } = useData();

const activeTag = ref("");

const readTagFromUrl = () => {
  if (!inBrowser) return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("tag") || "";
};

watchEffect(() => {
  route.path;
  activeTag.value = readTagFromUrl();
});

const handlePopState = () => {
  activeTag.value = readTagFromUrl();
};

onMounted(() => {
  if (!inBrowser) return;
  window.addEventListener("popstate", handlePopState);
});

onUnmounted(() => {
  if (!inBrowser) return;
  window.removeEventListener("popstate", handlePopState);
});

const visible = computed(() => activeTag.value.length > 0);

const filteredPosts = computed(() => {
  if (!activeTag.value) return [];
  return posts.filter((item) => {
    const tags = item.frontmatter.tags;
    if (!tags) return false;
    if (Array.isArray(tags)) {
      return tags.includes(activeTag.value);
    }
    return tags === activeTag.value;
  });
});

const close = () => {
  if (!inBrowser) return;
  const params = new URLSearchParams(window.location.search);
  params.delete("tag");
  const query = params.toString();
  const base = site.value.base.replace(/\/$/, "");
  const next = `${base}${route.path}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", next);
  activeTag.value = "";
};
</script>
