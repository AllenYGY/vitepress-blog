<template>
  <ThemeLayout @update:activeTag="applySidebarTag">
    <div
      class="flex w-full flex-col bg-opacity-90 backdrop-blur-sm dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)] rounded-xl py-10 px-10"
    >
      <div class="flex flex-col md:mx-10 gap-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div class="text-sm text-[var(--vp-c-text-2)]">Search tags</div>
          <input
            v-model="tagQuery"
            type="search"
            class="vp-tags-search"
            placeholder="Type to filter tags..."
            aria-label="Search tags"
          />
        </div>
        <div v-if="selectedTags.length" class="vp-tags-selected">
          <div class="vp-tags-selected__label">Selected</div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in selectedTags"
              :key="tag"
              class="px-2 rounded-sm cursor-pointer border bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
          <button class="vp-tags-selected__clear" type="button" @click="clearTags">
            Clear
          </button>
        </div>
        <div v-if="tagQuery.trim()" class="flex justify-left items-center flex-wrap md:gap-3 gap-2">
          <span
            v-for="(item, index) in filteredTags"
            :key="`${item[0]}-${index}`"
            class="px-2 rounded-sm cursor-pointer border"
            :class="{
              'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]':
                selectedTags.includes(item[0]),
              'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]':
                !selectedTags.includes(item[0]),
            }"
            @click="toggleTag(item[0])"
          >
            {{ item[0] == '' ? 'All' : item[0] }}
          </span>
        </div>
        <div
          v-else-if="selectedTags.length === 0"
          class="text-sm text-[var(--vp-c-text-2)]"
        >
          Start typing to see tags.
        </div>
        <div
          v-if="tagQuery.trim() && filteredTags.length === 0"
          class="text-sm text-[var(--vp-c-text-2)]"
        >
          No tags matched.
        </div>
      </div>
      <div class="text-2xl w-full text-center border-dashed border-t-2 pt-5 mt-10 mb-5"></div>
      <div class="flex justify-center flex-col gap-10 md:gap-5 px-10">
        <div
          class="flex items-center gap-2 flex-col md:flex-row md:gap-20 md:justify-between"
          v-for="post in filteredList"
          :key="post.url"
        >
          <a :href="withBase(post.url)" class="hover:underline text-base">
            {{ post.frontmatter.title }}
          </a>
          <div class="flex justify-end items-end gap-2">
            <span
              class="cursor-pointer text-sm px-2 rounded-sm border"
              :class="{
                'bg-[var(--blog-tag-bg-2)] text-[var(--blog-tag-text-2)] border-[var(--blog-tag-text-2)]':
                  selectedTags.includes(tag),
                'bg-[var(--blog-tag-bg-1)] text-[var(--blog-tag-text-1)] border-[var(--blog-tag-text-1)]':
                  !selectedTags.includes(tag),
              }"
              v-for="(tag, idx) in post.frontmatter.tags"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ThemeLayout>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { data as posts } from '../page/blog-posts.data.js';
import { withBase, useRoute } from 'vitepress';
import ThemeLayout from './ThemeLayout.vue';

let Tags = ref({});
const selectedTags = ref([]);
const tagQuery = ref('');
const readTagsFromUrl = () => {
  if (typeof window === 'undefined') return [];
  const params = new URLSearchParams(window.location.search);
  const tags = params.getAll('tag');
  if (tags.length) return tags;
  const fallback = params.get('tag') || '';
  return fallback ? fallback.split(',') : [];
};

onMounted(() => {
  const initialTags = readTagsFromUrl();
  selectedTags.value = initialTags.map((item) => item.trim()).filter(Boolean);
  tagQuery.value = '';
});
onMounted(() => {
  posts.forEach((post) => {
    const tags = post.frontmatter.tags;
    if (tags) {
      tags.forEach((tag) => {
        if (Tags.value[tag]) {
          Tags.value[tag]++;
        } else {
          Tags.value[tag] = 1;
        }
      });
    }
  });
});

const route = useRoute();

watchEffect(() => {
  route.path;
  if (typeof window === 'undefined') return;
  const tags = readTagsFromUrl();
  selectedTags.value = tags.map((item) => item.trim()).filter(Boolean);
  tagQuery.value = '';
});

const filteredList = computed(() => {
  let list = posts;
  if (selectedTags.value.length) {
    list = list.filter((item) => {
      const tags = item.frontmatter.tags || [];
      return selectedTags.value.every((tag) => tags.includes(tag));
    });
  }
  return list;
});

const sortedTags = computed(() => {
  const entries = Object.entries(Tags.value || {});
  entries.sort((a, b) => b[1] - a[1]);
  return entries;
});

const filteredTags = computed(() => {
  const query = tagQuery.value.trim().toLowerCase();
  if (!query) return [];
  return sortedTags.value.filter(([tag]) => {
    if (tag === '') return false;
    return String(tag).toLowerCase().includes(query);
  });
});

const toggleTag = (tag) => {
  if (!tag) return;
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    return;
  }
  selectedTags.value = [...selectedTags.value, tag];
};

const clearTags = () => {
  selectedTags.value = [];
};

const applySidebarTag = (tag) => {
  if (!tag) {
    selectedTags.value = [];
    tagQuery.value = '';
    return;
  }
  selectedTags.value = [tag];
  tagQuery.value = tag;
};
</script>
