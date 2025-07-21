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

const AddServices = () => {
  const { data } = Washstations();
  const { funAddServices } = Services();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");

  const funAdd = async () => {
    const carInfo = {
      name: nameCar,
      price: numCar,
      wash_id: Number(washState),
    };
    funAddServices(carInfo);
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
          Add New Services
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Services</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name Services"
            value={nameCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNameCar(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price Services"
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

          <Button onClick={funAdd}>Add Services</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddServices;
