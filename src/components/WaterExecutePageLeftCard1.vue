<template>
  <PageCard title="调度指令" bg-class="left">
    <div class="page-container">
      <!-- 调度指令 -->
      <div class="section section--table">
        <ElTable
          ref="tableRef"
          :data="instructionList"
          class="files-table"
          row-key="id"
          highlight-current-row
          height="579px"
          @current-change="onInstructionChange"
        >
          <ElTableColumn label="" width="72" align="center">
            <template #default="scope">
              <div class="table-index">
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
        <div class="section-title">
          <span class="section-title__chev">»</span>
          调度详情
        </div>
        <div class="detail-layout">
          <div class="doc-frame" aria-hidden="true">
            <div class="doc-frame__corners" />
            <div class="doc-frame__page">
              <div class="doc-frame__line" />
              <div class="doc-frame__line" />
              <div class="doc-frame__line doc-frame__line--short" />
            </div>
          </div>
          <div class="dispatch-detail">
            <div
              v-for="item in detailRows"
              :key="item.label"
              class="team-row"
              :class="{ 'team-row--multi': item.values.length > 1 }"
            >
              <div class="row-icon">
                <div class="row-icon__inner">
                  <div class="row-icon__bookmark" />
                </div>
              </div>

              <div class="row-panel">
                <p class="row-line">
                  <span class="row-label">{{ item.label }}：</span>
                  <span class="row-value">{{ item.values[0] }}</span>
                </p>
                <p
                  v-for="(line, index) in item.values.slice(1)"
                  :key="index"
                  class="row-line row-line--extra"
                >
                  <span class="row-value">{{ line }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 执行情况 -->
      <div class="section section--last">
        <div class="section-title">
          <span class="section-title__chev">»</span>
          执行情况
        </div>
        <div class="status-summary">
          <div class="status-summary__accent" />
          <div class="status-summary__body">
            内容
          </div>
        </div>
        <div
          v-for="(item, idx) in executionTimeline"
          :key="idx"
          class="status-card"
        >
          <div class="status-card__head">
            <span class="status-card__arrows">&lt;&lt;&lt;</span>
            {{ item.title }}
          </div>
          <div class="status-card__body">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type InstructionRow = {
  id: number
  code: string
  releaseTime: string
  totalSupply?: string
  gateOpenTime: string
  gateFlow: string
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

function displayValue (v: string | undefined): string {
  return v === undefined || v === '' ? '—' : v
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

const executionTimeline = ref([
  { title: '计划开始时间', content: '内容' },
  { title: '计划开始时间', content: '内容' },
  { title: '计划开始时间', content: '内容' }
])

function onInstructionChange (row: InstructionRow | undefined) {
  currentInstruction.value = row ?? null
}

onMounted(() => {
  nextTick(() => {
    const defaultRow = instructionList.value.find((r) => r.id === 3)
    if (defaultRow) {
      currentInstruction.value = defaultRow
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
  width: 34px;
  height: 34px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
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

.files-table {
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
        cursor: pointer;
        margin-bottom: 4px;
        border-bottom: none;
        color: #fff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
      }
    }

    .el-table__body {
      border-spacing: 0 4px;

      tr {
        background: transparent;

        &:hover {
          background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
        }
      }
    }

    .el-table__body-wrapper {
      margin-top: 4px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.2);
        cursor: pointer;
        margin-bottom: 4px;
        color: #81e6ff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
        border: 1px solid #527191;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .el-table__body tr.current-row > td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.85), rgb(0 132 255 / 0.65)) !important;
      color: #fff !important;
      box-shadow:
        inset 0 0 0 1px rgb(100 200 255 / 0.45),
        0 0 14px rgb(0 180 255 / 0.25);
    }

    .cell {
      height: 80px;
      line-height: 80px;
    }
  }
}

.action-view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 0;
  color: #8ce8ff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  background: transparent;

  &::before {
    content: '';
    width: 16px;
    height: 11px;
    border: 1px solid #8ce8ff;
    border-radius: 12px / 9px;
    box-sizing: border-box;
  }
}

.detail-layout {
  display: flex;
  gap: 18px;
  align-items: stretch;
}

.doc-frame {
  position: relative;
  flex: 0 0 168px;
  height: 204px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(79 208 255 / 0.65);
  background: linear-gradient(165deg, rgb(0 40 80 / 0.5), rgb(0 15 40 / 0.85));

  &__corners {
    position: absolute;
    inset: 4px;
    pointer-events: none;
    border: 1px solid rgb(79 208 255 / 0.35);

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border-color: #4fd0ff;
      border-style: solid;
    }

    &::before {
      top: -1px;
      left: -1px;
      border-width: 2px 0 0 2px;
    }

    &::after {
      right: -1px;
      bottom: -1px;
      border-width: 0 2px 2px 0;
    }
  }

  &__page {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    padding: 14px 12px;
    background: linear-gradient(180deg, #f4f7fb 0%, #dfe8f2 100%);
    box-sizing: border-box;
  }

  &__line {
    height: 6px;
    border-radius: 2px;
    background: rgb(30 50 80 / 0.12);

    &--short {
      width: 55%;
    }
  }
}

.dispatch-detail {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.dispatch-detail .team-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.dispatch-detail .row-icon {
  width: 70px;
  height: 70px;
  padding: 6px;
  border: 1px solid #2987bb;
  background: linear-gradient(180deg,
      rgb(20 87 130 / 0.88),
      rgb(9 56 88 / 0.88));
  box-sizing: border-box;
  flex-shrink: 0;
}

.dispatch-detail .row-icon__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(142 198 233 / 0.8);
  background: radial-gradient(circle at 90% 12%,
      rgb(85 164 203 / 0.55),
      rgb(8 63 98 / 0.8) 38%,
      rgb(3 29 51 / 0.85) 100%);
}

.dispatch-detail .row-icon__bookmark {
  position: relative;
  width: 24px;
  height: 31px;
  background: #d8f4ff;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #6fa7be;
    transform: translateX(-50%);
  }
}

.dispatch-detail .row-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-height: 70px;
  padding: 0 16px;
  box-sizing: border-box;
  background: linear-gradient(90deg,
      rgb(33 87 135 / 0.9) 0%,
      rgb(2 62 112 / 0) 100%);
}

.dispatch-detail .row-line {
  margin: 0;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.45;
  color: #fff;
  letter-spacing: 0.4px;
}

.dispatch-detail .row-label {
  display: inline-block;
  min-width: 140px;
}

.dispatch-detail .row-value {
  display: inline-block;
  word-break: break-all;
}

.dispatch-detail .team-row--multi {
  .row-icon {
    margin-top: 7px;
  }

  .row-panel {
    min-height: 215px;
    justify-content: flex-start;
    padding-top: 10px;
  }

  .row-line {
    line-height: 56px;
  }

  .row-line--extra {
    padding-left: 140px;
  }
}

.status-summary {
  position: relative;
  display: flex;
  min-height: 52px;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid #527191;
  background: rgb(19 79 135 / 0.22);

  &__accent {
    flex: 0 0 5px;
    background: linear-gradient(180deg, #f5e6a8, #c9a227);
    box-shadow: 2px 0 10px rgb(245 214 120 / 0.35);
  }

  &__body {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 12px 18px;
    font-family: PingFangSC, sans-serif;
    font-size: 20px;
    color: #e8f4ff;
  }
}

.status-card {
  margin-bottom: 8px;
  overflow: hidden;
  border: 1px solid #527191;

  &:last-child {
    margin-bottom: 0;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    height: 40px;
    font-family: PingFangSC, sans-serif;
    font-size: 18px;
    color: #dff6ff;
    background: linear-gradient(90deg, rgb(19 96 160 / 0.75), rgb(19 79 135 / 0.45));
    border-bottom: 1px solid rgb(82 113 145 / 0.6);
  }

  &__arrows {
    color: #7ee9ff;
    font-size: 14px;
    letter-spacing: -1px;
  }

  &__body {
    padding: 14px 16px;
    font-family: PingFangSC, sans-serif;
    font-size: 18px;
    color: #b8e8ff;
    background: rgb(0 20 45 / 0.45);
  }
}
</style>
