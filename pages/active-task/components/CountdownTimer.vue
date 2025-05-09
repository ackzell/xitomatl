<script setup lang="ts">
import { useCountdown } from '@vueuse/core';

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

    <div flex gap-2>
      <button :disabled="isActive" @click="start()">start</button>
      <button @click="stop()">stop</button>
      <button @click="pause()">pause</button>
      <button @click="resume()">resume</button>
    </div>
  </div>
</template>
