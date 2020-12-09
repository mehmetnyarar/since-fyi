import React from 'react'
import Svg, { Mask, Path, SvgProps } from 'react-native-svg'

/**
 * Logo props.
 */
interface Props extends SvgProps {
  size?: number
}

/**
 * Logo.
 * @param props Props.
 */
export const Logo: React.FC<Props> = props => {
  const { size, ...svgProps } = props

  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      {...svgProps}
    >
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.663 2.688a.085.085 0 00-.004.017C11.658 3.035 14 5.581 14 8.667c0 3.308-2.692 6-6 6s-6-2.692-6-6C2 5.58 4.342 3.035 7.341 2.705a.085.085 0 00-.004-.017c-.002-.007-.004-.014-.004-.021V2h-.666a.666.666 0 110-1.333h2.666a.666.666 0 110 1.333h-.666v.667c0 .007-.002.014-.004.02zM8 13.167a4.505 4.505 0 01-4.5-4.5c0-2.482 2.019-4.5 4.5-4.5s4.5 2.018 4.5 4.5c0 2.481-2.019 4.5-4.5 4.5zm2.667-4.5A.667.667 0 0010 8H8.667V6.667a.666.666 0 10-1.334 0v2c0 .368.299.666.667.666h2a.667.667 0 00.667-.666z'
        fill='#fff'
      />
      <Mask id='prefix__a'>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.663 2.688a.085.085 0 00-.004.017C11.658 3.035 14 5.581 14 8.667c0 3.308-2.692 6-6 6s-6-2.692-6-6C2 5.58 4.342 3.035 7.341 2.705a.085.085 0 00-.004-.017c-.002-.007-.004-.014-.004-.021V2h-.666a.666.666 0 110-1.333h2.666a.666.666 0 110 1.333h-.666v.667c0 .007-.002.014-.004.02zM8 13.167a4.505 4.505 0 01-4.5-4.5c0-2.482 2.019-4.5 4.5-4.5s4.5 2.018 4.5 4.5c0 2.481-2.019 4.5-4.5 4.5zm2.667-4.5A.667.667 0 0010 8H8.667V6.667a.666.666 0 10-1.334 0v2c0 .368.299.666.667.666h2a.667.667 0 00.667-.666z'
          fill='#fff'
        />
      </Mask>
    </Svg>
  )
}
