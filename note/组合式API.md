# 组合式 API

## 01. 含义
通过创建「组件」，可以将界面中重复的部分连同其功能一起提取为可以重用的代码段。

当应用变得非常大的时候，「共享」和「重用」代码变得尤为重要。但是当组件变得很大时，通过 `data`、`computed`、`methods`、`watch` 等组件选项来组织逻辑会导致组件难以难以阅读和理解。

逻辑「碎片化」的情况使得理解和维护复杂组件变得困难，选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地「跳转」相关代码的选项块。

「组合式API」就是为了把逻辑关注点相关的代码收集在一起。



## 02. 选项式 API 实例
例如，从假定的外部 API 获取该用户的仓库，显示仓库列表。
```js
export default {
  components: {
    RepositoriesFilter,
    RepositoriesSortBy,
    RepositoniesList
  }

  props: {
    user: {
      type: String,
      required: true
    }
  }

  data() {
    return {
      repositories: {},
      filters: {},
      searchQuery: ''
    }
  }

  computed: {
    filteredRepositories() {},
    repositoriesMatchingSearchQuery() {}
  },

  watch: {
    user: 'getUserRepositories'
  },

  methods: {
    getUserRepositiories() {}
    updateFilter() {}
  }.

  mounted() {
    this.getUserRepositories();
  }
}
```



## 03. 组合式 API
使用组合式 API 的方式实现上述案例。
```js
export default {
  components: {
    RepositoriesFilter,
    RepositoriesSortBy,
    RepositoniesList
  }

  props: {
    user: {
      type: String,
      required: true
    }
  }

  setup(props) {
    const { user } = toRefs(props);
    let repositories = ref([]);

    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(prop.user);
    }

    onMounted(getUserRepositories);

    watch(user, getUserRepositories);

    const searchQuery = ref('');
    const repositoriesMatchchingSearchQuery = computed(() => {
      return repositories.value.filter(
        repository => repository.name.includes(searchQuery.value);
      )
    })

    return {
      repositories,
      getUserRepositories,
      searchQuery,
      repositoriesMatchchingSearchQuery
    }
  }
}
```


## 参考
- https://juejin.cn/post/6976830388580646942#heading-7
- https://juejin.cn/post/6999531044374315015#heading-3
