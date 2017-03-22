import fetch from 'isomorphic-fetch'
import {toastr} from 'react-redux-toastr'
import {SESSIONSTORAGE_JWT} from './constants'

const handleError = (error) => {
  const statusText = error && error.message ? error.message : error.response.statusText
  const status = error && error.status ? `status:${error.status} ` : ''
  const message = `${status}statusText:'${statusText}' url:${error.url}`

  toastr.error('Ooops something is wrong', message)
  throw new Error(message)
}

const parseResponse = async (response) => {
  if (response && response.status === 401) {
    // eslint-disable-next-line
    return {
      status: response.status,
      response: await response.json()
    }
  }
  if (response && response.ok) {
    // eslint-disable-next-line
    return {
      status: response.status,
      response: await response.json()
    }
  }
  // eslint-disable-next-line
  throw {
    status: response.status,
    response: response
  }
}

export default class api {
  constructor(url) {
    const jwt = sessionStorage.getItem(SESSIONSTORAGE_JWT)
    this.options = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }
    this.url = url
  }

  get = () => {
    this.options = {
      ...this.options,
      method: 'GET',
    }
    return this.exec()
  }

  post = (body) => {
    this.options = {
      ...this.options,
      method: 'POST',
      body: JSON.stringify(body)
    }
    return this.exec()
  }

  exec = () => {
    return fetch(this.url, this.options)
      .then(response => parseResponse(response))
      .catch(error => {
        handleError({...error, url: this.url, message: error.message, status: error.status})
      })
  }
}
