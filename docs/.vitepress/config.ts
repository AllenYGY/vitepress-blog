import type { ThemeConfig } from "vitepress-theme-open17/config";
import { genFeed } from "vitepress-theme-open17/genFeed";
import { defineConfigWithTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { withMermaid } from "vitepress-plugin-mermaid";
import pseudocode from "pseudocode";


const vitepressSidebarOptions = [
  {
    documentRootPath: "docs",
    scanStartPath: "guide",
    resolvePath: "/guide/",
    collapsed: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    excludeFilesByFrontmatter: true,
    rootGroupCollapsed: true,
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
    rootGroupCollapsed: true,
  },

];

export default defineConfigWithTheme<ThemeConfig>(withMermaid({
  outDir: '../public',
  title: "AllenYGY's Blog",
  lang: "zh-CN",
  description: "Record AllenYGY's daily studies",
  transformPageData(pageData) {
    const frontmatter = pageData.frontmatter || {};
    const slidevEnabled =
      frontmatter.slidev === true ||
      String(frontmatter.slidev).toLowerCase() === "true";

    if (!slidevEnabled) {
      return;
    }

    return {
      frontmatter: {
        ...frontmatter,
        layout: "SlidevLayout",
      },
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
        functionplot: "json",
      },
    },
    config: (md) => {
      const defaultFence =
        md.renderer.rules.fence?.bind(md.renderer.rules) ??
        ((tokens, idx, options, env, slf) =>
          slf.renderToken(tokens, idx, options));

      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const info = token.info ? token.info.trim().toLowerCase() : "";
        const isPseudo =
          info === "pseudo" ||
          info === "pseudocode" ||
          info.startsWith("pseudo ");
        const isFunctionPlot =
          info === "functionplot" ||
          info === "function-plot" ||
          info.startsWith("functionplot ");

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
            captionCount: true,
          });
          return `<div class="vp-pseudocode">${html}</div>`;
        } catch (_error) {
          return defaultFence(tokens, idx, options, env, slf);
        }
      };
    },
  },
  sitemap: {
    hostname: "https://vitepress.open17.vip",
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
    `,
    ],
    ["meta", { name: "keywords", content: "vitepress, theme, blog, AllenYGY" }],
  ],
  themeConfig: {
    sidebar: generateSidebar(vitepressSidebarOptions),
    search: {
      provider: "local",
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
      pattern:
        "https://github.com/open17/vitepress-theme-open17/edit/master/docs/:path",
      text: "Help me polish the article"
    },
    feed: {
      baseUrl: "https://blog.allenygy.vip",
      copyright: "Copyright © 2023-present open17",
      image: "https://cdn.jsdelivr.net/gh/open17/Pic/img/202405071726176.png",
    },
    blog: {
      tagPageLink: "/page/tags",
      bgImage: { dark: "https://cdn.jsdelivr.net/gh/ALLENYGY/ImageSpace@master/IMAGE/patrick-schneider-PLrscRq3atA.jpg" ,
        light:"https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/Light.png"},
      direct: "lft",
      user: {
        name: "AllenYGY",
        avatar: "https://avatars.githubusercontent.com/u/121916671?v=4",
        describe: "AllenYGY's daily study and life",
      },
      usingTitleFromFrontmatter: false,
    },
    home: {
      maxTagsDisplayed: 20,
      postsPerPage: 5,
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
      lang: "en",
    },
    logo: {
      dark: "/logo.png",
      light: "/logo_light.png",
    },
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/page/blog" },
      { text: "Tags", link: "/page/tags" },
      { text: "Archive", link: "/page/archive" },
      { text: "Friends", link: "/page/friend" },
      // { text: "Guide", link: "/guide/0-intro/" },
      { text: "Note", 
        items: [
          { text: "Database Management System", link: "/posts/Database Management System/RDBMS/01-Entity-Relationship-Model-Modeling/" },
          { text: "Compiler Construction", link: "/posts/Compiler Construction/Lecture/01-Compiler Introduction/" },
          { text: "Computer Graphics", link: "/posts/Computer Graphics/Lecture/02-CG-Transformation/" },
          { text: "Computer Organization", link: "/posts/Computer Organization/Lecture/01-What is a Computer/" },
          { text: "Computer Network", link: "/posts/Computer Network/Lecture/01-Basic Concepts/" },
          { text: "Functional Programming", link: "/posts/Functional Programming/Lecture/01-FP-Basics/" },
          { text: "Operating System", link: "/posts/Operating System/Lecture/01-Operating System Introduction/" },
          { text: "Theory Of Computation", link: "/posts/Theory Of Computation/Lecture/01-TOC-Intro/" },
        ],
      },

    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/AllenYGY/",
      },
    ],
  },
  buildEnd: genFeed,
}));
