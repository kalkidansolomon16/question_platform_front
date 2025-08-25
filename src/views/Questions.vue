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
const props = defineProps({
  class: { type: null, required: false },
});
const model = ref({
    questions:{
        question_text: "",
        points:null

    }
})
const model2 = ref({
    choices:{
        question_id:null,
        option_text: ["", "", "", ""],
        is_correct: [false, false, false, false]
    }
})
const showOptions = ref(false)
const postQuestions = async () => {
    const formData = new FormData();
    formData.append('question_text', model.value.questions.question_text);
    formData.append('points', model.value.questions.points);
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/questions', formData);
    console.log('Question posted:', response.data);
     showOptions.value = true;
     console.log('Question ID stored in localStorage:', response.data.question.id);
     localStorage.setItem('question_id', response.data.question.id);
  } catch (error) {
    console.error('Error posting question:', error);
  }
    model.value.questions.question_text = "";
    model.value.questions.points = null;
};
const postChoices  = async()=>{
    const payload = {
        question_id: localStorage.getItem('question_id'),
        options: model2.value.choices.option_text.map((text, index) => ({
            option_text: text,
            is_correct: model2.value.choices.is_correct[index]
        }))
    };
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/choices', payload);
        console.log('Choices posted:', response.data);
        fetchQuestions();
        showOptions.value = false;
        showQuestions.value = false;
        showExistingQuestion.value = true;
    } catch (error) {
        console.error('Error posting choices:', error);
    }
    payload.options = ["", "", "", ""];
    model2.value.choices.is_correct = [false, false, false, false];
}
const showQuestions = ref(false);
const showExistingQuestion = ref(true)
const existingQuestions = ref([]);
const currentPage = ref(1);
const perPage = ref(3);
const lastPage = ref(1);
const fetchQuestions = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/questions?page=${currentPage.value}&per_page=${perPage.value}`);
    console.log('Fetched questions:', response.data.questions.data);
    existingQuestions.value = response.data.questions.data;
    lastPage.value = response.data.questions.last_page;
    console.log('Fetched questions last page:', lastPage.value);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
const nextPage = (page) => {
    if (page < 1 || page > lastPage.value) {
        return;
    }
  currentPage.value = page;
  fetchQuestions();
};
onMounted(() => {
  fetchQuestions();
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
   
        <div class="ml-100 -mt-140">
            <div class="w-3/4 flex justify-between">
                <div>
    <Button class="bg-green-200 text-black cursor-pointer hover:bg-green-400" @click="()=>{showQuestions = !showQuestions,showExistingQuestion = !showExistingQuestion}">Add Questions</Button>

</div>
<div>
    <Button class="bg-green-200 text-black cursor-pointer hover:bg-green-400" @click="showExistingQuestion = !showExistingQuestion">{{ showExistingQuestion ? 'Hide Questions' : 'Show Questions' }}</Button>

</div>
            </div>
        </div>
          <div :class="cn('flex flex-col gap-6', props.class)" class="w-1/4  p-5 rounded-md ml-100 shadow-md mt-10" v-if="!showOptions&&showQuestions">
           <FormField name="username" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Question</FormLabel>
        <FormControl>
           <Textarea v-bind="componentField" placeholder="Type your question here." v-model="model.questions.question_text"/>
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
            <FormField name="username" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>point</FormLabel>
        <FormControl>
           <Input v-bind="componentField" placeholder="enter point." type="number" v-model="model.questions.points"/>
        </FormControl>
     
        <FormMessage />
      </FormItem>
    </FormField>
    <Button @click="postQuestions" class="bg-green-200 text-black hover:bg-green-400">Add Choices</Button>
    </div>

         <div :class="cn('flex flex-col gap-6', props.class)" class="w-1/3  p-5 rounded-md ml-100 shadow-md mt-10" v-if="showOptions">
            <div class="flex">
<div class="w-3/4">

    <FormField name="username" v-slot="{ componentField }">
    <FormItem>
    <FormLabel>Option A</FormLabel>
    <FormControl>
    <Textarea v-bind="componentField" placeholder="enter option A." v-model="model2.choices.option_text[0]"/>
    </FormControl>
    
    <FormMessage />
    </FormItem>
    </FormField>
</div>
<div class="mt-6 w-1/4 ml-5">
     <Select v-model="model2.choices.is_correct[0]">
    <SelectTrigger class="w-[120px]">
      <SelectValue placeholder="answer" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="true">
          Correct
        </SelectItem>
        <SelectItem :value="false">
          Incorrect
        </SelectItem>
  
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
            </div>
            <div class="flex">
<div class="w-3/4">

    <FormField name="username" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Option B</FormLabel>
        <FormControl>
           <Textarea v-bind="componentField" placeholder="enter option B." v-model="model2.choices.option_text[1]"/>
        </FormControl>
    
        <FormMessage />
      </FormItem>
    </FormField>
</div>
<div class="mt-6 w-1/4 ml-5">
     <Select v-model="model2.choices.is_correct[1]">
    <SelectTrigger class="w-[120px]">
      <SelectValue placeholder="answer" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="true">
          Correct
        </SelectItem>
        <SelectItem :value="false">
          Incorrect
        </SelectItem>
  
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
            </div>
            <div class="flex">
<div class="w-3/4">

    <FormField name="username" v-slot="{ componentField }">
    <FormItem>
    <FormLabel>Option C</FormLabel>
    <FormControl>
    <Textarea v-bind="componentField" placeholder="enter option C." v-model="model2.choices.option_text[2]"/>
    </FormControl>
    
    <FormMessage />
    </FormItem>
    </FormField>
</div>
<div class="mt-6 w-1/4 ml-5">
     <Select v-model="model2.choices.is_correct[2]">
    <SelectTrigger class="w-[120px]">
      <SelectValue placeholder="answer"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="true">
          Correct
        </SelectItem>
        <SelectItem :value="false">
          Incorrect
        </SelectItem>
  
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
            </div>
            <div class="flex">
<div class="w-3/4">

    <FormField name="username" v-slot="{ componentField }">
    <FormItem>
    <FormLabel>Option D</FormLabel>
    <FormControl>
    <Textarea v-bind="componentField" placeholder="enter option D." v-model="model2.choices.option_text[3]"/>
    </FormControl>
    
    <FormMessage />
    </FormItem>
    </FormField>
</div>
<div class="mt-6 w-1/4 ml-5">
     <Select v-model="model2.choices.is_correct[3]">
    <SelectTrigger class="w-[120px]">
      <SelectValue placeholder="answer" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem :value="true">
          Correct
        </SelectItem>
        <SelectItem :value="false">
          Incorrect
        </SelectItem>
  
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
            </div>
    <Button @click="postChoices" class="bg-green-200 text-black hover:bg-green-400">Post Question</Button>
    </div>
    <div v-if="showExistingQuestion" class="ml-80 mt-10 pb-10" >
        <div v-for="question in existingQuestions" :key="question.id" class="mt-4">
            <Card class=" w-2/3">
               <CardHeader class="flex">
                   <CardTitle><span class="mr-2">{{ question.id }}</span> {{ question.question_text }}</CardTitle>

               </CardHeader>
               <CardContent class="-mt-4 ml-5">
              <ul v-for="value in question.options" :key="value.id" class="flex mt-2">
                  <input type="radio" :name="'question_' + question.id" :value="value.id" class="mr-3">
                 <li class="">{{ value.option_text }}</li>
                 
              </ul>
<p class="mt-2">answer: {{ question.options.find(opt => opt.is_correct == 1)?.option_text }}</p>
               </CardContent>
            </Card>
        </div>
            <div class="flex gap-2 mt-4 items-center justify-end">
           <button @click="nextPage(currentPage-1)" :disabled="currentPage===1" class="px-3 py-1  rounded disabled:opacity-50 cursor-pointer">
             <i class="fa-solid fa-arrow-left"></i>
           </button>
           <button v-for="page in lastPage" :key="page" @click="nextPage(page)" :class="['px-3 py-1 rounded',page===currentPage?'bg-blue-500 text-white cursor-pointer':'bg-transparent cursor-pointer']">
           {{ page }}
           </button>
           <button @click="nextPage(currentPage+1)" :disabled="currentPage===lastPage" class="px-3 py-1  rounded disabled:opacity-50 cursor-pointer">
           <i class="fa-solid fa-arrow-right"></i>
           </button>
             </div>
    </div>
  
</div>

</template>

