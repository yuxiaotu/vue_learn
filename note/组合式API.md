# 组合式 API

- [选项式 API](#1-选项式-API)
- [组合式 API](#2-组合式-API)
- [代码复用方法](#3-代码复用方法)

## 1. 选项式 API

在 vue2 中通过选项式 API 的方式来使用 methods、watch、computed 等来处理页面逻辑，数据归数据，方法归方法。

例如，实现一个搜索功能和一个排序功能。

```vue
export default {
  data() {
    return {
      searchData; // 搜索结果
			sortData; // 排序结果
    }
  },
  methods: {
    useSearch() {} // 搜索功能
		useStor() {} // 排序功能
  },
}
```

在选项式 API 模式下，随着业务功能的增加，代码量也会增加。但是这些功能代码在 methods 内是零散分布的，在调试过程中要在各个模块中跳转，这也叫「反复横跳」。

## 2. 组合式 API

组合式 API 方式下，由于是基于函数的，可以将功能部件提取到函数中更加容易。

用组合式 API 方式实现搜索和排序功能。

```js
export default {
  function useSearch() {};
	function useStor() {};

  setup() {
    return { ...useSearch(), ...useStor() }
  }
}
```

## 3. 代码复用方法

在 vue2 中经常使用 `mixin` 来提取代码进行复用。

```js
const productSearchMixin = {
  data() {
    return { searchData };
  }
  methods: {
  	useSearch() {};
	}
}

const resultSortMixin = {
  data() {
    return { sortData };
  }
  methods: {
  	useStor() {};
	}
}

export default {
  mixins: [productSearchMixin, resultSortMixin];
}
```

`mixin` 可以根据逻辑关注点进行组织代码，也存在下面这些缺点：

- 任意导致属性名称冲突。
- 不清楚混合元素如何作用。
- 混合后的组件属性不方便在其他组件中复用。

组合式 API 为我们提供了组织复用代码的另一种方案。

**search.js**

```js
export default function useSearch(getResult) {
  // 搜索功能
}
```

**sort.js**

```js
export default function useSort({input, options}) {
  // 搜索功能
}
```

**index.vue**

```js
import useSearch from '@use/search';
import useSort from '@use/sort';
export default {
  setup() {
    const productSearch = useSearch(configuration);
    const resultSort = useSorting({});
    return {
      productSearch,
      resultSort
    }
  }
}
```



****

- https://xie.infoq.cn/article/91af5a841ff75503049e5ecf8
