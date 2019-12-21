import { keyframes, css } from 'styled-components'

export const rotateAnimation = keyframes`
 100% { transform: rotate(360deg); }
`

export const infiniteRotateAnimation = css`
  animation: ${rotateAnimation} 4s linear infinite;
`