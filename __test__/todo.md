
 
处理数据时经常需要从数组中随机抽取元素，这时候就需要用到np.random.choice()。然而choice用法的官方解释并不详细，尤其是对replace参数的解释，例子也不是很全面。因此经过反复实验，我较为详细的总结出了他的用法，并给出了较为详细的使用代码例子。

**官方解释**：[https://docs.scipy.org/doc/numpy/reference/generated/numpy.random.choice.html](https://docs.scipy.org/doc/numpy/reference/generated/numpy.random.choice.html)

```
官方解释：
numpy.random.choice(a, size=None, replace=True, p=None)
Generates a random sample from a given 1-D array

New in version 1.7.0.

Parameters:	
a : 1-D array-like or int
If an ndarray, a random sample is generated from its elements. If an int, the random sample is generated as if a were np.arange(a)

size : int or tuple of ints, optional
Output shape. If the given shape is, e.g., (m, n, k), then m * n * k samples are drawn. Default is None, in which case a single value is returned.

replace : boolean, optional
Whether the sample is with or without replacement

p : 1-D array-like, optional
The probabilities associated with each entry in a. If not given the sample assumes a uniform distribution over all entries in a.
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>123456789101112131415161718
```

**下面是我自己的总结**

```
#numpy.random.choice(a, size=None, replace=True, p=None)
#从a(只要是ndarray都可以，但必须是一维的)中随机抽取数字，并组成指定大小(size)的数组
#replace:True表示可以取相同数字，False表示不可以取相同数字
#数组p：与数组a相对应，表示取数组a中每个元素的概率，默认为选取每个元素的概率相同。
// TODO 在code内部 只有 &lt; 代表 < , &gt; 代表 >
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>1234
```

除了numpy中的数组，python内建的list（列表）、tuple（元组）也可以使用。

## []()[]()**详解及代码举例**



```
>>>np.random.choice(5)#从[0, 5)中随机输出一个随机数
#相当于np.random.randint(0, 5)
	2

>>>np.random.choice(5, 3)#在[0, 5)内输出五个数字并组成一维数组（ndarray）
#相当于np.random.randint(0, 5, 3)
	array([1, 4, 1])
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>1234567
```

*  **从数组、列表或元组中随机抽取**

注意：不管是什么，它必须是**一维**的！

```
L = [1, 2, 3, 4, 5]#list列表
T = (2, 4, 6, 2)#tuple元组
A = np.array([4, 2, 1])#numpy,array数组,必须是一维的
A0 = np.arange(10).reshape(2, 5)#二维数组会报错

>>>np.random.choice(L, 5)
	array([3, 5, 2, 1, 5])
	
>>>np.random.choice(T, 5)
	array([2, 2, 2, 4, 2])
 
>>>np.random.choice(A, 5)
	array([1, 4, 2, 2, 1])

>>>np.random.choice(A0, 5)#如果是二维数组，会报错
	ValueError: 'a' must be 1-dimensional
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>12345678910111213141516
```

// TODO
test case:

<ul>
<li><strong>参数replace</strong><br>
用来设置是否可以取相同元素：<br>
True表示可以取相同数字；<br>
False表示不可以取相同数字。<br>
默认是True</li>
</ul>

*   **参数replace**  
    用来设置是否可以取相同元素：  
    True表示可以取相同数字；  
    False表示不可以取相同数字。  
    默认是True



*  **参数replace** 用来设置是否可以取相同元素： True表示可以取相同数字； False表示不可以取相同数字。 默认是True

```
np.random.choice(5, 6, replace=True)#可以看到有相同元素
	array([3, 4, 1, 1, 0, 3])
np.random.choice(5, 6, replace=False)#会报错，因为五个数字中取六个，不可能不取到重复的数字
	ValueError: Cannot take a larger sample than population when 'replace=False'
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>1234
```

*  **参数p**

p实际是个数组，大小（size）应该与指定的a相同，用来规定选取a中每个元素的概率，默认为概率相同

```
>>> aa_milne_arr = ['pooh', 'rabbit', 'piglet', 'Christopher']
>>> np.random.choice(aa_milne_arr, 5, p=[0.5, 0.1, 0.1, 0.3])
	array(['pooh', 'pooh', 'pooh', 'Christopher', 'piglet'], dtype='|S11')
#可以看到，‘pooh’被选取的概率明显比其他几个高很多
<div class="hljs-button signin" data-title="登录后复制" data-report-click="{"spm":"1001.2101.3001.4259"}"></div>1234
```
