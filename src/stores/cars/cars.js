import axios from "axios";
import { create } from "zustand";
const API = process.env.NEXT_PUBLIC_BASE_URL;
import { toast } from "sonner";

const Cars = create((set, get) => ({
  datac: [],
  dataId: [],
  funGetCars: async () => {
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios.get(`${API}/cars/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ datac: data });
    } catch (error) {
      console.error(error);
      toast.error("Cars Not Geting");
    }
  },
  funGetCarsById: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios.get(`${API}/cars/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ dataId: data });
    } catch (error) {
      console.error(error);
      toast.error("Cars Not Geting");
    }
  },
  funAddCar: async (cars) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.post(`${API}/cars/`, cars, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetCars();
      toast.success("Car Successfuly Added");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funEditCar: async (cars) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.put(`${API}/cars/${cars.id}/`, cars.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetCars();
      toast.success("Car Successfuly edit");
    } catch (error) {
      console.error(error);
      toast.error("error , here is something incorrect");
    }
  },
  funDelCar: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.delete(`${API}/cars/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetCars();
      toast.success("Car Deleted");
    } catch (error) {
      console.error(error);
      toast.success("Something went wrong");
    }
  },
}));

export default Cars;
