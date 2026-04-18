<template>
  <PageCard title="淹没分析" bg-class="right">
    <div class="page-container">
      <div class="flex mb-[20px]">
        <div class="flex flex-1 items-center">
          <span class="min-w-[125px]">起止时间：</span>
          <el-date-picker
            class="flex-1 app-datepicker"
            v-model="filterValue"
            type="datetimerange"
            :teleported="false"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD ddd"
            time-format="A hh:mm:ss"
          />
        </div>
        <ElButton class="ml-[20px] app-button" @click="filterValue = ''">
          查询
        </ElButton>
      </div>
      <div class="flex mb-[20px]">
        <div class="flex flex-1 items-center">
          <span class="min-w-[125px]">流域：</span>
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
      </div>
      <div class="flex">
        <div class="flex flex-1 items-center">
          <span class="min-w-[125px]">断面方案：</span>
          <ElSelect
            v-model="filterWaterValue2"
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
      </div>

      <!-- 预报列表 -->
      <div class="header-title mt-[42px]">
        预报列表
      </div>
      <div class="h-[710px] overflow-y-auto">
        <div class="dispatch-item" v-for="item in dataList" :key="item.id">
          <div class="dispatch-item__header">
            <div>断面预案方案</div>
            <div>方案评定 </div>
            <div>洪峰评级</div>
            <div>洪量评级</div>
            <div>峰时评级</div>
          </div>
          <div class="dispatch-item__content text-[#81E6FF]">
            <div>{{ item.name }}</div>
            <div><ZfTweenNumber :value="item.value1 === '' ? 0 : Number(item.value1)" /></div>
            <div><ZfTweenNumber :value="item.value2 === '' ? 0 : Number(item.value2)" /></div>
            <div><ZfTweenNumber :value="item.value3 === '' ? 0 : Number(item.value3)" /></div>
            <div><ZfTweenNumber :value="item.value4 === '' ? 0 : Number(item.value4)" /></div>
          </div>
          <div class="dispatch-item__header">
            <div>依据时间</div>
            <div>气象误差</div>
            <div>洪峰误差</div>
            <div>洪量误差</div>
            <div>峰时误差</div>
          </div>
          <div class="dispatch-item__content text-[#81E6FF]">
            <div>{{ item.date }}</div>
            <div><ZfTweenNumber :value="item.value1 === '' ? 0 : Number(item.value1)" /></div>
            <div><ZfTweenNumber :value="item.value2 === '' ? 0 : Number(item.value2)" /></div>
            <div><ZfTweenNumber :value="item.value3 === '' ? 0 : Number(item.value3)" /></div>
            <div><ZfTweenNumber :value="item.value4 === '' ? 0 : Number(item.value4)" /></div>
          </div>
        </div>
      </div>

      <!-- 预报详情 -->
      <div class="header-title mt-[42px]">
        预报详情
      </div>
      <div class="dispatch-item">
        <div class="dispatch-item__header">
          <div>指标</div>
          <div>实测  </div>
          <div>预报</div>
          <div>许可误差</div>
          <div>误差</div>
        </div>
        <div class="dispatch-item__content text-[#81E6FF]">
          <div><ZfTweenNumber :value="detailsDatas.value1 === '' ? 0 : Number(detailsDatas.value1)" /></div>
          <div><ZfTweenNumber :value="detailsDatas.value2 === '' ? 0 : Number(detailsDatas.value2)" /></div>
          <div><ZfTweenNumber :value="detailsDatas.value3 === '' ? 0 : Number(detailsDatas.value3)" /></div>
          <div><ZfTweenNumber :value="detailsDatas.value4 === '' ? 0 : Number(detailsDatas.value4)" /></div>
          <div><ZfTweenNumber :value="detailsDatas.value5 === '' ? 0 : Number(detailsDatas.value5)" /></div>
        </div>
      </div>

      <div class="h-[396px] mt-[40px]">
        <VueEcharts :option="echartOption" />
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SeededRandom } from 'zf-utilz'

const filterValue = ref<string | number>('')

const filterWaterValue = ref('2026')
const filterWaterValue2 = ref('2026')
const optionsList = [
  { value: '2026', label: '测站类型1' },
  { value: '2025', label: '测站类型2' }
]

const echartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: 0,
    left: 'center',
    itemWidth: 30,
    itemHeight: 10,
    itemGap: 62,
    textStyle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'PingFangSC, sans-serif',
      padding: [0, 0, 0, 8]
    },
    data: [
      { name: '实测流量', icon: 'rect' },
      { name: '预报流量', icon: 'rect' },
      { name: '实测水位', icon: 'rect' },
      { name: '预报水位', icon: 'rect' }
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
  yAxis: {
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
  series: [
    {
      name: '实测流量',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
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
      name: '预报流量',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
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
      name: '实测水位',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 104, 119, 0.39)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#FF6877' },
      itemStyle: {
        color: '#FF6877'
      }
    },
    {
      name: '预报水位',
      data: [] as any,
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      areaStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(225, 234, 42, 0.34)' },
            { offset: 1, color: 'rgba(0, 0, 0, 0)' }
          ]
        }
      },
      lineStyle: { color: '#FFE74E' },
      itemStyle: {
        color: '#FFE74E'
      }
    }
  ]
})

const dataList = ref<Record<string, any>>([])
const detailsDatas = ref<Record<string, any>>({})
usePolling(async () => {
  dataList.value = [{
    id: 1,
    date: dayjs().format('YYYY-MM-DD'),
    name: '熊渡方案1',
    value1: SeededRandom.randomNumber(100, 200),
    value2: SeededRandom.randomNumber(100, 200),
    value3: SeededRandom.randomNumber(100, 200),
    value4: SeededRandom.randomNumber(100, 200)
  }, {
    id: 2,
    date: dayjs().format('YYYY-MM-DD'),
    name: '熊渡方案1',
    value1: SeededRandom.randomNumber(100, 200),
    value2: SeededRandom.randomNumber(100, 200),
    value3: SeededRandom.randomNumber(100, 200),
    value4: SeededRandom.randomNumber(100, 200)
  }, {
    id: 3,
    date: dayjs().format('YYYY-MM-DD'),
    name: '熊渡方案1',
    value1: SeededRandom.randomNumber(100, 200),
    value2: SeededRandom.randomNumber(100, 200),
    value3: SeededRandom.randomNumber(100, 200),
    value4: SeededRandom.randomNumber(100, 200)
  }, {
    id: 4,
    date: dayjs().format('YYYY-MM-DD'),
    name: '熊渡方案1',
    value1: SeededRandom.randomNumber(100, 200),
    value2: SeededRandom.randomNumber(100, 200),
    value3: SeededRandom.randomNumber(100, 200),
    value4: SeededRandom.randomNumber(100, 200)
  }]

  detailsDatas.value = {
    value1: SeededRandom.randomNumber(100, 200),
    value2: SeededRandom.randomNumber(100, 200),
    value3: SeededRandom.randomNumber(100, 200),
    value4: SeededRandom.randomNumber(100, 200),
    value5: SeededRandom.randomNumber(100, 200)
  }

  echartOption.value.xAxis.data = Array.from({ length: 7 }, (_, i) => dayjs().subtract(6 - i, 'day').format('MM.DD'))

  for (let i = 0; i < echartOption.value.series.length; i++) {
    echartOption.value.series[i].data = Array.from({ length: 7 }, () => SeededRandom.randomNumber(100, 200))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 25px;
}

.header-title {
  position: relative;
  display: flex;
  font-size: 34px;
  color: #fff;
  margin-bottom: 36px;
  padding-left: 50px;
  font-family: DINMedium, sans-serif;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: url("@/assets/global/images/card-title-icon.png") no-repeat;
    background-position: left center;
  }
}

.app-select {
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

:deep(.el-date-editor) {
  height: 65px;
  font-size: 28px;
  background: rgb(14 47 66 / 0.9);
  border: 1px solid #4896C6;
  box-shadow: none;

  .el-range-input {
    font-size: 30px;
  }

  .el-icon {
    font-size: 25px;
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

.dispatch-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .dispatch-item__header,
  .dispatch-item__content {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr 1fr;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    font-size: 28px;
    font-family: PingFangSC, sans-serif;
    border: 1px solid #527191;
  }

  .dispatch-item__header {
    height: 90px;
    justify-content: space-between;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, #1E5384 0%, #0084FF 100%);
      opacity: 0.52;
      z-index: -1;
    }
  }

  .dispatch-item__content {
    border-top: none;
    justify-content: space-around;
    padding-top: 18px;
    padding-bottom: 18px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgb(19 79 135 / 0.2);
      z-index: -1;
    }
  }
}
</style>
