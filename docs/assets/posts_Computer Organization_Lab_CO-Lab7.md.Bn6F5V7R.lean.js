import{_ as s,c as e,a5 as n,o as t}from"./chunks/framework.CcAzSe5T.js";const x=JSON.parse('{"title":"CO-Lab7","description":"","frontmatter":{"title":"CO-Lab7","date":"2023-12-07T00:00:00.000Z","status":"DONE","created":"2024-01-16T21:03","updated":"2024-05-31T01:16"},"headers":[],"relativePath":"posts/Computer Organization/Lab/CO-Lab7.md","filePath":"posts/Computer Organization/Lab/CO-Lab7.md","lastUpdated":null}'),p={name:"posts/Computer Organization/Lab/CO-Lab7.md"};function l(i,a,r,o,d,c){return t(),e("div",null,a[0]||(a[0]=[n(`<h1 id="co-lab7" tabindex="-1">CO-Lab7 <a class="header-anchor" href="#co-lab7" aria-label="Permalink to &quot;CO-Lab7&quot;">​</a></h1><p>Assembling the following assembly program first by hand and then verify your result using the assembler. Write a report describe the assembling process. Your report file should include the symbol table and the machine code in binary for the assembly code and other related information to describe the assembling process.</p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.ORIG x3050</span></span>
<span class="line"><span>LD R1,SIX</span></span>
<span class="line"><span>LD R2,NUMBER</span></span>
<span class="line"><span>AND R3,R3,#0</span></span>
<span class="line"><span>AGAIN ADD R3,R3,R2</span></span>
<span class="line"><span>      ADD R1,R1,#-1</span></span>
<span class="line"><span>      BRp AGAIN</span></span>
<span class="line"><span>HALT</span></span>
<span class="line"><span>NUMBER .FILL #1</span></span>
<span class="line"><span>SIX .FILL x0006</span></span>
<span class="line"><span>.END</span></span></code></pre></div><p>x3050 x2207 LD R1, SIX x3051 x2405 LD R2, NUMBER x3052 x56E0 AND R3, R3, #0 x3053 AGAIN x16C2 ADD R3, R3, R2 x3054 x127F ADD R1, R1, #-1 x3055 x03FD BRp AGAIN x3056 xF025 HALT x3057 NUMBER x0001 x3058 SIX x0006</p><ul><li>Symbol table</li></ul><table tabindex="0"><thead><tr><th>Symbol Name</th><th>Page Address</th></tr></thead><tbody><tr><td>AGAIN</td><td>x3053</td></tr><tr><td>NUMBER</td><td>x3057</td></tr><tr><td>SIX</td><td>x3058</td></tr></tbody></table><ul><li><p>Machine code 0011 0000 0000 0000 x3050 0010 0010 0000 0111 x3051 0010 0100 0000 0101 x3052 0101 0110 1110 0000 x3053 0001 0110 1101 0010 x3054 0001 0010 0111 1111 x3055 0000 0011 1111 1101 x3056 1111 0000 0010 0101 x3057 0000 0000 0000 0001 x3058 0000 0000 0000 0110</p></li><li><p>Process add R2 6 times, and store the result in R3</p></li><li><p>R3 = 6</p></li></ul>`,7)]))}const h=s(p,[["render",l]]);export{x as __pageData,h as default};