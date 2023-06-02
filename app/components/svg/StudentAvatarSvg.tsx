import * as React from 'react'
import Svg, { Path, Circle, ClipPath, Defs, G, Use, Rect } from 'react-native-svg'
import { SvgProps } from 'react-native-svg';
import { getRandomInt } from '../../utils/utils'

type Props = {
  studentAlias: string
}

export default function ClassBackgroundSvg(props: SvgProps & Props) {
  const [faceRotation, setFaceRotation] = React.useState(0)
  const [innerX, setInnerX] = React.useState(0)

  React.useEffect(() => {
    setFaceRotation(getRandomInt(-20, 20))
    setInnerX(getRandomInt(140, 260))
  }, [])

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

  let colors = ['#FF7A30', '#97FF30', '#BD30FF', '#3430FF', '#30FF8F', '#FBFF30', '#FF0000', '#FF3062', '#FF7A30', '#97FF30', '#BD30FF', '#53C1FF', '#30FF8F', '#FBFF30', '#FF0000']

  function generateData(arr: Array<number>) {
    function isOdd(num: number) { return num % 2;}

    //generate circle inner cx
    let innerCircleX = (arr[0] && arr[0] >= 0 && arr[0] <= 120) ? arr[0] : 0
    innerCircleX = isOdd(innerCircleX) ? 140 + innerCircleX :  260 - innerCircleX
    //generate originX
    let faceOriginX = (arr[1] && arr[1] >= 0 && arr[1] <= 200) ? arr[1] : 0
    faceOriginX = isOdd(faceOriginX) ? 100 + faceOriginX: 300 - faceOriginX 
    //generate originY
    let faceOriginY = (arr[2] && arr[2] >= 0 && arr[2] <= 200) ? arr[2] : 0
    faceOriginY = isOdd(faceOriginY) ? 100 + faceOriginY : 300 - faceOriginY
    //generate face color
    let faceColor = (arr[3] && arr[3] >= 0 && arr[3] <= 140) ? Math.floor(arr[3]/10) : 0

    return {faceColor, innerCircleX, faceOriginX, faceOriginY}
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
      <Circle cx={innerX} cy="260" r="200" fill={colors[features.faceColor]} pointerEvents="none" clipPath="url(#clip)"/>
      <Use href="#face" x="0" y="0" rotation={faceRotation} originX={features.faceOriginX} originY={features.faceOriginY}/>
    </Svg>
  )
}