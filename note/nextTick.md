# nextTick()

- [nextTick() 的作用](#1-作用)
- [在 mounted 中使用](#2-在-mounted-中使用)


# 1. 作用
`nextTick()` 的作用是在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

从上述定义中，归纳出三个问题：
- 下一次 DOM 更新循环结束之后?
- 执行延迟回调?
- 更新后的 DOM?

从 `Vue` DOM 更新来理解问题：
- `Vue` 在更新 DOM 时是异步执行的。
- 只要侦听到数据变化，`Vue` 将开启一个队列，并缓存同一事件循环中发生的所有数据变更。
- 如果同一个 `watcher` 被多次触发，最后只会被推入到队列中一次。
- 这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

```js
vm.message = 'change';

console.log(vm.$el.textContent); // 无法得到 change

Vue.nextTick(function() => {
  console.log(vm.$el.textContent); // 得到 change
})
```


# 2. 在 mounted 中使用
`mounted` 阶段，虽然完成了挂载，但并不是所有子组件都被一起挂载了，如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted。

```js
mounted: function() {
  this.$nextTick(function() {

  })
}
```


# 3. 元素显隐切换
点击按钮显示原本以 `v-show = false` 隐藏起来的输入框，并获取焦点。

```js
show() {
  this.showit = true;
  this.$nextTick(function() {
    document.getElementById('keyword').focus();
  })
}
```



****

- https://segmentfault.com/a/1190000012861862