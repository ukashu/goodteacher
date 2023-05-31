import * as React from 'react'
import Svg, { Path, Circle, G, Rect } from 'react-native-svg'
import { SvgProps } from 'react-native-svg';

type Props = {
  xOffset: number,
  yOffset: number,
  pathRotation: number
}

export default function ClassBackgroundSvg(props: SvgProps & Props) {
  const path = `M${27 + props.xOffset} ${2 + props.yOffset}C${90 + props.xOffset} ${-9 + props.yOffset} ${188 + props.xOffset} ${35 + props.yOffset} ${197 + props.xOffset} ${87 + props.yOffset}C${207 + props.xOffset} ${139 + props.yOffset} ${201 + props.xOffset} ${214 + props.yOffset} ${138 + props.xOffset} ${226 + props.yOffset}C${75 + props.xOffset} ${238 + props.yOffset} ${51 + props.xOffset} ${192 + props.yOffset} ${41 + props.xOffset} ${140 + props.yOffset}C${31 + props.xOffset} ${88 + props.yOffset} ${-36 + props.xOffset} ${14 + props.yOffset} ${27 + props.xOffset} ${2 + props.yOffset}Z`

  return (
    <Svg viewBox="0 0 400 100" {...props}>
      <G rx="6">
        <Rect x="0" y="0" width="400" height="100" fill="#3083FF" rx="6"/>
        <Path d={path} rotation={props.pathRotation} origin={`${27 + props.xOffset}, ${2 + props.yOffset}`} fill="#CC0000"/>
      </G>
    </Svg>
  )
}