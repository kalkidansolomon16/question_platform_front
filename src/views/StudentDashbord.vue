<script setup>
import AppSidebarStudent from '@/components/AppSidebarStudent.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ref,onMounted } from 'vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BarChart } from "@/components/ui/chart-bar"
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import axios from 'axios';
import { on } from 'events';
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from '@/stores/auth';
const totalStudents = ref(0)
const totalQuestions = ref(0)
import { useRouter } from "vue-router";

const getTotalQuestions = async()=>{
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/questioncount');
    totalQuestions.value = response.data.count;
  } catch (error) {
    console.error('Error fetching total questions:', error);
  }
}

const currentStudent = ref(null);
onMounted(() => {
//  window.location.reload();
  getTotalQuestions();
  const authStore = useAuthStore();
  const router = useRouter();
  authStore.verifyLogin(router);
  currentStudent.value = JSON.parse(localStorage.getItem("student"));
  console.log('currentStudent', currentStudent.value);

});
</script>

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

        <div class="ml-120 -mt-140 w-1/2">

            <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
    
      </CardHeader>
      <div class="flex">
<div>
    <img src="/a65833dae88d5a86fa17ff09a78305ae.jpg" alt="" class="w-2/3 ml-5 rounded-sm">
</div>
<div class="-ml-40 mt-10">
   <CardDescription>
      Name:
    </CardDescription>
    <CardContent>
     {{currentStudent?.name}}
    </CardContent>
    <CardDescription>
      Email:
    </CardDescription>
    <CardContent>
      {{currentStudent?.email}}
    </CardContent>
       <CardDescription>
      Phone:
    </CardDescription>
    <CardContent>
      {{currentStudent?.phone}}
    </CardContent>
       <CardDescription>
      Address:
    </CardDescription>
        <CardContent>
      {{currentStudent?.address}}
    </CardContent>
    <Button class="bg-green-400 px-2 py-1 rounded-sm shadow-md mt-5 ml-6 text-white cursor-pointer hover:bg-green-600">Edit profile</Button>
</div>
      </div>
  
    </Card>
        </div>
            <!-- <div class="flex w-2/3 mt-10">
    <div>

        <Card class="-mt-150 ml-80 w-2/3 z-0">
        <CardHeader>
            <CardTitle>Students</CardTitle>
        
        </CardHeader>
        <CardContent class="flex justify-between">
            <i class="fa-solid fa-users"></i>
            <p>{{totalStudents}}</p>
        </CardContent>
    
        </Card>
    </div>
    <div>

    <Card class="-mt-150 ml-80 w-2/3">
<CardHeader>
<CardTitle>Questions</CardTitle>
</CardHeader>
<CardContent class="flex justify-between">
<i class="fa-solid fa-question"></i>
<p>{{totalQuestions}}</p>
</CardContent>

</Card>
</div>
        </div> -->
        <!-- <div>

   <BarChart
  class="-mt-100 w-1/2 ml-70 "
  :colors="['#16a34a']" 
  :data="data"
  index="name"
  :categories="['total'] "
  :x-label="true"
  :y-label="true"
  :y-formatter="(tick, i) => {
    return typeof tick === 'number'
      ? new Intl.NumberFormat('en-US').format(tick).toString()
      : ''
  }"
/>

    
        </div> -->
    </div>

</template>

