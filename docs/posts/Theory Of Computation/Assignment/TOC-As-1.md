---
Create Time: 4th October 2024
title: TOC-As-1
status: DONE
Author:
  - AllenYGY
tags:
  - Assignment
  - TOC
---

# TOC-As-1

## Question 1

### $a. \mathbb{Z} \times \mathbb{Z}\ is\ countable$.

Construct a counting procedure as below:

<img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/8aSjkC.png" alt="1-a-counting-procedure" style="zoom:67%;" />

Each pair corresponds to a unique natural number.
Therefore $\mathbb{Z} \times \mathbb{Z}$ is countalbe

### $b. If\ set\ S\ is\ countable\ and\ n\ is\ a\ natural\ number\ constant,\ then\ S^{n}\ is\ countable$.

#### Case I

If $S$ is a finite set with $m$ element;

Then $|S^n|=m^n$ which is finite. Therefore $S^n$ is countable.

#### Case 2

If $S$ is a infinite and countable set;
Then there must be a bijection between $S$ and $\mathbb{N}$.

And for 2 countable sets $A$ $B$, $A\times B$ is also a countable set.

For any element  $(a, b) \in A \times B$ , we can write $a = f(i)$  and  $b = g(j)$  for some  $i, j \in \mathbb{N}$.

Therefore,  $(a, b)$  corresponds to the pair  $(f(i), g(j))$ , which in turn corresponds to the natural number pair  $(i, j)$.

To establish a one-to-one correspondence, we can use a pairing function that maps each pair  $(i, j)$  to a unique natural number  k .

$$
k = \frac{(i + j)(i + j + 1)}{2} + j
$$

Therefore, $A\times B$ is countable.

Since $S^n=S\times S\times \dots \times S$ n times.

And $S\times S$ is countable.

Therefore $S^n$ is countable.

### $c. |\{a|a\in \mathbb{R} \land 0<a<1\}|=\mathbb{R}$

**Solution:**

$Bijection\ |\{a|a\in \mathbb{R} \land 0<a<1\}| \rightarrow \mathbb{R}: tan(\pi x-\frac{\pi}{2})$

![Solution](https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/eEmBAw.png)

### $d. \{a|a\in \mathbb{R} \land 0<a<10\}$ is uncountable.

Suppose a real number  $a_i \in (0,10)$ denote as $a_i=a_{i,1}a_{i,2}\dots$. Then we build the table as below:

| Index    | $a_n$    | Digits                            |
| -------- | -------- | --------------------------------- |
| 0        | $a_0$    | $a_{0,0}\ a_{0,1}\ a_{0,2} \dots$ |
| 1        | $a_1$    | $a_{1,0}\ a_{1,1}\ a_{1,2} \dots$ |
| 2        | $a_2$    | $a_{2,0}\ a_{2,1}\ a_{2,2} \dots$ |
| $\vdots$ | $\vdots$ | $\vdots$                          |

Next we define a real number $a_x=a_{x,0}a_{x,1}\dots$ such that
$a_{x,i}=(a_{i,i}+2) mod\ 10$.  We can see a xis not in the list!

- $a_{x}$ and $a_{0}$ are different at digit 0.
- $a_{x}$ and $a_{1}$ are different at digit 1.
- $a_{x}$ and $a_{2}$ are different at digit 2.
- $a_{x}$ and $a_{3}$ are different at digit 3.
$\dots$

Thus, $a_{x}$ is not counted and set of reals in (0, 10) is uncountable.

### $\{f|f:\mathbb{N}\rightarrow \{0,1\}\}$ is uncountable

Assume that the set of functions from $\mathbb{N}$ to $\{0, 1\}$ is countable. 	

Suppose all such functions can be listed as $f_1, f_2, f_3, \dots$.

Define a function $g$ such that $g(n) = 1 - f_n(n)$.
This ensures that  $g$ differs from each $f_i$ at least at position $i$.

Since $g$ is not equal to any $f_i$ in the list, this contradicts the assumption that we have listed all possible functions.

Therefore, the set of functions from $\mathbb{N}$ to $\{0, 1\}$ is uncountable.

## Question 2

***Prove the followings.(1 pt for each)***

### a

