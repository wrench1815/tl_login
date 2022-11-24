<script lang="ts" setup></script>

<template>
  <div class="relative min-h-screen flex">
    <div
      class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white"
    >
      <div
        class="sm:w-1/2 xl:w-3/5 h-full w-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden relative"
      >
        <div class="absolute top-0 bottom-0 left-0 right-0">
          <img
            class="w-full h-full object-cover"
            src="@/assets/image/pawel-czerwinski-7FqOISWr5V0-unsplash.jpg"
            alt="render"
          />
        </div>
        <div class="absolute backdrop-blur-sm inset-0 z-10"></div>
      </div>
      <div
        class="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-base-100"
      >
        <div class="max-w-md w-full space-y-8">
          <div class="text-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">Log In</h2>
            <p class="mt-2 text-sm text-gray-500">
              Use Email and Password to log in to your account
            </p>
          </div>

          <div class="flex items-center justify-center space-x-2">
            <span class="h-px w-16 bg-primary"></span>
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
