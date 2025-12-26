<template>
  <ThemeLayout @update:activeTag="applySidebarTag">
    <div class="archive-shell">
      <div class="archive-topbar">
        <div>
          <div class="archive-topbar__title">Archive Library</div>
          <div class="archive-topbar__meta">
            <span v-if="sidebarTag" class="archive-topbar__tag">Tag: {{ sidebarTag }}</span>
            <span>{{ totalPosts }} posts</span>
            <span>{{ yearCount }} years</span>
            <span v-if="latestDate">Updated {{ latestDate }}</span>
          </div>
        </div>
        <div class="archive-topbar__controls">
          <input
            v-model="archiveQuery"
            class="archive-search"
            type="search"
            placeholder="Search archive..."
            aria-label="Search archive"
          />
          <button v-if="archiveQuery" class="archive-search__clear" type="button" @click="clearSearch">
            Clear
          </button>
        </div>
      </div>

      <details class="archive-activity" open>
        <summary class="archive-activity__summary">
          <span>Activity Map</span>
          <span class="archive-activity__hint">Last 12 months</span>
        </summary>
        <ContributionGraph
          :counts="contributionCounts"
          :posts-by-date="contributionPosts"
          title=""
        />
      </details>

      <div v-if="archiveSections.length" class="archive-list">
        <details
          v-for="section in archiveSections"
          :key="section.year"
          class="archive-year"
          :open="section.year === latestYear"
        >
          <summary class="archive-year__summary">
            <div class="archive-year__title">{{ section.year }}</div>
            <div class="archive-year__meta">
              {{ section.total }} posts / {{ section.months.length }} months
            </div>
          </summary>
          <div class="archive-year__grid">
            <article
              v-for="month in section.months"
              :key="month.monthNumber"
              class="archive-month"
              role="button"
              tabindex="0"
              @click="openMonth(section.year, month)"
              @keydown.enter.prevent="openMonth(section.year, month)"
              @keydown.space.prevent="openMonth(section.year, month)"
            >
              <div class="archive-month__header">
                <div class="archive-month__heading">
                  <span class="archive-month__name">{{ month.monthName }}</span>
                  <span class="archive-month__count">{{ month.posts.length }}</span>
                </div>
              </div>
              <div class="archive-month__preview">
                <div
                  v-for="post in month.posts.slice(0, 3)"
                  :key="post.url"
                  class="archive-month__preview-item"
                >
                  {{ post.frontmatter.title }}
                </div>
                <div v-if="month.posts.length > 3" class="archive-month__preview-more">
                  +{{ month.posts.length - 3 }} more
                </div>
              </div>
            </article>
          </div>
        </details>
      </div>
      <div v-else class="archive-empty">No posts matched your filters.</div>
    </div>
    <Teleport to="body">
      <div v-if="activeMonth" class="archive-modal" @click.self="closeMonth">
        <div class="archive-modal__panel">
          <div class="archive-modal__header">
            <div>
              <div class="archive-modal__title">
                {{ activeMonth.monthName }} {{ activeMonth.year }}
              </div>
              <div class="archive-modal__meta">{{ activeMonth.posts.length }} posts</div>
            </div>
            <button class="archive-modal__close" type="button" @click="closeMonth">
              Close
            </button>
          </div>
          <div class="archive-modal__list">
            <a
              v-for="post in activeMonth.posts"
              :key="post.url"
              class="archive-modal__item"
              :href="withBase(post.url)"
            >
              <div class="archive-modal__date">{{ formatDay(post.frontmatter.date) }}</div>
              <div class="archive-modal__content">
                <div class="archive-modal__item-title">{{ post.frontmatter.title }}</div>
                <div
                  v-if="post.excerpt || post.frontmatter.desc"
                  class="archive-modal__excerpt"
                  v-html="post.excerpt || post.frontmatter.desc"
                ></div>
                <div v-if="post.frontmatter.tags?.length" class="archive-modal__tags">
                  <span
                    v-for="tag in post.frontmatter.tags"
                    :key="tag"
                    class="blog-tag blog-tag--muted"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </ThemeLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { data as posts } from '../page/blog-posts.data.js';
