# Vue 概述

- [MVVM 模式下的数据驱动](#1-MVVM-模式下的数据驱动)
- [「渐进式」框架](#1-渐进式框架)
- [组件机制](#3-组件机制)

## 1. MVVM 模式下的数据驱动

`Vue.js` 是一套用于构建「用户界面」的 `Js` 库。在「MVVM 模式」下，`Vue.js` 所扮演的角色就是 `ViewModel` ，`view` 和 `ViewModel` 实现了数据的双向绑定，当数据发生变化时页面会自动进行更新，对于开发人员而言就不需要关注 DOM 的操作，只需要实现业务逻辑完成数据的处理即可。这也就是「数据驱动」的含义。

![MVVM](https://012.vuejs.org/images/mvvm.png)



`view` 和 `ViewModel` 之间由 [响应式机制]() 来自动更新 DOM，完成页面的刷新。

![响应式原理](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/7/2/1645aa9519525059~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)


## 2. 渐进式框架
`vue.js` 只是一个 `Js` 库，像 `Jquery` 一样可以在 HMTL 文档中直接引入使用。当然随着项目功能的增加，还可以再引入「组件系统」、「路由机制」等功能来构建一个构建完善的应用。对于开发人员来讲，可以根据项目的要求逐渐加入需要的工具，而不是一开始就安装所有的工具。

通常用 `Vue` 构建的项目包括下面这些内容：

- 声明式渲染
- 组件系统
- 客户端路由
- 状态管理
- 构建工具

这些功能模块都可以在开发过程中根据需要逐渐加入。

![渐进式](../src/assets/img/note/渐进式框架.png)



例如，在 HTML 文档中导入 `vue.js`，使用其中的 `v-model` 指令，来获取 `<input>` 的内容。

```html
<html>
  <body>
    <div>
      <p>{{ msg }}</p>
      <input type="text" v-mode="msg">
    </div>
  </body>
  <script src="https://unpkg.com/vue@3"></script>
  <script>
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        let msg = ref();
        return {
          msg
        }
      }
    }).mount('#app');
  </script>
</html>
```

## 3. 组件机制

对于一个网页来讲，可以按照不同的区域划分为多个子模块，这些子模块的代码可以提取出来，单独封装成一个「组件」，这样在其他区域需要用到相同功能的模块时，只要复用相应的组件就可以实现，而不再需要重复写代码。

![组件](https://cn.vuejs.org/images/components.png)

****

- https://segmentfault.com/a/1190000021290972