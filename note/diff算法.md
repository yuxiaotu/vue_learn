# Diff 算法

- [vue 如何更新节点](#1-vue-如何更新节点)

- [diff 算法的比较方式](#2-diff 算法的比较方式)

# 1. 虚拟 DOM

当数据改变后，可以直接渲染为「真实 DOM」，但是要渲染「真实 DOM」 的开销是很大的，当修改了某个数据时，如果直接渲染到「真实 DOM」上会引起整个 DOM 树的重绘和重排。

所以，先根据「真实 DOM 」生成一颗「虚拟 DOM 」树，「虚拟 DOM」是一个 `Js` 对象，用来表示真实的 DOM。

每当数据改变后，会先修改「虚拟 DOM」，然后再一次性渲染成「真实 DOM」。

例如，有如下真实的DOM：

```html
<ul>
  <li class="item">one</li>
  <li class="item">two</li>
  <li class="item">three</li>
</ul>
```

对应的「虚拟 DOM」是如下：

```js
let oldVDOM = {
  tagName: 'ul',
  props: { 
  	id: 'list',
  },
  children: [
    { tagName: 'li', props: { class: 'item' }, children: ['one'] },
    { tagName: 'li', props: { class: 'item' }, children: ['two'] },
    { tagName: 'li', props: { class: 'item' }, children: ['three'] }
  ]
}
```

# 2. diff 算法的比较方式

`Diff` 算法用来比较新旧两个「虚拟 DOM」，对比出是哪个节点更改了只要更新这个虚拟节点所对应的真实节点。`Diff` 算法的比较只会在同级进行比较。

虚拟 DOM 算法的耗损 = 虚拟 DOM 增删改 + 真实 DOM 差异增删改 + 排版和重绘 。





![diff 比较](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/163776ba7bda2d47~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)



当数据发生改变时，会触发 `setter` 调用 `Dep.notify` 通知所有订阅者 `Watcher`，订阅者就会调用 `patch` 给真实的 DOM 打补丁，更新相应的视图。



![diff 算法的比较流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/5/19/163777930be304eb~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)



- `patch` 方法接收 `oldVnode` 和 `newVnode` 两个参数。
- 比较新旧两个虚拟节点是否是同一种类型的标签，如果相同就调用 `patchVnode` 方法进行深层次的比较。
- 如果不相同，就直接替换整个节点。

# 3. patch

```js
function patch(oldVnode, newVnode) {
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode);
  } else {
    const oldEl = oldVnode.el;
    const parentEle = api.parentNode(oldEl);
    createEle(newVnode);
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl));
      api.removeChild(parentEle, oldVnode.el);
      oldVnode = null;
    }
  }
  return newVnode;
}
```

# 4. someVnode

`someVnode` 方法判断是否为同一类型节点。

```js
function someVnode(oldVnode, newVnode) {
  return (
  	oldVnode.key === newVnode.key &&
    oldVnode.tagName === newVnode.tagName &&
    oldVnode.isComment === newVnode.isComment &&
    isDef(oldVnode.data) === isDef(newVnode.data) &&
    sameInputType(oldVnode, newVnode);
  )
}
```

# 5. patchVnode

- 找到对应的真实 DOM，称为 el。
- 判断 `oldVnode` 和 `newVnode` 是否指向同一个节点，如果是就直接返回。
- 如果都有文本且不相等，那么将 `el` 的文本节点设置为 `newVnode` 的文本节点。
- 如果 `oldVnode` 有子节点，而 `newVnode` 没有，就直接删除 `el` 的子节点。
- 如果 `oldVnode` 没有子节点，而 `newVnode` 有子节点，那就将 `newVnode` 的子节点真实化后添加到 `el` 中。
- 如果两者都有子节点，则执行 `updateChild`。

```js
function patchVnode(oldVnode, newVnode) {
  const el = newVnode.el = oldVnode.el;
  const oldCh = oldVnode.children, newCh = newVnode.children;
  if (oldVnode === newVnode) return;
  if (oldVnode.text !== null && newVnode.text !== null && oldVnode.text !== newVnode.text) {
    api.setTextContent(el, newVnode.text);
  } else {
    if (oldCh && newCh && oldCh !== newCh){
      updateChildren(el, oldCh, newCh);
    } else if (newCh) {
      createEle(newVnode);
    } else if (oldCh) {
      api.removeChild(el);
    } 
  }
}
```

# 6. updateChildren

- 通过「首尾指针法」来对比两个新旧虚拟节点的子节点对比。
- 对于新旧两个虚拟节点的比较，有 5 种情况
  - `oldS` 与 `newS` 进行比较
  - `oldS` 与 `newE` 进行比较
  - `oldE` 与 `newS` 进行比较
  - `oldE` 与 `newE` 进行比较
  - 如果以上步骤都没有匹配到，那就把所有旧的子节点的 `key` 做一个映射到旧节点下标的 `key -> value` 表，然后用新的 `vnode` 的 `key` 去找到旧节点中可以复用的位置。



![updateChildren](https://imgs.developpaper.com/imgs/2021-12-18-22-45-05-ubeau1mpxhe.png)





****

- https://segmentfault.com/a/1190000040052514
- https://juejin.cn/post/6971622260490797069
- https://juejin.cn/post/6844903607913938951