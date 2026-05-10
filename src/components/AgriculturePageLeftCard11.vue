<template>
  <PageCard title="农情监测" bg-class="left">
    <div class="page-container">
      <div class="crop-layout">
        <div class="crop-chart">
          <VueEcharts :option="echartOption" />
        </div>

        <div class="crop-list">
          <div
            v-for="item in cropList"
            :key="item.name"
            class="crop-list__item"
            :style="{ color: item.color }"
          >
            <div class="crop-list__name-row">
              <span
                class="crop-list__dot"
                :style="{ background: item.color, boxShadow: `0 0 10px ${item.color}` }"
              />
              <span class="crop-list__name">{{ item.name }}</span>
            </div>
            <div class="crop-list__value-group">
              <span class="crop-list__value">{{ item.area }}</span>
              <span class="crop-list__unit">亩</span>
            </div>
            <div class="crop-list__percent">
              {{ item.percent }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
interface CropItem {
  name: string
  area: number
  percent: number
  color: string
}

const cropColors = ['#FFB35B', '#B8D6FF', '#67CCFF', '#FFD97A', '#91FF6E', '#FFE92F']

const cropList = ref<CropItem[]>([
  { name: '水稻', area: 2000, percent: 21, color: '#FFB35B' },
  { name: '中稻', area: 2000, percent: 36, color: '#B8D6FF' },
  { name: '晚稻', area: 2000, percent: 18, color: '#67CCFF' },
  { name: '玉米', area: 900, percent: 25, color: '#FFD97A' },
  { name: '油菜', area: 1100, percent: 18, color: '#91FF6E' },
  { name: '小麦', area: 1000, percent: 25, color: '#FFE92F' }
])

const activeCropName = ref('晚稻')

const activeCrop = computed(() => {
  return cropList.value.find(item => item.name === activeCropName.value) || cropList.value[2]
})

const echartOption = computed(() => {
  const chartCenter = ['44%', '50%']
  const radiusGroup = [
    ['68%', '79%'],
    ['53%', '64%'],
    ['38%', '49%']
  ] as const

  const cropSeries = cropList.value.map((item, index) => {
    const radius = radiusGroup[Math.floor(index / 2)] || radiusGroup[radiusGroup.length - 1]
    return {
      name: item.name,
      type: 'pie',
      radius,
      center: chartCenter,
      clockwise: true,
      silent: true,
      startAngle: index % 2 === 0 ? 92 : 268,
      z: 3,
      label: { show: false },
      itemStyle: {
        borderColor: 'rgba(14, 36, 57, 1)',
        borderWidth: 6
      },
      data: [
        {
          value: item.percent,
          itemStyle: {
            color: item.color,
            borderRadius: 5
          }
        },
        {
          value: 3,
          itemStyle: {
            color: 'transparent',
            borderColor: 'transparent'
          }
        },
        {
          value: Math.max(0, 97 - item.percent),
          itemStyle: {
            color: 'rgba(180, 164, 109, 0.72)',
            borderRadius: 5
          }
        }
      ]
    }
  })

  const decorateSeries = [
    {
      name: 'outer-ring-1',
      type: 'pie',
      radius: ['81%', '82%'],
      center: chartCenter,
      silent: true,
      startAngle: 120,
      z: 1,
      label: { show: false },
      data: [
        { value: 68, itemStyle: { color: '#1F9CFF' } },
        { value: 32, itemStyle: { color: 'transparent' } }
      ]
    },
    {
      name: 'outer-ring-2',
      type: 'pie',
      radius: ['86%', '87%'],
      center: chartCenter,
      silent: true,
      startAngle: 180,
      z: 0,
      label: { show: false },
      data: [
        { value: 84, itemStyle: { color: 'rgba(63, 132, 219, 0.48)' } },
        { value: 16, itemStyle: { color: 'transparent' } }
      ]
    }
  ]

  return {
    animation: false,
    title: [
      {
        text: activeCrop.value.name,
        left: '44%',
        top: '42%',
        textAlign: 'center',
        textStyle: {
          color: '#FFFFFF',
          fontSize: 28,
          fontWeight: 'bold',
          fontFamily: 'PingFangSC, sans-serif'
        }
      },
      {
        text: String(activeCrop.value.area),
        left: '44%',
        top: '53%',
        textAlign: 'center',
        textStyle: {
          color: '#50FFFC',
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'Quantico, sans-serif',
          textShadowColor: 'rgba(80,255,252,0.35)',
          textShadowBlur: 12
        }
      }
    ],
    series: [...decorateSeries, ...cropSeries]
  }
})

usePolling(async () => {
  const result: any = await service.xfqs.getCurrentDateCropArea({})
  const sourceList = Array.isArray(result)
    ? result
    : Array.isArray(result?.list)
      ? result.list
      : Array.isArray(result?.data)
        ? result.data
        : result && typeof result === 'object'
          ? Object.values(result)
          : []
  if (sourceList.length === 0) return

  const nextCropList = sourceList
    .map((item: Record<string, any>, index: number) => {
      const name = item.cropName || item.name || item.cropsName || item.zwmc || item.crop || `作物${index + 1}`
      const area = Number(item.area ?? item.value ?? item.mj ?? item.cropArea ?? item.zdmj ?? 0)
      const rate = Number(item.rate ?? item.percent ?? item.ratio)
      return {
        name,
        area,
        percent: Number.isFinite(rate) ? rate : 0,
        color: cropColors[index % cropColors.length]
      }
    })
    .filter((item: CropItem) => item.area > 0)
    .slice(0, 6)

  const totalArea = nextCropList.reduce((sum: number, item: CropItem) => sum + item.area, 0)
  if (totalArea <= 0) return

  cropList.value = nextCropList.map((item: CropItem) => ({
    ...item,
    percent: item.percent > 0 ? item.percent : Number(((item.area / totalArea) * 100).toFixed(1))
  }))

  activeCropName.value = cropList.value.reduce((maxItem, item) => item.area > maxItem.area ? item : maxItem, cropList.value[0]).name
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 32px 34px 20px;
}

.crop-layout {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  min-height: 430px;
}

.crop-chart {
  height: 430px;
}

.crop-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.crop-list__item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  min-height: 58px;
  padding: 0 18px;
  border-radius: 14px;
  background: linear-gradient(90deg, rgb(53 91 124 / 0.82) 0%, rgb(61 103 136 / 0.62) 100%);
  backdrop-filter: blur(2px);
}

.crop-list__name-row {
  display: flex;
  align-items: center;
}

.crop-list__dot {
  width: 16px;
  height: 16px;
  margin-right: 18px;
  border-radius: 50%;
  flex-shrink: 0;
}

.crop-list__name {
  color: #fff;
  font-size: 24px;
  font-family: PingFangSC, sans-serif;
}

.crop-list__value-group {
  margin-right: 24px;
  white-space: nowrap;
}

.crop-list__value {
  color: inherit;
  font-size: 24px;
  font-family: Quantico, sans-serif;
}

.crop-list__unit,
.crop-list__percent {
  color: #fff;
  font-size: 20px;
  font-family: PingFangSC, sans-serif;
}

.crop-list__unit {
  margin-left: 6px;
}

.crop-list__percent {
  width: 56px;
  text-align: right;
}

.crop-list__item:nth-child(1) {
  color: #FFB35B;
}

.crop-list__item:nth-child(2) {
  color: #B8D6FF;
}

.crop-list__item:nth-child(3) {
  color: #67CCFF;
}

.crop-list__item:nth-child(4) {
  color: #FFD97A;
}

.crop-list__item:nth-child(5) {
  color: #91FF6E;
}

.crop-list__item:nth-child(6) {
  color: #FFE92F;
}
</style>
