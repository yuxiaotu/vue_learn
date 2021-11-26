# v-slot指令
## 01.作用
v-slot 用于实现「插槽」，插槽就是在组件模板中预先留下一个位置，当使用这个组件时，组件标签中的内容会自动填入预先留下的位置里。

### 具名插槽
有如下的组件，其中设置了两个插槽，一个名为 header，另一个名为 footer。然后调用这个组件时，在组件中有相应的值填入到对应名称的插槽中。
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

### 作用域插槽
让插槽内容可以访问子组件中才有的内容，有下面名为 `current-user` 的组件。在默认情况下他会显示名字的'姓'，但是当调用组件时希望用'名'来代替姓。

为了让 user 可以在父组件插槽中使用，将 user 作为 `<slot>` 元素的一个 attribute 绑定上去。

绑定在 <slot> 元素上的 attribute 被称为插槽 prop。然后在父级作用域中，使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字。
```html
<span :user="user">
  <slot>{{user.lastname}}</slot>
</span>
```
```html
<div>
  <template v-slot:default="slotProps">
    {{slotProps.user.firstname}}
  </template>
</div>
```