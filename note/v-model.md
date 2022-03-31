# v-model 指令

- [v-model 指令的作用](#1-作用)
- [v-model 指令的原理](#02-原理)
- [在组件中自定义一个 v-model](#03-在组件中使用-v-model-指令)
- [v-model 指令的修饰符](#04-v-model-指令的修饰符)


# 1. v-model 指令的作用
`v-model` 指令作用于表单元素，例如 `<input>` 、`<textare>`，实现数据的「双向绑定」。

需要注意的是，「双向绑定」不能和「数据响应式机制」相混淆，数据响应式是通过数据的改变去驱动视图的渲染，而双向绑定不仅可以由数据来驱动 `DOM` 的渲染，当 `DOM` 改变时也促使数据改变。

当输入框中输入信息后，`message` 的值也会同步改变。

```html
<div id="app">
  <p>{{ message }}</p>
  <input v-model="message"/>
</div>
```

```js
createApp({
  setup() {
    let message = ref();
    return { message };
  }
}).mount('#app');
```


# 2. v-model 指令的原理
`v-model` 实际上是一个语法糖，涉及到 `v-bind` 和 `v-on` 这两个指令。

`<input v-model="message">` 可以用 `v-bind` 和 `v-on` 改写为以下形式。

```html
<input :value="message" @imput="message = $event.target.value">
```

- `@input` 绑定方法，把当前元素的 `value` 值赋值给 `message` 变量。所以，在输入框中输入的内容会赋值给 `message`。

- `:value` 属性也绑定 `message` 变量，当 `message` 变量的值改变时，也会促使输入框的 `value` 属性改变，由此形成一个闭环，实现双向绑定。


# 3. 在组件中使用 v-model 指令
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


# 4. v-model 指令的修饰符
- #### .lazy
  默认情况下，输入框中的数据和绑定的数据是同步的。通过 `.lazy` 修饰符可以实现当输入框失焦或者是按下回车键后再更新数据。

- #### .number
  将输入的值转换为数值类型。

- #### .tirm
  去掉字符首尾空格。

  ```html
  <input v-model.lazy.tirm="message" />
  ```

