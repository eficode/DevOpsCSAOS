import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components'

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 60px 0 10px 0;
`

const TotalResultRadarChart = ({ data }) => (
  <>
    <ResultsTitle>Compare your results</ResultsTitle>
    <ResponsiveContainer id="RadarChartContainer" width="85%" height={450}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        {data[0].groupAverage && (
          <Radar
            name="Group average"
            dataKey="groupPerCentOutOfMax"
            stroke="#FFC200"
            fill="#FFC200"
            fillOpacity={0.6}
          />
        )}

        {data[0].industryAverage && (
          <Radar
            name="Industry average"
            dataKey="industryPerCentOutOfMax"
            stroke="#148AB3"
            fill="#148AB3"
            fillOpacity={0.6}
          />
        )}

        <Radar
          name="Your points"
          dataKey="userPerCentOutOfMax"
          stroke="#76b500"
          fill="#76b500"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  </>
)

export default TotalResultRadarChart
