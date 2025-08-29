<template>
  <div>
    <div class="ml-63">

        <Navbar />
      </div>
       <SidebarProvider>
            <AppSidebarStudent />
            <main>
              <SidebarTrigger />
              <RouterView />
            </main>
          </SidebarProvider>
          <div class="text-center -mt-140">
<h1 class="text-green-500 text-xl font-semibold">Finished Your Payment To Show Your Result</h1>
          </div>
          <div class="  w-4/5 ml-67 flex justify-between mt-35">
<div class="w-1/3">
    <h1 class="ml-20 mb-3">Pay with telebirr</h1>
    <img src="/telebirr.png" alt="">
</div>
<div class="ml-5 w-1/3">
    <h1 class="ml-20 mb-3">Pay with CBE</h1>
    <img src="/cbe.jpg" alt="">
</div>
          </div>
  </div>
</template>

<script setup>
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebarStudent from '@/components/AppSidebarStudent.vue';
import Navbar from '@/components/Navbar.vue';
</script>

<style>

</style>