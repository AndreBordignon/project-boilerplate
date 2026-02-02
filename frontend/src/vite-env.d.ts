/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_FORM_WEBHOOK_URL?: string
  readonly VITE_FORM_EMAIL_TO?: string
  readonly VITE_USE_BACKEND?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
