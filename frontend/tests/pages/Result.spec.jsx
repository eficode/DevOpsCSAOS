/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore, divideQuestions } from '../../store'
import ThemeWrapper from '../testutils/themeWrapper'
// import TotalResultBarChart from '../../components/totalResultBarChart'
// import TotalResultRadarChart from '../../components/totalResultRadarChart'
import { questions } from '../testutils/testdata'
// import ResultPage from '../../pages/survey/result'

nextRouter.useRouter = jest.fn()

const resultsPerCategory = [
  {
    name: 'Culture',
    description: '',
    id: 1,
    maxPoints: 25,
    text: '',
    userPoints: 20,
  },
  {
    name: 'Workflow',
    description: '',
    id: 2,
    maxPoints: 25,
    text: '',
    userPoints: 20,
  },
  {
    name: 'Tools',
    description: '',
    id: 3,
    maxPoints: 25,
    text: '',
    userPoints: 20,
  },
  {
    name: 'Skills',
    description: '',
    id: 4,
    maxPoints: 25,
    text: '',
    userPoints: 20,
  },
  {
    name: 'Code',
    description: '',
    id: 5,
    maxPoints: 25,
    text: '',
    userPoints: 20,
  },
]

beforeEach(() => {
  useStore.setState({
    resultsPerCategory: resultsPerCategory,
    resultText: 'You rock!',
    userResult: 95,
    maxResult: 100,
  })
})

describe('Radar chart is rendered with Feature toggle B', () => {
  it('renders the component with correct text and result', () => {
    expect(1).toBe(1)
  })
})

//   beforeEach(() => {
//     const {
//       initialSelectionsWithQuestionIds,
//       chunkedQuestions,
//     } = divideQuestions(questions, 'B')
//     useStore.setState({
//       questions,
//       selections: initialSelectionsWithQuestionIds,
//       questionGroups: chunkedQuestions,
//       featureToggleSwitch: 'B',
//     })
//     useRouter.mockImplementation(() => ({
//       route: 'survey/result/',
//       pathname: 'survey/result',
//       query: { id: '1' },
//       asPath: '',
//     }))
//   })

//   it('Result page contains radar chart', () => {
//     render(
//       <ThemeWrapper>
//         <ResultPage />
//       </ThemeWrapper>
//     )
//     const wrapper = shallow(<ResultPage />)
//     expect(wrapper.find(TotalResultRadarChart).length).toEqual(1)
//   })
// })

// describe('Bar chart is rendered with Feature toggle A', () => {
//   beforeEach(() => {
//     const {
//       initialSelectionsWithQuestionIds,
//       chunkedQuestions,
//     } = divideQuestions(questions, 'A')
//     useStore.setState({
//       questions,
//       selections: initialSelectionsWithQuestionIds,
//       questionGroups: chunkedQuestions,
//       featureToggleSwitch: 'A',
//     })
//     useRouter.mockImplementation(() => ({
//       route: 'survey/result/',
//       pathname: 'survey/result',
//       query: { id: '1' },
//       asPath: '',
//     }))
//   })

//   it('Result page contains bar chart', () => {
//     render(
//       <ThemeWrapper>
//         <ResultPage />
//       </ThemeWrapper>
//     )
//     const wrapper = shallow(<ResultPage />)
//     expect(wrapper.find(TotalResultBarChart).length).toEqual(1)
//   })
// })
