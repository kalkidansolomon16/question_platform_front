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
          <div class="ml-180 -mt-120">

              <Button class="px-20 bg-green-300 text-black hover:bg-green-500 cursor-pointer" @click="startTest" v-if="!showExistingQuestion">Start Test</Button>
          </div>
          
              <div v-if="showExistingQuestion" class="ml-80  pb-10" >
                <div class="flex">

                    <div class="text-xl font-bold text-red-600 mb-4 ">
               Time Left: {{ formattedTime }}
             </div>
             <div v-if="submitted" class="text-xl font-bold text-blue-700 mb-2 ml-190">
  Score: {{ correctCount }} / {{ totalQuestions }}
</div>
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
        <Button
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
          @click="submitAnswers"
          :disabled="timeLeft <= 0 || submitted"
        >
          Submit Answers
        </Button>
      </div>
   <div v-if="submitted" class="mt-6 text-green-700 font-bold">
  ✅ Test submitted successfully! <br>
        <div v-if="submitted" class="text-xl font-bold text-blue-700 mb-2 mt-5">
  Score: {{ correctCount }} / {{ totalQuestions }}
</div>
</div>
      <div v-if="timeLeft <= 0" class="mt-6 text-red-700 font-bold">
         ⏰ Time is up! Test closed.
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

<script setup>
import Button from '@/components/ui/button/Button.vue';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebarStudent from '@/components/AppSidebarStudent.vue';
import Navbar from '@/components/Navbar.vue';

import { useRouter } from "vue-router";
import { ref,onMounted,computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
const totalQuestions = computed(() => Object.keys(answerKey.value).length)
const showExistingQuestion = ref(false)
const existingQuestions = ref([]);
const currentPage = ref(1);
const perPage = ref(3);
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
      `http://127.0.0.1:8000/api/questions?page=${currentPage.value}&per_page=${perPage.value}`
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

  try {
    await axios.post('http://127.0.0.1:8000/api/submit-answers', {
      answers: selectedAnswers.value,
      correct: correctCount.value,
      wrong: wrongCount.value,
      unanswered: unansweredCount.value
    })
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