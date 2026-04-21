import { api } from './api'

export const authService = {
  register: (payload) => api.post('/users/register', payload),
  login: (payload) => api.post('/users/login', payload),
  getProfile: () => api.get('/users/profile'),
}
