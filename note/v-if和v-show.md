# v-if 和 v-show 指令

- [v-if 和 v-show 的作用](#1-作用)
- [v-if 和 v-show 的区别](#2-v-if-和-v-show-的区别)
- [v-else 和 v-else-if](#3-v-else-和-v-else-if)

# 1. 作用
`v-if` 和 `v-show` 都属于「条件渲染」指令，当指令表达式为 `true` 时会显示相关元素的内容，当条件为 `false` 时就会隐藏。两者在效果上是一致的。

例如，分别用 `v-if` 和 `v-show` 指令来实现当 `item` 为偶数时显示相关的内容。
```html
<div v-if="item % 2 = 0"></div>
```
```html
<div v-show="item % 2 = 0"></div>
```

# 2. v-if 和 v-show 的区别
- **v-if**
  使用 `v-if` ，当表达式条件为 `false` 时，相应的 `DOM` 节点将不会出现在 `DOM` 树上，不会渲染，从而达到隐藏元素的目的。

  `v-if` 在频繁切换时要进行重新渲染，要消耗更多的资源，所以可以使用在不需要频繁切换的地方。


- **v-show**
  使用 `v-show` ，当表达式条件为 `false` 时，相应的 `DOM` 节点依然存在，只是通过设置 `display:none` 来隐藏元素。

  `v-show` 要消耗更多的初始资源。适合使用在需要频繁切换的地方。


# 3. v-else 和 v-else-if
`v-else` 和 `v-else-if` 都是配套于 `v-if` 使用。用于判断是否渲染某一块元素，或者是渲染与之相对应的另一块元素。

- **v-else**
  
  ```html
  <div v-if="Math.random() > 0.5"> Number > 0.5 <div>
  <div v-else> Number <= 0.5 </div>
  ```
  
- **v-else-if**
  
  ```html
  <div v-if="type === 'A'"> A </div>
  <div v-else-if="type === 'B'"> B </div>
  <div v-else-if="type === 'C'"> C </div>
  <div v-else> Not A/B/C </div>
  ```