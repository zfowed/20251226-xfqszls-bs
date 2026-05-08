<template>
  <PageCard title="防汛物资" bg-class="right">
    <div class="page-container">
      <ElTable :data="dataList" class="files-table" height="510px">
        <ElTableColumn label="" width="90" :align="'center'">
          <template #default="scope">
            <div class="table-index mt-[10px]">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="materialName" label="物资名称" />
        <ElTableColumn prop="number" label="数量" width="210" />
        <ElTableColumn prop="orgName" label="所属部门" />
      </ElTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type MaterialItem = {
  materialName: string
  number: string | number
  orgName: string
}

const fallbackList: MaterialItem[] = [
  { materialName: '编织袋', number: '4542', orgName: 'XXX管理所' },
  { materialName: '编织袋', number: '33565', orgName: 'XXX管理所' },
  { materialName: '编织袋', number: '6252', orgName: 'XXX管理所' },
  { materialName: '编织袋', number: '155', orgName: 'XXX管理所' },
  { materialName: '编织袋', number: '4600', orgName: 'XXX管理所' }
]

const dataList = ref<MaterialItem[]>([])

usePolling(async () => {
  const result: any = await service.xfqs.queryMaterialList({
    pageNum: 1,
    pageSize: 1000
  })
  if (Array.isArray(result) && result.length > 0) {
    dataList.value = result.slice(0, 5).map((item: any) => ({
      materialName: item.materialName,
      number: item.number,
      orgName: item.orgName
    }))
    return
  }
  dataList.value = fallbackList
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 36px 30px 0;
}

.table-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 59.61px;
  line-height: 59.61px;
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  background: url("@/components/PageTable/assets/index-bg.png") no-repeat;
  background-size: 100% 100%;
}

:deep(.el-table) {
  background-color: transparent;
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
        border-bottom: none;
        color: #fff;
        font-family: PIngFangSC, sans-serif;
        font-size: 30px;
      }
    }

    .el-table__body {
      border-spacing: 0 4px;
    }

    .el-table__body-wrapper {
      margin-top: 4px;

      td.el-table__cell {
        background: rgb(19 79 135 / 0.2);
        color: #81E6FF;
        font-family: PIngFangSC, sans-serif;
        font-size: 26px;
        border: 1px solid #527191;

        &:not(:last-child) {
          border-right: none;
        }

        &:not(:first-child) {
          border-left: none;
        }
      }
    }

    .el-table__row:hover>td.el-table__cell {
      background: linear-gradient(180deg, rgb(30 83 132 / 0.52), rgb(0 132 255 / 0.52));
      color: #fff;
    }
  }

  :deep(.cell) {
    height: 80px;
    line-height: 80px;
  }
}
</style>
