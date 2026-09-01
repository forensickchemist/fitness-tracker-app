import { defineStore } from 'pinia'
import { apiRequest } from '../services/api.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async register(email, password) {
      return await apiRequest('/users/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })
    },

    async login(email, password) {
      const data = await apiRequest('/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      this.accessToken = data.access
      localStorage.setItem('accessToken', data.access)

      await this.getUserDetails()

      return data
    },

    async getUserDetails() {
      const data = await apiRequest('/users/details')

      this.user = data.user

      return data.user
    },

    logout() {
      this.accessToken = null
      this.user = null

      localStorage.removeItem('accessToken')
    },
  },
})
