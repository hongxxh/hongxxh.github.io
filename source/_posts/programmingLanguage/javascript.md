---
title: 鸿蒙系统开发语言
comments: true
top: false
cover: false
toc: true
mathjax: true
date: 2024-11-14 15:38:49
router: programming
summary:
archives:
tags: 
 - programming
categories:
 - programming
---

### 前言

2024年10月22日，华为正式发布了 HarmonyOS NEXT（版本号 5.0，又名鸿蒙星河版）。HarmonyOS NEXT 使用自主设计的鸿蒙微内核，仅支持鸿蒙系统的原生应用程序。

ArkTS 是鸿蒙生态的应用开发语言，基于 TypeScript 作为超集（而 TypeScript 是 JavaScript 的超集），进一步规范强化静态检查和分析，同时，提供了声明式 UI 范式、状态管理支持等相应的能力。

<!-- more -->


### 那为什么众多新兴编程语言会选择 JS 做为基础？

可能有以下原因

- **拥有广泛的开发者基础**：JavaScript 是全世界最受欢迎的编程语言之一，拥有大量的开发者和丰富的生态系统。如 Web 前端、后端（Node.js）、桌面应用开发（Electron）等。这为新语言带来了大量潜在的用户群体，也降低了开发者的学习成本。

- **学习曲线较低**：相比很多底层语言，JavaScript 的语法简单明了，在开发体验上更加直观友好。

- **实时响应**：JavaScript 的事件驱动和异步编程模型，非常适合需要实时交互的应用场景（即 I/O 密集型应用 ）。如果将 APP 视为一整个浏览器应用，开发者可以无缝衔接到新开发中。



### 对比

浅比较一下三个开发平台，ArkTS、 Kotlin、 Swift 的开发差别

```JS
// ArkTS - 声明式 UI 组件
@Component
struct Counter {
    @State count: number = 0
    
    build() {
        Column() {
            Text(`计数: ${this.count}`)
                .fontSize(20)
            
            Button("增加")
                .onClick(() => {
                    this.count++
                })
        }
    }
}
```

ArkTS 采用声明式语法，使用装饰器(@Component, @State)管理组件和状态。
语法简单直观，但是这是有代价的。增加了一层框架抽象层（即在原生系统 API 和开发者代码之间增加的中间层），运行时需要 JS 引擎解释执行，性能会有一定损耗。


```JAVA
// Kotlin - Android UI示例
class MainActivity : AppCompatActivity() {
    private var count = 0
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        findViewById<Button>(R.id.incrementButton).setOnClickListener {
            count++
            findViewById<TextView>(R.id.counterText).text = "计数: $count"
        }
    }
}

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    ...

    <!-- 显示计数的 TextView -->
    <TextView
        android:id="@+id/counterText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Count: 0"
        ...

    <!-- 增加计数的 Button -->
    <Button
        android:id="@+id/increaseButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="增加" />
        ...

</LinearLayout>
```

虽然 Kotlin 允许使用代码来创建 UI（通过 Jetpack Compose），XML 仍然有其存在的必要性


```Swift
// Swift - iOS UI
class ViewController: UIViewController {
    private var count = 0
    private let counterLabel = UILabel()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let button = UIButton(type: .system)
        button.setTitle("增加", for: .normal)
        button.addTarget(self, action: #selector(incrementCount), for: .touchUpInside)
        
        // 可选类型示例
        var name: String?
        if let unwrappedName = name {
            print("Hello, \(unwrappedName)")
        }
    }
    
    @objc private func incrementCount() {
        count += 1
        counterLabel.text = "计数: \(count)"
    }
}
```

ArkTS 和 Swift 都不支持类似 XML 的模板语言（像在 Android 开发中使用的 XML 布局）。
随着声明式 UI 构建方式的兴起，传统的 XML 模板语言的局限性逐渐显现，它们更加倾向于使用代码来管理 UI 和逻辑，从而提升开发效率、可维护性和性能。


### 其他

从 web 前端开发者的角度来看，ArkTS 显然充分考虑了当前热门的前端开发语言的优缺点、HarmonyOS 系统初诞生的生态构建的门槛等因素，从而选择了入门更为友好的 JavaScript 作为基础。

Kotlin 是一个强大的跨平台开发语言，特别适合 Android 开发和跨平台项目，适合需要多平台支持的开发者。ArkTS 和 Swift 都较为封闭。

从代码角度看，语言需要能提供支持模块化、高内聚和低耦合的功能。ArkTS 和 Kotlin 都提供了强大的函数式编程支持；而 ArkTS 也具备强大的面向对象编程能力。