<template>
  <PageCard title="闸门状态信息" bg-class="left">
    <div class="channel-site-card">
      <PageTable
        :thead-col="theadCol"
        :data-list="dataList"
        :index="false"
        :limit-scroll="12"
        class="channel-site-card__table"
      />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  { key: 'siteName', name: '闸门名称' },
  { key: 'stakeNumber', name: '桩号', width: 180, align: 'center' },
  { key: 'position', name: '所属渠道', width: 180, align: 'center' },
  { key: 'status', name: '状态', width: 120, align: 'center' }
])

const dataList = ref<Record<string, any>[]>([
  { siteName: '泄洪闸', stakeNumber: 'X2+600', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X4+485', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X7+292', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X8+780', position: '主干渠', status: '关' },
  { siteName: '进水闸（夏河...）', stakeNumber: 'X8+780', position: '主干渠', status: '关' },
  { siteName: '前池灌溉节制闸', stakeNumber: 'X8+960', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X11+920', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X15+460', position: '主干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'X17+280', position: '主干渠', status: '关' },
  { siteName: '分水闸（渠首）', stakeNumber: 'Y0+000', position: '姚店干渠', status: '关' },
  { siteName: '泄洪闸', stakeNumber: 'Y3+265', position: '姚店干渠', status: '关' },
  { siteName: '节制闸', stakeNumber: 'Y3+290', position: '姚店干渠', status: '关' }
])

usePolling(async () => {
  const result: any = await service.xfqs.getGatePageList({
    start: 1,
    limit: 1000,
    sttp: 'DD'
  })

  if (!Array.isArray(result?.list)) return

  dataList.value = result.list.map((item: Record<string, any>, index: number) => ({
    id: item.id ?? item.stcd ?? `gate-${index}`,
    siteName: item.stnm || '--',
    stakeNumber: item.pileNo || '--',
    position: item.channelName || '--',
    status: Number(item.gtophgt) > 0 ? '开' : '关'
  }))
})
</script>

<style lang="scss" scoped>
.channel-site-card {
  padding: 8px 8px 12px;
  height: 1100px;
}

.channel-site-card__table {
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

  :deep(.table-body__tr:nth-child(3) .table-body__th) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}
</style>
