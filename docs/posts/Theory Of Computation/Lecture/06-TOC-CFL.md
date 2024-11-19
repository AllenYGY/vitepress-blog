---
Create Time: 7th November 2024
Title: TOC-CFL
status: TOBECONTINUED
Author:
  - AllenYGY
tags:
  - NOTE
  - TOC
  - CFL 
---

# TOC-CFL


Assume L is context-free. Let $s=0^p1^p\#0^p1^p$, which is a string in L.
By the pumping lemma, $s=wvxyz.$ Then, we have two cases.


$|vy| >0$
$|vxy|\leq p$

- Case 1

`vxy`  before the \# 

$\alpha=wv^2xy^2z$ has more symbols before \# then after. 

- Case 2

`vxy`  before the \# 

$\alpha=wv^2xy^2z=0..01...1\#0...01...1$ 

more 1's but less 0's