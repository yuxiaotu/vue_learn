# 组合式API

## 01.含义
创建组件，可以将界面中重复的部分连同其功能一起提取为可以重用的代码段。

当应用变得非常大的时候，共享和重用代码变得尤为重要。但是当组件变得很大时，通过（data，computed，methods，watch）`组件选项` 来组织逻辑会导致组件难以阅读和理解。

碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

`组合式API` 就是为了把逻辑关注点相关的代码收集在一起。

## 02.setup
`setup` 在组件中:

```js
export default {
  components: {
    RepositoriesFilters,
  }
  props: {
    user: {
      type: string,
      required: true
    }
  },
  setup(props) {
    console.log(props)
    return {} // 这里返回的任何内容都可以用于组件的其余部分
  }
  // 组件的其他部分
}
```
setup 选项是接收 `props` 和 `context` 的函数。在组件创建之前执行，一旦 props 被解析，将作为组合式API的入口。

setup 的所有返回值都将暴露给组件中的其他部分，例如计算属性、方法、生命周期钩子函数等。

在 setup 中要避免使用 `this` 因为它不会找到组件实例。setup 的调用发生在 data、component、methods被解析之前，所以无法在 setup 中被获取。

## 03.响应式变量
通过 `ref` 函数使得任何响应式变量在任何地方起作用。`ref` 将接收的参数包裹在一个带有 `value` property 的对象中，可以使用该 property 访问或更改响应式变量的值。

```js
import {ref} from 'vue'
const counter = ref(0)
console.log(counter)
console.log(counter.value)

counter.value++
console.log(counter.value) // 1
```
## 04.watch响应式更改
使用从 vue 导入的 watch 函数执行侦听。

当 counter 被修改时，侦听将触发执行回调。

```js
import {ref, watch} from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter' + counter.value);
})
```
## 05.computed属性
和 ref、watch 一样，可以从 vue 中导入 computed 函数，创建计算属性。

```js
import {ref, computed} from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)
counter.value++ 
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```