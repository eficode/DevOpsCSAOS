import axios from 'axios'
import { HOST } from './constants'

export const getAll = async () => {
  const response = await axios.get(`${HOST}/api/questions`)
  return response.data
}

export default getAll
