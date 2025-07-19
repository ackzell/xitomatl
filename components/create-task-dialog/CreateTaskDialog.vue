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
  /**
   * Emitted when the dialog is closed
   */
  (e: 'closed'): void;
}

const props = defineProps<CreateTaskDialogProps>();
const emit = defineEmits<CreateTaskDialogEmits>();
const dialogElement = useTemplateRef<HTMLElement>('dialog-container');

const form = ref<Task>({
  name: '',
  description: undefined,
});
const formErrors = ref<Record<string, string>>({});
const isCreateBtnDisabled = ref(true);

onClickOutside(dialogElement, () => emit('closed'));

watch(
  form,
  (value) => {
    formErrors.value = {};

    const parseResult = taskSchema.safeParse(value);

    parseResult.error?.issues.forEach(({ path, message }) => {
      const property = (path as string[]).join('.');

      formErrors.value[property] = message;
    });

    isCreateBtnDisabled.value = !parseResult.success;
  },
  {
    deep: true,
  },
);

const createTaskHandler = () => {
  console.log(form.value);

  emit('created', form.value);
};
</script>

<template>
  <transition name="slide">
    <div
      v-if="props.isShown"
      ref="dialog-container"
      absolute
      top-0
      right-0
      min-h-dvh
      w-xs
      space-y-4xl
      p-8
      rounded-l-md
      bg-primary-700
      text-white
      overflow-hidden
    >
      <div
        flex
        justify-between
        items-center
      >
        <h2
          flex-shrink-0
          text-lg
          font-sans
          font-bold
        >
          New Activity
        </h2>
        <button
          flex
          justify-center
          items-center
          bg-transparent
          @click="emit('closed')"
        >
          <Icon
            name="mdi:close"
            h-6
            w-6
            hover:scale-125
            transition-transform
            cursor-pointer
          />
        </button>
      </div>
      <form
        grid
        gap-4
        @submit.prevent="createTaskHandler"
      >
        <div
          class="form-item"
          flex
          flex-col
        >
          <label
            for="task-name"
            text-sm
            font-sans
            font-semibold
            mb-2
          >Task Name<span ms-1>*</span></label>
          <input
            id="task-name"
            v-model="form.name"
            type="text"
            px-2
            py-1
            rounded-md
            bg-primary-800
            focus:outline-none
            caret-accent
          >
          <transition name="grow">
            <p
              v-if="formErrors.name"
              text-sm
            >
              {{ formErrors.name }}
            </p>
          </transition>
        </div>
        <div
          class="form-item"
          flex
          flex-col
        >
          <label
            for="task-description"
            text-sm
            font-sans
            font-semibold
          >Task Description</label>
          <textarea
            id="task-description"
            v-model="form.description"
            rows="4"
            p-2
            rounded-md
            bg-primary-800
            focus:outline-none
            caret-accent
          />
          <transition name="grow">
            <p
              v-if="formErrors.description"
              text-sm
              text-slate-7
            >
              {{ formErrors.description }}
            </p>
          </transition>
        </div>
        <button
          :disabled="isCreateBtnDisabled"
          type="submit"
          py-2
          px-4
          rounded-md
          bg-primary
        >
          Create Task
        </button>
      </form>
    </div>
  </transition>
</template>

<style lang="css" scoped>
.slide-enter-active, .slide-leave-active {
  transition: width 250ms, opacity 250ms;
}
.slide-enter-from, .slide-leave-to {
  width: 0;
  opacity: 0;
}

.form-item > *:not(:last-child) {
  margin-bottom: 0.5rem;
}

.grow-enter-active, .grow-leave-active {
  transition: max-height 250ms, opacity 250ms;
  max-height: 128px;
}
.grow-enter-from, .grow-leave-to {
  max-height: 0;
  opacity: 0;
}

input::selection, textarea::selection {
  background-color: #B1CC34AA;
}

button[type="submit"] {
  border: 2px solid;
  border-color: #B1CC34AA;
  transition: scale 250ms, border-color 250ms, background-color 250ms, opacity 250ms;

  &:disabled {
    border-color: transparent;
    background-color: #a4a4a4;
    opacity: 50%;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    scale: 105%;
    border-color: #B1CC34;
    background-color: #dc2626;
  }
}
</style>
