<template>
  <div class="table-container">
    <div v-if="props.searchVisible" class="table-search">
      <input v-model="searchValue" class="table-search__input" type="text" placeholder="请输入物资类型">
      <span class="table-search__icon" @click="searchList">
        <img src="./assets/search-icon.png">
      </span>
    </div>
    <div v-if="showHead" class="table-header">
      <div class="table-header__tr">
        <div v-if="props.index" class="w-[110px] text-center">
          <slot name="header-index">
            <!-- 序号 -->
          </slot>
        </div>
        <div
          v-for="(colItem, theadIndex) in props.theadCol"
          :key="theadIndex"
          class="table-header__th"
          :style="{ width: `${colItem.width}px`, flex: colItem.width ? `0 0 ${colItem.width}px` : '1', 'text-align': colItem.align ? colItem.align : 'left' }"
        >
          <slot :name="`header-${colItem.key}`" :column="colItem" :index="theadIndex">
            {{ colItem.name }}
          </slot>
        </div>
      </div>
    </div>
    <div ref="tableBodyScroll" class="table-body" @mouseout="mouseout" @mouseover="mouseover">
      <div v-for="(rowItem, rowIndex) in props.dataList" :key="rowIndex" class="table-body__tr">
        <div v-if="props.index" class="table-body__th flex items-center justify-center w-[110px]">
          <slot name="index" :row="rowItem" :index="rowIndex + 1">
            {{ rowIndex + 1 }}
          </slot>
        </div>
        <div v-for="(colItem, colIndex) in props.theadCol" :key="colIndex" class="table-body__th" :style="{'width': `${colItem.width}px`, 'flex': colItem.width ? `0 0 ${colItem.width}px` : '1', 'text-align': colItem.align ? colItem.align : 'left'}">
          <slot :name="colItem.key" :row="rowItem">
            {{ rowItem[colItem.key] }}
          </slot>
        </div>
      </div>
      <template v-if="props.limitScroll && props.dataList.length < props.limitScroll">
        <div v-for="i in (props.limitScroll - props.dataList.length)" :key="i" class="table-body__tr">
          <div v-if="props.index" class="table-body__th flex items-center justify-center w-[110px]" />
          <div v-for="(colItem, colIndex) in props.theadCol" :key="colIndex" class="table-body__th" :style="{'width': `${colItem.width}px`, 'flex': colItem.width ? `0 0 ${colItem.width}px` : '1', 'text-align': colItem.align ? colItem.align : 'left'}" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  theadCol: {[key: string]:any}[],
  dataList: {[key: string]:any}[],
  searchVisible?: boolean,
  showHead?: boolean,
  limitScroll?: number,
  index?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  theadCol: () => [],
  dataList: () => [],
  showHead: true,
  searchVisible: false,
  limitScroll: undefined,
  index: false
})

type Emits = {
  (name: 'searchList', value:string):void
}
const emit = defineEmits<Emits>()

let intervalValue = reactive({} as any)
// 鼠标经过
const mouseover = () => {
  clearInterval(intervalValue)
}
// 鼠标离开
const mouseout = () => {
  autoScroll(false)
}

const tableBodyScroll = ref<HTMLDivElement | null>(null)
// 自动滚动
const autoScroll = (status: boolean) => {
  if (!props.limitScroll) return
  nextTick(() => {
    if (!props.limitScroll) return
    if (!tableBodyScroll.value) return
    if (props.dataList.length > props.limitScroll) {
      const time = 50
      if (status) {
        tableBodyScroll.value.scrollTop = 0
      }
      if (intervalValue) {
        clearInterval(intervalValue)
      }
      intervalValue = setInterval(rollStart, time)
    }
  })
}

// 定时滚动条控制
const rollStart = () => {
  if (tableBodyScroll.value) {
    if (tableBodyScroll.value.scrollTop >= (tableBodyScroll.value.scrollHeight - tableBodyScroll.value.offsetHeight)) {
      tableBodyScroll.value.scrollTop = 0
    } else {
      tableBodyScroll.value.scrollTop++
    }
  }
}

watch(() => props.dataList?.length, () => {
  clearInterval(intervalValue)
  if (tableBodyScroll.value) {
    tableBodyScroll.value.scrollTop = 0
  }
  autoScroll(false)
}, { immediate: true })

onUnmounted(() => {
  clearInterval(intervalValue)
})

// 列表查询事件
const searchValue = ref('')
const searchList = () => {
  emit('searchList', searchValue.value)
  if (tableBodyScroll.value) {
    tableBodyScroll.value.scrollTop = 0
  }
}

</script>

<style lang="scss" scoped>
.table-container {
  height: 100%;
  font-family: PIngFangSC, sans-serif;
  font-size: 30px;
}

.table-header {
  &__tr {
    display: flex;
    color: #fff;
    line-height: 79px;
    padding: 0 17px;
    background: rgb(19 96 160 / 0.46);
    margin-bottom: 4px;
  }
}

.table-body {
  height: calc(100% - 83px);
  overflow-y: auto;

  &__tr {
    display: flex;
    line-height: 80px;
    padding: 0 17px;
    cursor: pointer;
    background: rgb(19 79 135 / 0.2);
    border: 1px solid #527191;
    margin-bottom: 4px;
    color: #81E6FF;

    &:hover {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
    }
  }

  &__th {
    height: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
