import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
const API = process.env.NEXT_PUBLIC_BASE_URL;

const Services = create((set, get) => ({
  datas: [],
  dataId: [],
  funGetServices: async () => {
    let token = localStorage.getItem("access_token");
    let { data } = await axios.get(`${API}/services/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ datas: data });
  },
  funDeleteServices: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.delete(`${API}/services/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetServices();
      toast.success("services Successfuly Deleted");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funAddServices: async (user) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.post(`${API}/services/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetServices();
      toast.success("services Successfuly Added");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funGetServicesById: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios.get(`${API}/services/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ dataId: data });
    } catch (error) {
      console.error(error);
      toast.error("services Not Geting");
    }
  },
  funEditServices: async (services) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.put(`${API}/services/${services.id}/`, services.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetServices();
      toast.success("Services Successfuly edit");
    } catch (error) {
      console.error(error);
      toast.error("error , here is something incorrect");
    }
  },
}));

export default Services;
