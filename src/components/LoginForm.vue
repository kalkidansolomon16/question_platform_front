<script setup>
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { useAuthStore } from "@/stores/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from "axios";

const props = defineProps({
  class: { type: null, required: false },
});
import { ref,onMounted } from "vue";
import router from "@/router";
const authStore = ref('');
    const login = ()=>{
      authStore.value = useAuthStore();
    }
authStore.value = useAuthStore();
onMounted(()=>{
    const token  = localStorage.getItem("token");
    if (token) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
 
})

</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)" class="lg:w-1/4 ml-6 lg:ml-1 w-6/7 md:w-1/2 md:ml-40">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @click.prevent="authStore.handleLogin">
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                v-model="authStore.email"
              />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required v-model="authStore.password"/>
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full bg-blue-400 hover:bg-blue-600"> Login </Button>
              <!-- <Button variant="outline" class="w-full">
                Login with Google
              </Button> -->
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            click here if you are a student?
            <a href="#" class="underline underline-offset-4" @click="router.push('/signup')"> Sign up </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
<style scoped>

</style>