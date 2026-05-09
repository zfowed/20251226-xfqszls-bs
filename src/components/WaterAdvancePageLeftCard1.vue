<template>
  <PageCard title="气象灾害预警" bg-class="left">
    <div class="page-container">
      <div class="warning-panel">
        <div class="warning-status">
          <div class="warning-status__icon">
            <span class="warning-status__thermometer">
              <img src="@/assets/flood-advance-water-temperature-icon.svg" class="warning-status__thermometer-image" alt="">
            </span>
            <div class="warning-status__text">
              正常
            </div>
          </div>
        </div>
        <div class="warning-content">
          <p class="warning-content__title flex items-center">
            <img src="@/assets/global/images/water/advance/Vector.png" alt="">
            <span>高温红色预警</span>
          </p>
          <p class="warning-content__temperature">
            当前温度：<span>6℃-15℃</span>
          </p>
        </div>
      </div>

      <div class="metric-list">
        <div v-for="item in metrics" :key="item.label" class="metric-item">
          <div class="metric-item__header">
            <span class="metric-item__label">{{ item.label }}</span>
            <span class="metric-item__right">
              <span class="metric-item__value">{{ item.value }}</span>
              <span class="metric-item__unit">{{ item.unit }}</span>
            </span>
          </div>
          <div class="metric-item__track">
            <div class="metric-item__fill" :style="{ width: `${item.percent}%` }" />
            <div class="metric-item__marker" :style="{ left: `${item.percent}%` }" />
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type MetricItem = {
  label: string
  value: number
  unit: string
  percent: number
}

const metrics = ref<MetricItem[]>([
  {
    label: '过去累计连续无雨日',
    value: 4,
    unit: '天',
    percent: 23
  },
  {
    label: '过去持续累计降雨',
    value: 12,
    unit: 'mm',
    percent: 40
  },
  {
    label: '未来12小时累积降雨',
    value: 42,
    unit: 'mm',
    percent: 59
  }
])
</script>

<style lang="scss" scoped>
.page-container {
  padding: 42px 38px 46px;
  box-sizing: border-box;
}

.warning-panel {
  display: flex;
  align-items: center;
  gap: 52px;
  width: 750px;
  height: 185px;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 8px;
  background: url("@/assets/flood-advance-page-left-card1-warning-panel-bg.png") no-repeat center / contain;

  .warning-status {
    width: 116px;
    margin-left: 40px;

    .warning-status__icon {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      justify-content: center;
      width: 114px;
      height: 114px;
      box-sizing: border-box;
    }

    .warning-status__thermometer {
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
    }

    .warning-status__thermometer-image {
      position: absolute;
      inset: -17.37% -18.13%;
      width: 136.26%;
      height: 134.74%;
      display: block;
      object-fit: contain;
    }

    .warning-status__text {
      margin-top: 10px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      line-height: 28px;
      font-weight: 400;
      font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    }
  }

  .warning-content {
    flex: 1;
    min-width: 0;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;

    .warning-content__title {
      color: #fff;
      font-size: 30px;
      line-height: 42px;
      font-weight: 400;
    }

    .warning-content__temperature {
      margin-top: 20px;
      color: #f0fbff;
      font-size: 30px;
      line-height: 42px;
      font-weight: 400;

      span {
        color: #fff;
        font-size: 32px;
        line-height: 38px;
        font-weight: 700;
        font-family: Quantico, DINAlternateBold, sans-serif;
        text-shadow: 0 0 5px #56ebff;
      }
    }
  }
}

.metric-list {
  display: flex;
  flex-direction: column;
  gap: 44px;
}

.metric-item {
  .metric-item__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 22px;
    color: #fff;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  }

  .metric-item__label {
    flex: 1;
    font-size: 30px;
    line-height: 42px;
    font-weight: 400;
  }

  .metric-item__right {
    display: inline-flex;
    align-items: baseline;
    justify-content: flex-end;
    min-width: 120px;
  }

  .metric-item__value {
    color: #50fffc;
    font-size: 32px;
    line-height: 36px;
    font-weight: 700;
    font-family: Quantico, DINAlternateBold, sans-serif;
  }

  .metric-item__unit {
    color: #beeeff;
    font-size: 24px;
    line-height: 30px;
    margin-left: 10px;
  }

  .metric-item__track {
    position: relative;
    height: 10px;
    border-radius: 20px;
    background: linear-gradient(90deg, rgb(101 128 156 / 0.2) 0%, rgb(101 128 156 / 0.35) 100%);
    overflow: visible;
  }

  .metric-item__fill {
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(90deg, #2f9ace 0%, #67f7ff 100%);
    box-shadow: 0 0 12px rgb(75 237 255 / 0.4);
  }

  .metric-item__marker {
    position: absolute;
    top: 50%;
    width: 21px;
    height: 21px;
    border-radius: 50% 50% 50% 0;
    background: linear-gradient(180deg, #fff 0%, #9eeeff 100%);
    box-shadow: 0 0 8px rgb(120 240 255 / 0.45);
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
