<template>
  <ThemeLayout @update:activeTag="applySidebarTag">
    <section class="tags-library" aria-labelledby="tags-library-title">
      <header class="tags-library__header">
        <div>
          <p class="page-eyebrow">Knowledge index</p>
          <h1 id="tags-library-title">Browse by topic.</h1>
          <p>{{ filteredList.length }} notes across {{ sortedTags.length }} tags.</p>
        </div>
        <input
          v-model="tagQuery"
          type="search"
          class="vp-tags-search"
          placeholder="Search tags..."
          aria-label="Search tags"
        />
      </header>

      <div v-if="selectedTags.length" class="vp-tags-selected">
        <div class="vp-tags-selected__label">Selected topics</div>
        <div class="tags-library__chips">
          <button
            v-for="tag in selectedTags"
            :key="tag"
            class="tags-library__chip is-active"
            type="button"
            @click="toggleTag(tag)"
          >
            {{ tag }} <span aria-hidden="true">×</span>
          </button>
        </div>
        <button class="vp-tags-selected__clear" type="button" @click="clearTags">Clear all</button>
      </div>

      <div v-if="tagQuery.trim()" class="tags-library__suggestions">
        <button
          v-for="([tag, count], index) in filteredTags"
          :key="`${tag}-${index}`"
          class="tags-library__chip"
          :class="{ 'is-active': selectedTags.includes(tag) }"
          type="button"
          @click="toggleTag(tag)"
        >
          <span>{{ tag }}</span><small>{{ count }}</small>
        </button>
        <p v-if="filteredTags.length === 0" class="tags-library__empty">No tags matched.</p>
      </div>
      <p v-else-if="selectedTags.length === 0" class="tags-library__hint">
        Search above or use the Tag Navigator to narrow the notebook.
      </p>

      <div class="tags-library__list">
        <article v-for="(post, index) in filteredList" :key="post.url" class="tags-library__item">
          <span class="tags-library__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="tags-library__content">
            <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
            <div class="tags-library__post-tags">
              <button
                v-for="tag in post.frontmatter.tags"
                :key="tag"
                class="tags-library__text-tag"
                :class="{ 'is-active': selectedTags.includes(tag) }"
                type="button"
                @click="toggleTag(tag)"
              >
                {{ tag }}
              </button>
            </div>
          </div>
          <span class="tags-library__arrow" aria-hidden="true">↗</span>
        </article>
      </div>
    </section>
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
