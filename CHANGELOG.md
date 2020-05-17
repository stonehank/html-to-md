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
