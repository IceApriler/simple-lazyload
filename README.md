# simple-lazyload

一个轻量级懒加载库，支持 `img`、`background-image`、 `class` 的懒加载和延时加载。

## 快速上手

1. 引入`lazyload.js`

```js

<script src="./lazyload.js"></script>

```

2. 实例化

```js

const lazy = new Lazyload()

```

2. set

```js

// 支持 img ( 包含background-image )

lazy.set({
  mode: 'img',
  dataset: 'data-img',
  offset: '50%',  // 支持百分比
  delay: 1000,
})

// 支持 class
lazy.set({
  mode: 'class',
  dataset: 'data-class',
  offset: 200,  // 单位像素
})

```

> 以上便是简易教程，非常简单。

3. 另外，支持链式调用

```js

lazy.set({
  mode: 'img',
  dataset: 'data-img',
  offset: '50%',
  delay: 1000,
}).set({
  mode: 'class',
  dataset: 'data-class',
  offset: '-30%',  // 支持负值
}).set({
  mode: 'img',
  dataset: 'data-img-custom',
  offset: '-30%',
  delay: 0,
})

```

## 结语

- 使用方法到此结束，具体可以参考`demo.html`。
- 若是好用，欢迎`star`。

## Todos

[ ] 使用Gulp编译出ES5版本。
[ ] 发布npm包。
