### 事件绑定的兼容写法

#### 绑定事件

```javascript
	var addEvent = function (obj, type fn) {
		if (obj.addEventListener) {
			obj.addEventListener(type, fn, false)
		} else if (obj.attachEvent) {
			obj['e' + type + fn] = fn
			obj.attachEvent('on' + type, function () {
				obj['e' + type + fn]()
			})
		}
	}

	// 另一种写法 巧妙的利用了闭包
	var addEvent = (function (obj, type, fn) {
		if (document.addEventListener) {
			return function (el, type, fn) {
				el.addEventListener(type, fn, false)
			}
		} else {
			// IE兼容
			return function (el, type, fn) {
				el.attachEvent('on' + type, function () {
					fn.call(el, window.event)
				})
			} 
		}
	})()
```


#### property属性的变化 
onpropertychange是IE浏览器的特有事件，它监听在一个元素的属性变化时触发，常见的的文本长度或样改变。在标准浏览器中的oninput事件，不过它只针对textfiled和textarea的value属性变化。

```javascript
	var addPropertyChange = function (obj, fn) {
		if (window.ActiveXObject) {
			obj.onpropertychange = fn
		} else {
			obj.addEventListener('input', fn, false)
		}
	}
```


#### 移除事件

```javascript
	var removeEvent = function (obj, type, fn) {
		if (obj.addEventListener) {
			obj.removeEventListener(type, fn, false)
		} else if (obj.detachEvent) {
			obj.detachEvent('on' + type, obj['e' + type + fn])
			obj['e' + type + fn] = null // 防止IE内存泄漏
		}
	}
```