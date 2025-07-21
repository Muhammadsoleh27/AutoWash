import axios from "axios";
import { create } from "zustand";
const API = process.env.NEXT_PUBLIC_BASE_URL;

const Washstations = create((set, get) => ({
  data: [],
  funGetWash: async () => {
    let token = localStorage.getItem("access_token");
    let { data } = await axios.get(`${API}/washstations/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ data: data });
  },
}));

export default Washstations;
