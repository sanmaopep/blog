---
title: C++重载与虚函数
date: 2017-6-1
categories: 计算机基础
---

## Overload

```C++
class A {
public:
         void test(int);    
};
class B : public A {
public:
         void test(int, int);
};

void main()
{
       B b;
       
        b.test(5);  //错误，应该b.A::test(5);   
}
```

## Virtual Function

### Introduction

```C++
class A {
public:
        virtual void test(int);  
};

class B : public A {
public:
        void test(int);
};

class C : public A {
public:
        void test(int);
};

void main()
{
         A *a0;
         A &a1 = b;
         A &a2 = c;
         B  b;
         C  c;

         a0 = &b;
         a0.test(2);   //调用类B的test函数
         
         a0 = &c;
         a0.test(3);   //调用类C的test函数

         a1.test(4);   //调用类B的test函数
         a2.test(5);   //调用类C的test函数
}
```

### The Virtual "~"

A example that destructor of base class is not a "virtual" function:

```C++
class A
{
public:
    A() { ptra_ = new char[10];}
    ~A() { delete[] ptra_;}        // 非虚析构函数
private:
    char * ptra_;
};

class B: public A
{
public:
    B() { ptrb_ = new char[20];}
    ~B() { delete[] ptrb_;}
private:
    char * ptrb_;
};

void foo()
{
    A * a = new B;
    delete a;
}
```

when we call *delete a*,we will call ~A(not ~B actually).