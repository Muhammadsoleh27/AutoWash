"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin, Plus, Loader2, AlertCircle } from "lucide-react";

import Washstations from "@/stores/washstations/washstations";
import Employees from "@/stores/employees/employees";

const AddEmployeesDialog = () => {
  const { data } = Washstations();
  const { funAddEmployees } = Employees();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [washState, setWashState] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Employee name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!washState) newErrors.washState = "Wash station is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setWashState("");
    setErrors({});
  };

  const funAdd = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await funAddEmployees({
        name: name.trim(),
        phone_number: phone.trim(),
        wash_id: Number(washState),
      });
      resetForm();
      setOpen(false);
    } catch (e) {
      console.error("Failed to add employee", e);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, value, onChange, placeholder, type = "text", icon: Icon, error }) => (
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

  const SelectField = ({ label, value, onChange, options, placeholder, icon: Icon, error }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 hover:border-orange-300 appearance-none cursor-pointer ${
            error ? "border-red-400 bg-red-50/50" : "border-gray-200"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Employee
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

        <DialogHeader className="relative pb-4 border-b border-blue-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                Add New Employee
              </DialogTitle>
              <p className="text-gray-600 mt-1">Register a new employee</p>
            </div>
          </div>
        </DialogHeader>

        <div className="relative space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
              className="py-2 px-2 rounded-[10px] border-2"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Sirojiddin"
                icon={User}
                error={errors.name}
              />
              <input
              className="py-2 px-2 rounded-[10px] border-2"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., 000022002"
                icon={Phone}
                error={errors.phone}
              />
            </div>
            <div className="mt-4">
              <SelectField
                label="Wash Station"
                value={washState}
                onChange={(e) => setWashState(e.target.value)}
                options={data}
                placeholder="Select wash station"
                icon={MapPin}
                error={errors.washState}
              />
            </div>
          </div>
        </div>

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
                  Adding...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Add Employee
                </>
              )}
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeesDialog;
