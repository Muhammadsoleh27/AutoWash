import axios from "@/api/axiosInstance";
import { toast } from "sonner";
import { create } from "zustand";
const API = process.env.NEXT_PUBLIC_BASE_URL;

const Washstations = create((set, get) => ({
  data: [],
  dataId: [],
  funGetWash: async () => {
    let token = localStorage.getItem("access_token");
    let { data } = await axios.get(`${API}/washstations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ data: data });
  },
  funDeleteWashstation: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.delete(`${API}/washstations/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetWash();
      toast.success("washstations Successfuly Deleted");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funAddWashstation: async (user) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.post(`${API}/washstations/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetWash();
      toast.success("washstations Successfuly Added");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funGetWashSById: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios.get(`${API}/washstations/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ dataId: data });
    } catch (error) {
      console.error(error);
      toast.error("washstations Not Geting");
    }
  },
  funEditWashstation: async (washstations) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.put(`${API}/washstations/${washstations.id}/`, washstations.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetWash();
      toast.success("washstations Successfuly edit");
    } catch (error) {
      console.error(error);
      toast.error("error , here is something incorrect");
    }
  },
}));

export default Washstations;
