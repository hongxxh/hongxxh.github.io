---
title: Taro 使用过程中遇到的坑
top: false
cover: false
toc: true
mathjax: true
date: 2019-08-30 18:59:13
summary:
archives:
tags:
    Taro
categories:
    技术
---
#### Taro 简介

Taro 是京东凹凸实验室的多端统一开发框架，支持用 React 的开发方式编写一次代码，生成能运行在微信/百度/字节跳动/支付宝/ QQ 小程序、快应用、 H5 、 React Native 等平台的应用。（~~官方说法~~）
产品要求同时开发 H5 和 小程序，我们考虑到维护和开发效率的问题，决定选择多端统一的开发框架，比较了下目前开源的一些框架，选择了最为可靠的 Taro （~~嗯，就是 star 数最多~~）。

##### 这段话很值得思考~ 
<!-- more --> 
京东高级前端开发工程师程帅老师说，前端开发框架的本质，当前所有流行的前端框架，抛开使用和实现层面的差异，以及一系列兼容性和性能优化层面的考虑，最终都要回归到 DOM 的操作上。也就是说，只要能够在小程序实现框架所需的 DOM/BOM 的 API ，那就能够将这些前端框架运行在小程序上。而各端小程序处于安全等层面的考虑，都没有把 DOM/BOM API 暴露出来，从而导致各种前端框架无法直接在小程序上运行。
Taro 就是给基于小程序的运行时实现了一套 DOM/BOM 的 API，并将这一套 API 和小程序的渲染机制结合起来，从而实现了将各种语法的前端框架运行在小程序上。

#### 微信小程序的坑

小程序跟 h5 还是有挺大的不同的。Taro 即使号称是统一框架，有些地方也需要特别的处理。

##### Taro CSS 样式不支持伪元素和伪类

微信小程序是支持伪元素和伪类的，但 Taro 中是不支持的。当然，如果写了 H5 中是生效的。

##### 各组件 CSS 共用问题

微信小程序默认组件 CSS 相互独立，所以只能通过增加 props 控制 className 的方式来改变在不同组件中的样式。

##### 组件销毁问题

子组件的阶段 componentUnmont 无效，如果有类似 window.listener 之类的需要销毁，只有页面级 componentDidHide 实现

##### 小程序内嵌 WebView 通信问题

**大坑！**
1. 小程序的 WebView 只能在特定时机（小程序后退、组件销毁、分享）才能拿到消息
2. 小程序使用 WebView 的外链都得注册，且得写入特定的小程序安全代码（确实安全多了...
如果某些操作只能使用 WebView 完成，如支付之类的，建议引导去浏览器或者。类似俄罗斯套娃，先套一个本站的页面，再套一个外部页面，完成操作后后退...

#### JS 的坑

##### JS 浮点数运算问题

JS 存储浮点数机制: 采用的是 IEEE 754 定义的 64 位双精度浮点型来表示。在浮点数运算时，由于计算机无法准确表示大部分小数，而导致精度问题。
1. 先对运算的数据全部取整，再通过挪小数点来复原。（这个对乘法运算比较适用）
2. \* 1000  -> 运算 -> / 1000。（注意，这个方法，如果小数较多时也会出现计算差错。）
3.  Math 库。（终极方案）

##### fetch 异步请求中断问题

fetch 没有 abort 方法。所以无法中断请求。
可以用 promise.race ，将所有请求加入 promise 数组，待某一个返回后，“抛弃”其余请求。

##### fetch 请求 cookie 问题

Taro 内置的是 fetch 请求。
```
By default, fetch won't send or receive any cookies from the server, resulting in unauthenticated requests if the site relies on maintaining a user session (to send cookies, the credentials init option must be set).
Since Aug 25, 2017. The spec changed the default credentials policy to same-origin. Firefox changed since 61.0b13.
```
是的，fetch 默认是不会携带 cookie，服务器返回的也不会自动写入，得配置 credentials，无关跨域与否，也无关 get 、 post 方法。