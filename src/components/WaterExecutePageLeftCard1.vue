<template>
  <PageCard title="调度指令" bg-class="left">
    <div class="page-container">
      <!-- 调度指令 -->
      <div class="section section--table">
        <ElTable
          ref="tableRef"
          :data="instructionList"
          class="files-table water-warn-table"
          row-key="id"
          highlight-current-row
          height="579px"
          @current-change="onInstructionChange"
        >
          <ElTableColumn label="" width="90" align="center">
            <template #default="scope">
              <div class="table-index mt-[10px]">
                {{ scope.$index + 1 }}
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="code" label="指令编号" min-width="140">
            <template #default="scope">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="scope.row.code"
                placement="top-start"
              >
                <div class="cell cell--text">
                  {{ scope.row.code }}
                </div>
              </el-tooltip>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="releaseTime" label="发布时间" width="220" align="center">
            <template #default="scope">
              <div class="cell-time">
                {{ scope.row.releaseTime }}
              </div>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="200" align="center">
            <template #default>
              <div class="cell-actions">
                <button class="action-view" type="button">
                  查看
                </button>
              </div>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>

      <!-- 调度详情 -->
      <div class="section">
        <div class="header-title flex items-center mb-[30px] mt-[60px]">
          <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
          <span>调度详情</span>
        </div>
        <div class="detail-layout">
          <div
            class="plan-preview"
            :class="{ 'plan-preview--clickable': Boolean(currentInstruction?.fileUrl) }"
            @click="downloadCurrentInstructionFile"
          >
            <div class="plan-preview__page">
              <div class="plan-preview__watermark plan-preview__watermark--top">
                应急预案
              </div>
              <div class="plan-preview__watermark plan-preview__watermark--bottom">
                应急预案
              </div>
              <h4 class="plan-preview__title">
                调度应急预案
              </h4>
              <div class="plan-preview__content">
                <p>第 1 章：调度响应及实施</p>
                <p>引调水运行总体安排</p>
                <p>1. 水库闸门启闭、流量控制一体化调度。</p>
                <p>2. 各站点实时监测供水线路运行状态。</p>
                <p>3. 联动保障渠道、水闸及泵站设备安全。</p>
                <p>4. 按计划完成总供水量与开闸流量控制。</p>
              </div>
            </div>
          </div>

          <div class="dispatch-detail">
            <div
              v-for="item in detailRows"
              :key="item.label"
              class="detail-row"
            >
              <div class="detail-row__icon">
                <span class="detail-row__bookmark" />
              </div>
              <div class="detail-row__panel">
                <span class="detail-row__label">{{ item.label }}</span>
                <span class="detail-row__value">{{ item.values[0] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 执行情况 -->
      <div class="section section--last">
        <div class="header-title flex items-center mb-[30px] mt-[60px]">
          <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
          <span>执行情况</span>
        </div>
        <div class="status-summary">
          <div class="status-summary__accent" />
          <div class="status-summary__body">
            内容
          </div>
        </div>
        <div class="status-card__box h-[900px] overflow-auto">
          <div
            v-for="(item, idx) in executionTimeline"
            :key="idx"
            class="status-card"
          >
            <div class="status-card__head">
              <span class="status-card__arrows" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {{ item.title }}
            </div>
            <div class="status-card__body">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { getAppConfig } from 'zf-dbs'

type InstructionRow = {
  id: number
  code: string
  releaseTime: string
  totalSupply?: string
  gateOpenTime: string
  gateFlow: string
  fileUrl?: string
  scheduleList?: Record<string, any>[]
}

const tableRef = ref<any>()

const instructionList = ref<InstructionRow[]>([
  {
    id: 1,
    code: '202506121026',
    releaseTime: '2026.01.24 14:23:21',
    totalSupply: '',
    gateOpenTime: '2025-12-26 16:00',
    gateFlow: '0 m³/s'
  },
  {
    id: 2,
    code: '202506121027',
    releaseTime: '2026.01.24 15:10:08',
    totalSupply: '',
    gateOpenTime: '2025-12-26 16:00',
    gateFlow: '0 m³/s'
  },
  {
    id: 3,
    code: '202512261029',
    releaseTime: '2026.01.25 09:02:33',
    totalSupply: '',
    gateOpenTime: '2025-12-26 16:00',
    gateFlow: '0 m³/s'
  },
  {
    id: 4,
    code: '202506121029',
    releaseTime: '2026.01.25 11:45:00',
    totalSupply: '',
    gateOpenTime: '2025-12-26 16:00',
    gateFlow: '0 m³/s'
  },
  {
    id: 5,
    code: '202506121030',
    releaseTime: '2026.01.25 16:20:15',
    totalSupply: '',
    gateOpenTime: '2025-12-26 16:00',
    gateFlow: '0 m³/s'
  }
])

const currentInstruction = ref<InstructionRow | null>(null)

interface DetailRow {
  label: string
  values: string[]
}

type ExecutionTimelineItem = {
  title: string
  content: string
}

function displayValue (v: string | undefined): string {
  return v === undefined || v === '' ? '—' : v
}

const getDownloadFileUrl = (filePath?: string) => {
  if (!filePath) return ''
  if (/^https?:\/\//.test(filePath)) return filePath

  const appConfig = getAppConfig()
  const baseUrl = String(appConfig.xfqxRequestUrl || '').replace(/\/$/, '')
  const normalizedPath = filePath.replace(/^\//, '')
  return `${baseUrl}/${normalizedPath}`
}

const downloadCurrentInstructionFile = () => {
  const row = currentInstruction.value
  if (!row?.fileUrl) return

  const link = document.createElement('a')
  link.href = getDownloadFileUrl(row.fileUrl)
  link.download = row.fileUrl.split('/').pop() || row.code
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const detailRows = computed<DetailRow[]>(() => {
  const row = currentInstruction.value
  if (!row) {
    return [
      { label: '调度指令编号', values: ['—'] },
      { label: '总计划供水量', values: ['—'] },
      { label: '开闸时间', values: ['—'] },
      { label: '开闸流量', values: ['—'] }
    ]
  }
  return [
    { label: '调度指令编号', values: [row.code] },
    { label: '总计划供水量', values: [displayValue(row.totalSupply)] },
    { label: '开闸时间', values: [row.gateOpenTime] },
    { label: '开闸流量', values: [row.gateFlow] }
  ]
})

const executionTimeline = ref<ExecutionTimelineItem[]>([
  { title: '计划开始时间', content: '内容' },
  { title: '计划开始时间', content: '内容' },
  { title: '计划开始时间', content: '内容' }
])

const buildExecutionTimeline = (list: Record<string, any>[] = []) => {
  if (!list.length) {
    return [
      { title: '计划开始时间', content: '内容' },
      { title: '计划开始时间', content: '内容' },
      { title: '计划开始时间', content: '内容' }
    ]
  }

  return list.map((item: Record<string, any>, index: number) => ({
    title: item.st || `执行节点${index + 1}`,
    content: `计划开始：${item.time || '--'}；计划结束：${item.endTime || '--'}；实际开始：${item.realStartTime || '--'}；实际结束：${item.realEndTime || '--'}`
  }))
}

const updateCurrentInstruction = (row: InstructionRow | null) => {
  currentInstruction.value = row
  executionTimeline.value = buildExecutionTimeline(row?.scheduleList || [])
}

function onInstructionChange (row: InstructionRow | undefined) {
  updateCurrentInstruction(row ?? null)
}

onMounted(() => {
  nextTick(() => {
    const defaultRow = instructionList.value.find((r) => r.id === 3)
    if (defaultRow) {
      updateCurrentInstruction(defaultRow)
      tableRef.value?.setCurrentRow(defaultRow)
    }
  })
})

usePolling(async () => {
  const result: any = await service.xfqs.findWaterCommandList({})
  console.log('调度指令列表数据：', result)

  if (!Array.isArray(result) || !result.length) {
    return
  }

  instructionList.value = result.map((item: Record<string, any>) => ({
    id: Number(item.id),
    code: item.commandName || item.billName || '—',
    releaseTime: item.createTime || item.openTime || '—',
    totalSupply: item.processMap?.totalWater ? `${item.processMap.totalWater} m³` : '—',
    gateOpenTime: item.openTime || '—',
    gateFlow: item.openFlow !== null && item.openFlow !== undefined ? `${item.openFlow} m³/s` : '—',
    fileUrl: item.fileMsg?.path || item.fileUrl || '',
    scheduleList: Array.isArray(item.processMap?.list) ? item.processMap.list : []
  }))

  nextTick(() => {
    const defaultRow = instructionList.value[0]
    if (defaultRow) {
      updateCurrentInstruction(defaultRow)
      tableRef.value?.setCurrentRow(defaultRow)
    }
  })
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 16px 28px;
  box-sizing: border-box;
  overflow: hidden auto;
}

:deep(.el-table) {
  background-color: rgb(255 240 240 / 0);
}

.section {
  margin-bottom: 28px;

  &--table {
    margin-bottom: 22px;
  }

  &--last {
    margin-bottom: 0;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: #e8f7ff;
  text-shadow: 0 0 12px rgb(100 200 255 / 0.35);

  &__chev {
    color: #4fd0ff;
    font-size: 28px;
    line-height: 1;
    letter-spacing: -2px;
  }
}

.table-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 59.61px;
  line-height: 59.61px;
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  background: url("@/components/PageTable/assets/index-bg.png") no-repeat;
  background-size: 100% 100%;
}

.cell-time {
  line-height: 80px;
  text-align: center;
}

.cell-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
}

.cell--text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 0;
  color: rgb(184 199 212 / 0.72);
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  background: transparent;

  &::before {
    content: '';
    width: 16px;
    height: 11px;
    border: 1px solid rgb(184 199 212 / 0.72);
    border-radius: 12px / 9px;
    box-sizing: border-box;
  }
}

.files-table.water-warn-table {
  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }

    tr {
      background: transparent;
    }

    .el-table__header-wrapper {
      th.el-table__cell {
        background: rgb(19 96 160 / 0.46);
        border-bottom: none;
        color: #fff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
      }
    }

    .el-table__body {
      border-spacing: 0 4px;
    }

    .el-table__body-wrapper {
      margin-top: 4px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.2);
        color: rgb(184 199 212 / 0.72);
        font-family: PIngFangSC, sans-serif;
        font-size: 26px;
        border: 1px solid #527191;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .el-table__row.current-row > td.el-table__cell,
    .el-table__row:hover > td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
      color: #fff;
    }

    .el-table__row.current-row .action-view,
    .el-table__row:hover .action-view {
      color: #fff;

      &::before {
        border-color: #fff;
      }
    }
  }

  :deep(.cell) {
    height: 80px;
    line-height: 80px;
  }
}

.detail-layout {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 288px;
}

.plan-preview {
  position: relative;
  flex: 0 0 220px;
  height: 288px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #17b7ff;
  background:
    linear-gradient(90deg, #17b7ff 0 9px, transparent 9px calc(100% - 9px), #17b7ff calc(100% - 9px)) top / 100% 2px no-repeat,
    linear-gradient(90deg, #17b7ff 0 9px, transparent 9px calc(100% - 9px), #17b7ff calc(100% - 9px)) bottom / 100% 2px no-repeat,
    linear-gradient(180deg, #17b7ff 0 9px, transparent 9px calc(100% - 9px), #17b7ff calc(100% - 9px)) left / 2px 100% no-repeat,
    linear-gradient(180deg, #17b7ff 0 9px, transparent 9px calc(100% - 9px), #17b7ff calc(100% - 9px)) right / 2px 100% no-repeat,
    rgb(0 45 82 / 0.3);
  box-shadow: 0 0 14px rgb(0 185 255 / 0.28);

  &--clickable {
    cursor: pointer;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1px solid #52d7ff;
    background: #083a58;
  }

  &::before {
    top: -4px;
    right: -4px;
  }

  &::after {
    bottom: -4px;
    left: -4px;
  }

  &__page {
    position: relative;
    height: 100%;
    overflow: hidden;
    padding: 24px 24px 18px;
    box-sizing: border-box;
    background: #f7f8fb;
    box-shadow:
      inset 0 0 0 1px rgb(255 255 255 / 0.92),
      0 1px 4px rgb(0 0 0 / 0.18);
    color: #333f55;
  }

  &__watermark {
    position: absolute;
    left: -20px;
    font-size: 12px;
    line-height: 1;
    color: rgb(160 170 185 / 0.13);
    white-space: nowrap;
    transform: rotate(-18deg);

    &--top {
      top: 28px;
    }

    &--bottom {
      right: -12px;
      bottom: 36px;
      left: auto;
    }
  }

  &__title {
    position: relative;
    z-index: 1;
    margin: 0 0 16px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #37629d;
  }

  &__content {
    position: relative;
    z-index: 1;
    font-size: 6px;
    line-height: 2.15;
    color: #202a3b;
    transform: scale(0.84);
    transform-origin: top left;
    width: 119%;

    p {
      margin: 0 0 2px;
    }
  }
}

.dispatch-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
}

.detail-row {
  display: flex;
  align-items: center;
  min-width: 0;

  &__icon {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 42px;
    width: 42px;
    height: 42px;
    border: 1px solid #3ac2f6;
    background: rgb(16 84 121 / 0.78);
    box-shadow:
      inset 0 0 0 1px rgb(109 209 255 / 0.22),
      0 0 12px rgb(27 171 232 / 0.24);
  }

  &__bookmark {
    position: relative;
    width: 17px;
    height: 22px;
    background: #e7fbff;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
    box-shadow: 0 0 9px rgb(169 243 255 / 0.5);

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 50%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #5aa9c4;
      transform: translateX(-50%);
    }
  }

  &__panel {
    display: grid;
    align-items: center;
    grid-template-columns: minmax(150px, 1fr) minmax(128px, auto);
    min-width: 0;
    height: 42px;
    flex: 1;
    margin-left: 7px;
    padding: 0 18px;
    box-sizing: border-box;
    background: linear-gradient(90deg, rgb(28 91 142 / 0.9) 0%, rgb(15 83 135 / 0.58) 58%, rgb(0 42 82 / 0) 100%);
  }

  &__label,
  &__value {
    overflow: hidden;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 22px;
    line-height: 1;
    color: #fff;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__value {
    justify-self: end;
    font-family: Quantico, DINAlternate, Arial, sans-serif;
    letter-spacing: 0;
  }
}

.status-summary {
  position: relative;
  display: flex;
  height: 56px;
  margin-bottom: 38px;
  overflow: hidden;
  background: linear-gradient(90deg, rgb(102 100 51 / 0.82) 0%, rgb(73 79 45 / 0.58) 48%, rgb(27 57 55 / 0) 100%);

  &__accent {
    flex: 0 0 7px;
    background: #ffc83d;
    box-shadow: 2px 0 12px rgb(255 200 61 / 0.28);
  }

  &__body {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 26px;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
    font-weight: 500;
    color: #fff;
  }
}

.status-card {
  margin-bottom: 28px;
  overflow: hidden;
  border: 1px solid rgb(79 143 186 / 0.72);
  background: rgb(4 42 75 / 0.43);
  box-shadow: inset 0 0 24px rgb(33 118 185 / 0.1);

  &:last-child {
    margin-bottom: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 22px;
    height: 58px;
    padding: 0 14px;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 26px;
    font-weight: 500;
    color: #fff;
    background: linear-gradient(90deg, rgb(0 102 195 / 0.88) 0%, rgb(25 133 221 / 0.8) 47%, rgb(7 80 146 / 0.76) 100%);
    border-bottom: 1px solid rgb(64 164 235 / 0.35);
    box-shadow: inset 0 0 18px rgb(76 190 255 / 0.18);
  }

  &__arrows {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    flex: 0 0 auto;

    i {
      display: block;
      width: 0;
      height: 0;
      border-top: 11px solid transparent;
      border-right: 12px solid #26a8e5;
      border-bottom: 11px solid transparent;
      filter: drop-shadow(0 0 5px rgb(46 178 239 / 0.34));
    }
  }

  &__body {
    min-height: 112px;
    padding: 36px 90px 24px;
    box-sizing: border-box;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 26px;
    line-height: 1.5;
    color: #fff;
    background: linear-gradient(180deg, rgb(3 36 69 / 0.35) 0%, rgb(5 44 75 / 0.2) 100%);
  }
}
</style>
