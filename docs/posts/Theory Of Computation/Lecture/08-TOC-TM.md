---
Create Time: 7th November 2024
Title: TOC-TM
status: UNFINISHED
Author:
  - AllenYGY
tags:
  - NOTE
  - TOC
  - TuringMachine
---

# TOC-Turing Machine

$B=\{s\#s|s\in \{0,1\}^*\}$ is not context free.

Problem:
Input: Given a string $\alpha$ in $\{0,1,\#\}^*$
Question: Is $\alpha\in B$?

Algorithm:

1. load $\alpha$ on to memory
2. Check if $\alpha$ has only one \#, reject if no
3. Repeat until no unmarked symbol
	- Find the first unmarked symbol in first half
	- Go right, exceed find the first unmarked symbol in second half
	- mark s'
	- reject if $s\ne s'$
	- go left exceed find the first unmarked symbol in first half
4. accept if no more in second half.

## Definition

## Computation

## Example

## Calculation

### Side Effect

### Calculator

## Dead Loop
