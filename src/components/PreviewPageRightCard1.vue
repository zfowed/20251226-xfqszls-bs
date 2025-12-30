<template>
  <PageCard title="灌区工程" bg-class="right">
    <div class="page-container">
      <!-- 渠系信息 -->
      <div class="header-title mb-[20px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>渠系信息</span>
      </div>
      <div class="ditch-main">
        <div class="grid grid-cols-2 gap-[186px] mb-[40px] w-[697px]">
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
        <div class="grid grid-cols-3 gap-col-[71px] gap-row-[48px]">
          <div class="ditch-item" v-for="item in ditchList" :key="item.id">
            <img :src="item.icon" class="w-[35px] h-[45px] mt-[20px] mb-[10px]">
            <div class="ditch-item__title">
              {{ item.name }}
            </div>
            <div class="flex items-baseline mb-[9px]">
              <div class="ditch-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="ditch-item__unit">km</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 水源工程 -->
      <div class="header-title mb-[15px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>水源工程</span>
      </div>

      <img src="@/assets/global/images/preview/card-right1.png" class="mb-[25px]">

      <div class="app-table mb-[35px]">
        <div class="table-header">
          <div class="sluice-btns" :class="{'active': item.active}" v-for="item in sluiceBtns" :key="item.id" @click="clickSluiceHandle(item)">
            <img :src="item.icon" class="mr-[20px]">
            <span :class="item.active ? 'text-white' : 'text-[#9BA7B3]'">{{ item.name }}</span>
          </div>
        </div>
        <div class="table-tbody">
          <div v-for="item in sluiceList1" :key="item.id" class="table-tbody__tr">
            <div class="sluice-item">
              <div class="sluice-item__title">
                {{ item.name }}
              </div>
              <div class="sluice-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="sluice-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="app-table mb-[35px]">
        <div class="table-header">
          <div class="sluice-btns" :class="{'active': item.active}" v-for="item in sluiceBtns2" :key="item.id">
            <img :src="item.icon" class="mr-[20px]">
            <span :class="item.active ? 'text-white' : 'text-[#9BA7B3]'">{{ item.name }}</span>
          </div>
        </div>
        <div class="table-tbody">
          <div v-for="item in sluiceList2" :key="item.id" class="table-tbody__tr">
            <div class="sluice-item">
              <div class="sluice-item__title">
                {{ item.name }}
              </div>
              <div class="sluice-item__value">
                <ZfTweenNumber :value="item.value" />
              </div>
              <span class="sluice-item__unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="app-table mb-[35px]">
        <div class="table-header">
          <div class="sluice-btns" :class="{'active': item.active}" v-for="item in sluiceBtns3" :key="item.id">
            <img :src="item.icon" class="mr-[20px]">
            <span :class="item.active ? 'text-white' : 'text-[#9BA7B3]'">{{ item.name }}</span>
          </div>
        </div>
        <div class="table-tbody">
          <div v-for="item in sluiceList3" :key="item.id" class="table-tbody__tr">
            <div class="sluice-item">
              <div class="sluice-item__title">
                {{ item.name }}
              </div>
              <div class="flex" v-if="typeof item.value === 'string'">
                <div class="sluice-item__title ml-[15px]">
                  {{ item.value }}
                </div>
              </div>
              <div class="flex items-baseline" v-else>
                <div class="sluice-item__value">
                  <ZfTweenNumber :value="item.value" />
                </div>
                <span class="sluice-item__unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 渠系建筑物 -->
      <div class="header-title mb-[25px]">
        <img src="@/assets/global/images/card-title-icon.png" class="w-[30px] h-[32px] mr-[9px]">
        <span>渠系建筑物</span>
      </div>
      <div class="architecture-main">
        <div class="architecture-item" v-for="item in architectureList" :key="item.id">
          <img src="@/assets/global/images/preview/architecture-icon.png" class="mr-[15px]">
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
import { SeededRandom } from 'zf-utilz'

const getPhotoUrl = (icon: string) => {
  return new URL(`../assets/global/images/preview/${icon}.png`, import.meta.url).href
}

// 渠系信息
const totalInfo = reactive({
  totalDitchCount: 0,
  totalDitchLength: 0
})
const ditchList = ref<Record<string, any>[]>([
  { id: 'ditch1', name: '幸福渠主干渠', value: 0, icon: getPhotoUrl('ditch-icon-1') },
  { id: 'ditch2', name: '支城干渠', value: 0, icon: getPhotoUrl('ditch-icon-1') },
  { id: 'ditch3', name: '姚店干渠', value: 0, icon: getPhotoUrl('ditch-icon-1') },
  { id: 'ditch4', name: '百帅分水闸', value: 0, icon: getPhotoUrl('ditch-icon-2') },
  { id: 'ditch5', name: '张冲干渠', value: 0, icon: getPhotoUrl('ditch-icon-1') },
  { id: 'ditch6', name: '口口干渠', value: 0, icon: getPhotoUrl('ditch-icon-1') }
])

// 水源工程
const sluiceList1 = ref<Record<string, any>[]>([
  { id: 'sluiceList1', name: '计划泄洪流量', value: 0, unit: 'm³/s' },
  { id: 'sluiceList2', name: '校核泄洪流量', value: 0, unit: 'm³/s' }
])
const sluiceList2 = ref<Record<string, any>[]>([
  { id: 'sluiceList1', name: '计划泄洪流量', value: 0, unit: 'm³/s' },
  { id: 'sluiceList2', name: '校核泄洪流量', value: 0, unit: 'm³/s' }
])
const sluiceList3 = ref<Record<string, any>[]>([
  { id: 'sluiceList1', name: '设计流量 （东）', value: 0, unit: 'm³/s' },
  { id: 'sluiceList2', name: '设计流量 （东）', value: 0, unit: 'm³/s' },
  { id: 'sluiceList1', name: '取水形式：', value: '', unit: '' },
  { id: 'sluiceList2', name: '闸板形式：', value: '', unit: '' }
])

const triggerPolling = usePolling(async () => {
  sluiceList1.value.forEach(item => {
    item.value = SeededRandom.randomNumber(0, 100)
  })
})

const sluiceBtns = ref<Record<string, any>[]>([
  { id: 'sluice1', icon: getPhotoUrl('sluice-icon-1'), name: '主坝', active: true },
  { id: 'sluice2', icon: getPhotoUrl('sluice-icon-2'), name: '副坝#1', active: false },
  { id: 'sluice3', icon: getPhotoUrl('sluice-icon-2'), name: '副坝#2', active: false }
])
const sluiceBtns2 = ref<Record<string, any>[]>([
  { id: 'sluice21', icon: getPhotoUrl('sluice-icon-1'), name: '泄洪闸', active: true }
])
const sluiceBtns3 = ref<Record<string, any>[]>([
  { id: 'sluice31', icon: getPhotoUrl('sluice-icon-1'), name: '东西干果渠首闸', active: true }
])
const clickSluiceHandle = (item: Record<string, any>) => {
  sluiceBtns.value.forEach(btn => {
    btn.active = false
  })
  item.active = true
  triggerPolling.trigger()
}

// 渠系建筑物
const architectureList = ref<Record<string, any>[]>([
  { id: 'architecture1', name: '水库', value: 0, unit: '个' },
  { id: 'architecture2', name: '水闸', value: 0, unit: '座' },
  { id: 'architecture3', name: '桥梁', value: 0, unit: '座' },
  { id: 'architecture4', name: '渠首', value: 0, unit: '个' },
  { id: 'architecture5', name: '河道', value: 0, unit: '条' },
  { id: 'architecture6', name: '渠道', value: 0, unit: '条' },
  { id: 'architecture7', name: '泵站', value: 0, unit: '座' },
  { id: 'architecture8', name: '渡槽', value: 0, unit: '座' },
  { id: 'architecture9', name: '涵洞', value: 0, unit: '个' }
])

usePolling(async () => {
  totalInfo.totalDitchCount = SeededRandom.randomNumber(0, 100)
  totalInfo.totalDitchLength = SeededRandom.randomNumber(0, 100)

  ditchList.value.forEach(item => {
    item.value = SeededRandom.randomNumber(0, 100)
  })

  sluiceList3.value[0].value = SeededRandom.randomNumber(0, 100)
  sluiceList3.value[1].value = SeededRandom.randomNumber(0, 100)
  sluiceList3.value[2].value = '自流'
  sluiceList3.value[3].value = '手动启闭机'

  architectureList.value.forEach(item => {
    item.value = SeededRandom.randomNumber(0, 100)
  })
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
  color: #FFF;
  font-family: DINMedium, sans-serif;
}

.ditch-main {
  padding: 0 35px;
  margin-bottom: 40px;

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
      color: #D1E4FF;
      margin-right: 14px;
      background: url('@/assets/global/images/preview/total-label-bg.png') no-repeat;
      background-size: 100% 100%;
      font-family: PangMenZhengDao, sans-serif;
      font-size: 20px;
      box-sizing: border-box;
    }

    .ditch-total__bg {
      position: absolute;
      left: 4px;
      bottom: -10px;
      width: calc(100% - 4px);
      height: 100%;
      background: url('@/assets/global/images/preview/total-line-bg.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .ditch-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 157px;
    background: url('@/assets/global/images/preview/ditch-item-bg.png') no-repeat;
    background-size: 100% 100%;
    color: #BEEEFF;
    font-family: PingFangSC, sans-serif;

    &__title {
      font-size: 20px;
    }

    &__value {
      font-size: 36px;
      color: #50FFFC;
      font-family: Quantico, sans-serif;
      margin-right: 5px;
      font-weight: bold;
    }

    &__unit {
      font-size: 20px;
    }
  }
}

.app-table {
  .table-header {
    display: flex;
    align-items: center;
    height: 78px;
    width: 100%;
    background: rgb(0 42 93 / 0.52);
    border: 1px solid #92BBFF;
    border-bottom: none;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .table-tbody {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    background: rgb(48 142 212 / 0.58);
    border: 1px solid #92BBFF;
    box-sizing: border-box;

    &__tr {
      border-right: 1px solid #92BBFF;

      &:nth-child(2n) {
        border-right: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .sluice-btns {
    display: flex;
    align-items: center;
    margin-right: 112px;
    cursor: pointer;

    &.active {
      text-shadow: 0 0 3.6px #2BDFFF;
    }
  }

  .sluice-item {
    position: relative;
    display: flex;
    align-items: center;
    font-family: PingFangSC, sans-serif;
    height: 78px;
    padding-left: 55px;

    &::before {
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
      content: '';
      width: 10px;
      height: 10px;
      background: #03E6FF;
      border-radius: 50%;
      box-shadow: 0 0 4px #03E6FF;
    }

    &__title {
      color: #fff;
      font-size: 28px;
    }

    &__value {
      font-size: 24px;
      color: #50FFFC;
      font-family: Quantico, sans-serif;
      font-weight: bold;
      margin: 0 15px;
    }

    &__unit {
      color: #BEEEFF;
      font-size: 24px;
    }
  }
}

.architecture-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 81px;
  padding: 0 50px;

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
      color: #50FFFC;
      font-family: Quantico, sans-serif;
      margin-right: 5px;
      font-weight: bold;
    }

    &__unit {
      font-size: 20px;
      color: #BEEEFF;
    }
  }
}
</style>
