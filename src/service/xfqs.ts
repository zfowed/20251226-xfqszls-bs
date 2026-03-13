import { defineService } from 'zf-dbs'
import request from '@/utils/requestXfqs'

// 农业灌溉统计
export const findWaterUserList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfomanager/findWaterUserList', { params, ...config })
})

// 生态供水
export const getFactoryRealData = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/st/pump/getFactoryRealData', { params, ...config })
})

// 渠系信息统计
export const getChannelCount = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/st/channelB/getChannelCount', { params, ...config })
})

// 天气信息
export const queryStationWeather = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/weather/queryStationWeather', { params, ...config })
})

// 可供水量
export const getAllstep = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/rsvr/stat/allstep', params)
})

// 工程巡检
export const getPatrolList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/patrol/list', { params, ...config })
})

// 水闸状态 / 水库监测
export const getGatePageList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/gate/page', params)
})
// 查询视频点位列表
export const getVideoStationList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/st/stbprpb/getVideoStationList', { params, ...config })
})

export const getVideoUrl = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/external/dh/getVideoUrl', { params, ...config })
})

// 可供水量
export const findSinlgeRsvrData = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/rsvr/findSinlgeRsvrData', params)
})

// 需水量
export const getShortPosition = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/watercontrol/platform-bus-wdd/api/bus/xsShortData/getShortPosition', { params, ...config })
})

// 长期需水量
export const getLongPosition = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/watercontrol/platform-bus-wdd/api/bus/xsShortData/getLongPosition', { params, ...config })
})

// 配水调度
export const getOptionConfigList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/wrDynamicOptionConfig/findList', { params, ...config })
})

// 供水统计
export const getGongshuiInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/onemap/getGongshuiInfo', { params, ...config })
})

// 未来24h水库水情统计数据
export const getRsvrWarnInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getRsvrWarnInfo', { params, ...config })
})

// 未来24h水库水情曲线数据
export const hsybForecastccFindPage = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/hsyb/business/hsybForecastcc/findPage', params)
})

// 根据hsybForecastccFindPageId 查询曲线数据
export const hsybForecastccFindById = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/hsyb/business/hsybForecastcc/findById?id=' + params.id, params)
})

// 安全管理责任人列表查询
export const queryMaterialManagerList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/flood/control/queryMaterialManagerList', { params, ...config })
})

// 重点水位预警列表查询
export const getZZWarnInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getZZWarnInfo', { params, ...config })
})

// 预警信息列表查询
export const getTemperatureAndPptnWarnInfoForBus = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getTemperatureAndPptnWarnInfoForBus', { params, ...config })
})

// 墒情站告警
export const getSoilWarnInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getSoilWarnInfo', { params, ...config })
})

// 防汛物资列表查询
export const queryMaterialList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/flood/control/queryMaterialList', { params, ...config })
})

// 预案调令列表查询
export const queryFloodPlanFile = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/flood/control/queryFloodPlanFile', { params, ...config })
})

// 删除预案调令
export const delFloodPlanFile = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post(`/api/gq/flood/control/delFloodPlanFile/${params.id}`, params)
})
