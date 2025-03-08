<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import type { Event } from '@/types'

interface EventResponse {
  data: Event[]
}
interface Props {
  page: number
}

const events = ref<Event[]>([])
const totalEvents = ref(0)
const props = defineProps<Props>()
const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

watchEffect(() => {
  EventService.getEvents(page.value, 2)
    .then((response) => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error', error)
    })
})
EventService.getEvents(page.value, 2).then((response) => {
  events.value = response.data
})

// EventService.getEvents().then((response: EventResponse) => {
//   events.value = response.data
// })
</script>

<template>
  <h1>Events For Good</h1>

  <div class="events">
    <!-- <div v-if="events.length === 0">No events</div>
    <div v-else-if="events.length === 1">Only one event</div>
    <div v-else>
      <EventCard v-for="event in events" :key="event.id" />
    </div> -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
