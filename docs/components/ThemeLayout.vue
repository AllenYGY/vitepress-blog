<script setup>
import { data as posts } from '../page/blog-posts.data.js';
import { useData } from 'vitepress';
import { ref, onMounted, computed } from 'vue';
import IconMore from './icon/IconMore.vue';
import UserCard from './UserCard.vue';
import WidgetCard from './WidgetCard.vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  showContent: Boolean,
});

const emit = defineEmits(['update:activeTag']);

const { theme } = useData();
const blogConfig = theme.value.blog || {};

let Tags = ref({ '': posts.length });
let activeTag = ref('');
const tagQuery = ref('');

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

const getTagArray = () => {
  let tagArray = [];
  tagArray = Object.entries(Tags.value);
  tagArray.sort((a, b) => b[1] - a[1]);
  return tagArray;
};

const tagEntries = computed(() => {
  return getTagArray().filter(([tag]) => tag);
});

const filteredTags = computed(() => {
  const query = tagQuery.value.trim().toLowerCase();
  if (!query) return tagEntries.value.slice(0, 12);
  return tagEntries.value.filter(([tag]) => tag.toLowerCase().includes(query));
});

const setActiveTag = (tag) => {
  activeTag.value = tag || '';
  emit('update:activeTag', activeTag.value);
};
</script>

<template>
  <div class="blog-layout">
    <aside v-if="!theme.blog.pureMode" class="blog-layout__sidebar">
      <UserCard :isMobile="false" />
      <section class="sidebar-tags" aria-labelledby="tag-navigator-title">
        <div class="sidebar-tags__header">
          <div>
            <div id="tag-navigator-title" class="sidebar-tags__title">Tag Navigator</div>
            <div class="sidebar-tags__subtitle">
              {{ activeTag ? `Filtering: ${activeTag}` : 'Browse the notebook by topic' }}
            </div>
          </div>
          <div class="sidebar-tags__actions">
            <button
              class="sidebar-tags__all"
              type="button"
              :class="{ 'is-active': !activeTag }"
              @click="setActiveTag('')"
            >
              All
            </button>
            <a
              v-if="blogConfig.tagPageLink"
              class="sidebar-tags__more"
              :href="blogConfig.tagPageLink"
              aria-label="Open all tags"
            >
              <IconMore />
            </a>
          </div>
        </div>
        <input
          v-model="tagQuery"
          class="sidebar-tags__search"
          type="search"
          placeholder="Search tags..."
          aria-label="Search tags"
        />
        <div class="sidebar-tags__list">
          <button
            v-for="[tag, count] in filteredTags"
            :key="tag"
            class="sidebar-tags__item"
            :class="{ 'is-active': activeTag === tag }"
            type="button"
            @click="setActiveTag(tag)"
          >
            <span class="sidebar-tags__name">{{ tag }}</span>
            <span class="sidebar-tags__count">{{ count }}</span>
          </button>
        </div>
        <div v-if="tagQuery.trim() && filteredTags.length === 0" class="sidebar-tags__empty">
          No tags matched.
        </div>
      </section>
      <WidgetCard />
    </aside>

    <main class="blog-layout__main">
      <slot :activeTag="activeTag" />
    </main>

    <UserCard :isMobile="true" />
  </div>
  <Content v-if="showContent" />
</template>
