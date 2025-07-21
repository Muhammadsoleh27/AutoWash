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
import Employees from "@/stores/employees/employees";

const AddEmployees = () => {
  const { data } = Washstations();
  const { funAddEmployees } = Employees();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");

  const funAdd = async () => {
    const carInfo = {
      name: nameCar,
      phone_number: numCar,
      wash_id: Number(washState),
    };
    funAddEmployees(carInfo);
    setNameCar("");
    setNumCar("");
    setWashState("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={
            "my-2 mx-2 bg-blue-400 text-blue-950 hover:text-white hover:bg-blue-950 cursor-pointer"
          }
        >
          Add New Employees
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employees</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name Employees"
            value={nameCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNameCar(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number Employees"
            value={numCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNumCar(e.target.value)}
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

          <Button onClick={funAdd}>Add Employees</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployees;
