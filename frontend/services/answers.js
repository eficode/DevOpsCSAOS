import axios from 'axios'
import { HOST } from './constants'

export const sendAnswers = async (email, answers) => {

  const response = await axios.post(`${HOST}/api/answers`, {
    email: email,
    answers, answers
  })
  return response.data
}
