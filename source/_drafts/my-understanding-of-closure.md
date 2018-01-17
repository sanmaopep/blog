---
title: 闭包
date: 2017-10-26
categories: 前端开发
---

## Scope

作用域是理解闭包的一个重要概念。

> In computer programming, the scope of a name **binding** – an association of a **name** to an **entity**, such as a variable – is the **region** of a computer program **where the binding is valid**: where the name can be used to refer to the entity. 
>
> Such a region referred to as is  a **scope block**.
>
> 参考自[wiki百科 Scope (computer science)](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping)

scope又可以分为词法作用域（Lexical scope）和动态作用域(Dynamic scope)。两者区别与对**区域**这个概念的解读。Wiki百科对两者的解释如下：

> In languages with lexical scope (also called static scope), name resolution depends on the location in the source code and the **lexical context**, which is defined by where the named variable or function is defined. In contrast, in languages with dynamic scope the name resolution depends upon the program state when the name is encountered which is determined by the **execution context** or calling context. 
>
> 参考自[wiki百科 Scope (computer science)](https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping)

词法作用域具体参考这篇博文：[深入理解javascript原型和闭包（12）——简介【作用域】](http://www.cnblogs.com/wangfupeng1988/p/3991151.html)

## 对Closure的一些定义

> 各种专业文献上的"闭包"（closure）定义非常抽象，很难看懂。我的理解是，闭包就是能够读取其他函数内部变量的**函数**。
>
> 参考自[阮一峰 学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

> A *closure* is the **combination** of a function and the lexical environment within which that function was declared.
>
> 参考自[MDN Closure](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

MDN的定义指出了闭包需要的东西：**闭包 = 函数 + 函数定义的词法上下文环境**。阮一峰老师的定义指出了闭包产生的现象：一个函数能够**读取其他函数内部变量**。

> In programming languages, closures (also lexical closures or function closures) are **technique**s for implementing lexically scoped name binding in languages with first-class functions. 
>
> 参考自[wiki百科 Closure(computer programming)](https://en.wikipedia.org/wiki/Closure_(computer_programming))

wiki百科上的定义指出了闭包需要的语言条件： ***first-class functions***。关于这个知识点可以参考[“函数是一等公民”背后的含义](http://blog.leapoahead.com/2015/09/19/function-as-first-class-citizen/)。另外，定义中提到的*implementing lexically scoped name binding* ，即基于词法作用域的name绑定与scope中的binding概念相互照应。本质上就是说的就是词法作用域与变量有效性的关系。

> 在JavaScript中，实现外部作用域访问内部作用域中变量的**方法**叫做闭包。
>
> 参考自《深入浅出Node.js》

以上对闭包的定义都略有差别，有的将闭包定义为函数，有的将闭包定义为方法，也有将闭包定义为组合。我觉得将闭包理解为一个方法，或者某个东西都对。两种定义的方法都对我们理解闭包有帮助。

## JavaScript的闭包

我们都会遇到在一个外部函数套着一个内部函数的情况，比如说：

```javascript
function foo(x) {
    var tmp = 3;
    function b(y) {
        alert(x + y + (++tmp));
    }
  	b(2);
  	b(3);
}
foo(0);
```

在foo函数结束的时候，tmp就会被销毁。一般来说，当内部函数被return的时候，外部就可以引用内部的函数，闭包就会通过return而产生。如：

```javascript
function foo(x) {
    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);
```

按照我们原本的理解，在没有闭包的情况下，foo函数执行完，它内部的tmp变量就会被销毁，但是因为外部函数引用了内部的变量产生了闭包，内部函数的词法上下文没有被销毁，tmp变量也没有被销毁。

当然，也有不用闭包的return的例子，比如利用setInterval或者绑定一个事件等等方法：

```javascript
function a(){
  var temp = 0;// let也可以
  function b(){
    console.log(temp++);
  }
  // setInterval可以产生闭包
  setInterval(b,1000);
  // 绑定可以产生闭包
  window.addEventListener('click',b);
  // ajax传入callback可以产生闭包
  ajax(b);
  // 或者直接把这个函数传给window或者其它函数外部的元素
  window.closure = b;
}
a();
```

可以看到，只要内部函数有机会在函数外部被调用，或者说**内部函数被外部的某个变量引用**，就会产生闭包。就像《深入浅出Node.js》中提到的那样：

> 闭包是JavaScript中的高级特性，利用它可以产生很多巧妙的效果。它的问题在于，一旦有变量**引用**了这个中间函数，这个中间函数不会释放，同时也使得原始作用域不会得到释放。作用域中产生的内存占用也不会被释放。除非不再有引用，才会逐步释放。
>
> 参考自 《深入浅出Node.js》

## 实践中的闭包

```javascript
 // 通用排序处理器，自动分析并处理多种类型的排序
sortHandler(key) {
  return function (arec, brec) {
    let a = arec[key], b = brec[key]
    // 先判断是不是日期
    const dataRegex = /^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}:\d{2}$/
    if (dataRegex.test(a) && dataRegex.test(b)) {
      return new Date(a) - new Date(b);
    }
    // 是否是string
    if (a.length >= 0 && b.length >= 0) {
      return a.length - b.length
    }
    // 适用于number
    return a - b;
  }
}
```





## 参考资料

1. [动态作用域和词法域的区别是什么？](https://www.zhihu.com/question/20032419)
2. [“函数是一等公民”背后的含义](http://blog.leapoahead.com/2015/09/19/function-as-first-class-citizen/)
3. [js闭包的概念作用域内存模型](http://www.cnblogs.com/walter-white/p/4981151.html)
4. [阮一峰 学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
5. [javascript基础拾遗——词法作用域](http://www.cnblogs.com/Quains/archive/2011/04/12/2013121.html)
6. [深入理解javascript原型和闭包（12）——简介【作用域】](http://www.cnblogs.com/wangfupeng1988/p/3991151.html)
