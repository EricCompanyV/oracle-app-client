import { BASE_API_URL } from './constants'

export const authBase = async (endpoint, credentials) => {
    console.log(credentials)
    const response = await fetch(`${BASE_API_URL}/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const parsed = await response.json()
  
    return parsed
  }
export const signup = async credentials => {
    const response = await authBase('signup', credentials)
    return response
  }