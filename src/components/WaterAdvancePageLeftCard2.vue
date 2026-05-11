<template>
  <PageCard title="可供水量预警" bg-class="left">
    <div class="page-container">
      <div class="warning-panel">
        <div class="warning-status">
          <img src="@/assets/flood-advance-water-warning-vector-logo.png" class="warning-status__image" alt="">
        </div>
        <div class="warning-content">
          <p class="warning-content__title">
            可供水量预警
          </p>
        </div>
        <div class="warning-status-button">
          已启动
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
    label: '水库库容',
    value: 4545,
    unit: '万m³',
    percent: 23
  },
  {
    label: '水位',
    value: 145,
    unit: 'm',
    percent: 46
  },
  {
    label: '河流来水径流',
    value: 514,
    unit: 'm',
    percent: 59
  }
])

usePolling(async () => {
  // const result: any = await service.xfqs.getRsvrWarnInfo({})
  // console.log('可供水量预警数据：', result)
  // const { msg, currntZ, tm } = result
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 42px 38px 46px;
  box-sizing: border-box;
}

.warning-panel {
  position: relative;
  display: flex;
  align-items: center;
  width: 750px;
  height: 185px;
  margin: 0 auto;
  margin-bottom: 40px;
  border-radius: 8px;
  background: url("@/assets/flood-advance-page-left-card1-warning-panel-bg-1.png") no-repeat center / contain;

  .warning-status {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 116px;
    height: 116px;
    margin-left: 40px;
  }

  .warning-status__image {
    width: 64px;
    height: 64px;
    display: block;
    object-fit: contain;
  }

  .warning-content {
    position: relative;
    z-index: 1;
    flex: 1;
    min-width: 0;
    margin-left: 90px;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;

    .warning-content__title {
      color: #fff;
      font-size: 30px;
      line-height: 42px;
      font-weight: 400;
    }
  }

  .warning-status-button {
    position: relative;
    z-index: 1;
    width: 150px;
    height: 58px;
    margin-right: 143px;
    border: 1px solid #129df6;
    background: rgb(12 92 137 / 0.64);
    color: #d7f3ff;
    text-align: center;
    font-size: 28px;
    line-height: 58px;
    font-weight: 500;
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    box-shadow: inset 0 0 18px rgb(35 187 255 / 0.18);
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
