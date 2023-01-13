# progressBar

progressBar 是歌曲播放的进度条,需要实现以下功能

1. 进度条拖动,点击
2. 进度状态更新后,通知外部

从父组件获得如下属性

1. 当前百分比
2. 进度变化的回调函数

`jsx`结构如下

```typescript
<div className="bar-inner" ref={progressBar} onClick={progressClick}>
  <div className="progress" ref={progress}></div>
  <div
    className="progress-btn-wrapper"
    ref={progressBtn}
    onTouchStart={progressTouchstart}
    onTouchMove={progressTouchMove}
    onTouchEnd={progressTouchEnd}
  >
    <div className="progress-btn"></div>
  </div>
</div>
```

`btn`即为进度条里的当前进度点,可以进行拖动,`onTouchStart`,`onTouchMove`,`onTouchEnd`为监听拖动的函数

- `_offset`是内部改变进度条长度,以及改变进度点位置,不涉及外部
- `_changePercent`,获取当前最新进度条长度,计算百分比,并且执行进度条变化的回调函数

### 拖动函数

1. 拖动开始,`onTouchStart`初始化拖动事件
2. 拖动过程中,更新进度条位置
3. 拖动结束,通过`_changePercent`获取最新的百分比,并且调用回调函数

### 点击函数

点击函数类似上面的过程,但是更简单,直接计算最新的百分比,并且调用回调函数