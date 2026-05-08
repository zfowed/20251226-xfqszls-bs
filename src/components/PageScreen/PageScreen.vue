<template>
  <div class="page">
    <div class="page-side page-side__left">
      <Transition name="v-fade">
        <KeepAlive>
          <ComponentSlot v-if="pageLeftVisible" class="page-side__inner">
            <Transition>
              <div v-if="pageLeftDetailKey && $slots[`left:${pageLeftDetailKey}`]" class="page-side__inner">
                <slot :name="`left:${pageLeftDetailKey}`" :data="pageLeftDetailData"
                  :handle-back="handlePageLeftDetailBack" />
              </div>
              <div v-else class="page-side__inner">
                <slot name="left" :to-detail="handlePageLeftToDetail" />
              </div>
            </Transition>
          </ComponentSlot>
        </KeepAlive>
      </Transition>
    </div>
    <div class="page-middle">
      <slot name="middle" />
    </div>
    <div class="page-side page-side__right">
      <Transition name="v-fade">
        <KeepAlive>
          <ComponentSlot v-if="pageRightVisible" class="page-side__inner">
            <Transition>
              <div v-if="pageRightDetailKey && $slots[`right:${pageRightDetailKey}`]" class="page-side__inner">
                <slot :name="`right:${pageRightDetailKey}`" :data="pageRightDetailData"
                  :handle-back="handlePageRightDetailBack" />
              </div>
              <div v-else class="page-side__inner">
                <slot name="right" :to-detail="handlePageRightToDetail" />
              </div>
            </Transition>
          </ComponentSlot>
        </KeepAlive>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
const pageLeftVisible = inject('pageLeftVisible', ref(true))
const pageRightVisible = inject('pageRightVisible', ref(true))

const pageLeftDetailKey = ref('')
const pageLeftDetailData = ref<any>(null)
const handlePageLeftToDetail = function (key: string, data?: any) {
  if (key && slots[`left:${key}`]) {
    pageLeftDetailKey.value = key
    pageLeftDetailData.value = data || null
  }
}
const handlePageLeftDetailBack = function () {
  pageLeftDetailKey.value = ''
  pageLeftDetailData.value = null
}

const pageRightDetailKey = ref('')
const pageRightDetailData = ref<any>(undefined)
const handlePageRightToDetail = function (key: string, data?: any) {
  if (key && slots[`right:${key}`]) {
    pageRightDetailKey.value = key
    pageRightDetailData.value = data || undefined
  }
}
const handlePageRightDetailBack = function () {
  pageRightDetailKey.value = ''
  pageRightDetailData.value = undefined
}

</script>

<style lang="scss" scoped>
// $side-width: 1328px + 304.45px - 20px;
// $side-width: 902px + 304.45px - 20px;
$side-width: 1157px;
$side-height: 1981px;

.page {
  position: relative;
  display: flex;
  flex-direction: row;
  place-content: flex-start space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.page-side {
  position: relative;
  flex: 0 0 $side-width;
  box-sizing: border-box;
  width: $side-width;
  height: 100%;
  z-index: 1;

  .page-side__inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.page-side__left {
  padding-left: 70px;

  // padding-top: 110px;

  .page-side__inner {
    opacity: 1;
    transform: translateX(0);
    animation: left-left 0.6s;

    @keyframes left-left {
      from {
        opacity: 0;
        transform: translateX(-5%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

.page-side__right {
  padding-right: 70px;

  // padding-top: 110px;

  .page-side__inner {
    opacity: 1;
    transform: translateX(0);
    animation: left-right 0.6s;

    @keyframes left-right {
      from {
        opacity: 0;
        transform: translateX(5%);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

.page-middle {
  position: relative;
  flex: 1;
  height: 100%;
}
</style>
