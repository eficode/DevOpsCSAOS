import React, { PureComponent } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components'

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 60px 0 10px 0;
`

const TotalResultRadarChart = ({ data }) => {
  // map data to % out of maxes...
  const percentages = data.map((category) => ({
    userPerCentOutOfMax: category.userPoints / category.maxPoints,
    groupPerCentOutOfMax: category.groupAverage / category.maxPoints,
    industryPerCentOutOfMax: category.industryAverage / category.maxPoints,
    name: category.name,
  }))
  console.log(percentages)

  return (
    <>
      <ResultsTitle>Compare your results</ResultsTitle>
      <ResponsiveContainer id="RadarChartContainer" width="85%" height={450}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={percentages}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            name="Group average"
            dataKey="groupPerCentOutOfMax"
            stroke="#FFC200"
            fill="#FFC200"
            fillOpacity={0.6}
          />
          <Radar
            name="Industry average"
            dataKey="industryPerCentOutOfMax"
            stroke="#148AB3"
            fill="#148AB3"
            fillOpacity={0.6}
          />
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
}

export default TotalResultRadarChart
