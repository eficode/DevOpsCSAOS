import axios from 'axios'
import { HOST } from './constants'

export const sendAnswers = async (email, answers, surveyId) => {
  const response = await axios.post(`${HOST}/api/answers`, {
    email,
    answers,
    surveyId,
  })
  return response.data
}