$For\ a\ given\ alphabet\ \Sigma,\ the\ number\ of\ DFA^{'}\ over\ \Sigma\ is\ countable$

### b

Two sets are isomorphic if they are of the same cardinality. Prove that the number of DFA's (without specifying $\Sigma$) is countable up to set isomorphism.

## Question 3

Let $\Sigma = \{a,b\}.$ Construct a DFA for each of the following languages. (10 pt for each)

### a. $\{w|w\ has\ at\ least\ one\ a \}$

| Current State | $a$ | $b$ |
|---------------|---------------|---------------|
| $q_0$     | $q_1$     | $q_0$     |
| $q_1$     | $q_1$     | $q_1$     |

<img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/RUB7TX.png" alt="3-a-DFA" style="zoom:67%;" />

### b. $\{w|w\ has\ no\ more\ than\ three\ a's\}$

| Current State | $a$ | $b$ |
|---------------|---------------|---------------|
| $q_0$     | $q_1$     | $q_1$     |
| $q_1$     | $q_2$     | $q_1$     |
| $q_2$     | $q_3$     | $q_2$     |
| $q_3$     | $q_4$     | $q_3$     |
| $q_4$     | $q_4$     | $q_4$     |

<img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/HXpAK1.png" alt="3-b-DFA" style="zoom:67%;" />

### c. $\{w|w\ does\ not\ have\ ab\ as\ a\ substring\}$

| Current State | $a$ | $b$ |
|---------------|---------------|---------------|
| $q_0$     | $q_1$     | $q_2$     |
| $q_1$     | $q_1$     | $q_3$     |
| $q_2$     | $q_1$     | $q_2$     |
| $q_3$     | $q_3$     | $q_3$     |

<img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/mblQ2d.png" alt="3-c-DFA" style="zoom:67%;" />

### d. $\{w|w\ contains\ no\ runs\ of\ length\ less\ than\ for\}.$  A **run** in a string is a substring of length at least one and consisting entirely of the same symbol. For example, $abbbaab$ has four runs: $a,bbb,aa,b$.

| Current State | $a$ | $b$ |
|---------------|---------------|---------------|
| $q_0$     | $q_1$     | $q_2$     |
| $q_1$     | $q_3$     | $q_9$     |
| $q_2$     | $q_{10}$  | $q_4$     |
| $q_3$     | $q_5$     | $q_9$     |
| $q_4$     | $q_{10}$  | $q_6$     |
| $q_5$     | $q_7$     | $q_9$     |
| $q_6$     | $q_{10}$  | $q_8$     |
| $q_7$     | $q_7$     | $q_2$     |
| $q_8$     | $q_1$     | $q_8$     |
| $q_9$     | $q_9$     | $q_9$     |
| $q_{10}$  | $q_{10}$  | $q_{10}$  |

<img src="https://cdn.jsdelivr.net/gh/AllenYGY/ImageSpace@main/uPic/CUkK9k.png" alt="3-d-DFA" style="zoom: 67%;" />

## Question 4

Let $M = (Q, \Sigma, \delta, q_0, F)$ be an arbitrary DFA. We construct a new DFA $M'$ as $M' = (Q, \Sigma, \delta, q_0, Q \setminus F)$. We need to prove that $\overline{L(M)} = L(M')$.

**Note:**  

- $Q \setminus F$ is the set difference.  
- $L(\overline{M}) = \Sigma^* \setminus L(M)$ is the set complement.

---

The goal $L(\overline{M}) = L(M')$ is understood as set equality.  
Thus, we need to prove $\forall w \in \Sigma^*$, $w \in L(\overline{M}) \iff w \in L(M')$.

($\Rightarrow$)  
Assume $w \in L(\overline{M})$.  
Then $w \notin L(M)$.  
Thus, DFA $M$ rejects $w$.  
In other words, DFA $M$ halts on a non-final state $q_x$ by consuming all symbols in $w$.  
By the construction of $M'$, $q_x$ is a final state of $M'$.  
Thus, $M'$ accepts $w$, and $w \in L(M')$.

---

($\Leftarrow$)  
Assume $w \in L(M')$.  
DFA $M'$ accepts $w$.  
In other words, DFA $M'$ halts on a final state $q_y$ by consuming all symbols in $w$.  
By the construction of $M'$, $q_y$ is a non-final state of $M$.  
Thus, $M$ rejects $w$, so $w \notin L(M)$.  
Thus, $w \in L(\overline{M})$.
$L(\overline{M}) = L(M')$.
