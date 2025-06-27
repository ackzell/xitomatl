<script setup lang="ts">
import { useCountdown } from '@vueuse/core';
import Progress from '@/components/ui/progress/Progress.vue';
import { useSounds } from '~/lib/useSounds';
import gsap from 'gsap';

interface CountdownTimerProps {
  /**
   * The duration of the timer in seconds.
   */
  duration: number;
  /**
   * Styles for the timer.
   * - backgroundColor: Background color for the timer.
   * - progressBackground: "Track" color once the timer is started.
   */
  styles?: {
    backgroundColor?: string;
    progressBackground?: string;
  };
}

interface CountdownTimerEmits {
  /**
   * Emitted when the timer completes.
   */
  (e: 'complete'): void;
}

const props = withDefaults(defineProps<CountdownTimerProps>(), {
  styles: () => ({
    backgroundColor: 'dark',
    progressBackground: 'gray-700',
  }),
});
const emit = defineEmits<CountdownTimerEmits>();

const { play } = useSounds();
const isFlashing = ref(false);

const { remaining, stop, pause, resume, isActive, reset } = useCountdown(
  props.duration,
  {
    onComplete() {
      play('ding');
      isFlashing.value = true;
      setTimeout(() => {
        isFlashing.value = false;

        reset();
        emit('complete');
      }, 2000);
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

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    event.preventDefault();
    if (isActive.value) {
      pause();
    } else {
      resume();
    }
  }
});

// Reactive references for animated digits
const animatedMinutes = ref(remainingMinutes.value.split(''));
const animatedSeconds = ref(remainingSeconds.value.split(''));

// Helper function to animate digit changes
function animateDigits(
  newValue: string,
  oldValue: string,
  classPrefix: string,
  animatedRef: Ref<string[]>,
) {
  const newDigits = newValue.split('');
  const oldDigits = oldValue.split('');

  // Temporarily store the old digits for animation
  animatedRef.value = oldDigits;

  oldDigits.forEach((digit, index) => {
    if (digit !== newDigits[index]) {
      // Animate the old digit out
      gsap.to(`.${classPrefix}-${index}`, {
        y: '25%',
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // Update the digit to the new value after the old digit animates out
          animatedRef.value = newDigits;

          // Animate the new digit in
          gsap.fromTo(
            `.${classPrefix}-${index}`,
            { y: '-25%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.25, ease: 'power2.out' },
          );
        },
      });
    }
  });
}

watch(remainingMinutes, (newValue, oldValue) => {
  animateDigits(newValue, oldValue, 'minute-digit', animatedMinutes);
});

watch(remainingSeconds, (newValue, oldValue) => {
  animateDigits(newValue, oldValue, 'second-digit', animatedSeconds);
});
</script>

<template>
  <div
    :class="[
      `bg-${props.styles.backgroundColor}`,
      isFlashing ? '!bg-accent animate-heart-beat ' : '',
    ]"
    w-full
    p-4
    flex
    flex-col
    items-center
    justify-center
    gap-8
    py-8
    drop-shadow-lg
    transition-all
    duration-300
    ease-in-out
  >
    <!-- <p font-numeral text="light 5xl center">
      {{ remainingMinutes }} : {{ remainingSeconds }}
    </p> -->
    <p font-numeral text="light 5xl center" w-full flex justify-center>
      <span
        v-for="(digit, index) in animatedMinutes"
        :key="'minute-' + index"
        :class="'minute-digit-' + index"
        inline-block
        text-center
        w-12
      >
        {{ digit }}
      </span>
      <span inline-block w-8>:</span>
      <span
        v-for="(digit, index) in animatedSeconds"
        :key="'second-' + index"
        :class="'second-digit-' + index"
        inline-block
        text-center
        w-12
      >
        {{ digit }}
      </span>
    </p>

    <Progress
      :class="[
        `bg-${props.styles.backgroundColor}-400`,
        isFlashing && '!bg-accent-400',
      ]"
      :model-value="remainingPercent"
      sm:w-xs
    />

    <div flex gap-2>
      <button
        btn-outline
        flex
        items-center
        gap-2
        :disabled="isFlashing"
        @click="isActive ? pause() : resume()"
      >
        <Icon :name="isActive ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
        <!-- <span text-lg>{{ isActive ? 'Pause' : 'Start' }}</span> -->
      </button>
      <button
        btn
        bg-transparent
        flex
        items-center
        gap-2
        :disabled="!isActive || isFlashing"
        @click="
          stop();
          reset(props.duration);
        "
      >
        <Icon name="mdi:stop" class="w-6 h-6" />
        <!-- <span text-lg>Stop</span> -->
      </button>
    </div>
  </div>
</template>
