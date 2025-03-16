import apiClient from './AxiosClient'

export default {
  // getEvents() {
  //   return apiClient.get('/events')
  // },

  getEvents(pageNo: number, pageSize: number) {
    return apiClient.get('/events?pageNo=' + pageNo + '&pageSize=' + pageSize)
  },

  getEvent(id: number) {
    return apiClient.get(`/events/${id}`)
  },
}
