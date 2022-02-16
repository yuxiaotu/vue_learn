# v-bind 指令


## 01. 作用
`v-bind` 指令可以绑定属性，例如 `class`，`style` 等属性，便于对标签属性进行操作。

### 01.1. 绑定 class 属性
通过绑定 `class` 属性，可以动态切换 `class`。

例如，isColor 为 `true` 时 textColor 和 textSize 就会添加到 `class` 属性列表中，反之则会从中删除。
```html
<div :class="{'textColor': isColor, 'textSize': isSize}"></div>
```
```js
var app = new Vue({
  el: '#app';
  data: {
    isColor: true,
    isSize: true
  }
})
```

### 01.2. 绑定 style 属性
动态绑定 `style` 属性。
```html
<div :style="{'textColor': realColor, 'textSize': realSize}"></div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    realColor: 'blue',
    realSize: '20px';
  }
})
```

### 01.3. 绑定 src 属性
动态修改链接地址。例如动态改变图片。
```html
<img :src="imgurl"/>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    imgurl: '...'
  }
})
```



## 02. v-bind 修饰符
- #### .prop
  作为 DOM property 绑定，而不是 attribute 绑定。`v-bind` 默认绑定在 arrtribute 上。

- #### .camel
  将属性名转化为骆峰命名形式。

- #### .sync
  当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。
  