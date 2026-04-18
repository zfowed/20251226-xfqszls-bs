<template>
  <PageCard title="未来24h水库水情" bg-class="left">
    <div class="page-container">
      <div class="mb-[20px] flex items-center">
        <span>降雨方案：</span>
        <ElSelect
          v-model="filterWaterValue"
          placeholder="请选择"
          :teleported="false"
          class="app-select flex-1"
        >
          <ElOption
            v-for="item in optionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
      <div class="flex">
        <div class="flex flex-1 items-center">
          <span>总降雨量：</span>
          <ElInput v-model.number="filterValue" class="app-input flex-1" />
        </div>
        <ElButton class="ml-[20px] app-button" @click="filterValue = ''">
          搜索
        </ElButton>
      </div>
      <div class="h-[428px] mt-[50px]">
        <VueEcharts :option="echartOption" />
      </div>

      <ElTable :data="dataList" class="files-table mt-[30px]" height="579px">
        <ElTableColumn prop="index" label="序号" width="130">
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
        <ElTableColumn prop="type" label="已降雨量（mm)" width="200" />
        <ElTableColumn prop="status" label="步长" width="200" />
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const filterValue = ref<string | number>('')

const filterWaterValue = ref('2026')
const optionsList = [
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' }
]

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

.app-select {
  width: 496px;

  &:deep(.el-select__wrapper.is-focused) {
    .el-input__inner {
      color: #fff;
    }
  }

  &:deep(.el-popper) {
    background: rgb(14 47 66 / 0.6);
    border: none;
    top: 70px !important;
    left: 0 !important;

    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      height: 60px;
      color: #81E6FF;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      line-height: 60px;

      &.is-hovering {
        background: rgb(92 133 255 / 0.51);
      }
    }
  }

  &:deep(.el-select__wrapper) {
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    &:hover,
    &:active {
      box-shadow: none !important;
    }

    .el-select__selection {
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      letter-spacing: 5px;

      .el-select__placeholder {
        color: #81E6FF;
      }
    }

    .el-select__suffix {
      display: flex;
      align-items: center;

      .el-select__icon {
        width: 30px;
        height: 30px;
        background: url('@/assets/global/images/flood/guide-triangle.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}

.app-input {
  &:deep(.el-input__wrapper) {
    height: 65px;
    font-size: 28px;
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    .el-input__inner {
      color: #4BDBFF;
    }
  }
}

.app-button {
  background: rgb(14 47 66 / 0.6);
  border: 1px solid #4896C6;
  color: #81E6FF;
  font-size: 30px;
  font-family: PingFangSC, sans-serif;
  height: 65px;
  padding: 0 30px;

  &:hover {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

   &:active {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

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
