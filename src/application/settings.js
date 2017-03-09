export const getResourceUrl = (action) => {
  const apiEndPoint = window.location.href.indexOf('localhost') === -1 ? 'https://fluxo-api.herokuapp.com' : 'http://localhost:3100'
  return action.payload.isDemo ? `${apiEndPoint}/fake` : `${apiEndPoint}/api`
}

export const getRedirectUrl = (signInUrl) => {
  return `${signInUrl}/?action=${window.location.origin}/configure`
}
