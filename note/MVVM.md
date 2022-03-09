# MVVM
`MVC`、`MVP` 和 `MVVM` 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

在开发「单页面应用」时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得冗长、混乱，这样对项目开发和后期的项目维护是非常不利的。



# 1. MVC
MVC 通过分离 `Model` ，`View` 和 `Controller` 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责页面的业务逻辑，以及相应数据的操作。

`View` 和 `Model` 使用了观察者模式，当 `Model` 层发生改变的时候会通知有关 `View` 层页面更新。

`Controller` 层是 `View` 层和 `Model` 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，`Controller` 中的事件触发器就开始工作了，通过调用 `Model` 层，来完成对 `Model` 的修改，然后 `Model` 层再去通知 `View`



# 2. MVP
MVP 与 MVC 的不同之处在于 使用 `Presenter` 来代替 `Controller`。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。

MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

![https://juejin.cn/post/6919373017218809864](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a65e1b9145894647a25788caf12ddd26~tplv-k3u1fbpfcp-watermark.image)



# 3. MVVM
MVVM 分为 `Model`，`View`，和 `ViewModel`，其中 ViewModel 负责监听 Model 中数据的改变并且控制试图的更新，处理用户交互操作。

Model和View并无直接关联，而是通过ViewModel来进行联系的，Model和ViewModel之间有着双向数据绑定的联系。因此当Model中的数据改变时会触发View层的刷新，View中由于用户交互操作而改变的数据也会在Model中同步。

实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据本身即可，不需要自己操作 DOM。

![https://juejin.cn/post/6919373017218809864](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5ce15b7b704483eb91ee1f5d1d64786~tplv-k3u1fbpfcp-watermark.image)

