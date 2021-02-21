import axios from 'axios'
import { HOST } from './constants'

export const sendResult = async (score) => {
  const response = await axios.post(`${HOST}/api/results`, {
    score,
  })
  return response.data
}

export default sendResult
