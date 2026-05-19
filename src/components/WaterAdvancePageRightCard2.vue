<template>
  <PageCard title="渠系工程安全预警" bg-class="right">
    <div class="page-container">
      <div class="summary-wrap">
        <div class="summary-core">
          <div class="summary-core__icon">
            <img src="@/assets/flood-advance-water-warning-vector-logo.png" alt="水位预警">
          </div>
          <div class="summary-core__label">
            工程预警总数
          </div>
          <div class="summary-core__value">
            <ZfTweenNumber :value="totalWarnCount" />
            <span>个</span>
          </div>
        </div>
      </div>

      <div class="warn-table-wrap">
        <PageTable
          :thead-col="theadCol"
          :data-list="displayList"
          :index="true"
          :limit-scroll="4"
        >
          <template #index="scope">
            <div class="table-index">
              {{ scope.index }}
            </div>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type WarnRow = {
  stnm: string
  warnText: string
  waterValue: string | number
  flowValue: string | number
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
    name: '渠道'
  },
  {
    key: 'waterValue',
    name: '水位',
    align: 'center'
  },
  {
    key: 'flowValue',
    name: '流量',
    align: 'center'
  },
  {
    key: 'publishTime',
    name: '预警信息'
  }
])

const getWarnDetail = (result: Record<string, any>) => {
  return result?.data || result?.detail || result || {}
}

const getWarnStatusText = (warnStatus: unknown) => {
  return Number(warnStatus) === 1 ? '预警' : '正常'
}

usePolling(async () => {
  const d: any = await service.xfqs.getZZWarnInfo({
  })
  const detail = getWarnDetail(d)
  const dataList = Array.isArray(detail.dataList) ? detail.dataList : []

  totalWarnCount.value = Number(detail.warnSize) || 0
  displayList.value = dataList.map((item: Record<string, any>) => ({
    stnm: item.stnm || '--',
    warnText: item.channelName || '--',
    waterValue: item.z ?? '--',
    flowValue: item.q ?? item.qout ?? '--',
    publishTime: `${item.tmMin || item.tm || '--'} ${getWarnStatusText(item.warnStatus)}`
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

.warn-table-wrap {
  height: 410px;
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

</style>
