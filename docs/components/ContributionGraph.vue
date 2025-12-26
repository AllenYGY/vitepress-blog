<template>
  <ClientOnly>
    <div class="vp-contrib">
      <div class="vp-contrib__header">
        <div class="vp-contrib__title">{{ title }}</div>
        <div class="vp-contrib__legend">
          <span>Less</span>
          <span
            v-for="level in legend"
            :key="level"
            class="vp-contrib__legend-cell"
            :data-level="level"
          ></span>
          <span>More</span>
        </div>
      </div>
      <div class="vp-contrib__chart" :style="{ '--vp-contrib-weeks': weeks.length }">
        <div class="vp-contrib__months">
          <span
            v-for="label in monthLabels"
            :key="label.key"
            class="vp-contrib__month"
            :style="{ gridColumn: label.column }"
          >
            {{ label.text }}
          </span>
        </div>
        <div class="vp-contrib__days">
          <span
            v-for="label in dayLabels"
            :key="label.text"
            class="vp-contrib__day"
            :style="{ gridRow: label.row }"
          >
            {{ label.text }}
          </span>
        </div>
        <div class="vp-contrib__grid" role="img" :aria-label="ariaLabel">
          <div class="vp-contrib__week" v-for="(week, wIdx) in weeks" :key="wIdx">
            <div
              v-for="day in week"
              :key="day.date"
              class="vp-contrib__cell"
              :title="day.title"
              :data-level="day.level"
              :class="{ 'is-empty': day.count === 0 }"
              :style="{ gridRow: day.row }"
              @click="selectDay(day)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selected" class="vp-contrib__panel" role="dialog" aria-live="polite">
      <div class="vp-contrib__panel-header">
        <div class="vp-contrib__panel-title">{{ selected.date }}</div>
        <button type="button" class="vp-contrib__close" @click="closePanel">Close</button>
      </div>
      <div v-if="selected.posts.length" class="vp-contrib__list">
        <a
          v-for="post in selected.posts"
          :key="post.url"
          class="vp-contrib__link"
          :href="withBase(post.url)"
        >
          {{ post.title }}
        </a>
      </div>
      <div v-else class="vp-contrib__empty">No notes for this day.</div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed, ref } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  counts: {
    type: Object,
    default: () => ({}),
  },
  postsByDate: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: "Contribution Graph",
  },
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
  maxWeeks: {
    type: Number,
    default: 52,
  },
});

const normalizeDate = (date) => {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return next;
};

const toIsoDate = (date) => date.toISOString().slice(0, 10);
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const resolvedRange = computed(() => {
  const today = normalizeDate(new Date());
  const end = props.endDate ? normalizeDate(new Date(props.endDate)) : today;
  const startCandidate = props.startDate
    ? normalizeDate(new Date(props.startDate))
    : new Date(end);
  if (!props.startDate) {
    startCandidate.setDate(startCandidate.getDate() - 364);
  }
  const start = normalizeDate(startCandidate);
  return { start, end };
});

const maxCount = computed(() => {
  const values = Object.values(props.counts || {}).map((value) => Number(value) || 0);
  return values.length ? Math.max(...values) : 0;
});

const legend = computed(() => {
  return [0, 1, 2, 3, 4];
});

const levelForCount = (count) => {
  if (!count || !maxCount.value) return 0;
  if (count >= maxCount.value) return 4;
  const ratio = count / maxCount.value;
  return Math.max(1, Math.ceil(ratio * 4));
};

const weeks = computed(() => {
  const { start, end } = resolvedRange.value;
  const days = [];
  const cursor = new Date(start);
  let dayIndex = 0;
  while (cursor <= end && dayIndex < 365) {
    const iso = toIsoDate(cursor);
    const count = Number(props.counts?.[iso]) || 0;
    const weekday = cursor.getDay();
    const row = weekday + 1;
    days.push({
      date: iso,
      count,
      level: levelForCount(count),
      weekday,
      row,
      title: `${iso} · ${count} note${count === 1 ? "" : "s"}`,
    });
    cursor.setDate(cursor.getDate() + 1);
    dayIndex += 1;
  }
  const grouped = [];
  let currentWeek = [];
  days.forEach((day) => {
    if (day.weekday === 0 && currentWeek.length) {
      grouped.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length) grouped.push(currentWeek);
  return grouped;
});

const monthLabels = computed(() => {
  const labels = [];
  const seen = new Set();
  weeks.value.forEach((week, index) => {
    week.forEach((day) => {
      if (!day) return;
      const date = new Date(day.date);
      if (date.getDate() !== 1) return;
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (seen.has(monthKey)) return;
      labels.push({
        key: `${monthKey}-${index}`,
        text: monthNames[date.getMonth()],
        column: index + 1,
      });
      seen.add(monthKey);
    });
  });
  return labels;
});

const dayLabels = [
  { text: "Mon", row: 2 },
  { text: "Wed", row: 4 },
  { text: "Fri", row: 6 },
];

const ariaLabel = computed(() => {
  const { start, end } = resolvedRange.value;
  return `Contribution graph from ${toIsoDate(start)} to ${toIsoDate(end)}`;
});

const selected = ref(null);

const selectDay = (day) => {
  if (!day.count) return;
  if (selected.value?.date === day.date) {
    selected.value = null;
    return;
  }
  const posts = Array.isArray(props.postsByDate?.[day.date])
    ? props.postsByDate[day.date]
    : [];
  selected.value = { date: day.date, posts };
};

const closePanel = () => {
  selected.value = null;
};
</script>
