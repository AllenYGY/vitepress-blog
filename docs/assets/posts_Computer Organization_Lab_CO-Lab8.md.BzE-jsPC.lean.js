import{_ as s,c as n,a5 as p,o as t}from"./chunks/framework.CHhwEXkI.js";const u=JSON.parse('{"title":"CO-Lab8","description":"","frontmatter":{"title":"CO-Lab8","date":"2023-12-23T00:00:00.000Z","status":"DONE","created":"2023-12-23T02:13","updated":"2024-05-31T01:13","publish":true},"headers":[],"relativePath":"posts/Computer Organization/Lab/CO-Lab8.md","filePath":"posts/Computer Organization/Lab/CO-Lab8.md","lastUpdated":null}'),e={name:"posts/Computer Organization/Lab/CO-Lab8.md"};function l(i,a,o,c,r,d){return t(),n("div",null,a[0]||(a[0]=[p(`<h1 id="co-lab8" tabindex="-1">CO-Lab8 <a class="header-anchor" href="#co-lab8" aria-label="Permalink to &quot;CO-Lab8&quot;">​</a></h1><div class="language-assemble vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assemble</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.ORIG x3000</span></span>
<span class="line"><span>	LD R1, HELLO</span></span>
<span class="line"><span>	STI R1, TRAP_26</span></span>
<span class="line"><span>	TRAP x26</span></span>
<span class="line"><span>	HALT</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HELLO .FILL x3006</span></span>
<span class="line"><span>TRAP_26 .FILL X0026</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>	ST R7, ADDRESS</span></span>
<span class="line"><span>	LEA R0 SHELLO</span></span>
<span class="line"><span>	PUTS</span></span>
<span class="line"><span>	LD R7, ADDRESS</span></span>
<span class="line"><span>	RET</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ADDRESS .FILL x046A</span></span>
<span class="line"><span>SHELLO .STRINGZ &quot;Hello, world!&quot;</span></span>
<span class="line"><span>	.END</span></span></code></pre></div><ul><li>At first, loading the program that print hello&#39;s address to R1.</li><li>Then using STI to load this address to x0026.</li><li>Finally I can use trapx26 to print &quot;Hello,world&quot;.</li></ul>`,3)]))}const b=s(e,[["render",l]]);export{u as __pageData,b as default};
