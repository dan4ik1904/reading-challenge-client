// components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRouteProps {
  isAllowed: boolean
  redirectPath?: string
  children: React.ReactNode
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/start',
  children
}: ProtectedRouteProps) => {
  const location = useLocation()

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute