/// <reference types="npm:vite@^4.3.9/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'npm:vue@^3.3.4'
  const component: DefineComponent<{}, {}, any>
  export default component
}
