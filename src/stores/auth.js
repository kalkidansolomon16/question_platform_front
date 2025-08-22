import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    apiEndPoint : "http://127.0.0.1:8000/api",
    email: null,
    password: null
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

    },
    async register(user) {
      const response = await axios.post(`${this.apiEndPoint}/register`, user);
      this.user = response.data.user;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('userID', response.data.user.id);
    },
    async fetchUser() {
      const response = await axios.get(`${this.apiEndPoint}/user`);
      this.user = response;
      console.log('user', this.user);
       
     
    },
    async logout() {
      await axios.post(`${this.apiEndPoint}/logout`);
      this.user = null;
    },
  },
});
