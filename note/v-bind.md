# v-bind 指令

- [v-bind 指令的作用](#1-作用)
- [v-bind 绑定 class 属性](#2-绑定-class-属性)
- [v-bind 绑定 style 属性](#3-绑定-style-属性)
- [v-bind 绑定 src 属性](#4-绑定-src-属性)
- [v-bind 修饰符](#5-v-bind-修饰符)


# 1. 作用
`v-bind` 指令可以绑定 `HTML` 标签属性，例如 `class`，`style` 等属性。`v-bind` 为属性绑定变量，只要对变量进行操作，就可以完成对标签相应属性进行操作。


# 2. 绑定 class 属性
通过绑定 `class` 属性，可以动态切换 `class` 属性值。

例如，当变量 `isColor` 和 `isSize` 为 `true` 时 `textColor` 和 `textSize` 就会添加到 `class` 属性列表中，反之则会从中删除。

```html
<div 
  :class="{
    'textColor': isColor, 
    'textSize': isSize
  }"
></div>
```
```js
createApp({
  setup() {
    let isColor = ref(true);
    let isSize = ref(true);
    return {
      isColor,
      isSize
    }
  }
}).mount('#app');
```


# 3. 绑定 style 属性
使用 `v-bind` 可以动态绑定 `style` 属性。

例如，通过变量 `realColor` 来设置字体，通过变量 `realSize` 来设置字体大小。

```html
<div 
  :style="{
    'textColor': realColor, 
    'textSize': realSize
  }"
></div>
```
```js
createApp({
  setup() {
    let realColor = ref('blue');
    let realSize = ref('20px');

    return {
      realColor,
      realSize
    }
  }
}).mount('#app')
```


# 4. 绑定 src 属性
通过 `v-bind` 绑定 `src` 属性，可以动态修改链接地址。例如，对于 `<img>` 标签，可以实现动态改变图片。

```html
<img :src="imgurl"/>
```
```js
createApp({
  setup() {
    let imgUrl = ref('...');

    return {
      imgUrl
    }
  }
}).mount('#app');
```


# 5. v-bind 修饰符
- #### .prop
  作为 `DOM property` 进行绑定，而不是 `attribute` 。`v-bind` 默认绑定在 `arrtribute` 上。[DOM property 和 attribute](https://juejin.cn/post/6844903874143191047)

- #### .camel
  将属性名转化为骆峰命名形式。

- #### .sync
  当一个子组件改变了一个 `prop` 的值时，这个变化也会同步到父组件中所绑定。
  