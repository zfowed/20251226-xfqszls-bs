<template>
  <div class="nav-side">
    <ul class="nav-side-list">
      <li class="nav-side-item" :class="{ 'active': item.active }" v-for="item in navItems" :key="item.id" @click="toolsItemHandle(item)">
        <span class="mb-[10px] ml-[10px]">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

const navItems = reactive([
  { id: 1, name: '方案预演', ue: 'yuyan', active: false },
  { id: 2, name: '淹没分析', ue: 'yanmofenxi', active: false },
  { id: 3, name: '渠道漫游', ue: 'manyou', active: false }
])

function toolsItemHandle (item: any) {
  if (item.active) {
    item.active = false
    ue.emit(item.ue, item.active)
    return
  }
  for (const eventItem of navItems) {
    if (eventItem.active) {
      ue.emit(eventItem.ue, false)
    }
    eventItem.active = false
  }
  item.active = true
  ue.emit(item.ue, item.active)
}
</script>
<style lang="scss" scoped>

.nav-side-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  list-style: none;
  margin-bottom: 36px;
  cursor: pointer;
  min-width: 250px;
  min-height: 71px;
  background: url('./images/normal-bg.png') no-repeat;

  &:last-child {
    margin-bottom: 0;
  }

  &.active {
    background: url('./images/active-bg.png') no-repeat;

    .icon {
      border: 1px solid #C1E6FF;
    }
  }

}
</style>
