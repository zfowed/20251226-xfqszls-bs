<template>
  <div class="detail-container" :style="{ float: alginClass }">
    <div class="mb-[40px]">
      <div class="detail-title">
        <div class="detail-title__text">
          <img class="w-[95px] h-[30px] mr-[15px]" src="@/assets/global/images/animation/title-mark.svg">
          <span>{{ props.title }}</span>
        </div>
        <div class="detail-title__back" @click="handleGetBack">
          返回
        </div>
      </div>
    </div>
    <div v-if="dataList.formData.dataList.length > 0" class="mb-[40px]">
      <div class="detail-header">
        <img src="@/assets/floor/preview/garden-check.svg" class="w-[24px] h-[24px] mr-[20px]">
        <span>{{ dataList.formData.title }}</span>
      </div>
      <div class="detail-section">
        <div class="app-form">
          <div v-for="(item, index) in dataList.formData.dataList" :key="index" class="app-form__item">
            <div class="app-form__label">
              <span class="w-[50%] text-left">{{ item.label }}</span>
            </div>
            <div class="app-form__content">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataList.logTable" class="mb-[40px]">
      <div class="detail-header">
        <img src="@/assets/floor/preview/garden-check.svg" class="w-[24px] h-[24px] mr-[20px]">
        <span>{{ dataList.logTable.title }}</span>
      </div>
      <div class="detail-section">
        <div class="table-header flex">
          <div v-for="(item, index) in dataList.logTable.theadList" :key="index" class="table-header__cell" :style="{ flex: `${item.width}` }">
            {{ item.label }}
          </div>
        </div>
        <div class="table-body">
          <div v-for="(item, tbodyIndex) in dataList.logTable.dataList" :key="tbodyIndex" class="flex">
            <div v-for="(hitem, hindex) in dataList.logTable.theadList" :key="hindex" class="table-body__cell" :style="{ flex: `${hitem.width}` }">
              {{ item[hitem.attr] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataList.accordingList && dataList.accordingList.length > 0" class="mb-[40px]">
      <div class="detail-header">
        <img src="@/assets/floor/preview/garden-check.svg" class="w-[24px] h-[24px] mr-[20px]">
        <span>预警依据</span>
      </div>
      <div class="detail-section h-[430px] overflow-auto">
        <div class="forewarning-according">
          <img v-for="(according, accordingIndex) of dataList.accordingList" :key="accordingIndex" class="w-[422px] h-[182px] mr-[20px] mb-[20px]" :src="according">
        </div>
      </div>
    </div>
    <div v-if="dataList.courseList && dataList.courseList.length != 0 || dataList.attachmentList && dataList.attachmentList.length != 0">
      <div class="detail-header">
        <img src="@/assets/floor/preview/garden-check.svg" class="w-[24px] h-[24px] mr-[20px]">
        <span>事件处置过程</span>
      </div>
      <div class="detail-section">
        <div class="disposal-title">
          <div :class="{'active': disposalViewVisible === 'course'} " class="disposal-title__btn" @click="handleDisposalView('course')">
            事件过程
          </div>
          <div :class="{'active': disposalViewVisible === 'attachment'} " class="disposal-title__btn" @click="handleDisposalView('attachment')">
            过程提交附件
          </div>
        </div>
        <div class="overflow-auto h-[1000px] px-[160px]">
          <ElTimeline v-if="disposalViewVisible === 'course'" class="disposal-process">
            <ElTimelineItem
              v-for="(course, index) in dataList.courseList"
              :key="index"
              :timestamp="course.timestamp"
              placement="top"
            >
              <div class="process-form">
                <div v-if="course.reportVisible" class="process-form__item">
                  <div class="process-form__label">
                    <span class="text-left">上报人：</span>
                  </div>
                  <div class="process-form__content">
                    {{ course.personCharge }}
                  </div>
                </div>
                <div v-else class="process-form__item">
                  <div class="process-form__label">
                    <span class="text-left">事件受理派遣中心：</span>
                  </div>
                  <div class="process-form__content">
                    {{ course.personCharge }}
                  </div>
                </div>
              </div>
              <div class="process-form">
                <div class="process-form__item">
                  <div class="process-form__label">
                    <span class="text-left">事件状态：</span>
                  </div>
                  <div v-if="!course.reportVisible && course.status === '待办理'" class="process-form__content">
                    <div class="disposal-process__btn">
                      驳回
                    </div>
                    <div class="disposal-process__btn">
                      受理
                    </div>
                  </div>
                  <div v-else class="process-form__content">
                    {{ course.status }}
                  </div>
                </div>
              </div>
              <div class="process-form">
                <div class="process-form__item">
                  <div class="process-form__label">
                    <span class="text-left">办理意见：</span>
                  </div>
                  <div class="process-form__content">
                    {{ course.remark }}
                  </div>
                </div>
              </div>
              <div class="disposal-process__serial">
                {{ index + 1 }}
              </div>
            </ElTimelineItem>
          </ElTimeline>

          <ElTimeline v-if="disposalViewVisible === 'attachment'" class="disposal-process">
            <ElTimelineItem
              v-for="(attachment, index) in dataList.attachmentList"
              :key="index"
              :timestamp="attachment.timestamp"
              placement="top"
            >
              <div class="disposal-process__text">
                责任人：{{ attachment.personCharge }}
              </div>
              <div class="flex flex-wrap mb-[20px] ml-[40px]">
                <img v-for="(photo, photoIndex) in attachment.photoList" :key="photoIndex" :src="photo" class="w-[238px] h-[108px] mr-[20px] mb-[20px]">
              </div>
              <div class="disposal-process__serial">
                {{ index + 1 }}
              </div>
            </ElTimelineItem>
          </ElTimeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

type Props = {
  // 标题
  title: string
  dataList: {
    // 表单
    formData: {
      title: string,
      dataList: {
        label: string,
        content: string,
      }[]
    },
    // 设备告警日志表格
    logTable?: {
      title: string,
      theadList: {
        label: string,
        width: string,
        attr: string
      }[],
      dataList: {[key:string]: any}[]
    }
    // 预警依据
    accordingList?: string[],
    // 事件过程
    courseList?: {
      timestamp: string,
      personCharge: string,
      remark: string,
      status: string,
      telphone: string,
      reportVisible: boolean
    }[],
    // 过程提交附件
    attachmentList?: {
      timestamp: string,
      personCharge: string,
      photoList: string[]
    }[]
  },
  // 浮动样式
  alginClass: 'left' | 'right'
}
const props = withDefaults(defineProps<Props>(), {
  alginClass: 'right',
  formData: [],
  accordingList: [],
  courseList: [],
  attachmentList: []
})

type Emit = {
  (name: 'detailBackHandle'):void
}
const emit = defineEmits<Emit>()

const disposalViewVisible = ref('course')

const handleDisposalView = (type: string) => {
  disposalViewVisible.value = type
}

const handleGetBack = () => {
  emit('detailBackHandle')
}
</script>

<style lang="scss" scoped>
.detail-container {
  width: 1426px;
  height: 1605px;
}

.detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 89px;
  margin-bottom: 5px;
  padding: 0 50px;
  background: rgb(48 56 97 / 0.5);

  &__text {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 38px;
    font-family: PangMenZhengDaoBiaoTi, PingFangSC-Regular, "PingFang SC", "Microsoft YaHei", sans-serif;
  }

  &__back {
    width: 225px;
    height: 56px;
    color: #3351AB;
    font-weight: 400;
    font-size: 36px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDaoBiaoTi, sans-serif;
    line-height: 56px;
    text-align: center;
    background: rgb(6 16 46 / 1);
    border: 2px solid rgb(125 157 255 / 1);
    border-radius: 20px;
    cursor: pointer;
  }
}

.detail-header {
  display: flex;
  align-items: center;
  height: 32px;
  margin-bottom: 20px;
  margin-left: 50px;
  color: #fff;
  font-size: 24px;
}

.app-form {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  &__item {
    display: flex;
    width: calc(50% - 10px);
    height: 60px;
    margin-bottom: 5px;
    color: #fff;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;

    &:nth-child(odd) {
      margin-right: 5px;
      margin-left: 10px;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin-right: 5px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: normal;
    width: 50%;
  }
}

.table-header {
  height: 60px;
  margin-bottom: 14px;
  color: rgb(255 255 255);
  background-color: rgb(48 56 97 / 0.5) !important;

  &__cell {
    position: relative;
    padding: 14px 0;
    color: #fff;
    font-weight: 400;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;
    line-height: 35px;
    text-align: center;
    background-color: rgb(48 56 97 / 0.42) !important;
    border-bottom: none;

    &::after {
      position: absolute;
      top: 20px;
      right: 0;
      height: 25px;
      border-right: 2px solid #06102e;
      content: '';
    }
  }
}

.table-body {
  height: 600px;
  overflow: auto;
  color: rgb(255 255 255);
  background-color: transparent;

  &__cell {
    margin-bottom: 4px;
    padding: 18px 12px;
    color: #fff;
    font-weight: 400;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;
    line-height: 1.3;
    text-align: center;
    background-color: rgb(48 56 97 / 0.42);
    border-bottom: none;
  }
}

.disposal-title {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 40px;
  padding: 0 160px;
  background: rgb(48 56 97 / 0.42);

  &__btn {
    margin-right: 300px;
    color: #fff;
    font-weight: bold;
    font-size: 32px;
    font-family: OPPOSans-B, sans-serif ;
    cursor: pointer;
  }

  & .active {
    color: #466FEB;
    border-bottom: 3px solid #557FFF;
  }
}

.disposal-process {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-family: OPPOSans-R, sans-serif;

  &__serial {
    position: absolute;
    top: 4px;
    left: 1px;
    color: #fff;
    font-size: 10px;
  }

  &__btn {
    display: inline-block;
    margin-right: 20px;
    padding: 10px 30px;
    color: #fff;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;
    background: rgb(45 76 155 / 0.63);
    cursor: pointer;

    &:last-child{
      margin-right: 0;
    }

    &:active,
    &:hover {
      background: rgb(62 77 104 / 1);
    }
  }

  :deep(.el-timeline-item__timestamp){
    margin-bottom: 20px;
    margin-left: 40px;
    color: #fff;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;
  }

  :deep(.el-timeline-item__node) {
    top: -3px;
    left: -11px;
    width: 30px;
    height: 30px;
    background: url('./assets/timeline-icon.svg') no-repeat;
  }

  :deep(.el-timeline-item__tail) {
    border-left: 1px solid #0DD6FD;
  }
}

.process-form {
  width: 100%;

  &__item {
    display: flex;
    height: 60px;
    margin-bottom: 20px;
    margin-left: 40px;
    color: #fff;
    font-size: 24px;
    font-family: OPPOSans-R, sans-serif;
  }

  &__label {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 400px;
    margin-right: 5px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: normal;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.forewarning-according {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  padding: 0 50px;
}
</style>
