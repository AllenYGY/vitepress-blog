<template>
  <a
    v-if="resolvedHref"
    :href="resolvedHref"
    class="wiki-link"
    :class="{ 'wiki-link--external': isExternal }"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    {{ displayText }}
  </a>
  <span v-else class="wiki-link wiki-link--missing" :title="missingTitle">
    {{ displayText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as wikiData } from '../page/wiki-links.data.js';

interface WikiPage {
  url: string;
  title: string;
  relativePath: string;
  aliases: string[];
}

const normalizeKey = (value: string) => {
  if (!value) return '';
  return value
    .trim()
    .replace(/^\/+/, '')
    .replace(/\.md$/i, '')
    .replace(/#.*$/, '')
    .toLowerCase();
};

const toSlug = (value: string) => {
  if (!value) return '';
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '');
};

const getPathKeys = (relativePath: string) => {
  if (!relativePath) return [];
  const cleanPath = relativePath.replace(/\.md$/, '');
  const parts = cleanPath.split('/');
  const fileStem = parts[parts.length - 1];
  const keys = [cleanPath, fileStem];
  if (fileStem.toLowerCase() === 'index' && parts.length > 1) {
    keys.push(parts[parts.length - 2], parts.slice(0, -1).join('/'));
  }
  return keys;
};

const buildIndex = (pages: WikiPage[]) => {
  const index: Record<string, string> = {};
  pages.forEach((page) => {
    const keys = new Set<string>([
      page.title,
      page.url,
      ...(page.aliases || []),
      ...getPathKeys(page.relativePath || ''),
    ]);
    keys.forEach((key) => {
      const normalized = normalizeKey(key);
      if (!normalized || index[normalized]) return;
      index[normalized] = page.url;
    });
  });
  return index;
};

const wikiPages = (wikiData?.pages || []) as WikiPage[];
const linkIndex = buildIndex(wikiPages);

const parseTarget = (value: string) => {
  const trimmed = value.trim();
  const hashIndex = trimmed.indexOf('#');
  if (hashIndex === -1) return { base: trimmed, hash: '' };
  return {
    base: trimmed.slice(0, hashIndex).trim(),
    hash: trimmed.slice(hashIndex + 1).trim(),
  };
};

const isExternalTarget = (value: string) => /^https?:\/\//i.test(value);

const props = withDefaults(
  defineProps<{
    target: string;
    text?: string;
  }>(),
  { text: '' }
);

const displayText = computed(() => props.text?.trim() || props.target);
const missingTitle = computed(() => `Missing page: ${props.target}`);

const resolved = computed(() => {
  const { base, hash } = parseTarget(props.target || '');
  if (!base) return { href: '', external: false };
  const anchor = hash ? `#${toSlug(hash)}` : '';

  if (isExternalTarget(base)) {
    return { href: `${base}${anchor}`, external: true };
  }

  const normalized = normalizeKey(base);
  const mapped = linkIndex[normalized];
  const internalPath = mapped || (base.startsWith('/') ? base.replace(/\.md$/i, '') : '');
  if (!internalPath) return { href: '', external: false };
  return { href: `${withBase(internalPath)}${anchor}`, external: false };
});

const resolvedHref = computed(() => resolved.value.href);
const isExternal = computed(() => resolved.value.external);
</script>
