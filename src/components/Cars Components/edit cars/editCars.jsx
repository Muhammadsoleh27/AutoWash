"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";
import Employees from "@/stores/employees/employees";
import Cars from "@/stores/cars/cars";

const EditCarsDialog = ({ id }) => {
  const { data } = Washstations();
  const { datas } = Services();
  const { datae } = Employees();
  const { funGetCarsById, dataId, funEditCar } = Cars();

  const [open, setOpen] = useState(false);

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [exitCar, setExitCar] = useState("");
  const [enterCar, setEnterCar] = useState("");
  const [washState, setWashState] = useState("");
  const [servicesState, setServicesState] = useState("");
  const [employeesState, setEmployeesState] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const loadCarData = async () => {
    await funGetCarsById(id);
    setOpen(true); // open after data fetch
  };

  useEffect(() => {
    if (dataId?.id) {
      setNameCar(dataId.car_model || "");
      setNumCar(dataId.car_number || "");
      setEnterCar(dataId.entry_time?.slice(0, 16) || "");
      setExitCar(dataId.exit_time?.slice(0, 16) || "");
      setWashState(dataId.wash_id?.toString() || "");
      setServicesState(dataId.service_id?.toString() || "");
      setEmployeesState(dataId.employe_id?.toString() || "");
    }
  }, [dataId]);

  useEffect(() => {
    const filtered = datas.filter((e) => e.wash_id == washState);
    const emps = datae.filter((e) => e.wash_id == washState);
    setFilteredServices(filtered);

    if (filtered.length > 0) setServicesState(filtered[0].id.toString());
    if (emps.length > 0) setEmployeesState(emps[0].id.toString());
  }, [washState]);

  const funEdit = async () => {
    const carInfo = {
      car_model: nameCar,
      car_number: numCar,
      entry_time: new Date(enterCar).toISOString(),
      exit_time: new Date(exitCar).toISOString(),
      wash_id: Number(washState),
      service_id: Number(servicesState),
      employe_id: Number(employeesState),
    };
    await funEditCar({ id, data: carInfo });

    setOpen(false); // close dialog
  };

  return (
    <>
      <Button
        className="bg-white text-blue-950 hover:bg-white cursor-pointer"
        onClick={loadCarData}
      >
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Car</DialogTitle>
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
            <label>Enter Time</label>
            <input
              type="datetime-local"
              value={enterCar}
              className="py-1.5 px-2 border-1"
              onChange={(e) => setEnterCar(e.target.value)}
            />
            <label>Exit Time</label>
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
            <Button onClick={funEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCarsDialog;
