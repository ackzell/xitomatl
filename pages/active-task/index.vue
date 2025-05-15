<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue';

let completedTimersCount = ref(0);
let pomodoroCount = ref(0);

const pomodoroDuration = 5; //  25 * 60; // 25 minutes
const breakDuration = 3; // 5 * 60; // 5 minutes
const longBreakDuration = 4; // 15 * 60; // 15 minutes

const timers = {
  pomodoro: {
    type: 'pomodoro',
    duration: pomodoroDuration,
    styles: {
      backgroundColor: 'primary',
      progressBackground: 'secondary',
    },
  },
  break: {
    type: 'break',
    duration: breakDuration,
    styles: {
      backgroundColor: 'break',
      progressBackground: 'breakLighter',
    },
  },
  longBreak: {
    type: 'longBreak',
    duration: longBreakDuration,
    styles: {
      backgroundColor: 'longBreak',
      progressBackground: 'longBreakLighter',
    },
  },
};

let currentTimer = computed(() => {
  const cyclePosition = completedTimersCount.value % 8; // 8 steps: 4 pomodoros + 4 breaks (including long break)

  if (cyclePosition === 7) {
    return timers.longBreak; // Long break after 4 pomodoros
  } else if (cyclePosition % 2 === 0) {
    return timers.pomodoro; // Pomodoro on even positions (0, 2, 4, 6)
  } else {
    return timers.break; // Break on odd positions (1, 3, 5)
  }
});

function onComplete() {
  if (currentTimer.value.type === 'pomodoro') {
    pomodoroCount.value++;
  }
  completedTimersCount.value++;
}
</script>

<template>
  <div
    color-light
    :class="`bg-${currentTimer.styles.backgroundColor}`"
    h-screen
  >
    {{ pomodoroCount }}
    <CountdownTimer
      :duration="currentTimer.duration"
      :styles="currentTimer.styles"
      @complete="onComplete()"
    />
  </div>
</template>
