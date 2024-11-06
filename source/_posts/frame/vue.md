---
title: Vue 使用过程中遇到的坑
top: false
cover: false
toc: true
mathjax: true
date: 2020-03-12 11:20:50
summary:
archives:
tags: ["Vue", "JavaScript"]
categories: 技术
---

### DOM 使用

#### 同一个组件中两个 form 表单相互影响

问题描述：同一个组件中，两个 v-if 的 form 表单，共享某个检验规则，prop 值不同，但其中一个的规则检验提示也会在另一个表单显示。
解决：给两个表单分别加 key 值。
原因：没有这个属性的时候， Vue 应用 in-place patch（就地复用）策略。一般的作用在列表里的顺序发生改变的时候，比如 shuffle（列表打乱）的时候，Vue 为了提升性能，不会移动 dom 元素，只是更新相应元素的内容节点。
而在 v-if 中，切换 DOM 结构时也可以用来打破复用。
