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

const EditWashstationDialog = ({ id }) => {
  const { funGetWashSById, funEditWashstation, dataId } = Washstations();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");

  const getById = async (idx) => {
    await funGetWashSById(idx);
  };

  useEffect(() => {
    if (dataId?.id) {
      setNameCar(dataId.name || "");
      setNumCar(dataId.adress || "");
      setWashState(dataId.is_active == true ? "true" : "false" || "");
    }
  }, [dataId]);

  const funEdit = async () => {
    const empInfo = {
      name: nameCar,
      adress: numCar,
      is_active: washState == "true" ? true : false,
    };
    await funEditWashstation({ id: id, data: empInfo });

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
          <DialogTitle>Edit Wash Station</DialogTitle>
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
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <Button onClick={funEdit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWashstationDialog;
