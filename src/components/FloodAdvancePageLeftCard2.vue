<template>
  <PageCard title="水库预警" bg-class="left">
    <div class="page-container">
      <div class="warning-panel">
        <div class="warning-status">
          <div class="warning-status__icon">
            <span class="warning-status__thermometer">
              <img
                src="@/assets/flood-advance-page-left-card2-water-temperature-icon.svg"
                class="warning-status__thermometer-image"
                alt=""
              >
            </span>
            <div class="warning-status__text">
              {{ warningStatusText }}
            </div>
          </div>
        </div>
        <div class="warning-content">
          <p class="warning-content__title">
            熊渡水库当前水位：<span>{{ currentWaterLevel }}</span>m
          </p>
          <p class="warning-content__temperature">
            监测时间：<span>{{ monitorTime }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="visualization-container">
      <div class="visualization-canvas" aria-hidden="true">
        <div
          class="visualization-canvas__pane visualization-canvas__pane--short"
          :style="shortPaneHeightStyle"
        >
          <div class="pane-waterline pane-waterline--overflow-left">
            <span class="pane-waterline__arrow pane-waterline__arrow--west" aria-hidden="true" />
            <span class="pane-waterline__dash" />
          </div>
        </div>
        <div
          class="visualization-canvas__pane visualization-canvas__pane--tall"
          :style="tallPaneHeightStyle"
        >
          <div class="visualization-canvas__pane-tall-value">
            <span class="visualization-canvas__pane-tall-value-num">{{ ruleWaterLevel }}</span><span class="visualization-canvas__pane-tall-value-unit">m</span>
          </div>
          <div class="visualization-canvas__pane-tall-overlay">
            <div class="pane-waterline pane-waterline--overflow-right">
              <div class="pane-waterline__stack">
                <span class="pane-waterline__label">保证水位</span>
                <div class="pane-waterline__row">
                  <span class="pane-waterline__dash" />
                  <span class="pane-waterline__arrow pane-waterline__arrow--east" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="visualization-canvas__dam">
          <svg
            class="visualization-canvas__dam-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 300"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern
                :id="damPatternId"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(64.69)"
              >
                <line
                  x1="6"
                  y1="-24"
                  x2="6"
                  y2="36"
                  stroke="#5c7681"
                  stroke-width="1.2"
                />
              </pattern>
              <clipPath :id="damClipId">
                <polygon :points="damPolygonPoints" />
              </clipPath>
            </defs>
            <polygon :points="damPolygonPoints" fill="#273846" />
            <rect
              x="-80"
              y="-80"
              width="280"
              height="460"
              :fill="damPatternFillUrl"
              :clip-path="damClipUrl"
            />
            <polygon
              :points="damPolygonPoints"
              fill="none"
              stroke="#58b8c1"
              stroke-width="8"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
      <aside class="water-level-scale" :style="{ height: `${scaleHeightPx}px` }" aria-label="水位刻度">
        <div class="water-level-scale__track">
          <div class="water-level-scale__vline" aria-hidden="true" />
          <span
            v-for="j in segmentDividerIndexes"
            :key="`seg-${j}`"
            class="water-level-scale__segment-divider"
            :style="{ bottom: segmentDividerBottomPercent(j) }"
          />
          <span
            v-for="k in midTickIndexes"
            :key="`mid-${k}`"
            class="water-level-scale__mid-tick"
            :style="{ bottom: midTickBottomPercent(k) }"
          />
        </div>
      </aside>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const damUid =
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID().replace(/-/g, '')
    : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

const damPatternId = `flood-dam-hatch-${damUid}`
const damClipId = `flood-dam-clip-${damUid}`

/** viewBox 0 0 120 300：上窄下宽梯形 */
const damPolygonPoints = '34,14 86,14 114,295 6,295'

const damPatternFillUrl = `url(#${damPatternId})`
const damClipUrl = `url(#${damClipId})`

const warningStatusText = ref('正常')
const currentWaterLevel = ref('0')
const ruleWaterLevel = ref('56.01')
const monitorTime = ref('')
const currentWaterLevelPercent = ref(30)
const ruleWaterLevelPercent = ref(50)

const props = withDefaults(
  defineProps<{
    /** 右侧水面右上角数值（不含单位 m） */
    guaranteedLevelDisplay?: string
    /** 左侧水面高度占画布高度的百分比（0–100） */
    shortPaneHeightPercent?: number
    /** 右侧水面高度占画布高度的百分比（0–100） */
    tallPaneHeightPercent?: number
    /** 主刻度线数量（含顶、底） */
    tickCount?: number
    /** 刻度区域高度（像素） */
    scaleHeightPx?: number
  }>(),
  {
    guaranteedLevelDisplay: '56.01',
    shortPaneHeightPercent: 30,
    tallPaneHeightPercent: 50,
    tickCount: 9,
    scaleHeightPx: 280
  }
)

function clampPaneHeightPercent (value: number): number {
  if (!Number.isFinite(value)) {
    return 0
  }
  return Math.min(100, Math.max(0, value))
}

const shortPaneHeightStyle = computed(() => ({
  height: `${clampPaneHeightPercent(currentWaterLevelPercent.value)}%`
}))

const tallPaneHeightStyle = computed(() => ({
  height: `${clampPaneHeightPercent(ruleWaterLevelPercent.value)}%`
}))

function calcCurrentWaterLevelPercent (currentLevel: number, ruleLevel: number): number {
  if (!Number.isFinite(currentLevel) || !Number.isFinite(ruleLevel) || ruleLevel <= 0) {
    return props.shortPaneHeightPercent
  }
  return clampPaneHeightPercent((currentLevel / ruleLevel) * ruleWaterLevelPercent.value)
}

/** 9 块之间的分界：1 … n-1（自下而上第 j/n 处） */
const segmentDividerIndexes = computed(() =>
  Array.from({ length: Math.max(0, props.tickCount - 1) }, (_, index) => index + 1)
)

/** 每块中点：k = 0 … n-1，自下 (k+0.5)/n */
const midTickIndexes = computed(() =>
  Array.from({ length: props.tickCount }, (_, index) => index)
)

function segmentDividerBottomPercent (j: number): string {
  const n = props.tickCount
  if (n <= 0) {
    return '0%'
  }
  return `${(j / n) * 100}%`
}

function midTickBottomPercent (k: number): string {
  const n = props.tickCount
  if (n <= 0) {
    return '0%'
  }
  return `${((k + 0.5) / n) * 100}%`
}

usePolling(async () => {
  const result: any = await service.xfqs.getRsvrWarnInfo({})

  warningStatusText.value = result?.msg || '正常'
  currentWaterLevel.value = result?.currntZ || '0'
  ruleWaterLevel.value = result?.ruleZ || props.guaranteedLevelDisplay
  monitorTime.value = result?.tm || ''

  const currentLevel = Number(result?.currntZ)
  const ruleLevel = Number(result?.ruleZ)
  ruleWaterLevelPercent.value = props.tallPaneHeightPercent
  currentWaterLevelPercent.value = calcCurrentWaterLevelPercent(currentLevel, ruleLevel)
})
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
      width: 58px;
      height: 58px;
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

      span {
        color: #50FFFC;
        font-size: 32px;
        line-height: 38px;
        font-weight: 700;
        font-family: Quantico, DINAlternateBold, sans-serif;
        text-shadow: 0 0 5px #56ebff;
      }
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

.visualization-container {
  --viz-scale-gap: 24px;
  --viz-scale-track-width: 40px;

  display: flex;
  align-items: stretch;
  gap: var(--viz-scale-gap);
  width: 750px;
  margin: 0 auto;
  padding: 0 38px 46px;
  box-sizing: border-box;
  overflow: visible;
}

.visualization-canvas {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex: 1;
  min-width: 0;
  min-height: 200px;
  overflow: visible;
}

.visualization-canvas__dam {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  height: 100%;
  width: auto;
  aspect-ratio: 120 / 300;
  transform: translateX(-50%);
  pointer-events: none;
}

.visualization-canvas__dam-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.visualization-canvas__pane {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
  background: rgb(66 180 214 / 0.43) url('@/assets/flood-advance-page-left-card2-tall-bg.png');
  background-size: cover;
}

.visualization-canvas__pane-tall-overlay {
  position: absolute;
  z-index: 4;
  bottom: 100%;
  left: 0;

  /* 与保证水位虚线同宽，向右延伸至刻度区 */
  right: calc(-1 * (var(--viz-scale-gap) + var(--viz-scale-track-width) + 90px));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  pointer-events: none;
}

.visualization-canvas__pane-tall-value {
  position: absolute;
  bottom: 100%;
  right: 0;
  display: flex;
  align-items: baseline;
  margin-right: 2px;
  white-space: nowrap;
  line-height: 24px;
}

.visualization-canvas__pane-tall-value-num {
  color: #50fffc;
  font-size: 28px;
  font-weight: 700;
  font-family: Quantico, DINAlternateBold, sans-serif;
  text-shadow: 0 0 5px #56ebff;
}

.visualization-canvas__pane-tall-value-unit {
  margin-left: 2px;
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  font-family: Quantico, DINAlternateBold, sans-serif;
  text-shadow: 0 0 5px #56ebff;
}

/* 水面顶线：虚线 + 溢出端箭头 */
.pane-waterline {
  pointer-events: none;
}

.pane-waterline--overflow-left {
  position: absolute;
  z-index: 3;
  top: 0;
  left: -44px;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 0;
}

.pane-waterline--overflow-left .pane-waterline__dash {
  flex: 1;
  min-width: 0;
  height: 0;
  border-top: 1px dashed rgb(255 255 255 / 0.92);
  box-shadow: 0 0 6px rgb(255 255 255 / 0.25);
}

.pane-waterline--overflow-right {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}

.pane-waterline__stack {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  width: 100%;
}

.pane-waterline__label {
  margin-right: 2px;
  color: #fff;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  white-space: nowrap;
  text-shadow: 0 0 6px rgb(0 0 0 / 0.35);
}

.pane-waterline__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 0;
}

