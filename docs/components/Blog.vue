<!-- eslint-disable vue/require-v-for-key -->
<script setup>
import { data as posts } from '../page/blog-posts.data.js';
import { data as contributionData } from '../page/contribution-graph.data.js';
import { useData, withBase, inBrowser } from 'vitepress';
import { ref, watch } from 'vue';
import ThemeLayout from './ThemeLayout.vue';
import ContributionGraph from './ContributionGraph.vue';

const { theme } = useData();
const blogConfig = theme.value.blog;
const contributionCounts = contributionData?.counts || {};
const contributionPosts = contributionData?.postsByDate || {};

let pageSize = 5;
if (blogConfig && blogConfig.pageSize) {
  pageSize = blogConfig.pageSize;
}

const currentPage = ref(1);
const totalPage = ref(1);
const pageGroup = ref(0);
const pageGroupSize = ref(5);
const searchQuery = ref('');

const nextGroup = () => {
  pageGroup.value++;
  currentPage.value = pageGroup.value * pageGroupSize.value + 1;
  if (currentPage.value > totalPage.value) {
    toFirstPage();
  }
};

const toFirstPage = () => {
  currentPage.value = 1;
  pageGroup.value = 0;
};

const lastGroup = () => {
  pageGroup.value--;
  currentPage.value = pageGroup.value * pageGroupSize.value + 1;
};

const realPage = (page) => {
  return page + pageGroup.value * pageGroupSize.value;
};

const isFirstPageGroup = () => {
  return pageGroup.value == 0;
};

