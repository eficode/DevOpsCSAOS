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

export const submitEmail = async (token, email) => {
  const response = await axios.post(`${HOST}/api/answers/emailsubmit`, {
    email,
    token,
  })
  return response.data
}

export default { sendAnswers, submitEmail }
