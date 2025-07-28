"use client";
import SwiperSlides from "@/components/swiper/swiper";
import Cars from "@/stores/cars/cars";
import Employees from "@/stores/employees/employees";
import Services from "@/stores/services/services";
import Washstations from "@/stores/washstations/washstations";
import React, { useEffect } from "react";

const Home = () => {
  let { funGetWash, data } = Washstations();
  let { funGetServices, datas } = Services();
  let { funGetEmployees, datae } = Employees();
  let { funGetCars, datac } = Cars();

  useEffect(() => {
    funGetWash();
    funGetServices();
    funGetEmployees();
    funGetCars();
  }, []);

  return (
    <div className="w-[70%] mx-auto py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            The Art of Car Wash
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Premium car care services with state-of-the-art facilities and expert staff
          </p>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Services Gallery</h2>
        <SwiperSlides />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{data.length}</div>
          <div className="text-emerald-100 text-sm font-medium">Wash Stations</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{datas.length}</div>
          <div className="text-purple-100 text-sm font-medium">Services</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{datae.length}</div>
          <div className="text-orange-100 text-sm font-medium">Team Members</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{datac.length}</div>
          <div className="text-blue-100 text-sm font-medium">Cars Serviced</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Wash Stations */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🚿</div>
                <h3 className="text-2xl font-bold">Wash Stations</h3>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="font-bold text-lg">{data.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {data?.map((e, index) => (
                <div
                  key={e.id}
                  className="flex items-center p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border-l-4 border-cyan-400 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{e.name}</h4>
                    <p className="text-gray-500 text-sm">Professional Station</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🛠️</div>
                <h3 className="text-2xl font-bold">Our Services</h3>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="font-bold text-lg">{datas.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {datas?.map((e, index) => (
                <div
                  key={e.id}
                  className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border-l-4 border-emerald-400 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mr-4">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{e.name}</h4>
                    <p className="text-gray-500 text-sm">Premium Service</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">👨‍🔧</div>
                <h3 className="text-2xl font-bold">Our Team</h3>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="font-bold text-lg">{datae.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {datae?.map((e, index) => (
                <div
                  key={e.id}
                  className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-l-4 border-purple-400 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                    {e.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{e.name}</h4>
                    <p className="text-gray-500 text-sm">Car Wash Specialist</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cars */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🚗</div>
                <h3 className="text-2xl font-bold">Cars Serviced</h3>
              </div>
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="font-bold text-lg">{datac.length}</span>
              </div>
            </div>
          </div>
          <div className="p-6 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {datac?.map((e, index) => (
                <div
                  key={e.id}
                  className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-400 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-lg mr-4">
                    🚙
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{e.car_model}</h4>
                    <p className="text-gray-500 text-sm">Recently Serviced</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-2">Ready for a Premium Wash?</h3>
        <p className="text-gray-300 mb-4">Experience the difference with our professional car wash services</p>
        <div className="flex justify-center space-x-4 text-4xl">
          <span>🌟</span>
          <span>🚗</span>
          <span>💧</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};

export default Home;