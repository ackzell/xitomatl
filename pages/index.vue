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

    <p class="">Una app para pomodoro</p>
    <div bg="#ea5a47" w-50px h-50px />
    <div class="bg-#d22f27 w-50px h-50px" />
    <div class="bg-#b1cc33 w-50px h-50px" />
    <div class="bg-#1e1e1e w-50px h-50px" />

    <RouterLink to="/timer">Get started!</RouterLink>
  </div>
</template>
