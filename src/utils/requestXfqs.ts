import { defineRequest, getAppConfig, notify } from 'zf-dbs'

export const request = defineRequest(() => {
  const appConfig = getAppConfig()
  return {
    baseURL: appConfig.xfqxRequestUrl,
    formatCodeKey: 'code',
    formatMessageKey: 'content',
    formatDataKey: 'detail',
    checkSuccessCode: [1],
    errorAuthCode: [401, 403, '401', '403'],
    errorAuthHandle: () => {},
    showErrorMessage: true
  }
})

request.interceptors.request.use(async function (config: any) {
  const appConfig = getAppConfig()
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.authorization = appConfig.xfqxRequestToken
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
