<template>
  <div class="nav-side">
    <ul class="nav-side-list">
      <li class="nav-side-item" :class="{ 'active': item.active }" v-for="item in navItems" :key="item.id" @click="toolsItemHandle(item)">
        <div class="icon">
          <img :src="item.icon" class="w-[22px] h-[22px] relative z-[1]" :alt="item.name">
        </div>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

const getPhotoUrl = (icon: string) => {
  return new URL(`./images/${icon}.png`, import.meta.url).href
}

const navItems = reactive([
  { id: 1, name: '涵洞', active: false, icon: getPhotoUrl('gate'), ue: '' },
  { id: 2, name: '测量点', active: false, icon: getPhotoUrl('fluviograph'), ue: '' },
  { id: 3, name: '流量监测站', active: false, icon: getPhotoUrl('traffic'), ue: '' },
  { id: 4, name: '灌口流量计', active: false, icon: getPhotoUrl('fill'), ue: '' }
])

function toolsItemHandle (item: any) {
  item.active = !item.active
  ue.emit('showpoi', item.name, item.active)
}
</script>
<style lang="scss" scoped>

.nav-side-item {
  display: flex;
  align-items: center;
  font-size: 24px;
  list-style: none;
  margin-bottom: 36px;
  cursor: pointer;
  min-width: 194px;
  height: 58px;
  background: rgb(12 68 120 / 0.48);
  border: 1px solid #41A1E0;
  border-radius: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  .icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    margin-right: 5px;
    background: rgb(12 68 120 / 0.48);
    border-radius: 30px;
    border: 1px solid #41A1E0;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 46.95px;
      height: 46.95px;
      background: #294E70;
      border-radius: 30px;
      z-index: 0;
    }
  }

  &.active {
    background: #408ED8;
    border: 1px solid #C1E6FF;

    .icon {
      border: 1px solid #C1E6FF;
    }
  }

}
</style>
