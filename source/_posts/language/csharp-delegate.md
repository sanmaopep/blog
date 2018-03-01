---
title: C#中的Delegate
categories: C#
---

# Delegate是什么

在讲Delegate之前，我们先回顾一下C++中的一个重要概念—函数指针。

函数指针是指向函数的指针变量，这个函数被指定了返回类型和形参列表，定义为：返回值类型 ( * 指针变量名) ([形参列表])。使用方法如下所示：

```c++
int max(int x,int y){return (x>y? x:y);}

int main()
{
    int (*ptr)(int, int);
    int a, b, c;
    ptr = max;
    scanf("%d%d", &a, &b);
    c = (*ptr)(a,b);
    printf("a=%d, b=%d, max=%d", a, b, c);
    return 0;
}
```





# Delegate的优势

明白了Delegate是什么以及它的使用方法，我们就来思考一下Delegate作为“函数指针”存在的优势何在。





