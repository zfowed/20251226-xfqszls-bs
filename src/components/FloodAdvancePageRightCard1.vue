<template>
  <PageCard title="预警规则配置" bg-class="right">
    <div class="page-container">
      <div class="flex items-center mb-[43px]">
        <ElInput v-model.number="filterValue" :suffix-icon="Search" class="app-input flex-1 mr-[20px]" />
        <ElSelect
          v-model="filterWaterValue"
          placeholder="请选择"
          :teleported="false"
          class="app-select flex-1"
        >
          <ElOption
            v-for="item in optionsList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>

      <ElTable :data="dataList" class="files-table" height="1950px">
        <ElTableColumn prop="name" label="测站名称" />
        <ElTableColumn prop="value" label="预警阀值" />
        <ElTableColumn prop="fileName" label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.status" class="app-switch" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="200">
          <template #default>
            <div class="flex items-center">
              <div>
                <img class="mr-[20px]" src="@/assets/global/images/drop.png">
              </div>
              <el-popconfirm
                class="box-item"
                title="是否确认删除？"
                placement="top-start"
                effect="dark"
                confirm-button-text="确定"
                cancel-button-text="取消"
              >
                <template #reference>
                  <div>
                    <img src="@/assets/global/images/del.png">
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const filterValue = ref<string | number>('')

const filterWaterValue = ref('2026')
const optionsList = [
  { value: '2026', label: '测站类型1' },
  { value: '2025', label: '测站类型2' }
]

const dataList = ref<{ [key: string]: any }[]>([])
usePolling(async () => {
  dataList.value = [{
    name: '站点1',
    value: '>1.00m',
    status: true
  }, {
    name: '站点2',
    value: '>1.00m',
    status: false
  }, {
    name: '站点3',
    value: '>1.00m',
    status: true
  }, {
    name: '站点4',
    value: '>1.00m',
    status: false
  }]
})

// async function delFileHandle (file: any) {
//   const result: any = await service.xfqs.delFloodPlanFile({
//     id: file.id
//   })
//   notify.success({ title: '删除预案调令', message: result?.content })
// }
</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 16px;
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

    .el-input__inner,
    .el-input__suffix-inner {
      color: #4BDBFF;
    }
  }
}

.app-switch {
  &:deep(.el-switch__core) {
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background: #56667C;
    border: none;

    .el-switch__button {
      width: 21px;
      height: 21px;
      box-shadow: 0 2px 4px rgb(0 0 0 / 0.2);
    }
  }
}

:deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  background: #5CDEFF;
}
</style>
