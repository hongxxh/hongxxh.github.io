---
title: 从 requestAnimationFrame 看 JS Event Loop
comments: false
top: false
cover: false
toc: true
mathjax: true
date: 2025-02-19 14:23:55
router: js
summary:
archives:
tags:
 - web
categories:
 - JavaScript
---

### 什么是 Event Loop？

JavaScript 的 Event Loop 主要是指执行环境（如浏览器或 Node.js）中处理事件和异步回调的机制。
Event Loop 是一个持续运行的循环，负责执行代码、收集和处理事件以及执行队列中的子任务。 - from MDN

> JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. 

<!-- more -->

### Event Loop 执行机制

JavaScript 是单线程语言，会使用一个调用栈（Call Stack）来管理执行中的函数。
当一个函数被调用时，它会被压入栈中，执行完成后，函数会被从栈中弹出。如果栈为空，事件循环会检查是否有待处理的事件。

事件（如I/O 操作、定时器、UI rendering、异步等）会被放入一个消息队列。这些事件会按照**某种顺序**排队等待执行。

HTML 规范中定义：
> An event loop has one or more task queues. A task queue is a set of tasks.

事件循环的顺序：
1. 执行栈（Call Stack）为空。
2. 检查并执行**所有微任务队列**中的任务。
3. 如果有 task，将一个 task 从消息队列中取出并推入调用栈执行。
4. 渲染更新（如果有的话）。
5. 重复循环。


### 事件的优先级

事实上，将事件笼统地分为 macroTask（宏任务） 和 microTask（微任务）是一种不严谨的认知。规范中仅定义了 Task

> A task is anything scheduled to be run by the standard mechanisms such as initially starting to execute a script, asynchronously dispatching an event, and so forth. Other than by using events, you can enqueue a task by using setTimeout() or setInterval().

HTML 规范定义了 microTask（微任务），而 *The microtask queue is not a task queue.*
换句话说，所有非 microTask 的事件都是 task，即平常说的 macroTask（宏任务）。但这个 macroTask 在官方定义里名为 **task**。


#### 那 task 队列里的事件的优先级是怎么样的呢？

规范里说“A task queue is a set of tasks.”，所以，调用顺序并不是队列的“先进先出”。

每一个事件都有其特定的执行时机，常见的 task 执行顺序是：
I/O 操作 -> requestAnimationFrame -> timers（setTimeout, setInterval）


每执行一个 task，便会清空 microtask 队列，所以，如果同时存在 microtask，执行顺序是：
I/O 操作 -> microtasks -> requestAnimationFrame -> timers（setTimeout, setInterval）


**requestAnimationFrame**
window.requestAnimationFrame() 方法要求浏览器在下一次重绘之前，调用用户提供的回调函数。



```js
// 按钮点击
document.getElementById("btn").addEventListener("click", () => {
    console.log(Date.now() , ":", 'click')
});

// timers
setTimeout(() => {
    console.log(Date.now() , ":", "timers");
}, 0);

// microtask
Promise.resolve().then(() => {
    console.log(Date.now() , ":", "microtask");
});

// requestAnimationFrame
requestAnimationFrame(() => {
    console.log(Date.now() , ":", "requestAnimationFrame");
});
```

在 chrome 执行环境下，上述几个事件的调用顺序无论如何调整，都是

click -> microtask -> requestAnimationFrame -> timers

