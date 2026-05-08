<template>
  <PageCard title="应急响应等级" bg-class="right">
    <div class="page-container">
      <div class="level-tabs">
        <button v-for="item in levelTabs" :key="item.value" type="button" class="level-tab"
          :class="{ 'level-tab--active': activeLevel === item.value }" @click="activeLevel = item.value">
          {{ item.label }}
        </button>
      </div>

      <div class="content-list">
        <section v-for="group in currentLevelData" :key="group.title" class="content-item">
          <h3 class="item-title">
            <img src="@/assets/global/images/card-title-icon.png" class="title-icon">
            <span>{{ group.title }}</span>
          </h3>
          <p v-for="(detail, index) in group.details" :key="`${group.title}-${index}`" class="item-detail">
            {{ detail }}
          </p>
        </section>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type LevelValue = '1' | '2' | '3'

interface LevelTab {
  label: string
  value: LevelValue
}

interface LevelGroup {
  title: string
  details: string[]
}

const levelTabs: LevelTab[] = [
  { label: 'I级', value: '1' },
  { label: 'II级', value: '2' },
  { label: 'III级', value: '3' }
]

const levelContentMap: Record<LevelValue, LevelGroup[]> = {
  1: [
    {
      title: '启动条件',
      details: ['未来24小时降雨量']
    },
    {
      title: '应急响应措施',
      details: [
        '未来24小时降雨量',
        '未来24小时降雨量',
        '未来24小时降雨量'
      ]
    }
  ],
  2: [
    {
      title: '启动条件',
      details: ['未来24小时降雨量']
    },
    {
      title: '应急响应措施',
      details: [
        '未来24小时降雨量',
        '未来24小时降雨量',
        '未来24小时降雨量'
      ]
    }
  ],
  3: [
    {
      title: '启动条件',
      details: ['未来24小时降雨量']
    },
    {
      title: '应急响应措施',
      details: [
        '未来24小时降雨量',
        '未来24小时降雨量',
        '未来24小时降雨量'
      ]
    }
  ]
}

const activeLevel = ref<LevelValue>('1')

const currentLevelData = computed(() => levelContentMap[activeLevel.value] ?? [])
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px 40px;
  box-sizing: border-box;
  overflow-y: auto;
}

.level-tabs {
  display: flex;
  margin-bottom: 30px;
}

.level-tab {
  flex: 1;
  height: 106px;
  margin-right: 20px;
  padding-left: 40px;
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  color: #58d5ff;
  font-size: 36px;
  font-family: PingFangSC, sans-serif;
  background: url("@/assets/global/images/plan-warning-normal.png") no-repeat center;
  background-size: 100% 100%;

  &:last-child {
    margin-right: 0;
  }
}

.level-tab--active {
  color: #ffca38;
  background: url("@/assets/global/images/plan-warning-active.png") no-repeat center;
  background-size: 100% 100%;
}

.content-item {
  margin-bottom: 30px;
  padding: 27px;
  box-sizing: border-box;
  background: rgb(52 98 143 / 0.6);

  &:last-child {
    margin-bottom: 0;
  }
}

.item-title {
  display: flex;
  align-items: center;
  margin: 0 0 22px;
  color: #fff;
  font-size: 34px;
  font-weight: 400;
  font-family: JiangChengHeiTi, sans-serif;
}

.title-icon {
  width: 30px;
  height: 32px;
  margin-right: 10px;
}

.item-detail {
  margin: 0 0 10px;
  padding-left: 40px;
  box-sizing: border-box;
  color: #81e6ff;
  font-size: 28px;
  line-height: 1.35;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
