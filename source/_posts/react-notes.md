---
title: 《深入理解 React 技术栈》 - 读后感
top: false
cover: false
toc: true
mathjax: true
date: 2019-08-30 18:11:06
summary:
tags:
    深入理解 React 技术栈
    notes
    React
categories: 
    React
---
####W3C 的模板规范 Web Components
REACT 的三种创建实例方法：
1. `React.createClass` 最古老，兼容性最好
2.` ES6 classes。class xx extends Component{...}`
3. 无状态函数 `function xx({}){}` 。在适合的情况下，都应该且必须使用无状态组件。无状态组件不像上述两种方法在调用时会创建新实例，它创建时始终保持了一个实例（没有生命周期方法，当然，Recompose 可以通过添加状态，生命周期方法，上下文等来增强函数组件），避免了不必要的检查和内存分配，做到了内部优化。
React 中，数据都是自顶向下单向流动的，即从父组件到子组件。通过 props 传递。组件的 props 可以传递节点。React 有一个重要的内置 prop —children，即组件的子组件集合。 
React.cloneElement 用来克隆 ReactElement，返回一个新的元素。以下用法是等价的：
```
React.cloneElement(
  element,
  props,
  children
);
<element.type {...element.props} {...props}>{children}</element.type>
```

#####React 组件差别
nextElement|实际参数|结果
:-|:-:|:-:
null/false|空|创建 ReactDOMEmptyComponent 组件
object && type === string|虚拟 DOM|创建 ReactDOMComponent 组件
object && type !== string|React 组件|创建 ReactCompositeComponent 组件
string/number|字符串/数字|创建 ReactDOMTextComponent 组件

因为 dom 元素同样没有生命周期，ReactDOMComponent 会对传入的 div，span 等标签通过 switch 进行识别和处理，除此之外流程与 ReactDOMEmptyComponent ，ReactDOMTextComponent 基本相同。

ReactDOM：React 适用于移动端和 web 端，ReactDOM 就是 React 为了操作 web 端的方法。ReactDOM 的 API 非常少，只有 findDOMNode、unmountComponentAtNode 和 render。ReactDOM.render ：很重要，把 React 渲染的 Virtual DOM 渲染到浏览器的 DOM。
React中对于 DOM 操作，不仅可以使用 findDOMNode 获得该组件 DOM，还可以使用 refs 获得组件内部的 DOM 结构。（refs 会指向一个组件类的实例，所以可以调用该类定义的任何方法。直接查找 DOM 都是不推荐的）
不过，仍然有一些 DOM 操作是 React 无法避免或者正在努力避免的。比如，如果要调用 HTML5 Audio/Video 的 play 方法和 input 的 focus 方法， React 只能使用相应的 DOM 方法来实现。
React 提供了事件绑定的功能，但是仍然有一些特殊情况需要自行绑定事件，例如 Popup 等 组件，当点击组件其他区域时可以收缩此类组件。这要求对组件以外的区域(一般指 document 和 body)进行事件绑定。
React 中使用 DOM 最多的还是计算 DOM 的尺寸(即位置信息)。

####React 中的事件
React 基于 Virtual DOM 实现了一个 SyntheticEvent （合成事件，react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange这些都是合成事件）层，开发所定义的事件处理器会接收到一个 SyntheticEvent 对象的实例。所有事件都自动绑定到最外层上。如果需要访问原生事件对象，可以使用 nativeEvent 属性。
在 React 底层，主要对合成事件做了两件事：**事件委派和自动绑定**。
一、事件委派
在使用 React 事件前，一定要熟悉它的事件代理机制。它并不会把事件处理函数直接绑定到真实的节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大提升。
二、自动绑定
在 React 组件中，每个方法的上下文都会指向该组件的实例，即自动绑定 this 为当前组件。 而且 React 还会对这种引用进行缓存，以达到 CPU 和内存的最优化。在使用 ES6 classes 或者纯 函数时，这种自动绑定就不复存在了，需要手动实现 this 的绑定。
- bind 方法。this.func.bind(this, ...args)
- 构造器内声明
- 箭头函数
值得注意的是，在 React 中使用 DOM 原生事件时，一定要在组件卸载时手动移除，否则很可能出现内存泄漏的问题。而使用合成事件系统时则不需要，因为 React 内部已经帮开发者妥善地处理了。
React 合成事件系统的委托机制，在合成事件内部仅仅对最外层的容器进行了绑定，并且依赖事件的冒泡机制完成了委派。
用 reactEvent.nativeEvent. stopPropagation() 来阻止冒泡是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统中，且没办法阻止原生事件的冒泡。反之，在原生事件中的阻止冒泡行为，却可以阻止 React 合成事件的传播。
实际上，React 的合成事件系统只是原生 DOM 事件系统的一个子集。它仅仅实现了 DOM Level 3 的事件接口，并且统一了浏览器间的兼容问题。有些事件 React 并没有实现，或者受某些限制没办法去实现，比如 window 的 resize 事件。

input， select 等一些 DOM 结构在 React 被称为 **受控组件**。 React 受控组件更新 state 的流程：
(1) 可以通过在初始 state 中设置表单的默认值。
(2) 每当表单的值发生变化时，调用 onChange 事件处理器。
(3) 事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的 state。 
(4) setState 触发视图的重新渲染，完成表单组件值的更新。

####React 中的 CSS Modules
- 所有样式都是局部化的，解决了命名冲突和全局污染问题;
- class 名的生成规则配置灵活，可以以此来压缩 class 名;
- 只需引用组件的 JavaScript，就能搞定组件所有的 JavaScript 和 CSS;
CSS Modules 是使用 composes 来组合样式；
CSS Modules 的命名规范是从 BEM 扩展而来的。BEM 把样式名分为 3 个级别，具体如下
所示。
- Block:对应模块名，如 Dialog。
- Element:对应模块中的节点名 Confirm Button。
- Modifier:对应节点相关的状态，如 disabled 和 highlight。
BEM 最终得到的 class 名为 dialog__confirm-button--highlight。使用双符号 __ 和 -- 是为了与区块内单词间的分隔符区分开来。
CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则:
- 不使用选择器，只使用 class 名来定义样式;
- 不层叠多个 class，只使用一个 class 把所有样式定义好; 
- 所有样式通过 composes 组合来实现复用;
- 不嵌套。
由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本。
在 CSS Modules 中，外部覆盖局部样式，可以通过给组件关键节点加上 data-role 属性，然后通过 属性选择器来覆盖样式。
```
[data-role="xxx"] {
  // override style 
}
```
进一步，可以了解 [react-css-modules](https://github.com/gajus/react-css-modules)


#####React 生命周期
React 生命周期：挂载、渲染、卸载。无状态组件挂载时只是方法调用，没有新建实例。


