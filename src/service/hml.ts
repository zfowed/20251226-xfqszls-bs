import { defineService } from 'zf-dbs'
import request from '@/utils/requestHml'

// 月度生产信息
export const getMonthlyProductionInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/hml/APSM0111/getMonthlyProductionInfo', {}, { params })
})

// 根据时间范围获取生产信息
export const getProductionInfoByDateRange = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/APSM0111/getProductionInfoByDateRange', {}, { params, ...config })
})

// 设备测点信息
export const getRealData = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/hml/queryRealData', { params, ...config })
})

// 设备测点信息详情
export const getTagDetail = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/hml/queryTagDetail', { params, ...config })
})

// 告警趋势接口
export const getAlarmTrend = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/hml/HML0903/alarmTrend', params)
})

// 告警列表接口
export const getAlarmList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/alarmList', {}, { params, ...config })
})

// 在线设备统计
export const getDeviceTotalInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/deviceList', {}, { params, ...config })
})

// 有害气体检测，测点实时数据
export const getGasDetectionList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/gasDetectionList', {}, { params, ...config })
})

// 区域人数统计
export const getAreaDataList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/areaDataList', {}, { params, ...config })
})

// 人员定位系统数据
export const getPlsList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/plsList', {}, { params, ...config })
})

// 人员定位入井人数统计
export const getPresonList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/personList', { ...params, ...config })
})

// 设备统计
export const getEquipmentCount = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/equipmentCount', {}, { params, ...config })
})

// 设备列表
export const getEquipmentList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/equipmentList', {}, { params, ...config })
})

// 告警信息分析
export const getAnalyzeAlarms = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/hml/HML0903/analyzeAlarms', params)
})

// 告警信息展示
export const getAnalyzeAlarmList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/analyzeAlarmList', {}, { params, ...config })
})

// 应急通风供水系统 风速
export const getGasList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/gasList', {}, { params, ...config })
})

// 应急通风供水系统 风压
export const getWindPressureList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/hml/HML0903/windPressureList', {}, { params, ...config })
})
