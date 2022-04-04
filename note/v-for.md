# v-for 指令

- [v-for 指令的作用](#1-作用)
- [v-for 不与 v-if 一起使用](#2-不与-v-if-一起使用)
- [在 v-for 中 key 不设置为 index](#3-key-不取-index)


# 1. 作用
`v-for` 是列表渲染指令，以数组为参数，将数组数据渲染为一组元素。

```html
<li v-for="item in items" :key="item.name">
  {{ item.name }}
</li>
```
```js
setup() {
  const items = ref([
    { name: 'apple', price: 10 },
    { name: 'banana', price: 15 }
  ]);
  retrun { items }
}
```

数组数据在 DOM 中的渲染情况如下：
```html
<li>apple</li>
<li>banana</li>
```


# 2. 不与 v-if 一起使用
`v-for` 指令不应该与 `v-if` 指令放在同一个标签中使用。

例如，要显示 `price` 大于 `10` 的项目。
```html
<li 
  v-for="item in items" 
  v-if="item.price > 10" 
  :key="item.message"
> 
  {{ item.name }}
</li>
```

但是，由于 `v-for` 的优先级大于 `v-if` 所以，`v-if` 将运行于每一个 `v-for` 循环中，从而影响性能。

可以使用「计算属性」先对数据进行过滤，然后再渲染。
  ```html
  <div>
    <li v-for="item in list">{{ item.name }}</li>
  </div>
  ```

  ```js
  computed: {
    list: function() {
      return this.items.filter(function(item) {
        return item > 10;
      })
    }
  }
  ```

或者是将 `v-if` 放在外层，判断是否要渲染整个列表。
```html
<div v-if="isShow">
  <li v-for="item in items" key="item.name"></li>
</div>
```


# 3. key 不取 index
`key` 代表的是列表中的元素唯一的标识，当列表数据更新时由 `key` 来判断那些元素发生了改变需要重新渲染，那些元素没有改变可以继续复用，从而可以提高从数据更新到页面渲染的效率。

如果把 `index` 作为 `key`，那么不管是插入还是删除数据，整个数据列表的索引都将发生变化。这也会造成页面中需要重新渲染整个列表。

在 `v-for` 指令中 `key` 是必不可少的，但是 `key` 的值不能取 `index`。