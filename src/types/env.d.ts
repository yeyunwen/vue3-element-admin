/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_TARGET_BASE_API: string;
  readonly VITE_APP_TARGET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
