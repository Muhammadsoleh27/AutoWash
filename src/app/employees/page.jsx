"use client";
import React, { useEffect, useState } from "react";
import Employees from "@/stores/employees/employees";
import logoEmploy from "../../assets/Gemini_Generated_Image_uhxl8quhxl8quhxl.png";
import Image from "next/image";
import Washstations from "@/stores/washstations/washstations";
import AddEmployees from "@/components/employees components/add employees/addEmployees";
import EditEmployeesDialog from "@/components/employees components/edit employees/editEmployees";
import {
  Search,
  Users,
  Phone,
  MapPin,
  Trash2,
  Plus,
  Filter,
} from "lucide-react";

const EmployeesPage = () => {
  const { funGetEmployees, datae, funDeleteEmployees } = Employees();
  const { funGetWash, data } = Washstations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWashStation, setSelectedWashStation] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([funGetEmployees(), funGetWash()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Helper function to get wash station name
  function GetWash(id) {
    const wash = data.find((e) => e.id == id);
    return wash?.name || "Unknown";
  }

  // Filter employees based on search and wash station
  const filteredEmployees = datae.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesWashStation =
      selectedWashStation === "all" || employee.wash_id === selectedWashStation;
    return matchesSearch && matchesWashStation;
  });

  // Get unique wash stations for filter dropdown
  const washStations = data.map((wash) => ({ id: wash.id, name: wash.name }));

  return (
    <div className="min-h-screen w-[75%] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who make our wash stations
            exceptional
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-blue-100 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex gap-9">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedWashStation}
                  onChange={(e) => setSelectedWashStation(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Wash Stations</option>
                  {washStations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Employee Button */}
            <div className="relative">
              <AddEmployees />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {filteredEmployees.length} of {datae.length} employees
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ) : (
          /* Employee Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <div
                  key={employee.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border border-gray-100 hover:border-blue-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: !isLoading
                      ? "fadeInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="relative p-8">
                    {/* Employee Avatar */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <Image
                        src={logoEmploy}
                        alt={`Profile picture of ${employee.name}`}
                        width={120}
                        height={120}
                        className="w-28 h-28 rounded-full object-cover mx-auto ring-3 ring-gray-200 group-hover:ring-blue-300 shadow-md transition-all duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Employee Name */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 capitalize group-hover:text-blue-600 transition-colors duration-200">
                        {employee.name}
                      </h3>
                    </div>

                    {/* Employee Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Phone
                          </p>
                          <p className="text-gray-800 font-semibold">
                            +992 {employee.phone_number}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Station
                          </p>
                          <p className="text-gray-800 font-semibold">
                            {GetWash(employee.wash_id)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <EditEmployeesDialog id={employee.id} />
                      </div>
                      <button
                        onClick={() => funDeleteEmployees(employee.id)}
                        className="px-4 py-3 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-xl transition-all duration-300 group/btn border border-red-200 hover:border-red-500"
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
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                  No employees found
                </h3>
                <p className="text-gray-500">
                  {searchTerm || selectedWashStation !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Start by adding your first employee to the system"}
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

export default EmployeesPage;
