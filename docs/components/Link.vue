<template>
  <section class="friend-links">
    <div class="friend-links__grid">
      <a
        v-for="(link, index) in props.links"
        :key="link.link"
        class="friend-card"
        :href="link.link"
        target="_blank"
        rel="noopener noreferrer"
        :style="{ '--friend-index': index }"
      >
        <div class="friend-card__avatar">
          <img :src="link.avatar" :alt="link.name" />
        </div>
        <div class="friend-card__content">
          <div class="friend-card__name">{{ link.name }}</div>
          <div v-if="link.desc" class="friend-card__desc">{{ link.desc }}</div>
          <div class="friend-card__meta">
            <span class="friend-card__url">{{ getHost(link.link) }}</span>
            <span class="friend-card__cta">Visit</span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Link {
  name: string;
  link: string;
  avatar: string;
  desc?: string;
}

const props = withDefaults(defineProps<{ links?: Link[] }>(), {
  links: () => [],
});

const getHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};
</script>
