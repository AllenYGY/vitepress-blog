// docs/.vitepress/config.ts
import { genFeed } from "file:///Users/allenygy/vitepress-blog/node_modules/vitepress-theme-open17/src/genFeed.mjs";
import { defineConfigWithTheme } from "file:///Users/allenygy/vitepress-blog/node_modules/vitepress/dist/node/index.js";
import { generateSidebar } from "file:///Users/allenygy/vitepress-blog/node_modules/vitepress-sidebar/dist/index.js";
import { withMermaid } from "file:///Users/allenygy/vitepress-blog/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";
import pseudocode from "file:///Users/allenygy/vitepress-blog/node_modules/pseudocode/pseudocode.js";

// docs/.vitepress/markdown/wikiLink.ts
import path from "node:path";
import { unified } from "file:///Users/allenygy/vitepress-blog/node_modules/unified-legacy/index.js";
import remarkParse from "file:///Users/allenygy/vitepress-blog/node_modules/remark-parse-legacy/index.js";
import remarkRehype from "file:///Users/allenygy/vitepress-blog/node_modules/remark-rehype-legacy/index.js";
import rehypeStringify from "file:///Users/allenygy/vitepress-blog/node_modules/rehype-stringify-legacy/index.js";
import remarkWikiLink, { getPermalinks } from "file:///Users/allenygy/vitepress-blog/node_modules/@portaljs/remark-wiki-link/dist/index.js";

// docs/.vitepress/wiki-link.config.js
var isExternalHref = (value) => /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value);
var normalizeWikiHref = (value) => {
  if (!value) return value;
  const trimmed = String(value).trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../") || trimmed.startsWith("#") || isExternalHref(trimmed)) {
    return trimmed;
  }
  return `./${trimmed}`;
};
var wikiLinkOptions = {
  pathFormat: "obsidian-short",
  aliasDivider: "|",
  wikiLinkClassName: "internal",
  newClassName: "new",
  hrefTemplate: normalizeWikiHref
};
var pathToPermalink = (filePath, markdownFolder) => {
  if (!/\.mdx?$/i.test(filePath)) return null;
  const permalink = filePath.replace(markdownFolder, "").replace(/\.(mdx|md)/i, "").replace(/\\/g, "/").replace(/\/index$/i, "");
  return permalink.length > 0 ? permalink : "/";
};
var wiki_link_config_default = wikiLinkOptions;

// docs/.vitepress/markdown/wikiLink.ts
var WIKI_LINK_RE = /^!?\[\[[^\]]+\]\]/;
var contentRoot = path.resolve(process.cwd(), "docs");
var basePermalinks = getPermalinks(contentRoot, [], pathToPermalink).filter(Boolean);
var processorCache = /* @__PURE__ */ new Map();
var permalinksCache = /* @__PURE__ */ new Map();
var getDirPrefix = (relativePath) => {
  if (!relativePath) return "";
  const parts = relativePath.replace(/\\/g, "/").split("/");
  parts.pop();
  return `/${parts.join("/")}`.replace(/\/+$/, "");
};
var orderPermalinks = (relativePath) => {
  const cacheKey = relativePath || "";
  const cached = permalinksCache.get(cacheKey);
  if (cached) return cached;
  const dirPrefix = getDirPrefix(relativePath);
  if (!dirPrefix) {
    permalinksCache.set(cacheKey, basePermalinks);
    return basePermalinks;
  }
  const local = [];
  const rest = [];
  basePermalinks.forEach((permalink) => {
    const isSameDir = permalink === dirPrefix || path.posix.dirname(permalink) === dirPrefix;
    if (isSameDir) {
      local.push(permalink);
    } else {
      rest.push(permalink);
    }
  });
  const ordered = [...local, ...rest];
  permalinksCache.set(cacheKey, ordered);
  return ordered;
};
var getProcessor = (relativePath) => {
  const key = relativePath || "";
  const cached = processorCache.get(key);
  if (cached) return cached;
  const processor = unified().use(remarkParse).use(remarkWikiLink, {
    ...wiki_link_config_default,
    permalinks: orderPermalinks(relativePath)
  }).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeStringify, { allowDangerousHtml: true });
  processorCache.set(key, processor);
  return processor;
};
var renderWikiLink = (raw, relativePath) => {
  const processor = getProcessor(relativePath);
  const html = String(processor.processSync(raw));
  const trimmed = html.trim();
  const stripped = trimmed.match(/^<p>(.*)<\/p>$/s);
  return stripped ? stripped[1] : trimmed;
};
var wikiLinkPlugin = (md) => {
  md.inline.ruler.before("link", "wiki-link", (state, silent) => {
    const pos = state.pos;
    const src = state.src;
    if (src.charCodeAt(pos) !== 91 && src.charCodeAt(pos) !== 33) return false;
    const match = src.slice(pos).match(WIKI_LINK_RE);
    if (!match) return false;
    if (!silent) {
      const envPath = typeof state.env?.relativePath === "string" ? state.env.relativePath : "";
      const html = renderWikiLink(match[0], envPath);
      const token = state.push("html_inline", "", 0);
      token.content = html;
    }
    state.pos += match[0].length;
    return true;
  });
};
var wikiLink_default = wikiLinkPlugin;

