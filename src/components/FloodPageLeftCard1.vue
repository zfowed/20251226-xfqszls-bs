<template>
  <PageCard title="未来24h水库水情" bg-class="left">
    <div class="page-container">
      <div class="grid grid-cols-3 gap-col-[29px]">
        <div class="reservoir-item" v-for="(item, index) in reservoirInfo" :key="index">
          <img
            src="@/assets/global/images/situation/reservoir-icon.png"
            class="reservoir-item__icon mr-[14px]"
          >
          <div>
            <div class="reservoir-item__label">
              {{ item.name }}
            </div>
            <div v-if="typeof item.value == 'string'">
              <span class="text-[30px] mr-[8px]">{{ item.value }}</span>
              <span class="text-[16px]">{{ item.unit }}</span>
            </div>
            <div v-else>
              <ZfTweenNumber :value="item.value" class="reservoir-item__value" />
              <span class="reservoir-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-[428px] mt-[50px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/flood/${icon}.png`, import.meta.url).href
}

const reservoirInfo = ref<Record<string, any>>([
  { icon: getPhotoUrl('day-water-icon'), name: '当日供水', value: 0, unit: 'm' },
  { icon: getPhotoUrl('watch-time-icon'), name: '监测时间', value: '', unit: '' },
  { icon: getPhotoUrl('alarm-status-icon'), name: '警戒状态', value: '', unit: '' }
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
    data: [{ name: '水位', icon: 'rect' }, { name: '入库流量' }, { name: '出库流量' }]
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
  yAxis: [
    {
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
  const warnInfoResult: any = await service.xfqs.getRsvrWarnInfo({})
  reservoirInfo.value[0].value = Number(warnInfoResult.currntZ)
  reservoirInfo.value[1].value = dayjs(warnInfoResult.tm).format('MM.DD')
  reservoirInfo.value[1].unit = dayjs(warnInfoResult.tm).format('HH:mm')
  reservoirInfo.value[2].value = warnInfoResult.msg

  const pageResult: any = await service.xfqs.hsybForecastccFindPage({
    start: 1,
    limit: 1,
    lx: 1
  })
  if (pageResult.list.length > 0) {
    // 获取hsybForecastccFindPage 接口的第一个id，调用 hsybForecastccFindById 接口获取水库水情预测数据
    const echartsResult: any = await service.xfqs.hsybForecastccFindById({
      id: pageResult.list[0].id
    })
    const hsybForecastList = echartsResult.hsybForecastccDdfafExtList[0].hsybForecastcExtList[0].hsybForecastList
    const nameKeys = []
    const arrList1 = []
    const arrList2 = []
    const arrList3 = []
    for (const hsybItem of hsybForecastList) {
      nameKeys.push(dayjs(hsybItem.tm).format('MM.DD'))
      arrList1.push(hsybItem.q)
      arrList2.push(hsybItem.otq)
      arrList3.push(hsybItem.z)
    }
    echartOption.value.xAxis.data = nameKeys
    echartOption.value.series[0].data = arrList1
    echartOption.value.series[1].data = arrList2
    echartOption.value.series[2].data = arrList3
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 40px;
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
    color: #50fffc;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #beeeff;
  }
}
</style>
