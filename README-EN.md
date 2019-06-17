> A JS library for convert HTML to Markdown.[中文](./README.md)

---

[![Build Status](https://travis-ci.org/stonehank/html-to-md.svg?branch=master)](https://travis-ci.org/stonehank/html-to-md)
[![npm](https://img.shields.io/npm/v/html-to-md.svg)](https://www.npmjs.com/package/html-to-md)
[![codecov](https://codecov.io/gh/stonehank/html-to-md/branch/master/graph/badge.svg)](https://codecov.io/gh/stonehank/html-to-md)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/html-to-md.svg)
![David](https://img.shields.io/david/stonehank/html-to-md.svg)


### Live Demo

[live-demo](https://stonehank.github.io/html-to-md/)


### Useage

##### install

`npm -i html-to-md`

##### example

```js
const html2md=require('html-to-md')

console.log(html2md('<strong><em>strong and italic</em></strong>'))
// ***strong and italic***
```

### Feature

* speed, none of dependencies, `gizp` 7kb

* support `nodeJs`

* 100+`unit test` and `module test`,  code coverage `97.7%`

> Only valid HTML will be output correctly, eg. `<p>abc<` ，`<i>abc</>`are **Not Valid** text.

### Support Tags

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

### TODO

- [ ] support `options`.
