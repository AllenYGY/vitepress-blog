import{_ as i,c as a,a5 as t,o as n}from"./chunks/framework.CcAzSe5T.js";const g=JSON.parse('{"title":"Discretization","description":"","frontmatter":{"date":"2024-06-21T00:00:00.000Z","title":"Discretization","status":"DONE","author":["AllenYGY"],"tags":["NOTE"],"created":"2024-06-21T18:09","updated":"2024-06-22T16:18"},"headers":[],"relativePath":"posts/Algorithm/Basic Algorithm/Discretization.md","filePath":"posts/Algorithm/Basic Algorithm/Discretization.md","lastUpdated":null}'),l={name:"posts/Algorithm/Basic Algorithm/Discretization.md"};function h(k,s,p,e,E,r){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="discretization" tabindex="-1">Discretization <a class="header-anchor" href="#discretization" aria-label="Permalink to &quot;Discretization&quot;">​</a></h1><ol><li>排序</li><li>去重</li><li>二分查找获取下标</li></ol><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">discretization</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	vector</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;int&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	sort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 排序</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">erase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unique</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()), alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //去重</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x : a) {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //重新赋值原数组</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 		x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> lower_bound</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> alls.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">begin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> alls;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //用于查表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,3)]))}const y=i(l,[["render",h]]);export{g as __pageData,y as default};