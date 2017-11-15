Function.prototype.before = function (beforeFn) {
	var self = this
	return function () {
		beforeFn()
		return self.apply(this, arguments)
	}
}

Function.prototype.after = function (afterFn) {
	var self = this
	return function () {
		var _ret = self.apply(this, arguments)
		afterFn()
		return _ret
	}
}

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