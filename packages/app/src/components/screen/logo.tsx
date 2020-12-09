import React from 'react'
import { ClipPath, G, Path, Svg, SvgProps } from 'react-native-svg'

/**
 * <Logo /> props.
 */
interface Props extends SvgProps {
  size?: number
  fill?: string
}

/**
 * Application logo.
 * @param props Props.
 * @returns &lt;Logo />.
 */
export const Logo: React.FC<Props> = props => {
  const { size = 32, fill = '#fff', ...svgProps } = props

  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 4267 4267'
      fillRule='evenodd'
      clipRule='evenodd'
      strokeLinejoin='round'
      strokeMiterlimit={2}
      {...svgProps}
    >
      <Path fill='none' d='M0 0h4266.67v4266.67H0z' />
      <ClipPath id='prefix__a'>
        <Path d='M0 0h4266.67v4266.67H0z' />
      </ClipPath>
      <G clipPath='url(#prefix__a)'>
        <Path fill='none' d='M0 0h4266.67v4266.67H0z' />
        <Path
          d='M2633.33 2216.67h-333.333v-333.334c0-92.166-74.667-166.666-166.667-166.666s-166.666 74.5-166.666 166.666v500c0 92.167 74.666 166.667 166.666 166.667h500c92 0 166.667-74.5 166.667-166.667 0-92.166-74.667-166.666-166.667-166.666zm-500 1291.67c-620.333 0-1125-504.666-1125-1125 0-620.333 504.667-1125 1125-1125 620.334 0 1125 504.667 1125 1125 0 620.334-504.666 1125-1125 1125zm164.667-2615.33c.333-3.5 2-6.167 2-9.667V716.677h166.667c92 0 166.666-74.5 166.666-166.667s-74.666-166.667-166.666-166.667h-666.667c-92 0-166.667 74.5-166.667 166.667s74.667 166.667 166.667 166.667h166.667v166.666c0 3.5 1.666 6.167 2 9.667-749.834 82.333-1335.33 719-1335.33 1490.33 0 827.167 673 1500 1500 1500s1500-672.833 1500-1500c0-771.333-585.5-1408-1335.33-1490.33z'
          fill={fill}
        />
      </G>
    </Svg>
  )
}
