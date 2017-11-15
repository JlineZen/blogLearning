### JS面向切面编程

面向切面编程在实际的使用中，将一些跟核心业务逻辑模块无关的代码抽离出来，降低耦合。常包括日志统计，安全控制，异常处理等。

```javascript
	var aop = {
			before: function (fn, before) {
				return function () {
					before()
					return fn.apply(this, arguments)
				}
			},
			after: function (fn, after) {
				return function () {
					var result = fn.apply(this, arguments)
					after()
					return result
				}
			}
		}
```