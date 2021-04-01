import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

const CategoryResultChart = ({ userResult, maxResult }) => (
  <>
    <ReactSpeedometer
      value={userResult}
      maxValue={maxResult}
      needleColor="steelblue"
      needleTransition="easeLinear"
      needleTransitionDuration={6000}
      needleHeightRatio={0.6}
      segments={7}
      segmentColors={[
        '#ff5900',
        '#ffa200',
        '#FFC200',
        '#FFD700',
        '#c1db6b',
        '#9edb6b',
        '#5cd175',
      ]}
      maxSegmentLabels={0}
      valueTextFontSize="0"
      fluidWidth
      height={150}
    />
  </>
)

export default CategoryResultChart
