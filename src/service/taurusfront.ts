import { defineService } from 'zf-dbs'
import request from '@/utils/requestTaurusfront'

// 获取进度管理列表
export const getMountainProgressList = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params, config) {
  return request.get('/prod-api/system/mountainProgress/list', { params, ...config })
})

// 修改进度管理
export const updateMountainProgress = defineService<
  Record<string, any>,
  Record<string, any>
>(async function (params) {
  return request.post('/prod-api/system/mountainProgress/update', params)
})
