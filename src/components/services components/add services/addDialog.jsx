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
import { Settings, MapPin, Plus, Loader2, AlertCircle } from "lucide-react";

import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";

const AddServices = () => {
  const { data } = Washstations();
  const { funAddServices } = Services();

  const [nameCar, setNameCar] = useState("");
  const [numCar, setNumCar] = useState("");
  const [washState, setWashState] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!nameCar.trim()) newErrors.nameCar = "Service name is required";
    if (!numCar.trim()) newErrors.numCar = "Price is required";
    if (!washState) newErrors.washState = "Wash station is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setNameCar("");
    setNumCar("");
    setWashState("");
    setErrors({});
  };

  const funAdd = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const serviceInfo = {
        name: nameCar,
        price: numCar,
        wash_id: Number(washState),
      };
      await funAddServices(serviceInfo);
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setLoading(false);
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
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 hover:border-orange-300 ${
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
    placeholder,
    icon: Icon,
    error,
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
          className={`w-full px-4 py-3 bg-white/80 border-2 rounded-xl focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 hover:border-orange-300 appearance-none cursor-pointer ${
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
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
        </div>
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
        <Button className="group bg-gradient-to-r from-blue-400 to-indigo-500 hover:scale-105 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Service
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

        {/* Header */}
        <DialogHeader className="relative pb-6 border-b border-blue-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                Add New Service
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                Create a new service for this station
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="relative space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 space-y-4">
            <input
              className="py-2 px-2 rounded-[10px] border-2 w-[45%]"
              label="Service Name"
              value={nameCar}
              onChange={(e) => setNameCar(e.target.value)}
              placeholder="e.g., Full Body Wash"
              icon={Settings}
              error={errors.nameCar}
            />
            <input
              className="py-2 px-2 rounded-[10px] border-2 ml-5"
              label="Price"
              type="number"
              value={numCar}
              onChange={(e) => setNumCar(e.target.value)}
              placeholder="e.g., 25"
              icon={Settings}
              error={errors.numCar}
            />
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

        {/* Footer */}
        <div className="relative flex justify-end gap-3 pt-6 border-t border-blue-200/50">
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
            disabled={loading}
            className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white/80 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300"
          >
            Cancel
          </Button>

          <Button
            onClick={funAdd}
            disabled={loading}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
          >
            <div className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Service...
                </>
              ) : (
                <>
                  <Settings className="w-5 h-5" />
                  Add Service
                </>
              )}
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddServices;
