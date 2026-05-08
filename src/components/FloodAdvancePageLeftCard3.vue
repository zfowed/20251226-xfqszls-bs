<template>
  <PageCard title="水位预警状况" bg-class="left">
    <div class="page-container">
      <div class="summary-wrap">
        <div class="summary-ring summary-ring--outer" />
        <div class="summary-ring summary-ring--inner" />
        <div class="summary-core">
          <div class="summary-core__icon">
            <img src="@/assets/global/images/flood/alarm-status-icon.png" alt="alarm">
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

      <div class="table-wrap">
        <div class="table-header">
          <span>站点</span>
          <span>告警信息</span>
          <span>发布时间</span>
        </div>
        <div class="table-body">
          <div v-for="(item, idx) in displayList" :key="`${item.stnm}-${idx}`" class="table-row">
            <div class="table-cell table-cell--site">
              <div class="rank-icon">
                {{ idx + 1 }}
              </div>
              <span>{{ item.stnm }}</span>
            </div>
            <div class="table-cell">
              {{ item.warnText }}
            </div>
            <div class="table-cell">
              {{ item.publishTime }}
            </div>
          </div>
        </div>
      </div>
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

const displayList = ref<WarnRow[]>([
  { stnm: 'XXX站点', warnText: '高温预警', publishTime: '2026-04-21' },
  { stnm: 'XXX站点', warnText: '高温预警', publishTime: '2026-04-21' },
  { stnm: 'XXX站点', warnText: '高温预警', publishTime: '2026-04-21' }
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
  padding: 30px 28px 32px;
}

.summary-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 454px;
  margin-bottom: 26px;
  overflow: hidden;
}

.summary-ring {
  position: absolute;
  border-radius: 50%;

  &--outer {
    width: 424px;
    height: 424px;
    background:
      radial-gradient(circle at 50% 50%, rgb(16 52 88 / 0) 61%, rgb(63 149 216 / 0.24) 62%, rgb(63 149 216 / 0) 76%),
      conic-gradient(from 10deg, rgb(62 196 255 / 0) 0deg, rgb(62 196 255 / 0.22) 36deg, rgb(62 196 255 / 0) 78deg, rgb(62 196 255 / 0.35) 168deg, rgb(62 196 255 / 0) 252deg, rgb(62 196 255 / 0.22) 332deg, rgb(62 196 255 / 0) 360deg);
    filter: drop-shadow(0 0 24px rgb(43 153 255 / 0.28));
  }

  &--inner {
    width: 322px;
    height: 322px;
    border: 2px solid rgb(95 198 255 / 0.62);
    background:
      radial-gradient(circle at 66% 70%, rgb(111 205 255 / 0.5) 0%, rgb(47 144 215 / 0.12) 30%, rgb(16 58 102 / 0.9) 72%),
      linear-gradient(180deg, rgb(36 100 153 / 0.72) 0%, rgb(21 64 111 / 0.8) 100%);
    box-shadow:
      0 0 18px rgb(61 175 255 / 0.35),
      inset 0 0 42px rgb(47 163 236 / 0.4);
  }
}

.summary-core {
  position: relative;
  z-index: 2;
  width: 282px;
  text-align: center;
  color: #fff;

  .summary-core__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;

    img {
      width: 84px;
      height: 84px;
      filter: drop-shadow(0 0 12px rgb(113 227 255 / 0.55));
    }
  }

  .summary-core__label {
    margin-bottom: 14px;
    font-size: 52px;
    line-height: 56px;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    text-shadow: 0 0 8px rgb(34 163 255 / 0.4);
  }

  .summary-core__value {
    color: #50fffc;
    font-size: 68px;
    line-height: 72px;
    font-weight: 700;
    letter-spacing: -1px;
    font-family: Quantico, DINAlternateBold, sans-serif;
    text-shadow: 0 0 8px #56ebff;

    span {
      margin-left: 10px;
      color: #beeeff;
      font-size: 42px;
      line-height: 50px;
      font-weight: 400;
      font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
      text-shadow: none;
    }
  }
}

.table-wrap {
  border: 1px solid #4f7193;
  background: rgb(8 30 56 / 0.34);
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 80px;
  padding: 0 38px 0 102px;
  color: #fff;
  font-size: 46px;
  line-height: 80px;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  background: rgb(19 79 135 / 0.56);
}

.table-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 80px;
  padding: 0 38px 0 14px;
  color: #81e6ff;
  font-size: 48px;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  border: 1px solid #527191;
  background: linear-gradient(90deg, rgb(19 79 135 / 0.2) 0%, rgb(12 51 89 / 0.35) 45%, rgb(19 79 135 / 0.2) 100%);

  &:nth-child(odd) {
    background: linear-gradient(90deg, rgb(20 88 145 / 0.24) 0%, rgb(13 58 98 / 0.4) 45%, rgb(20 88 145 / 0.24) 100%);
  }

  &:last-child {
    color: #fff;
    border-color: #4d83bb;
    background: linear-gradient(90deg, rgb(25 104 172 / 0.58) 0%, rgb(15 70 121 / 0.52) 42%, rgb(25 104 172 / 0.58) 100%);
  }
}

.table-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-cell--site {
  display: flex;
  align-items: center;
  gap: 18px;
}

.rank-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 56px;
  color: #ecfcff;
  font-size: 52px;
  line-height: 1;
  font-family: Quantico, DINAlternateBold, sans-serif;
  background: linear-gradient(180deg, #24b7dc 0%, #1872ae 100%);
  border: 1px solid #1cc8ff;
  clip-path: polygon(50% 0%, 100% 24%, 100% 76%, 50% 100%, 0% 76%, 0% 24%);
  box-shadow: 0 0 8px rgb(53 184 255 / 0.38);
}
</style>
