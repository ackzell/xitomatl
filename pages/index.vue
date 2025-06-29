<script lang="ts" setup>
import '@unocss/reset/tailwind-compat.css';
import { useSounds } from '~/lib/useSounds';

const { init } = useSounds();

init();
</script>
<template>
  <div font-sans>
    <div flex>
      <div bg="secondary" w-50px h-50px />
      <div class="bg-primary-700 w-50px h-50px" />
      <div class="bg-primary w-50px h-50px" />
      <div class="bg-accent w-50px h-50px" />
      <div class="bg-dark w-50px h-50px" />
      <div class="bg-light w-50px h-50px" border="1px solid dark" />
    </div>

    <div text="center xl">
      <RouterLink underline class="hover:text-[#d22f27]" to="/active-task"
        >Get started!</RouterLink
      >
    </div>
  </div>
</template>
