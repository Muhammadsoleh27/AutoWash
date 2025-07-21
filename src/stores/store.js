import axios from "axios";
import { create } from "zustand";

const API = process.env.NEXT_PUBLIC_BASE_URL;

const Login = create((set) => ({
  success: false,
  error: false,
  errorMessage: "",

  funLoginStore: async (dataUser) => {
    set({ success: false, error: false, errorMessage: "" });
    try {
      const res = await axios.post(`${API}/accounts/login/`, dataUser);
      const token = res.data.access;
      localStorage.setItem("access_token", token);
      set({ success: true });
    } catch (error) {
      console.error(error);
      set({
        error: true,
        errorMessage: error.response?.data?.detail || "Here something incorrect , try again !",
      });
    }
  },
}));

export default Login;
