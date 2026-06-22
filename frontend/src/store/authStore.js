import { create } from 'zustand'
import api from '../api/axios'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true while we check auth on app load

  checkAuth: async () => {
    try {
      const res = await api.post('/users/profile')
      set({ user: res.data, isAuthenticated: true, isLoading: false })
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  setUser: (user) => set({ user, isAuthenticated: true }),

  logout: async () => {
    try {
      await api.post('/users/logout')
    } catch (err) {
      console.error('Logout failed', err)
    }
    set({ user: null, isAuthenticated: false })
  }
}))

export default useAuthStore;