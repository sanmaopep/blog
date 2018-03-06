---
title: 统计学习方法 笔记与习题 第二章
categories: 机器学习
tags:
	- 李航
---

# 知识点梳理

## 相关概念

###超平面 Hyperplane

n维欧氏空间中余维度为一（维度n-1）的子空间，平面中的直线，空间中的平面都属于超平面。

### 欧氏空间的点到超平面的距离

公式为：
$$\frac{w \cdot x_0+b}{||w||}$$
推导步骤：

<!-- more -->![](./lh-solution-chap-2/hyperplaneDistance.jpg)



# 课后习题答案

## 2.1

**题目描述：**Minsky和Papert指出：感知机是线性模型，所以不能表示复杂的函数。如异或（XOR），验证感知机为什么不能表示异或。

**解：**异或的输入输出如下：

| $x^{(1)}$ | $x^{(2)}$ | $y$  |
| --------- | --------- | ---- |
| 1         | 1         | -1   |
| 1         | -1        | 1    |
| -1        | 1         | 1    |
| -1        | -1        | -1   |
接下来我们简单证明一下异或操作的线性不可分性：

**证：**利用反证法，假设存在一个超平面$wx+b=0$，满足条件：

$$ y(w\cdot x+b)>0$$

$$\forall x\in{\{(1,1)^{T},(-1,1)^{T},(1,-1)^{T},(-1,-1)^{T}\}}$$

根据异或的输入输出，可以得到以下四个不等式：

$$w^{(1)}+w^{(2)}+b < 0 \dashrightarrow(1)$$
$$w^{(1)}-w^{(2)}+b > 0\dashrightarrow(2)$$
$$-w^{(1)}-w^{(2)}+b < 0 \dashrightarrow(3)$$
$$-w^{(1)}+w^{(2)}+b > 0\dashrightarrow(4)$$

(1)式+(3)式可得：$b<0$，但是(2)式+(4)式可得：$b>0$ 。矛盾，故不存在超平面满足线性可分条件。

## 2.2

**题目描述：**模仿例题 2.1，构建从训练数据求解感知机模型的例子。

