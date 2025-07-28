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
import { Edit3, MapPin, Loader2, AlertCircle, Save } from "lucide-react";

import Washstations from "@/stores/washstations/washstations";

const EditWashstationDialog = ({ id }) => {
  const { funGetWashSById, funEditWashstation, dataId } = Washstations();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState("");

  // Load washstation data by id
  const loadWashstationData = async () => {
    setIsDataLoading(true);
    setOpen(true);
    try {
      await funGetWashSById(id);
    } catch (error) {
      console.error("Error loading washstation data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Prefill form when dataId updates
  useEffect(() => {
    if (dataId?.id) {
      setName(dataId.name || "");
      setAddress(dataId.adress || "");
      setIsActive(dataId.is_active ? "true" : "false");
      setErrors({});
    }
  }, [dataId]);

  // Simple validation example
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (isActive !== "true" && isActive !== "false")
      newErrors.isActive = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit edits
  const funEdit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updatedData = {
        name: name.trim(),
        adress: address.trim(),
        is_active: isActive === "true",
      };

      await funEditWashstation({ id, data: updatedData });
      setOpen(false);
    } catch (error) {
      console.error("Error saving washstation edits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable input with label, error, icon
  const InputField = ({
    label,
    value,
    onChange,
    placeholder,
    icon: Icon,
    error,
    ...props
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 ${
            error ? "border-red-400 bg-red-50" : "border-gray-300"
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

  // Select field with label, error, icon
  const SelectField = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    icon: Icon,
    error,
    ...props
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 ${
            error ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
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
    <>
      <Button
        onClick={loadWashstationData}
        className="group relative overflow-hidden bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-300 font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
      >
        <div className="relative flex items-center gap-2">
          <Edit3 className="w-4 h-4" />
          Edit
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20"></div>

          <DialogHeader className="relative pb-6 border-b border-blue-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
                  Edit Wash Station
                </DialogTitle>
                <p className="text-gray-600 mt-1">
                  Update wash station details
                </p>
              </div>
            </div>
          </DialogHeader>

          {isDataLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 py-6 max-h-[60vh] overflow-y-auto pr-2">
              <InputField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter wash station name"
                icon={MapPin}
                error={errors.name}
              />
              <InputField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                icon={MapPin}
                error={errors.address}
              />
              <SelectField
                label="Status"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
                options={[
                  { value: "true", label: "Active" },
                  { value: "false", label: "Inactive" },
                ]}
                placeholder="Select status"
                icon={MapPin}
                error={errors.isActive}
              />
            </div>
          )}

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

export default EditWashstationDialog;
