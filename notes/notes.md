## question1

`axios `使用拦截器后，`typescript `不能正确识别返回的`data` 的类型\
可能因为拦截器不太好分析

```typescript
// request.ts
interface BaseResponse {
  code: number
}
interface BannerResponse {
  banners: BannerType[]
}

export const getBannerRequest = () => {
  return axiosInstance.get<string, BannerResponse & BaseResponse>("/banner")
}
```

```typescript
// useRecommend.ts
getBannerRequest().then((data) => {
  console.log(data.banners)
  // 这行不报错了
  setBannerList(data.banners)
})
```

## question2

在使用 `react-lazyload` 时，发现 `react-lazyload` 不能够很好的支持当前版本的`react@18.2`\
报错需要库`prop-types`
经过`github`查找后发现 [issue](https://github.com/twobin/react-lazyload/issues/347)\
应该是在 `react@17` 后，上述库的依赖被移除，但是这个库还是依赖，并且依赖标记成了开发依赖，所以就寄了\
虽然可能我自己安装一个依赖就可以跑起来了，但还是先暂时不用这个库了。\
后续可能有空自己实现一个看。\
（大概率没有，导师给的 🍐 满满，但我还是喜欢写前端）

### 后续

看到评论里有一个[pr](https://github.com/twobin/react-lazyload/pull/387/files#diff-51e4f558fae534656963876761c95b83b6ef5da5103c4adef6768219ed76c2de),可能有用.

## question3

使用`recommend`时，原项目使用`redux`来存储`recommend`以及`bannerList` 里面的`imgUrl`,\
这里由于是使用`hook`不能有副作用依赖,所以就每次转换路由都请求一次.\
还是有点小疑问,就算是使用`redux`存储了全局变量,也只是存相关的`url`.\
为什么原文说这样就可以在切换页面(`/recommend` -> `/singers`)时不进行网络请求.\
存的又不是图片缓存啊?\
这里做的又不是`vue`中的`keep-alive`

## question4

在`recommend`界面,`Bscroll` 覆盖的区域,初次加载时无法滑动,只有调整过页面大小后才可以滑动.\
经过查阅资料后,可能是列表图片未加载出来的时候就计算了高度,导致高度塌陷,\
最终 `BScroll` 以为列表没有多长,但是图片加载后很长.\

### 思考

为什么`Singers` 页面的横向滑动没有此现象,除了页面使用`useEffect`进行加载后的处理(看似是原因,其实应该不是),\
滚动的元素是页面上的`span`,本来就要占位.

### 吐槽

`BScroll`用起来好难受,`typescript` 没有演示也就罢了,返回的` BScroll` 没有类型声明,`new`出来的实例也不知道是个啥,打印出来是个`native`函数???迷惑行为!一夜回到`javascript`的猜环节

## question5

关于`typescript`的类型问题\
对于一个非前端的`typescrip`项目,类型一般写在`types.ts`里,但是前端项目我就有点迷惑了.\
照理说,网络上传的数据都是网络请求来的.那最初数据都是在请求文件里,但是组件内部也需要类型,如果组件从网络请求文件中`import`,感觉有点怪.如果在组件文件夹单独写一个,就感觉有点乱且复杂(`import`到处飞).比较好一点的方法可能是使用`declare.d.ts`全局声明.

---

后续\
后来在请求的`api`文件夹下创建一个新的`types.ts` 管理`api`内相关的类型,其他类型,如`singer`,`song`等,放到`global.d.ts`全局声明



## Bug

### 1

`recommend` 页面没有办法在首次加载后进行滚动

#### solution

在 `scroll `组件挂载后出发 `resize `事件,使`BScroll`监听到并且重新计算

```typescript
// scroll/index.tsx

// 加载后触发resize事件
// 防止首次加载不能滚动
useEffect(() => {
  window.dispatchEvent(new Event("resize"))
}, [])
```

## 学到了

### 1

```JavaScript

import React, { useState, useEffect } from 'react';
const useCustomHook = (a, b) => {
  useEffect(() => {
    console.log("useEffect work",a,b)
  }, [a, b])
}
export function App(props) {
  const [a,setA]=useState(0)
  const [b,setB]=useState(100)
  useEffect(()=>{
    setTimeout(()=>{
      setA(10)
      setB(20)
    },1000)
  },[])
  useCustomHook(a,b)
  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// Log to console
console.log('Hello console')

```

之前一直有个疑问,`useCustomHook`里面的`useEffect`会更新嘛?\
经过尝试,可以!\
[link](https://playcode.io/1039532)\

这里`useCustomHook`没有自己内部状态(`state`),但是依旧可以说使用外部状态调用`useEffect`.

1. `useEffect`是通过最后的依赖数组的比较来决定是否执行第一个回调函数,基础类型就比较值,引用类型就比较地址,这里是基础类型,所以比较值.
2. 这里像是一个之前的 react 的`PureComponent`

组件更新的过程是

1. 计时器调用开始宏任务,更新变量`a`,`b`.(这里好像不是批量更新,因为是宏任务而不是组件内部调用)
2. 因为`a`,`b`相关的`useState`是在`App`组件内调用的,所以整个`App`组件重新执行.
3. App 内部的`useEffect`依赖数组为空,跳过.
4. `useCustomHook`重新执行,发现传进来的`a`,`b`更新了,重新执行副作用函数.

上述内容是我在做`SingerList`想起的,我想使用`customHook`,但对于 customHo 传入参数变化是否引起内部`useEffect`调用副作用函数有点担心,现在清楚了~

在写上述代码时,我又有一个设计上的问题\
在有一个`customHook`里,我是需要将`state`显式更改还是隐式更改.如

```typescript
// 显式

const useCustomHook = (a, b) => {
  const [aa, setAa] = React.useState(a)
  const [bb, setBb] = React.useState(b)
  React.useEffect(() => {
    console.log("a or b updated!")
  }, [aa, bb])
  return {
    aa,
    bb,
    setAa,
    setBb,
  }
}
// 隐式

const useCustomHook = (a, b) => {
  React.useEffect(() => {
    console.log("a or b updated!")
  }, [a, b])
  return { a, b }
}
```

显式可以使用手动更新`setAa`,`setBb`\
隐式根据输入的值调用副作用函数,但是这种方式好像有点奇怪,这也是我之前使用的方法\
仔细思考`React.useState`的使用,似乎也是这种显式,只是初始化的时候依赖输入的值\

### 2

如果组件有时出现有时没有,那么组件中`useState`中的数据会保存嘛,这个可以有两种情况

1. 路由状态更新
2. 组件只是有时加载有时未加载,如下面

```typescript
const Com=()=>{
  const [a,setA]=useState(1)
  useEffect(()=>{
    setTimeout(()=>{
      setA(2)
    },1000)
  },[])
  return <div>a<div>
}

const App=()=>{
  const [show,setShow]=useState(false)
  return <div>
  {
    isShow?<Com/>:null
  }
  <div>
}
```

讲到这里,想起之前学习`hook`的一个知识点\
使用`hook`不能用判断语句,要是遇到需要判断可以拆成一个组件来\

### 3

看到册子的 13 章的标题使用`hooks`实现`redux`,让我想起之前看的`KBar`以及`react-hot-toast`源码.也都是通过`hooks`实现的.

#### KBar 思路

使用`useRef`作为一个存储的容器,相当于一个全局的变量.之后用`useState`中返回的`setState`函数来进行数据的更新,`setState`变成一个发送"数据更新了,以来的视图来重新渲染"的信号.再使用 useContext 进行包装.包装成一个`customHook`,每次调用都可以获得最新的数据,当然,为了保证数据最新,它的数据获取使用`const getState=()=>ref`,获得指针.

```typescript
const
```

### 4

多种使用动画的方式
1. `npm`库 `create-keyframe-animation`
2. `npm`库`react-transition-group`配合`css`


### 5

使用`svg`
