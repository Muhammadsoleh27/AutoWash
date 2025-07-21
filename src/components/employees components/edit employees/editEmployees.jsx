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

const EditEmployeesDialog = ({ id }) => {
  const { data } = Washstations();
  const { dataId, funGetEmployeesById, funEditEployees } = Employees();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");

  const getById = async (idx) => {
    await funGetEmployeesById(idx); // fetch employee by ID
  };

  useEffect(() => {
    if (dataId?.id) {
      setNameCar(dataId.name || "");
      setNumCar(dataId.phone_number || "");
      setWashState(dataId.wash_id || "");
    }
  }, [dataId]);

  const funEdit = async () => {
    const empInfo = {
      name: nameCar,
      phone_number: numCar,
      wash_id: Number(washState),
    };
    await funEditEployees({ id: id, data: empInfo });

    // Reset form
    setNameCar("");
    setNumCar("");
    setWashState("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="my-3 cursor-pointer mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md
                     transition-colors duration-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => getById(id)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Edit Name"
            value={nameCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNameCar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edit Number"
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
          <Button onClick={funEdit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeesDialog;
