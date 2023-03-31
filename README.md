## fetch 扩展

    主要目的是能够实现拦截器，以及对请求的统一处理，比如请求头的添加，请求参数的添加，请求的统一处理等等。
    现在已经实现请求拦截、响应拦截、错误拦截

### 安装

npm

```bash
npm install fetra --save
```

yarn

```bash
yarn add fetra
```

 pnpm
```bash
pnpm add fetra
```

### 简单使用
```js
import {createFetra} from 'fetra'
const fetra = createFetra()

fetra("/api/user").then(res => {
    console.log(res)
})
```

### 拦截请求
```ts
import {createFetra, RequestInterceptor} from 'fetra'
const fetra = createFetra()

const reqInterceptor: RequestInterceptor = async (input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => {
  // do something
  return [input, {...init, headers: {...init.headers, 'Content-Type': 'application/json'}}]
}

fetra.request.add(reqInterceptor)
```

### 拦截响应
```ts
import {createFetra, ResponseInterceptor} from 'fetra'
const fetra = createFetra()
const respInterceptor: ResponseInterceptor = async (response: Response, input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => {
  // do something
  return response
}

fetra.response.add(respInterceptor)
```

### 拦截错误
```ts
import {createFetra, ErrorInterceptor} from 'fetra'
const fetra = createFetra()
const errorInterceptor: ErrorInterceptor = async (error: unknown, input: RequestInfo | URL, init: RequestInit, response: Response | null, fetcher: Fetcher) => {
  // do something
  return response
}
```

### 为了方便Restful API的使用，提供了Restfull Wrapper
```ts
import {createFetra, ErrorInterceptor, wrapRestful} from 'fetra'

const fetra = wrapRestful(createFetra())

//新增了get,post,put,delete,patch方法
fetch.get("/api/user").then(res => {
    console.log(res)
})
```
