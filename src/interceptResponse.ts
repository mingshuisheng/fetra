import {Fetcher, FetraResponseIntercept, ResponseInterceptor} from "./types";

export function interceptResponse(fetraRequest: Fetcher, fetcher: Fetcher) {
  //处理响应拦截
  const responseInterceptSet = new Set<ResponseInterceptor>()
  const responseInterceptor: FetraResponseIntercept = {
    add: (intercept: ResponseInterceptor) => responseInterceptSet.add(intercept),
    remove: (intercept: ResponseInterceptor) => responseInterceptSet.delete(intercept)
  }
  const fetraResponse: Fetcher = async (input, init) => {
    let response = await fetraRequest(input, init);
    //用迭代器的方式遍历响应拦截器集合
    let responseInterceptIterator = responseInterceptSet.values()
    for (let it = responseInterceptIterator.next(); !it.done; it = responseInterceptIterator.next()) {
      response = await it.value(response, input, init || {}, fetcher)
    }
    return response
  }
  return {responseInterceptor, fetraResponse};
}
