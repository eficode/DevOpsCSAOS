/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { useStore } from '../../store'
import ThemeWrapper from '../testutils/themeWrapper'
//import TotalResultsPage from '../../pages/survey/total_results'
import {
  detailedResults,
  detailedResultsWithoutIndustryAverage,
  detailedResultsWithoutGroupAverage,
} from '../testutils/testdata'

nextRouter.useRouter = jest.fn()

describe('Category-based result texts', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/total_results/',
      pathname: 'survey/total_results/',
      asPath: '',
    }))

    useStore.setState({
      results: {
        detailedResults,
      },
    })
  })

  it('Page is rendered', () => {})

  it('Category name, points and a result text is rendered for each category', () => {})
})

describe('Chart rendering', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: 'survey/total_results/',
      pathname: 'survey/total_results/',
      asPath: '',
    }))
  })

  describe('Toggle A', () => {
    useStore.setState({
      featureToggleSwitch: 'A',
    })

    it('When both group and industry averages exist, charts render all scores', () => {
      useStore.setState({
        results: {
          detailedResults,
        },
      })
    })

    it('When industry average does not exist, chart only renders user and group bars and scores in tooltip', () => {
      useStore.setState({
        detailedResultsWithoutIndustryAverage,
      })
    })

    it('When industry average does not exist, chart only renders industry and group bars and scores in tooltip', () => {
      useStore.setState({
        detailedResultsWithoutGroupAverage,
      })
    })
  })

  describe('Toggle B', () => {
    useStore.setState({
      featureToggleSwitch: 'B',
    })

    it('When both group and industry averages exist, charts render all scores', () => {
      useStore.setState({
        detailedResults,
      })
    })

    it('When industry average does not exist, chart only renders user and group scores', () => {
      useStore.setState({
        detailedResultsWithoutIndustryAverage,
      })
    })

    it('When industry average does not exist, chart only renders industry and group scores', () => {
      useStore.setState({
        detailedResultsWithoutGroupAverage,
      })
    })
  })
})
