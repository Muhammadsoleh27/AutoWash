"use client";
import React, { useEffect, useState } from "react";
import Washstations from "@/stores/washstations/washstations";
import ServicesStore from "@/stores/services/services";
import AddServices from "@/components/services components/add services/addDialog";
import EditServicesDialog from "@/components/services components/edit services/editDialog";
import {
  Search,
  Settings,
  DollarSign,
  MapPin,
  Trash2,
  Plus,
  Filter,
  Sparkles,
} from "lucide-react";

const Services = () => {
  const { funGetWash, data } = Washstations();
  const { funGetServices, datas, funDeleteServices } = ServicesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWashStation, setSelectedWashStation] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([funGetWash(), funGetServices()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  function GetWash(id) {
    const wash = data.find((e) => e.id == id);
    return wash?.name || "Unknown";
  }

  // Filter services based on search, wash station, and price
  const filteredServices = datas.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesWashStation =
      selectedWashStation === "all" || service.wash_id === selectedWashStation;

    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = service.price <= 50;
    else if (priceFilter === "medium")
      matchesPrice = service.price > 50 && service.price <= 100;
    else if (priceFilter === "high") matchesPrice = service.price > 100;

    return matchesSearch && matchesWashStation && matchesPrice;
  });

  // Get unique wash stations for filter dropdown
  const washStations = data.map((wash) => ({ id: wash.id, name: wash.name }));

  // Service categories with icons (you can expand this based on your service types)
  const getServiceIcon = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes("wash") || name.includes("clean")) return "🚗";
    if (name.includes("wax") || name.includes("polish")) return "✨";
    if (name.includes("vacuum") || name.includes("interior")) return "🧹";
    if (name.includes("premium") || name.includes("deluxe")) return "⭐";
    return "🛠️";
  };

  return (
    <div className="min-h-screen w-[75%] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full mb-6 shadow-lg">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-900 via-blue-700 to-cyan-800 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium car care services designed to keep your vehicle looking its
            best
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-gradient-to-br from-white via-cyan-100 to-white backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-12">
          <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex gap-4">
              {/* Wash Station Filter */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedWashStation}
                  onChange={(e) => setSelectedWashStation(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Stations</option>
                  {washStations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $50</option>
                  <option value="medium">$50 - $100</option>
                  <option value="high">Over $100</option>
                </select>
              </div>
            </div>

            {/* Add Service Button */}
            <div className="relative">
              <AddServices />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-center mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span className="font-semibold">
                  {filteredServices.length} of {datas.length} services
                </span>
              </div>
              {filteredServices.length > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">
                    ${Math.min(...filteredServices.map((s) => s.price))} - $
                    {Math.max(...filteredServices.map((s) => s.price))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Settings className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        ) : (
          /* Services Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border border-gray-100 hover:border-emerald-200"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: !isLoading
                      ? "fadeInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                >
                  <div className="relative p-8">
                    {/* Service Icon */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="w-28 h-28 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full mx-auto flex items-center justify-center text-6xl shadow-md group-hover:shadow-lg transition-all duration-300">
                        {getServiceIcon(service.name)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Service Name */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 capitalize group-hover:text-emerald-600 transition-colors duration-200">
                        {service.name}
                      </h3>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Price
                          </p>
                          <p className="text-2xl text-emerald-700 font-black">
                            ${service.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            Station
                          </p>
                          <p className="text-gray-800 font-semibold">
                            {GetWash(service.wash_id)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <EditServicesDialog id={service.id} />
                      </div>
                      <button
                        onClick={() => funDeleteServices(service.id)}
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
                  <Settings className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                  No services found
                </h3>
                <p className="text-gray-500">
                  {searchTerm ||
                  selectedWashStation !== "all" ||
                  priceFilter !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : "Start by adding your first service to the system"}
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

export default Services;
