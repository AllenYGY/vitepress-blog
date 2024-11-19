---
Create Time: 4th October 2024
Title: TOC-Math
status: DONE
Author:
  - AllenYGY
tags:
  - NOTE
  - TOC
  - Math
---

# TOC-Math

> [!quote]+ “No one shall expel us from the paradise which Cantor has created for us.” ---David Hilbert, 1926

## Sets 

> [!info]+ Def: A set (naively) is a collection of objects such that
> - no order and no duplication

An object $a$ is in a set $A$ is denoted as $a \in A$.

To represent a set, you need to 
- Put all members in a pair of curly brackets $\{\dots \}$;
- Enumerate all members, e.g. $\{ 0, 1, 2, \cdot \}$; or
- Give a member *representative* and followed by the characteristic of members using a predicate, 
	- e.g. $\{ x| P(x)\}$ .

> [!info]+ Def: Empty set
> $S=\{x|\perp \}$ is an empty set, denoted by $\emptyset$.

"$\perp$" is a *concatenation* (always false), Or equivalently,
> [!info]+ Def: Empty set
> $S$ is an empty set if $\forall x, x\not\in S$. 

### Universal set 

> [!info]+ Def: Universal set	
> A **universal set** is a set that contains all elements under a certain context.


A universal set is usually denoted in the blackboard bold font. For example,

- $\mathbb{N}$: the set of natural numbers;
- $\mathbb{Z}$: the set of integers;
- $\mathbb{Q}$: the set of rational numbers;
- $\mathbb{R}$: the set of real numbers;
- $\mathbb{C}$: the set of complex numbers;
- $\mathbb{U}$: the universal set without a specification.
- $\mathbb{P}$: the set of prime numbers.

> [!info]+ Def: subset
> Set $A$ is a subset of set $B$ if  $\forall x,x\in A\to x\in B$, denoted as $A \subset  B$.

> [!info]+ Def: Power set
> Let A be a set. $P ( A ) = \{ S | S \subset A \}$ is the power set of A.

Let $A = { 1, 2 } . P ( A ) = \{ ∅ , \{ 1 \} , \{ 2 \} , \{ 1, 2 \}\}$ .

### Set operator

Suppose $A$ and $B$ are two sets.

> [!info]+ Def: Complement
> **A complement** is the set $\overline{A} = \{x \mid x \notin A\}$.

> [!info]+ Def: Intersection
> **A intersection $B$** is the set $A \cap B = \{x \mid x \in A \text{ and } x \in B\}$.

> [!info]+ Def: Union
> **A union $B$** is the set $A \cup B = \{x \mid x \in A \text{ or } x \in B\}$.

> [!info]+ Def: Setminus 
> **A setminus $B$** is the set $A \setminus B = \{x \mid x \in A \text{ and } x \notin B\}$.



## Relation 

 Suppose $A$ and $B$ are two sets.

> [!info]+ Def: Cartesian product
> The **cartesian product** of $A$ and $B$ is the set:
> $$A \times B = \{ (x, y) \mid x \in A \text{ and } y \in B \}.$$

Each object $(x, y) \in A \times B$ is a **pair** or generally a **2-tuple**.


> [!info]+ Def: Relation
>A **relation $R$** between $A$ and $B$ is a subset of $A \times B$.

If $(x, y) \in R$, we say $x$ is **related to** $y$, denoted by $x R y$.

A **relation** $R$ is **on** the set $A$ if $R \subseteq A \times A$.

Let $R$ be a relation on a set $A$. $R$ is:
- **reflexive** if $\forall x \in A, x R x$;
- **symmetric** if $\forall x, y \in A, x R y \implies y R x$;
- **anti-symmetric** if $\forall x, y \in A, (x R y \land y R x) \implies x = y$;
- **transitive** if $\forall x, y, z \in A, (x R y \land y R z) \implies x R z$.

## Function 


> [!info]+ Def: Function
>A relation $f$ between $A$ and $B$ is a function if:
>$$
>\forall x \in A, \exists! y \in B, (x, y) \in f.
>$$

