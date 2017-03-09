import fetch from 'isomorphic-fetch'

const handleError = (error) => {
  throw new Error(error.message)
}

const parseResponse = async (response) => {
  if (response && response.status === 401) {
    // eslint-disable-next-line
    throw await response.json()
  }
  if (response && response.ok) {
    try {
      return response.json()
    } catch (error) {
      return handleError(error)
    }
  }
  return handleError({message: response})
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
