# setup

## 01.props
`props` 是 setup 中第一个参数，props 是响应式的，当传入新的 prop 时，它将被更新。

props 不能用 ES6 解构，否则会消除 props 的响应性。需要解构 prop，可以在 setup 中使用 `toRefs` 来完成。

```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
```

## 02.context
`context` 是第二个参数，是一个普通的 JavaScript 对象，暴露了可能在 setup 中有用的值。context 不是响应式的，可以进行 ES6 解构。
```js
setup(props, context) {
  // 非响应式对象，=$attrs
  console.log(context.attrs)

  // 插槽，=$slots
  console.log(context.slots)

  // 触发事件，$emit
  console.log(context.emit)

  // 暴露公共 property
  console.log(context.expose)
}
```

## 03.组件的property
执行 `setup` 时，组件实例未被创建。因此，只能访问以下 property。
- props
- attrs
- slots
- emit

也就是不能访问以下组件：
- data
- computed
- methods
- refs