**解：**很水的一道题，用jupyter撸了一遍[代码](https://github.com/sanmaopep/machine-learning/blob/master/%E7%BB%9F%E8%AE%A1%E5%AD%A6%E4%B9%A0%E6%96%B9%E6%B3%95/%E6%84%9F%E7%9F%A5%E6%9C%BA.ipynb)：

```python
import numpy as np
import random
import matplotlib.pyplot as plt
```


```python
# 定义输入数据
tx = [[3,3],[4,3],[1,1]]
ty = [+1,+1,-1]


# 作图
tcolor = [0]*len(ty)
for i in range(len(ty)):
    tcolor[i] = ('r' if ty[i] == +1 else 'b')
    
print(tcolor)
transpose = np.array(tx).T

plt.scatter(transpose[0],transpose[1],c=tcolor)
plt.axis([0, 5, 0, 5])
plt.show()
```

    ['r', 'r', 'b']



![数据集分布情况](lh-solution-chap-2/output_2_1.png)



```python
# 定义原始形式的感知机
class Perceptron():
    def __init__(self):
        self.learning_rate = 1
    
    def train(self,x,y):
        # 定义w和b
        w = np.array([1]*len(x[0]))
        b = 1
        print "w，b初始值："
        print w,b
        
        # 正确个数
        correct_flag = [0]*len(x)
       
        while 1:
            # 从训练集中拿一个数据
            index = random.randint(0, len(x) - 1)
            if correct_flag[index]:
                continue
            X = np.array(x[index])
            Y = y[index]
            
            # 是否分类正确
            temp = Y*(np.sum(w*X) + b)
            if temp > 0:
                correct_flag[index] = 1
                # print("点(%d,%d)分类正确" % (X[0],X[1]))
                if np.sum(correct_flag) >= len(x):
                    print("所有点分类正确，结束迭代")
                    break
            else:
                correct_flag = [0]*len(x)
                print("点(%d,%d)分类错误" % (X[0],X[1]))
                w = w + self.learning_rate*Y*X
                b = b + self.learning_rate*Y
                print "对w，b进行调整："
                print w,b
        
        self.w = w
        self.b = b
    
    def getWb(self):
        return self.w,self.b
                

p = Perceptron()
p.train(tx,ty)
```

    w，b初始值：
    [1 1] 1
    点(1,1)分类错误
    对w，b进行调整：
    [0 0] 0
    点(1,1)分类错误
    对w，b进行调整：
    [-1 -1] -1
    点(4,3)分类错误
    对w，b进行调整：
    [3 2] 0
    点(1,1)分类错误
    对w，b进行调整：
    [2 1] -1
    点(1,1)分类错误
    对w，b进行调整：
    [1 0] -2
    所有点分类正确，结束迭代



```python
# 作图
w,b=p.getWb()
# 构造直线
# 注意，垂直的处理！
if w[1] == 0:
    y=np.linspace(0,5,100)  #这个表示在0到5之间生成100个x值
    x=[-(w[1]*i+b)/w[0] for i in y]  #对上述生成的1000个数循环用sigmoid公式求对应的y
else:
    x=np.linspace(0,5,100)  #这个表示在0到5之间生成100个x值
    y=[-(w[0]*i+b)/w[1] for i in x]  #对上述生成的1000个数循环用sigmoid公式求对应的y

plt.plot(x,y)
plt.scatter(transpose[0],transpose[1],c=tcolor)
plt.axis([0, 5, 0, 5])
plt.show()
```


![数据集分类结果](lh-solution-chap-2/output_4_0.png)

## 2.3

**题目描述：**证明以下定理：样本集线性可分的充分必要条件是正实例点所构成的凸壳与负实例点所构成的凸壳互不相交。

**凸壳的定义：**设集合$S \in R^{n}$ 是由$R^{n}$ 的k个点所组成的集合，即$S = \{x_{1},x_{2},...,x_{k}\}$。定义S的凸壳$conv(S)$为

$$conv(S)=\{ x= \sum^{k}_{i=1}{\lambda_{i}x_{i}}  | \sum_{i=1}^{k}{\lambda_{i}=1},\lambda_{i}\geq0,i=1,2,...,k     \}$$

**解：** 这个证明对我来说还是太难了(ㄒoㄒ)，最后还是参（shan）考（zhai）了大神的解法。[凸包与线性可分](http://blog.csdn.net/y954877035/article/details/52210734)。

凸壳可以通过以下图形理解：

![](lh-solution-chap-2/lh2.png)

维基百科上有一句话也非常形象地解释了凸壳：

> 在二维欧几里得空间中，凸包(凸壳)可想象为一条刚好包着所有点的橡皮圈。
>
> From Wiki百科

必要性的证明不难，老老实实从定义出发。不相交很难表述，所以再用反证法就可以了。充分性的证明就难了，难点在与如何通过凸壳不相交构造出一个超平面使得这个超平面满足线性可分性。在这里我们通过“距离”这个定义巧妙地构造出我们需要的超平面。

下面我们开始证明，设数据集T中的正例点集为S+，负实例点集为S-。S+的凸壳为conv(S+)，S-的凸壳为conv(S-)。

**必要性证明：**（线性可分->凸壳不相交）

如果数据集T是线性可分的，则存在超平面将S+和S-完全分离：

我们令$(w\cdot x_i+b)=\epsilon_i \dashrightarrow (1)$ 

那么对于$\forall x_i \in S+$，有$\epsilon_i > 0$，对于$\forall x_i \in S-$，有$\epsilon_i <  0$，

利用反证法，我们假设存在一个点s既属于S+，也属于S-。**（证明关键点）**

S点可以表示为：$s= \sum^{k}_{i=1}{\lambda_{i}x_{i}} \dashrightarrow (2)$，其中 

$$ \sum_{i=1}^{k}{\lambda_{i}=1},\lambda_{i}\geq0,i=1,2,...,k $$

将(1)、(2)联立，可以得到：

$$ws = \sum_{i=1}^{k}{ (\lambda_i\epsilon_i-\lambda_ib )} = \sum_{i=1}^{k}{ \lambda_i\epsilon_i-b }  \dashrightarrow  ws+b =  \sum_{i=1}^{k}{ \lambda_i\epsilon_i } $$

因为$s \in S+$，所以$\epsilon_i>0$，故$w \cdot s+b>0$。同时$s \in S-$，所以$\epsilon_i<0$，故$w\cdot s+b<0$ 。

矛盾，所以不存在一个点s既属于S+，也属于S-。即正例的凸壳和负例的凸壳不相交。**（必要性证毕）**

**充分性证明：**（凸壳不相交->线性可分）

定义空间中两点$x_1$和$x_2$的距离为欧氏距离（向量相减的二范数），记为：$d(x_1,x_2)$，定义凸壳conv(S+)和conv(S-)的距离为：

$$d(conv(S+),conv(S-))=min(d(s_+,s_-)) ,s_+ \in S+,s_- \in S-$$

我们先证明一个引理：

**引理：**我们从S+和S-中分别取出一个点$x_+$和$x_-$，使得他们满足：$d(conv(S+),conv(S-)) = d(x_+,x_-)$。那么对于任意的$x^+ \in S+$，$x^- \in S-$。我们有：

$$d(x^+,x_+) < d(x^+,x_-) ，d(x^-,x_+) > d(x^-,x_-)$$

![引理的几何图解](lh-solution-chap-2/yl.png)

**引理证明：** 我们只考虑$x^+$的情况，$x^-$的证明留（lan）给（de）读（zheng）者（ming）。为了方便记述，我们令$x=x^+ \in S+$ ，于是有$d(x,x_+) < d(x,x_-) $ 。同时记：$a=d(x,x_+) ,b=d(x,x_-) ,c=d(conv(S+),conv(S-))=d(x_+,x_-)$

利用反证法，假设：$d(x,x_+)\geq d(x,x_-)$

容易得到：$a\geq b>c$

作图如下：

![引理证明](lh-solution-chap-2/ylprove.png)

由余弦定理：

$$cos\theta = \frac{a^2+c^2-b^2}{2ac} >0 $$

作$x_-$到a的垂线，记为A。容易得到：

$$A = \frac{c*cos\theta}{a}(x_+-x) + x = \frac{c*cos\theta}{a}x_+ + (1-\frac{c*cos\theta}{a})x$$

$$ 0<\frac{c*cos\theta}{a} <1, 0<(1-\frac{c*cos\theta}{a})<1$$

故$A \in S_+$

而$d(A,x_-) = sin\theta c < c = d(conv(S+),conv(S-))$

这与凸壳距离的定义矛盾。故$d(x,x_+) > d(x,x_-)$

**(引理证毕)**

回到充分性的证明上来。我们现在构造一个超平面$w\cdot x+b=0$，其中：

$$w=2(x_+-x_-)$$

$$b=x^2_--x^2_+$$

对于所有正例点$x^+$，有：

$$w\cdot x^+ +b = d(x_-,x^+)^2-d(x_+,x^+)^2>0$$

同样对于所有负例点：

$$w\cdot x^-+b <0$$

故该超平面满足线性可分性**（充分性证毕）**

**PS：** 充分性借鉴了凸优化的相关理论。关于凸优化相关知识可以参考知乎上的回答：[为什么凸优化这么重要？ - Ormsom的回答 - 知乎](https://www.zhihu.com/question/24641575/answer/164397294)。充分性证明也有采用凸集分离定理，这里不作阐述。

## 参考资料

[凸包与线性可分](http://blog.csdn.net/y954877035/article/details/52210734)

[李航第二章课后习题](http://blog.csdn.net/xiaoxiao_wen/article/details/54097835)

[感知机，从原理到实现](https://www.leiphone.com/news/201706/QFydbeV7FXQtRIOl.html)

[感知机代码实现](https://github.com/WenDesi/lihang_book_algorithm/blob/master/perceptron/binary_perceptron.py)

[点到超平面的距离推导](http://blog.csdn.net/yutao03081/article/details/76652943)