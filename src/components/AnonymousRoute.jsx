import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

const AnonymousRoute = ({ children }) => {
  const { isAuthenticated } = useContext(SessionContext)

  if (isAuthenticated) {
    return <Navigate to='/decisions' />
  }

  return <>{children}</>
}

export default AnonymousRoute
