<template>
  <ZfApp>
    <div class="layout">
      <div class="layout-container">
        <RouterView v-slot="{ Component }">
          <Transition>
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </ZfApp>
</template>

<style lang="scss" scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 26px;
  background: #010815 url("./assets/background.jpeg") no-repeat center center;
  background-size: 100% 100%;

  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 1;
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   background: url("./assets/background-mask.jpeg") no-repeat center center;
  //   background-size: 100% 100%;
  //   content: "";
  // }
}

.layout-header {
  position: relative;
  z-index: 2;
  flex: 0 0 191px;
  width: 100%;
  height: 191px;
  background: url("./assets/header.png") no-repeat top center;
  background-size: 100% 100%;

  .layout-header__date {
    position: absolute;
    top: 65px;
    right: 361px;
    display: flex;
    color: #E6F6FF;
    font-family: Digital, sans-serif;
    letter-spacing: 4px;
    transform: skewY(-3deg);
  }

  .layout-header__title {
    position: absolute;
    top: 40%;
    right: 0;
    left: 0;
    z-index: 1;
    display: block;
    text-align: center;
    height: 97px;
    font-size: 92px;
    font-family: YouSheBiaoTiHei, sans-serif;
    letter-spacing: 7px;
    margin: auto;
    transform: translateY(-50%);

    .gradient-text {
      position: relative;
      width: 100%;
      height: 100%;
      font-weight: bolder;
      background-image: linear-gradient(to bottom, #fff, #fff 40%, #88D4FF);
      background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        content: '幸福渠数字孪生';
        position: absolute;
        z-index: -1;
        text-shadow: 0 7px 14px rgb(0 0 0 / 0.5);
      }
    }
  }

  .layout-header__nav {
    display: flex;
  }
}

.navbar-btns {
  z-index: 1;

  .navbar-preview {
    width: 393px;
    height: 93px;
    background: url("./assets/navbar/preview.png") no-repeat;
    background-size: 100% 100%;

    &__active,
    &:hover {
      width: 393px;
      height: 92px;
      background: url("./assets/navbar/preview-active.png") no-repeat;
      background-size: contain;
    }
  }

  .navbar-automate {
    width: 393px;
    height: 93px;
    background: url("./assets/navbar/automate.png") no-repeat;
    background-size: 100% 100%;

    &__active,
    &:hover {
      width: 393px;
      height: 92px;
      background: url("./assets/navbar/automate-active.png") no-repeat;
      background-size: contain;
    }
  }

  .navbar-safe {
    width: 393px;
    height: 93px;
    background: url("./assets/navbar/safe.png") no-repeat;
    background-size: 100% 100%;

    &__active,
    &:hover {
      width: 393px;
      height: 92px;
      background: url("./assets/navbar/safe-active.png") no-repeat;
      background-size: contain;
    }
  }

  .navbar-emergency {
    width: 393px;
    height: 93px;
    background: url("./assets/navbar/emergency.png") no-repeat;
    background-size: 100% 100%;

    &__active,
    &:hover {
      width: 393px;
      height: 92px;
      background: url("./assets/navbar/emergency-active.png") no-repeat;
      background-size: contain;
    }
  }

}

.layout-container {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
