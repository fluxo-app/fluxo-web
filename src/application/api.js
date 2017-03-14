import fetch from 'isomorphic-fetch'

const handleError = (error) => {
  throw new Error(error)
}

const parseResponse = async (response) => {
  if (response && response.status === 401) {
    // eslint-disable-next-line
    throw {
      status: response.status,
      response: await response.json()
    }
  }
  if (response && response.ok) {
    try {
      // eslint-disable-next-line
      return {
        status: response.status,
        response: await response.json()
      }
    } catch (error) {
      return handleError({
        status: response.status,
        response: error
      })
    }
  }
  return handleError({
    status: response.status,
    response: response
  })
}

export default class api {
  constructor(url) {
    this.options = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    this.url = url
  }

  get = () => {
    this.options = {
      ...this.options,
      method: 'GET'
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
  }
}
