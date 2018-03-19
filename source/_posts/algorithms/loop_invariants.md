---
title: How to prove algorithms
categories: 基础算法
---

I'm reading CLRS and fall into the deep thoughts of loop invariants.I want to figure out how these smart minds come up with loop invariants to prove the correctness of algorithms.So I write these article to find the reasons.

### UNDERSTAND LOOP INVARIANTS

**Loop Invariants** is a kind of strong tool to prove the correctness of some algorithms.It's similar to **Mathematical Induction(MI)** which is divided into two steps:**Base Step** and **Inductive Step**.

Loop invariants can be divided into three steps:**Initialization**,**Maintenance** and **Termination**.Compared with MI,LI add one more step called termination,because loop will always terminate in correct algorithms.

<!--more-->

According to wikipedia, a loop invariant is a property of a program loop that **is true** before (and after) **each iteration**. In simple words, a loop invariant is some predicate (**condition**) that holds for every iteration of the loop. For example, let's look at a simple `for` loop that looks like this:

```C++
int j = 9;
for(int i=0; i<10; i++)  
  j--;
```

In this example it is true (for every iteration) that `i + j == 9`. A weaker invariant that is also true is that `i >= 0 && i <= 10`.

### HOW TO COME UP WITH LOOP INVARIANTS

> Loop invariants just give your intuition a structure.

Every time when we encounter an algorithm,we can always understand it intuitively.But hard to describe our intuition,isn't it?To find a concrete loop invariants to describe our algorithm,we can describe some concrete condition or feature in every concrete iteration.

Let's take **MERGE SORT** as an example.One steps of merge sort is to combine two sorted list into one sorted list.Here is the code:

```python 
 # suppose we have two array L,R sorted
 # array A has length len(L) + len(R)
L[len(L)+1] = 99999 # postive infinite
R[len(R)+1] = 99999 # postive infinite
i = j = 1
for k in range(0,len(A)):
    if L[i] <= R[j]:
        A[k] = L[i]
        i++
    else:
        A[K] = R[j]
        j++
```

Suppose we have:

```python
L = [1,5,7]
R = [2,3,9]
```

First iteration,one clear feature is that A is sorted:

```python
A = [1]
L[i:len(L)]=[5,7]
R[j:len(R)]=[2,3,9]
```

Second iteration,A is sorted.So how first iteration can conclude A is still sorted in second iteration?Clearly because 2 is bigger than every elements in A previously.So beside one feature that A is sorted,we proposed second feature that elements in A is smaller than every elements in L[i:len(L)] and R[j:len(R)].

```python
A = [1,2]
L[i:len(L)]=[5,7]
R[j:len(R)]=[3,9]
```

Third iteration,A is sorted.Elements in A is smaller than every elements in L[i:len(L)] and R[j:len(R)].

```python
A = [1,2,3]
L[i:len(L)]=[5,7]
R[j:len(R)]=[9]
```

It seems we catch the so-called intuition.We find two features,Let's start to prove it!

PROVE the correctness of algorithm to combine two sorted list:

**Initialization:**A is empty,so A is sorted,every elements in A is smaller than elements in  L[i:len(L)] and R[j:len(R)].

**Maintenance**: If L[i] <= R[j],we take L[i] into A.If not, we take R[j] into A.So we can take the smallest elements in L[i:len(L)] and R[j:len(R)] into A,isn't it.

Last iteration, A is smaller than elements not selected,we take the new element which is smaller than every elements not selected,A is still smaller than elements not selected!

And we know A is sorted from small to large.Last iteration,every elements in A is smaller than elements not selected,so the element we select now must be larger than every elements in A,A is still sorted from small to large.

**Termination:**Loop is terminated when k=len(A)-1.The condition "A is sorted" is still true.

Let me give you some tips.**Run algorithms in your own minds,find condition and features in the process.**If the condition can't hold itself,**find another condition or feature to prove the condition**.And finally,you will find that these features or conditions are just the loop invariants you want to figure out.

### EXERCISES IN CLRS

