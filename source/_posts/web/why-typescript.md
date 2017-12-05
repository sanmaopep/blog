---
title: 为什么要用typescript
date: 2017-12-05
categories: 前端开发
---

代码的可维护性直接影响我们写代码的幸福感！！!要知道，现在是敏捷开发的年代，代码要不断地进行迭代更新，每天产品经理都会提一堆的需求、issue、bug给你让你在原来代码的基础上去实现。这时候快速写完代码并不能提高你的幸福感，可维护性才是！

## 优势一：记住一个东西到底格式是什么

后台程序员过来和我们说，他们添加了一个让的接口，于是我们在我们专门管理接口的js文件中加了这么一个函数：

```javascript
export function startProgram(pid,option){
  return api.post(base + `/program/${pid}/start`,option);
}
```

这时候你可能感觉不到什么，当我们在组件里面要调用这些函数的时候，我们会产生疑惑，这个option到底是什么呢：

```javascript
function onClick(){
  ...
  api.startProgram(1,{里面有哪些东西呀});
}
```

于是我们打开后台给我们的接口文档，找到了他们给我们的接口描述，原来需要两两个字符串分别是env和work！我们开心获取了这两个东西，写在了option里面：

```javascript
function onClick(){
  ...
  let option = {}
  option.env = "_(:з」∠)_";
  option.work = "(✺ω✺)";
  api.startProgram(1,option);
}
```

我们高兴地完成了这个需求。过了几天，产品经理跑过来和我们说，当我们点击另外一个按钮的时候也能启动一些程序。我们理所当然地想到了我们封装过的startProgram，不错，这个需求几分钟就能做好了(*^▽^*)。不，等等，糟糕，option我忘掉是什么了_(:з」∠)_ 于是又苦逼地去查API文档，查到option有哪些东西了，一个一个对应地补上去，终于完成了这个需求。

![](http://img.youbiaoqing.com/u/a69ec5781123a6a5107fcf1dba42169a.jpg)

这时候你应该发现不太对劲了。记得写Java的时候，option会被强制定义为一个属性定好的类：

```java
class StartProgramOption {
  private string env;
  private string work;
  /*一堆setter和getter*/
}

/*一堆代码*/
void startProgram(StartProgramOption option){
  /*一堆代码*/
}
/*一堆代码*/
```

写java的时候觉得这是多此一举，很烦。Javascript不用自己新定义一个类，多好！可是现在发现，Java这种写法维护性更高，你在功能迭代复用代码的时候，你不需要去查一下option有哪些东西，Eclipse等IDE会人性化地告诉你一切，不用再去查文档了！

可惜，JavaScript不能告诉你有哪些东西，但是TypeSciprt做到了！

```typescript
export function startProgram(pid :number,option: { env: string,work:string }){
  return api.post(base + `/program/${pid}/start`,option);
}
```

好了，安心了，每次不知道option是什么，再也不用去跑十万八千里翻阅API文档啦！

![](http://upload.didown.com/picture/0307/14888848155_big.jpg)

我们还可以写得更舒服一点：

```typescript
interface start_option { 
  env: string,
  work:string 
}
export function startProgram(pid :number,
                              option: start_option ){
  return api.post(base + `/program/${pid}/start`,option);
}
```
这下子，万一没按option来，编译器会报错，全方位保证你每次使用启动程序的函数的时候没有忘掉某个东西。

如果option中某个属性是可选的呢？很简单，加个"？"：

```typescript
interface start_option { 
  env?: string,
  work:string 
}
```

同样的，在React中，我们经常会要知道一个组件对外提供的props到底有哪些。没有TypeScript的代码除了看文档，你只能在长长的组件的源代码中大海捞针地寻找this.props。有了Typescript，这些问题都可以轻松解决：

```typescript
interface Props{
  /*一堆属性*/
}
interface State{
  /*一堆属性*/
}
class Hello extends React.Component<Props, State> {
	/*一堆代码*/
}
```

## 优势二：不用为类型判断头疼

我们要包装一个工具函数。为了保证工具函数的可靠性（参数不会传乱七八糟的东西），我们就需要进行一堆的类型判断：

```javascript
utilFunc(list,num){
        if (Object.prototype.toString.call(list) !== "[object Array]") {
            return ; 
        }
  		if(typeof num !== "number"){
          	return ;
  		}
  		/*一堆代码*/
}
```

但是typescript，你可以轻松解决这个问题，你只需要：
```typescript
utilFunc(list:Array<any>,num :number){
  		/*一堆代码*/
}
```

清清爽爽，让代码更加专注于核心业务。

## 优势三：VSCODE丝滑般体验

typescript会让vscode的智能提示更加聪明，很多东西通过强类型的方式定义好，在我们使用的时候可以节省大量的时间。

另外很多优秀的插件，需要typescript的强类型的基础才能运行：

自动生成import： [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)

![](https://gifyu.com/images/autoimport.gif)

快速生成interface ：[json2ts](https://marketplace.visualstudio.com/items?itemName=GregorBiswanger.json2ts)

![](https://github.com/GregorBiswanger/VSCode-json2ts/blob/master/images/json2ts.gif?raw=true)

## 总结

>动态语言一时爽，代码一多地雷场
>动态语言一时爽，代码重构火葬场
>动态语言一时爽，文档丢失心发慌

约束带来的是更大的自由！欢迎使用TypeScript！

## 参考文献

[知乎 为什么要用Typescript](https://www.zhihu.com/question/64563945)

[知乎 vscode中好用的插件](https://www.zhihu.com/question/40640654)

