<template>
  <div class="academic-home">
    <section id="about" class="academic-section academic-about">
      <div class="academic-section__heading">
        <p class="academic-section__eyebrow">About</p>
        <h2>Curious about intelligence,<br />from data to systems.</h2>
      </div>
      <div class="academic-about__body">
        <p class="academic-about__lead">
          I am a Computer Science student at Beijing Normal–Hong Kong Baptist University. My work
          sits at the intersection of machine learning, causal inference, and systems—especially
          when those ideas help explain complex networks or build more capable software.
        </p>
        <p>
          I learn in public. Alongside research prototypes, this website contains a growing archive
          of course notes, paper readings, derivations, experiments, and engineering projects. The
          goal is not merely to collect information, but to connect it into reusable understanding.
        </p>
        <div class="academic-about__principles">
          <div><span>01</span><strong>Understand deeply</strong><small>Derive ideas instead of memorizing them.</small></div>
          <div><span>02</span><strong>Build openly</strong><small>Turn concepts into reproducible code and notes.</small></div>
          <div><span>03</span><strong>Connect fields</strong><small>Look for shared structure across disciplines.</small></div>
        </div>
      </div>
    </section>

    <section id="research" class="academic-section">
      <div class="academic-section__heading academic-section__heading--row">
        <div>
          <p class="academic-section__eyebrow">Research interests</p>
          <h2>Questions I keep returning to.</h2>
        </div>
        <p class="academic-section__aside">An evolving set of directions reflected in my notes and repositories.</p>
      </div>
      <div class="research-grid">
        <article v-for="area in researchAreas" :key="area.title" class="research-card" :class="`research-card--${area.tone}`">
          <div class="research-card__number">{{ area.number }}</div>
          <div class="research-card__icon" v-html="area.icon"></div>
          <h3>{{ area.title }}</h3>
          <p>{{ area.description }}</p>
          <div class="research-card__tags"><span v-for="tag in area.tags" :key="tag">{{ tag }}</span></div>
          <a v-if="area.link" :href="withBase(area.link)">Explore related notes <span>↗</span></a>
        </article>
      </div>
    </section>

    <section id="projects" class="academic-section academic-projects">
      <div class="academic-section__heading academic-section__heading--row">
        <div>
          <p class="academic-section__eyebrow">Selected work</p>
          <h2>Projects built to test ideas.</h2>
        </div>
        <a class="academic-text-link" href="https://github.com/AllenYGY?tab=repositories" target="_blank" rel="noreferrer">All repositories <span>↗</span></a>
      </div>
      <div class="project-list">
        <article v-for="project in projects" :key="project.name" class="project-card">
          <div class="project-card__meta">
            <span>{{ project.type }}</span><span>{{ project.year }}</span>
          </div>
          <div class="project-card__main">
            <div>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <a :href="project.url" target="_blank" rel="noreferrer" :aria-label="`Open ${project.name} on GitHub`">↗</a>
          </div>
          <div class="project-card__stack"><span v-for="item in project.stack" :key="item">{{ item }}</span></div>
        </article>
      </div>
    </section>

    <section id="notes" class="academic-section">
      <div class="academic-section__heading academic-section__heading--row">
        <div>
          <p class="academic-section__eyebrow">Knowledge garden</p>
          <h2>Notes that compound over time.</h2>
        </div>
        <a class="academic-text-link" :href="withBase('/page/archive')">Browse the archive <span>→</span></a>
      </div>
      <div class="knowledge-grid">
        <a v-for="topic in knowledgeTopics" :key="topic.name" class="knowledge-card" :href="withBase(topic.link)">
          <span class="knowledge-card__index">{{ topic.number }}</span>
          <h3>{{ topic.name }}</h3>
          <p>{{ topic.description }}</p>
          <span class="knowledge-card__arrow">→</span>
        </a>
      </div>
    </section>

    <section class="academic-section academic-writing">
      <div class="academic-section__heading academic-section__heading--row">
        <div>
          <p class="academic-section__eyebrow">Latest writing</p>
          <h2>Recent notes and explorations.</h2>
        </div>
        <a class="academic-text-link" :href="withBase('/page/blog')">View all posts <span>→</span></a>
      </div>
      <div class="writing-layout">
        <div class="writing-list">
          <a v-for="(post, index) in latestPosts" :key="post.url" class="writing-item" :href="withBase(post.url)">
            <span class="writing-item__index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="writing-item__body">
              <time>{{ formatDate(post.frontmatter.date) }}</time>
              <h3>{{ post.frontmatter.title }}</h3>
              <div class="writing-item__tags"><span v-for="tag in (post.frontmatter.tags || []).slice(0, 3)" :key="tag">{{ tag }}</span></div>
            </div>
            <span class="writing-item__arrow">↗</span>
          </a>
        </div>
        <aside class="academic-activity">
          <div class="academic-activity__heading">
            <div><span>Writing activity</span><strong>{{ totalPosts }} notes published</strong></div>
            <span>{{ currentYear }}</span>
          </div>
          <ContributionGraph :counts="contributionCounts" :posts-by-date="contributionPosts" title="" />
        </aside>
      </div>
    </section>

    <section id="contact" class="academic-contact">
      <div class="academic-contact__copy">
        <p class="academic-section__eyebrow">Let’s connect</p>
        <h2>Interested in ideas,<br />research, or building?</h2>
        <p>I am always happy to exchange notes, discuss a project, or meet people working on thoughtful technology.</p>
      </div>
      <div class="academic-contact__actions">
        <a class="academic-button academic-button--light" href="https://github.com/AllenYGY" target="_blank" rel="noreferrer">Connect on GitHub <span>↗</span></a>
        <a class="academic-button academic-button--outline" :href="withBase('/page/blog')">Read my notes <span>→</span></a>
      </div>
      <div class="academic-contact__footer">
        <span>Junya Yang · 杨俊雅</span>
        <span>Zhuhai, China · UTC+8</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as posts } from '../page/blog-posts.data.js';
