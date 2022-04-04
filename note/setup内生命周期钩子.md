# setup() 内生命周期钩子
为了使组合式API的功能和选项式 API 一样完整，我们需要在 `setup` 内注册生命周期钩子的方法。

在生命周期钩子前面加 `on` 来访问组件的生命周期钩子。

`setup` 是围绕 `beforeCreate` 和 `create` 生命周期钩子运行的，所以不需要显示的定义。

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted
- onErrorCaptured
- onRenderTracked
- onRenderTriggered
- onActivated
- onDeactivated

