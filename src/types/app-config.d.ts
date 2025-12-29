declare global {
  import type { Ref } from 'vue'
  import type { defineConfig } from 'zf-dbs'
  interface Window {
    // 暴露的全局配置
    appConfig?: Ref<ReturnType<typeof defineConfig>>
  }
}

declare module 'zf-dbs' {

  // 配置
  interface AppConfig {
    jnksRequestBaseUrl: string,
    hmlRequestBaseUrl: string,
    taurusfrontRequestUrl: string,
    taurusfrontRequestToken: string,
    Authorization: string,
  }
}

export {}
