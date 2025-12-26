<template>
  <div class="comment mt-5" v-if="useComment && refreshFlag">
    <Giscus
      v-if="commentConfig"
      :repo="commentConfig.repo"
      :repo-id="commentConfig.repoId"
      :category="commentConfig.category"
      :category-id="commentConfig.categoryId"
      :mapping="commentConfig.mapping"
      :strict="commentConfig.strict"
      :reactions-enabled="commentConfig.reactionsEnabled"
      :emit-metadata="commentConfig.emitMetadata"
      :input-position="commentConfig.inputPosition"
      :lang="commentConfig.lang"
      :theme="commentTheme"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import Giscus from '@giscus/vue';
import { useRefreshOnRouteChange } from '../composables/useRefreshOnRouteChange';

const { frontmatter, isDark, theme } = useData();
const commentConfig = theme.value.comment;
const { refreshFlag } = useRefreshOnRouteChange();

const useComment = computed(() => {
  if (frontmatter.value.comment === false) return false;
  return theme.value.comment?.use || frontmatter.value.comment !== undefined;
});

const commentTheme = computed(() => (isDark.value ? 'dark_tritanopia' : 'light_tritanopia'));
</script>
