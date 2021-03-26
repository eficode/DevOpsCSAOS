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

const percentageTopLimitsOfColors = [
  0.142,
  0.284,
  0.426,
  0.568,
  0.691,
  0.833,
  1,
]

// findIndex returns index of first item in array to satisfy criterion given
const getColor = (userResult, maxResult) =>
  segmentColors[
    percentageTopLimitsOfColors.findIndex(
      (limit) => userResult / maxResult <= limit
    )
  ]

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

        <Bar dataKey="userPoints" barSize={30} name="Your result">
          {data.map((entry) => (
            <Cell
              fill={getColor(entry.userResult, entry.maxCategoryResult)}
              key={entry.categoryId}
            />
          ))}
        </Bar>

        <Bar
          dataKey="maxPoints"
          fill="#148AB3"
          barSize={30}
          name="Peer average placeholder"
        />
        <Bar dataKey="maxPoints" barSize={30} fill="#5cd175" name="Max" />
      </BarChart>
    </ResponsiveContainer>
  </>
)
export default TotalResultChart
