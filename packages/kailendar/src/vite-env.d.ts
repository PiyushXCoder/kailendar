/// <reference types="vite/client" />

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react'
  const SvgComponent: FC<SVGProps<SVGSVGElement>>
  export default SvgComponent
}

declare module '*.svg' {
  const src: string
  export default src
}
