# vuex

- [vuex的作用](#1-作用)
- [vuex的使用](#2-使用)
- [Getter](#3-Getter)
- [Mutation](#4-Mutation)
- [Action](#5-Action)


# 1. 作用
`vuex` 是一个程序里面的状态管理模式，它是一个集中存储了所有组件的状态的「仓库」。

如果你的项目里有很多页面（组件/视图），页面之间存在多级的嵌套关系，此时，这些页面假如都需要共享一个状态的时候，此时就会产生以下两个问题：

- 多个视图依赖同一个状态。
- 来自不同的视图的行为需要变更同一个状态。

为了解决这些问题，有以下的思路：
- 把各个组件都需要依赖的同一个状态抽取出来，在全局使用单例模式进行管理。
- 在这种模式下，任何组件都可以直接访问到这个状态，或者当状态发生改变时，所有的组件都获得更新。


# 2. 使用
`Vuex` 的关键在于「仓库」这个概念，把公共的状态以及修改状态的方法提取出来放到仓库中。

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

# 3. Getter
可以通过计算属性访问（缓存），也可以通过方法访问（不缓存），你甚至可以在 `getters` 的方法里面再调用 `getters` 方法，当然你也实现了像 `state` 那样，使用 `mapGetters` 解构到计算属性中，这样你就可以很方便的使用 `getters` 中的方法。

```js
getters: {
  getMessage(state) {
    return `hello${state.name}`;
  }
}
```

直接访问 `getters` 中的方法。
```js
$store.getters.getState
```

# 4. Mutation

`mutation` 用于存放修改 `state` 的方法。`mutations` 里面的函数必须是同步操作，不能包含异步操作。

```js
mutations: {
  setNumber(state) {
    state.number = 5;
  }
}
```

通过 `commit()` 方法来执行 `mutations` 中的方法。

```js
methods: {
  changeData() {
    this.$store.commit("setNumber");
  }
}
```

# 5. Action

如果修改 `state` 的时候有异步操作放在 `actions` 中。

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

访问 `actions` 中的方法。
```js
async mounted() {
  await this.$store.dispathch('setNum');
}
```