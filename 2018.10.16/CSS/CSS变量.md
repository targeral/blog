# CSS变量

我们知道在less和scss中有一个概念叫做CSS变量。其实现在的CSS也有了这样强大的功能。它的使用如下：

```
var(--header-color, blue);
```

接下来我们来一一解释。

## --header-color

这里的 `--header-color` 就是我们所谓的CSS变量，官方把它叫做自定义属性，其实都是一回事。至于为什么前缀是两个横杠，好像是因为less使用了 `@` 、scss使用了 `$`，为了不发生冲突就使用了 `--`作为前缀。

其语法为：

``` css
--somekeyword: left;
--somecolor: #0000ff;
--somecomplexvalue: 3px 6px rgb(20, 32, 54);
```

变量值大小写敏感，可以是字符串类型或者数字类型。

如果是一个字符串，可以与其他字符串拼接：

``` css
.demo {
    --bar: 'hello';
    --foo: var(--bar)' world';
}
```

如果是数值，则不能与数值单位直接拼接，可借助 `calc`函数。

``` css
.foo {
    --gap: 20;
    /*无效*/
    margin-top: var(--gap)px;
}
.demo {
    --gap: 20;
    margin-top: calc(var(--gap) * 1px);
}
```

如果变量值带有单位，就不能写成字符串：

``` css
.foo {
    /*无效*/
    --foo: '20px';
    font-size: var(--foo);
}
.demo {
    --foo: 20px;
    font-size: var(--foo);
}
```

## var()

`var()`是CSS函数的一种，用于读取变量。它有两个参数，第一个是读取的变量，第二个是变量的默认值。

所谓变量的默认值是指如果该变量不存在，就会使用这个默认值。第二个参数不处理内部的逗号或空格，都是作为参数的一部分。

## 作用域

同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。

变量的作用域就是它所在的选择器的有效范围。也就是说全局的变量我们可以放在 `:root`里面：

``` css
:root {
    --main-color: #06c;
}
```

## 应用

CSS原生的变量功能使得我们可以像less（scss）一样去做一些事情，比如响应式布局：

``` css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

## 兼容处理

``` css
a {
    color: #7f583f;
    color: var(--primary);
}
```

也可以使用@support命令进行检测。

``` css
@supports( (--a: 0)) {
    /* supported */
}
@supports ( not (--a: 0)) {
    /* not supported */
}
```

## Javascript操作

我们可以通过JavaScript来操作CSS变量：

``` javascript
// 设置变量
document.body.style.setProperty('--primary', '#7f58ds');
// 获取变量
document.bdoy.style.getPropertyValue('--primary').trim();
// 移除变量
document.body.style.removeProperty('--primary');
```

这意味着我们可以在任意时刻改变样式表里的变量的值，例如下面是一个监听事件的例子，事件信息被存入 CSS 变量：

``` js
const docStyle = document.documentElement.style;

document.addEventListener('mousemove', (e) => {
  docStyle.setProperty('--mouse-x', e.clientX);
  docStyle.setProperty('--mouse-y', e.clientY);
});
```

那些对 CSS 无用的信息，也可以放入 CSS 变量。

``` css
--foo: if(x > 5) this.width = 10;
```

上面代码中，--foo的值在 CSS 里面是无效语句，但是可以被 JavaScript 读取。这意味着，可以把样式设置写在 CSS 变量中，让 JavaScript 读取。

所以，CSS 变量提供了 JavaScript 与 CSS 通信的一种途径。

## 参考

http://www.ruanyifeng.com/blog/2017/05/css-variables.html
https://developer.mozilla.org/en-US/docs/Web/CSS/var
https://developer.mozilla.org/en-US/docs/Web/CSS/--*#Syntax