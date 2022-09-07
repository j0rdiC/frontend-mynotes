import { forwardRef } from "react"

export const ArrowLeft = forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <title>Click to go back and save</title>
      <path d="M11 16l13-13v-3l-16 16 16 16v-3l-13-13z"></path>
    </svg>
  </a>
))
