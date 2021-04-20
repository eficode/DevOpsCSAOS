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

export const submitEmail = async (token, email, createNewGroup, groupId) => {
  const surveyId = 1
  const response = await axios.post(`${HOST}/api/answers/emailsubmit`, {
    email,
    token,
    createNewGroup,
    surveyId,
    groupId,
  })
  return response.data
}

export default { sendAnswers, submitEmail }
