<script setup>
import { computed, onMounted, ref } from 'vue'
import { ToastFailed } from '@/helper/services/toast'
import { useImageStore } from './stores/images'

import TheNavbar from './components/layouts/TheNavbar.vue'
import { storeToRefs } from 'pinia'

const dropzoneFile = ref(null)
const imageFile = ref()
const imagePreview = ref()
const { images } = storeToRefs(useImageStore())

const arr = computed(() => {
  let arr = [[], [], [], []]
  const chunkSize = Math.ceil(images.value.length / 4)

  for (let i = 0; i < images.value.length; i++) {
    const subArrayIndex = Math.floor(i / chunkSize)
    arr[subArrayIndex].push(images.value[i])
  }

  return arr
})

onMounted(() => {
  useImageStore().fetchImages()
})

const inputHandler = (e) => {
  var files = e.target.files || e.dataTransfer.files
  const file = e.target.files[0]
  if (!files.length) return

  const allowedExtensions = ['jpg', 'jpeg', 'bmp', 'png', 'gif']
  const fileExtension = file.name.split('.').pop().toLowerCase()
  const maxSize = 2 * 1024 * 1024 // 2MB in bytes

  if (file && allowedExtensions.includes(fileExtension) && file.size <= maxSize) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(imageFile.value)
  } else if (file.size > maxSize) {
    ToastFailed.fire({
      icon: 'error',
      title: 'File gambar terlalu besar'
    })
  } else {
    ToastFailed.fire({
      icon: 'error',
      title: 'Hanya boleh file gambar'
    })
  }
}

const clearImage = () => {
  imageFile.value = null
  imagePreview.value = null
}

const submitImage = async () => {
  if (imageFile.value) {
    await useImageStore().uploadImages(imageFile.value)
    clearImage()
  } else {
    ToastFailed.fire({
      icon: 'error',
      title: 'Silahkan pilih gambar terlebih dahulu'
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <the-navbar @button-handler="() => dropzoneFile.click()" />
    <main
      class="flex-grow w-full max-w-screen-xl px-4 mx-auto flex flex-col items-center space-y-12 my-4"
    >
      <form class="max-w-screen-sm w-full" @submit.prevent="submitImage">
        <h1 class="text-xl font-semibold text-primary">Ayo mulai unggah fotomu</h1>
        <p class="text-gray-500 mb-4">
          Tambahkan sentuhan pribadi Anda dengan mengunggah gambar di sini.
        </p>
        <label
          v-if="!imagePreview"
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .bmp, .png, .gif"
            ref="dropzoneFile"
            @change="inputHandler"
          />
        </label>
        <div v-else class="relative">
          <button
            @click="clearImage"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-secondary-500/30 hover:bg-secondary-500/50 transition rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
              <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
          <img :src="imagePreview" alt="" class="w-full" />
        </div>
        <button
          type="submit"
          :class="
            imageFile
              ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br shadow-lg shadow-primary-500/50 dark:shadow-lg dark:shadow-primary-800/80'
              : 'bg-gray-400'
          "
          class="w-full mt-4 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Kirim
        </button>
      </form>

      <section class="grid grid-cols-2 md:grid-cols-4 gap-4" v-if="images.length > 0">
        <div class="grid gap-4" v-for="(list, index) in arr" :key="index">
          <div v-for="(image, index) in list" :key="index">
            <img class="h-full object-cover max-w-full rounded-lg" :src="image" alt="" />
          </div>
        </div>
      </section>

      <section class="grid grid-cols-2 md:grid-cols-4 gap-4" v-else>
        <div class="grid gap-4">
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-full max-w-full rounded-lg bg-gray-200" alt="" />
          </div>
        </div>
        <div class="grid gap-4">
          <div>
            <div class="h-64 w-44 lg:w-60 xl:w-80 rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-32 w-44 lg:w-60 xl:w-80 rounded-lg bg-gray-200" alt="" />
          </div>
          <div>
            <div class="h-80 w-44 lg:w-60 xl:w-80 rounded-lg bg-gray-200" alt="" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style></style>
