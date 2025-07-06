<script setup lang="ts">
import CreateTaskDialog from '../components/create-task-dialog/CreateTaskDialog.vue';

const isCreateTaskDialogShown = ref(false);

const toggleCreateTaskDialogVisibility = () => {
  isCreateTaskDialogShown.value = !isCreateTaskDialogShown.value
}
</script>

<template>
  <header relative flex justify-between items-center px-4 py-2>
    <div>
      <h1 text-3xl font-sans>Xitomatl 🍅</h1>
      <p class="">A pomodoro compliant app</p>
    </div>
    <button
      @click="toggleCreateTaskDialogVisibility"
      flex
      items-center
      btn-rounded
      bg-primary
    >
      <Icon name='mdi:add' class="w-6 h-6" />
    </button>
    <CreateTaskDialog :is-shown="isCreateTaskDialogShown" />
  </header>
  <slot />
</template>