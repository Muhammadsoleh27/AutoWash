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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Cars from "@/stores/cars/cars";
import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";
import Employees from "@/stores/employees/employees";
import AddCars from "@/components/Cars Components/add cars/addCars";
import EditCarsDialog from "@/components/Cars Components/edit cars/editCars";
import History_car from "@/components/history_car/history_car";

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
    return `${day}/${month}/${year} ${hours}:${minutes}`;
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
    <div className="my-8 w-[75%] space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Car Wash Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Manage your car wash operations</p>
        </div>
        <div className="flex items-center gap-3">
          <AddCars />
          <History_car />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Cars</p>
                <p className="text-2xl font-bold">{datac?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                🚗
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Active Stations
                </p>
                <p className="text-2xl font-bold">{data?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                🏪
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Services</p>
                <p className="text-2xl font-bold">{datas?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                🧽
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Recent Car Wash Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="text-gray-700 font-semibold py-4 px-6">
                    Car Details
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4">
                    Entry Time
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4">
                    Exit Time
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4">
                    Station
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4">
                    Service
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4">
                    Employee
                  </TableHead>
                  <TableHead className="text-gray-700 font-semibold py-4 px-4 text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datac?.map((e, index) => (
                  <TableRow
                    key={e.id}
                    className={`hover:bg-gray-50/70 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-900 text-sm">
                          {e.car_model}
                        </div>
                        <div className="text-gray-600 text-xs">
                          {e.car_number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="text-sm text-gray-700">
                        {formatDateTime(e.entry_time)}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="text-sm text-gray-700">
                        {formatDateTime(e.exit_time)}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {GetWash(e.wash_id)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        {GetServer(e.service_id)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {GetEmployees(e.employe_id)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex gap-2 justify-center">
                        <EditCarsDialog id={e.id} />
                        <Button
                          variant="outline"
                          size="sm"
                          className="group relative overflow-hidden bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-300 font-semibold px-4 py-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                          onClick={() => funDelCar(e.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {datac?.length === 0 && (
                <TableCaption className="py-8 text-gray-500">
                  No car wash records found. Add your first car to get started!
                </TableCaption>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
