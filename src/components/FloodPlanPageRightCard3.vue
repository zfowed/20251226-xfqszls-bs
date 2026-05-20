<template>
  <PageCard title="预案调度令" bg-class="right">
    <div class="page-container">
      <PageTable
        class="plan-file-table"
        :thead-col="theadCol"
        :data-list="dataList"
        :limit-scroll="4"
        :index="true"
      >
        <template #index="scope">
          <div class="table-index">
            {{ scope.index }}
          </div>
        </template>
        <template #fileName="scope">
          <a
            class="file-name-link"
            :href="getFileDownloadUrl(scope.row.filePath)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ scope.row.fileName }}
          </a>
        </template>
      </PageTable>
    </div>
  </PageCard>
</template>

<script setup lang="ts">
type PlanFileRow = {
  id: number | string
  uploadTime: string
  fileName: string
  filePath: string
  fileType: string
  docTypeName: string
}

const theadCol = ref([
  { key: 'uploadTime', name: '上传时间', width: 200, align: 'center' },
  { key: 'fileName', name: '文件名称' }
  // { key: 'fileType', name: '文件类型', width: 160, align: 'center' },
  // { key: 'docTypeName', name: '文档类型', width: 180, align: 'center' }
])

const dataList = ref<PlanFileRow[]>([])

const getResultList = (result: Record<string, any>) => {
  if (Array.isArray(result)) return result
  if (Array.isArray(result?.records)) return result.records
  if (Array.isArray(result?.list)) return result.list
  if (Array.isArray(result?.detail?.records)) return result.detail.records
  return []
}

const docTypeMap: Record<string, string> = {
  1: '预案文件',
  2: '调度规程'
}

const getFileDownloadUrl = (filePath: string) => {
  return `http://223.76.158.56:9600/${String(filePath || '').replace(/^\//, '')}`
}

const formatPlanFile = (item: Record<string, any>, index: number): PlanFileRow => {
  return {
    id: item.id || index,
    uploadTime: item.uploadTime || '-',
    fileName: item.fileName || '-',
    filePath: item.filePath || '',
    fileType: item.fileType || '-',
    docTypeName: docTypeMap[String(item.docType)] || '-'
  }
}

usePolling(async () => {
  const result: any = await service.xfqs.queryFloodPlanFile({
    pageNum: 1,
    pageSize: 20
  })
  console.log('预案调度令列表:', result)
  dataList.value = getResultList(result).map(formatPlanFile)
})
</script>

<style lang="scss" scoped>
.page-container {
  padding: 30px;
  box-sizing: border-box;
  height: 424px;
}

.table-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: #fff;
  font-family: JiangChengHeiTi, 'Alibaba PuHuiTi 2.0', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 42px;
  background: url('@/components/PageTable/assets/index-bg.png') no-repeat center;
  background-size: 100% 100%;
}

.plan-file-table {
  height: 100%;

  :deep(.table-header__tr) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 24px;
    font-weight: 500;
  }

  :deep(.table-body__th) {
    font-family: 'Alibaba PuHuiTi 2.0', PingFangSC, sans-serif;
    font-size: 24px;
  }
}

.file-name-link {
  color: #81e6ff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
}
</style>
