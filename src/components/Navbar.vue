<script setup>
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuthStore } from "@/stores/auth"
import { ref } from "vue"
const authStore = ref()
authStore.value = useAuthStore()
import { Button } from "@/components/ui/button"
</script>

<template>
  <Menubar class="lg:px-3 px-6 py-8 lg:fixed lg:w-9/9 -ml-63 lg:ml-1 z-0 ">
    <MenubarMenu>
      <MenubarTrigger><img src="/Screenshot 2025-08-22 151651.png" alt="" class="lg:w-1/2 w-1/3"></MenubarTrigger>

    </MenubarMenu>
    <MenubarMenu class="">
      <MenubarTrigger class="lg:ml-100 -ml-80">admin</MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu class="">
       <AlertDialog class="mt-100 lg:ml-100">
    <AlertDialogTrigger as-child>
      <Button variant="outline">
        Log out
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="-mt-140 w-1/3 -ml-75 lg:-mt-10 lg:ml-20">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-sm">Are you absolutely sure you want to log out?</AlertDialogTitle>
        <!-- <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription> -->
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="w-1/3 ml-20">Cancel</AlertDialogCancel>
        <div @click="authStore.logout">

          <AlertDialogAction class="ml-20">Continue</AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 
    </MenubarMenu>
  </Menubar>

</template>