- $A$ is the **domain**.
- $B$ is the **co-domain**.
- $\exists!$ means **uniquely exists**.
- Such a function is denoted as $f : A \to B$.

> [!info]+ Def: Image and pre-image
> If $(x, y)$ is an object of the function $f$, we denote $f(x) = y$ and say:
> - $y$ is the **image** of $x$;
> - $x$ is the **pre-image** of $y$.

To denote a function:

- Surely, one can enumerate all pairs in the function.
- But usually, people present the expression.  
  For example, $f : \mathbb{N} \to \mathbb{N}$ such that $f(x) = x + 1$.

For the same example, one can also write $f : x \mapsto x + 1$.

Please distinguish “$\to$” and “$\mapsto$”:
- “$\to$” is from **domain** to **co-domain**.
- “$\mapsto$” is from **pre-image** to **image**.



> [!info]+ Def: A function $f: A\rightarrow B$ is 
> - *Injection*: If $\forall x, y\in A, x \ne y\rightarrow f(x) \ne f(y)$ 
> 	- 不同x对应不同y	
> - *Surjection*: If $\forall\ y\in B,\exists\ x \in A, f(x)=y$
> 	- 任何y都有对应的x	
> - *Bijection*: If $f$ is both injection and surjection.



For example, let $f : \mathbb{R} \to \mathbb{R}$.

- $f(x) = 2^x$ is an **injection** but not a **surjection**.
- $f(x) = x(x + 1)(x - 1)$ is a **surjection** but not an **injection**.
- $f(x) = x$ is a **bijection**.

> [!abstract]+ Graph
> ```functionplot
> ---
> title:
> xLabel: 
> yLabel: 
> bounds: [0,1,-1,1]
> disableZoom: true
> grid: true
> ---
> g(x)= tan(PI*x-PI/2)
> ```

## Formal Language 

To precisely describe mathematics, algorithm, computation, and other procedures, formal languages are used. A language is a set of strings over an alphabet. Formally,

> [!info]+ Def: Language 	
>***A language is a set of strings over a specific alphabet.***

> [!info]+ Def: alphabet 
> An **alphabet** is a nonempty finite set.

For example, $\Sigma = \{ 0, 1, x, y, z \}$

### Strings 

> [!info]+ Def: string 	
> A **string** over an alphabet $\Sigma$ is a finite sequence of symbols from that alphabet.

> [!info]+ Def: length	
> If $w$ is a string over the alphabet $\Sigma$, the length of $w$ is the number of  symbols in $w$, denoted by $|w|$ .

> [!info]+ Def: Empty string	
> The **empty string** is the string of length 0, denoted by $\epsilon$.

***Let $w=w_1w_2\cdots w_n$ be a string of length n, where each $w_i\in \Sigma$.***

> [!info]+ Def: Reverse	
> The **reverse** of a string $w$ is the string $w_nw_{n-1}\cdots w_1$, denoted by $w^R$.

> [!info]+ Def: Substring 
> The string $z$ is a **substring** of $w$ if $z$ consecutively appears in $w$.

> [!info]+ Def: Concatenation
> The **concatenation** of two strings $w$ and $z$ is the string $w\circ z=w_1w_2\dots w_n z_1z_2\dots z_m$ of length $n+m$.	

For example, $101xxy \circ 00zz = 101xxy00zz$.
Sometimes, the operator “$\circ$” is omitted. $w \circ z =wz$

> [!info]+ Language
> A language is a set of strings over a specific alphabet.

## Proof

In this lecture, we only emphasize several proving techniques.

- Constructive proof 
- Prove by contradiction 
- Induction 
- Diagonal argument

### Constructive proof

- Used to prove a predicate with existential quantifiers, like $\exists x, P(x)$.
- First, construct an object $x$.
- Second, prove $P(x)$ is true.


### Prove by contradiction

- Used to prove a proposition $p$.
- First, assume $p$ is false.
- Then, derive a contradiction.
- Last, claim $p$ is true.

### Induction


- To prove a predicate with universal quantifiers, one can use **induction**.
- Induction has two variants: **simple** and **strong**. But, they are equivalent.
- To prove $\forall x \in \mathbb{N}, P(x)$:

#### Simple Induction:

