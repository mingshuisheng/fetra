import {Fetcher, Fetra, WrapperFetraRestful} from "./types";

const methods = ["get", "post", "put", "delete", "patch"] as const

export function wrapRestful(fetra: Fetra): WrapperFetraRestful {

  const wrapFetra: WrapperFetraRestful = fetra as WrapperFetraRestful

  for (let method of methods) {
    wrapFetra[method] = rewriteMethod(fetra, method.toUpperCase())
  }

  return wrapFetra
}

function rewriteMethod(fetra: Fetcher, method: string): Fetcher{
  return (input: RequestInfo | URL, init: RequestInit = {}) => {
    return fetra(input, {...init, method})
  }
}
