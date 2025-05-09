<script setup lang="ts">
import { ref } from 'vue'
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
// import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const router = useRouter()
const messageStore = useMessageStore()
const validationSchema = yup.object({
  email: yup.string().required('The email is required').email('Input must be an email.'),
  password: yup
    .string()
    .required('The password is required')
    .min(6, 'The password must be at least 6 characters.'),
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
  },
})
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const onSubmit = handleSubmit(async (values: { email: string; password: string }) => {
  try {
    await authStore.login(values.email, values.password)
    router.push({ name: 'event-list-view' })
  } catch {
    messageStore.updateMessage('Could not login')
    setTimeout(() => {
      messageStore.resetMessage()
    }, 3000)
  }
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <InputText
              id="email"
              type="email"
              v-model="email"
              placeholder="Email address"
              :error="errors['email']"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <InputText
              type="password"
              v-model="password"
              placeholder="Password"
              :error="errors['password']"
              autocomplete="false"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Try to register here</a
        >
      </p>
    </div>
  </div>
</template>
