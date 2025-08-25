import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    apiEndPoint : "http://127.0.0.1:8000/api",
    email: null,
    password: null,
    student: null
  }),
  actions: {
    async handleLogin() {
      const response = await axios.post(`${this.apiEndPoint}/login`, {
        email: this.email,
        password: this.password
      });
      this.fetchUser();
 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.user_id);
      router.push('/admin')

    },
        async studentLogin() {
      const response = await axios.post(`${this.apiEndPoint}/slogin`, {
        email: this.email,
        password: this.password
      });
      this.fetchStudent();
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("studentID", response.data.student_id);
      localStorage.setItem("student", JSON.stringify(response.data.student));
      console.log('student', response.data.student);
      router.push('/studentdashboard')
    },
      async studentRegister(student) {
      const response = await axios.post(`${this.apiEndPoint}/sregister`, student);
      this.student = response.data.student;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('studentID', response.data.student.id);
    },
        async fetchStudent() {
      router.push('/admin');
      const response = await axios.get(`${this.apiEndPoint}/student`);
      this.student = response;
      console.log('student', this.student);

     
    },
       verifyStudentLogin(router) {
        const token = localStorage.getItem('token'); 
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       
        } else {
          if (router) {
            router.push({ name: 'studentlogin' });
          }
        }
      },
    async register(user) {
      const response = await axios.post(`${this.apiEndPoint}/register`, user);
      this.user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('userID', response.data.user.id);
    },

    async fetchUser() {
      router.push('/admin');
      const response = await axios.get(`${this.apiEndPoint}/user`);
      this.user = response;
      console.log('user', this.user);
       
     
    },
        verifyLogin(router) {
        const token = localStorage.getItem('token'); 
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       
        } else {
          if (router) {
            router.push({ name: 'login' });
          }
        }
      },
    async logout() {
       localStorage.removeItem('token')
       
    //   localStorage.removeItem('user_name')
      localStorage.removeItem('userID')
    //   if(router){
        router.push({ name: 'login' });
      this.user = null;
    },
       async studentLogout() {
       localStorage.removeItem('token')
       
    //   localStorage.removeItem('user_name')
      localStorage.removeItem('studentID')
    //   if(router){
        router.push({ name: 'studentlogin' });
      this.student = null;
    },
  },
});