// docs/.vitepress/config.ts
var vitepressSidebarOptions = [
  {
    documentRootPath: "docs",
    scanStartPath: "guide",
    resolvePath: "/guide/",
    collapsed: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    excludeFilesByFrontmatter: true,
    rootGroupCollapsed: true
  },
  {
    documentRootPath: "docs",
    scanStartPath: "posts",
    resolvePath: "/posts/",
    collapsed: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    excludeFilesByFrontmatter: true,
    rootGroupCollapsed: true
  }
];
var config_default = defineConfigWithTheme(withMermaid({
  outDir: "../public",
  title: "AllenYGY's Blog",
  lang: "zh-CN",
  description: "Record AllenYGY's daily studies",
  transformPageData(pageData) {
    const frontmatter = pageData.frontmatter || {};
    const slidevEnabled = frontmatter.slidev === true || String(frontmatter.slidev).toLowerCase() === "true";
    if (!slidevEnabled) {
      return;
    }
    return {
      frontmatter: {
        ...frontmatter,
        layout: "SlidevLayout"
      }
    };
  },
  markdown: {
    // config: MermaidMarkdown,
    // config:(md)=>{ md.use(mermaidItMarkdown) },
    math: true,
    shikiConfig: {
      langAlias: {
        pseudo: "txt",
        pseudocode: "txt",
        "function-plot": "json",
        functionplot: "json"
      }
    },
    config: (md) => {
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((tokens, idx, options, env, slf) => slf.renderToken(tokens, idx, options));
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const info = token.info ? token.info.trim().toLowerCase() : "";
        const isPseudo = info === "pseudo" || info === "pseudocode" || info.startsWith("pseudo ");
        const isFunctionPlot = info === "functionplot" || info === "function-plot" || info.startsWith("functionplot ");
        if (!isPseudo) {
          if (isFunctionPlot) {
            const content = md.utils.escapeHtml(token.content);
            return `<FunctionPlot code="${content}" />`;
          }
          return defaultFence(tokens, idx, options, env, slf);
        }
        try {
          const html = pseudocode.renderToString(token.content, {
            lineNumber: true,
            captionCount: true
          });
          return `<div class="vp-pseudocode">${html}</div>`;
        } catch (_error) {
          return defaultFence(tokens, idx, options, env, slf);
        }
      };
      md.use(wikiLink_default);
    }
  },
  sitemap: {
    hostname: "https://vitepress.open17.vip"
  },
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0a05ed98f94a5486639ae0f97c7b6fff";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `
    ],
    ["meta", { name: "keywords", content: "vitepress, theme, blog, AllenYGY" }]
  ],
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions),
    search: {
      provider: "local"
      // options: {
      //   _render(src, env, md) {
      //     const html = md.render(src, env);
      //     if (env.frontmatter?.title)
      //       return md.render(`# ${env.frontmatter.title}`) + html;
      //     return html;
      //   },
      // },
    },
    editLink: {
      pattern: "https://github.com/open17/vitepress-theme-open17/edit/master/docs/:path",
      text: "Help me polish the article"
    },
    feed: {
      baseUrl: "https://blog.allenygy.vip",
      copyright: "Copyright \xA9 2023-present open17",
      image: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071726176.png"
    },
    blog: {
      tagPageLink: "/page/tags",
      bgImage: {
        dark: "https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/patrick-schneider-PLrscRq3atA.jpg",
        light: "https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/Light.png"
      },
      direct: "lft",
      user: {
        name: "AllenYGY",
        avatar: "https://avatars.githubusercontent.com/u/121916671?v=4",
        describe: "AllenYGY's daily study and life"
      },
      usingTitleFromFrontmatter: false
    },
    home: {
      maxTagsDisplayed: 20,
      postsPerPage: 5
    },
    comment: {
      use: true,
      repo: "AllenYGY/vitepress-blog",
      repoId: "R_kgDONRutyA",
      category: "General",
      categoryId: "DIC_kwDONRutyM4Clpxw",
      mapping: "pathname",
      strict: "0",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      lang: "en"
    },
    logo: {
      dark: "/logo.png",
      light: "/logo_light.png"
    },
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/page/blog" },
      { text: "Tags", link: "/page/tags" },
      { text: "Archive", link: "/page/archive" },
      { text: "Friends", link: "/page/friend" },
      // { text: "Guide", link: "/guide/0-intro/" },
      {
        text: "Note",
        items: [
          { text: "Database Management System", link: "/posts/Database Management System/RDBMS/01-Entity-Relationship-Model-Modeling/" },
          { text: "Compiler Construction", link: "/posts/Compiler Construction/Lecture/01-Compiler Introduction/" },
          { text: "Computer Graphics", link: "/posts/Computer Graphics/Lecture/02-CG-Transformation/" },
          { text: "Computer Organization", link: "/posts/Computer Organization/Lecture/01-What is a Computer/" },
          { text: "Computer Network", link: "/posts/Computer Network/Lecture/01-Basic Concepts/" },
          { text: "Functional Programming", link: "/posts/Functional Programming/Lecture/01-FP-Basics/" },
          { text: "Operating System", link: "/posts/Operating System/Lecture/01-Operating System Introduction/" },
          { text: "Theory Of Computation", link: "/posts/Theory Of Computation/Lecture/01-TOC-Intro/" }
        ]
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/AllenYGY/"
      }
    ]
  },
  buildEnd: genFeed
}));
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyIsICJkb2NzLy52aXRlcHJlc3MvbWFya2Rvd24vd2lraUxpbmsudHMiLCAiZG9jcy8udml0ZXByZXNzL3dpa2ktbGluay5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxsZW55Z3kvdml0ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWxsZW55Z3kvdml0ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxsZW55Z3kvdml0ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB0eXBlIHsgVGhlbWVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzLXRoZW1lLW9wZW4xNy9jb25maWdcIjtcbmltcG9ydCB7IGdlbkZlZWQgfSBmcm9tIFwidml0ZXByZXNzLXRoZW1lLW9wZW4xNy9nZW5GZWVkXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWdXaXRoVGhlbWUgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZGViYXIgfSBmcm9tIFwidml0ZXByZXNzLXNpZGViYXJcIjtcbmltcG9ydCB7IHdpdGhNZXJtYWlkIH0gZnJvbSBcInZpdGVwcmVzcy1wbHVnaW4tbWVybWFpZFwiO1xuaW1wb3J0IHBzZXVkb2NvZGUgZnJvbSBcInBzZXVkb2NvZGVcIjtcbmltcG9ydCB3aWtpTGlua1BsdWdpbiBmcm9tIFwiLi9tYXJrZG93bi93aWtpTGlua1wiO1xuXG5cbmNvbnN0IHZpdGVwcmVzc1NpZGViYXJPcHRpb25zID0gW1xuICB7XG4gICAgZG9jdW1lbnRSb290UGF0aDogXCJkb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJndWlkZVwiLFxuICAgIHJlc29sdmVQYXRoOiBcIi9ndWlkZS9cIixcbiAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXG4gICAgdXNlRm9sZGVyVGl0bGVGcm9tSW5kZXhGaWxlOiB0cnVlLFxuICAgIHVzZUZvbGRlckxpbmtGcm9tSW5kZXhGaWxlOiB0cnVlLFxuICAgIGV4Y2x1ZGVGaWxlc0J5RnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgcm9vdEdyb3VwQ29sbGFwc2VkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgZG9jdW1lbnRSb290UGF0aDogXCJkb2NzXCIsXG4gICAgc2NhblN0YXJ0UGF0aDogXCJwb3N0c1wiLFxuICAgIHJlc29sdmVQYXRoOiBcIi9wb3N0cy9cIixcbiAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXG4gICAgdXNlRm9sZGVyVGl0bGVGcm9tSW5kZXhGaWxlOiB0cnVlLFxuICAgIHVzZUZvbGRlckxpbmtGcm9tSW5kZXhGaWxlOiB0cnVlLFxuICAgIGV4Y2x1ZGVGaWxlc0J5RnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgcm9vdEdyb3VwQ29sbGFwc2VkOiB0cnVlLFxuICB9LFxuXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWdXaXRoVGhlbWU8VGhlbWVDb25maWc+KHdpdGhNZXJtYWlkKHtcbiAgb3V0RGlyOiAnLi4vcHVibGljJyxcbiAgdGl0bGU6IFwiQWxsZW5ZR1kncyBCbG9nXCIsXG4gIGxhbmc6IFwiemgtQ05cIixcbiAgZGVzY3JpcHRpb246IFwiUmVjb3JkIEFsbGVuWUdZJ3MgZGFpbHkgc3R1ZGllc1wiLFxuICB0cmFuc2Zvcm1QYWdlRGF0YShwYWdlRGF0YSkge1xuICAgIGNvbnN0IGZyb250bWF0dGVyID0gcGFnZURhdGEuZnJvbnRtYXR0ZXIgfHwge307XG4gICAgY29uc3Qgc2xpZGV2RW5hYmxlZCA9XG4gICAgICBmcm9udG1hdHRlci5zbGlkZXYgPT09IHRydWUgfHxcbiAgICAgIFN0cmluZyhmcm9udG1hdHRlci5zbGlkZXYpLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiO1xuXG4gICAgaWYgKCFzbGlkZXZFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZyb250bWF0dGVyOiB7XG4gICAgICAgIC4uLmZyb250bWF0dGVyLFxuICAgICAgICBsYXlvdXQ6IFwiU2xpZGV2TGF5b3V0XCIsXG4gICAgICB9LFxuICAgIH07XG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgLy8gY29uZmlnOiBNZXJtYWlkTWFya2Rvd24sXG4gICAgLy8gY29uZmlnOihtZCk9PnsgbWQudXNlKG1lcm1haWRJdE1hcmtkb3duKSB9LFxuICAgIG1hdGg6IHRydWUsXG4gICAgc2hpa2lDb25maWc6IHtcbiAgICAgIGxhbmdBbGlhczoge1xuICAgICAgICBwc2V1ZG86IFwidHh0XCIsXG4gICAgICAgIHBzZXVkb2NvZGU6IFwidHh0XCIsXG4gICAgICAgIFwiZnVuY3Rpb24tcGxvdFwiOiBcImpzb25cIixcbiAgICAgICAgZnVuY3Rpb25wbG90OiBcImpzb25cIixcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdEZlbmNlID1cbiAgICAgICAgbWQucmVuZGVyZXIucnVsZXMuZmVuY2U/LmJpbmQobWQucmVuZGVyZXIucnVsZXMpID8/XG4gICAgICAgICgodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSA9PlxuICAgICAgICAgIHNsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucykpO1xuXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaWR4XTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHRva2VuLmluZm8gPyB0b2tlbi5pbmZvLnRyaW0oKS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcbiAgICAgICAgY29uc3QgaXNQc2V1ZG8gPVxuICAgICAgICAgIGluZm8gPT09IFwicHNldWRvXCIgfHxcbiAgICAgICAgICBpbmZvID09PSBcInBzZXVkb2NvZGVcIiB8fFxuICAgICAgICAgIGluZm8uc3RhcnRzV2l0aChcInBzZXVkbyBcIik7XG4gICAgICAgIGNvbnN0IGlzRnVuY3Rpb25QbG90ID1cbiAgICAgICAgICBpbmZvID09PSBcImZ1bmN0aW9ucGxvdFwiIHx8XG4gICAgICAgICAgaW5mbyA9PT0gXCJmdW5jdGlvbi1wbG90XCIgfHxcbiAgICAgICAgICBpbmZvLnN0YXJ0c1dpdGgoXCJmdW5jdGlvbnBsb3QgXCIpO1xuXG4gICAgICAgIGlmICghaXNQc2V1ZG8pIHtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvblBsb3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBtZC51dGlscy5lc2NhcGVIdG1sKHRva2VuLmNvbnRlbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGA8RnVuY3Rpb25QbG90IGNvZGU9XCIke2NvbnRlbnR9XCIgLz5gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVmYXVsdEZlbmNlKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGh0bWwgPSBwc2V1ZG9jb2RlLnJlbmRlclRvU3RyaW5nKHRva2VuLmNvbnRlbnQsIHtcbiAgICAgICAgICAgIGxpbmVOdW1iZXI6IHRydWUsXG4gICAgICAgICAgICBjYXB0aW9uQ291bnQ6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwidnAtcHNldWRvY29kZVwiPiR7aHRtbH08L2Rpdj5gO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdEZlbmNlKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIG1kLnVzZSh3aWtpTGlua1BsdWdpbik7XG4gICAgfSxcbiAgfSxcbiAgc2l0ZW1hcDoge1xuICAgIGhvc3RuYW1lOiBcImh0dHBzOi8vdml0ZXByZXNzLm9wZW4xNy52aXBcIixcbiAgfSxcbiAgaGVhZDogW1xuICAgIFtcImxpbmtcIiwgeyByZWw6IFwiaWNvblwiLCBocmVmOiBcIi9sb2dvLnBuZ1wiIH1dLFxuICAgIFtcbiAgICAgIFwic2NyaXB0XCIsXG4gICAgICB7fSxcbiAgICAgIGBcbiAgICAgIHZhciBfaG10ID0gX2htdCB8fCBbXTtcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgaG0uc3JjID0gXCJodHRwczovL2htLmJhaWR1LmNvbS9obS5qcz8wYTA1ZWQ5OGY5NGE1NDg2NjM5YWUwZjk3YzdiNmZmZlwiO1xuICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdOyBcbiAgICAgICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShobSwgcyk7XG4gICAgICB9KSgpO1xuICAgIGAsXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJrZXl3b3Jkc1wiLCBjb250ZW50OiBcInZpdGVwcmVzcywgdGhlbWUsIGJsb2csIEFsbGVuWUdZXCIgfV0sXG4gIF0sXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgc2lkZWJhcjogZ2VuZXJhdGVTaWRlYmFyKHZpdGVwcmVzc1NpZGViYXJPcHRpb25zKSxcbiAgICBzZWFyY2g6IHtcbiAgICAgIHByb3ZpZGVyOiBcImxvY2FsXCIsXG4gICAgICAvLyBvcHRpb25zOiB7XG4gICAgICAvLyAgIF9yZW5kZXIoc3JjLCBlbnYsIG1kKSB7XG4gICAgICAvLyAgICAgY29uc3QgaHRtbCA9IG1kLnJlbmRlcihzcmMsIGVudik7XG4gICAgICAvLyAgICAgaWYgKGVudi5mcm9udG1hdHRlcj8udGl0bGUpXG4gICAgICAvLyAgICAgICByZXR1cm4gbWQucmVuZGVyKGAjICR7ZW52LmZyb250bWF0dGVyLnRpdGxlfWApICsgaHRtbDtcbiAgICAgIC8vICAgICByZXR1cm4gaHRtbDtcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgfSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgXCJodHRwczovL2dpdGh1Yi5jb20vb3BlbjE3L3ZpdGVwcmVzcy10aGVtZS1vcGVuMTcvZWRpdC9tYXN0ZXIvZG9jcy86cGF0aFwiLFxuICAgICAgdGV4dDogXCJIZWxwIG1lIHBvbGlzaCB0aGUgYXJ0aWNsZVwiXG4gICAgfSxcbiAgICBmZWVkOiB7XG4gICAgICBiYXNlVXJsOiBcImh0dHBzOi8vYmxvZy5hbGxlbnlneS52aXBcIixcbiAgICAgIGNvcHlyaWdodDogXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjMtcHJlc2VudCBvcGVuMTdcIixcbiAgICAgIGltYWdlOiBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9vcGVuMTcvUGljL2ltZy8yMDI0MDUwNzE3MjYxNzYucG5nXCIsXG4gICAgfSxcbiAgICBibG9nOiB7XG4gICAgICB0YWdQYWdlTGluazogXCIvcGFnZS90YWdzXCIsXG4gICAgICBiZ0ltYWdlOiB7IGRhcms6IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL0FMTEVOWUdZL0ltYWdlU3BhY2VAbWFzdGVyL0lNQUdFL3BhdHJpY2stc2NobmVpZGVyLVBMcnNjUnEzYXRBLmpwZ1wiICxcbiAgICAgICAgbGlnaHQ6XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvQWxsZW5ZR1kvSW1hZ2VTcGFjZUBtYWluL3VQaWMvTGlnaHQucG5nXCJ9LFxuICAgICAgZGlyZWN0OiBcImxmdFwiLFxuICAgICAgdXNlcjoge1xuICAgICAgICBuYW1lOiBcIkFsbGVuWUdZXCIsXG4gICAgICAgIGF2YXRhcjogXCJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTIxOTE2NjcxP3Y9NFwiLFxuICAgICAgICBkZXNjcmliZTogXCJBbGxlbllHWSdzIGRhaWx5IHN0dWR5IGFuZCBsaWZlXCIsXG4gICAgICB9LFxuICAgICAgdXNpbmdUaXRsZUZyb21Gcm9udG1hdHRlcjogZmFsc2UsXG4gICAgfSxcbiAgICBob21lOiB7XG4gICAgICBtYXhUYWdzRGlzcGxheWVkOiAyMCxcbiAgICAgIHBvc3RzUGVyUGFnZTogNSxcbiAgICB9LFxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHVzZTogdHJ1ZSxcbiAgICAgIHJlcG86IFwiQWxsZW5ZR1kvdml0ZXByZXNzLWJsb2dcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9OUnV0eUFcIixcbiAgICAgIGNhdGVnb3J5OiBcIkdlbmVyYWxcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9OUnV0eU00Q2xweHdcIixcbiAgICAgIG1hcHBpbmc6IFwicGF0aG5hbWVcIixcbiAgICAgIHN0cmljdDogXCIwXCIsXG4gICAgICByZWFjdGlvbnNFbmFibGVkOiBcIjFcIixcbiAgICAgIGVtaXRNZXRhZGF0YTogXCIwXCIsXG4gICAgICBpbnB1dFBvc2l0aW9uOiBcInRvcFwiLFxuICAgICAgbGFuZzogXCJlblwiLFxuICAgIH0sXG4gICAgbG9nbzoge1xuICAgICAgZGFyazogXCIvbG9nby5wbmdcIixcbiAgICAgIGxpZ2h0OiBcIi9sb2dvX2xpZ2h0LnBuZ1wiLFxuICAgIH0sXG4gICAgbGFzdFVwZGF0ZWQ6IHtcbiAgICAgIHRleHQ6IFwiVXBkYXRlZCBhdFwiLFxuICAgICAgZm9ybWF0T3B0aW9uczoge1xuICAgICAgICBkYXRlU3R5bGU6IFwiZnVsbFwiLFxuICAgICAgICB0aW1lU3R5bGU6IFwibWVkaXVtXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6IFwiSG9tZVwiLCBsaW5rOiBcIi9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIkJsb2dcIiwgbGluazogXCIvcGFnZS9ibG9nXCIgfSxcbiAgICAgIHsgdGV4dDogXCJUYWdzXCIsIGxpbms6IFwiL3BhZ2UvdGFnc1wiIH0sXG4gICAgICB7IHRleHQ6IFwiQXJjaGl2ZVwiLCBsaW5rOiBcIi9wYWdlL2FyY2hpdmVcIiB9LFxuICAgICAgeyB0ZXh0OiBcIkZyaWVuZHNcIiwgbGluazogXCIvcGFnZS9mcmllbmRcIiB9LFxuICAgICAgLy8geyB0ZXh0OiBcIkd1aWRlXCIsIGxpbms6IFwiL2d1aWRlLzAtaW50cm8vXCIgfSxcbiAgICAgIHsgdGV4dDogXCJOb3RlXCIsIFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogXCJEYXRhYmFzZSBNYW5hZ2VtZW50IFN5c3RlbVwiLCBsaW5rOiBcIi9wb3N0cy9EYXRhYmFzZSBNYW5hZ2VtZW50IFN5c3RlbS9SREJNUy8wMS1FbnRpdHktUmVsYXRpb25zaGlwLU1vZGVsLU1vZGVsaW5nL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkNvbXBpbGVyIENvbnN0cnVjdGlvblwiLCBsaW5rOiBcIi9wb3N0cy9Db21waWxlciBDb25zdHJ1Y3Rpb24vTGVjdHVyZS8wMS1Db21waWxlciBJbnRyb2R1Y3Rpb24vXCIgfSxcbiAgICAgICAgICB7IHRleHQ6IFwiQ29tcHV0ZXIgR3JhcGhpY3NcIiwgbGluazogXCIvcG9zdHMvQ29tcHV0ZXIgR3JhcGhpY3MvTGVjdHVyZS8wMi1DRy1UcmFuc2Zvcm1hdGlvbi9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJDb21wdXRlciBPcmdhbml6YXRpb25cIiwgbGluazogXCIvcG9zdHMvQ29tcHV0ZXIgT3JnYW5pemF0aW9uL0xlY3R1cmUvMDEtV2hhdCBpcyBhIENvbXB1dGVyL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkNvbXB1dGVyIE5ldHdvcmtcIiwgbGluazogXCIvcG9zdHMvQ29tcHV0ZXIgTmV0d29yay9MZWN0dXJlLzAxLUJhc2ljIENvbmNlcHRzL1wiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIkZ1bmN0aW9uYWwgUHJvZ3JhbW1pbmdcIiwgbGluazogXCIvcG9zdHMvRnVuY3Rpb25hbCBQcm9ncmFtbWluZy9MZWN0dXJlLzAxLUZQLUJhc2ljcy9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJPcGVyYXRpbmcgU3lzdGVtXCIsIGxpbms6IFwiL3Bvc3RzL09wZXJhdGluZyBTeXN0ZW0vTGVjdHVyZS8wMS1PcGVyYXRpbmcgU3lzdGVtIEludHJvZHVjdGlvbi9cIiB9LFxuICAgICAgICAgIHsgdGV4dDogXCJUaGVvcnkgT2YgQ29tcHV0YXRpb25cIiwgbGluazogXCIvcG9zdHMvVGhlb3J5IE9mIENvbXB1dGF0aW9uL0xlY3R1cmUvMDEtVE9DLUludHJvL1wiIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgXSxcbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAge1xuICAgICAgICBpY29uOiBcImdpdGh1YlwiLFxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9BbGxlbllHWS9cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgYnVpbGRFbmQ6IGdlbkZlZWQsXG59KSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbGxlbnlneS92aXRlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvbWFya2Rvd25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGxlbnlneS92aXRlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3MvbWFya2Rvd24vd2lraUxpbmsudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FsbGVueWd5L3ZpdGVwcmVzcy1ibG9nL2RvY3MvLnZpdGVwcmVzcy9tYXJrZG93bi93aWtpTGluay50c1wiO2ltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IHVuaWZpZWQgfSBmcm9tICd1bmlmaWVkLWxlZ2FjeSc7XG5pbXBvcnQgcmVtYXJrUGFyc2UgZnJvbSAncmVtYXJrLXBhcnNlLWxlZ2FjeSc7XG5pbXBvcnQgcmVtYXJrUmVoeXBlIGZyb20gJ3JlbWFyay1yZWh5cGUtbGVnYWN5JztcbmltcG9ydCByZWh5cGVTdHJpbmdpZnkgZnJvbSAncmVoeXBlLXN0cmluZ2lmeS1sZWdhY3knO1xuaW1wb3J0IHJlbWFya1dpa2lMaW5rLCB7IGdldFBlcm1hbGlua3MgfSBmcm9tICdAcG9ydGFsanMvcmVtYXJrLXdpa2ktbGluayc7XG5pbXBvcnQgd2lraUxpbmtPcHRpb25zLCB7IHBhdGhUb1Blcm1hbGluayB9IGZyb20gJy4uL3dpa2ktbGluay5jb25maWcuanMnO1xuXG5jb25zdCBXSUtJX0xJTktfUkUgPSAvXiE/XFxbXFxbW15cXF1dK1xcXVxcXS87XG5jb25zdCBjb250ZW50Um9vdCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZG9jcycpO1xuY29uc3QgYmFzZVBlcm1hbGlua3MgPSBnZXRQZXJtYWxpbmtzKGNvbnRlbnRSb290LCBbXSwgcGF0aFRvUGVybWFsaW5rKS5maWx0ZXIoQm9vbGVhbik7XG5jb25zdCBwcm9jZXNzb3JDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBSZXR1cm5UeXBlPHR5cGVvZiB1bmlmaWVkPj4oKTtcbmNvbnN0IHBlcm1hbGlua3NDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuY29uc3QgZ2V0RGlyUHJlZml4ID0gKHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiB7XG4gIGlmICghcmVsYXRpdmVQYXRoKSByZXR1cm4gJyc7XG4gIGNvbnN0IHBhcnRzID0gcmVsYXRpdmVQYXRoLnJlcGxhY2UoL1xcXFwvZywgJy8nKS5zcGxpdCgnLycpO1xuICBwYXJ0cy5wb3AoKTtcbiAgcmV0dXJuIGAvJHtwYXJ0cy5qb2luKCcvJyl9YC5yZXBsYWNlKC9cXC8rJC8sICcnKTtcbn07XG5cbmNvbnN0IG9yZGVyUGVybWFsaW5rcyA9IChyZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCBjYWNoZUtleSA9IHJlbGF0aXZlUGF0aCB8fCAnJztcbiAgY29uc3QgY2FjaGVkID0gcGVybWFsaW5rc0NhY2hlLmdldChjYWNoZUtleSk7XG4gIGlmIChjYWNoZWQpIHJldHVybiBjYWNoZWQ7XG4gIGNvbnN0IGRpclByZWZpeCA9IGdldERpclByZWZpeChyZWxhdGl2ZVBhdGgpO1xuICBpZiAoIWRpclByZWZpeCkge1xuICAgIHBlcm1hbGlua3NDYWNoZS5zZXQoY2FjaGVLZXksIGJhc2VQZXJtYWxpbmtzKTtcbiAgICByZXR1cm4gYmFzZVBlcm1hbGlua3M7XG4gIH1cbiAgY29uc3QgbG9jYWwgPSBbXTtcbiAgY29uc3QgcmVzdCA9IFtdO1xuICBiYXNlUGVybWFsaW5rcy5mb3JFYWNoKChwZXJtYWxpbmspID0+IHtcbiAgICBjb25zdCBpc1NhbWVEaXIgPVxuICAgICAgcGVybWFsaW5rID09PSBkaXJQcmVmaXggfHwgcGF0aC5wb3NpeC5kaXJuYW1lKHBlcm1hbGluaykgPT09IGRpclByZWZpeDtcbiAgICBpZiAoaXNTYW1lRGlyKSB7XG4gICAgICBsb2NhbC5wdXNoKHBlcm1hbGluayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3QucHVzaChwZXJtYWxpbmspO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IG9yZGVyZWQgPSBbLi4ubG9jYWwsIC4uLnJlc3RdO1xuICBwZXJtYWxpbmtzQ2FjaGUuc2V0KGNhY2hlS2V5LCBvcmRlcmVkKTtcbiAgcmV0dXJuIG9yZGVyZWQ7XG59O1xuXG5jb25zdCBnZXRQcm9jZXNzb3IgPSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qga2V5ID0gcmVsYXRpdmVQYXRoIHx8ICcnO1xuICBjb25zdCBjYWNoZWQgPSBwcm9jZXNzb3JDYWNoZS5nZXQoa2V5KTtcbiAgaWYgKGNhY2hlZCkgcmV0dXJuIGNhY2hlZDtcbiAgY29uc3QgcHJvY2Vzc29yID0gdW5pZmllZCgpXG4gICAgLnVzZShyZW1hcmtQYXJzZSlcbiAgICAudXNlKHJlbWFya1dpa2lMaW5rLCB7XG4gICAgICAuLi53aWtpTGlua09wdGlvbnMsXG4gICAgICBwZXJtYWxpbmtzOiBvcmRlclBlcm1hbGlua3MocmVsYXRpdmVQYXRoKSxcbiAgICB9KVxuICAgIC51c2UocmVtYXJrUmVoeXBlLCB7IGFsbG93RGFuZ2Vyb3VzSHRtbDogdHJ1ZSB9KVxuICAgIC51c2UocmVoeXBlU3RyaW5naWZ5LCB7IGFsbG93RGFuZ2Vyb3VzSHRtbDogdHJ1ZSB9KTtcbiAgcHJvY2Vzc29yQ2FjaGUuc2V0KGtleSwgcHJvY2Vzc29yKTtcbiAgcmV0dXJuIHByb2Nlc3Nvcjtcbn07XG5cbmNvbnN0IHJlbmRlcldpa2lMaW5rID0gKHJhdzogc3RyaW5nLCByZWxhdGl2ZVBhdGg6IHN0cmluZykgPT4ge1xuICBjb25zdCBwcm9jZXNzb3IgPSBnZXRQcm9jZXNzb3IocmVsYXRpdmVQYXRoKTtcbiAgY29uc3QgaHRtbCA9IFN0cmluZyhwcm9jZXNzb3IucHJvY2Vzc1N5bmMocmF3KSk7XG4gIGNvbnN0IHRyaW1tZWQgPSBodG1sLnRyaW0oKTtcbiAgY29uc3Qgc3RyaXBwZWQgPSB0cmltbWVkLm1hdGNoKC9ePHA+KC4qKTxcXC9wPiQvcyk7XG4gIHJldHVybiBzdHJpcHBlZCA/IHN0cmlwcGVkWzFdIDogdHJpbW1lZDtcbn07XG5cbmNvbnN0IHdpa2lMaW5rUGx1Z2luID0gKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLmlubGluZS5ydWxlci5iZWZvcmUoJ2xpbmsnLCAnd2lraS1saW5rJywgKHN0YXRlLCBzaWxlbnQpID0+IHtcbiAgICBjb25zdCBwb3MgPSBzdGF0ZS5wb3M7XG4gICAgY29uc3Qgc3JjID0gc3RhdGUuc3JjO1xuICAgIGlmIChzcmMuY2hhckNvZGVBdChwb3MpICE9PSAweDViICYmIHNyYy5jaGFyQ29kZUF0KHBvcykgIT09IDB4MjEpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBtYXRjaCA9IHNyYy5zbGljZShwb3MpLm1hdGNoKFdJS0lfTElOS19SRSk7XG4gICAgaWYgKCFtYXRjaCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICBjb25zdCBlbnZQYXRoID0gdHlwZW9mIHN0YXRlLmVudj8ucmVsYXRpdmVQYXRoID09PSAnc3RyaW5nJyA/IHN0YXRlLmVudi5yZWxhdGl2ZVBhdGggOiAnJztcbiAgICAgIGNvbnN0IGh0bWwgPSByZW5kZXJXaWtpTGluayhtYXRjaFswXSwgZW52UGF0aCk7XG4gICAgICBjb25zdCB0b2tlbiA9IHN0YXRlLnB1c2goJ2h0bWxfaW5saW5lJywgJycsIDApO1xuICAgICAgdG9rZW4uY29udGVudCA9IGh0bWw7XG4gICAgfVxuICAgIHN0YXRlLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2lraUxpbmtQbHVnaW47XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9hbGxlbnlneS92aXRlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGxlbnlneS92aXRlcHJlc3MtYmxvZy9kb2NzLy52aXRlcHJlc3Mvd2lraS1saW5rLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxsZW55Z3kvdml0ZXByZXNzLWJsb2cvZG9jcy8udml0ZXByZXNzL3dpa2ktbGluay5jb25maWcuanNcIjtjb25zdCBpc0V4dGVybmFsSHJlZiA9ICh2YWx1ZSkgPT4gL15bYS16QS1aXVthLXpBLVowLTkrLi1dKjovLnRlc3QodmFsdWUpO1xuXG5jb25zdCBub3JtYWxpemVXaWtpSHJlZiA9ICh2YWx1ZSkgPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdmFsdWU7XG4gIGNvbnN0IHRyaW1tZWQgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcbiAgaWYgKFxuICAgIHRyaW1tZWQuc3RhcnRzV2l0aCgnLycpIHx8XG4gICAgdHJpbW1lZC5zdGFydHNXaXRoKCcuLycpIHx8XG4gICAgdHJpbW1lZC5zdGFydHNXaXRoKCcuLi8nKSB8fFxuICAgIHRyaW1tZWQuc3RhcnRzV2l0aCgnIycpIHx8XG4gICAgaXNFeHRlcm5hbEhyZWYodHJpbW1lZClcbiAgKSB7XG4gICAgcmV0dXJuIHRyaW1tZWQ7XG4gIH1cbiAgcmV0dXJuIGAuLyR7dHJpbW1lZH1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHdpa2lMaW5rT3B0aW9ucyA9IHtcbiAgcGF0aEZvcm1hdDogJ29ic2lkaWFuLXNob3J0JyxcbiAgYWxpYXNEaXZpZGVyOiAnfCcsXG4gIHdpa2lMaW5rQ2xhc3NOYW1lOiAnaW50ZXJuYWwnLFxuICBuZXdDbGFzc05hbWU6ICduZXcnLFxuICBocmVmVGVtcGxhdGU6IG5vcm1hbGl6ZVdpa2lIcmVmLFxufTtcblxuZXhwb3J0IGNvbnN0IHBhdGhUb1Blcm1hbGluayA9IChmaWxlUGF0aCwgbWFya2Rvd25Gb2xkZXIpID0+IHtcbiAgaWYgKCEvXFwubWR4PyQvaS50ZXN0KGZpbGVQYXRoKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBlcm1hbGluayA9IGZpbGVQYXRoXG4gICAgLnJlcGxhY2UobWFya2Rvd25Gb2xkZXIsICcnKVxuICAgIC5yZXBsYWNlKC9cXC4obWR4fG1kKS9pLCAnJylcbiAgICAucmVwbGFjZSgvXFxcXC9nLCAnLycpXG4gICAgLnJlcGxhY2UoL1xcL2luZGV4JC9pLCAnJyk7XG4gIHJldHVybiBwZXJtYWxpbmsubGVuZ3RoID4gMCA/IHBlcm1hbGluayA6ICcvJztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpa2lMaW5rT3B0aW9ucztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGVBQWU7QUFDeEIsU0FBUyw2QkFBNkI7QUFDdEMsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxnQkFBZ0I7OztBQ0p2QixPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sa0JBQWtCLHFCQUFxQjs7O0FDTndSLElBQU0saUJBQWlCLENBQUMsVUFBVSw0QkFBNEIsS0FBSyxLQUFLO0FBRTlZLElBQU0sb0JBQW9CLENBQUMsVUFBVTtBQUNuQyxNQUFJLENBQUMsTUFBTyxRQUFPO0FBQ25CLFFBQU0sVUFBVSxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQ25DLE1BQUksQ0FBQyxRQUFTLFFBQU87QUFDckIsTUFDRSxRQUFRLFdBQVcsR0FBRyxLQUN0QixRQUFRLFdBQVcsSUFBSSxLQUN2QixRQUFRLFdBQVcsS0FBSyxLQUN4QixRQUFRLFdBQVcsR0FBRyxLQUN0QixlQUFlLE9BQU8sR0FDdEI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU8sS0FBSyxPQUFPO0FBQ3JCO0FBRU8sSUFBTSxrQkFBa0I7QUFBQSxFQUM3QixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxtQkFBbUI7QUFBQSxFQUNuQixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQ2hCO0FBRU8sSUFBTSxrQkFBa0IsQ0FBQyxVQUFVLG1CQUFtQjtBQUMzRCxNQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRyxRQUFPO0FBQ3ZDLFFBQU0sWUFBWSxTQUNmLFFBQVEsZ0JBQWdCLEVBQUUsRUFDMUIsUUFBUSxlQUFl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
