## 设计模式

### 单例模式
单例模式就是保证一个类仅只有一个实例，并提供一个访问他的全局访问点。

```javascript
	// 构造函数Person类
	var Person = function (name) {
		this.name = name
	}

	// 单例模式
	var getSingleton = (function () {
		var instance
		return function (name) {
			return instance || (instance = new Person(name))
		}
	})()

	// 测试
	var a = getSingleton('peter')
	var b = getSingleton('tom')
	console.log(a === b) // true

```

* 惰性单例
惰性单例是指只有在被调用的时候才被调用，这种情况很实用。比如在我们调用登录窗口的时候才去创建，如果没有点击登录时候，页面不会创建登录窗体。

```javascript
	
	function LoginModal (options) {
		this.options = options
	}

	LoginModal.getInstance = (function () {
		var instance = null
		return function (options) {
			if (!instance) {
				instance = new LoginModal(options)
			}
			return instance
		}
	})()

```

* 抽象职责单一：

```javascript
	
	var getSingleton = function (fn) {
		var instance 
		return function () {
			return instance || (instance = fn.apply(this, arguments))
		}
	}
```


### 策略模式
定义一系列的算法，把它们封装起来，并且使它们可以相互替换。 

	举一个例子：有这样的需求，如果需要对输入框的输入要进行一定的过滤，比如只能输入数字、或只能禁止输入非法字符等等。
那我们可以这样：

```javascript
	// 只能输入数字
	function NumberStrategy () { }

	NumberStrategy.prototype.rule = function (val) {
		return val.replace(/[^\d]/g, '')
	}

	// 只能输入数字、字母
	function CharStrategy () {}

	CharStrategy.prototype.rule = function (val) {
		return val.replace(/[^0-9a-zA-Z]/g, '')
	}

	// 过滤
	var input = document.getElementById('input')
	function inputFilter (filterStrtegry) {
		return function () {
			this.value = filterStrtegry.rule(this.value)
		}
	}
	input.addEventListener('input', inputFilter(new NumberStrategy()), false)
```

当然我们还可以写更多输入的策略过滤规则。