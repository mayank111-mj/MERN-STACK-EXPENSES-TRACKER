import { api } from './api'

export const transactionService = {
  getAll: (params) => api.get('/transactions', { params }),
  create: (payload) => api.post('/transactions', payload),
  remove: (id) => api.delete(`/transactions/${id}`),
}
