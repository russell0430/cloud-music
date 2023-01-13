## @/components/musicNote
[code](https://github.com/russell0430/cloud-music/tree/main/src/components/musicNote)
### crateNode

开始我还在想,这为啥使用`createElement`创建了一个节点,之后只是给一个子节点并且只使用子节点,正当我想改一改代码变成直接使用创造出的节点的时候,我悟了~\
我们想要获得的是`div.icon-wrapper`,这样可以比较方便的设置初始的类名以及内容,返回的节点是如下结构

```html
<div class="icon-wrapper">
  <div class="iconfont">&#xe642;</div>
</div>
```

### 初始化

初始化使用`useEffect`\
首先生成三个上述`node`,并且添加监听器,在监听到变化结束时,将`node`隐藏,并且将`transform`恢复初始值.

### startAnimation

`startAnimation`经过测试后,是距离页面左上角的`x`,`y`,又因为`div.img-wrapper`是`position:fixed`且是`inline-block`,是页面绝对位置,所以可以决定音符的位置.

1. 首先设置`inline-block`,使元素可见(原来是`none`)
2. 使用`setTimeout`更新`transform`属性,不使用定时器似乎不会触发`transition`,且监听不到`transitionend`事件(`!todo`)
3. 使用两个容器的`transform`属性,一个左右移动,一个上下移动,但是两者的速度变化不同,形成了抛物线.
4. 监听`transitionend`事件,当结束时,将原先的`css`属性值还原到初始值

[demo](https://jsbin.com/gojocux/43/edit)\
可以看到我的`demo`中,`transitionend`触发了两次,`box`,`icon`都触发这个事件.

### css-animation

参考[link](https://www.jianshu.com/p/80f6051389bd)
`trainsition`和`transform`都是`css3`属性,一直没搞懂`transition`是干啥的..

`transition`是过度,指某个`css`属性值如何进行平滑的变化.
`transform`是改变所在元素的外观,`translate`是`transform`中的位移函数


#### translate

基本用法如下

```css
transition: [属性名] [持续时间] [速度曲线] [延迟时间];
```

如高度延迟 1s 后以`ease`曲线进行过度,持续 2s,延迟 1s

```css
transition: height 2s ease 1s;
```

监听所有属性如下

```css
transition: all 2s ease 1s;
```

所有属性是指能够进行动画过渡的属性,有一些属性不能进行过度,如`display`

所以可以根据`:hover`等引起属性值变化

```css
.box {
  width: 10px;
  transition: width 0.4s ease;
}

.box:hover {
  width: 50px;
}
```

[code](https://playcode.io/1055188)

#### transform

如下

```css
transform: [转换函数];
```

| 函数           | 作用 | 介绍                        |
| -------------- | ---- | --------------------------- |
| translate(x,y) | 位移 | 元素 x 轴 y 轴位移,可为负数 |
| scale(x,y)     | 缩放 | 类似上行                    |
| rotate(angle)  | 旋转 | 单位`deg`,顺时针            |

基本的转换函数如上,还有其他函数,如`translate3d(x,y,z)`

#### transition + transform

`transition`可以指定`transform`属性.如下

```css
transition: transform 2s ease 1s;
```

#### transform 对文档流的影响

使用`transition`监听基本属性,如`height`,`width`等,发生改变后,会对文档流产生影响
如[demo](https://codesandbox.io/s/ecstatic-lichterman-r6ot4y)中,每一个`box`长度变化会把自身右边的 box 挤开.可以看出,在发生变化时元素固定的点不是中心点,而是左上角.

[code](https://jsbin.com/joqizoh/4/edit)

使用`transition`监听`transform`属性则不会,因为`transform`只会影响当前元素的状态,达到类似于`position:relative;`的效果,因为`transform`默认基于元素中心进行转换,也可以使用`transform-origin`修改操作的基点,但是依旧不会影响其他元素.

[code](https://jsbin.com/lodirum/edit?output)

```css
.box {
  width: 100px;
  height: 100px;
  transition: all 0.4s ease;
}

.box:hover {
  transform: scale(1.2, 1.2);
}
```
