<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<
  CheckboxRootProps & { class?: HTMLAttributes['class'] }
>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    bg-primary
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-light shadow',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-dark data-[state=checked]:text-primary-foreground',
        'data-[state=checked]:border-transparent',
        props.class,
      )
    "
  >
    <CheckboxIndicator
      class="flex items-center justify-center w-full h-full text-current"
    >
      <slot>
        <Check class="w-4 h-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
