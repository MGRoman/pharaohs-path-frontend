/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin used for canonical and hreflang URLs, e.g. `https://pharaohs-path.com`. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
