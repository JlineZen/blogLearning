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

	var addSheet = function (style) {
		var styleNode = document.createElement('style')
		styleNode.type = 'text/css'
		document.getElementsByTagName('head')[0].appendChild(styleNode)
		styleNode.innerHTML = style
	}

	var ColorPicker = Class.create()
	ColorPicker.prototype = {
		initialize: function (options) {
			this.setOptions(options)
			this.drawPicker(this.options.textfiled_id)
		},
		setOptions: function (options) {
			this.options = {
				id: 'colorpicker' + new Date().getTime(),
				textfiled_id: null
			}
			extend(this.options, options)
		},
		ID: function (id) {
			return document.getElementById(id)
		},
		CE: function (tag) {
			return document.createElement(tag)
		},
		hide: function (el) {
			el.style.display = 'none'
		},
		show: function (el) {
			el.style.display = 'block'
		},
		colorPickerHtml: function () {
			var _hex = ['FF', 'CC', '99', '66', '33', '00']
			var builder = []
			// 绘制一个颜色区域小格子
			var _drawCell = function (builder, red, green, blue) {
				builder.push('<td bgcolor="')
				builder.push('#' + red + green + blue)
				builder.push('" unselectable="on"></td>')	
			}
			// 绘制一行颜色
			var _drawRow = function (bulider, red, blue) {
				bulider.push('<tr>')
				for (var i = 0; i < 6; i++) {
					_drawCell(builder, red, _hex[i], blue)
				}
				builder.push('</tr>')
			}
			// 绘制区域颜色块之一
			var _drawTable = function (builder, blue) {
				builder.push('<table class="cell" unselectable="no">')
				for (var i = 0; i < 6; i++) {
					_drawRow(builder, _hex[i], blue)
				}
				builder.push('</table>')
			}
			// 开始创建
			builder.push('<table><tr>')
			for (var i = 0; i < 3; i++) {
				builder.push('<td>')
				_drawTable(builder, _hex[i])
				builder.push('</td>')
			}
			builder.push('</tr><tr>')
			for (var i = 3; i < 6; i++) {
				builder.push('<td>')
				_drawTable(builder, _hex[i])
				builder.push('</td>')
			}
			builder.push('</tr></table>')
			builder.push('<table id="color_result"><tr><td id="color_view"></td><td id="color_code"></td></tr></table>')
			return builder.join('')
		},
		addEvent: function (el, type, fn) {
			if (!+'\v1') {
				el['e' + type] = fn
				el.attachEvent('on' + type, function () {
					el['e' + type]()
				})
			} else {
				el.addEventListener(type, fn, false)
			}
		},
		drawPicker: function (id) {
			var self = this
			var textfiled = this.ID(id)
			var colorpicker = this.CE('div')
			colorpicker.className = 'colorpicker'
			colorpicker.innerHTML = this.colorPickerHtml()
			textfiled.parentNode.insertBefore(colorpicker, null)
			this.hide(colorpicker)
			this.addEvent(textfiled, 'focus', function () {
				textfiled.style.position = 'relative'
				self.show(colorpicker)
				var left = textfiled.style.offsetLeft + 'px'
				var top = (textfiled.clientHeight + textfiled.offsetTop) + 'px'
				colorpicker.style.left = left
				colorpicker.style.top = top
			})
			this.addEvent(colorpicker, 'mouseover', function () {
				var e = arguments[0] || window.event
				var target = e.target || e.srcElement
				var td = target.nodeName.toLowerCase() // IE 会将nodeName转为大写
				var colorView = self.ID('color_view')
				var colorCode = self.ID('color_code')
				if ('td' === td) {
					colorView.style.backgroundColor = target.bgColor
					!+'\v1' ? (colorCode.innerText = target.bgColor) : (colorCode.innerHTML = target.bgColor)
				}
			})
			this.addEvent(colorpicker, 'click', function () {
				var e = arguments[0] || window.event
				var target = e.target || e.srcElement
				var td = target.nodeName.toLowerCase()
				if (td === 'td') {
					textfiled.value = target.bgColor
					self.hide(colorpicker)
				}				
			})
		}
	}
	addSheet('\
div.colorpicker {display:none;position:absolute;width:216px;border:2px solid #c3c9cf;background:#f8f8f8;}\
div.colorpicker table{border-collapse:collapse;margin:0;padding:0;width:100%;}\
div.colorpicker  table td {padding:0!important;}\
div.colorpicker .cell td{height:12px;width:12px;}\
#color_result{width:216px;}\
#color_view{width:110px;height:25px;}')
	win.ColorPicker = ColorPicker
})(window)