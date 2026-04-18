<template>
  <PageCard title="重点水位预警" bg-class="left">
    <div class="page-container">
      <div class="ditch-main">
        <div class="grid grid-cols-[auto_auto] justify-between mb-[40px]">
          <div class="ditch-total">
            <img
              src="@/assets/global/images/flood/danger-alarm-icon.png"
              class="relative top-[8px]"
            >
            <div class="ditch-total__label">
              <span>预警</span>
              <ZfTweenNumber :value="totalInfo.danger" class="mx-[10px]" />
              <span>个</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
          <div class="ditch-total">
            <img
              src="@/assets/global/images/flood/success-alarm-icon.png"
              class="relative top-[8px]"
            >
            <div class="ditch-total__label">
              <span>正常</span>
              <ZfTweenNumber :value="totalInfo.success" class="mx-[10px]" />
              <span>个</span>
            </div>
            <div class="ditch-total__bg" />
          </div>
        </div>
      </div>
      <div class="h-[415px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="4">
          <template #header-total="{ column }">
            <div class="flex flex-col items-center">
              <div>
                {{ column.name }}<span class="text-[#BEEEFF] text-[24px]">mm</span>
              </div>
            </div>
          </template>
          <template #warnStatus="{ row }">
            <div class="flex items-center justify-center w-full h-full">
              <div :class="row.warnStatus === 0 ? 'success-alarm' : 'danger-alarm'">
                {{ row.warnStatus === 0 ? "正常" : "预警" }}
              </div>
            </div>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  {
    key: 'stnm',
    name: '站点名称',
    width: 160
  },
  {
    key: 'tmMin',
    name: '时间',
    width: 190,
    align: 'center'
  },
  {
    key: 'z',
    name: '水位',
    align: 'center'
  },
  {
    key: 'warnStatus',
    name: '预警',
    width: 130,
    align: 'center'
  }
])
const dataList = ref<{ [key: string]: any }[]>([])

const totalInfo = reactive({
  success: 0,
  danger: 0
})

usePolling(async () => {
  const result: any = await service.xfqs.getZZWarnInfo({})
  for (const item of result.dataList) {
    if (item.warnStatus === 0) {
      totalInfo.success += 1
    } else if (item.warnStatus === 1) {
      totalInfo.danger += 1
    }
  }
  dataList.value = result.dataList
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px;
}

.success-alarm {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  background: rgb(0 145 59 / 0.33);
  color: #def0dc;
  border: 1px solid #3ff83c;
}

.danger-alarm {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  background: rgb(148 0 0 / 0.51);
  color: #f0dcdc;
  border: 1px solid #f83c3c;
}

.ditch-main {
  padding: 0 35px;
  margin-bottom: 30px;

  .ditch-total {
    width: 300px;
    height: 67px;
    position: relative;
    font-size: 28px;
    font-family: PingFangSC, sans-serif;
    display: flex;
    align-items: center;
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(
        to right,
        rgb(49 135 255 / 0.96),
        rgb(109 183 255 / 0.96)
      )
      1;

    .ditch-total__label {
      height: 67px;
      line-height: 94px;
      text-align: center;
      width: calc(100% - 110px);
    }

    .ditch-total__bg {
      position: absolute;
      left: 30px;
      bottom: 0;
      width: 276px;
      height: 100%;
      background: url("@/assets/global/images/flood/alarm-shadow.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
