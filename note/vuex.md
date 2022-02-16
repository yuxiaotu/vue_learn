# vuex


## 01. 作用
`vuex` 是一个程序里面的状态管理模式，它是一个集中存储了所有组件的状态的「仓库」。

如果你的项目里有很多页面（组件/视图），页面之间存在多级的嵌套关系，此时，这些页面假如都需要共享一个状态的时候，此时就会产生以下两个问题：

- 多个试图依赖同一个状态。
- 来自不同的视图的行为需要变更同一个状态。

为了解决这些问题，有以下的思路：
- 把各个组件都需要依赖的同一个状态抽取出来，在全局使用单例模式进行管理。
- 在这种模式下，任何组件都可以直接访问到这个状态，或者当状态发生改变时，所有的组件都获得更新。



## 02. 使用
`vuex` 的关键也就在这个 `store`。在src路径下创建store文件夹，然后创建index.js文件，文件内容如下：

```js
const store = new Vuex.Store({
  state: {
    name: '张三',
    number: 0,
    list: [
      {id: 1, name: '111'},
      {id: 2, name: '222'},
      {id: 3, name: '333'}
    ]
  }
})
```

访问仓库中的状态。

```js
this.$store.state.name;
```



## 03. Getter
可以通过计算属性访问（缓存），也可以通过方法访问（不缓存），你甚至可以在getters的方法里面再调用getters方法，当然你也实现了像state那样，使用mapGetters解构到计算属性中，这样你就可以很方便的使用getters啦！

```js
getters: {
  getMessage(state) {
    return `hello${state.name}`;
  }
}
```



## 04. Mutation
`mutation` 用于修改值。

Mutations里面的函数必须是同步操作，不能包含异步操作。

```js
mutations: {
  setNumber(state) {
    state.number = 5;
  }
}
```



## 05. Action
修改state的时候有异步操作放在，`action`。

```js
actions: {
  setNum(content) {
    return new Promise(resolve => {
      setTimeout(() => {
        content.commit('setNumberIsWhat', { number: 888})
      })
    }, 1000); 
  }
}
```

```js
async mounted() {
  await this.$store.dispathch('setNum');
}
```