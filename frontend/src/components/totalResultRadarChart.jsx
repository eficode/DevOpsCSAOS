import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  Text,
} from 'recharts'
import styled from 'styled-components'

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  margin: 30px 0 10px 0;
`

const CustomTooltip = ({ data, active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: 'white',
          border: 'solid 1.5px',
          fontSize: '13px',
        }}
        data-testid="tooltip"
      >
        <p className="category">
          <strong>{label}</strong>
        </p>
        <p className="you">
          Your points: {Math.round(payload[0].payload.userPoints)}
        </p>
        {data[0].groupAverage && (
          <p className="group">
            Group average:{' '}
            {Math.round(payload[0].payload.groupAverage.toFixed(1))}
          </p>
        )}
        {data[0].industryAverage && (
          <p className="industry">
            Industry average:{' '}
            {Math.round(payload[0].payload.industryAverage.toFixed(1))}
          </p>
        )}
        <p className="max">
          Max points: {Math.round(payload[0].payload.maxPoints)}
        </p>
      </div>
    )
  }

  return null
}

const CustomizedAxisTick = (props) => {
  const { x, y, payload, cy, cx } = props
  return (
    <Text
      x={x > cx ? x + 30 : x < cx ? x - 30 : x}
      y={y > cy ? y + 20 : y < cy ? y - 20 : y}
      width={100}
      textAnchor="middle"
      verticalAnchor="middle"
      fontSize="0.6rem"
    >
      {payload.value}
    </Text>
  )
}

const TotalResultRadarChart = ({ data }) => (
  <>
    <ResultsTitle>Compare your results</ResultsTitle>
    <ResponsiveContainer id="RadarChartContainer" width="100%" height={500}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <Tooltip
          cursor={{ fill: 'transparent' }}
          content={<CustomTooltip />}
          data={data}
        />
        <PolarGrid />
        <PolarAngleAxis dataKey="name" tick={<CustomizedAxisTick />} />

        <Radar
          name="Your points"
          dataKey="userPerCentOutOfMax"
          stroke="#76b500"
          fill="#76b500"
          fillOpacity={0.4}
        />

        {data[0].groupAverage && (
          <Radar
            name="Group average"
            dataKey="groupPerCentOutOfMax"
            stroke="#FFC200"
            fill="#FFC200"
            fillOpacity={0.4}
          />
        )}

        {data[0].industryAverage && (
          <Radar
            name="Industry average"
            dataKey="industryPerCentOutOfMax"
            stroke="#148AB3"
            fill="#148AB3"
            fillOpacity={0.4}
          />
        )}

        <Legend fontSize="0.8rem" />
      </RadarChart>
    </ResponsiveContainer>
  </>
)

export default TotalResultRadarChart
