---
title: D3入门
categories: 大数据
---

## 什么是D3

> **D3** allows you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. 
>
> D3 is not a monolithic framework that seeks to provide every conceivable feature. Instead, D3 solves the crux of the problem: efficient manipulation of documents based on data. 

D3和Echarts等框架不同之处在于，D3主要解决基于数据的DOM操作方法，而不是提供一个完整地可视化解决方案。D3提供了很多数据转换的函数，方便你进行DOM操作与绘图，但是本身并不进行绘图。虽然麻烦，但是D3让我们更加灵活地实现各种可视化应用。

## Selections

> Modifying documents using the [W3C DOM API](https://www.w3.org/DOM/DOMTR) is tedious.

基于数据操作DOM的时候，直接进行W3C的DOM API操作需要写大量代码，毕竟对数据的遍历往往离不开for循环：

```javascript
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
  var paragraph = paragraphs.item(i);
  paragraph.style.setProperty("color", "white", null);
}
```

针对批量重复操作DOM的痛点，D3提出了一个selections的概念：

> D3 employs a declarative approach, operating on arbitrary sets of nodes called *selections*. 

前面需要写for循环的代码就可以非常简单地写成：

```javascript
d3.selectAll("p").style("color", "white");
// 对单个DOM节点的操作也可以进行：
d3.select("body").style("background-color", "black");
```

## Dynamic Properties

D3可以通过函数的方法来改变DOM中对应的属性或者style：

```javascript
d3.selectAll("p").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
// 通过.data传入数据：
d3.selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
// 根据index控制奇数偶数的颜色
d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#eee";
});
```

D3.js本身提供了很多的相关函数来帮助我们进行数据可视化：

```javascript
svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
```

## Enter和Exit

> Using D3’s *enter* and *exit* selections, you can create new nodes for incoming data and remove outgoing nodes that are no longer needed.

当我们将数据绑定到selection上的时候，每一个对应的DOM元素只能对应一个特定的数据。

> If there are fewer nodes than data, the extra data elements form the enter selection

当有data数据有多的时候，enter选择器会选择到这些多的数据。

```javascript
d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("p")
    .text(function(d) { return "I’m number " + d + "!"; });
```

> A common pattern is to break the initial selection into three parts: the updating nodes to modify, the entering nodes to add, and the exiting nodes to remove.

下面的代码既考虑到了数据多的问题，也考虑到了数据少的问题。当数据少DOM节点多的时候，exit会选择到那些多出的节点并进行移除。

```javascript
// Update…
var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
    .text(function(d) { return d; });

// Enter…
p.enter().append("p")
    .text(function(d) { return d; });

// Exit…
p.exit().remove();
```

觉得不太好理解?console.log大法看一下enter和exit到底是什么鬼：

```javascript
data = [1,2,3,4,5,6]
let update = d3.select(".chart")
  .selectAll("div")
    .data(data);
console.log("update",update)
console.log("enter",update.enter())
console.log("exit",update.exit())
```

update返回一个数组：

```javascript
[div, div, div, div, div, div]
```

数据多的时候enter也是返回一个数组：

```json
[{__data__: 1},{__data__: 2}，{__data__: 3}，{__data__: 4}，{__data__: 5}，{__data__: 6}]
```

数据不够的（假设.chart下面已经有了7个div）时候exit返回一个数组：

```json
[empty*6,div]
```

## Transition

大部分可视化图表都有着各种各样的渐变效果，这些都可以通过D3的transition函数实现：

```javascript
d3.selectAll("circle").transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr("r", function(d) { return Math.sqrt(d * scale); });
```

## 参考资料

[d3 official introduction](https://d3js.org/#selections)

[d3官方指南](https://github.com/d3/d3/wiki/Tutorials)

