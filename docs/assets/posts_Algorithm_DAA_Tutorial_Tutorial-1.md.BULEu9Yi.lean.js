import{_ as a,c as n,a5 as p,o as i}from"./chunks/framework.CHhwEXkI.js";const h=JSON.parse('{"title":"Tutorial-1","description":"","frontmatter":{"date":"2024-03-04T00:00:00.000Z","title":"Tutorial-1","author":["AllenYGY"],"status":"DONE","tags":["NOTE","DAA","Tutorial"],"created":"2024-03-04T00:00:00.000Z","updated":"2024-04-09T00:27","publish":true},"headers":[],"relativePath":"posts/Algorithm/DAA/Tutorial/Tutorial-1.md","filePath":"posts/Algorithm/DAA/Tutorial/Tutorial-1.md","lastUpdated":null}'),e={name:"posts/Algorithm/DAA/Tutorial/Tutorial-1.md"};function t(l,s,o,r,c,u){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="tutorial-1" tabindex="-1">Tutorial-1 <a class="header-anchor" href="#tutorial-1" aria-label="Permalink to &quot;Tutorial-1&quot;">​</a></h1><h2 id="question1" tabindex="-1">Question1 <a class="header-anchor" href="#question1" aria-label="Permalink to &quot;Question1&quot;">​</a></h2><p>Given the problem: “For the given positive integer, justify if it is a prime.”</p><ol><li><p>Formally define the problem</p></li><li><p>Give some instances and corresponding outputs</p></li></ol><p>3. Construct an algorithm and describe it with/without using pseudo code</p><ul><li>Input: a positive integer n</li><li>Output: Yes, if n is a prime; No, Otherwise</li></ul><div class="language-pseudo vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pseudo</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>begin</span></span>
<span class="line"><span>	for a =2 to |n^0.5| do</span></span>
<span class="line"><span>		\\if {$n%a=0} then</span></span>
<span class="line"><span>			return No</span></span>
<span class="line"><span>		end if</span></span>
<span class="line"><span>	end for</span></span>
<span class="line"><span>	return Yes</span></span>
<span class="line"><span>end</span></span></code></pre></div><div class="language-pseudo vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">pseudo</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    \\begin{algorithm}</span></span>
<span class="line"><span>    \\caption{Quicksort}</span></span>
<span class="line"><span>    \\begin{algorithmic}</span></span>
<span class="line"><span>      \\PROCEDURE{Quicksort}{$A, p, r$}</span></span>
<span class="line"><span>        \\IF{$p &lt; r$}</span></span>
<span class="line"><span>          \\STATE $q = $ \\CALL{Partition}{$A, p, r$}</span></span>
<span class="line"><span>          \\STATE \\CALL{Quicksort}{$A, p, q - 1$}</span></span>
<span class="line"><span>          \\STATE \\CALL{Quicksort}{$A, q + 1, r$}</span></span>
<span class="line"><span>        \\ENDIF</span></span>
<span class="line"><span>      \\ENDPROCEDURE</span></span>
<span class="line"><span>      \\PROCEDURE{Partition}{$A, p, r$}</span></span>
<span class="line"><span>        \\STATE $x = A[r]$</span></span>
<span class="line"><span>        \\STATE $i = p - 1$</span></span>
<span class="line"><span>        \\FOR{$j = p$ \\TO $r - 1$}</span></span>
<span class="line"><span>          \\IF{$A[j] &lt; x$}</span></span>
<span class="line"><span>            \\STATE $i = i + 1$</span></span>
<span class="line"><span>            \\STATE exchange</span></span>
<span class="line"><span>            $A[i]$ with $A[j]$</span></span>
<span class="line"><span>          \\ENDIF</span></span>
<span class="line"><span>        \\STATE exchange $A[i]$ with $A[r]$</span></span>
<span class="line"><span>        \\ENDFOR</span></span>
<span class="line"><span>      \\ENDPROCEDURE</span></span>
<span class="line"><span>      \\end{algorithmic}</span></span>
<span class="line"><span>    \\end{algorithm}</span></span></code></pre></div>`,8)]))}const $=a(e,[["render",t]]);export{h as __pageData,$ as default};
