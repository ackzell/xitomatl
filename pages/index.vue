<script lang="ts">
import '@unocss/reset/tailwind-compat.css';

// a  13
let myVar = 1;

let myVar2 = 'alal';

console.log(myVar, myVar2);
</script>
<template>
  <div font-pair>
    <h1 text-3xl font-sans>Xitomatl 🍅</h1>

    <p class="">A pomodoro compliant app</p>
    <div flex>
      <div bg="#ea5a47" w-50px h-50px />
      <div class="bg-#d22f27 w-50px h-50px" />
      <div class="bg-#b1cc33 w-50px h-50px" />
      <div class="bg-#1e1e1e w-50px h-50px" />
      <div class="bg-#fafafa w-50px h-50px border border-1 border-[#1e1e1e]" />
    </div>

    <div text="center xl">
      <RouterLink underline class="hover:text-[#d22f27]" to="/active-task"
        >Get started!</RouterLink
      >
    </div>
  </div>
</template>
