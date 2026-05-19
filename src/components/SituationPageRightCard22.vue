<template>
  <PageCard title="重点流量站" bg-class="right">
    <div class="page-container">
      <div class="flow-table">
        <PageTable
          class="rehearsal-table"
          :thead-col="theadCol"
          :data-list="dataList"
          :limit-scroll="5"
        >
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
            <span class="flow-table__unit">m³/s</span>
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
])

usePolling(async () => {
  const result: any = await service.xfqs.getChannelPage({
    start: 1,
    limit: 1000,
    sttp: 'QQ'
  })
  if (result?.list?.length > 0) {
    dataList.value = result.list.map((item: Record<string, any>) => ({
      siteName: item.stnm || 'XXX站点',
      flow: item.q ?? '--',
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
  height: 515px;
}

.flow-table__site {
  display: flex;
  align-items: center;
  color: #81e6ff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.flow-table__site-icon {
  width: 42px;
  height: 42px;
  margin-right: 14px;
}

.flow-table__value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.flow-table__unit {
  margin-left: 6px;
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
}

.rehearsal-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 30px;
  }

  :deep(.table-body__tr:nth-child(3)) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }

  :deep(.table-body__tr:nth-child(3) .table-body__th),
  :deep(.table-body__tr:nth-child(3) .flow-table__site),
  :deep(.table-body__tr:nth-child(3) .flow-table__unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
