import{_ as a,c as t,a5 as l,o as i}from"./chunks/framework.CcAzSe5T.js";const m=JSON.parse('{"title":"Map Reduce","description":"","frontmatter":{"date":"2024-09-17T00:00:00.000Z","title":"Map Reduce","status":"DONE","author":["AllenYGY"],"tags":["NOTE","DataAnalysis"]},"headers":[],"relativePath":"posts/Data Analysis/Big Data Analysis/Lecture/BDA-MapReduce.md","filePath":"posts/Data Analysis/Big Data Analysis/Lecture/BDA-MapReduce.md","lastUpdated":null}'),s={name:"posts/Data Analysis/Big Data Analysis/Lecture/BDA-MapReduce.md"};function n(r,e,u,o,p,c){return i(),t("div",null,e[0]||(e[0]=[l('<h1 id="map-reduce" tabindex="-1">Map Reduce <a class="header-anchor" href="#map-reduce" aria-label="Permalink to &quot;Map Reduce&quot;">​</a></h1><ul><li>Input: a set of key-value pairs</li><li>Programmer specifies two methods: <ul><li>Map: (k1, v1) -&gt; (k, v) <ul><li>Takes a key-value pair and outputs a set of key-value pairs</li><li>E.g., key is the filename, value is a single line in the file</li></ul></li><li>Reduce: (k, list(v)) -&gt; list(v) <ul><li>All values v&#39; with same key k&#39; are reduced together and processed in v&#39; order</li><li>There is one Reduce function call per unique key k&#39;</li></ul></li></ul></li></ul><h3 id="example-natural-join" tabindex="-1">Example Natural Join <a class="header-anchor" href="#example-natural-join" aria-label="Permalink to &quot;Example Natural Join&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/LunUqn.png" alt="Natural Join"><img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/QfOosg.png" alt="Natural Join"></p>',4)]))}const h=a(s,[["render",n]]);export{m as __pageData,h as default};