/// <reference types="vite/client" />
/// <reference types="zf-dbs-vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZHLY_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'swiper' {
  export const EffectCoverflow: any
  export const Pagination: any
  export const Autoplay: any

  const Swiper: any
  export default Swiper
}

