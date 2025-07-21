// components/Cars Components/add cars/AddCarsDialog.jsx

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";
import Employees from "@/stores/employees/employees";
import Cars from "@/stores/cars/cars";

const AddCarsDialog = () => {
  const { data } = Washstations();
  const { datas } = Services();
  const { datae } = Employees();
  const { funAddCar } = Cars();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [exitCar, setExitCar] = useState("");
  const [washState, setWashState] = useState("");
  const [servicesState, setServicesState] = useState("");
  const [employeesState, setEmployeesState] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const s = datas.filter((e) => e.wash_id == washState);
    const e = datae.filter((e) => e.wash_id == washState);

    setFilteredServices(s);

    setServicesState(s[0]?.id || "");
    setEmployeesState(e[0]?.id || "");
  }, [washState, datas, datae]);

  const funAdd = async () => {
    const carInfo = {
      car_model: nameCar,
      car_number: numCar,
      entry_time: new Date().toISOString(),
      exit_time: new Date(exitCar).toISOString(),
      wash_id: Number(washState),
      service_id: Number(servicesState),
      employe_id: Number(employeesState),
    };
    funAddCar(carInfo);
    setNameCar("");
    setNumCar("");
    setExitCar("");
    setWashState("");
    setFilteredServices([]);
    setServicesState("");
    setEmployeesState("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "my-2 mx-2 bg-blue-400 text-blue-950 hover:text-white hover:bg-blue-950 cursor-pointer"
          }
        >
          Add Car
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Car model"
            value={nameCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNameCar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Car number"
            value={numCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNumCar(e.target.value)}
          />
          <label htmlFor="">Exit Time</label>
          <input
            type="datetime-local"
            value={exitCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setExitCar(e.target.value)}
          />
          <select
            value={washState}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setWashState(e.target.value)}
          >
            <option value="">Select Wash</option>
            {data.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
          <select
            className="py-1.5 px-2 border-1"
            value={servicesState}
            onChange={(e) => setServicesState(e.target.value)}
          >
            <option value="">Select Service</option>
            {filteredServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            className="py-1.5 px-2 border-1"
            value={employeesState}
            onChange={(e) => setEmployeesState(e.target.value)}
          >
            <option value="">Select Employee</option>
            {datae
              .filter((e) => e.wash_id == washState)
              .map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
          </select>
          <Button onClick={funAdd}>Add Car</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarsDialog;
