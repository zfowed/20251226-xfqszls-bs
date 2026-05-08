<template>
  <div class="w-full" :class="props.bgClass">
    <div class="card-container">
      <div class="card-header">
        <div class="card-title ml-[117px] mt-[-60px]">
          {{ props.title }}
        </div>
        <div class="card-title-right">
          <slot name="right-side" />
        </div>
      </div>
      <div class="card-main">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string,
  bgClass: 'left' | 'right' | 'middle'
}>(), {
  title: '',
  bgClass: 'left'
})

</script>

<style lang="scss" scoped>
.card-container {
  width: 884px;
}

.middle {
  display: flex;
  justify-content: center;

  .card-container {
    width: 3570px !important;
  }
}

.card-header {
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  height: 86.37px;
  justify-content: space-between;
  background: url('./assets/card-header-bg.png') no-repeat;
  background-size: 887px 97px;

}

.card-title {
  position: relative;
  z-index: 1;
  color: #F7FAFF;
  font-size: 52px;
  font-weight: bold;
  font-family: DINAlternateBold, sans-serif;
  background-image: linear-gradient(to bottom, #91DCFF 20%, #FFF 81%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 1px 3px rgb(5 12 25 / 0.6)) drop-shadow(0 0 7px rgb(75 180 229 / 0.69));
}

.card-title-right {
  position: relative;
  z-index: 1;
  margin-right: 37px;

}

.card-main {
  width: 100%;
  margin-top: -6px;
  background: url('./assets/card-main-bg.png') no-repeat;
  background-size: 100% 100%;
}

.left {
  display: flex;
  justify-content: flex-start;
}

.right {
  display: flex;
  justify-content: flex-end;
}
</style>
