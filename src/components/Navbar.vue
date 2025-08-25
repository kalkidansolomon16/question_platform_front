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
  <Menubar class="px-3 py-8 fixed w-9/9 z-10">
    <MenubarMenu>
      <MenubarTrigger><img src="/Screenshot 2025-08-22 151651.png" alt="" class="w-1/2"></MenubarTrigger>

    </MenubarMenu>
    <MenubarMenu class="">
      <MenubarTrigger class="ml-100">admin</MenubarTrigger>
    </MenubarMenu>

    <MenubarMenu class="">
       <AlertDialog class="mt-100 ml-100">
    <AlertDialogTrigger as-child>
      <Button variant="outline">
        Log out
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure you want to log out?</AlertDialogTitle>
        <!-- <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription> -->
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <div @click="authStore.logout">

          <AlertDialogAction >Continue</AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
 
    </MenubarMenu>
  </Menubar>

</template>