import { data as contributionData } from '../page/contribution-graph.data.js';
import ContributionGraph from './ContributionGraph.vue';

const currentYear = new Date().getFullYear();
const contributionCounts = contributionData?.counts || {};
const contributionPosts = contributionData?.postsByDate || {};
const latestPosts = computed(() => posts.slice(0, 5));
const totalPosts = computed(() => posts.length);

const researchAreas = [
  {
    number: '01', tone: 'blue', title: 'Causal Learning & Emergence',
    description: 'Understanding causal structure, effective information, and how higher-level organization emerges from complex systems.',
    tags: ['Causal inference', 'Effective information', 'Complex systems'],
    link: '/posts/Causality/Causal-EI for Markov Chain Derivation',
    icon: '<svg viewBox="0 0 48 48" fill="none"><circle cx="12" cy="24" r="5"/><circle cx="36" cy="12" r="5"/><circle cx="36" cy="36" r="5"/><path d="M17 22l14-7M17 26l14 7M36 17v14"/></svg>',
  },
  {
    number: '02', tone: 'green', title: 'Machine Learning & Reasoning',
    description: 'Studying probabilistic models, representation learning, and reliable reasoning methods for intelligent systems.',
    tags: ['Bayesian networks', 'Deep learning', 'LLM reasoning'],
    link: '/posts/Machine Learning/Machine Learning Overview',
    icon: '<svg viewBox="0 0 48 48" fill="none"><rect x="9" y="9" width="30" height="30" rx="7"/><path d="M17 20h14M17 28h8M24 5v4M24 39v4M5 24h4M39 24h4"/></svg>',
  },
  {
    number: '03', tone: 'amber', title: 'Computational Biology',
    description: 'Applying network thinking and data-driven methods to biological systems and cell-specific relationships.',
    tags: ['Network reconstruction', 'Bioinformatics', 'Single-cell data'],
    link: '/posts/Network-Deconvolution',
    icon: '<svg viewBox="0 0 48 48" fill="none"><path d="M16 8c12 7 4 25 16 32M32 8c-12 7-4 25-16 32M14 14h20M12 24h24M14 34h20"/></svg>',
  },
  {
    number: '04', tone: 'violet', title: 'Systems & Developer Tools',
    description: 'Building software that makes knowledge work, automation, and everyday computing more fluid and useful.',
    tags: ['Operating systems', 'AI agents', 'Developer experience'],
    link: '/posts/Operating System/Lecture/01-Operating System Introduction',
    icon: '<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="9" width="34" height="26" rx="4"/><path d="M14 18l6 5-6 5M24 28h10M18 40h12"/></svg>',
  },
];

const projects = [
  {
    name: 'CSCN Demo', type: 'Research prototype', year: '2026',
    description: 'A Python implementation and demonstration environment for exploring cell-specific causal network reconstruction.',
    stack: ['Python', 'Causal networks', 'Bioinformatics'], url: 'https://github.com/AllenYGY/CSCN-Demo',
  },
  {
    name: 'GAgent', type: 'AI engineering', year: '2025–2026',
    description: 'Experiments in building an extensible agent system, with an emphasis on planning, tools, and practical workflows.',
    stack: ['Python', 'AI agents', 'Tool use'], url: 'https://github.com/AllenYGY/GAgent',
  },
  {
    name: 'Overshelf', type: 'macOS application', year: '2026',
    description: 'A native macOS top-edge drawer that keeps frequently used items immediately within reach.',
    stack: ['macOS', 'Productivity', 'Native app'], url: 'https://github.com/AllenYGY/overshelf',
  },
  {
    name: 'Compiler Project', type: 'Systems project', year: '2024',
    description: 'A course compiler implementation that turns language theory into a working parsing and translation pipeline.',
    stack: ['Python', 'Compiler design', 'Parsing'], url: 'https://github.com/AllenYGY/COMP3173-Compiler-Project',
  },
];

const knowledgeTopics = [
  { number: '01', name: 'Causality', description: 'Causal structure, emergence, information, and graphical models.', link: '/posts/Causality/Causal-EI for Markov Chain Derivation' },
  { number: '02', name: 'Machine Learning', description: 'Statistical learning, Bayesian methods, models, and evaluation.', link: '/posts/Machine Learning/Machine Learning Overview' },
  { number: '03', name: 'Computer Vision', description: 'Image formation, filtering, neural networks, and detection.', link: '/posts/Computer Vision/Computer Vision Overview' },
  { number: '04', name: 'Systems', description: 'Operating systems, networks, compilers, and computer architecture.', link: '/posts/Operating System/Lecture/01-Operating System Introduction' },
  { number: '05', name: 'Algorithms', description: 'Data structures, graph methods, strings, and problem solving.', link: '/posts/Algorithm/Algorithm' },
  { number: '06', name: 'Developer Tools', description: 'Git, containers, shells, environments, and practical workflows.', link: '/posts/Tools/Git/Git-For-Beginners' },
];

const formatDate = (value) => {
  if (!value) return 'Undated';
  const raw = typeof value === 'string' ? value : String(value);
  const match = raw.match(/\d{4}-\d{2}-\d{2}/);
  return match?.[0] || raw;
};
</script>
