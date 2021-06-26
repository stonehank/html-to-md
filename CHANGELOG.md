### 0.4.0
* Remove the first `\n` in some tags 
* Escape some character in some tag, like `<b>* abc</b>`
* Fix render issues when `<br>` in `<li>`
* Fix render issues when have `` ` ``(single or multiple) in `<code>` or `<pre>`
* Ignore extra tags if already have `code` tag inside `pre`

### 0.3.9
* Output some raw unvalid content, like `<` in the tag contents.

#### 0.3.8
* Fix when render as raw HTML, remove all the wrap. 

#### 0.3.7
* Fixed some tags inside `th`, `td` will cause wrap.Consider `<td><div>ABC</div></td>`
* Add some tags should render as raw HTML inside a table.Consider `<td><ul><li>1</li></ul></td>`

#### 0.3.6
* Add `aliasTags`.
* Remove console in production.

#### 0.3.5
* Remove console.

#### 0.3.4
* Add 'dl,dd,dt' inside default skipTags.
* Fixed some no used space.

#### 0.3.3

* Add 'html' and 'body' inside default skipTags.
* Add `force` options, it can totally overwrite the customize options object.
* Fix some redundant empty line.

##### 0.3.2

* Fixed bugs that cause text after heading tags will not line feed.

##### 0.3.1

* created `CHANGELOG.md`, support `english` readme 
* add options, can set the tags resolve strategy
* add `div` to default value of `options:skipTags`
* skipTags will check if need '\n'

##### 0.3.0

* add support for tag`<input type="checkbox" />`
* fixed the bug when `<code>`language is `markdown` 
* fixed the bug when `<p>` nest in `<li>`
* fixed some nest tag render bug
* merge tht common use code
