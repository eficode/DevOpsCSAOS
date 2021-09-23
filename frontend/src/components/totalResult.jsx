import React from 'react'
import {
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  ResponsiveContainer,
} from 'recharts'
import Typography from '@material-ui/core/Typography'

const TotalResult = ({ userResult, maxResult }) => {
  const percentage = (userResult / maxResult) * 100
  const data = [{ name: 'totalScore', value: percentage }]

  const circleSize = 220

  return (
    <ResponsiveContainer width='100%' height={250}>
      <RadialBarChart
        width={circleSize}
        height={circleSize}
        cx={circleSize / 2}
        cy={circleSize / 2}
        innerRadius={96}
        outerRadius={144}
        barSize={20}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          clockWise
          dataKey="value"
          fill='#76b500'
          fillOpacity={0.4}
        />
        <text
          x={circleSize / 2}
          y={circleSize / 2}
          width={20}
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
        >
              You got {percentage}% of points
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export default TotalResult
