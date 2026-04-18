<template>
  <PageCard title="短期来水预报" bg-class="right">
    <div class="page-container">
      <div class="h-[528px] mb-[50px]">
        <VueEcharts :option="echartOption" />
      </div>
      <div class="px-[14px]">
        <div class="h-[625px]">
          <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="5">
            <template #index="scope">
              <div class="table-index">
                {{ scope.index }}
              </div>
            </template>
            <template #area="scope">
              <ZfTweenNumber :value="Number(scope.row.area)" />
              <span class="text-[24px] text-[#BEEEFF] ml-[14px]">亩</span>
            </template>
          </PageTable>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const theadCol = ref([
  {
    key: 'name',
    name: '时间'
  },
  {
    key: 'code',
    name: '预报流量'
  },
  {
    key: 'type',
    name: '预报来水量'
  },
  {
    key: 'status',
    name: '修正来水量'
  }
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
    data: [{ name: '面雨量', icon: 'rect' }, { name: '预报流量' }, { name: '实测流量' }]
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
      name: '流量（m3/s）',
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
      name: '降雨量（mm）',
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
      name: '预报流量',
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
      name: '实测流量',
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
      name: '面雨量',
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

const dataList = ref<{[key:string]: any}[]>([])
const reservoirInfo = ref<Record<string, any>>([
  { name: '当日供水', value: 0, unit: 'm' },
  { name: '监测时间', value: '', unit: '' },
  { name: '警戒状态', value: '', unit: '' }
])
usePolling(async () => {
  dataList.value = Array.from({ length: 20 }).map((_, index) => ({
    name: `2024-09-${index + 1}`,
    code: `${Math.floor(Math.random() * 1000)}`,
    type: `${Math.floor(Math.random() * 1000)}`,
    status: `${Math.floor(Math.random() * 1000)}`
  }))
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
  padding: 78px 53px;
}

</style>
