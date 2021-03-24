import React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const ResultsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Merriweather;
  margin: 60px 0 10px 0;
`
const segmentColors = [
  '#ff5900',
  '#ffa200',
  '#FFC200',
  '#FFD700',
  '#c1db6b',
  '#9edb6b',
  '#5cd175',
]
function getColor(userResult, maxResult) {
  const percentage = userResult / maxResult
  console.log(percentage)

  if (percentage <= 0.142) {
    return segmentColors[0]
  }
  if (percentage <= 0.284) {
    return segmentColors[1]
  }
  if (percentage <= 0.426) {
    return segmentColors[2]
  }
  if (percentage <= 0.568) {
    return segmentColors[3]
  }
  if (percentage <= 0.691) {
    return segmentColors[4]
  }
  if (percentage <= 0.833) {
    return segmentColors[5]
  }
  if (percentage <= 1) {
    return segmentColors[6]
  }
  return 'FFFFFF'
}
const TotalResultChart = ({ data }) => (
  <>
    <ResultsTitle>Compare your results</ResultsTitle>
    <ResponsiveContainer height={450} width="70%">
      <BarChart
        width={850}
        height={500}
        data={data}
        margin={{
          top: 40,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        barGap={8}
      >
        <XAxis dataKey="name" />
        <Tooltip cursor={{ fill: 'transparent' }} />

        <Bar dataKey="userResult" barSize={30} name="Your result">
          {data.map((entry) => (
            <Cell fill={getColor(entry.userResult, entry.maxCategoryResult)} />
          ))}
        </Bar>

        <Bar
          dataKey="maxCategoryResult"
          fill="#148AB3"
          barSize={30}
          name="Peer average placeholder"
        />
        <Bar
          dataKey="maxCategoryResult"
          barSize={30}
          fill="#5cd175"
          name="Max"
        />
      </BarChart>
    </ResponsiveContainer>
  </>
)
export default TotalResultChart
