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
  <div bg="#d22f27" p-4 flex flex-col items-center justify-center gap-3>
    <p font-numeral text="#fafafa 3xl center" bg="#ea5a47" w-full>
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
