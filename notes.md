## question

axios 使用拦截器后，typescript 不能正确识别返回的 data 的类型\
可能因为拦截器不太好分析\

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

## question

在使用 react-lazyload 时，发现 react-lazyload 不能够很好的支持当前版本的react@18.2\
报错需要库`prop-types`
经过`github`查找后发现 [issue](https://github.com/twobin/react-lazyload/issues/347)\
应该是在 react@17 后，上述库的依赖被移除，但是这个库还是依赖，并且依赖标记成了开发依赖，所以就寄了\
虽然可能我自己安装一个依赖就可以跑起来了，但还是先暂时不用这个库了。\
后续可能有空自己实现一个看\
（大概率没有，导师给的 🍐 满满，但我还是喜欢写前端）