.pane-waterline--overflow-right .pane-waterline__dash {
  flex: 1;
  min-width: 0;
  height: 0;
  border-top: 1px dashed rgb(255 255 255 / 0.92);
  box-shadow: 0 0 6px rgb(255 255 255 / 0.25);
}

.pane-waterline__arrow {
  flex-shrink: 0;
  width: 0;
  height: 0;
  border-style: solid;
}

.pane-waterline__arrow--west {
  margin-right: 4px;
  border-width: 5px 7px 5px 0;
  border-color: transparent rgb(255 255 255 / 0.95) transparent transparent;
  filter: drop-shadow(0 0 4px rgb(255 255 255 / 0.35));
}

.pane-waterline__arrow--east {
  margin-left: 4px;
  border-width: 5px 0 5px 7px;
  border-color: transparent transparent transparent rgb(255 255 255 / 0.95);
  filter: drop-shadow(0 0 4px rgb(255 255 255 / 0.35));
}

.water-level-scale {
  --water-level-scale-track-width: var(--viz-scale-track-width, 40px);

  position: relative;
  z-index: 0;
  flex-shrink: 0;
  width: 168px;
  box-sizing: border-box;
}

.water-level-scale__track {
  position: absolute;
  inset: 0 auto 0 0;
  width: var(--water-level-scale-track-width);
  border-radius: 4px;
  overflow: hidden;
  background: linear-gradient(180deg,
      rgb(100 177 194 / 0.41) 0%,
      rgb(51 124 140 / 0.65) 100%);
  pointer-events: none;
}

.water-level-scale__vline {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
  background: #87ffff;
}

.water-level-scale__segment-divider {
  position: absolute;
  z-index: 0;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(50%);
  background: linear-gradient(90deg,
      rgb(80 187 187 / 0) 0%,
      #8affff 51.44%,
      rgb(81 153 153 / 0.04) 100%);
}

.water-level-scale__mid-tick {
  position: absolute;
  z-index: 1;
  left: 50%;
  width: 50%;
  height: 1px;
  transform: translate(-50%, 50%);
  background: #87ffff;
}

</style>
