(function (win) {
	var Class = {
		create: function () {
			return function () {
				this.initialize.apply(this, arguments)
			}
		}
	}
	var extend = function (destination, source) {
		for (var key in source) {
			destination[key] = source[key]
		}
		return destination
	}
	var addSheet = function (styleText) {
		var style = document.createElement('style')
		style.setAttribute('type', 'text/css')
		document.getElementsByTagName('head')[0].appendChild(style)
		style.innerHTML = styleText
	}
	var Calender = Class.create()

	Calender.prototype = {
		initialize: function(options) {
			this.setOptions(options)
			this.drawCalender(this.options.date)
		},
		setOptions: function (options) {
			var defaultOptions = {
				date: new Date(),
				dateFieldId: null
			}
			this.options = extend(defaultOptions, options)
		},
		// 求出月份第一天是几号
		firstDayOfMonth: function (year, month) {
			return new Date(year, month, 1).getDay()
		},
		// 求出一个月有多少天
		lastDayOfLastMonth: function (date) {
			return new Date(year, month, 0).getDate()
		},
		initEvents: function (el, textfield) {
			var self = this
			var target = document.getElementById(this.id)
			this.addEvent(textfield, 'focus', function (e) {
				self.showEl(el)
			})
			this.addEvent(el, 'click', function () {
				var e = arguments[0] || window.event
				var n = e.target || e.srcElement
				var td = n.nodeName.toLowerCase()
				if (td === 'td') {
					self.hideEl(el)
				}
			})
		},
		formatDate: function (date) {
			return date < 10 ? '0' + date : date
		},
		addEvent: function (el, type, fn) {
			if (el.addEventListener) {
				el.addEventListener(type, fn, false)
			} else if (el.attachEvent) {
				el['e' + type] = fn
				el.attachEvent('on' + type, function () {
					el['e' + type]()
				})
			}
		},
		calenderHtml: function () {
			var builder = []
			
			return builder.join('')
		},
		showEl: function (el) {
			el.style.display = 'block'
		},
		hideEl: function (el) {
			el.style.display = 'none'
		},
		drawCalender: function() {
			var textfield = document.getElementById(this.options.dateFieldId)
			var calendar = document.createElement('div')
			calendar.innerHTML = this.calenderHtml()
			textfield.parentNode.insertBefore(calendar, null)
			var top = (textfield.offsetHeight + textfield.offsetTop) + 'px'
			var left = textfield.offsetLeft + 'px'
			calendar.style.top = top
			calendar.style.left = left
			this.hideEl(calendar)
			this.initEvents(calendar, textfield)
		}
	}
	addSheet('\
		body {margin: 0 !important;font-family: "microsoft yahei";}\
		#bjiang-date-picker {width: 274px;position: fixed;display: none;z-index: 9999;}\
		#bjiang-date-picker .calendar {width: 254px;padding: 10px;border: 1px solid #bbb;overflow: hidden;box-shadow: 3px 3px 3px #e2e2e2;}\
		#bjiang-date-picker .last-day {color: pink;}\
		#bjiang-date-picker .next-day {color: green;}\
		#bjiang-date-picker .column {width: 252px;overflow: hidden;}\
		#bjiang-date-picker .column .pre {padding-left: 15px;}\
		#bjiang-date-picker .column .next,\
		#bjiang-date-picker .column .pre {color: #666;font-weight: 400;width: 60px;float: left;font-size: 20px;cursor: pointer;}\
		#bjiang-date-picker .column .next {text-align: right;padding-right: 15px;}\
		#bjiang-date-picker .column .date {color: #ff2323;width: 100px;text-align: center;float: left;font-size: 16px;}\
		#bjiang-date-picker .day {width: 36px;height: 36px;float: left;cursor: pointer;line-height: 36px;text-align: center;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}\
		#bjiang-date-picker .last-day:active,\
		#bjiang-date-picker .next-day:active,\
		#bjiang-date-picker .month-day:active {color: #fff;background-color: green;}\
		#bjiang-date-picker .day-now {color: #fff;background-color: #ff2323;}\
	')
	win.Calender = Calender
})(window)