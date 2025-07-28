"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Car,
  MapPin,
  Settings,
  User,
  Clock,
  Edit3,
  Save,
  Loader2,
  AlertCircle,
  Calendar,
} from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [exitCar, setExitCar] = useState("");
  const [enterCar, setEnterCar] = useState("");
  const [washState, setWashState] = useState("");
  const [servicesState, setServicesState] = useState("");
  const [employeesState, setEmployeesState] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  const loadCarData = async () => {
    setIsDataLoading(true);
    setOpen(true);
    try {
      await funGetCarsById(id);
    } catch (error) {
      console.error("Error loading car data:", error);
    } finally {
      setIsDataLoading(false);
    }
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
    if (washState) {
      const filtered = datas.filter((e) => e.wash_id == washState);
      const emps = datae.filter((e) => e.wash_id == washState);
      setFilteredServices(filtered);

      // Only auto-select if current service doesn't match the wash station
      const currentService = datas.find(
        (s) => s.id.toString() === servicesState
      );
      if (!currentService || currentService.wash_id.toString() !== washState) {
        setServicesState(filtered[0]?.id?.toString() || "");
      }

      // Only auto-select if current employee doesn't match the wash station
      const currentEmployee = datae.find(
        (e) => e.id.toString() === employeesState
      );
      if (
        !currentEmployee ||
        currentEmployee.wash_id.toString() !== washState
      ) {
        setEmployeesState(emps[0]?.id?.toString() || "");
      }
    }
  }, [washState, datas, datae]);

  const funEdit = async () => {
    setIsLoading(true);
    try {
      const carInfo = {
        car_model: nameCar.trim(),
        car_number: numCar.trim().toUpperCase(),
        entry_time: new Date(enterCar).toISOString(),
        exit_time: new Date(exitCar).toISOString(),
        wash_id: Number(washState),
        service_id: Number(servicesState),
        employe_id: Number(employeesState),
      };

      await funEditCar({ id, data: carInfo });
      setOpen(false);
    } catch (error) {
      console.error("Error updating car:", error);
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
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-blue-300 ${
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
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-blue-300 appearance-none cursor-pointer ${
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
    <>
      <Button
        onClick={loadCarData}
        className="group relative overflow-hidden bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-300 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
      >
        <div className="relative flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Edit
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

          {/* Header */}
          <DialogHeader className="relative pb-6 border-b border-blue-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  Edit Car Details
                </DialogTitle>
                <p className="text-gray-600 mt-1">
                  Update vehicle information and service details
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Loading State */}
          {isDataLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          ) : (
            /* Form */
            <div className="relative space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
              {/* Car Information */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="py-2 px-2 border-2 rounded-[10px]"
                    label="Car Model"
                    value={nameCar}
                    onChange={(e) => setNameCar(e.target.value)}
                    placeholder="e.g., Toyota Camry"
                    icon={Car}
                    error={errors.nameCar}
                  />
                  <input
                    className="py-2 px-2 border-2 rounded-[10px]"
                    label="Car Number"
                    value={numCar}
                    onChange={(e) => setNumCar(e.target.value)}
                    placeholder="e.g., ABC-123"
                    icon={Car}
                    error={errors.numCar}
                  />
                </div>
              </div>

              {/* Time Schedule */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Service Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Entry Time"
                    value={enterCar}
                    onChange={(e) => setEnterCar(e.target.value)}
                    type="datetime-local"
                    icon={Calendar}
                    error={errors.enterCar}
                  />
                  <InputField
                    label="Exit Time"
                    value={exitCar}
                    onChange={(e) => setExitCar(e.target.value)}
                    type="datetime-local"
                    icon={Clock}
                    error={errors.exitCar}
                  />
                </div>
              </div>

              {/* Service Assignment */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
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
                      washState
                        ? "Select employee"
                        : "Select wash station first"
                    }
                    icon={User}
                    error={errors.employeesState}
                    disabled={!washState}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="relative flex justify-end gap-3 pt-6 border-t border-blue-200/50">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading || isDataLoading}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white/80 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300"
            >
              Cancel
            </Button>

            <Button
              onClick={funEdit}
              disabled={isLoading || isDataLoading}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCarsDialog;
