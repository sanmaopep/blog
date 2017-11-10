---
title: React基于事件委托的双向绑定
date: 2017-10-22
layout: false
categories: 前端开发
---

在解决React双向绑定的时候,网上的代码要不就用乱七八糟的库，要么就handleChange一个组件一个组件慢慢写，非常麻烦。这里给出一个比较简单的办法：

**事件冒泡模型**是我们都耳熟能详的，在这里我们就用到了事件冒泡。**在底层一个不知道名称的input发生了onchange事件，那个这个事件可以冒泡到顶层的某个div或者别的DOM元素当中。**这个方法的解决思路就是，只需要捕获顶层元素的onChange事件，根据他的event.target就能知道是哪个input发生了变化。

我们先写了一个工具函数：

```javascript
// This function can bind a form with a state in component(key -> name)

// usage like:
// import FormChangeBind from '../assisst/changeForm.js'
// <Form className="inbox" ref='loginForm' onChange={FormChangeBind.bind(this)}>
// and use name in your form:
// <Input type="text" placeholder="请输入用户名" name="username"></Input>
// when you change the form ,you can clearly see some change in your state in component
// enjoy

export default function changeForm(event) {
    event.persist();
    this.setState(state => {
        state[event.target.name] = event.target.value;
        if (event.target.type == "checkbox") {
            state[event.target.name] = event.target.checked;
        }
    });
}
```

在组件中的Render中的代码如下：

```html
<Form className="inbox" ref='loginForm' onChange={FormChangeBind.bind(this)}>
    <label className="controlLabel">用户名</label>
    <Input type="text" placeholder="请输入用户名" name="username"></Input>
    <label className="controlLabel">密码</label>
    <Input type="password" placeholder="请输入密码" name="password"></Input>
    <div className="formline">
        <Checkbox name="rememberMe"></Checkbox>
        <label htmlFor="">记住我</label>
        <a className="fr" href="#">忘记密码</a>
    </div>
    <div className="divider"></div>
    <a className="btn primary" onClick={this.clickLogin.bind(this)}>登录</a>
    <a className="btn second" href="#">注册</a>
</Form>
```

构造函数中制定state内容和input的name保持一致：

```javascript
constructor() {
  super();
  this.state = {
    username: '',
    password: '',
    rememberMe: false
  }
}
```



