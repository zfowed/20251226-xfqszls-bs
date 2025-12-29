import { defineRequest, getAppConfig, notify } from 'zf-dbs'
import axios from 'axios'
import { CacheToken } from 'zf-utilz'

export const request = defineRequest(() => {
  const appConfig = getAppConfig()
  return {
    baseURL: appConfig.jnksRequestBaseUrl,
    formatCodeKey: 'code',
    formatMessageKey: 'message',
    formatDataKey: 'data',
    checkSuccessCode: [200],
    errorAuthCode: [401, 403, '401', '403'],
    errorAuthHandle: () => {},
    showErrorMessage: true
  }
})

// token 处理
let cachetokenHandleFn: any = null
const tokenHandle = new CacheToken('token:request-jnks', async function () {
  const appConfig = getAppConfig()

  if (!cachetokenHandleFn) {
    cachetokenHandleFn = axios({
      baseURL: appConfig.jnksRequestBaseUrl,
      method: 'GET',
      url: '/jnks/getToken',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        key: 'nE6lm1u9AxuzGzEP'
      }
    })
  }

  const result = await cachetokenHandleFn
  cachetokenHandleFn = null
  if (result.status !== 200) throw new Error(`登录失败，状态码：${result.status}`)
  const data = result.data

  if (data.code !== 200) throw new Error(`登录失败，错误码：${data.code}`)
  const token = data.token
  const expires = new Date().getTime() + (365 * 24 * 60 * 60 * 1000)

  return { token, expires }
})

request.interceptors.request.use(async function (config: any) {
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = await tokenHandle.get()
  return config
})

request.interceptors.response.use(function (response: any) {
  return response
}, function (error: any) {
  const appConfig = getAppConfig()
  if (!appConfig.useUE) {
    notify.error({ title: '网络错误', message: error?.message || '请检查网络连接' })
  }
  return Promise.reject(error)
})

export default request
