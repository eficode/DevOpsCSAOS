import axios from 'axios'
import { publicRuntimeConfig } from './constants'

const {API_URL} = publicRuntimeConfig

export const sendAnswers = async (answers, surveyId, groupId, selections) => {
  const response = await axios.post(`${API_URL}/answers`, {
    answers,
    surveyId,
    groupId,
    selections
  })
  return response.data
}

export const getAllQuestions = async (surveyId) => {
  const response = await axios.get(`${API_URL}/questions/${surveyId}`)
  return response.data
}

export const sendResult = async (score) => {
  const response = await axios.post(`${API_URL}/results`, {
    score,
  })
  return response.data
}

export const create = async (credentials) => {
  const response = await axios.post(`${API_URL}/users`, credentials)
  return response.data
}

export const getIndustries = async () => {
  const response = await axios.get(`${API_URL}/industries`)
  return response.data
}

export const checkGroupId = async (groupId) => {
  const response = await axios.get(`${API_URL}/user-groups/validate/${groupId}`)
  return response.data
}

export const getBaseUrl = async () => {
  const response = await axios.get(`${API_URL}/helpers/get-location`)
  return response.data
}

export const getRolesAndChallenges = async () => {
  const response = await axios.get(`${API_URL}/helpers/get-roles-and-challenges`)
  return response.data
}

export const submitEmail = async (
  token,
  email,
  createNewGroup,
  groupId,
  industryId,
  userQuestionAnswerPairs
) => {
  const surveyId = 1
  const response = await axios.post(`${API_URL}/answers/emailsubmit`, {
    email,
    token,
    createNewGroup,
    surveyId,
    groupId,
    industryId,
    userQuestionAnswerPairs,
  })
  return response.data
}

export const getFullResults = async (token) => {
  const response = await axios.get(`${API_URL}/results/${token}`)
  return response.data
}
