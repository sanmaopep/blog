---
title: Tensorflow入门笔记
date: 2017-05-20
categories: 机器学习
---

## Tensorflow原理

**背景：** Python和C++来回切换会造成巨大开销。

>To do efficient numerical computing in Python, we typically use libraries like [NumPy](http://www.numpy.org/)that do expensive operations such as matrix  multiplication outside Python, using highly efficient code implemented in another language. Unfortunately, there can still be a lot of overhead from switching back to Python every operation. This overhead is especially bad if you want to run computations on GPUs or in a distributed manner, where there can be a high cost to transferring data.
<!-- more -->
**解决方案：** 利用Python基于Graph定义所有运算，然后让这些一次性在Python外完成这些运算。

>TensorFlow also does its heavy lifting outside Python, but it tahttps://www.tensorflow.org/get_started/mnist/proskes things a step further to avoid this overhead. Instead of running a single expensive operation independently from Python, TensorFlow lets us describe a graph of interacting operations that run entirely outside Python. This approach is similar to that used in Theano or Torch.
>
>The role of the Python code is therefore to build this external computation graph, and to dictate which parts of the computation graph should be run. See the [Computation Graph](https://www.tensorflow.org/get_started/get_started#the_computational_graph) section of [Getting Started With TensorFlow](https://www.tensorflow.org/get_started/get_started) for more detail.

## Tensorflow常用API说明

### Session

> TensorFlow relies on a highly efficient C++ backend to do its computation. The connection to this backend is called a session.The common usage for TensorFlow programs is to first create a graph and then launch it in a session.

**总结：** 用于和C++高性能计算模块**会话**的类

在入门教程中，我们使用

```python
import tensorflow as tf
sess = tf.InteractiveSession()
```

### Tensor

中文名称张量，可以查看知乎上关于这个问题的解释：[什么是张量](https://www.zhihu.com/question/20695804)。实际上可以将其理解为一个矩阵，Tensorflow中的基本单位

查看以下代码：

```python
import tensorflow as tf
# What is Tensor?
ta = [0,0,0,0];
ta[0] = tf.placeholder(tf.float32,[None,784])
ta[1] = tf.zeros([5,5],tf.float32)
print (ta)
```
输出以下结果：

```shell
/usr/bin/python2.7 /home/maoyiwei/桌面/Tensorflow/playground/play.py
[<tf.Tensor 'Placeholder:0' shape=(?, 784) dtype=float32>, <tf.Tensor 'zeros:0' shape=(5, 5) dtype=float32>, 0, 0]
```

### Placeholder

可以理解为用于存储输入数据（训练数据）的Tensor。格式如下：

> placeholder(    dtype,    shape=None,    name=None)

```python
x = tf.placeholder(tf.float32, shape=(1024, 1024))
```

### Variables

字面意思。在Tensorflow中意义如下：

>A `Variable` is a value that lives in TensorFlow's computation graph. **It can be used and even modified by the computation.** In machine learning applications, one generally has the model parameters be`Variable`s.

```python
W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))
```

Variable要进行初始化，步骤如下：

> Before `Variable`s can be used within a session, they must be initialized using that session. This step takes the initial values (in this case tensors full of zeros) that have already been specified, and assigns them to each `Variable`. This can be done for all `Variables` at once:

``` python
sess.run(tf.global_variables_initializer())
```

### tf.matmul(x,W)

矩阵相乘(x*W)：详细看文档：

>Matmul(a,b) Return:
>
>A Tensor of the same type as a and b where each inner-most matrix is the product of the corresponding matrices in a and b, e.g. if all transpose or adjoint attributes are False:
>
>output[..., i, j] = sum_k (a[..., i, k] * b[..., k, j]), for all indices i, j.

### tf.reduce_XXX

查看文档，解释如下：

> Computes the XXXX of elements across dimensions of a tensor.

主要参数如下：

```python
reduce_mean(
    input_tensor, # 输入的tensor
    axis=None, # 维度
    # keep_dims=False,
    # name=None,
    # reduction_indices=None
)
```

>- **input_tensor**: The tensor to reduce. Should have numeric type.
>- **axis**: The dimensions to reduce. If `None` (the default), reduces all dimensions.

举例说明：

```python
# 'x' is [[1., 2.]
#         [3., 4.]]

tf.reduce_mean(x) ==> 2.5 #如果不指定第二个参数，那么就在所有的元素中取平均值
tf.reduce_mean(x, 0) ==> [2.,  3.] #指定第二个参数为0，则第一维的元素取平均值，即每一列求平均值
tf.reduce_mean(x, 1) ==> [1.5,  3.5] #指定第二个参数为1，则第二维的元素取平均值，即每一行求平均值
```

常用的API如下：

+ reduce_mean 平均值
+ reduce_max 最大值
+ reduce_min 最小值
+ reduce_sum 求和

[为什么要命名Reduce呢？](https://stackoverflow.com/questions/43394402/why-does-tensorflow-uses-reduce-in-reduce-max-reduce-min-reduce-sum-etc) Stackoverflow上对这个问题的解释为：

>Reduce is just a name for a family of operations which are used to create a single object from the sequence of objects, repeatedly applying the same binary operation.

### tf.nn

一些激活函数、卷积函数等，源代码中注释如下：

```python
"""## Activation Functions

The activation ops provide different types of nonlinearities for use in neural
networks.  These include smooth nonlinearities (`sigmoid`, `tanh`, `elu`,
`softplus`, and `softsign`), continuous but not everywhere differentiable
functions (`relu`, `relu6`, and `relu_x`), and random regularization
(`dropout`).
```

### tf.train

训练方法（训练损失函数）。直接上代码理解会更好一点。

```python
# define a math model
print('make model')
# 占位符（你的数据）
x = tf.placeholder(tf.float32,[None,784])
W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))
y = tf.nn.softmax(tf.matmul(x,W) + b)

# train it
print('train it')
# 占位符（预测数据）
y_ = tf.placeholder(tf.float32,[None,10])
# 计算交叉熵
cross_entropy = tf.reduce_mean(-tf.reduce_sum( y_*tf.log(y),reduction_indices=[1]))
# 使用梯度下降法
train_step = tf.train.GradientDescentOptimizer(0.55).minimize(cross_entropy)
sess = tf.InteractiveSession()
tf.global_variables_initializer().run()
for _ in range(1000):
	# print('抓取100个随机数据训练')
  	batch_xs, batch_ys = mnist.train.next_batch(100)
	# print(x,y)
  	sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})
```

这个feed_dict和placeholder相互对应。

记住这两句话：

```python
train_step = tf.train.GradientDescentOptimizer(0.55).minimize(cross_entropy)

sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})
```

额外说明一下sess.run。可以传入tf.train或者tensor，如下面评价模型就是输入tensor的例子，此时sess.run返回tensor的计算结果。

```python
# Evaluating our Model
print('start to evaluate')
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
print(sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels}))
```

其中tf.cast用于数据转换。

## Addition

另外找一个很好玩的网站[Tinker With a **Neural Network** in Your Browser.](http://playground.tensorflow.org/)