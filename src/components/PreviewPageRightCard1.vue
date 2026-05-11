<template>
  <PageCard title="灌区工程" bg-class="right">
    <div class="page-container">
      <!-- 渠系信息 -->
      <div class="header-title mb-[20px]">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span>渠系信息</span>
      </div>
      <div class="ditch-main">
        <div class="grid grid-cols-[auto_auto] justify-between mb-[40px] w-[697px]">
          <div class="ditch-total">
            <div class="ditch-total__label">
              数量
            </div>
            <div class="mt-[10px]">
              <span>总数量</span>
              <ZfTweenNumber :value="totalInfo.totalDitchCount" class="mx-[10px]" />
              <span>条</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
          <div class="ditch-total">
            <div class="ditch-total__label">
              长度
            </div>
            <div class="mt-[10px]">
              <span>总长度</span>
              <ZfTweenNumber :value="totalInfo.totalDitchLength" class="mx-[10px]" />
              <span>km</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
        </div>

        <div class="ditch-grid">
          <div
            v-for="(row, rowIndex) in ditchRows"
            :key="rowIndex"
            class="ditch-grid__row"
            :class="`ditch-grid__row--${row.length}`"
          >
            <div v-for="item in row" :key="item.id" class="ditch-item">
              <img :src="item.icon" :alt="item.name" class="ditch-item__icon">
              <div class="ditch-item__title">
                {{ item.name }}
              </div>
              <div class="ditch-item__value-group">
                <div class="ditch-item__value">
                  <ZfTweenNumber :value="Number(item.len)" />
                </div>
                <span class="ditch-item__unit">km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 水源工程 -->
      <div class="header-title mb-[25px]">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span>水源工程</span>
      </div>

      <img src="@/assets/global/images/preview/card-right2.png" class="mb-[55px]">

      <!-- 水库信息 -->
      <div class="header-title mb-[25px]">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span>水库信息</span>
      </div>
      <div class="reservoir-card">
        <div class="reservoir-card__header">
          <div class="reservoir-card__label">
            水库名称:
          </div>
          <ElSelect
            v-model="selectedReservoirId"
            class="reservoir-card__select"
            popper-class="reservoir-card__select-popper"
            placeholder="请选择水库"
          >
            <ElOption
              v-for="item in reservoirList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </ElSelect>
        </div>
        <div class="reservoir-card__table">
          <div
            v-for="metric in currentReservoir?.metrics || []"
            :key="metric.id"
            class="reservoir-card__column"
          >
            <div class="reservoir-card__column-title">
              {{ metric.name }}
            </div>
            <div class="reservoir-card__column-value">
              <ZfTweenNumber :value="metric.value" />
              <span class="reservoir-card__column-unit">{{ metric.unit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 渠系建筑物 -->
      <div class="header-title mb-[25px]">
        <img
          src="@/assets/global/images/card-title-icon.png"
          class="w-[30px] h-[32px] mr-[9px]"
        >
        <span>渠系建筑物</span>
      </div>
      <div class="architecture-main">
        <div class="architecture-item" v-for="item in architectureList" :key="item.id">
          <img
            src="@/assets/global/images/preview/architecture-icon.png"
            class="mr-[15px]"
          >
          <div>
            <div class="architecture-item__title">
              {{ item.name }}
            </div>
            <div class="flex items-baseline">
              <div class="architecture-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="architecture-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/preview/${icon}.png`, import.meta.url).href
}

// 渠系信息
const totalInfo = reactive({
  totalDitchCount: 0,
  totalDitchLength: 0
})
const ditchList = ref<Record<string, any>[]>([])
const ditchRows = computed(() => {
  return [ditchList.value.slice(0, 3), ditchList.value.slice(3, 7)].filter((row) => row.length)
})

// 水源工程
const selectedReservoirId = ref('reservoir1')
const reservoirList = ref<Record<string, any>[]>([
  {
    id: 'reservoir1',
    name: '熊渡水库',
    metrics: [
      { id: 'reservoir1-m1', name: '水库库容', value: 0, unit: '万m³' },
      { id: 'reservoir1-m2', name: '坝体高度', value: 0, unit: 'm' },
      { id: 'reservoir1-m3', name: '长度', value: 0, unit: 'km2' },
      { id: 'reservoir1-m4', name: '渠首设计流量', value: 0, unit: '万m³' },
      { id: 'reservoir1-m5', name: '泄洪流量', value: 0, unit: '万m³' }
    ]
  },
  {
    id: 'reservoir2',
    name: '望城岗水库',
    metrics: [
      { id: 'reservoir2-m1', name: '水库库容', value: 0, unit: '万m³' },
      { id: 'reservoir2-m2', name: '坝体高度', value: 0, unit: 'm' },
      { id: 'reservoir2-m3', name: '长度', value: 0, unit: 'km2' },
      { id: 'reservoir2-m4', name: '渠首设计流量', value: 0, unit: '万m³' },
      { id: 'reservoir2-m5', name: '泄洪流量', value: 0, unit: '万m³' }
    ]
  },
  {
    id: 'reservoir3',
    name: '张冲水库',
    metrics: [
      { id: 'reservoir3-m1', name: '水库库容', value: 0, unit: '万m³' },
      { id: 'reservoir3-m2', name: '坝体高度', value: 0, unit: 'm' },
      { id: 'reservoir3-m3', name: '长度', value: 0, unit: 'km2' },
      { id: 'reservoir3-m4', name: '渠首设计流量', value: 0, unit: '万m³' },
      { id: 'reservoir3-m5', name: '泄洪流量', value: 0, unit: '万m³' }
    ]
  }
])
const currentReservoir = computed(() => {
  return reservoirList.value.find(item => item.id === selectedReservoirId.value) || reservoirList.value[0]
})

// 渠系建筑物
const architectureList = ref<Record<string, any>[]>([
  { id: 'architecture-渡槽', name: '渡槽', value: 0, unit: '个' },
  { id: 'architecture-闸门', name: '闸门', value: 0, unit: '个' }
])

usePolling(async () => {
  const ditchResult: any = await service.xfqs.getChannelCount({})

  totalInfo.totalDitchCount = ditchResult.size
  totalInfo.totalDitchLength = ditchResult.allLen
  if (ditchResult.channelList.length > 0) {
    ditchList.value = ditchResult.channelList.map((it: any, index: number) => {
      return {
        ...it,
        icon: index === 3 ? getPhotoUrl('ditch-icon-2') : getPhotoUrl('ditch-icon-1')
      }
    })
  }

  reservoirList.value[0].metrics[0].value = 9508
  reservoirList.value[0].metrics[1].value = 177.5
  reservoirList.value[0].metrics[2].value = 2377.5
  reservoirList.value[0].metrics[3].value = 265.54
  reservoirList.value[0].metrics[4].value = 178

  reservoirList.value[1].metrics[0].value = 4280
  reservoirList.value[1].metrics[1].value = 96.8
  reservoirList.value[1].metrics[2].value = 1184.2
  reservoirList.value[1].metrics[3].value = 132.6
  reservoirList.value[1].metrics[4].value = 84.3

  reservoirList.value[2].metrics[0].value = 3865
  reservoirList.value[2].metrics[1].value = 88.4
  reservoirList.value[2].metrics[2].value = 956.3
  reservoirList.value[2].metrics[3].value = 120.75
  reservoirList.value[2].metrics[4].value = 73.8

  const architectureResult: any = await service.xfqs.getCanalStructureCountGroupByStructureType({})
  if (Array.isArray(architectureResult)) {
    architectureList.value = architectureResult.map((item: Record<string, any>, index: number) => ({
      id: `architecture-${item.type || index}`,
      name: item.type || '--',
      value: Number(item.num) || 0,
      unit: '个'
    }))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 30px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #fff;
  font-family: DINMedium, sans-serif;
}

.ditch-main {
  padding: 0 35px;
  margin-bottom: 60px;

  .ditch-total {
    position: relative;
    font-size: 28px;
    font-family: PingFangSC, sans-serif;
    display: flex;
    align-items: center;

    .ditch-total__label {
      height: 40px;
      line-height: 40px;
      padding: 0 12px;
      text-align: center;
      color: #d1e4ff;
      margin-right: 14px;
      background: url("@/assets/global/images/preview/total-label-bg.png") no-repeat;
      background-size: 100% 100%;
      font-family: PangMenZhengDao, sans-serif;
      font-size: 20px;
      box-sizing: border-box;
    }

    .ditch-total__bg {
      position: absolute;
      left: 4px;
      bottom: -10px;
      width: 104%;
      height: 100%;
      background: url("@/assets/global/images/preview/total-line-bg.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .ditch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 157px;
    background: url("@/assets/global/images/preview/ditch-item-bg.png") no-repeat;
    background-size: 100% 100%;
    color: #beeeff;
    font-family: PingFangSC, sans-serif;

    &__icon {
      width: 35px;
      height: 45px;
      margin-bottom: 8px;
    }

    &__title {
      font-size: 20px;
    }

    &__value-group {
      display: flex;
      align-items: baseline;
      margin-top: 8px;
    }

    &__value {
      font-size: 36px;
      color: #50fffc;
      font-family: Quantico, sans-serif;
      margin-right: 5px;
      font-weight: bold;
    }

    &__unit {
      font-size: 20px;
    }
  }

  .ditch-grid {
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin-top: 16px;
  }

  .ditch-grid__row {
    display: grid;
    justify-content: space-between;
  }

  .ditch-grid__row--3 {
    grid-template-columns: repeat(3, 220px);
  }

  .ditch-grid__row--3 .ditch-item {
    width: 220px;
  }

  .ditch-grid__row--4 {
    grid-template-columns: repeat(4, 180px);
  }

  .ditch-grid__row--4 .ditch-item {
    width: 180px;
  }
}

.reservoir-card {
  margin-bottom: 65px;
}

.reservoir-card__header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 0 32px;
}

.reservoir-card__label {
  margin-right: 22px;
  color: #fff;
  font-size: 24px;
  line-height: 1;
  white-space: nowrap;
}

.reservoir-card__select {
  width: 410px;
}

.reservoir-card__table {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border: 1px solid rgb(113 182 239 / 0.45);
  background: linear-gradient(180deg, rgb(10 53 95 / 0.76) 0%, rgb(8 31 59 / 0.72) 100%);
  overflow: hidden;
}

.reservoir-card__column {
  border-right: 1px solid rgb(113 182 239 / 0.35);

  &:last-child {
    border-right: none;
  }
}

.reservoir-card__column-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 58px;
  color: #d9efff;
  font-size: 20px;
  text-align: center;
  background: linear-gradient(180deg, rgb(32 93 149 / 0.7) 0%, rgb(20 70 119 / 0.56) 100%);
  border-bottom: 1px solid rgb(113 182 239 / 0.35);
}

.reservoir-card__column-value {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 62px;
  color: #50fffc;
  font-size: 22px;
  font-family: Quantico, sans-serif;
  font-weight: bold;
  text-shadow: 0 0 10px rgb(80 255 252 / 0.28);
}

.reservoir-card__column-unit {
  margin-left: 8px;
  color: #c8e8ff;
  font-size: 16px;
  font-family: PingFangSC, sans-serif;
  font-weight: normal;
}

:deep(.reservoir-card__select .el-select__wrapper) {
  min-height: 40px;
  padding: 0 16px;
  background: linear-gradient(180deg, rgb(20 74 122 / 0.72) 0%, rgb(7 42 83 / 0.76) 100%);
  border-radius: 0;
  box-shadow:
    inset 0 0 0 1px rgb(106 197 255 / 0.36),
    inset 0 0 16px rgb(72 182 255 / 0.14),
    0 0 0 1px rgb(79 164 219 / 0.56);
}

:deep(.reservoir-card__select .el-select__wrapper.is-focused) {
  box-shadow:
    inset 0 0 0 1px rgb(116 219 255 / 0.5),
    inset 0 0 20px rgb(87 198 255 / 0.18),
    0 0 0 1px rgb(106 197 255 / 0.72);
}

:deep(.reservoir-card__select .el-select__selection) {
  min-height: 40px;
}

:deep(.reservoir-card__select .el-select__placeholder),
:deep(.reservoir-card__select .el-select__selected-item),
:deep(.reservoir-card__select .el-select__input-text) {
  color: #dff5ff;
  font-size: 18px;
  font-family: PingFangSC, sans-serif;
  font-weight: 600;
}

:deep(.reservoir-card__select .el-select__placeholder) {
  color: rgb(223 245 255 / 0.7);
}

:deep(.reservoir-card__select .el-select__caret) {
  color: #86eaff;
  font-size: 18px;
  font-weight: 700;
}

:global(.reservoir-card__select-popper.el-popper) {
  background: linear-gradient(180deg, rgb(11 43 82 / 0.96) 0%, rgb(6 28 56 / 0.96) 100%);
  border: 1px solid rgb(96 192 255 / 0.32);
  border-radius: 0;
  box-shadow: 0 10px 24px rgb(3 14 30 / 0.42);
}

:global(.reservoir-card__select-popper .el-popper__arrow) {
  display: none;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item) {
  height: 36px;
  padding: 0 16px;
  color: rgb(223 245 255 / 0.88);
  font-size: 16px;
  font-family: PingFangSC, sans-serif;
  line-height: 36px;
}

:global(.reservoir-card__select-popper .el-select-dropdown__item.is-hovering),
:global(.reservoir-card__select-popper .el-select-dropdown__item.is-selected) {
  background: rgb(71 154 217 / 0.24);
  color: #eefbff;
}

.architecture-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 40px;
  padding: 0 50px;
  align-content: start;
  min-height: 400px;

  .architecture-item {
    display: flex;
    align-items: center;
    font-family: PingFangSC, sans-serif;

    &__title {
      font-size: 28px;
      color: #fff;
    }

    &__value {
      font-size: 28px;
      color: #50fffc;
      font-family: Quantico, sans-serif;
      margin-right: 5px;
      font-weight: bold;
    }

    &__unit {
      font-size: 20px;
      color: #beeeff;
    }
  }
}
</style>
