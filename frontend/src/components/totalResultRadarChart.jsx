import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import styled from 'styled-components'

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 60px 0 10px 0;
`

const CustomTooltip = ({ data, active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: 'white', border: 'solid 1.5px', fontSize: '13px' }}
        data-testid="tooltip"
      >
        <p className="category">
          <strong>Category: {label}</strong>
        </p>
        <p className="you">Your points: {Math.round(payload[0].payload.userPoints)}</p>
        {data[0].groupAverage && (
          <p className="group">
            Group average: {Math.round(payload[0].payload.groupAverage.toFixed(1))}
          </p>
        )}
        {data[0].industryAverage && (
          <p className="industry">
            Industry average: {Math.round(payload[0].payload.industryAverage.toFixed(1))}
          </p>
        )}
        <p className="max">Max points: {Math.round(payload[0].payload.maxPoints)}</p>
      </div>
    )
  }

  return null
}

const TotalResultRadarChart = ({ data }) => (
  <>
    <ResultsTitle>Compare your results</ResultsTitle>
    <ResponsiveContainer id="RadarChartContainer" width="100%" height={450}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <Tooltip
          cursor={{ fill: 'transparent' }}
          content={<CustomTooltip />}
          data={data}
        />
        <PolarGrid />
        <PolarAngleAxis dataKey="name" fontSize='14px' />

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

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  </>
)

export default TotalResultRadarChart
