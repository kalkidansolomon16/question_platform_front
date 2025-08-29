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
          <div class="lg:ml-180 ml-20 -mt-140 lg:-mt-120">

              <Button class="px-20 bg-green-300 text-black hover:bg-green-500 cursor-pointer" @click="startTest" v-if="!showExistingQuestion">Start Test</Button>
          </div>
              <div v-if="showExistingQuestion" class="lg:ml-80 ml-8  pb-10" >
                <div class="flex">

                    <div class="text-xl font-bold text-red-600 mb-4 ">
               Time Left: {{ formattedTime }}
             </div>
             <!-- <div v-if="submitted" class="text-xl font-bold text-blue-700 mb-2 lg:ml-190 ml-20">
  Score: {{ correctCount }} / {{ totalQuestions }}
</div> -->
                </div>
        <div v-for="question in existingQuestions" :key="question.id" class="mt-4">
            <Card class=" w-2/3">
               <CardHeader class="flex">
                   <CardTitle><span class="mr-2">{{ question.id }}</span> {{ question.question_text }}</CardTitle>

               </CardHeader>
               <CardContent class="-mt-4 ml-5">
<ul v-for="(value, index) in question.options" :key="value.id" class="flex mt-2 items-center ml-10">
    <span class="mr-2 font-bold">{{ String.fromCharCode(65 + index) }}.</span> 
  <input
    type="radio"
    :name="'question_' + question.id"
    :value="Number(value.id)"
    v-model="selectedAnswers[question.id]"
    class="mr-2"
    :disabled="timeLeft <= 0 || submitted"
  />
  <li :class="getOptionClass(question.id, value.id)">
    {{ value.option_text }}
  </li>
</ul>
<!-- <p class="mt-2">answer: {{ question.options.find(opt => opt.is_correct == 1)?.option_text }}</p> -->
               </CardContent>
            </Card>
            <!-- <button @click="submitAnswers(question.id)">Submit</button> -->
        </div>
         <div class="mt-10 flex ">
                 <AlertDialog class="mt-100 lg:ml-100">
    <AlertDialogTrigger as-child>
    <Button variant="outline">
        Submit Test
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="-mt-140 w-1/3 -ml-75 lg:-mt-10 lg:ml-20">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-sm">Are you absolutely sure you want to submit the exam ? <br> this action can't be undone?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="w-1/3 ml-20">Cancel</AlertDialogCancel>
      
 <AlertDialogAction class="ml-20">
        <Button
          class="px-6 py-2 "
          @click="submitAnswers"
          :disabled="timeLeft <= 0 || submitted"
        >
          Submit Answers
        </Button>
 </AlertDialogAction>
     
      
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
      
      </div>
   <div v-if="submitted" class="mt-6 text-green-700 font-bold">
  ✅ Test submitted successfully! <br>
        <!-- <div v-if="submitted" class="text-xl font-bold text-blue-700 mb-2 mt-5">
  Score: {{ correctCount }} / {{ totalQuestions }}
</div> -->
</div>
      <div v-if="timeLeft <= 0" class="mt-6 text-red-700 font-bold">
         ⏰ Time is up! Test closed.
       </div>
            <div class="flex gap-2 mt-4 items-center justify-end mr-5 text-white">
           <button @click="nextPage(currentPage-1)" :disabled="currentPage===1" class="px-3 py-1 disabled:opacity-50 cursor-pointer bg-green-600 rounded-sm hover:bg-green-800">
            Previous
           </button>
           <!-- <button v-for="page in lastPage" :key="page" @click="nextPage(page)" :class="['px-3 py-1 rounded',page===currentPage?'bg-blue-500 text-white cursor-pointer':'bg-transparent cursor-pointer']">
           {{ page }}
           </button> -->
           <button @click="nextPage(currentPage+1)" :disabled="currentPage===lastPage" class="px-3 py-1  disabled:opacity-50 cursor-pointer bg-green-600 rounded-sm hover:bg-green-800">
           Next
           </button>
             </div>

    </div>
    </div>
