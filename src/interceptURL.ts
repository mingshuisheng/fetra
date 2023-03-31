//处理baseUrl
export function interceptURL(baseUrl: string, input: RequestInfo | URL) {
  if (typeof input === "string") {
    //判断是否绝对路径，如果不是则拼接baseUrl
    if (!input.startsWith("http") || !input.startsWith("https")) {
      input = concatUrl(baseUrl, input)
    }
  } else if (input instanceof Request) {
    //判断路径是否绝对路径，如果不是则拼接baseUrl
    if (!input.url.startsWith("http") || !input.url.startsWith("https")) {
      //创建新的Request对象，避免修改原有的Request对象
      input = new Request(concatUrl(baseUrl, input.url), input)
    }
  }
  //因为URL已经是绝对路径了，所以不需要对URL对象进行处理
  return input
}

//连接url并且避免重复的斜杠
const concatUrl = (baseUrl: string, url: string) => {
  return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