#### Bubble sort

```python
for i in range(0,len(A)):
    for j in range(len(A)-1,i+1，-1):
        if A[j]<A[j-1]:
            A[j],A[j-1]=A[j-1],A[j]
```

**a.** Let$A$denote the output of BUBBLESORT To prove that BUBBLESORT is
correct, we need to prove that it terminates and that
$$A[0] \leq A[1] \leq A[2] ..... \leq A[n-1]$$

where n = len(A). In order to show that BUBBLESORT actually sorts, what
else do we need to prove?The next two parts will prove these inequality.
**b.** State precisely a loop invariant for the for loop in lines 2–4, and prove that this
loop invariant holds. Your proof should use the structure of the loop invariant
proof presented in this chapter.

**THINKING:** Firstly,let's make a concrete example:

```python
a1,a2,a3,a4 = 5,7,3,2
A = [a1,a2,a3,a4]
# First iteration
# We have A[2] < A[3]
A = [a1,a2,a4,a3]
# Second,A[1] < A[2],A[3]
A = [a1,a4,a2,a3]
# Third,A[0] < A[1],A[2],A[3]
A = [a4,a1,a2,a3]
```

**PROVE:**We suppose loop invariant is 

$$A[j-1] \leq A[j],A[j+1],....,A[n-1]$$

**Initialization:**j is len(A)-1.If A[j]<A[j-1],we swap two elements,get $A[j-1] \leq A[j]$.If not,we still have loop invariant correct.

**Maintenance**:Before iteration,we M=memorize A[j] as temp,and we will have:

$$temp = A[j] \leq A[j+1],....,A[n-1]$$

If A[j]<A[j-1],we swap two elements,and get $A[j-1] \leq A[j],temp = A[j-1]$.So it's easy to conclude that:

$$A[j-1] \leq A[j],A[j+1],....,A[n-1]$$

If not, we get $A[j-1] \leq A[j] \leq A[j+1],...A[n-1]$.So we can also conclude that:

$$A[j-1] \leq A[j],A[j+1],....,A[n-1]$$

**Termination:** when j is i+1,we will get:

$$A[i] \leq A[i+1],A[i+2],....,A[n-1]$$

**PROVEMENT ENDS**

**c.** Using the termination condition of the loop invariant proved in part (b), state
a loop invariant for the for loop in lines 1–4 that will allow you to prove inequality (2.3). Your proof should use the structure of the loop invariant proof
presented in this chapter. 

**THINKING:** It's easy to get a condition:

$$A[0] \leq A[1] \leq ...\leq A[i]$$

But these condition can't hold correctness itself,so we use the result of part(b)

$$A[i] \leq A[i+1],A[i+2],....,A[n-1]$$

**PROVE:**We suppose Loop invariant is

$$A[0] \leq A[1] \leq ...\leq A[i] \leq A[i+1],A[i+2],....,A[n-1]$$

**Initialization:** i = 0,with the help of part(b),we can get:

$$A[0]  \leq A[1],A[2],....,A[n-1]$$

**Maintenance:**Before iteration,we have:

$$A[0] \leq A[1] \leq ...\leq A[i-1] \leq A[i],A[i+1],....,A[n-1]$$

After iteration,we can have:

$$A[0] \leq A[1] \leq ...\leq A[i-1] \leq A[i] \leq A[i+1],....,A[n-1]$$

**Termination:** We can get a sorted array:

$$A[0] \leq A[1] \leq A[2] ..... \leq A[n-1]$$

**PROVEMENT ENDS**

### REFERENCES

[Loop Invariants](http://www.cs.miami.edu/home/burt/learning/Math120.1/Notes/LoopInvar.html)

[loop invariants lecture uofs](http://www.cs.uofs.edu/~mccloske/courses/cmps144/invariants_lec.html)

[wikipedia loop invariants](https://en.wikipedia.org/wiki/Loop_invariant)

[Stackoverflow what-is-a-loop-invariant](https://stackoverflow.com/questions/3221577/what-is-a-loop-invariant)

