# v-slot指令

- [插槽的作用](#1-作用)
- [具名插槽的作用和使用方法](#2-具名插槽)
- [作用域插槽的作用和使用方法](#3-作用域插槽)


# 1. 作用
`v-slot` 用于实现「插槽」的指令。

「插槽」就是在组件模板中预先留下一个位置，当使用这个组件时，组件标签中的内容会自动填入预先留下的位置里。

如果父组件在使用到组件的时候，如果这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情。通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理。


# 2. 具名插槽
例如，有如下的组件，其中设置了两个插槽，一个名为 `header`，另一个名为 `footer`。然后调用这个组件时，在组件中有相应的值填入到对应名称的插槽中。

```html
<div>
  <slot name="header"></slot>
  <slot name="footer"></slot>
</div>
```
```html
<my-component>
  <template v-slot:header>
    this is header
  </template>

  <template v-slot:footer>
    this is footer
  </template>
</my-component>
```


# 3. 作用域插槽
让插槽内容可以访问子组件中才有的内容。

例如，有下面名为 `current-user` 的组件。在默认情况下他会显示名字的「姓」，但是当调用组件时希望用「名」来代替姓。

为了让 `user` 可以在父组件插槽中使用，将 `user` 作为 `<slot>` 元素的一个 `attribute` 绑定上去。

绑定在 `<slot>` 元素上的 `attribute` 被称为插槽 `prop`。然后在父级作用域中，使用带值的 `v-slot` 来定义我们提供的插槽 `prop` 的名字。

```html
<span :user="user">
  <slot>{{user.lastname}}</slot>
</span>
```
```html
<div>
  <current-user v-slot:default="slotProps">
    {{slotProps.user.firstname}}
  </current-user>
</div>
```