> 一个用于转换`HTML`为`Markdown`的工具。[English](./README-EN.md)

---

[![Build Status](https://travis-ci.org/stonehank/html-to-md.svg?branch=master)](https://travis-ci.org/stonehank/html-to-md)
[![npm](https://img.shields.io/npm/v/html-to-md.svg)](https://www.npmjs.com/package/html-to-md)
[![codecov](https://codecov.io/gh/stonehank/html-to-md/branch/master/graph/badge.svg)](https://codecov.io/gh/stonehank/html-to-md)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/html-to-md.svg)
![David](https://img.shields.io/david/stonehank/html-to-md.svg)


### 效果

[live-demo](https://stonehank.github.io/html-to-md/)


### 为什么做这个工具

最初的动机是希望将`leetcode-cn`上的题目和自己的解答[搬到`github`](https://github.com/stonehank/leetcode-solution-js)，
但是获取的介绍都是`html`格式文本，因此有了将`html`转换为`markdown`的需求。

找了几个工具，结果并不是很合胃口，有的不支持`nodejs`，有的并不能很好的转换，最终决定自己写一个来用。

刚开始只是写了一个比较简单的，但已经能够处理我的需求。

但后来偶尔一次使用，面对更复杂的`html`格式，就会出现混乱，这个库也就是一个重构版，
当然，它可能还存在很多`bug`没有发现，但希望能在后续不断完善，如果有发现`bug`，请提`issue`或`PR`，我会第一时间进行处理。


### 使用说明

##### 安装

`npm -i html-to-md`

##### 使用

```js
const html2md=require('html-to-md')

console.log(html2md('<strong><em>strong and italic</em></strong>',options,force))
// ***strong and italic***
```

### 参数(可选)：

options:

|名称|数据类型|默认值|说明|
|:---:|:---:|:---:|:---:|
|skipTags|Array|`['div','html','body']`|需要忽略的标签名|
|emptyTags|Array|`[]`|不仅忽略它本身，它内部所有标签名全部忽略|
|ignoreTags|Array|`['','style','br','head','!doctype','form']`|忽视标签及其内部所有内容|

> 优先权：skipTags > emptyTags > ignoreTags

例：
```javascript
html2md('<><b><i>abc</i></b></>',{ignoreTags:['']},true)
// ''

html2md('<><b><i>abc</i></b></>',{skipTags:['']},true)
// ***abc***

html2md('<><b><i>abc</i></b></>',{emptyTags:['']},true)
// abc
```

force(Boolean)(默认false)

|值|说明|
|:---:|:---:|
|true|表示强制使用自定义配置|
|false|对自定义配置使用`Object.assign`操作|

例：
```javascript
// 默认 skipTags 为 ['div','html','body']

// 配置一：
html2md('<div><b><i>abc</i></b></div>',{skipTags :['b']})
// skipTags 为 ['div','html','body','b']

// 配置二：
html2md('<div><b><i>abc</i></b></div>',{skipTags :['b']},true)
// 经过配置后 skipTags 为 ['b']

```

### 特点

* 快速，小巧，无任何依赖，`gzip` 7kb

* 支持`nodeJS`，参数(html文本)为字符串

* 100+单元测试和模块测试，覆盖率`97.7%`

> 注意：只有有效规范的HTML文本才能准确显示结果，如`<p>abc<` ，`<i>abc</>`等都是**无效**文本

### 支持标签

* `a`
* `b`
* `blockquote`
* `code`
* `del`
* `em`
* `h1~h6`
* `hr`
* `i`
* `img`
* `input`
* `li`
* `ol`
* `p`
* `pre`
* `s`
* `strong`
* `table`
* `tbody`
* `td`
* `th`
* `thead`
* `tr`
* `ul`

### 待完成事项

- [x] 添加`input`的支持
- [x] 增加测试
- [x] 添加参数，以便适应更多自定义需求

