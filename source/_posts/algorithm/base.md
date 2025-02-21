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
tags:
 - computer 
categories: 
 - 算法
---


## 前言

算法是编程的核心。算法是指解决特定问题的一系列明确的指令步骤。

<!-- more -->

### 排序算法

排序算法是将一组数据序列按照一定的规则（如 从小到大）进行重新排列的算法。

常见的排序算法有：

1.冒泡排序 (Bubble Sort)
通过重复比较相邻的元素，如果顺序错误就交换位置，从而让较大的元素逐渐“冒泡”到序列的尾部。时间复杂度为 {% mathjax %} O(n^2) {% endmathjax %}，适用于小规模数据的排序。

2.选择排序 (Selection Sort)
每次从未排序的部分中选出最小的元素，放到已排序部分的末尾。时间复杂度为 {% mathjax %} O(n^2) {% endmathjax %}，不稳定，适用于小规模数据。

3.插入排序 (Insertion Sort)
将每个元素插入到已排序部分的适当位置。时间复杂度为 {% mathjax %} O(n^2) {% endmathjax %}，但在数据量小或部分有序的情况下效率较高。

4.归并排序 (Merge Sort)
采用分治法，将序列分成两个子序列，分别排序后合并。时间复杂度为 {% mathjax %} O(n \log{n}) {% endmathjax %}，是稳定排序算法。

5.快速排序 (Quick Sort)
通过选择一个“基准”元素，将序列分成两部分，一部分小于基准，一部分大于基准，然后递归排序。平均时间复杂度为 {% mathjax %} O(n \log{n}) {% endmathjax %}，不稳定。

6.希尔排序 (Shell Sort)
基于插入排序，通过分组和逐步缩小间隔来减少元素的移动次数。时间复杂度因实现而异，通常在 {% mathjax %} O(n^{1.3}) {% endmathjax %} 左右。

7.堆排序 (Heap Sort)
利用堆这种数据结构，将序列构建成一个最大堆，每次取出堆顶元素（最大值）并调整堆结构。时间复杂度为 {% mathjax %} O(n^2) {% endmathjax %}，不稳定。

8.计数排序 (Counting Sort)
适用于已知数据范围的整数排序，通过统计元素出现次数来确定其位置。时间复杂度为 {% mathjax %} O(n+k) {% endmathjax %}，稳定。

9.基数排序 (Radix Sort)
将每个数字按位（从低位到高位）进行排序，适合整数排序。时间复杂度为 {% mathjax %} O(d \times (n+k)) {% endmathjax %}，其中 是位数。

10.桶排序 (Bucket Sort)
将元素分布到多个桶中，每个桶内排序，然后合并桶。时间复杂度平均为 {% mathjax %} O(n) {% endmathjax %}，适用于数据分布均匀的情况。



### 字符串匹配

字符串匹配是指在一段文本串 s 查找特定子串 pattern 的位置。假设 m 是模式串长度，n 是文本串长度。

1.暴力匹配算法（Brute Force / BF 算法）
从文本的第一个字符开始，将模式串依次与文本串的每个子串进行比较。若不匹配则移动一个字符继续比较。时间复杂度为 {% mathjax %} O(n \times m) {% endmathjax %}

2.RK 算法（Rabin-Karp 算法）
使用哈希函数计算模式串和文本子串的哈希值，将哈希值相同的子串视为可能匹配。若哈希值相同，再进行精确匹配验证。
时间复杂度平均为 {% mathjax %} O(n + m) {% endmathjax %}，最坏情况为 {% mathjax %} O(n \times m) {% endmathjax %}

3.BM 算法（Boyer-Moore 算法）
从模式串的末尾字符开始进行比较，若不匹配则利用坏字符规则和好后缀规则进行跳跃，从而跳过尽量多的字符。
时间复杂度一般为 {% mathjax %} O(n / m) {% endmathjax %}，最坏情况为 {% mathjax %} O(n \times m) {% endmathjax %}

4.KMP 算法（Knuth-Morris-Pratt 算法）
通过部分匹配表（next 数组）来避免重复比较。模式串在匹配失败时，根据前缀与后缀的匹配信息跳过部分字符，从而提高查找效率。
时间复杂度为 {% mathjax %} O(n + m) {% endmathjax %}



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


