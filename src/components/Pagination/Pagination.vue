<template>
  <ElPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    class="app-pagination"
    :total="total"
    layout="prev, pager, next, slot"
  >
    <div class="h-[41px] mx-[5px]">
      <ElSelect
        v-model="pageSize"
        class="app-select w-[190px]"
        :teleported="false"
        placeholder="请选择"
        size="large"
      >
        <ElOption
          v-for="item in pageSizeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <div class="flex height-[41px]">
      <span class="text-white ml-[10px] mr-[20px]" style=" height: 41px;font-size: 18px">前往</span>
      <ElInput v-model.number="currentPage" class="app-input" style="width: 82px" />
      <span class="text-white ml-[10px]" style=" height: 41px;font-size: 18px">页</span>
    </div>
  </ElPagination>
</template>

<script setup lang="ts">

const props = defineProps<{
  currentPage: number
  pageSize: number
  total: number
}>()

type Emit = {
  (e: 'size-change', pageSize: number): void
  (e: 'current-change', currentPage: number): void
}
const emit = defineEmits<Emit>()

const currentPage = ref(props.currentPage || 0)
const pageSize = ref(props.pageSize || 0)
const total = computed(() => props.total || 0)

watch(
  () => props.currentPage,
  (val) => {
    currentPage.value = val
  }
)

watch(
  () => props.pageSize,
  (val) => {
    pageSize.value = val
  }
)

watch(currentPage, (val) => {
  emit('current-change', val)
})

watch(pageSize, (val) => {
  emit('size-change', val)
})

const pageSizeList = reactive([
  { value: 10, label: '10条/页' },
  { value: 20, label: '20条/页' },
  { value: 30, label: '30条/页' },
  { value: 40, label: '40条/页' }
])
</script>

<style lang="scss" scoped>
.app-pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(.el-pager) {
    color: #4d88ff;

    li {
      width: 41px;
      height: 41px;
      margin: 0 10px;
      font-size: 18px;
      line-height: 41px;
      text-align: center;
      background: rgb(168 197 249 / 0.2);
      cursor: pointer;

      &:hover {
        color: #fff;
        background: rgb(92 133 255 / 1);
      }

      &.is-active {
        color: #fff;
        background: rgb(92 133 255 / 1);

      }

      svg {
        color: #4d88ff;
      }
    }
  }

  :deep(.btn-next),
  :deep(.btn-next:disabled),
  :deep(.btn-prev:disabled),
  :deep(.btn-prev) {
    width: 41px;
    height: 41px;
    margin: 0 10px;
    font-size: 18px;
    background: rgb(168 197 249 / 0.2);

    :hover,
    :active {
      color: #fff;
      background-color: rgb(92 133 255 / 1);
    }

    .el-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 41px;
      height: 41px;
      color: #5c85ff;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  :deep(.el-select .el-input) {
    width: 100%;
  }
}

.app-select {
  &:deep(.el-select__wrapper.is-focused) {
    background: url('@/assets/floor/preview/guide-hover.svg') no-repeat;
    background-size: 100%;
    box-shadow: none !important;

    .el-input__inner {
      color: #fff;
    }
  }

  &:deep(.el-popper) {
    top: 70px !important;
    left: 0 !important;
    background: #3e4d68;
    border: none;

    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      height: 60px;
      color: #fff;
      font-weight: 400;
      font-size: 24px;
      font-family: OPPOSans-R, sans-serif;
      line-height: 60px;
      text-align: center;

      // &.is-selected,
      &.is-hovering {
        background: rgb(92 133 255 / 0.51);
      }
    }
  }

  &:deep(.el-select__wrapper) {
    padding: 0 15px 0 0;
    background: #3e4d68;
    border: none;
    box-shadow: none;

    &:hover,
    &:active {
      box-shadow: none !important;
    }

    .el-select__selection {
      height: 60px;
      font-weight: bold;
      font-size: 24px;
      font-family: OPPOSans-B, sans-serif;
      letter-spacing: 5px;
      text-align: center;

      .el-select__placeholder {
        color: #a8c5f9;
      }
    }

    .el-select__suffix {
      display: flex;
      align-items: center;

      .el-select__icon {
        width: 20px;
        height: 20px;
        background: url('@/assets/floor/preview/guide-triangle.svg') no-repeat;
        background-size: 100%;
      }
    }
  }
}

.app-input {
  &:deep(.el-input__wrapper) {
    height: 41px;
    font-size: 18px;
    background: rgb(168 197 249 / 0.2);
    box-shadow: none;

    .el-input__inner {
      color: #4d88ff;
    }
  }
}
</style>
