import{_ as i,c as a,a5 as n,o as t}from"./chunks/framework.CcAzSe5T.js";const g=JSON.parse('{"title":"10-Advanced-SQL","description":"","frontmatter":{"title":"10-Advanced-SQL","date":"2023-12-27T00:00:00.000Z","status":"DONE","tags":["MySQL","NOTE","Lec10"],"author":["AllenYGY"],"created":"2023-12-27T21:06","updated":"2024-03-21T21:51"},"headers":[],"relativePath":"posts/Database Management System/MySQL/10-Advanced-SQL.md","filePath":"posts/Database Management System/MySQL/10-Advanced-SQL.md","lastUpdated":null}'),e={name:"posts/Database Management System/MySQL/10-Advanced-SQL.md"};function l(h,s,p,k,r,d){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="advanced-sql" tabindex="-1">Advanced-SQL <a class="header-anchor" href="#advanced-sql" aria-label="Permalink to &quot;Advanced-SQL&quot;">​</a></h1><p>Constraints</p><ul><li>Integrity Constraints</li><li>Check Clauses</li><li>Referential Integrity</li><li>Keys and Referential Integrity</li><li>Cascading actions in referential integrity</li><li>Assertions</li></ul><h2 id="integrity-constraints" tabindex="-1">Integrity Constraints <a class="header-anchor" href="#integrity-constraints" aria-label="Permalink to &quot;Integrity Constraints&quot;">​</a></h2><p>Integrity constraints guard against accidental damage to the database, by ensuring that authorized changes to the database do not result in a loss of data consistency.</p><ul><li>Example: <ul><li>gpa must be from 0.0 to 4.0</li></ul></li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> STUDENT</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ADD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> CONSTRAINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gpa_domain</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CHECK</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(gpa</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">00</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> AND</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gpa</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="referential-integrity" tabindex="-1">Referential Integrity <a class="header-anchor" href="#referential-integrity" aria-label="Permalink to &quot;Referential Integrity&quot;">​</a></h2><p>Referential integrity ensures that a value that appears in one relation table for a given set of attributes must also appears in the corresponding set of attributes in the other relation table</p><p>关联删除 关联更新</p><ul><li>Example:</li></ul><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> student</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  p_code </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  FOREIGN KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (p_code) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">REFERENCES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> program(p_code),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CREATE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> program</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  p_code </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">INT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">11</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">NOT NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  PRIMARY KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (p_code),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  …</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ALTER</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> TABLE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> student</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ADD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> CONSTRAINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> student_program </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    FOREIGN KEY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (p_code) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">REFERENCES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> program(p_code) </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ON DELETE CASCADE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ON</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> UPDATE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CASCADE</span></span></code></pre></div><ul><li>Alternative cascade actions can be: <ul><li>SET NULL and SET DEFAULT.</li></ul></li></ul>`,14)]))}const o=i(e,[["render",l]]);export{g as __pageData,o as default};