import axios from "@/api/axiosInstance";
import { toast } from "sonner";
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
      const ref = res.data.refresh
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", ref);
      localStorage.setItem("super_admin", dataUser.email);
      set({ success: true });
    } catch (error) {
      console.error(error);
      set({
        error: true,
        errorMessage:
          error.response?.data?.detail ||
          "Here something incorrect , try again !",
      });
    }
  },
  funRegisterStore: async (data) => {
    set({ success: false, error: false, errorMessage: "" });
    let token = localStorage.getItem("access_token");
    try {
      await axios.post(`${API}/accounts/register/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Check your gmail !");
      set({ success: true });
    } catch (error) {
      console.error(error);
      set({
        error: true,
        errorMessage:
          error.response?.data?.detail ||
          "Here something incorrect , try again !",
      });
    }
  },
  ConfirmToken: async (tokenConf) => {
    let token = localStorage.getItem("access_token");
    await axios.get(`${API}/accounts/confirm-email/${tokenConf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Success register");
  },
}));

export default Login;
