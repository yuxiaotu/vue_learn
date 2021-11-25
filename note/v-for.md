# v-for指令
## 01.作用
`v-for` 是列表渲染指令，可以把数组对应为一组元素。

```html
<div>
    <li v-for="item in items" :key="item.message"></li>
</div>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    items: [
      {message: 'apple'},
      {message: 'banana'}
    ]
  }
}) 
```

## 02.与v-if
v-for 与 v-if 不能在同一个标签中使用。

下面案例，显示 price 大于 5 的项目。由于 `v-for` 的优先级大于 `v-if` 所以，`v-if` 将运行于每一个 `v-for` 循环中，从而影响性能。

```html
<div>
    <li v-for="item in items" v-if="item.price > 5" :key="item.message">{{item.message}}</li>
</div>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    items: [
      {message: 'apple', price: 5},
      {message: 'banana', price: 10},
      {message: 'cucumber', price: 6},
    ]
  }
}) 
```
**解决方法**

- 如果循环出现在条件内部，使用计算属性进行过滤
  ```html
  <div>
    <li v-for="item in list">{{item.message}}</li>
  </div>
  ```

  ```js
  computed: {
    list: function() {
      return this.items.filter(function(item) {
        return item > 5;
      })
    }
  }
  ```

- 将 v-if 放在外层，判断整个列表是否渲染
  ```html
  <div v-if="isShow">
    <li v-for="item in items" key="item.message"></li>
  </div>
  ```

## 03.key取index
key 代表的是列表中的元素唯一的标识，当列表数据更新时由 key 来判断那些元素发生了改变需要重新渲染，那些元素没有改变可以继续复用，从而可以提高从数据更新到页面渲染的效率。

如果把 index 作为 key，那么不管是插入还是删除数据，整个数据列表的索引都将发生变化。这也会造成页面中需要重新渲染整个列表。

在 `v-for` 指令中 key 是必不可少的，但是 key 的值不能取 index。