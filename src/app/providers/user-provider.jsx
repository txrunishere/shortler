import { createContext, useContext, useEffect } from "react"
import { getCurrentUser } from "@/api/user.api"
import { useFetch } from "@/hooks/use-fetch"

const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const { data: user, fn: fnFetchUser, loading: userLoading } = useFetch(getCurrentUser)

  const isAuthenticated = user?.role === 'authenticated'

  useEffect(() => {
    fnFetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ isAuthenticated, user, userLoading, fnFetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
