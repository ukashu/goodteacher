import * as React from 'react'
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg'
import { SvgProps } from 'react-native-svg';

type Props = {
}

export default function AddModalBackgroundSvg(props: SvgProps & Props) {


  return (
    <Svg viewBox="-400 -200 800 400" {...props} pointerEvents="none">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1" gradientTransform="rotate(40)">
          <Stop offset="0" stopColor="#ff0000" stopOpacity="1" />
          <Stop offset="60%" stopColor="#cc0000" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x="-400" y="-200" width="800" height="400" fill="url(#grad)" rx="6"></Rect>
    </Svg>
  )
}