const changePage = (curr) => {
  currentPage.value = curr;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const filteredList = (activeTag) => {
  let list = posts;
  if (activeTag) {
    list = list.filter(
      (item) => item.frontmatter.tags && item.frontmatter.tags.includes(activeTag)
    );
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    list = list.filter((item) => {
      const title = String(item.frontmatter.title || '').toLowerCase();
      const desc = String(item.frontmatter.desc || '').toLowerCase();
      const excerpt = String(item.excerpt || '').toLowerCase();
      return title.includes(query) || desc.includes(query) || excerpt.includes(query);
    });
  }
  return list;
};

const getData = (date) => {
  const language =
    typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : 'en-US';
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getPageState = (activeTag) => {
  const list = filteredList(activeTag);
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  totalPage.value = Math.ceil(list.length / pageSize);
  if (totalPage.value < currentPage.value) {
    toFirstPage();
  }
  const pagePosts = list.slice(start, end);
  const mode = String(blogConfig?.timelineGroup || 'month').toLowerCase();
  const rest = pagePosts.slice(1);
  return {
    total: list.length,
    featured: pagePosts[0] || null,
    rest,
    timeline: buildTimeline(rest, mode === 'year' ? 'year' : 'month'),
  };
};

const clearSearch = () => {
  searchQuery.value = '';
  toFirstPage();
};

watch(searchQuery, () => {
  toFirstPage();
});

const buildTimeline = (items, mode) => {
  const timeline = [];
  let lastLabel = null;
  items.forEach((post) => {
    const label = formatGroupLabel(post.frontmatter.date, mode);
    if (label !== lastLabel) {
      timeline.push({ type: 'group', label });
      lastLabel = label;
    }
    timeline.push({ type: 'post', post });
  });
  return timeline;
};

const formatGroupLabel = (value, mode) => {
  if (!value) return 'Unknown';
  const raw = typeof value === 'string' ? value : String(value);
  const match = raw.match(/\d{4}-\d{2}-\d{2}/);
  if (!match) return 'Unknown';
  const date = new Date(match[0]);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  if (mode === 'year') {
    return String(date.getFullYear());
  }
  const language =
    typeof navigator !== 'undefined' ? navigator.language || navigator.userLanguage : 'en-US';
  return new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric' }).format(date);
};

const openTagOverlay = (tag) => {
  if (!inBrowser || !tag) return;
  const params = new URLSearchParams(window.location.search);
  params.set('tag', tag);
  const query = params.toString();
  const next = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', next);
  window.dispatchEvent(new Event('popstate'));
};
</script>

<template>
  <ThemeLayout v-slot="{ activeTag }" :showContent="true">
    <div class="blog-shell">
      <div class="blog-topbar">
        <div>
          <div class="blog-topbar__title">Blog Index</div>
          <div class="blog-topbar__meta">
            <span v-if="activeTag" class="blog-topbar__tag">Tag: {{ activeTag }}</span>
            <span>{{ getPageState(activeTag).total }} posts</span>
          </div>
        </div>
        <div class="blog-topbar__controls">
          <input
            v-model="searchQuery"
            class="blog-search"
            type="search"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
          <button v-if="searchQuery" class="blog-search__clear" type="button" @click="clearSearch">
            Clear
          </button>
        </div>
      </div>

      <details class="blog-activity" open>
        <summary class="blog-activity__summary">
          <span>Activity</span>
          <span class="blog-activity__hint">Last 12 months</span>
        </summary>
        <ContributionGraph
          :counts="contributionCounts"
          :posts-by-date="contributionPosts"
          title=""
        />
      </details>

      <template v-for="state in [getPageState(activeTag)]" :key="state.total">
        <div v-if="state.featured" class="blog-feature">
          <a class="blog-feature__link" :href="withBase(state.featured.url)">
            <div
              class="blog-feature__media"
              :style="{
                backgroundImage: state.featured.frontmatter.cover
                  ? `url(${state.featured.frontmatter.cover})`
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(20, 184, 166, 0.2))',
              }"
            >
              <div class="blog-feature__overlay"></div>
            </div>
            <div class="blog-feature__content">
              <div class="blog-feature__eyebrow">
                {{ state.featured.frontmatter.pin ? 'Pinned' : 'Featured' }}
              </div>
              <div class="blog-feature__title">{{ state.featured.frontmatter.title }}</div>
              <div
                class="blog-feature__excerpt"
                v-html="state.featured.excerpt || state.featured.frontmatter.desc"
              ></div>
              <div class="blog-feature__meta">
                <div class="blog-feature__tags">
                  <span
                    v-for="tag in state.featured.frontmatter.tags || []"
                    :key="tag"
                    class="blog-tag"
                    role="button"
                    tabindex="0"
                    @click.stop.prevent="openTagOverlay(tag)"
                    @keydown.enter.stop.prevent="openTagOverlay(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
                <div>{{ getData(state.featured.frontmatter.date.substring(0, 10)) }}</div>
              </div>
            </div>
          </a>
        </div>

        <div v-if="state.timeline.length" class="blog-timeline">
          <template
            v-for="item in state.timeline"
            :key="item.type + item.label + (item.post?.url || '')"
          >
            <div v-if="item.type === 'group'" class="blog-timeline__group">
              <div class="blog-timeline__group-label">{{ item.label }}</div>
              <div class="blog-timeline__group-line"></div>
            </div>
            <article v-else class="blog-timeline__item">
              <div class="blog-timeline__marker">
                <span class="blog-timeline__dot"></span>
                <span class="blog-timeline__date">
                  {{ getData(item.post.frontmatter.date.substring(0, 10)) }}
                </span>
              </div>
              <a class="blog-timeline__card" :href="withBase(item.post.url)">
                <div class="blog-timeline__title">{{ item.post.frontmatter.title }}</div>
                <div
                  class="blog-timeline__excerpt"
                  v-html="item.post.excerpt || item.post.frontmatter.desc"
                ></div>
                <div class="blog-timeline__tags">
                  <span
                    v-for="tag in item.post.frontmatter.tags || []"
                    :key="tag"
                    class="blog-tag blog-tag--muted"
                    role="button"
                    tabindex="0"
                    @click.stop.prevent="openTagOverlay(tag)"
                    @keydown.enter.stop.prevent="openTagOverlay(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
              </a>
            </article>
          </template>
        </div>

        <div v-else-if="!state.featured" class="blog-empty">
          No posts matched your filters.
        </div>
      </template>
    </div>

    <div
      class="flex justify-between items-center gap-2 border-0 flex-row w-full px-5"
      v-if="totalPage > 1"
    >
      <div class="w-14">
        <div
          @click="lastGroup()"
          class="border-2 w-full h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm"
          v-show="!isFirstPageGroup()"
        >
          Prev
        </div>
      </div>
      <div class="flex justify-center items-center gap-2">
        <div
          @click="changePage(realPage(i))"
          v-for="i in Math.min(totalPage, pageGroupSize)"
          v-show="realPage(i) <= totalPage"
          class="border-2 w-7 h-7 text-center flex justify-center items-center cursor-pointer rounded-md"
          :class="{
            'bg-[var(--vp-c-brand-1)] text-white': realPage(i) === currentPage,
            'bg-[var(--vp-c-blog-bg)]': realPage(i) !== currentPage,
          }"
        >
          {{ realPage(i) }}
        </div>
      </div>
      <div class="w-14">
        <div
          @click="nextGroup()"
          class="border-2 w-full h-8 text-center flex justify-center items-center cursor-pointer bg-[var(--vp-c-blog-bg)] rounded-md text-sm"
        >
          Next
        </div>
      </div>
    </div>
  </ThemeLayout>
</template>
