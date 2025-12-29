import { defineRequest, getAppConfig, notify } from 'zf-dbs'

const appConfig = getAppConfig()
export const request = defineRequest(() => {
  return {
    baseURL: appConfig.taurusfrontRequestUrl,
    formatCodeKey: 'code',
    formatMessageKey: 'message',
    formatDataKey: 'rows',
    checkSuccessCode: [200],
    errorAuthCode: [401, 403, '401', '403'],
    errorAuthHandle: () => {},
    showErrorMessage: true
  }
})

request.interceptors.request.use(async function (config: any) {
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = appConfig.taurusfrontRequestToken
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