- Prove $P(0)$ as a **base case**.
- Prove $\forall a \in \mathbb{N}, P(a) \to P(a + 1)$ as an induction.
- In the second step, $P(a)$ is the **inductive hypothesis**.

#### Strong Induction:

- Prove $P(0)$ as a **base case**.
- Prove $\forall a \in \mathbb{N}, (P(0) \land \cdots \land P(a)) \to P(a + 1)$.
- We assume $P(0), \cdots, P(a)$ are all true in the strong induction.



## Cardinality

> [!info]+ Def: Cardinality
> The **cardinality** of a set $A$ is the number of objects in $A$, denoted as $|A|$.

> [!info]+ Def: Cardinality
>The set $A$ and the set $B$ are of the same cardinality if there is a bijection $f : A \to B$.


### Examples:

- $A = \{0, 1, 2\}$ and $B = \{4, 5, 6\}$ are of the same cardinality because we can define a bijection $f : A \to B$ such that $f(x) = x + 4$.
- The set of even numbers $E$ and the set of integers $\mathbb{Z}$ are also of the same cardinality because of the bijection $f(x) = \frac{x}{2}$.

Note that the cardinality can be **finite** and **infinite**.

## Countable 

> [!info]+ Def: Countable
> A set is **countable** if it is finite or its cardinality is same as the set of natural number $\mathbb{N}$.

**Countable** means that:
- For every number $x$ in the natural number (no matter how large the number is),
- if we count from 0,
- we can **eventually**  reach the number $x$ within a finite time.

In fact, the counting procedure constructs a bijection, mapping a natural number $i$ to the $i_{th}$ counted element.

We denote the cardinality of $\mathbb{N}$ by $\aleph_0$

To proof an infinite set $A$ is countable, you need t construct a bijection $f: A\to \mathbb{N}$

### Diagonal Proof 

Georg Cantor developed a method to prove a set is uncountable.  

For example:

> [!note]+ Theorem  
> The set of all real numbers in the open interval $(0, 1)$ is uncountable.

The intuition of the proof (by contradiction) is as follows:

1. Assume $(0, 1)$ is **countable**, then we can "count" the numbers one by one.
2. Then, we can list all the numbers that we count in a table.
3. Construct a real number in $(0, 1)$ but **cannot be reached** in the table.

Thus, the set of reals in $(0, 1)$ is **uncountable**.


Suppose we denote a real number as $a_i = a_{i,1}a_{i,2}\cdots$. Then, we build the table in Step 2 of the proof.

| **Index** | **$a_n$** | **Digits**         |
|-----------|---------------|--------------------|
| 0         | $a_0$     | $a_{0,0}$ $a_{0,1}$ $a_{0,2} \cdots$ |
| 1         | $a_1$     | $a_{1,0}$ $a_{1,1}$ $a_{1,2} \cdots$ |
| 2         | $a_2$     | $a_{2,0}$ $a_{2,1}$ $a_{2,2} \cdots$ |
| $\vdots$ | $\vdots$   | $\vdots$           |


Next, we define a real number $a_x = a_{x,0}a_{x,1}\cdots$ such that:  
$$a_{x,i} = (a_{i,i} + 1) \mod 10$$

We can see $a_x$ is **not in the list**:
- $a_x$ and $a_0$ are different at digit 0.
- $a_x$ and $a_1$ are different at digit 1.
- $\cdots$

Thus, $a_x$ is not counted, and the set of reals in $(0, 1)$ is **uncountable**.


 Here we list some facts about infinite sets:

- The set of real numbers $\mathbb{R}$ has cardinality $\aleph_1$.
- The power set $\mathcal{P}(\mathbb{N})$ of $\mathbb{N}$ also has cardinality $\aleph_1$.
- $\mathcal{P}(\mathbb{R})$ has cardinality $\aleph_2$.
- You can make such constructions by taking power sets.

> [!note]+ Hypothesis (Continuum Hypothesis - CH)
>There is no set of cardinality strictly between $\aleph_0$ and $\aleph_1$.

So far, people only know:

> [!note]+ Theorem (Cohen 1964)
>CH is unprovable under ZFC.



