<script lang="ts" setup>
  import gsap from 'gsap';

  const isCreateTaskShown = ref(false);

  watch(
    () => isCreateTaskShown.value,
    (newValue) => {
      if (newValue) {
        gsap.fromTo(
          '#new-task-form',
          { x: '100%', opacity: 0, display: 'none' },
          { x: '0%', opacity: 1, display: 'grid', duration: 0.25 }
        )
      } else {
        gsap.to(
          '#new-task-form',
          { x: '100%', opacity: 0, display: 'none' },
        )
      }
    }
  )
</script>

<script lang="ts">
  export default {
    data() {
      return {
        createTaskForm: {
          taskName: '',
          taskDescription: ''
        }
      }
    },
    methods: {
      createTask(event: Event) {
        event.preventDefault();

        console.log(this.createTaskForm);
      }
    }
  }
</script>

<template>
    <header flex justify-between items-center px-4 py-2>
      <div>
        <h1 text-3xl font-sans>Xitomatl 🍅</h1>
        <p class="">A pomodoro compliant app</p>
      </div>
      <button
        @click="isCreateTaskShown = !isCreateTaskShown"
        flex
        items-center
        btn-rounded
        bg-primary
      >
        <Icon name='mdi:add' class="w-6 h-6" />
      </button>
    </header>
    <form :class="isCreateTaskShown ? 'grid' : 'hidden'" id="new-task-form" absolute right-0 grid gap-4 p-8 rounded-md shadow-lg>
      <div flex flex-col gap-2>
        <label for="task-name" font-sans font-semibold>Task Name</label>
        <input id="task-name" type="text" v-model="createTaskForm.taskName" px-2 py-1 border border-black rounded-md />
      </div>
      <div flex flex-col gap-2>
        <label for="task-description" font-sans font-semibold>Task Description</label>
        <textarea id="task-description" v-model="createTaskForm.taskDescription" p-2 border border-black rounded-md />
      </div>
      <button @click="createTask" type="submit" btn-outline w-full bg-primary hover:not-disabled:bg-primary-500>
        Create Task
      </button>
    </form>
    <slot />
</template>