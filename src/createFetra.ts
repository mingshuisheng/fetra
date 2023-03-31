import type {Fetcher, Fetra, InputIntercept} from "./types";
import {interceptRequest} from "./interceptRequest";
import {interceptURL} from "./interceptURL";
import {interceptResponse} from "./interceptResponse";
import {interceptError} from "./interceptError";


export const createFetra = (baseUrl: string = "", fetcher: Fetcher = fetch): Fetra => {
  const inputIntercept: InputIntercept = (input) => interceptURL(baseUrl, input)
  const {requestInterceptor, fetraRequest} = interceptRequest(inputIntercept, fetcher);
  const {responseInterceptor, fetraResponse} = interceptResponse(fetraRequest, fetcher);
  const {errInterceptor, fetraError} = interceptError(fetraResponse, fetcher);

  const fetra: Fetra = fetraError as Fetra
  fetra.request = requestInterceptor
  fetra.response = responseInterceptor
  fetra.error = errInterceptor

  return fetra
}
