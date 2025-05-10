<script setup lang="ts">
import CountdownTimer from './components/CountdownTimer.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
</script>

<template>
  <div color-light bg="primary" h-screen>
    this is the task view

    <div class="flex items-center space-x-2 p-3">
      <Checkbox id="terms" />
      <label
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>

    <CountdownTimer />
  </div>
</template>
