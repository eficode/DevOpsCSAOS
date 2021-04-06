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
  return (
    <>
      <ResultsTitle>Compare your results</ResultsTitle>
      <ResponsiveContainer width="85%" height={450}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} />
          <Radar
            name="Peer points placeholder"
            dataKey="maxPoints"
            stroke="#FFC200"
            fill="#FFC200"
            fillOpacity={0.6}
          />
          <Radar
            name="Max points"
            dataKey="maxPoints"
            stroke="#9edb6b"
            fill="#9edb6b"
            fillOpacity={0.6}
          />
          <Radar
            name="Your points"
            dataKey="userPoints"
            stroke="#ff5900"
            fill="#ff5900"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  )
}

export default TotalResultRadarChart
