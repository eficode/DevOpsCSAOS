import axios from 'axios'
import { HOST } from './constants'

export const checkGroupId = async (groupId) => {
  const response = await axios.get(`${HOST}/api/user-groups/${groupId}`)
  return response.data
}

export default { checkGroupId }
