<template>
    <div class=" flex h-screen lg:w-full lg:ml-240 items-center justify-right px-4">
    <LoginForm />
  </div>
</template>

<script setup>

import LoginForm from "@/components/LoginForm.vue"

</script>

<style>
body{
    position: relative;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow: hidden;
}

body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/b883366481a0222644f56e713edd33bd.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(2px); /* Adjust blur strength */
    z-index: -1; /* Push behind content */
}
</style>    
