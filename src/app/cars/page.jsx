"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Cars from "@/stores/cars/cars";
import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";
import Employees from "@/stores/employees/employees";
import AddCars from "@/components/Cars Components/add cars/addCars";
import EditCarsDialog from "@/components/Cars Components/edit cars/editCars";

const About = () => {
  const { funGetCars, datac, funDelCar } = Cars();
  const { funGetWash, data } = Washstations();
  const { funGetServices, datas } = Services();
  const { funGetEmployees, datae } = Employees();

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} - ${month} - ${year} | ${hours}:${minutes}`;
  }

  function GetWash(id) {
    const wash = data.find((e) => e.id == id);
    return wash?.name || "Unknown";
  }

  function GetServer(id) {
    const service = datas.find((e) => e.id == id);
    return service?.name || "Unknown";
  }

  function GetEmployees(id) {
    const employee = datae.find((e) => e.id == id);
    return employee?.name || "Unknown";
  }

  useEffect(() => {
    funGetCars();
    funGetWash();
    funGetServices();
    funGetEmployees();
  }, []);

  return (
    <div className="my-5 bg-blue-600 w-[75%]">
      <AddCars />
      <Table className="w-100% bg-blue-400">
        <TableCaption className="text-white">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Car Model
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Car Number
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Entry Time
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Exit Time
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Wash Station
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Services
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Employer
            </TableHead>
            <TableHead className="text-blue-800 text-[16px] font-bold">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datac?.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="text-blue-900 font-bold">
                {e.car_model}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {e.car_number}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {formatDateTime(e.entry_time)}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {formatDateTime(e.exit_time)}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {GetWash(e.wash_id)}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {GetServer(e.service_id)}
              </TableCell>
              <TableCell className="text-blue-900 font-bold">
                {GetEmployees(e.employe_id)}
              </TableCell>
              <TableCell className="text-blue-900 font-bold flex gap-3">
                <EditCarsDialog id={e.id} />
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => funDelCar(e.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default About;
