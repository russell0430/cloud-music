# singer

## 自适应调节图片大小

歌手页面上面的图片宽度和页面等宽,下面就是歌曲列表,在改变页面后,需要对图片大小以及下方列表位置调整,这些都是`refresh`函数干的活

`refresh`首先获得图片的高度,因为图片的`css`是全宽,且`padding-top`为 75%,即图片高度为宽度的 75%且能够提前占位.之后把相应的高度弄好

监听`scroll`的 y 轴坐标

1. 若向下滑动,即对应`newY>0`,即通过`scale`扩大图片,收藏按钮向下,列表被下拉的效果是`BScroll`的
2. 向上时,若不超过一定程度,列表遮住图片,收藏按钮模糊
3. 超过`Header`时`Header`部分遮盖住列表上部分

在**1**时,图片通过`transform`中心放大,按钮通过`transform`向下移动,`BgLayer`则调整高度,防止覆盖到图片导致能够图片不能全部显示.

在**2**时,图片恢复初始值(因为在**3**时会改变),并且按钮向上移动并且开始模糊

在**3**时,`Header`设置`zIndex`显示在图片之上,并且图片设置`zIndex`遮盖住列表,图片设置固定的高度以及清空`paddingTop`.同时,又由于`SongListWrapper`中的`div`为`visible`,所以向上时,列表也能够看到,`BgLayer`也是在这个时候,将列表后面的图片啥的遮盖掉.(去掉`bgLayer`后能在列表上滑后看到图片和按钮)