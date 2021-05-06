import axios from 'axios'
import { HOST } from './constants'

export const sendAnswers = async (answers, surveyId, groupId) => {
  const response = await axios.post(`${HOST}/api/answers`, {
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

export const checkGroupId = async (groupId) => {
  const response = await axios.get(`${HOST}/api/user-groups/${groupId}`)
  return response.data
}

export const submitEmail = async (
  token,
  email,
  createNewGroup,
  groupId,
  industryId
) => {
  const surveyId = 1
  const response = await axios.post(`${HOST}/api/answers/emailsubmit`, {
    email,
    token,
    createNewGroup,
    surveyId,
    groupId,
    industryId,
  })
  return response.data
}

export const getFullResults = async (token) => {
  const response = await axios.get(`${HOST}/api/results/${token}`)
  return response.data
}
