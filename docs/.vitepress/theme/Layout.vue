<template>
  <Transition>
    <div id="Loading" v-if="isLoading"></div>
  </Transition>

  <Layout
    class="bg-no-repeat bg-center bg-fixed bg-cover"
    :style="bgImg ? { 'background-image': `url(${bgImg})` } : {}"
    :class="{ loadingStyle: isLoading, 'post-page': isPostPage }"
  >
    <template #doc-before>
      <PostHero v-if="isPostPage" />
      <template v-else>
        <div class="text-3xl font-bold" v-if="title && useTitle">{{ title }}</div>
        <DocTags />
      </template>
    </template>
    <template #doc-after>
      <Backlinks v-if="showBacklinks" />
      <Comment />
    </template>
  </Layout>
  <TagsOverlay />
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { onMounted, ref, watch, computed } from 'vue';
import { useLoading } from './composables/useLoading';
import Comment from './components/Comment.vue';
import DocTags from '../../components/DocTags.vue';
import PostHero from '../../components/PostHero.vue';
import TagsOverlay from '../../components/TagsOverlay.vue';
import Backlinks from '../../components/Backlinks.vue';

const { Layout } = DefaultTheme;

const { isLoading } = useLoading(() =>
  import('../../../node_modules/vitepress-theme-open17/tailwind.js')
);

const { frontmatter, isDark, theme } = useData();

const mergedFrontmatter = computed(() => {
  return Object.assign(
    { title: 'Default Title', date: '1900-01-01' },
    Object.keys(frontmatter.value || {}).reduce((acc, key) => {
      acc[key.toLowerCase()] = frontmatter.value[key];
      return acc;
    }, {})
  );
});

const blogConfig = theme.value.blog || {};
const useTitle = blogConfig?.usingTitleFromFrontmatter ?? true;
const title = computed(() => mergedFrontmatter?.value.title ?? null);
const isBlogTop = ref(mergedFrontmatter.value.layout === 'blog');
const bgImg = ref(null);
const route = useRoute();
const isPostPage = computed(() => {
  const path = route.path || '';
  const layout = String(mergedFrontmatter.value.layout || '').toLowerCase();
  const isSlide = Boolean(
    mergedFrontmatter.value.slidev || mergedFrontmatter.value.slidevview === 'slides'
  );
  if (layout && layout !== 'doc') return false;
  return path.includes('/posts/') && !isSlide;
});

const showBacklinks = computed(() => {
  if (frontmatter.value.backlinks === false) return false;
  const layout = String(mergedFrontmatter.value.layout || '').toLowerCase();
  if (layout && layout !== 'doc') return false;
  return true;
});

onMounted(() => {
  window.addEventListener('scroll', () => {
    isBlogTop.value = window.scrollY <= 50;
  });
  updateBgImg();
});

const trigger = computed(() => ({
  isDark: isDark.value,
  route: route.path,
}));

watch(trigger, () => {
  updateBgImg();
});

const updateBgImg = () => {
  bgImg.value = getBgImg();
};

const getBgImg = () => {
  const getBgImageByType = (imageType) => {
    const globalImage =
      typeof blogConfig?.bgImage === 'object' ? blogConfig?.bgImage[imageType] : blogConfig?.bgImage;
    const localImage =
      typeof mergedFrontmatter.value.bgimage === 'object'
        ? mergedFrontmatter.value.bgimage[imageType]
        : mergedFrontmatter.value.bgimage;
    return localImage || globalImage || null;
  };
  return isDark.value ? getBgImageByType('dark') : getBgImageByType('light');
};
</script>

<style>
#VPContent {
  background: #ffffff74;
}

.dark #VPContent {
  background: #1b1b1fc3;
}

#VPContent .aside-curtain {
  display: none;
}

.MathJax {
  overflow-y: hidden;
  overflow-x: auto;
}

@media (min-width: 960px) {
  .VPNavBar[data-v-cf6e7c5e]:not(.home) {
    background-color: var(--vp-nav-bg-color) !important;
  }
}
</style>

<style scoped>
#Loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  margin: 0;
  padding: 0%;
  z-index: 10000;
}

.loadingStyle {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
