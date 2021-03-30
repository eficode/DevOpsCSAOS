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

// responsiveness TODO: make chart responsive (<800 px in mobile layout)
// the chart could be a horizontal bar chart?
const TotalResultChart = ({ data, renderMobileLayout }) => {
  if (renderMobileLayout) {
    return (
      <>
        <ResultsTitle>Compare your results</ResultsTitle>
        <ResponsiveContainer height={450} width="85%">
          <BarChart
            layout="vertical"
            width={500}
            height={850}
            data={data}
            margin={{
              top: 5,
              right: 15,
              left: 15,
              bottom: 5,
            }}
            barGap={6}
            barCategoryGap="10%"
          >
            <YAxis dataKey="name" type="category" />
            <XAxis type="number" hide />

            <Tooltip cursor={{ fill: 'transparent' }} />

            <Bar dataKey="userResult" name="Your result">
              {data.map((entry) => (
                <Cell
                  fill={getColor(entry.userResult, entry.maxCategoryResult)}
                  key={entry.categoryId}
                />
              ))}
            </Bar>

            <Bar
              dataKey="maxCategoryResult"
              fill="#148AB3"
              name="Peer average placeholder"
            />
            <Bar dataKey="maxCategoryResult" fill="#5cd175" name="Max" />
          </BarChart>
        </ResponsiveContainer>
      </>
    )
  }
  return (
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
              <Cell
                fill={getColor(entry.userResult, entry.maxCategoryResult)}
                key={entry.categoryId}
              />
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
}

export default TotalResultChart
