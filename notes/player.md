# Player

Player 包含两部分,分别是

1. miniPlayer,是最下面播放器
2. normalPlayer,占据整个页面的播放器

其中`normalPlayer`也有两个界面,分别是

1. 旋转的音乐图片
2. 音乐的歌词滚动

整个界面相关的属性由`/Player/index.tsx`内的数据决定,通过`props`传递给两个子组件

## miniPlayer

通过`onEner`,`onExited`中改变`css`的`display`控制是否显示`miniPlayer`(动画过后隐藏组件),以及通过`CSSTransition`有一个进出的动画效果.

## normalPlayer

`normalPlayer`交替切换歌词和旋转图片

### lyric

`lyrics`组件使用`useLyric`,主要实现以下

1. 根据音乐 id 获得歌词
2. 处理歌词成为能够使用的结构
3. 返回当前时间歌词,所有歌词,以及当前歌词的行数,这个是依靠`lyric parser`

歌词还是很好处理的,每行分开并且计算相应的事件即可

`lyric parser`要实现

1. 根据播放时间更新
2. 在播放时间改变时,进行更新

当`player`开始时,使用回调函数更新,并且使用计时器,根据两句歌词之间的时间距离更新内部状态并且调用回调函数更新`currentLineNum` 引发更新

若播放变化分为两种.

1. 点击暂停,继续
2. 拖动改变了进度

对于`lyric parser`两者结构基本一致,区别在于是否继续滚动歌词,最后都是调用`this.play`进行更新的.
每次开始的时候都要记录开始的位置记为`this.startStamp`,

- 第一次更新,即`isSeek=true`时记录音乐播放了多长时间以及当前一句还需要播放多久(`delay`)
- 在以后更新时,只计算两个歌词之间的时间.
- 更新都要设置计时器继续以后的更新

区分上述两种更新的原因是在选择时间的时候,一定不会直接选到歌词的开始,所以真实进度和歌词之间的进度会有误差,所以我们要减去相关的误差.

`_callHandler`可以调用回调函数,每次歌词行数更新就调用这个函数

`destory`在换歌的时候,需要将原先的计时器清空.

## react-transition-grooup

组件内大量使用了`react-transition-group`库内的`CSSTransition`,来学习下

`CSSTransition`执行过程有三个状态

1. 开始状态 对应`appear`,`enter`,`exit`
2. 执行动画 对应`appear-active`,`enter-active`,`exit-active`
3. 执行结束 对应`appear-done`,`enter-done`,`exit-done`

其实我在控制台看到的是`enter`与`enter-active`共同存在,之后再转到`enter-done`状态,可能好用只是因为`css`中,矛盾的属性后写的起作用.在我更改了`enter-active`以及`enter`顺序后,果然就出现了问题.(但是也不能删除`mini-enter`)

按照现在的作用,只能理解成

1. 首先`enter`是相当于一个初始化的状态,这里对应`transform: translate3d(0, 100%, 0);`,即`miniPlayer`在页面下面不可见
2. 之后`enter-active`起作用,对应`transform: translate3d(0, 0, 0);`,开始回到正常地位置

## create-keyframe-animation

在从`miniPlayer`和`normalPlayer`相互转换的时候,小图和大图的过度使用`create-keyframe-animation`,使用起来和`css`的动画类似
