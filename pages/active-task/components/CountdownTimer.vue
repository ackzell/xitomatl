<script setup lang="ts">
import { useCountdown } from '@vueuse/core';
import Progress from '@/components/ui/progress/Progress.vue';

const countdownSeconds = 121;
const { remaining, start, stop, pause, resume, isActive } = useCountdown(
  countdownSeconds,
  {
    onComplete() {},
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
</script>

<template>
  <div
    bg="primary"
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

    <Progress :model-value="53" />

    <div flex gap-2>
      <button btn :disabled="isActive" @click="start()">Start</button>
      <button btn :disabled="!isActive" @click="stop()">Stop</button>
      <button btn :disabled="!isActive" @click="pause()">Pause</button>
      <button btn-outline :disabled="isActive" @click="resume()">Resume</button>
    </div>
  </div>
</template>
