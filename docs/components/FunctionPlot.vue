<template>
  <ClientOnly>
    <div class="vp-functionplot">
      <div v-if="error" class="vp-functionplot__error">{{ error }}</div>
      <div
        v-else
        :id="elementId"
        ref="container"
        class="vp-functionplot__canvas"
        role="img"
        aria-label="Function plot"
      ></div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const container = ref(null);
const error = ref("");
const elementId = `function-plot-${Math.random().toString(36).slice(2, 10)}`;

const renderPlot = async () => {
  error.value = "";
  if (typeof window === "undefined" || !container.value) return;

  let options;
  try {
    options = JSON.parse(props.code);
    if (typeof options !== "object" || Array.isArray(options) || options === null) {
      throw new Error("Options must be a JSON object.");
    }
  } catch (err) {
    error.value = `Invalid functionplot config: ${err instanceof Error ? err.message : String(err)}`;
    container.value.innerHTML = "";
    return;
  }

  try {
    const mod = await import("function-plot");
    const fnPlot = mod.default || mod;
    container.value.innerHTML = "";
    fnPlot({
      target: `#${elementId}`,
      width: container.value.clientWidth || undefined,
      height: options.height,
      ...options,
    });
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to render function plot.";
  }
};

onMounted(() => {
  renderPlot();
});

watch(
  () => props.code,
  () => {
    renderPlot();
  }
);

onBeforeUnmount(() => {
  if (container.value) {
    container.value.innerHTML = "";
  }
});
</script>
