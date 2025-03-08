<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
const store = useEventStore()
const { event } = storeToRefs(store)
const props = defineProps<{ id: string }>()
</script>

<template>
  <div>
    <div v-if="event">
      <h1>{{ event.title }}</h1>
      <nav>
        <router-link :to="{ name: 'event-detail-view', params: { id: props.id } }"
          >Details</router-link
        >
        |
        <router-link :to="{ name: 'event-register-view', params: { id: props.id } }"
          >Register</router-link
        >
        |
        <router-link :to="{ name: 'event-edit-view', params: { id: props.id } }">Edit</router-link>
      </nav>
      <router-view :event="event"></router-view>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
