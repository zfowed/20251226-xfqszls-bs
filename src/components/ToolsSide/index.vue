<template>
  <div class="tools-side">
    <ul class="tools-side__list">
      <li
        v-for="item in navItems"
        :key="item.id"
        class="tools-side__item"
        :class="{ 'tools-side__item--active': item.active }"
        @click="toolsItemHandle(item)"
      >
        <img
          :src="getStationImage(item.imageIndex, item.active)"
          :alt="item.name"
          class="tools-side__icon"
        >
        <span class="tools-side__label">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface NavItem {
  id: number
  name: string
  imageIndex: number
  active: boolean
}

const getPhotoUrl = (icon: string) => {
  return new URL(`./images/${icon}.png`, import.meta.url).href
}

const getStationImage = (imageIndex: number, active: boolean) => {
  return getPhotoUrl(`s${imageIndex}-${active ? 'in' : 'un'}`)
}

const navItems = reactive<NavItem[]>([
  { id: 1, name: '闸控站', imageIndex: 1, active: false },
  { id: 2, name: '视频站', imageIndex: 2, active: true },
  { id: 3, name: '泵站', imageIndex: 3, active: false },
  { id: 4, name: '气象站', imageIndex: 4, active: false },
  { id: 5, name: '流量站', imageIndex: 5, active: false },
  { id: 6, name: '水质站', imageIndex: 6, active: false },
  { id: 7, name: '水位站', imageIndex: 7, active: false }
])

function toolsItemHandle (item: NavItem) {
  if (item.active) {
    item.active = false
    ue.emit('showpoi', item.name, item.active)
    return
  }

  for (const currentItem of navItems) {
    if (currentItem.active) {
      ue.emit('showpoi', currentItem.name, false)
    }
    currentItem.active = false
  }

  item.active = true
  ue.emit('showpoi', item.name, item.active)
}
</script>

<style lang="scss" scoped>
.tools-side__list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tools-side__item {
  display: flex;
  align-items: center;
  min-height: 74px;
  cursor: pointer;
  user-select: none;
}

.tools-side__icon {
  width: 74px;
  height: 74px;
  flex-shrink: 0;
}

.tools-side__label {
  margin-left: 22px;
  font-size: 28px;
  line-height: 1;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 0 0 10px rgb(98 228 255 / 0.45);
  white-space: nowrap;
}

.tools-side__item--active {
  .tools-side__label {
    text-shadow: 0 0 14px rgb(160 234 255 / 0.8);
  }

  .tools-side__icon {
    /* width: 80px;
    height: 80px; */
  }
}
</style>
