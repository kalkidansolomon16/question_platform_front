<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ref,onMounted } from 'vue';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { on } from 'events';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { show } from '@unovis/ts/components/tooltip/style';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Navbar from '@/components/Navbar.vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
const props = defineProps({
  class: { type: null, required: false },
});
const currentPage = ref(1)
const lastPage = ref(1)
const perPage = ref(10)
const studentsResult = ref([])
const fetchStudentsResult = async () => {
  try {
    const response = await axios.get(`https://kalkidan.net/api/results?page=${currentPage.value}&per_page=${perPage.value}`);
    console.log('Fetched students:', response.data.result.data);
    currentPage.value = response.data.current_page;
    lastPage.value = response.data.last_page;
    studentsResult.value = response.data.result.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};
const changePage = (page)=>{
    if(page >=1 && page <= lastPage.value){
        currentPage.value = page
        fetchStudentsResult()
    }
}
onMounted(() => {
 fetchStudentsResult();
});
</script>

<template>
    <div>
          <div class="ml-63">

        <Navbar />
      </div>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <RouterView />
          </main>
        </SidebarProvider>
        <div class="ml-65 -mt-140">
  <Table >
   
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          #
        </TableHead>
        <TableHead>name</TableHead>
        <TableHead>result</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="result in studentsResult" :key="result.id" >
        <TableCell class="font-medium">
          {{ result.id }}
        </TableCell>
        <TableCell class="pb-5">{{ result.student.name }}</TableCell>
        <TableCell class="pb-5">{{ result.score }}</TableCell>
    
    </TableRow>
</TableBody>
</Table>
<div class="flex gap-2 mt-4 items-center justify-end">
     <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1  rounded disabled:opacity-50 cursor-pointer">
       <i class="fa-solid fa-arrow-left"></i>
     </button>
     <button v-for="page in lastPage" :key="page" @click="changePage(page)" :class="['px-3 py-1 rounded',page===currentPage?'bg-blue-500 text-white cursor-pointer':'bg-transparent cursor-pointer']">
     {{ page }}
     </button>
     <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="px-3 py-1  rounded disabled:opacity-50 cursor-pointer">
     <i class="fa-solid fa-arrow-right"></i>
     </button>
       </div>
        </div>

</div>

</template>

