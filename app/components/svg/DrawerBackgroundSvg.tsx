import * as React from 'react'
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
import { SvgProps } from 'react-native-svg';

type Props = {
}

export default function DrawerBackgroundSvg(props: SvgProps & Props) {


  return (
    <Svg viewBox="-200 -400 400 800" {...props} pointerEvents="none">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="3" y2="1.5" gradientTransform="rotate(40)">
          <Stop offset="0" stopColor="#3083ff" stopOpacity="1" />
          <Stop offset="1" stopColor="#99D4FF" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x="-200" y="-400" width="400" height="800" fill="url(#grad)" rx="8"></Rect>
    </Svg>
  )
}