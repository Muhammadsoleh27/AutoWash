"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Settings, Save, AlertCircle } from "lucide-react";
import Washstations from "@/stores/washstations/washstations";
import Services from "@/stores/services/services";

const EditServicesDialog = ({ id }) => {
  const { data: washstations } = Washstations();
  const { dataId, funGetServicesById, funEditServices } = Services();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [washId, setWashId] = useState("");

  // Load service data on open
  const loadServiceData = async () => {
    setIsDataLoading(true);
    setOpen(true);
    try {
      await funGetServicesById(id);
    } catch (error) {
      console.error("Error loading service data:", error);
    } finally {
      setIsDataLoading(false);
    }
  };

  // Sync local state with fetched data
  useEffect(() => {
    if (dataId?.id) {
      setName(dataId.name || "");
      setPrice(dataId.price || "");
      setWashId(dataId.wash_id?.toString() || "");
    }
  }, [dataId]);

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Service name is required";
    if (!price || isNaN(price) || Number(price) <= 0)
      newErrors.price = "Valid price is required";
    if (!washId) newErrors.washId = "Please select a wash station";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const funEdit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const serviceInfo = {
        name: name.trim(),
        price: price,
        wash_id: Number(washId),
      };
      await funEditServices({ id, data: serviceInfo });
      setOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Error updating service:", error);
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
    type = "text",
  }) => (
    <div className="space-y-1">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${error ? "border-red-500 bg-red-50" : ""}`}
        />
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
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
    <div className="space-y-1">
      <Label className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </Label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 rounded-md border-2 transition ${
            error ? "border-red-500 bg-red-50" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
    </div>
  );

  return (
    <>
      <Button
        onClick={loadServiceData}
        className="group relative overflow-hidden bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-2 border-blue-200 hover:border-blue-300 font-semibold px-4 py-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 w-full"
      >
        <div className="relative flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Edit
        </div>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-auto bg-white rounded-xl shadow-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 mb-2">
              Edit Service
            </DialogTitle>
          </DialogHeader>

          {isDataLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                funEdit();
              }}
              className="space-y-4"
            >
              <input
                className="py-2 px-2 border-2 rounded-[10px] mr-5"
                label="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter service name"
                icon={Settings}
                error={errors.name}
              />
              <input
                className="py-2 px-2 border-2 rounded-[10px] w-[100px]"
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                icon={Settings}
                error={errors.price}
              />
              <SelectField
                label="Wash Station"
                value={washId}
                onChange={(e) => setWashId(e.target.value)}
                options={washstations}
                placeholder="Select wash station"
                icon={Settings}
                error={errors.washId}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading || isDataLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || isDataLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditServicesDialog;
