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
  Edit3,
  User,
  Phone,
  MapPin,
  Loader2,
  Save,
  AlertCircle,
} from "lucide-react";

import Washstations from "@/stores/washstations/washstations";
import Employees from "@/stores/employees/employees";

const EditEmployeesDialog = ({ id }) => {
  const { data } = Washstations();
  const { dataId, funGetEmployeesById, funEditEployees } = Employees();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");

  const loadData = async () => {
    setOpen(true);
    await funGetEmployeesById(id);
  };

  useEffect(() => {
    if (dataId?.id) {
      setNameCar(dataId.name || "");
      setNumCar(dataId.phone_number || "");
      setWashState(dataId.wash_id?.toString() || "");
    }
  }, [dataId]);

  const funEdit = async () => {
    setIsLoading(true);
    try {
      const empInfo = {
        name: nameCar.trim(),
        phone_number: numCar.trim(),
        wash_id: Number(washState),
      };

      await funEditEployees({ id, data: empInfo });
      setOpen(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />} {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-blue-300 transition-all duration-300 ${
            error ? "border-red-400 bg-red-50/50" : "border-gray-200"
          }`}
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
    icon: Icon,
    error,
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />} {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-blue-300 transition-all duration-300 appearance-none cursor-pointer ${
            error ? "border-red-400 bg-red-50/50" : "border-gray-200"
          }`}
        >
          <option value="">Select Wash Station</option>
          {data.map((option) => (
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
        onClick={loadData}
        className="group relative overflow-hidden bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-300 font-semibold px-4 py-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
      >
        <div className="relative flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Edit
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

          <DialogHeader className="relative pb-6 border-b border-blue-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  Edit Employee
                </DialogTitle>
                <p className="text-gray-600 mt-1">
                  Update employee details and assignment
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="relative space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  value={nameCar}
                  onChange={(e) => setNameCar(e.target.value)}
                  placeholder="Employee Name"
                  icon={User}
                  error={errors.nameCar}
                />
                <InputField
                  label="Phone Number"
                  value={numCar}
                  onChange={(e) => setNumCar(e.target.value)}
                  placeholder="e.g., 123456789"
                  icon={Phone}
                  error={errors.numCar}
                />
                <SelectField
                  label="Wash Station"
                  value={washState}
                  onChange={(e) => setWashState(e.target.value)}
                  options={data}
                  icon={MapPin}
                  error={errors.washState}
                />
              </div>
            </div>
          </div>

          <div className="relative flex justify-end gap-3 pt-6 border-t border-blue-200/50">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white/80 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300"
            >
              Cancel
            </Button>

            <Button
              onClick={funEdit}
              disabled={isLoading}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
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

export default EditEmployeesDialog;
