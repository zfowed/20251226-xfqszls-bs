import { defineService, getAppConfig } from 'zf-dbs'
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

// 渠道工程信息
export const getChannelAndStcd = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/st/channelB/getChannelAndStcd', { params, ...config })
})

// 渠系建筑物分类统计
export const getCanalStructureCountGroupByStructureType = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/st/canalStructure/countGroupByStructureType', { params, ...config })
})

// 天气信息
export const queryStationWeather = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/weather/queryStationWeather', { params, ...config })
})

export const queryWeather = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  const appConfig = getAppConfig()
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const url = `${String(appConfig.xfqxRequestUrl).replace(/\/$/, '')}/api/gq/weather/queryWeather${query ? `?${query}` : ''}`
  const response = await fetch(url, {
    headers: {
      authorization: appConfig.xfqxRequestToken
    }
  })

  return response.json()
})

// 降雨监测
export const getPptnPage = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/pptn/page', params)
})

// 可供水量
export const getAllstep = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/rsvr/stat/allstep', params)
})

export const getRsvrStatDay = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/rsvr/stat/day', params)
})

// 工程巡检
export const getPatrolList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/patrol/list', { params, ...config })
})

// 工程巡检统计
export const getPatrolAndWorkOrderStatics = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/patrol/record/getPatrolAndWorkOrderStatics', { params, ...config })
})

// 水闸状态 / 水库监测
export const getGatePageList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/gate/page', params)
})

// 渠道水位
export const getChannelPage = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/channel/page', params)
})
// 查询视频点位列表
export const getVideoStationList = defineService<
  Record<string, any>,
  Record<string, any>[]
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

// 当前作物种植面积
export const getCurrentDateCropArea = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/watercontrol/platform-bus-wdd/api/bus/xsShortData/getCurrentDateCropArea', { params, ...config })
})

// 配水调度
export const getCurrentHourShortWater = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/watercontrol/platform-bus-wdd/api/bus/xsShortData/getCurrentHourShortWater', { params, ...config })
})

export const getCurrentDateShortWater = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/watercontrol/platform-bus-wdd/api/bus/xsShortData/getCurrentDateShortWater', { params, ...config })
})

export const getOptionConfigList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/wrDynamicOptionConfig/findList', { params, ...config })
})

// 供水统计
export const getGongshuiInfo = defineService<
  undefined,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getGongshuiInfo', { params, ...config })
})

// 未来24h水库水情统计数据
export const getRsvrWarnInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getRsvrWarnInfo', { params, ...config })
})

// 降雨信息
export const getPptnInfo = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/baseinfo/oneMap/getPptnInfo', { params, ...config })
})

// 来水预报
export const getIwfShortAchievementList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/iwfShortAchievement/find/list', { params, ...config })
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
>(async function (params, config) {
  return request.post(`/api/hsyb/business/hsybForecastcc/findById?id=${params.id}`, { ...params, ...config })
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

// 墒情点位信息
export const getSoilPage = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.post('/api/gq/st/soil/page', { ...params, ...config })
})

// 墒情统计过程线
export const getSoilStatStep = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/api/gq/st/soil/stat/step', params)
})

// 防汛物资列表查询
export const queryMaterialList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/flood/control/queryMaterialList', { params, ...config })
})

// 应急预案列表查询
export const queryEmergencyPlanList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/flood/control/queryEmergencyPlanList', { params, ...config })
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

// 查询调度令列表
export const findWaterCommandList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/api/gq/scheduleWaterCommand/findWaterCommandList', { params, ...config })
})
