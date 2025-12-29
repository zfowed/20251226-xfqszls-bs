import { defineService } from 'zf-dbs'
import request from '@/utils/requestJnks'

// 气体监测最新实时数据列表
// 1.一氧化碳、2.二氧化碳、3.二氧化硫、4.硫化氢、5.烟雾
export const getSensorDataList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/jnks/getSensorDataList', { params, ...config })
})

// 传感器近七天告警列表详情信息
export const queryAllGasAlarms = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/jnks/queryAllGasAlarms', { params, ...config })
})

// 传感器最新告警历史数据
export const getSensorAlarmData = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/jnks/getSensorAlarmData', { params, ...config })
})

// 查询所有人员定位信息列表
export const getAllPersonLocationList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/jnks/getAllPersonLocationList', { params, ...config })
})

// 查询所有基站定位人员信息统计列表
export const getStationPersonCount = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/jnks/getStationPersonCount', { params, ...config })
})
