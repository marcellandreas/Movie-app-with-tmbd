/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMBD_KEY: string
  readonly VITE_BASE_URL: string
  readonly VITE_IMG_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}