# setup()

- [组合式 API 中 setup() 的作用](#1-setup()-的作用)
- [setup() 的参数](#2-setup()-的参数)
  - [props](#21-props)
  - [context](#22-context)
- [定义响应式变量](#3-定义响应式变量)
  - [ref](#31-ref)
  - [toRefs](#32-toRef)
  - [reactive](#33-reactive)
- [依赖注入](#4-依赖注入)


# 1. setup() 的作用
`setup()` 是一个新的组件选项，也是「组合式 API」的基础，`setup()` 在组件创建之前执行。所以在 `setup()` 中要避免使用 `this` 因为无法找到组件实例。

在 `setup()` 中定义的属性和方法都需要通过 `retrun` 返回，否则不能在模板中使用。



# 2. setup() 的参数
`setup()` 方法接受下面这两个参数：
- props
- context

## 2.1. props
`props` 是 `setup()` 中第一个参数，`props` 是响应式的，当传入新的 `props` 时，它将被更新。

`props` 不能用 ES6 解构，否则会消除 `props` 的响应性。需要解构 `props`，可以在 `setup()` 中使用 `toRefs` 来完成。

```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
```

## 2.2. context
`context` 是第二个参数，是一个普通的 `Js` 对象，`context` 不是响应式的，可以进行 ES6 解构。`context` 暴露组件的三个属性:

- attrs
- sloats
- emit


# 3. 定义响应式变量
通过下面这些函数可以实现变量的响应式，并通过 `return` 返回变量，提供给模板使用。

## 3.1. ref
  `ref` 是拷贝一份新的数据，更新时不会影响原数据。

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
  `toRef` 会保持对原属性的响应式链接。

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
  返回对象的响应式副本。是深度响应式，内部通过 `proxy` 和 `reflect` 来实现。

## 3.4. toRefs
  将响应式对象转换为普通对象。

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


# 4. 依赖注入
`provide` 和 `inject` 通过依赖注入，实现跨层级组件之间通信。

```js
setup() {
  const msg = ref('我是父组件')
  provide('msg', msg);
  return {
    msg
  }
}
```

```js
setup() {
  const msg = inject('msg');
  return {
    msg
  }
}
```