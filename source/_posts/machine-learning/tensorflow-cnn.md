---
title: Tensorflow训练多层卷积神经网络
date: 2017-05-22
mathjax: true
categories: 机器学习
tags:
	- CNN
	- 卷积
	- tensorflow
---

来自官方例子：[Deep MNIST for Experts](https://www.tensorflow.org/get_started/mnist/pros)

在阅读之前确保自己已经理解了[MNIST For ML Beginners](https://www.tensorflow.org/get_started/mnist/beginners)

## 理解卷积 Convolution

**原始定义：**设f,g在R上可积,定义新函数h满足以下特性：

$$h(x)=(f*g)(x) =\int_{-\infty}^{+\infty} f(t)g(x-t) {\rm d}t$$

则称h是f和g的卷积。

Wiki百科上有一个非常形象的图解来解释卷积：

> 它（卷积）是其中一个函数翻转并平移后与另一个函数的乘积的积分,是一个对平移量的函数。

这里有两个定义，翻转和平移，可以这么来理解这两个概念：

+ **翻转** g(t) 变成 g(-t)
+ **平移** g(-t) 向右平移x个单位，变成g(x-t)

这里就不贴图了，直接上[Wiki百科地址](https://zh.wikipedia.org/wiki/%E5%8D%B7%E7%A7%AF)。看下面的图解，就能理解卷积函数所谓的翻转和平移了。另外有[卷积Flash演示](https://graphics.stanford.edu/courses/cs178/applets/convolution.html)。

推荐一个知乎问题：[在定义卷积时为什么要对其中一个函数进行翻转？](https://www.zhihu.com/question/20500497)；这篇知乎阐述了卷积的起源。

### 卷积的离散定义

根据卷积的连续定义，很容易就能理解卷积的离散定义：

$$h(x)=(f*g)(x) =\sum_{k=-\infty}^{+\infty} f(k) g(x-k)  $$

$$s.t.(x,k\in Z)$$

参考总结的博文：[我对卷积的理解](http://mengqi92.github.io/2015/10/06/convolution/) 中输液的例子就能深刻理解卷积的离散定义。给出以下例子进行理解：

### 二维中的卷积

一维的卷积搞清楚了，二维的就好说了。

参考总结的博文：[我对卷积的理解](http://mengqi92.github.io/2015/10/06/convolution/) 中对二维卷积的理解。

### 图像处理中的卷积

参考[图像处理（卷积）作者太棒了](http://blog.sina.com.cn/s/blog_4bdb170b01019atv.html)

### 总结

理解卷积，就要理解卷积的四个核心概念：

+ （翻转）（图像处理中很多情况不用翻转？）
+ 移动
+ 乘积
+ 求和

## 理解卷积神经网络

参考博文：[看图判断口袋妖怪属性，学会用卷积神经网络分类（教程+代码）](https://zhuanlan.zhihu.com/p/25868154)

推荐视频教程：[卷积神经网络与图像识别](http://v.youku.com/v_show/id_XMjgzNzk5Njk3Ng==.html?spm=a2h0k.8191407.0.0&from=s1.8-1-1.2)

### 卷积

卷积的关键理解在前面一章已经阐述过。这里讲解卷积在卷积神经网络中的使用。

tensorflow中卷积的写法如下：

```python
def conv2d(x, W):
  return tf.nn.conv2d(x, W, strides=[1, 1, 1, 1], padding='SAME')

x_image = tf.reshape(x, [-1, 28, 28, 1])
h_conv1 = tf.nn.relu(conv2d(x_image, W_conv1) + b_conv1)
```

查看conv2d的官方解释：

> Computes a 2-D convolution given 4-D input and filter tensors.
>
> Given an input tensor of shape [batch, in_height, in_width, in_channels] and a filter / kernel tensor of shape [filter_height, filter_width, in_channels, out_channels], this op performs the following:
>
> 1. Flattens the filter to a 2-D matrix with shape `[filter_height * filter_width * in_channels, output_channels]`.
> 2. Extracts image patches from the input tensor to form a *virtual* tensor of shape `[batch, out_height, out_width, filter_height * filter_width * in_channels]`.
> 3. For each patch, right-multiplies the filter matrix and the image patch vector.

>#### Args:
>
>- **input**: A `Tensor`. Must be one of the following types: `half`, `float32`. A 4-D tensor. The dimension order is interpreted according to the value of `data_format`, see below for details.
>- **filter**: A `Tensor`. Must have the same type as `input`. A 4-D tensor of shape`[filter_height, filter_width, in_channels, out_channels]`
>- **strides**: A list of `ints`. 1-D tensor of length 4. The stride of the sliding window for each dimension of `input`. The dimension order is determined by the value of `data_format`, see below for details.
>- **padding**: A `string` from: `"SAME", "VALID"`. The type of padding algorithm to use.

**strides** 步长（每个维度上的移动步长）默认就是[1,1,1,1]了。

**padding** 填充算法，卷积核在边缘移动时，没有数据对应情况下的填充算法。

### 池化

一张图就能直观解释池化：

![img](http://img.blog.csdn.net/20130918153655515?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc2lsZW5jZTEyMTQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

为什么要池化？64*64的图片你算得算半天，池化可以有效提取特征并减少计算，而且池化可以防止过拟合。

### Relu激活函数

Relu激活函数如图所示：

![img](http://images.cnitblog.com/blog2015/678029/201504/241900156879853.png)

图中还有一个softplus公式，公式如下：

$$Softplus(x) = log(1+e^x)$$

[为什么ReLu要好过于tanh和sigmoid function?](https://www.zhihu.com/question/29021768/answer/43517930)

## Tensorflow实战

### tf.reshape

**tf.reshape(tensor, shape, name=None)** 
函数的作用是将tensor变换为参数shape的形式。 
其中shape为一个列表形式，特殊的一点是列表中可以存在-1。**-1代表的含义是不用我们自己指定这一维的大小**，函数会自动计算，但列表中只能存在一个-1。（当然如果存在多个-1，就是一个存在多解的方程了）

官方例子帮助理解：

```python
# tensor 't' is [1, 2, 3, 4, 5, 6, 7, 8, 9]
# tensor 't' has shape [9]
reshape(t, [3, 3]) ==> [[1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9]]

# tensor 't' is [[[1, 1], [2, 2]],
#                [[3, 3], [4, 4]]]
# tensor 't' has shape [2, 2, 2]
reshape(t, [2, 4]) ==> [[1, 1, 2, 2],
                        [3, 3, 4, 4]]

# tensor 't' is [[[1, 1, 1],
#                 [2, 2, 2]],
#                [[3, 3, 3],
#                 [4, 4, 4]],
#                [[5, 5, 5],
#                 [6, 6, 6]]]
# tensor 't' has shape [3, 2, 3]
# pass '[-1]' to flatten 't'
reshape(t, [-1]) ==> [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]

# -1 can also be used to infer the shape

# -1 is inferred to be 9:
reshape(t, [2, -1]) ==> [[1, 1, 1, 2, 2, 2, 3, 3, 3],
                         [4, 4, 4, 5, 5, 5, 6, 6, 6]]
# -1 is inferred to be 2:
reshape(t, [-1, 9]) ==> [[1, 1, 1, 2, 2, 2, 3, 3, 3],
                         [4, 4, 4, 5, 5, 5, 6, 6, 6]]
# -1 is inferred to be 3:
reshape(t, [ 2, -1, 3]) ==> [[[1, 1, 1],
                              [2, 2, 2],
                              [3, 3, 3]],
                             [[4, 4, 4],
                              [5, 5, 5],
                              [6, 6, 6]]]

# tensor 't' is [7]
# shape `[]` reshapes to a scalar
reshape(t, []) ==> 7
```

### 正态分布取随机值

##### tf.truncated_normal(shape,mean=0.0,stddev=1.0)

从**截断**的正态分布中输出随机值。 
生成的值服从具有指定平均值和标准偏差的正态分布，如果生成的值大于平均值2个标准偏差的值则丢弃重新选择。

在正态分布的曲线中，横轴区间（μ-σ，μ+σ）内的面积为68.268949%。 
横轴区间（μ-2σ，μ+2σ）内的面积为95.449974%。 
横轴区间（μ-3σ，μ+3σ）内的面积为99.730020%。 
X落在（μ-3σ，μ+3σ）以外的概率小于千分之三，在实际问题中常认为相应的事件是不会发生的，基本上可以把区间（μ-3σ，μ+3σ）看作是随机变量X实际可能的取值区间，这称之为正态分布的“3σ”原则。 
在tf.truncated_normal中如果x的取值在区间（μ-2σ，μ+2σ）之外则重新进行选择。这样保证了生成的值都在均值附近。

参数:

- shape: 一维的张量，也是输出的张量。
- mean: 正态分布的均值。
- stddev: 正态分布的标准差。
- dtype: 输出的类型。
- seed: 一个整数，当设置之后，每次生成的随机数都一样。
- name: 操作的名字。

##### tf.random_normal(shape,mean=0.0,stddev=1.0)

从正态分布中输出随机值。 
参数:

- shape: 一维的张量，也是输出的张量。
- mean: 正态分布的均值。
- stddev: 正态分布的标准差。
- dtype: 输出的类型。
- seed: 一个整数，当设置之后，每次生成的随机数都一样。
- name: 操作的名字。

```python
a = tf.Variable(tf.random_normal([2,2],seed=1))
b = tf.Variable(tf.truncated_normal([2,2],seed=2))
init = tf.global_variables_initializer()
with tf.Session() as sess:
    sess.run(init)
    print(sess.run(a))
    print(sess.run(b))

输出：
[[-0.81131822  1.48459876]
 [ 0.06532937 -2.44270396]]
[[-0.85811085 -0.19662298]
 [ 0.13895047 -1.22127688]]
```

