---
title: 数据结构
router: computer
comments: false
top: false
cover: false
toc: true
mathjax: true
date: 2024-11-07 10:28:32
summary:
archives:
tags:
  - 数据结构
categories:
  - computer
  - 算法
---

## 介绍

**数据结构**即数据元素相互之间存在的一种或多种特定关系集合。用于组织、管理和存储数据，目的是提高数据操作的效率。

基本数据结构有：数组、栈、队列、链表、树、图、散列表（hash）、堆

从存储方式来看，数据结构的**基本存储**方式只有两种：数组（顺序存储）和链表（链式存储）。

<!-- more -->

## 数组

一组相同类型的数据的集合，存储在连续的内存中。（对于一部分编程语言而言，数组的内存空间是固定的，如 C）

数组元素支持随机访问（索引）。但是数组元素的插入和删除相对复杂，需要对操作位置后的数组元素进行移动操作。

```JS
// JS 增删
const array = [1, 2, 4, 5];
array.splice(2, 0, 3);  // 在索引 2 位置添加元素 3， array [1, 2, 3, 4, 5]
array.splice(1, 2);     // 从索引 1 开始删除两个元素， array [1, 4, 5]

const array = [1, 2, 3, 4, 5];
const newArray = array.slice(0, 2);  // newArray 为 [3, 4, 5]，array 不变
```

### 栈

一种后进先出（LIFO）的数据结构，常用于表达式求值、历史记录等

```JS
// JS 实现栈
const array = [1, 2];
array.push(1);  //  [1, 2, 3]
array.pop();  //  [1, 2]
```

### 队列

一种先进先出（FIFO）的数据结构，常用于消息队列、BFS 等

```JS
// JS 实现队列
const array = [2, 3];
array.unshift(1);  //  [1, 2, 3]
array.shift();  //  [2, 3]
```

> 也可以用链表实现栈或队列


## 链表

由节点组成的线性集合，每个节点包含数据和指向下一个节点的指针。

由于链表的节点通过指针连接，位置不一定连续，不存在数组的扩容问题，但不支持随机访问。


### 树

是一种层次结构，无环图，可以用链表来实现子节点之间的链接。

一般树的遍历可以用递归来实现

```JS
function traverse(root: TreeNode) {
    // ... 前序遍历
    traverse(root.left)
    // ... 中序遍历
    traverse(root.right)
    // ... 后序遍历
}
```

### 图

网络结构，节点间任意连接，树和链表都可以看作图的特例

图的遍历方式主要有两种：**深度优先算法**（DFS, Depth-First Search）和 **广度优先算法**（BFS, Breadth-First Search）。

深度优先算法（DFS）沿着图的某一路径尽可能深入下去，直到无法继续，然后回溯到上一个节点再继续搜索。
这种遍历方式使用栈来保存遍历路径，一般使用递归实现。用来查找图的连通分量、拓扑排序等

```JS
// dfs
function dfs(node) {
    if (visited.has(node)) {
        return
    }
    visited.add(node)

    // ... operation

    for (const neighbor of node) {
        dfs(node);
    }
}
```


广度优先算（BFS）按层次遍历图，先访问起始节点，然后访问其所有邻居节点，再逐层向外扩展
一般用来寻找最短路径、层次遍历等

```JS
// bfs
function bfs(node) {
    const visited = new Set()
    let queue=[node]

    while (queue.length) {
        const node = queue.shift();
        
        // ... operation

        for (const neighbor of node) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
```

## 散列表

哈希表通过哈希函数将键映射到数组的索引，实现快速查找、插入和删除操作。

在 JavaScript 中，散列表（哈希表）可以通过 Object 或 Map 实现。


## 堆

堆是一种特殊的完全二叉树。二叉堆是一种完全二叉树，具有以下特点：
- 每层节点从左到右依次填满，没有跳跃的空位。
- 除了最后一层，其他层都是满的。

所以堆通常用数组来实现，二叉堆可以非常自然地映射到数组中，且数组实现可以有效利用内存空间，避免额外的指针开销。

### 索引关系

在数组中存储堆时，假设根节点在索引 0，则每个节点的索引位置满足以下关系：
 - 父节点索引为 i，则：
    - 左子节点索引为 2 * i + 1
    - 右子节点索引为 2 * i + 2
 - 子节点索引为 i，则：
    - 父节点索引为 (i - 1) / 2


```JS
// 小顶堆
// 堆插入
function heapInsert(val) {
    heap.push(val)
    let idx=heap.length-1;
    while(idx>0) {
        let parent=Number.parseInt((idx-1)/2)
        if (heap[parent] <= heap[idx]) break;

        [heap[parent], heap[idx]] = [heap[idx], heap[parent]]
        idx=parent;
    }
}

// 堆删除，只能删除最小值，即第一个值
// 先交换数组第一个和最后一个值，然后通过父子之间的比较、交换来获取极值
function heapDelete() {
    let len=heap.length-1;
    [heap[0], heap[len]] = [heap[len], heap[0]]
    const val=heap.pop()

    let idx=0;
    while((2*idx+1)<len) {
        let left=2*idx+1, right=2*idx+2
        if (heap?.[left]>=heap[idx] && ((heap?.[right] ?? Infinity)>=heap[idx])) break;

        let smallestIdx = heap[left] < (heap?.[right] ?? -Infinity) ? left : right;
        [heap[smallestIdx], heap[idx]] = [heap[idx], heap[smallestIdx]];
        idx=smallestIdx;
    }
    return val;
}
```