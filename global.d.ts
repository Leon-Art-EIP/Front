/// <reference types="node" />

// Extend the NodeJS namespace with Next.js-defined properties
declare namespace NodeJS {
  interface ProcessEnv {
    BACK_URL: string;
    BACK_LOCALHOST: string;
  }
}
