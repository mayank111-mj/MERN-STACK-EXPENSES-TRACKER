import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { authService } from '../services/authService'
import { AuthContext } from './auth-context'

const TOKEN_KEY = 'token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }, [])

  const loadProfile = useCallback(async () => {
    const { data } = await authService.getProfile()
    setUser({
      username: data.username,
      email: data.email,
    })
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        setInitializing(false)
        return
      }
      try {
        await loadProfile()
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setInitializing(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [loadProfile])

  const login = useCallback(async (email, password) => {
    const { data } = await authService.login({ email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser({
      username: data.username,
      email: data.email,
      id: data.id,
    })
    return data
  }, [])

  const register = useCallback(async (username, email, password) => {
    const { data } = await authService.register({ username, email, password })
    return data
  }, [])

  const value = useMemo(
    () => ({
      user,
      initializing,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      loadProfile,
    }),
    [user, initializing, login, register, logout, loadProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