import { data as contributionData } from '../page/contribution-graph.data.js';
import { withBase } from 'vitepress';
import ThemeLayout from './ThemeLayout.vue';
import ContributionGraph from './ContributionGraph.vue';

interface DatePosts {
  monthNumber: number;
  monthName: string;
  posts: Array<any>;
}

interface ActiveMonth {
  year: number;
  monthNumber: number;
  monthName: string;
  posts: Array<any>;
}

const contributionCounts = contributionData?.counts || {};
const contributionPosts = contributionData?.postsByDate || {};

const sidebarTag = ref('');
const archiveQuery = ref('');
const activeMonth = ref<ActiveMonth | null>(null);

const filteredPosts = computed(() => {
  let list = posts;
  if (sidebarTag.value) {
    list = list.filter(
      (item) => item.frontmatter.tags && item.frontmatter.tags.includes(sidebarTag.value)
    );
  }
  if (archiveQuery.value.trim()) {
    const query = archiveQuery.value.trim().toLowerCase();
    list = list.filter((item) => {
      const title = String(item.frontmatter.title || '').toLowerCase();
      const desc = String(item.frontmatter.desc || '').toLowerCase();
      const excerpt = String(item.excerpt || '').toLowerCase();
      return title.includes(query) || desc.includes(query) || excerpt.includes(query);
    });
  }
  return list;
});

const archiveSections = computed(() => {
  const yearMap = new Map<number, Map<number, DatePosts>>();
  const sortedPosts = [...filteredPosts.value].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return +dateB - +dateA;
  });

  sortedPosts.forEach((post) => {
    const date = new Date(post.frontmatter.date);
    if (Number.isNaN(date.getTime())) return;
    const year = date.getFullYear();
    const monthNumber = date.getMonth();
    const monthName = date.toLocaleString('default', { month: 'long' });
    if (!yearMap.has(year)) {
      yearMap.set(year, new Map());
    }
    const monthMap = yearMap.get(year);
    if (!monthMap.has(monthNumber)) {
      monthMap.set(monthNumber, {
        monthNumber,
        monthName,
        posts: [],
      });
    }
    monthMap.get(monthNumber).posts.push(post);
  });

  return Array.from(yearMap.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, monthMap]) => {
      const months = Array.from(monthMap.values()).sort(
        (a, b) => b.monthNumber - a.monthNumber
      );
      const total = months.reduce((sum, month) => sum + month.posts.length, 0);
      return { year, months, total };
    });
});

const totalPosts = computed(() => filteredPosts.value.length);
const yearCount = computed(() => {
  const years = new Set(
    filteredPosts.value.map((post) => {
      const match = String(post.frontmatter.date || '').match(/\d{4}/);
      return match ? match[0] : 'Unknown';
    })
  );
  return years.size;
});

const latestDate = computed(() => {
  if (!filteredPosts.value.length) return '';
  const date = filteredPosts.value[0].frontmatter.date;
  if (!date) return '';
  const match = String(date).match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : '';
});

const latestYear = computed(() => archiveSections.value[0]?.year ?? null);

const applySidebarTag = (tag: string) => {
  sidebarTag.value = tag || '';
};

const clearSearch = () => {
  archiveQuery.value = '';
};

const openMonth = (year: number, month: DatePosts) => {
  activeMonth.value = {
    year,
    monthNumber: month.monthNumber,
    monthName: month.monthName,
    posts: month.posts,
  };
};

const closeMonth = () => {
  activeMonth.value = null;
};

const formatDay = (raw: string) => {
  const text = String(raw || '');
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  if (match) return match[0];
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return text;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
</script>
