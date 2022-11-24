<script lang="ts" setup>
const props = defineProps<{
  message: string;
  is_error: boolean;
}>();

const emit = defineEmits(['success-modal-closed', 'error-modal-closed']);

function closeModal() {
  if (props.is_error) {
    emit('error-modal-closed');
  } else {
    emit('success-modal-closed');
  }
}
</script>

<template>
  <label for="responseModal" id="responseModalToggle" class="btn hidden"
    >open modal</label
  >

  <input type="checkbox" id="responseModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-error" v-if="props.is_error">Error</h3>
      <h3 class="font-bold text-lg text-success" v-else>Success</h3>

      <hr />
      <p class="pt-4">
        {{ props.message }}
      </p>
      <div class="modal-action">
        <label
          for="responseModal"
          class="btn"
          :class="{
            'btn-success': !is_error,
            'btn-error': is_error,
          }"
          @click="closeModal"
          >Ok</label
        >
      </div>
    </div>
  </div>
</template>
