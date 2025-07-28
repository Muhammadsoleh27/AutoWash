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
import { AlertCircle, Loader2, Plus, MapPin } from "lucide-react";

import Washstations from "@/stores/washstations/washstations";

const AddWashstation = () => {
  const { funAddWashstation } = Washstations();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState("true");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Station name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName("");
    setAddress("");
    setIsActive("true");
    setErrors({});
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await funAddWashstation({
        name: name.trim(),
        adress: address.trim(),
        is_active: isActive === "true",
      });
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("Error adding wash station:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ label, value, onChange, placeholder, error }) => (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-green-600" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white/90 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 hover:border-green-300 ${
          error ? "border-red-400 bg-red-50/50" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="relative flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Wash Station
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[80vh] overflow-auto bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 border-0 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-green-200/50">
          <DialogTitle className="text-2xl font-bold text-green-800">
            Add New Wash Station
          </DialogTitle>
          <p className="text-gray-600 mt-1">
            Enter the details for the new wash station below.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <input
          className="py-2 px-2 border-2 rounded-[10px] w-[45%] mr-9"
            label="Station Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter station name"
            error={errors.name}
          />

          <input
          className="py-2 px-2 border-2 rounded-[10px] w-[45%]"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            error={errors.address}
          />

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              Status
            </label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="w-full px-4 py-3 bg-white/90 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 hover:border-green-300"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-green-200/50">
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setOpen(false);
            }}
            disabled={isLoading}
            className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 bg-white/90 hover:bg-gray-50 text-gray-700 rounded-xl transition-all duration-300"
          >
            Cancel
          </Button>

          <Button
            onClick={handleAdd}
            disabled={isLoading}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="relative flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Station
                </>
              )}
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWashstation;
