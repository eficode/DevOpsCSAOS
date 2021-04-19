import axios from 'axios'
import { HOST } from './constants'

export const sendAnswers = async (email, answers, surveyId, groupId) => {
  const response = await axios.post(`${HOST}/api/answers`, {
    email,
    answers,
    surveyId,
    groupId,
  })
  return response.data
}

export const getAllQuestions = async (surveyId) => {
  const response = await axios.get(`${HOST}/api/questions/${surveyId}`)
  return response.data
}

export const sendResult = async (score) => {
  const response = await axios.post(`${HOST}/api/results`, {
    score,
  })
  return response.data
}

export const create = async (credentials) => {
  const response = await axios.post(`${HOST}/api/users`, credentials)
  return response.data
}

export const getIndustries = async () => {
  const response = await axios.get(`${HOST}/api/industries`)
  return response.data
}
