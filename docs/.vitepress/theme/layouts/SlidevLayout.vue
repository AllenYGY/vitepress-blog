<template>
  <div class="slidev-layout">
    <div v-if="slidevSrc" class="slidev-layout__frame">
      <iframe
        class="slidev-layout__iframe"
        :src="slidevSrc"
        title="Slidev Deck"
        frameborder="0"
        allow="fullscreen"
        allowfullscreen
      />
    </div>
    <div v-else class="slidev-layout__missing">
      <p>Slidev deck not configured.</p>
      <p>Add <code>slidev: true</code> or a deck path to the page frontmatter.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter, page } = useData()

const defaultFullscreen = computed(() => {
  const raw =
    frontmatter.value.slidevFullscreen ??
    frontmatter.value.slidevFull ??
    frontmatter.value.slidevMode

  if (!raw) return false
  if (typeof raw === 'string') {
    return raw.toLowerCase() === 'true' || raw.toLowerCase() === 'full'
  }
  return Boolean(raw)
})

const fullscreenHotkey = computed(() => {
  const raw =
    frontmatter.value.slidevFullscreenHotkey ??
    frontmatter.value.slidevHotkey ??
    ''

  return String(raw || '').trim()
})

const isFullscreen = ref(false)

const slidevSrc = computed(() => {
  const raw =
    frontmatter.value.slidev ??
    frontmatter.value.slidevPath ??
    frontmatter.value.slidevSrc

  if (!raw) return ''

  let src = ''

  if (raw === true || String(raw).toLowerCase() === 'true') {
    const relativePath = page.value?.relativePath || ''
    if (!relativePath) return ''
    src = `/slides/${relativePath.replace(/\.md$/, '')}`
  } else {
    src = String(raw).trim()
  }

  if (!src) return ''

  if (/^https?:\/\//i.test(src)) {
    return src
  }

  if (!src.startsWith('/')) {
    src = `/slides/${src}`
  }

  if (!src.endsWith('.html')) {
    src = src.replace(/\/?$/, '/index.html')
  }

  return withBase(src)
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.classList.toggle('slidev-fullscreen', isFullscreen.value)
})

watch(
  defaultFullscreen,
  (value) => {
    isFullscreen.value = value
  },
  { immediate: true }
)

const onKeydown = (event) => {
  const hotkey = fullscreenHotkey.value
  if (!hotkey) return
  if (!event || event.defaultPrevented) return

  const target = event.target
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
    return
  }

  const normalized = hotkey.toLowerCase()
  const parts = normalized.split('+').map((part) => part.trim()).filter(Boolean)
  if (!parts.length) return

  const key = parts[parts.length - 1]
  const expects = {
    alt: parts.includes('alt'),
    ctrl: parts.includes('ctrl') || parts.includes('control'),
    shift: parts.includes('shift'),
    meta: parts.includes('meta') || parts.includes('cmd') || parts.includes('command'),
  }

  const keyMatches = event.key.toLowerCase() === key
  const modifiersMatch =
    event.altKey === expects.alt &&
    event.ctrlKey === expects.ctrl &&
    event.shiftKey === expects.shift &&
    event.metaKey === expects.meta

  if (!keyMatches || !modifiersMatch) return

  event.preventDefault()
  isFullscreen.value = !isFullscreen.value
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.body.classList.remove('slidev-fullscreen')
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>
