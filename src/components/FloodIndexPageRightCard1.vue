<template>
  <PageCard title="预警信息" bg-class="right">
    <div class="page-container">
      <div class="h-[588px] mb-[60px]">
        <VueEcharts :option="echartOption" />
      </div>
      <ElTable :data="dataList" class="files-table mt-[30px]" height="1410px">
        <ElTableColumn type="index" label="序号" width="100">
          <template #default="scope">
            <div class="leading-[40px]">
              {{ scope.row.index }}
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="code" label="时间">
          <template #default="scope">
            <div class="leading-[40px]">
              {{ scope.row.code }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="type" label="预测流量（m3/s)" width="260" />
        <ElTableColumn prop="status" label="实测流量（mm)" width="260" />
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const dataList = ref<{[key:string]: any}[]>([])

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
      name: '水位（m)',
      nameGap: 25,
      type: 'value',
      position: 'left',
      offset: 10,
      nameTextStyle: {
        color: '#FFA163',
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
        color: '#FFA163',
        fontSize: 20,
        fontFamily: 'PingFangSC, sans-serif'
      },
      axisTick: {
        show: false
      }
    },
    {
      name: '流量（m³/s）',
      nameLocation: 'start',
      nameGap: 25,
      type: 'value',
      position: 'right',
      inverse: true,
      // 保证柱子从 x 轴开始向上画，不会穿过 x 轴
      min: 0,
      nameTextStyle: {
        color: '#4882FF',
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
        color: '#4882FF',
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
      yAxisIndex: 0,
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
      yAxisIndex: 0,
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
      yAxisIndex: 1,
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
  echartOption.value.xAxis.data = Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day').format('MM.DD'))
  for (let i = 0; i < 7; i++) {
    echartOption.value.series[0].data[i] = Math.floor(Math.random() * 1000)
    echartOption.value.series[1].data[i] = Math.floor(Math.random() * 1000)
    echartOption.value.series[2].data[i] = Math.floor(Math.random() * 1000)
  }

  dataList.value = Array.from({ length: 20 }).map((_, index) => ({
    index: index + 1,
    code: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    type: `${Math.floor(Math.random() * 1000)}`,
    status: `${Math.floor(Math.random() * 1000)}`
  }))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 40px 30px;
  overflow: hidden;
}

:deep(.el-table) {
  /* 透明度为0，不显示背景色 */
  background-color: rgb(255 240 240 / 0);
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

        // border: 1px solid #527191;
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
        color: #81E6FF;
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

    .cell {
      height: 80px;
      line-height: 80px;
    }

  }
}
</style>
