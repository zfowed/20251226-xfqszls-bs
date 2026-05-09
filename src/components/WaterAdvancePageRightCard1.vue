<template>
  <PageCard title="墒情预警" bg-class="right">
    <div class="page-container">
      <div class="summary-wrap">
        <div class="summary-core">
          <div class="summary-core__icon">
            <img src="@/assets/flood-advance-water-warning-vector-logo.png" alt="水位预警">
          </div>
          <div class="summary-core__label">
            墒情预警总数
          </div>
          <div class="summary-core__value">
            <ZfTweenNumber :value="totalWarnCount" />
            <span>个</span>
          </div>
        </div>
      </div>

      <ElTable :data="displayList" class="files-table water-warn-table" :max-height="410">
        <ElTableColumn label="" width="90" align="center">
          <template #default="scope">
            <div class="table-index mt-[10px]">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="stnm" label="墒情点" />
        <ElTableColumn prop="warnText" label="告警信息" />
        <ElTableColumn prop="waterValue" label="监测值" />
        <ElTableColumn prop="publishTime" label="发布时间" />
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

type WarnRow = {
  stnm: string
  warnText: string
  waterValue: number
  publishTime: string
}

const displayList = ref<WarnRow[]>([
  { stnm: 'XXX站点', warnText: '高温预警', waterValue: 1, publishTime: '2026-04-21' },
  { stnm: 'XXX站点', warnText: '高温预警', waterValue: 2, publishTime: '2026-04-21' },
  { stnm: 'XXX站点', warnText: '高温预警', waterValue: 1, publishTime: '2026-04-21' },
  { stnm: 'XXX站点', warnText: '高温预警', waterValue: 2, publishTime: '2026-04-21' }
])
const totalWarnCount = ref(14)

const formatWarnText = (item: Record<string, any>) => {
  return item?.warnName || item?.warnInfo || item?.warnTypeName || item?.warnType || '高温预警'
}

const formatPublishTime = (item: Record<string, any>) => {
  const time = item?.tm || item?.tmMin || item?.warnTime || item?.createTime
  return time ? dayjs(time).format('YYYY-MM-DD') : '2026-04-21'
}

usePolling(async () => {
  const result: any = await service.xfqs.getTemperatureAndPptnWarnInfoForBus({})
  const list = Array.isArray(result?.dataList) ? result.dataList : []
  if (!list.length) {
    return
  }
  totalWarnCount.value = Number(result?.total || list.length) || list.length
  displayList.value = list.slice(0, 3).map((item: Record<string, any>) => ({
    stnm: item?.stnm || item?.stationName || 'XXX站点',
    warnText: formatWarnText(item),
    publishTime: formatPublishTime(item)
  }))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 24px 28px 28px;
}

.summary-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 535px;
  height: 428px;
  margin: 0 auto;
  overflow: hidden;
  background: url("@/assets/flood-advance-water-warning-summary-bg.png") no-repeat center;
  background-size: 100% 100%;
}

.summary-core {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 12px;
  text-align: center;
  color: #fff;

  .summary-core__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    img {
      width: 115px;
      height: 112px;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgb(113 227 255 / 0.45));
    }
  }

  .summary-core__label {
    margin-bottom: 6px;
    font-size: 26px;
    line-height: 32px;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    text-shadow: 0 0 6px rgb(34 163 255 / 0.35);
  }

  .summary-core__value {
    color: #50fffc;
    font-size: 44px;
    line-height: 48px;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-family: Quantico, DINAlternateBold, sans-serif;
    text-shadow: 0 0 6px #56ebff;

    span {
      margin-left: 6px;
      color: #beeeff;
      font-size: 22px;
      line-height: 28px;
      font-weight: 400;
      font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
      text-shadow: none;
    }
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

:deep(.el-table) {
  background-color: transparent;
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
        color: #81e6ff;
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

    .el-table__row:hover > td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
      color: #fff;
    }
  }

  :deep(.cell) {
    height: 80px;
    line-height: 80px;
  }
}
</style>
