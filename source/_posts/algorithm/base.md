---
title: 基础类算法
router: computer
date: 2024-11-06 17:57:00
comments: false
top: false
cover: false
toc: true
mathjax: true
summary:
archives:
tags: 算法
categories: 算法
---


## 前言

算法是编程的核心。算法是指解决特定问题的一系列明确的指令步骤。

<!-- more -->

### 二分法

二分法是最常见的算法之一。要求数组元素已按升序或降序排列。每次迭代能将搜索范围缩小一半，时间复杂度为 𝑂(log 𝑛)，相较于线性查找的 𝑂(𝑛)，效率更高。

```JS
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    // 注意 [left, right] 的区间，这里是包含
    while (left<=right) {
        const mid = left + Math.floor((right - left) / 2);

        if (arr[mid] === target) {
            return mid; // 找到目标值，返回索引
        } else if (arr[mid] < target) {
            left=mid+1; // 目标在右半部分
        } else {
            right=mid-1; // 目标在左半部分
        }
    }

    return -1; // 目标值不存在
}
```