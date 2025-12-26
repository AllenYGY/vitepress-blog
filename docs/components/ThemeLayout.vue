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
const direct = blogConfig?.direct || 'lft';

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
  <div class="w-full flex justify-center">
    <div
      class="flex w-full max-w-screen-2xl justify-center items-start pt-0 my-0 gap-5 md:px-20 flex-col-reverse"
      :class="{
        'md:flex-row': direct == 'lft',
        'md:flex-row-reverse': direct == 'rgt',
      }"
    >
      <div
        class="flex bg-transparent w-full md:w-1/4 justify-center items-start py-16 flex-col gap-5"
        v-if="!theme.blog.pureMode"
      >
        <UserCard :isMobile="false" />
        <div
          class="sidebar-tags flex w-full md:rounded-xl px-5 py-7 flex-col justify-center gap-4 dark:shadow-none shadow-md border-2 border-[var(--blog-border-c)] bg-[var(--vp-c-blog-bg)]"
        >
          <div class="sidebar-tags__header">
            <div>
              <div class="sidebar-tags__title">Tag Navigator</div>
              <div class="sidebar-tags__subtitle">
                {{ activeTag ? `Filtering: ${activeTag}` : 'All posts' }}
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
              <a v-if="blogConfig.tagPageLink" :href="blogConfig.tagPageLink">
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
        </div>
        <WidgetCard />
      </div>
      <div class="flex md:w-3/4 py-20 justify-center items-center gap-5 flex-col w-full px-3">
        <slot :activeTag="activeTag" />
      </div>
      <UserCard :isMobile="true" />
    </div>
    <Content v-if="showContent" />
  </div>
</template>

<style>
.blog-home .VPContent {
  padding-top: 0 !important;
}

.shadow-0 {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
