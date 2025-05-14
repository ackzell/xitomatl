<script setup lang="ts">
import { useCountdown } from '@vueuse/core';
import Progress from '@/components/ui/progress/Progress.vue';
import { useSounds } from '~/lib/useSounds';

interface CountdownTimerProps {
  /**
   * The type of countdown timer. It determines the style and behavior of the timer.
   */
  type: 'pomodoro' | 'break' | 'longBreak';
  /**
   * The duration of the timer in seconds.
   */
  duration: number;
}

interface CountdownTimerEmits {
  /**
   * Emitted when the timer completes.
   */
  (e: 'complete'): void;
}

const props = defineProps<CountdownTimerProps>();
const emit = defineEmits<CountdownTimerEmits>();

const { play } = useSounds();

const { remaining, stop, pause, resume, isActive, reset } = useCountdown(
  props.duration,
  {
    onComplete() {
      play('ding');
      reset();
      emit('complete');
    },
    onTick() {},
  },
);

const remainingMinutes = computed(() =>
  Math.floor(remaining.value / 60)
    .toString()
    .padStart(2, '0'),
);

const remainingSeconds = computed(() =>
  (remaining.value % 60).toString().padStart(2, '0'),
);

const remainingPercent = computed(() => {
  return (remaining.value / props.duration) * 100;
});

// Watch for changes in the duration prop and reset the timer
watch(
  () => props.duration,
  (newDuration) => {
    reset(newDuration);
  },
);
</script>

<template>
  <div
    :bg="
      props.type === 'break'
        ? 'break'
        : props.type === 'longBreak'
          ? 'longBreak'
          : 'primary'
    "
    h-dvh
    p-4
    flex
    flex-col
    items-center
    justify-center
    gap-3
    drop-shadow-xl
    color="dark"
  >
    <p font-numeral text="light 3xl center" w-full>
      {{ remainingMinutes }}:{{ remainingSeconds }}
    </p>

    <Progress
      :bg="
        props.type === 'break'
          ? 'breakLighter'
          : props.type === 'longBreak'
            ? 'longBreakLighter'
            : 'secondary'
      "
      :model-value="remainingPercent"
      sm:w-xs
    />

    <div flex gap-2>
      <button
        btn
        flex
        items-center
        gap-2
        @click="isActive ? pause() : resume()"
      >
        <Icon :name="isActive ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
        <!-- <span text-lg>{{ isActive ? 'Pause' : 'Start' }}</span> -->
      </button>
      <button
        btn-outline
        flex
        items-center
        gap-2
        :disabled="!isActive"
        @click="stop()"
      >
        <Icon name="mdi:stop" class="w-6 h-6" />
        <!-- <span text-lg>Stop</span> -->
      </button>
    </div>
  </div>
</template>
