<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
  ProgressIndicator,
  ProgressRoot,
  type ProgressRootProps,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

interface Props extends ProgressRootProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="delegatedProps"
    bg-secondary
    :class="cn('relative h-2 w-full overflow-hidden rounded-full', props.class)"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      bg-light
      h-full
      w-full
      flex-1
      transition-all
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
