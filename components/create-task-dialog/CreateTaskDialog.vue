<script lang="ts" setup>
import { watch } from 'vue';
import { taskSchema, type Task } from '~/models/Task';

interface CreateTaskDialogProps {
  /**
   * Whether the dialog is shown or not.
   */
  isShown: boolean;
}

interface CreateTaskDialogEmits {
  /**
   * Emitted when a task is created.
   */
  (e: 'created', task: Task): void;
}

const props = defineProps<CreateTaskDialogProps>();

const emit = defineEmits<CreateTaskDialogEmits>();

const form = ref<Task>({
  name: '',
  description: undefined
})
const formErrors = ref<Record<string, string>>({});
const isCreateBtnDisabled = ref(true);

watch(
  form,
  (value) => {
    formErrors.value = {};

    const parseResult = taskSchema.safeParse(value);

    parseResult.error?.issues.forEach(({ path, message }) => {
      const property = (path as string[]).join('.');

      formErrors.value[property] = message;
    })

    isCreateBtnDisabled.value = !parseResult.success;
  },
  {
    deep: true
  }
)

const createTaskHandler = () => {
  console.log(form.value);

  emit('created', form.value);
}
</script>

<template>
  <form @submit.prevent="createTaskHandler" :class="props.isShown ? 'grid' : 'hidden'" absolute top-full right-0 w-xs gap-4 p-8 rounded-md shadow-lg>
    <div class="form-item" flex flex-col>
      <label for="task-name" font-sans font-semibold mb-2>Task Name<span ms-1>*</span></label>
      <input id="task-name" type="text" v-model="form.name" px-2 py-1 mb-2 border border-black rounded-md />
      <transition name="grow">
        <p v-if="formErrors.name" text-sm>{{ formErrors.name }}</p>
      </transition>
    </div>
    <div class="form-item" flex flex-col>
      <label for="task-description" font-sans font-semibold>Task Description</label>
      <textarea id="task-description" v-model="form.description" p-2 border border-black rounded-md />
      <transition name="grow">
        <p v-if="formErrors.description" text-sm text-slate-7>{{ formErrors.description }}</p>
      </transition>
    </div>
    <button :disabled="isCreateBtnDisabled" type="submit" btn-outline w-full bg-primary hover:not-disabled:bg-primary-500>
      Create Task
    </button>
  </form>
</template>

<style lang="css" scoped>
.form-item > *:not(:last-child) {
  margin-bottom: 0.5rem;
}

.grow-enter-active, .grow-leave-active {
  transition: max-height 0.25s ease, opacity 0.25s ease;
  max-height: 128px;
}

.grow-enter-from, .grow-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>