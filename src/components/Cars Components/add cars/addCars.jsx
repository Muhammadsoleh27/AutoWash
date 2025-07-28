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
import {
  Car,
  MapPin,
  Settings,
  User,
  Clock,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = datas.filter((e) => e.wash_id == washState);
    const e = datae.filter((e) => e.wash_id == washState);

    setFilteredServices(s);

    setServicesState(s[0]?.id || "");
    setEmployeesState(e[0]?.id || "");
  }, [washState, datas, datae]);

  const validateForm = () => {
    const newErrors = {};

    if (!nameCar.trim()) newErrors.nameCar = "Car model is required";
    if (!numCar.trim()) newErrors.numCar = "Car number is required";
    if (!exitCar) newErrors.exitCar = "Exit time is required";
    if (!washState) newErrors.washState = "Wash station is required";
    if (!servicesState) newErrors.servicesState = "Service is required";
    if (!employeesState) newErrors.employeesState = "Employee is required";

    // Validate exit time is in the future
    if (exitCar && new Date(exitCar) <= new Date()) {
      newErrors.exitCar = "Exit time must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNameCar("");
    setNumCar("");
    setExitCar("");
    setWashState("");
    setFilteredServices([]);
    setServicesState("");
    setEmployeesState("");
    setErrors({});
  };

  const funAdd = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const carInfo = {
        car_model: nameCar.trim(),
        car_number: numCar.trim().toUpperCase(),
        entry_time: new Date().toISOString(),
        exit_time: new Date(exitCar).toISOString(),
        wash_id: Number(washState),
        service_id: Number(servicesState),
        employe_id: Number(employeesState),
      };

      await funAddCar(carInfo);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon: Icon,
    error,
    ...props
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 hover:border-orange-300 ${
            error ? "border-red-400 bg-red-50/50" : "border-gray-200"
          }`}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
    error,
    disabled = false,
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 hover:border-orange-300 appearance-none cursor-pointer ${
            error ? "border-red-400 bg-red-50/50" : "border-gray-200"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
        </div>
        {error && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="absolute to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Car
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

        {/* Header */}
        <DialogHeader className="relative pb-6 border-b border-blue-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                Add New Car
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                Register a new vehicle for service
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="relative space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
          {/* Car Information */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                label="Car Model"
                value={nameCar}
                onChange={(e) => setNameCar(e.target.value)}
                placeholder="e.g., Toyota Camry"
                icon={Car}
                error={errors.nameCar}
                className="py-2 px-2 border-2 rounded-[10px]"
              />
              <input
                label="Car Number"
                value={numCar}
                onChange={(e) => setNumCar(e.target.value)}
                placeholder="e.g., ABC-123"
                icon={Car}
                error={errors.numCar}
                className="py-2 px-2 border-2 rounded-[10px]"
              />
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Service Schedule
            </h3>
            <InputField
              label="Expected Exit Time"
              value={exitCar}
              onChange={(e) => setExitCar(e.target.value)}
              type="datetime-local"
              icon={Clock}
              error={errors.exitCar}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Service Assignment */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Service Assignment
            </h3>
            <div className="space-y-4">
              <SelectField
                label="Wash Station"
                value={washState}
                onChange={(e) => setWashState(e.target.value)}
                options={data}
                placeholder="Select wash station"
                icon={MapPin}
                error={errors.washState}
              />

              <SelectField
                label="Service"
                value={servicesState}
                onChange={(e) => setServicesState(e.target.value)}
                options={filteredServices}
                placeholder={
                  washState ? "Select service" : "Select wash station first"
                }
                icon={Settings}
                error={errors.servicesState}
                disabled={!washState}
              />

              <SelectField
                label="Employee"
                value={employeesState}
                onChange={(e) => setEmployeesState(e.target.value)}
                options={datae.filter((e) => e.wash_id == washState)}
                placeholder={
                  washState ? "Select employee" : "Select wash station first"
                }
                icon={User}
                error={errors.employeesState}
                disabled={!washState}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex justify-end gap-3 pt-6 border-t border-blue-200/50">
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
            disabled={isLoading}
            className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white/80 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300"
          >
            Cancel
          </Button>

          <Button
            onClick={funAdd}
            disabled={isLoading}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Car...
                </>
              ) : (
                <>
                  <Car className="w-5 h-5" />
                  Add Car
                </>
              )}
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCarsDialog;
