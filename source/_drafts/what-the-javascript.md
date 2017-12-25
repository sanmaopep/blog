---
title: JavaScript中的邪恶语法总结
---

参考视频链接：[What the... JavaScript? ](https://www.youtube.com/watch?time_continue=1157&v=2pL28CcEijU)。本文在视频的基础上进行了一些扩展。

1. **Number.MIN_VALUE代表一个“无穷小量”**，即最接近0的数。Number.MIN_VALUE不是负无穷大。

```javascript
Number.MAX_VALUE > 0 
// true
Number.MIN_VALUE < 0 
// false
Number.MAX_VALUE 
// 1.7976931348623157e+308
Number.MIN_VALUE
// 5e-324
```

2. **运算符会被优先识别为数字常量的一部分，然后才是对象属性访问运算符**，所以： 

```javascript
42.toFixed(3); // SyntaxError, 因为'.'被优先识别为数字常量42的一部分 
42..toFixed(3); // 42.000 
0.42.toFixed(3); // 0.420 
(42).toFixed(3); //42.000 
42 .toFixed(3); // 42.000 空格隔了一下，说明'.'不是数字常量的一部分

```

其中toFixed是Number原型链上面的方法

3. **数字前面加0代表8进制**

```javascript
0363 // 243的八进制
0xf3 // 243的十六进制的
```

ES6开始，严格模式不再支持`0363`八进制格式， 在ES6中应该使用`0o363`或者`0O363`， 但为了好辨认，无论八进制还是十六进制或者二进制等，统一使用小写：`0o363`, `0xf3`, `0b11110011`

4. \> 是运算符，运算的结果是true和false，在下面这种情况下容易出错：

```javascript
1 < 2 < 3 // true 
// 1 < 2 为 false，false转化为数字0与3比较，比较结果为true
3 > 2 > 1 // false
// 3 > 2 为 true ，true转化为数字1与1比较，比较结果为false
```

5. [],{}的神秘的类型转化

```javascript
[] == [] // false
[] == ![] // true
```

[] == [] 这个好理解. 当两个值都是对象 (引用值) 时, 比较的是两个引用值在内存中是否是同一个对象. 因为此 [] 非彼 [], 虽然同为空数组, 确是两个互不相关的空数组, 自然 == 为 false.

[] == ![] 这个要牵涉到 JavaScript 中不同类型 == 比较的规则, 具体是由相关标准定义的. ![] 的值是 false, 此时表达式变为 [] == false, 参照标准, 该比较变成了 [] == [ToNumber**](https://link.zhihu.com/?target=http%3A//www.ecma-international.org/ecma-262/5.1/%23sec-9.3)(false), 即 [] == 0. 这个时候又变成了 [ToPrimitive**](https://link.zhihu.com/?target=http%3A//www.ecma-international.org/ecma-262/5.1/%23sec-9.1)([]) == 0, 即 '' == 0, 接下来就是比较 ToNumber('') == 0, 也就是 0 == 0, 最终结果为 true.

![](http://pics.sc.chinaz.com/Files/pic/faces/3896/00.jpg)

==判定的标准参考： [ECMAScript Language Specification # 11.9.3 The Abstract Equality Comparison Algorithm](https://link.zhihu.com/?target=http%3A//www.ecma-international.org/ecma-262/5.1/%23sec-11.9.3)。所以说，能用 === 千万不要用 ==，虽然大多数时候还是要用==进行偷懒_(:з」∠)_





## 参考资料

+ [What the... JavaScript? ](https://www.youtube.com/watch?time_continue=1157&v=2pL28CcEijU)
+ [关于js中的值](http://www.ituring.com.cn/article/497317)
+ [[] ==[] 为 false；[] == ![] 为 true；[] == {} 为 false；为什么？](https://www.zhihu.com/question/27981152)

