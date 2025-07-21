import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
const API = process.env.NEXT_PUBLIC_BASE_URL;

const Employees = create((set, get) => ({
  datae: [],
  dataId: [],
  funGetEmployees: async () => {
    let token = localStorage.getItem("access_token");
    let { data } = await axios.get(`${API}/employees/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ datae: data });
  },
  funAddEmployees: async (user) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.post(`${API}/employees/`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetEmployees();
      toast.success("Employees Successfuly Added");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funDeleteEmployees: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.delete(`${API}/employees/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetEmployees();
      toast.success("Employees Successfuly Deleted");
    } catch (error) {
      console.error(error);
      toast.success("error , here is something incorrect");
    }
  },
  funGetEmployeesById: async (id) => {
    try {
      let token = localStorage.getItem("access_token");
      let { data } = await axios.get(`${API}/employees/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ dataId: data });
    } catch (error) {
      console.error(error);
      toast.error("Employees Not Geting");
    }
  },
  funEditEployees: async (employees) => {
    try {
      let token = localStorage.getItem("access_token");
      await axios.put(`${API}/employees/${employees.id}/`, employees.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      get().funGetEmployees();
      toast.success("Car Successfuly edit");
    } catch (error) {
      console.error(error);
      toast.error("error , here is something incorrect");
    }
  },
}));

export default Employees;