</template>

<script setup>
import Button from '@/components/ui/button/Button.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebarStudent from '@/components/AppSidebarStudent.vue';
import Navbar from '@/components/Navbar.vue';

import { useRouter } from "vue-router";
import { ref,onMounted,computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { Form } from 'vee-validate';
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
import router from '@/router';
const modelresult = ref({
  result:{
    student_id:localStorage.getItem("studentID"),
    score:0
  }
})
const totalQuestions = computed(() => Object.keys(answerKey.value).length)
const showExistingQuestion = ref(false)
const existingQuestions = ref([]);
const currentPage = ref(1);
const perPage = ref(1);
const lastPage = ref(1);

const quizDuration = 2 * 60
const timeLeft = ref(quizDuration)
let timerInterval = null
// const toggleExistingQuestions = () => {
//   showExistingQuestion.value = !showExistingQuestion.value;
// };
const selectedAnswers = ref({})
const submitted = ref(false)
const answerKey = ref({}) 
const correctCount = ref(0)
const wrongCount = ref(0)
const unansweredCount = ref(0)
// Computed: formatted time (MM:SS)
const toNum = v => (v === null || v === undefined || v === '' ? null : Number(v))
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})
const getOptionClass = (questionId, optionId) => {
  if (!submitted.value) return ''  // before submit, no coloring

  const correctId = toNum(answerKey.value[questionId])
  const selected = toNum(selectedAnswers.value[questionId])

  if (optionId === correctId) {
    return 'text-green-600 font-bold' // correct option
  } else if (optionId === selected && selected !== correctId) {
    return 'text-red-600 font-bold'   // wrong selection
  } else {
    return '' // neutral
  }
}
const startTest = () => {
  showExistingQuestion.value = true
  submitted.value = false
  timeLeft.value = quizDuration

  // Start / restart countdown
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval)
      if (!submitted.value) submitAnswers() // auto-submit
    }
  }, 1000)

  // Load first page (and build/merge answerKey)
  fetchQuestions()
}
const fetchQuestions = async () => {
  try {
    const { data } = await axios.get(
      `https://kalkidan.net/api/questions?page=${currentPage.value}&per_page=${perPage.value}`
    )
    existingQuestions.value = data.questions.data
    lastPage.value = data.questions.last_page

    // Merge correct answers from this page into the global answerKey
    existingQuestions.value.forEach(q => {
      const correct = q.options.find(o => o.is_correct == 1 || o.is_correct === true)
      if (correct) {
        answerKey.value[q.id] = toNum(correct.id)
      }
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
};
const computeScore = () => {
  correctCount.value = 0
  wrongCount.value = 0
  unansweredCount.value = 0

  // Score against everything we know (answerKey accumulates across visited pages)
  Object.entries(answerKey.value).forEach(([qidStr, correctId]) => {
    const qid = Number(qidStr)
    const selected = toNum(selectedAnswers.value[qid])
    if (selected === null) {
      unansweredCount.value++
    } else if (selected === toNum(correctId)) {
      correctCount.value++
    } else {
      wrongCount.value++
    }
  })
}

const submitAnswers = async () => {
  submitted.value = true
  clearInterval(timerInterval)

  computeScore()
const formData = new FormData()
   formData.append("student_id", modelresult.value.result.student_id)
   formData.append("score", correctCount.value)
   modelresult.value.result.score = correctCount.value
   console.log('result',modelresult.value.result)
  try {
    await axios.post('https://kalkidan.net/api/results', formData)
    router.push('/show-result')
  } catch (error) {
    console.error('Error submitting answers:', error)
  }
}
  

const nextPage = (page) => {
    if (page < 1 || page > lastPage.value) {
        return;
    }
  currentPage.value = page;
  fetchQuestions();
};
onMounted(() => {
  const authStore = useAuthStore();
  const router = useRouter();
  authStore.verifyLogin(router);
   fetchQuestions();


});
</script>

<style>

</style>