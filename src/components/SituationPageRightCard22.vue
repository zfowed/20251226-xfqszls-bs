<template>
  <PageCard title="重点流量站" bg-class="right">
    <div class="page-container">
      <div class="flow-table">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="5">
          <template #siteName="scope">
            <div class="flow-table__site">
              <img
                src="@/components/PageTable/assets/index-bg-1.png"
                class="flow-table__site-icon"
              >
              <span>{{ scope.row.siteName }}</span>
            </div>
          </template>
          <template #flow="scope">
            <span class="flow-table__value">{{ scope.row.flow }}</span>
            <span class="flow-table__unit">万m³</span>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const theadCol = ref([
  {
    key: 'siteName',
    name: '站点',
    width: 290
  },
  {
    key: 'flow',
    name: '流量',
    width: 180,
    align: 'center'
  },
  {
    key: 'time',
    name: '时间',
    width: 260,
    align: 'center'
  }
])

const dataList = ref<Record<string, any>[]>([
  { siteName: 'XXX站点', flow: 2, time: '26/4/23 10:00' },
  { siteName: 'XXX站点', flow: 1, time: '26/4/22 13:00' },
  { siteName: 'XXX站点', flow: 0, time: '26/4/21 12:00' },
  { siteName: 'XXX站点', flow: 0, time: '26/4/20 9:00' },
  { siteName: 'XXX站点', flow: 0, time: '26/4/20 16:00' }
])

usePolling(async () => {
  const result: any = await service.xfqs.getGatePageList({
    start: 1,
    limit: 5,
    sttp: 'DD'
  })

  if (result?.list?.length > 0) {
    dataList.value = result.list.slice(0, 5).map((item: Record<string, any>) => ({
      siteName: item.stnm || 'XXX站点',
      flow: Number(item.sq || item.q || 0),
      time: item.tm ? dayjs(item.tm).format('YY/M/DD H:mm') : '--'
    }))
  }
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 32px 32px;
}

.flow-table {
  height: 455px;
}

.flow-table__site {
  display: flex;
  align-items: center;
  color: #81e6ff;
}

.flow-table__site-icon {
  width: 42px;
  height: 42px;
  margin-right: 14px;
}

.flow-table__value {
  color: #50fffc;
  font-size: 22px;
  font-family: Quantico, sans-serif;
}

.flow-table__unit {
  margin-left: 6px;
  color: #d8edff;
  font-size: 18px;
}
</style>
