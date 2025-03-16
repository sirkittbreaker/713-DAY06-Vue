import { defineStore } from 'pinia'
import axios from 'axios'
import apiClient from '@/services/AxiosClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    async login(email: string, password: string) {
      const response = await apiClient.post('/api/v1/auth/authenticate', {
        username: email,
        password: password,
      })
      this.token = response.data.access_token
      localStorage.setItem('token', this.token as string)
      return response
    },
  },
})
