import axios from 'axios'
import { HOST } from './constants'

export const getAll = async (surveyId) => {
  const response = await axios.get(`${HOST}/api/questions/${surveyId}`)

  return response.data
}

export default getAll
