<template>
  <PageCard title="洪水预报" bg-class="left">
    <div class="page-container">
      <div class="h-[625px]">
        <PageTable :thead-col="theadCol" :data-list="dataList" :limit-scroll="5">
          <template #type="scope">
            <div class="text-center">
              <ZfTweenNumber :value="Number(scope.row.type)" />
            </div>
          </template>
          <template #status="scope">
            <div class="text-center">
              <ZfTweenNumber :value="Number(scope.row.status)" />
            </div>
          </template>
        </PageTable>
      </div>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const theadCol = ref([
  {
    key: 'index',
    name: '序号',
    width: 100
  },
  {
    key: 'code',
    name: '预报分区',
    width: 150
  },
  {
    key: 'type',
    name: '已降雨量（mm)'
  },
  {
    key: 'status',
    name: '预报降雨量（mm)'
  }
])

const dataList = ref<{[key:string]: any}[]>([])

usePolling(async () => {
  dataList.value = Array.from({ length: 20 }).map((_, index) => ({
    index: index + 1,
    code: '熊渡水库' + (index + 1),
    type: `${Math.floor(Math.random() * 1000)}`,
    status: `${Math.floor(Math.random() * 1000)}`
  }))
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 35px 40px;
}

.reservoir-item {
  display: flex;
  align-items: center;
  font-family: PingFangSC, sans-serif;

  .reservoir-item__label {
    font-size: 30px;
  }

  .reservoir-item__value {
    font-family: Quantico, sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #50fffc;
  }

  .reservoir-item__unit {
    font-size: 24px;
    color: #beeeff;
  }
}

.app-select {
  width: 496px;

  &:deep(.el-select__wrapper.is-focused) {
    .el-input__inner {
      color: #fff;
    }
  }

  &:deep(.el-popper) {
    background: rgb(14 47 66 / 0.6);
    border: none;
    top: 70px !important;
    left: 0 !important;

    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      height: 60px;
      color: #81E6FF;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      line-height: 60px;

      &.is-hovering {
        background: rgb(92 133 255 / 0.51);
      }
    }
  }

  &:deep(.el-select__wrapper) {
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    &:hover,
    &:active {
      box-shadow: none !important;
    }

    .el-select__selection {
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      font-family: PingFangSC, sans-serif;
      letter-spacing: 5px;

      .el-select__placeholder {
        color: #81E6FF;
      }
    }

    .el-select__suffix {
      display: flex;
      align-items: center;

      .el-select__icon {
        width: 30px;
        height: 30px;
        background: url('@/assets/global/images/flood/guide-triangle.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}

.app-input {
  &:deep(.el-input__wrapper) {
    height: 65px;
    font-size: 28px;
    background: rgb(14 47 66 / 0.6);
    border: 1px solid #4896C6;
    box-shadow: none;

    .el-input__inner {
      color: #4BDBFF;
    }
  }
}

.app-button {
  background: rgb(14 47 66 / 0.6);
  border: 1px solid #4896C6;
  color: #81E6FF;
  font-size: 30px;
  font-family: PingFangSC, sans-serif;
  height: 65px;
  padding: 0 30px;

  &:hover {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

   &:active {
    background: rgb(92 133 255 / 0.51);
    border-color: #4896C6;
    color: #81E6FF;
    box-shadow: none !important;
   }

}

:deep(.el-table) {
  /* 透明度为0，不显示背景色 */
  background-color: rgb(255 240 240 / 0);
}

.files-table {
  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }

    tr {
      background: transparent;
    }

    .el-table__header-wrapper {
      th.el-table__cell {
        background: rgb(19 96 160 / 0.46);
        cursor: pointer;
        margin-bottom: 4px;
        border-bottom: none;
        color: #fff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;

        // border: 1px solid #527191;
      }
    }

    .el-table__body {
      border-spacing: 0 4px;

      tr {
        background: transparent;

        &:hover {
          background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
        }
      }
    }

    .el-table__body-wrapper {
      margin-top: 4px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.2);
        cursor: pointer;
        margin-bottom: 4px;
        color: #81E6FF;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
        border: 1px solid #527191;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .cell {
      height: 80px;
      line-height: 80px;
    }

  }
}
</style>
