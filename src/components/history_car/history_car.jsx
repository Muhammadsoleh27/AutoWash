"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import car from "../../assets/image copy.png";
import price from "../../assets/image copy 2.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cars from "@/stores/cars/cars";

const History_car = () => {
  const [activeTab, setActiveTab] = useState("today");
  const { dataHisT, funGetHistory, dataHisA } = Cars();
  
  useEffect(() => {
    funGetHistory();
  }, []);

  const StatCard = ({ icon, title, value, delay = 0 }) => (
    <div 
      className={`group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 
        border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl 
        transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1
        animate-in slide-in-from-bottom-4`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon container with hover animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 
              rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-r from-blue-400 to-indigo-500 
              p-3 rounded-2xl shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
              <Image src={icon} alt={title} className="w-8 h-8 brightness-0 invert" />
            </div>
          </div>
          
          {/* Title */}
          <div>
            <h3 className="font-bold text-xl text-gray-800 group-hover:text-gray-900 
              transition-colors duration-300">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {title === "Total Cars" ? "Vehicles registered" : "Combined value"}
            </p>
          </div>
        </div>
        
        {/* Value with animated counter effect */}
        <div className="text-right">
          <div className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 
            bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 
            transition-all duration-300">
            {title === "Total Price" ? `$${value?.toLocaleString() || 0}` : (value || 0)}
          </div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
            {activeTab === "today" ? "Today" : "All Time"}
          </div>
        </div>
      </div>
      
      {/* Hover line effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
        from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 
        transition-transform duration-500 origin-left rounded-full" />
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group relative overflow-hidden bg-gradient-to-r from-blue-400 to-indigo-600 
          hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-1.5 
          rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
          transform hover:scale-105 hover:-translate-y-1">
          
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button content */}
          <div className="relative flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 
              transition-all duration-300 group-hover:rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:scale-110 transition-transform duration-300"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
            </div>
            <span className="font-semibold">View Records</span>
          </div>
        </button>
      </DialogTrigger>
      
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="m12 7 4 5-4 2" />
                </svg>
              </div>
              Car Records Dashboard
            </DialogTitle>
            <p className="text-blue-100 mt-2">Track your vehicle statistics and history</p>
          </DialogHeader>
        </div>

        <div className="p-6">
          {/* Enhanced Tab Buttons */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-2xl">
            <Button
              variant="ghost"
              className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                activeTab === "today"
                  ? "bg-white shadow-md text-blue-600 hover:bg-white hover:text-blue-700"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("today")}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeTab === "today" ? "bg-blue-500" : "bg-gray-400"
                }`} />
                Today's Stats
              </div>
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 font-semibold py-3 px-6 rounded-xl transition-all duration-300 ${
                activeTab === "history"
                  ? "bg-white shadow-md text-blue-600 hover:bg-white hover:text-blue-700"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeTab === "history" ? "bg-blue-500" : "bg-gray-400"
                }`} />
                All History
              </div>
            </Button>
          </div>

          {/* Tab Content with smooth transitions */}
          <div className="space-y-4">
            {activeTab === "today" && (
              <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Overview</h3>
                  <p className="text-gray-600 text-sm">Real-time statistics for today's activities</p>
                </div>
                
                <div className="space-y-4">
                  <StatCard 
                    icon={car} 
                    title="Total Cars" 
                    value={dataHisT?.total_cars} 
                    delay={0}
                  />
                  <StatCard 
                    icon={price} 
                    title="Total Price" 
                    value={dataHisT?.total_price} 
                    delay={100}
                  />
                </div>
              </div>
            )}
            
            {activeTab === "history" && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Historical Data</h3>
                  <p className="text-gray-600 text-sm">Complete overview of all recorded data</p>
                </div>
                
                <div className="space-y-4">
                  <StatCard 
                    icon={car} 
                    title="Total Cars" 
                    value={dataHisA?.total_cars} 
                    delay={0}
                  />
                  <StatCard 
                    icon={price} 
                    title="Total Price" 
                    value={dataHisA?.total_price} 
                    delay={100}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer with additional info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Live data</span>
              </div>
              <span>Last updated: Just now</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default History_car;