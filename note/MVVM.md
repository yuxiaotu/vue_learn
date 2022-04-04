# MVVM 模式

- [MVVM 的含义](#1-MVVM-的含义)
- [MVC 的含义](#2-MVC-的含义)
- [MVP 的含义](#3-MVP-的含义)

# 1. MVVM 的含义

`MVVM` 和 `MVC` 、`MVP`是三种常见的「软件架构」设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

`MVVM` 是 `Model - View - ViewModel` 的缩写。即「视图」-「视图模型」-「模型」。	

`Model` 和 `View` 并无直接关联，而是通过`ViewModel` 来进行联系，`Model` 和 `ViewModel` 之间「双向数据绑定」。因此当 `Model`中的数据改变时会触发 `View` 层的刷新，`View` 中由于用户交互操作而改变的数据也会在 `Model` 中同步。实现了 `Model`  和 `View` 的数据自动同步，因此开发者只需要专注于数据本身即可，不需要自己操作 `DOM`。

![MVVM示意图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0c2d0d7ad7d4adc9699a349c8dca435~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

- 将 `View` 的行为和状态抽象化，将 UI 和业务逻辑分开。
- 通过 `ViewModel` 来沟通 `View` 和 `Model` 。
- `View` 将用户请求转交给 `ViewModel` ，由 `ViewModel`  通知 `Model` 进行数据更新。
- `Model` 完成数据更新后，通知 `ViewModel` 驱动视图的更新。 

# 2. MVC 的含义
`MVC` 是 `Model - View - Controller` 的缩写，即 「视图」-「模型」-「控制器」。

`Controller` 层是 `View` 层和 `Model` 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，`Controller` 中的事件触发器就开始工作了，通过调用 `Model` 层，来完成对 `Model` 的修改，然后 `Model` 层再去通知 `View`



![https://juejin.cn/post/6919373017218809864](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a65e1b9145894647a25788caf12ddd26~tplv-k3u1fbpfcp-watermark.image)



- `View` 接受用户的交互请求，并将交互交给 `Controller` 处理。

- 通过 `Controller` 来操作 `Model` 的数据，
- 然后由 `Model` 层来驱动 `View` 的更新。

# 3. MVP 的含义
`MVP` 与 `MVC` 的不同之处在于 使用 `Presenter` 来代替 `Controller`。

在 `MVC` 模式中使用观察者模式，来实现当 `Model` 层数据发生变化的时候，通知 `View` 层的更新。这样 `View` 层和 `Model` 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。

`MVP` 的模式通过使用 `Presenter` 来实现对 `View` 层和 `Model` 层的解耦。`MVC` 中的 `Controller` 只知道  `Model`  的接口，因此它没有办法控制 `View` 层的更新，`MVP` 模式中，`View` 层的接口暴露给了 `Presenter` 因此可以在 `Presenter` 中将 `Model` 的变化和 `View` 的变化绑定在一起，以此来实现 `View` 和 `Model` 的同步更新。这样就实现了对 `View` 和 `Model` 的解耦，`Presenter` 还包含了其他的响应逻辑。



![MVP示意图](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/27/16441ddf9fc513ef~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)






****

- https://juejin.cn/post/6972162260517158920
