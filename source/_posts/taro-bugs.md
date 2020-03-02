---
title: Taro 使用过程中遇到的坑
top: false
cover: false
toc: true
mathjax: true
date: 2019-08-30 18:59:13
summary:
tags:
    Taro
    坑
categories:
    技术
---
#### Taro 简介
Taro 是京东凹凸实验室的多端统一开发框架，支持用 React 的开发方式编写一次代码，生成能运行在微信/百度/字节跳动/支付宝/ QQ 小程序、快应用、 H5 、 React Native 等平台的应用。（~~官方说法~~）
产品要求同时开发 H5 和 小程序，我们考虑到维护和开发效率的问题，决定选择多端统一的开发框架，比较了下目前开源的一些框架，选择了最为可靠的 Taro （~~嗯，就是 star 数最多~~）。

##### 这段话很值得思考~ 
京东高级前端开发工程师程帅老师说，前端开发框架的本质，当前所有流行的前端框架，抛开使用和实现层面的差异，以及一系列兼容性和性能优化层面的考虑，最终都要回归到 DOM 的操作上。也就是说，只要能够在小程序实现框架所需的 DOM/BOM 的 API ，那就能够将这些前端框架运行在小程序上。而各端小程序处于安全等层面的考虑，都没有把 DOM/BOM API 暴露出来，从而导致各种前端框架无法直接在小程序上运行。
Taro 就是给基于小程序的运行时实现了一套 DOM/BOM 的 API，并将这一套 API 和小程序的渲染机制结合起来，从而实现了将各种语法的前端框架运行在小程序上。

#### 然而，最重要的
在开发中遇到了几个坑。

##### Taro CSS 样式不支持伪元素和伪类

微信小程序是支持伪元素和伪类的，但 Taro 中是不支持的。如果写了 H5 中是生效的。

##### 各组件 CSS 共用问题

微信小程序默认组件内的 CSS 



##### 组件销毁问题

组件级 componentUnmont 不生效
只有页面级销毁 



##### JS 数字运算问题

浮点数

##### 小程序内嵌 WebView 通信问题

大坑！
内嵌 WebView


##### fetch 异步请求 中断，等问题



##### fetch 请求 cookie 问题

Taro 内置的是 fetch 请求。
By default, fetch won't send or receive any cookies from the server, resulting in unauthenticated requests if the site relies on maintaining a user session (to send cookies, the credentials init option must be set).
Since Aug 25, 2017. The spec changed the default credentials policy to same-origin. Firefox changed since 61.0b13.