<script setup lang="ts">
import { ref } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import type { Event } from '@/types'

interface EventResponse {
  data: Event[]
}
const events = ref<Event[]>([])
EventService.getEvents().then((response: EventResponse) => {
  events.value = response.data
})
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
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
