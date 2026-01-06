import { defineAppConfig } from 'zf-dbs'

const global = window as { appConfig?: ReturnType<typeof defineAppConfig> }

// 生成一个包含步长的范围数组
function rangeWithStep (start: number, end: number, step: number) {
  if (step <= 0) throw new Error('step 必须是正数')

  const result = []
  const count = Math.floor(Math.abs(end - start) / step)
  const dir = start < end ? 1 : -1

  for (let i = 0; i <= count; i++) {
    result.push(Math.floor(start + dir * step * i))
  }

  result.push(Math.floor(end))
  return [...new Set(result)]
}

const config = defineAppConfig({
  // 项目名称
  appTitle: '可视化大屏',
  // 项目宽度，用于计算缩放比例，如果需要适配多个宽度
  // appWidth: 9472,
  // appWidths: [9472, 4544],
  appWidths: rangeWithStep(9472, 4544, (9472 - 4544) / 50), // 生成 50 个宽度的适配列表
  // 项目高度，用于计算缩放比例（非必要不要修改，通过修改宽度来适配）
  appHeight: 2556,
  // 是否使用缩放
  useScale: true,
  // 是否拉伸缩放
  useStretch: false,
  // 是否嵌入到 UE 中
  useUE: false,
  // 轮询间隔
  pollingInterval: 10 * 1000,

  // 请求
  // request: {
  //   baseURL: 'http://223.76.158.56:7000/xfq_service',
  //   formatCodeKey: 'code',
  //   formatMessageKey: 'msg',
  //   formatDataKey: 'data',
  //   checkSuccessCode: [0],
  //   errorAuthCode: [401, 403, '401', '403'],
  //   errorAuthHandle: () => {},
  //   showErrorMessage: true
  // }

  xfqxRequestUrl: import.meta.env.DEV ? '/xfq_service' : 'http://223.76.158.56:7000/xfq_service',
  xfqxRequestToken: 'eyJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6ImFkbWluIiwic3ViIjoieGZxQDEyMzQ1NiIsImRlcHRJZCI6IjE1IiwiaXNzIjoia2VlcHNvZnQiLCJ1c2VyTmFtZSI6ImFkbWluIiwidXNlcklkIjoiMSIsImlhdCI6MTc2NjQ1ODk3OCwianRpIjoia2MifQ.ZkAd5iIHzXr3OJgvv-vcoGUADt8S0ilTeRaqR3SemKY'
})

global.appConfig = config
export default config
