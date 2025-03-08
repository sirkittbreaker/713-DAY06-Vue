<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const event = ref<Event>()
const props = defineProps<{ id: string }>()
const id = Number(props.id)
const router = useRouter()

EventService.getEvent(id)
  .then((response) => {
    event.value = response.data
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource-view', params: { resource: 'event' } })
    } else {
      router.push({ name: 'network-error-view' })
    }
    // console.error('There was an error!', error)
    // router.push({ name: '404-resource-view', params: { resource: 'event' } })
  })
</script>
<template>
  <div>
    <div v-if="event">
      <h1>{{ event.title }}</h1>
      <nav>
        <router-link :to="{ name: 'event-detail-view', params: { id } }">Details</router-link>
        |
        <router-link :to="{ name: 'event-register-view', params: { id } }">Register</router-link>
        |
        <router-link :to="{ name: 'event-edit-view', params: { id } }">Edit</router-link>
      </nav>
      <router-view :event="event"></router-view>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
