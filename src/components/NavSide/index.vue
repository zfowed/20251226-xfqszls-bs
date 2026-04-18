<template>
  <div class="nav-side">
    <ul class="nav-side-list">
      <li class="nav-side-item" v-for="(item, index) in navList" :key="index" @click="switchNavHandle(item)">
        <div class="icon" :class="{ active: route.path === item.path }">
          <span class="label">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">

const router = useRouter()
const route = useRoute()

const navList = defineModel({
  type: Array as PropType<Record<string, any>[]>,
  default: () => []
})

const switchNavHandle = (item: Record<string, any>) => {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<style lang="scss" scoped>

.nav-side-item {
  display: flex;
  align-items: center;
  font-size: 52px;
  list-style: none;
  margin-bottom: 66px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 264px;
    height: 57px;
    background: url('./images/normal-bg.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 16px;

    &.active {
      background: url('./images/active-bg.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .label {
    margin-top: -45px;
    width: 180px;
    text-align-last: justify;
    padding-right: 20px;
  }
}
</style>
