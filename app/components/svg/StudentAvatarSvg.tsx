import * as React from 'react'
import Svg, { Path, Circle, ClipPath, Defs, G, Use, Rect } from 'react-native-svg'
import { SvgProps } from 'react-native-svg';
import { getRandomInt } from '../../utils/utils'

type Props = {
  studentAlias: string
}

export default function ClassBackgroundSvg(props: SvgProps & Props) {

  //circle inner cx in range 140-260 , cy same always
  //face originX in range 100-300 
  //face originY in range 100-300 
  //face rotation in range -20 to 20
  //color in range 0-7

  function stringToNumArr(str: string) {
    let numArr = []
    for (let i = str.length - 1; i >= 0; i--) {
      numArr.push(str[i].charCodeAt(0))
    }
    return numArr
  }

  let colors = ['#FF7A30', '#97FF30', '#BD30FF', '#3430FF', '#30FF8F', '#FBFF30', '#FF0000', '#FF3062']

  function generateData(arr: Array<number>) {
    //generate face color
    let faceColor = (arr[0] && arr[0] >= 0 && arr[0] <= 140) ? Math.floor(arr[0]/20) : 0
    //generate circle inner cx
    let innerCircleX = (arr[1] && arr[1] >= 0 && arr[1] <= 120) ? arr[1] : 0
    //generate originX
    let faceOriginX = (arr[2] && arr[2] >= 0 && arr[2] <= 200) ? arr[2] : 0
    //generate originY
    let faceOriginY = (arr[3] && arr[3] >= 0 && arr[3] <= 200) ? arr[3] : 0
    //generate face rotation
    let faceRotation = getRandomInt(-20, 20)

    return {faceColor, innerCircleX, faceOriginX, faceOriginY, faceRotation}
  }

  let features = generateData(stringToNumArr(props.studentAlias))

  return (
    <Svg viewBox="0 0 400 400" {...props} pointerEvents="none">
      <Defs>
        <ClipPath id="clip">
          <Circle cx="200" cy="200" r="200" />
        </ClipPath>
        <G id="face">
          <G>
            <Circle cx="150" cy="200" r="10" fill="black"/>
            <Circle cx="210" cy="200" r="10" fill="black"/>
            <Path d="M140 240 Q180 280 220 240" stroke="black" strokeWidth="10" strokeLinecap="round"/>
          </G>
        </G>
      </Defs>
      <Circle cx="200" cy="200" r="200" fill="#99d4ff" pointerEvents="none" clipPath="url(#clip)"/>
      <Circle cx={140 + features.innerCircleX} cy="260" r="200" fill={colors[features.faceColor]} pointerEvents="none" clipPath="url(#clip)"/>
      <Use href="#face" x="0" y="0" rotation={features.faceRotation} originX={100 + features.faceOriginX} originY={100 + features.faceOriginY}/>
    </Svg>
  )
}