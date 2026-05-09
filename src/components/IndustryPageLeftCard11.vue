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
  { key: 'flow', name: '渠首流量', width: 150, align: 'center' },
  { key: 'status', name: '渠道过流状态', width: 180, align: 'center' }
])

const channelList = ref([
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
</script>

<style lang="scss" scoped>
.channel-table-card {
  padding: 14px 6px 12px;
  height: 680px;
}

.channel-table-card__table {
  height: 100%;
}

.channel-table-card__flow-value {
  color: #4df3ff;
  font-family: DINAlternate, Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-shadow: 0 0 10px rgb(77 243 255 / 0.22);
}

.channel-table-card__flow-unit {
  color: rgb(217 241 255 / 0.7);
  font-size: 14px;
}

.channel-table-card__flow-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
