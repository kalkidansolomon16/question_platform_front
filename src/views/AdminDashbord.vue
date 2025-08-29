<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
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
const getTotalStudents = async () => {
  try {
    const response = await axios.get('https://kalkidan.net/api/studentcount');
    totalStudents.value = response.data.count;
  } catch (error) {
    console.error('Error fetching total students:', error);
  }
}
const getTotalQuestions = async()=>{
  try {
    const response = await axios.get('https://kalkidan.net/api/questioncount');
    totalQuestions.value = response.data.count;
  } catch (error) {
    console.error('Error fetching total questions:', error);
  }
}

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jul", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Aug", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Sep", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Oct", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Nov", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: "Dec", total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]
onMounted(() => {
  getTotalStudents();
  getTotalQuestions();
  const authStore = useAuthStore();
  const router = useRouter();
  authStore.verifyLogin(router);
});
</script>
<style scoped>

</style>
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
            <div class="flex lg:w-2/3 mt-10 w-11/11 justify-between">
    <div>

        <Card class="-mt-150 lg:ml-80 lg:w-2/3 w-15/11 z-0">
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

    <Card class="-mt-150 lg:ml-80 lg:w-2/3 w-15/11">
<CardHeader>
<CardTitle>Questions</CardTitle>
</CardHeader>
<CardContent class="flex justify-between">
<i class="fa-solid fa-question"></i>
<p>{{totalQuestions}}</p>
</CardContent>

</Card>
</div>
        </div>
        <div>

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

    
        </div>
    </div>

</template>

