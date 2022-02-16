# ref

## 01. 作用
`ref` 被用来给 DOM 元素或者是子组件注册引用信息。引用信息会根据父组件的 `$refs` 对象进行注册。如果在普通的DOM元素上使用，引用信息就是元素; 如果用在子组件上，引用信息就是组件实例。

`ref` 需要在 DOM 渲染完成后才会有，在使用时要确保 DOM 已经渲染完成。比如在生命周期 `mounted()` 钩子函数，或者是在 `this.$nextTick()` 中调用。

##  02. 在元素上使用
```html
<div>
  <input type="text" ref="t" />
  <button @click="add">添加</button>
</div>
```

```js
var app = new Vue({
  el: "#app";
  methods: {
    add: function() {
      console.log(this.$refs);
    }
  }
})
```

## 03. 在子组件上使用
```html
<div>
  <t ref="inputText"/>
  <button @click="add">添加</button>
</div>
```

```js
Vue.component('t', {
  template: "<div>子组件</div>"
})

var app = new Vue({
  el: '#app',
  data: {

  },
  methods: {
    add: function() {
      console.log(this.$refs.inputText);
      console.log(this.$refs);
    }
  }
})
```