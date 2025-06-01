import{_ as s,c as n,a5 as e,o as p}from"./chunks/framework.CHhwEXkI.js";const h=JSON.parse('{"title":"Vue-Application","description":"","frontmatter":{"date":"2024-02-18T00:00:00.000Z","title":"Vue-Application","author":["AllenYGY"],"status":"DONE","tags":["NOTE","Vue","Lec2","WEB"],"created":"2024-02-18T22:39","updated":"2024-05-31T01:22","publish":true},"headers":[],"relativePath":"posts/Web/Vue/Vue-Application.md","filePath":"posts/Web/Vue/Vue-Application.md","lastUpdated":null}'),t={name:"posts/Web/Vue/Vue-Application.md"};function l(i,a,o,c,u,r){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="vue-application" tabindex="-1">Vue-Application <a class="header-anchor" href="#vue-application" aria-label="Permalink to &quot;Vue-Application&quot;">​</a></h1><h2 id="cli文件结构" tabindex="-1"><strong>CLI文件结构</strong> <a class="header-anchor" href="#cli文件结构" aria-label="Permalink to &quot;**CLI文件结构**&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── node_modules</span></span>
<span class="line"><span>├── public</span></span>
<span class="line"><span>│ ├── favicon.ico: 页签图标</span></span>
<span class="line"><span>│ └── index.html: 主页面</span></span>
<span class="line"><span>├── src</span></span>
<span class="line"><span>│ ├── assets: 存放静态资源</span></span>
<span class="line"><span>│ │ └── logo.png</span></span>
<span class="line"><span>│ │── component: 存放组件</span></span>
<span class="line"><span>│ │ └── HelloWorld.vue</span></span>
<span class="line"><span>│ │── App.vue: 汇总所有组件</span></span>
<span class="line"><span>│ │── main.js: 入口文件</span></span>
<span class="line"><span>├── .gitignore: git版本管制忽略的配置</span></span>
<span class="line"><span>├── babel.config.js: babel的配置文件</span></span>
<span class="line"><span>├── package.json: 应用包配置文件</span></span>
<span class="line"><span>├── README.md: 应用描述文件</span></span>
<span class="line"><span>├── package-lock.json：包版本控制文件</span></span></code></pre></div><h2 id="关于不同版本的vue" tabindex="-1"><strong>关于不同版本的Vue</strong> <a class="header-anchor" href="#关于不同版本的vue" aria-label="Permalink to &quot;**关于不同版本的Vue**&quot;">​</a></h2><div class="note custom-block github-alert"><p class="custom-block-title">+ vue.js与vue.runtime.xxx.js的区别：</p><p></p><ol><li>vue.js是完整版的Vue，包含：核心功能+模板解析器。</li><li>vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。</li></ol></div><div class="tip custom-block github-alert"><p class="custom-block-title">+</p><p><code>vue.runtime.xxx.js</code>没有模板解析器，所以不能使用template配置项，需要使用 render函数接收到的createElement函数去指定具体内容。</p></div>`,6)]))}const m=s(t,[["render",l]]);export{h as __pageData,m as default};
