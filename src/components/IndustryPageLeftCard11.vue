<template>
  <PageCard title="渠道工程信息" bg-class="left">
    <div class="channel-table-card">
      <PageTable
        :thead-col="theadCol"
        :data-list="channelList"
        :index="false"
        class="channel-table-card__table"
        :limit-scroll="7"
      >
        <template #flow="scope">
          <div class="channel-table-card__flow-cell">
            <span class="channel-table-card__flow-value">{{ scope.row.flow }}</span>
            <span class="channel-table-card__flow-unit">m³/s</span>
          </div>
        </template>
      </PageTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  { key: 'name', name: '渠道名称', width: 230 },
  { key: 'type', name: '渠道类型', width: 140, align: 'center' },
  { key: 'flow', name: '渠首流量', align: 'center' },
  { key: 'status', name: '渠道过流状态', align: 'center' }
])

const channelTypeMap: Record<string, string> = {
  gq: '干渠',
  zq: '支渠'
}

const channelList = ref<Record<string, any>[]>([
  {
    id: 'channel-1',
    name: '幸福渠主干渠',
    type: '干渠',
    flow: 256,
    status: '是',
    active: true
  },
  {
    id: 'channel-2',
    name: '姚店干渠',
    type: '干渠',
    flow: 158,
    status: '否',
    active: false
  },
  {
    id: 'channel-3',
    name: '枝城干渠',
    type: '干渠',
    flow: 189,
    status: '是',
    active: false
  },
  {
    id: 'channel-4',
    name: '张冲支渠',
    type: '支渠',
    flow: 231,
    status: '否',
    active: false
  },
  {
    id: 'channel-5',
    name: '白水支渠',
    type: '支渠',
    flow: 148,
    status: '否',
    active: false
  },
  {
    id: 'channel-6',
    name: '同心支渠',
    type: '支渠',
    flow: 201,
    status: '否',
    active: false
  },
  {
    id: 'channel-7',
    name: '百合支渠',
    type: '支渠',
    flow: 132,
    status: '否',
    active: false
  }
])

usePolling(async () => {
  const result: any = await service.xfqs.getChannelAndStcd({})
  if (!Array.isArray(result)) return

  channelList.value = result.map((item: Record<string, any>, index: number) => ({
    id: item.id ?? `channel-${index}`,
    name: item.name || '--',
    type: channelTypeMap[item.type] || item.type || '--',
    flow: item.q ?? '0.00',
    status: item.isHasQ || '--',
    active: index === 0
  }))
})
</script>

<style lang="scss" scoped>
.channel-table-card {
  padding: 14px 6px 12px;
  height: 680px;
}

.channel-table-card__table {
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
  :deep(.table-body__tr:nth-child(3) .channel-table-card__flow-unit) {
    color: #fff;
  }

  :deep(.table-body__tr:nth-child(3):hover) {
    color: #fff;
    background: linear-gradient(0deg, rgb(0 132 255 / 0.52), rgb(30 83 132 / 0.52));
  }
}

.channel-table-card__flow-value {
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 30px;
}

.channel-table-card__flow-unit {
  color: #beeeff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-size: 24px;
}

.channel-table-card__flow-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>
