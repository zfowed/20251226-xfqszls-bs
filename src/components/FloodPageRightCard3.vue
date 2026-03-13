<template>
  <PageCard title="预案调令" bg-class="right">
    <div class="page-container">
      <ElTable :data="dataList" class="files-table" height="509px">
        <ElTableColumn prop="fileName" label="文件名称">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.fileName"
              placement="top-start"
            >
              {{ scope.row.fileName }}
            </el-tooltip>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="docType" label="类型" width="180">
          <template #default="scope">
            <div class="cell">
              <span v-if="scope.row.docType === 1">防汛预案</span>
              <span v-else-if="scope.row.docType === 2">抗旱预案</span>
              <span v-else-if="scope.row.docType === 3">调度预案</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="uploadTime" label="时间" width="220">
          <template #default="scope">
            <div class="leading-[40px] text-center">
              {{ scope.row.uploadTime }}
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="200">
          <template #default="scope">
            <div class="flex items-center">
              <div @click="downloadFile(scope.row)">
                <img class="mr-[20px]" src="@/assets/global/images/check.png">
              </div>
              <div @click="downloadFile(scope.row)">
                <img class="mr-[20px]" src="@/assets/global/images/download.png">
              </div>

              <el-popconfirm
                class="box-item"
                title="是否确认删除？"
                placement="top-start"
                effect="dark"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="delFileHandle(scope.row)"
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
const dataList = ref<{ [key: string]: any }[]>([])
const dataListTiggle = usePolling(async () => {
  const result: any = await service.xfqs.queryFloodPlanFile({
    pageNum: 1,
    pageSize: 1000
  })
  dataList.value = result.records
})

function downloadFile (file: any) {
  const link = document.createElement('a')
  link.href = import.meta.env.VITE_DOWNLOAD_FILE_URL + file.filePath
  link.download = file.fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function delFileHandle (file: any) {
  const result: any = await service.xfqs.delFloodPlanFile({
    id: file.id
  })
  notify.success({ title: '删除预案调令', message: result?.content })
  dataListTiggle.trigger()
}
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

</style>
