# 组合式 API 中的 setup

- [setup() 的作用](#setup-的作用)
- [setup() 的参数](#setup-的参数)

# 1. setup 的作用

- `setup()` 是一个接收 `props` 和 `context` 的函数，也是「组合式 API」的基础。
- `setup()` 在组件创建之前执行。所以在 `setup()` 中要避免使用 `this` 因为无法找到组件实例。
- `setup()` 会扮演生命周期中的 [beforeCreate]() 和 [created]() 这两个钩子函数的作用。
- 在 `setup()` 中定义的属性和方法都需要通过 `retrun` 返回，否则不能在模板中使用。


```js
export default {
  setup(props, context) {
    return {}
  }
}
```



# 2. setup 的参数

- props
- context

## 2.1. props

- `props` 是响应式的，当传入新的 `props` 时将会更新。
- `props` 不能用 ES6 解构，否则会消除 `props` 的响应性。
- 如果需要解构 `props`，可以在 `setup()` 中使用 `toRefs` 来完成。

## 2.2. context

- `context` 不是响应式的，可以进行 ES6 解构。
- `context` 会暴露组件的三个属性:
  - attrs
  - slots
  - emit
  - expose

`setup()` 可以返回一个渲染函数，此时会阻止返回任何其他的东西，当我们想要将这个组件的方法通过模板 ref 暴露给父组件时就无法实现了。通过 `expose` 可以来解决这个问题，给它传递一个对象，其中定义的 property 将可以被外部组件实例访问：

```js
import { h, ref } from 'vue'
export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```



# 3. 定义响应式变量

通过下面这些函数可以实现变量的响应式，并通过 `return` 返回变量，提供给模板使用。

- ref
- reactive
- toRefs

## 3.1. ref

- `ref` 定义基本数据类型的响应式变量。
- `ref` 是拷贝一份新的数据，更新时不会影响原数据。

```js
setup {
  const count = ref(0);
  console.log(count.value); // 0

  count.value++;
  console.log(count.value); // 1

  return { count };
}
```

## 3.2. toRef

-  `toRef` 会保持对原属性的响应式链接。

```js
setup {
  const state = reactive({
    foo: 1,
    bar: 2
  });

  const fooRef = toRef(state, 'foo');
}
```

## 3.3. reactive

- `reactive` 定义引用数据类型的响应式变量。
- 返回对象的响应式副本。是深度响应式，内部通过 `proxy` 和 `reflect` 来实现。

```js
setup() {
  const info = reactive({
    name: 'Json'，
    age: 12
  })
}
```

## 3.4. toRefs

-  将响应式对象转换为普通对象。

例如，在模板中我们想直接使用 `tableData` 和 `loading` 属性.通过 `toRefs` 可以在不失去响应性的前提下进行解构。
  ```js
  setup() {
    const data = reactive({
      tableData: [],
      loading: false
    })

    return {
      ...toRefs(data);
    }
  }
  ```

