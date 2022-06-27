import { BASE_API_URL } from './constants'

// Basic functionality to check auth routes
export const authBase = async (endpoint, credentials) => {
    credentials.username = credentials.username.trim()
    const response = await fetch(`${BASE_API_URL}/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const parsed = await response.json()
    //declareUser(parsed.tempUser)
    console.log(parsed)
  
    return parsed
  }
export const signup = async credentials => {
    const response = await authBase('signup', credentials)
    return response
  }

  export const login = async credentials => {
    const response = await authBase('login', credentials)
    return response
  }

  
export const checkToken = async token => {
    const response = await fetch(`${BASE_API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const parsed = await response.json()
  
    return parsed
  }

  export const createNewDecision = async (decision, userId) =>{
    const response = await fetch(`${BASE_API_URL}/decision/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const parsed = await response.json()

    return parsed
  }