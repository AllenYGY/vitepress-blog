<template>
  <ClientOnly>
    <div v-if="tags.length" class="vp-doc-tags">
      <div class="vp-doc-tags__label">Tags</div>
      <div class="vp-doc-tags__list">
        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="vp-doc-tags__tag"
          @click="openOverlay(tag)"
        >
          {{ tag }}
        </button>
      </div>
      <div class="vp-doc-tags__actions">
        <button class="vp-doc-tags__show" type="button" @click="openOverlay(tags[0])">
          View list
        </button>
        <a class="vp-doc-tags__link" :href="tagPageHref">
          Open tags page
        </a>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed } from "vue";
import { useData, withBase, inBrowser } from "vitepress";

const { frontmatter } = useData();

const tags = computed(() => {
  const raw = frontmatter.value?.tags;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
});

const tagPageHref = computed(() => {
  if (!tags.value.length) return withBase("/page/tags");
  const tag = tags.value[0];
  return withBase(`/page/tags?tag=${encodeURIComponent(tag)}`);
});

const openOverlay = (tag) => {
  if (!inBrowser || !tag) return;
  const params = new URLSearchParams(window.location.search);
  params.set("tag", tag);
  const query = params.toString();
  const next = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", next);
  window.dispatchEvent(new Event("popstate"));
};
</script>
