import { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from './components/Layout/ProtectedRoute/ProtectedRoute'
import Loading from './components/UI/Loading/Loading'
import useAuth from "./hooks/useAuth"
import useTelegram from "./hooks/useTelegram"
import AddBook from "./pages/AddBook/AddBook"
import Auth from "./pages/Auth/Auth"
import Book from "./pages/Book/Book"
import Classmates from "./pages/Classmates/Classmates"
import Home from './pages/Home/Home'
import Me from "./pages/Me/Me"
import MyBooks from "./pages/MyBooks/MyBooks"
import Start from './pages/Start/Start'
import Top from "./pages/Top/Top"
import UserBooks from "./pages/UserBooks/UserBooks"
import UserProfile from "./pages/UserProfile/UserProfile"

function App() {
  const location = useLocation()
  const previousLocation = location.state?.previousLocation
  const { isWebApp, isLoading: isTelegramLoading } = useTelegram()
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const navigate = useNavigate()

  const isLoading = isTelegramLoading || isAuthLoading

  useEffect(() => {
    if (!isLoading && isAuthenticated && (location.pathname === '/start' || location.pathname === '/auth')) {
        navigate('/', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname, isWebApp])

  if (isLoading) {
    return <Loading />
  }

  if (!isWebApp && location.pathname === '/start') {
    return <Start />
  }

  return (
    <Routes location={previousLocation || location}>
      <Route path="/start" element={<Start />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={<Layout />}>
        <Route index element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/start">
            <Home />
          </ProtectedRoute>
        } />
        <Route path="mybooks" element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <MyBooks />
          </ProtectedRoute>
        } />
        <Route path="mybooks/add" element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <AddBook />
          </ProtectedRoute>
        } />
        <Route path="top" element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Top />
          </ProtectedRoute>
        } />
        <Route path="classmates" element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Classmates />
          </ProtectedRoute>
        } />
        <Route path="me" element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <Me />
          </ProtectedRoute>
        } />
        <Route path="users/">
          <Route path=":userId" element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path=":userId/books" element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <UserBooks />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="books/">
          <Route path=":id" element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <Book />
            </ProtectedRoute>
          } />
        </Route>
      </Route>
    </Routes>
  )
}

export default App