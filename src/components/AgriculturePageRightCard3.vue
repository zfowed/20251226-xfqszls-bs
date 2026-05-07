<template>
  <PageCard title="遥感工程监测清单" bg-class="right">
    <div class="page-container">
      <div class="px-[14px]">
        <div class="h-[510px]">
          <PageTable :thead-col="theadCol" :data-list="dataList" :index="false" :limit-scroll="7" />
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { SeededRandom } from 'zf-utilz'

const theadCol = ref([
  {
    key: 'index',
    name: '序号',
    width: 100
  },
  {
    key: 'code',
    name: '项目'
  },
  {
    key: 'type',
    name: '数量',
    width: 150
  }
])

const dataList = ref<{[key:string]: any}[]>([])
usePolling(async () => {
  const tempList = []
  for (let i = 0; i < 20; i++) {
    tempList.push({
      index: i + 1,
      code: `种植结构监测${i + 1}`,
      type: SeededRandom.randomNumber(0, 20)
    })
    dataList.value = tempList
  }
})

</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 16px;
}

.header-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 34px;
  color: #FFF;
  margin-bottom: 36px;
  font-family: DINMedium, sans-serif;

  .header-title__tag {
    position: relative;
    color: #A3C9D5;
    font-size: 34px;
    margin-left: 20px;
    padding-left: 20px;

    &::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: "";
      border-left: 2px solid transparent;
      border-image: linear-gradient(180deg, rgb(217 217 217 / 0), #89D6FF, rgb(217 217 217 / 0)) 1;
      height: 30px;
    }
  }
}

.operation-btns {
  height: 83px;
  line-height: 83px;
  text-align: center;
  font-family: DINMedium, sans-serif;
  font-size: 30px;
  background: url('@/assets/global/images/preview/btn-operation.png') no-repeat;
  background-size: 100% 100%;
  transition: all 0.3s;
  cursor: pointer;

  &.active {
    background: url('@/assets/global/images/preview/btn-operation-active.png') no-repeat;
    background-size: 100% 100%;
  }
}

.table-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49.68px;
  height: 59.61px;
  line-height: 59.61px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
