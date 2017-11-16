### 函数节流
函数节流就是对于频繁触发的函数的调用，当然这不限于对性能。比如对于窗口检测resize、input、mouseover、scroll函数的调用。
**实现原理**
* 通过添加定时器延时触发，在一定的时间内，如果定时器还存在，则不触发，待执行一次后删除触发器。
```javascript
	// 函数节流
	var throttle = function (fn, delay) {
		var timer // 定时器
		var firstExcute = true // 首次执行不节流
		return function () {
			var __me = this
			var __args = arguments
			// 首次执行
			if (firstExcute) {
				fn.apply(__me, __args)
				return firstExcute = false
			}

			// 定时器是否存在，存在则不执行
			if (timer) {
				return false
			}

			// 定时器不存在的情况
			timer = setTimeout(function () {
				clearTimerout(timer) // 清除定时器
				timer = null // 销毁定时器
				fn.apply(__me, __args)
			}, delay || 100)
		}
	}
```

* 另一种实现：通过计时实现

```javascript
	var _throttle = function (fn, delay) {
		var last = 0
		return function () {
			var now = + new Date()
			var __delay = delay || 100
			if (now - last > __delay) {
				fn.apply(this, arguments)
				last = now
			}
		}
	}	

```

* 分批次任务

```javascript
	var timeChunk = function (ary, fn, count, time) {
		var timer
		var len = ary.length
		var obj

		var start = function () {
			for (var i = 0; i < len; i++) {
				obj = ary.shift()
				fn(obj)
			}
		}

		return function () {
			timer = setInterval(function () {
				if (ary.length === 0) {
					return clearInterval(timer)
				}
				start()
			}, time)
		}
	}
```