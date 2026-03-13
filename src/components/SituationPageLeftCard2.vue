<template>
  <PageCard title="水库信息" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-3 gap-col-[29px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img src="@/assets/global/images/situation/reservoir-icon.png" class="reservoir-item__icon mr-[14px]">
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div>
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[528px] mt-[60px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const reservoirInfo = ref<Record<string, any>>([
  { name: '水位', value: 0, unit: 'm' },
  { name: '入库流量', value: 0, unit: 'm3/s' },
  { name: '出库流量', value: 0, unit: 'm3/s' }
])

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '水位', icon: 'rect' },
      { name: '入库流量' },
      { name: '出库流量' }
    ]
  },
  grid: {
    top: '12%',
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    // 柱状图建议留左右间距，避免柱子超出坐标系
    // boundaryGap: false,
    axisTick: {
      show: false
    },
    offset: 15,
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: 'rgba(179,223,255, 0.5)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'PingFangSC, sans-serif'
    },
    data: [] as string[]
  },
  yAxis: [{
    name: '水位（m)',
    nameGap: 25,
    type: 'value',
    position: 'left',
    offset: 10,
    nameTextStyle: {
      color: '#fff',
      fontSize: 20
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    }
  },
  {
    name: '流量（m³/s）',
    nameGap: 25,
    type: 'value',
    position: 'right',
    offset: 10,
    // 保证柱子从 x 轴开始向上画，不会穿过 x 轴
    min: 0,
    nameTextStyle: {
      color: '#fff',
      fontSize: 20
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(217,231,255, 0.2)'
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif'
    },
    axisTick: {
      show: false
    }
  }
  ],
  series: [
    {
      name: '入库流量',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(136, 229, 120, 0.5)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#5DFF68' },
      itemStyle: {
        color: '#5DFF68'
      }
    },
    {
      name: '出库流量',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 162, 55, 0.34)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#FF932F' },
      itemStyle: {
        color: '#FF932F'
      }
    },
    {
      name: '水位',
      data: [] as any,
      type: 'bar',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0,
      barWidth: 16,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(17, 46, 74, 0.2)' },
            { offset: 1, color: '#3C80C0' }
          ]
        }
      }
    }
  ]
})

usePolling(async () => {
  const stcdResult: any = await service.xfqs.findSinlgeRsvrData({ stcd: 'RV_001' })
  reservoirInfo.value[0].value = stcdResult[0].z ? stcdResult[0].z : 0
  reservoirInfo.value[1].value = stcdResult[0].q ? stcdResult[0].q : 0
  reservoirInfo.value[2].value = stcdResult[0].otq ? stcdResult[0].otq : 0

  const stepResult: any = await service.xfqs.getAllstep({
    startTime: dayjs().format('YYYY-MM-DD 00:00:00'),
    endTime: dayjs().format('YYYY-MM-DD 16:00:00'),
    type: '1',
    start: 1,
    limit: 20,
    stcd: 'RV_001'
  })

  const nameKeys = []
  const arrList1 = []
  const arrList2 = []
  const arrList3 = []

  for (const stepItem of stepResult.list) {
    nameKeys.push(dayjs(stepItem.tm).format('HH:mm'))
    arrList1.push(stepItem.z ? Number(stepItem.z) : 0)
    arrList2.push(stepItem.q ? Number(stepItem.q) : 0)
    arrList3.push(stepItem.otq ? Number(stepItem.otq) : 0)
  }
  echartOption.value.xAxis.data = nameKeys
  echartOption.value.series[0].data = arrList1
  echartOption.value.series[1].data = arrList2
  echartOption.value.series[2].data = arrList3
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 45px 40px;
}

.reservoir-item {
  display: flex;
  align-items: center;
  font-family: PingFangSC, sans-serif;

  .reservoir-item__label {
    font-size: 30px;
  }

  .reservoir-item__value {
    font-family: Quantico, sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #50FFFC;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #BEEEFF;
  }
}

</style>
