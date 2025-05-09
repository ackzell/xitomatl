<script lang="ts">
import '@unocss/reset/tailwind-compat.css';

// a  13
let myVar = 1;

let myVar2 = 'alal';

console.log(myVar, myVar2);
</script>
<template>
  <div font-sans>
    <h1 text-3xl font-sans>Xitomatl 🍅</h1>

    <p class="">A pomodoro compliant app</p>
    <div flex>
      <div bg="secondary" w-50px h-50px />
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
