"use client";
import React, { useEffect, useState } from "react";
import Washstations from "@/stores/washstations/washstations";
import AddWashstation from "@/components/wash station components/add wash station/washstation";
import EditWashstationDialog from "@/components/wash station components/edit wash station/editDialog";
import {
  Search,
  MapPin,
  Calendar,
  Activity,
  Trash2,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Washstation = () => {
  const { funGetWash, data, funDeleteWashstation } = Washstations();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await funGetWash();
      setIsLoading(false);
    };
    loadData();
  }, []);

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} | ${hours}:${minutes}`;
  }

  // Filter wash stations based on search and status
  const filteredStations = data.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.adress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && station.is_active) ||
      (statusFilter === "inactive" && !station.is_active);
    return matchesSearch && matchesStatus;
  });

  // Get station statistics
  const activeStations = data.filter((station) => station.is_active).length;
  const inactiveStations = data.length - activeStations;

  return (
    <div className="min-h-screen w-[75%] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-violet-900 via-purple-700 to-indigo-800 bg-clip-text text-transparent mb-4">
            Wash Stations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and monitor all your wash station locations in one place
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search stations or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="all">All Stations</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {/* Add Station Button */}
            <div className="relative">
              <AddWashstation />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5" />
              <span className="font-semibold">
                {filteredStations.length} of {data.length} stations
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">{activeStations} active</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">{inactiveStations} inactive</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-violet-600" />
              </div>
            </div>
          </div>
        ) : (
          /* Wash Stations Cards Grid */
          <div className="grid grid-cols-1 w-[100%] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStations.length > 0 ? (
              filteredStations.map((station, index) => (
                <div
                  key={station.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border border-gray-100 hover:border-violet-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: !isLoading
                      ? "fadeInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="relative p-8">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {station.is_active ? (
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Inactive
                        </div>
                      )}
                    </div>

                    {/* Station Icon */}
                    <div className="relative mb-6 mt-4">
                      <div className="absolute inset-0 bg-violet-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div
                        className={`w-28 h-28 ${
                          station.is_active
                            ? "bg-gradient-to-br from-violet-100 to-indigo-100"
                            : "bg-gradient-to-br from-gray-100 to-gray-200"
                        } rounded-full mx-auto flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                      >
                        <Building2
                          className={`w-12 h-12 ${
                            station.is_active
                              ? "text-violet-600"
                              : "text-gray-500"
                          }`}
                        />
                      </div>
                      <div
                        className={`absolute -bottom-2 -right-2 w-8 h-8 ${
                          station.is_active ? "bg-violet-500" : "bg-gray-400"
                        } rounded-full border-4 border-white shadow-lg flex items-center justify-center`}
                      >
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Station Name */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 capitalize group-hover:text-violet-600 transition-colors duration-200">
                        {station.name}
                      </h3>
                    </div>

                    {/* Station Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3 p-3 bg-gray-50/80 rounded-xl">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mt-1">
                          <MapPin className="w-5 h-5 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 font-medium">
                            Address
                          </p>
                          <p className="text-gray-800 font-semibold leading-tight">
                            {station.adress}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Created
                          </p>
                          <p className="text-gray-800 font-semibold text-sm">
                            {formatDateTime(station.created_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
                        <div
                          className={`w-10 h-10 ${
                            station.is_active ? "bg-green-100" : "bg-red-100"
                          } rounded-lg flex items-center justify-center`}
                        >
                          {station.is_active ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Status
                          </p>
                          <p
                            className={`font-bold ${
                              station.is_active
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {station.is_active ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <EditWashstationDialog id={station.id} />
                      </div>
                      <button
                        onClick={() => funDeleteWashstation(station.id)}
                        className="px-4 py-3 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-300 border border-red-200 hover:border-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full max-w-md mx-auto flex flex-col items-center justify-center py-20 text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Building2 className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                  No wash stations found
                </h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Start by adding your first wash station to the system"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Washstation;
