## getElementsByClassName的实现

#### 自己的实现

```javascript

  var getElementsByClassName = function (node, tag, clsName) {
        var elements = (node || document).getElementsByTagName(tag)
        var len = elements.length
        var el
        var restul = []
        var hasClass = function (node, clsName) {
              return node.classList.contains(clsName)
            }
        while (el = elements[--len]) {
          if (hasClass(el, clsName)) {
            result.push(el)
          }
        }
        return result
      }

```

  nodeElement.classList 只读属性，返回一个元素的类属性的实时 DOMTokenList集合；

  * 方法
    * remove方法，删除元素某一个class类名
    * add方法，添加一个元素class类名
    * item方法，按集合中的索引返回类名
    * contains方法，判断元素是否含有类名
    * toggle方法，删除或添加某一个类名
  * 兼容性
    * Firefox 26以下的版本未实现
    * IE8以下不兼容
  
上述方法如果不考虑低版本的兼容问题，简单方便，当然不兼容也是其缺点所在

#### Robert Nyman 05年实现

看到这05年，不仅汗颜，小学生一枚

```javascript

  var getElementsByClassName = function (node, tag, clsName) {
    // 兼容了 * 通配符，如果不支持，使用node.all
    var elements = (tag === '*' && node.all) ? node.all : node.getElementsByTagName(tag) 
    var result = []
    // 兼容 a-b-c 类似的样式通配
    var clsName = clsName.replace(/\-/g, '\\-')
    var hasClsReg = new RegExp('(^|\\s)' + clsName + '(\\s|$)')
    // 类名匹配
    for (var i = 0, el; i < elements.length; i ++) {
      var el = elements[i]
      if (hasClsReg.test(el.className)) {
        result.push(el)
      }
    }
    return result
  }

```