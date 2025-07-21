"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Washstations from "@/stores/washstations/washstations";

const AddWashstation = () => {
  const { funAddWashstation } = Washstations();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("true");

  const funAdd = async () => {
    const carInfo = {
      name: nameCar,
      adress: numCar,
      is_active: washState == "true" ? true : false,
    };
    funAddWashstation(carInfo);
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
          Add New Station
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Wash Station</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Name Wash Station"
            value={nameCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNameCar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Adress"
            value={numCar}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setNumCar(e.target.value)}
          />
          <select
            value={washState}
            className="py-1.5 px-2 border-1"
            onChange={(e) => setWashState(e.target.value)}
          >
            <option value={"true"}>Active</option>
            <option value={"false"}>Inactive</option>
          </select>

          <Button onClick={funAdd}>Add Services</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWashstation;
