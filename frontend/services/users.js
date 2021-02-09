import axios from 'axios'
import { HOST } from './constants'

export const create = async (credentials) => {
  const response = await axios.post(`${HOST}/api/users`, credentials)
  return response.data
}

export default { create }
