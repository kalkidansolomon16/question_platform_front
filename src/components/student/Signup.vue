<script setup>
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'vue3-toastify';

const props = defineProps({
  class: { type: null, required: false },
});
import { Input } from "@/components/ui/input"
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axios from "axios";
const form = ref({
  username: ""
})

const model = ref({
    student:{
        username: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    }
})

const registerStudent = async()=>{
   const formData = new FormData()
   formData.append("name", model.value.student.username)
   formData.append("email", model.value.student.email)
   formData.append("password", model.value.student.password)
   formData.append("phone", model.value.student.phone)
   formData.append("address", model.value.student.address)

    const response = await axios.post("http://127.0.0.1:8000/api/students", formData)
    console.log('student',response.data)
    if(response){

        toast.success("Student registered Successfully")
    }
    else{
        toast.error("Failed to register student")
    }
    model.value.student.username = ""
    model.value.student.email = ""
    model.value.student.password = ""
    model.value.student.phone = ""
    model.value.student.address = ""
}
</script>

<template>

  <div :class="cn('flex flex-col gap-6', props.class)" class="w-1/4 bg-white p-5 rounded-md">
    <FormField name="username" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter your username" v-model="model.student.username" />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
        <FormField name="email" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter your email" v-model="model.student.email" />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
        <FormField name="password" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter your password" v-model="model.student.password" />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
        <FormField name="phone" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter your phone number" v-model="model.student.phone" />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
        <FormField name="address" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter your address" v-model="model.student.address" />
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
                  <Button type="submit" class="w-full bg-blue-400 hover:bg-blue-600" @click="registerStudent"> Sign Up </Button>
                    <div class="mt-4 text-center text-sm">
            Do you have an account?
            <a href="#" class="underline underline-offset-4" @click="router.push('/')"> Sign in </a>
          </div>
  </div>
</template>


