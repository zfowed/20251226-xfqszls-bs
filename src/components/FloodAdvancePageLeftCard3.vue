<template>
  <PageCard title="水位预警状况" bg-class="left">
    <div class="page-container">
      <div class="summary-wrap">
        <div class="summary-core">
          <div class="summary-core__icon">
            <img src="@/assets/flood-advance-water-warning-summary-logo.png" alt="水位预警">
          </div>
          <div class="summary-core__label">
            水位预警总数
          </div>
          <div class="summary-core__value">
            <ZfTweenNumber :value="totalWarnCount" />
            <span>个</span>
          </div>
        </div>
      </div>

      <PageTable
        class="water-warn-table"
        :thead-col="theadCol"
        :data-list="displayList"
        :index="true"
        :limit-scroll="4"
      >
        <template #index="scope">
          <div class="table-index mt-[10px]">
            {{ scope.index }}
          </div>
        </template>
      </PageTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

type WarnRow = {
  stnm: string
  warnText: string
  publishTime: string
}

const displayList = ref<WarnRow[]>([])
const totalWarnCount = ref(0)
const theadCol = ref([
  {
    key: 'stnm',
    name: '站点'
  },
  {
    key: 'warnText',
    name: '告警信息'
  },
  {
    key: 'publishTime',
    name: '发布时间'
  }
])

const formatWarnText = (item: Record<string, any>) => {
  return item?.warnName || item?.warnInfo || item?.warnTypeName || item?.warnType || '水位预警'
}

const formatPublishTime = (item: Record<string, any>) => {
  const time = item?.tm || item?.tmMin || item?.warnTime || item?.createTime
  return time ? dayjs(time).format('YYYY-MM-DD') : '2026-04-21'
}

usePolling(async () => {
  const result: any = await service.xfqs.getZZWarnInfo({})
  console.log('水位预警:', result)

  const detail = result?.detail || result || {}
  const list = Array.isArray(detail?.dataList) ? detail.dataList : []
  const warnList = list.filter((item: Record<string, any>) => Number(item?.warnStatus) === 1)
  totalWarnCount.value = Number(detail?.warnSize) || warnList.length
  displayList.value = warnList.map((item: Record<string, any>) => ({
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

.water-warn-table {
  height: 410px;

  :deep(.table-header__tr) {
    background: rgb(19 96 160 / 0.46);
  }

  :deep(.table-header__th) {
    color: #fff;
    font-family: PingFangSC, sans-serif;
    font-size: 30px;
  }

  :deep(.table-body__tr) {
    margin-top: 4px;
    background: rgb(19 79 135 / 0.2);
    border: 1px solid #527191;
  }

  :deep(.table-body__tr:hover) {
    background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
  }

  :deep(.table-body__th) {
    height: 80px;
    color: #81e6ff;
    font-family: PingFangSC, sans-serif;
    font-size: 26px;
    line-height: 80px;
  }

  :deep(.table-body__tr:hover .table-body__th) {
    color: #fff;
  }
}
</style>
