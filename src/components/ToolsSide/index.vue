<template>
  <div class="nav-side">
    <ul class="nav-side-list">
      <li class="nav-side-item" v-for="item in navItems" :key="item.id">
        <div class="icon">
          <img :src="item.icon" class="w-[22px] h-[22px]" :alt="item.name">
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
  { id: 1, name: '闸控站', icon: getPhotoUrl('gate'), ue: '' },
  { id: 2, name: '视频站', icon: getPhotoUrl('video'), ue: '' },
  { id: 3, name: '泵站', icon: getPhotoUrl('pump'), ue: '' },
  { id: 4, name: '气象站', icon: getPhotoUrl('weather'), ue: '' },
  { id: 5, name: '流量站', icon: getPhotoUrl('traffic'), ue: '' },
  { id: 6, name: '水质站', icon: getPhotoUrl('ph'), ue: '' },
  { id: 7, name: '水位站', icon: getPhotoUrl('fluviograph'), ue: '' }
])
</script>
<style lang="scss" scoped>

.nav-side-item {
  display: flex;
  align-items: center;
  font-size: 30px;
  list-style: none;
  margin-bottom: 36px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 58px;
    height: 58px;
    background: url('./images/bg.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 16px;
  }
}
</style>
