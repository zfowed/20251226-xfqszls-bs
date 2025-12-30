import { defineAppConfig } from 'zf-dbs'

const global = window as { appConfig?: ReturnType<typeof defineAppConfig> }

const config = defineAppConfig({
  // 项目名称
  appTitle: '可视化大屏',
  // 项目宽度，用于计算缩放比例，如果需要适配多个宽度
  appWidth: 9472,
  appWidths: [9472, 4544],
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

  // API 配置
  jnksRequestBaseUrl: 'http://192.168.111.252:8080',

  hmlRequestBaseUrl: 'http://219.139.76.42:20001',

  // 后台地址
  taurusfrontRequestUrl: 'http://taurus.aotman.fun',
  // 后台Token
  taurusfrontRequestToken: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijg5ZjhmOTZkLWJkZGQtNDk0NS1iMDE2LTRmNjBmZjVlMTkwMiJ9.TFbkH5oa17n3yJ9TGsRWNfF3epUH8vpsIDrjrs19pT4_b7okH7ZfkSMg-fhIgm0d7vI3ahTOk33DScxp21_k2w'
})

global.appConfig = config
export default config
