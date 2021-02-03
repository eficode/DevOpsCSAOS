import React from 'react'
import Question from '../survey/questions/[questionId]'
import { render } from 'enzyme'
import { useRouter } from 'next/router'

describe('Question', () => {
  
  jest.mock('next/router', () => ({
    useRouter() {
      return {
        route: '',
        pathname: '',
        query: '',
        asPath: '' 
      }
    }
  }));

  const questions = [
    {
      uuid: '0',
      text: 'Oletko ruisleipä?',
      weight: 0.8,
      categoryId: 1,
      createdAt: '2021-02-03T07:34:56.445Z',
      updatedAt: '2021-02-03T07:34:56.445Z',
      Category: { name: 'Jauhot' }
    }
  ]

  const useRouter = jest.spyOn(require("next/router"), "useRouter")

  it('Question is rendered',() => {

    useRouter.mockImplementationOnce(() => ({
      route: '/survey/questions/1',
      pathname: 'survey/questions/1',
      query: { questions },
      asPath: ''
    }))
    const component = render(<Question questions={questions} />)
    expect(component.text()).toContain('Dev Ops Assesment Tool')
  })
  
})

