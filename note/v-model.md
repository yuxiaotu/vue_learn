# v-model 指令

## 01. 作用
`v-model` 指令作用于表单元素例如 `<input>` 、`<textare>`，实现数据的「双向绑定」。

需要注意的是，「双向绑定」不能和「数据响应式原理」相混淆，数据响应式是通过数据的改变去驱动视图的渲染，而双向绑定不仅可以由数据来驱动 DOM 的渲染，当 DOM 改变时也促使数据改变。

当输入框中输入信息后，`message` 的值也会同步改变。

```html
<div>
  <p>{{message}}</p>
  <input v-model="message"/>
</div>
```

```js
var app = createApp({
  setup() {
    let message = ref();
    return { message };
  }
})
```



## 02. 原理
`v-model` 实际上是一个语法糖，涉及到 `v-bind` 和 `v-on` 这两个指令。上面的 `<input v-model="message">` 可以改写为以下内容。

```html
<input :value="message" @imput="message = $event.target.value">
```

其中 `$event.target.value` 是当前触发的事件的 DOM 的 `value` 值。由 `@input` 方法把当前元素的 `value` 值赋值给 `message`。

同时 `message` 也和 `<input>` 标签的 `value` 所绑定，由此形成一个闭环，实现双向绑定。



## 03. 组件中使用
在自定义组件中实现 `v-model`，`v-model` 作为语法糖应该满足方法名为 `imput`，属性名为 `value` 。

创建下面的自定义组件。
```js
Vue.component('my-component', {
  template: `
    <span>
      <input :value="value" @imput="$emit('input', $event.target.value)"/>
    </span>
  `
  props: ['value'];
})
```

```html
<my-component v-model="hellow"></my-component>
```

将传入组件的 `value` 值绑定到原生的 `imput` 标签的 `value` 上。然后使用 `$emit` 向外抛出一个 `input` 方法。



## 04. v-model 修饰符
- #### .lazy
  默认情况下，输入框中的数据和绑定的数据是同步的。通过 `.lazy` 修饰符可以实现当输入框失焦或者是按下回车键后再更新数据。

- #### .number
  将输入的值转换为数值类型。

- #### .tirm
  去掉字符首尾空格。
