<template>
  <PageCard title="队伍保障" bg-class="left">
    <div class="team-support">
      <div class="top-divider" />

      <div
        v-for="item in teamRows"
        :key="item.label"
        class="team-row"
        :class="{ 'team-row--multi': item.values.length > 1 }"
      >
        <div class="row-icon">
          <div class="row-icon__inner">
            <div class="row-icon__bookmark" />
          </div>
        </div>

        <div class="row-panel">
          <p class="row-line">
            <span class="row-label">{{ item.label }}：</span>
            <span class="row-value">{{ item.values[0] }}</span>
          </p>
          <p v-for="(line, index) in item.values.slice(1)" :key="index" class="row-line row-line--extra">
            <span class="row-value">{{ line }}</span>
          </p>
        </div>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
interface TeamRow {
  label: string
  values: string[]
}

const teamRows = ref<TeamRow[]>([
  {
    label: '负责单位',
    values: ['-']
  },
  {
    label: '组成人员',
    values: ['-']
  },
  {
    label: '职能',
    values: ['-']
  },
  {
    label: '联系电话',
    values: ['-']
  }
])

const getResultList = (result: any) => {
  if (Array.isArray(result)) return result
  if (Array.isArray(result?.list)) return result.list
  if (Array.isArray(result?.detail)) return result.detail
  if (Array.isArray(result?.detail?.list)) return result.detail.list
  return []
}

const getNotEmptyValueList = (list: Record<string, any>[], key: string) => {
  const valueList = list.map(item => item[key]).filter(Boolean).map(String)
  return valueList.length ? Array.from(new Set(valueList)) : ['-']
}

const formatMemberList = (list: Record<string, any>[]) => {
  const valueList = list.map((item) => {
    const name = item.userName || '-'
    const positionName = item.positionName ? `（${item.positionName}）` : ''
    return `${name}${positionName}`
  })
  return valueList.length ? valueList : ['-']
}

const updateTeamRows = (list: Record<string, any>[]) => {
  teamRows.value = [
    {
      label: '负责单位',
      values: getNotEmptyValueList(list, 'deptName')
    },
    {
      label: '组成人员',
      values: formatMemberList(list)
    },
    {
      label: '职能',
      values: getNotEmptyValueList(list, 'workName')
    },
    {
      label: '联系电话',
      values: getNotEmptyValueList(list, 'phone')
    }
  ]
}

usePolling(async () => {
  const result: any = await service.xfqs.queryMaterialManagerList({
    pageNum: 1,
    pageSize: 20
  })
  console.log('队伍保障责任人列表:', result)
  updateTeamRows(getResultList(result))
})
</script>

<style lang="scss" scoped>
.team-support {
  padding: 30px 40px 35px;
}

.top-divider {
  position: relative;
  height: 3px;
  margin: 0 -40px 48px;
  background: linear-gradient(90deg,
      rgb(88 199 255 / 0.7) 0%,
      rgb(88 199 255 / 0.08) 100%);
  box-shadow: 0 0 20px rgb(51 165 241 / 0.45);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -2px;
    width: 34px;
    height: 5px;
    background: #33a5f1;
  }
}

.team-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.row-icon {
  width: 70px;
  height: 70px;
  padding: 6px;
  border: 1px solid #2987bb;
  background: linear-gradient(180deg,
      rgb(20 87 130 / 0.88),
      rgb(9 56 88 / 0.88));
  box-sizing: border-box;
  flex-shrink: 0;
}

.row-icon__inner {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(142 198 233 / 0.8);
  background: radial-gradient(circle at 90% 12%,
      rgb(85 164 203 / 0.55),
      rgb(8 63 98 / 0.8) 38%,
      rgb(3 29 51 / 0.85) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.row-icon__bookmark {
  width: 24px;
  height: 31px;
  background: #d8f4ff;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    transform: translateX(-50%);
    background: #6fa7be;
  }
}

.row-panel {
  flex: 1;
  min-height: 70px;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  background: linear-gradient(90deg,
      rgb(33 87 135 / 0.9) 0%,
      rgb(2 62 112 / 0) 100%);
}

.row-line {
  margin: 0;
  line-height: 1.45;
  font-size: 28px;
  color: #fff;
  font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
  font-weight: 400;
  letter-spacing: 0.4px;
}

.row-label {
  display: inline-block;
  min-width: 140px;
}

.row-value {
  display: inline-block;
}

.team-row--multi {
  .row-icon {
    margin-top: 7px;
  }

  .row-panel {
    min-height: 215px;
    justify-content: flex-start;
    padding-top: 10px;
  }

  .row-line {
    line-height: 56px;
  }

  .row-line--extra {
    padding-left: 140px;
  }
}
</style>
