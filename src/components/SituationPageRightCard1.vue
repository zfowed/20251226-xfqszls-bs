<template>
  <PageCard title="工程巡检" bg-class="right">
    <div class="inspection-card">
      <div class="inspection-card__summary">
        <div v-for="item in summaryList" :key="item.key" class="inspection-card__summary-item">
          <div class="inspection-card__summary-label">
            巡查
          </div>
          <div class="inspection-card__summary-content">
            <span>{{ item.label }}</span>
            <ZfTweenNumber :value="item.value" class="inspection-card__summary-value" />
            <span>{{ item.unit }}</span>
          </div>
          <div class="inspection-card__summary-bg" />
        </div>
      </div>

      <div class="inspection-card__chart">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const totalInfo = reactive({
  patrolCount: 86,
  patrolMileage: 86,
  issueCount: 1,
  patrolPeopleCount: 0
})

const summaryList = computed(() => {
  return [
    { key: 'patrolCount', label: '巡查次数', value: totalInfo.patrolCount, unit: '次' },
    { key: 'patrolMileage', label: '巡查里程', value: totalInfo.patrolMileage, unit: 'km' },
    { key: 'issueCount', label: '发现问题', value: totalInfo.issueCount, unit: '个' },
    { key: 'patrolPeopleCount', label: '巡查人数', value: totalInfo.patrolPeopleCount, unit: '人' }
  ]
})

const echartOption = ref({
  animation: false,
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(7, 23, 44, 0.92)',
    borderColor: 'rgba(122, 210, 255, 0.35)',
    borderWidth: 1,
    textStyle: {
      color: '#EAF7FF',
      fontSize: 14
    }
  },
  legend: {
    top: 12,
    right: 10,
    itemWidth: 18,
    itemHeight: 10,
    icon: 'rect',
    textStyle: {
      color: '#EAF6FF',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [{ name: '巡检次数', icon: 'rect' }]
  },
  grid: {
    top: 72,
    left: 18,
    right: 18,
    bottom: 10,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      margin: 16,
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [] as string[]
  },
  yAxis: {
    type: 'value',
    name: '次数',
    min: 0,
    max: 80,
    interval: 20,
    nameGap: 24,
    nameTextStyle: {
      color: '#fff',
      fontSize: 18,
      padding: [0, 35, 0, 0]
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.16)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    }
  },
  series: [
    {
      name: '巡检次数',
      data: [] as number[],
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: '#67C9FF'
      },
      itemStyle: {
        color: '#67C9FF'
      },
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(103, 201, 255, 0.45)' },
            { offset: 1, color: 'rgba(103, 201, 255, 0)' }
          ]
        }
      }
    }
  ]
})

usePolling(async () => {
  const monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  echartOption.value.xAxis.data = monthList

  const result: any = await service.xfqs.getPatrolList({
    tabId: 0,
    year: dayjs().format('YYYY')
  })

  const planStatistic = Array.isArray(result?.planStatistic) ? result.planStatistic : []
  const eventList = Array.isArray(result?.event) ? result.event : []

  totalInfo.patrolCount = Number(result?.comp_num ?? result?.doneDitchCount ?? 86)
  totalInfo.patrolMileage = Number(result?.mileage ?? result?.patrolMileage ?? 86)
  totalInfo.issueCount = eventList.reduce((sum: number, item: any) => sum + Number(item?.num || 0), 0) || Number(result?.issueCount ?? 1)
  totalInfo.patrolPeopleCount = Number(result?.patrolPeopleCount ?? result?.peopleCount ?? 0)

  if (planStatistic.length > 0) {
    echartOption.value.series[0].data = planStatistic.map((item: any) => Number(item?.complete_num ?? item?.num ?? 0))
  } else {
    echartOption.value.series[0].data = [26, 37, 40, 55, 54, 38, 24, 37, 41, 33, 30, 37]
  }
})
</script>

<style lang="scss" scoped>
.inspection-card {
  padding: 24px 26px 20px;
}

.inspection-card__summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 36px;
  margin-bottom: 66px;
  padding: 0 22px;
}

.inspection-card__summary-item {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 28px;
  font-family: PingFangSC, sans-serif;
}

.inspection-card__summary-label {
  height: 40px;
  line-height: 40px;
  padding: 0 12px;
  margin-right: 14px;
  color: #d1e4ff;
  text-align: center;
  background: url('@/assets/global/images/preview/total-label-bg.png') no-repeat;
  background-size: 100% 100%;
  font-family: PangMenZhengDao, sans-serif;
  font-size: 20px;
  box-sizing: border-box;
}

.inspection-card__summary-content {
  display: flex;
  align-items: baseline;
  color: #fff;
}

.inspection-card__summary-value {
  margin: 0 10px;
  color: #50fffc;
  font-size: 36px;
  font-family: Quantico, sans-serif;
  font-weight: bold;
}

.inspection-card__summary-bg {
  position: absolute;
  left: 4px;
  bottom: -10px;
  width: calc(100% - 4px);
  height: 100%;
  background: url('@/assets/global/images/preview/total-line-bg.png') no-repeat;
  background-size: 100% 100%;
}

.inspection-card__chart {
  height: 400px;
}
</style>
