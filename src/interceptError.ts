import {ErrorInterceptor, Fetcher, FetraErrorIntercept} from "./types";

export function interceptError(fetraResponse: Fetcher, fetcher: Fetcher) {
  //处理错误拦截
  const errInterceptSet = new Set<ErrorInterceptor>()
  const errInterceptor: FetraErrorIntercept = {
    add: (intercept: ErrorInterceptor) => errInterceptSet.add(intercept),
    remove: (intercept: ErrorInterceptor) => errInterceptSet.delete(intercept)
  }
  const fetra = async (input: RequestInfo | URL, init: RequestInit = {}) => {
    try {
      return await fetraResponse(input, init)
    } catch (e) {
      //用迭代器的方式遍历响应拦截器集合
      let errInterceptIterator = errInterceptSet.values()
      let response: Response | null = null
      for (let it = errInterceptIterator.next(); !it.done; it = errInterceptIterator.next()) {
        response = await it.value(e, input, init, response, fetcher)
      }
      if (response) {
        return response
      }
      throw e
    }
  }
  return {errInterceptor, fetraError: fetra};
}
