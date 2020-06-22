import config from '../config'
import TokenService from './token-service'

export default {
  getAllData() {
    let error
    return fetch(`${config.API_ENDPOINT}/language`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => {
      if (!res.ok) error = { code: res.status};
      return res.json()
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data
    })
  }
}