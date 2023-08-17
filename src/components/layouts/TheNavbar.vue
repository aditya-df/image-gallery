<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-end justify-between mx-auto p-4">
      <a href="https://flowbite.com/" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Image Gallery</span
        >
      </a>
      <img src="/logo-era_daya.png" class="h-12" alt="Flowbite Logo" />
      <div class="flex md:order-2">
        <button
          type="button"
          @click="$emit('buttonHandler')"
          class="text-white bg-primary-700 hover:bg-primary-800 transition duration-300 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Unggah Foto
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style></style>
