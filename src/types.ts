export type InputIntercept = (input: RequestInfo | URL) => RequestInfo | URL
export type Fetcher = typeof fetch
export type RequestInterceptor = (input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => Promise<[RequestInfo | URL, RequestInit] | Response>
export type ResponseInterceptor = (response: Response, input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => Promise<Response>
export type ErrorInterceptor = (error: unknown, input: RequestInfo | URL, init: RequestInit, response: Response | null, fetcher: Fetcher) => Promise<Response | null>

export type FetraRequestIntercept = {
  add: (intercept: RequestInterceptor) => void
  remove: (intercept: RequestInterceptor) => void
}

export type FetraResponseIntercept = {
  add: (intercept: ResponseInterceptor) => void
  remove: (intercept: ResponseInterceptor) => void
}

export type FetraErrorIntercept = {
  add: (intercept: ErrorInterceptor) => void
  remove: (intercept: ErrorInterceptor) => void
}

export type Fetra = {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
  request: FetraRequestIntercept,
  response: FetraResponseIntercept,
  error: FetraErrorIntercept,
}

export type WrapperFetraRestful = {
  get: Fetcher
  post: Fetcher
  put: Fetcher
  delete: Fetcher
  patch: Fetcher
  origin: Fetcher
} & Fetra
