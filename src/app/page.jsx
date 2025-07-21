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
    <div className="w-[70%] mx-auto py-8">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-10">
        The Art of Car Wash
      </h2>

      <div className="mb-10">
        <SwiperSlides />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">
            🚿 Wash Stations
          </h3>
          <ul className="space-y-2">
            {data?.map((e) => (
              <li
                key={e.id}
                className="bg-white p-3 rounded shadow-sm text-blue-800"
              >
                {e.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">
            🛠️ Services
          </h3>
          <ul className="space-y-2">
            {datas?.map((e) => (
              <li
                key={e.id}
                className="bg-white p-3 rounded shadow-sm text-blue-800"
              >
                {e.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">
            👨‍🔧 Employees
          </h3>
          <ul className="space-y-2">
            {datae?.map((e) => (
              <li
                key={e.id}
                className="bg-white p-3 rounded shadow-sm text-blue-800"
              >
                {e.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">🚗 Cars</h3>
          <ul className="space-y-2">
            {datac?.map((e) => (
              <li
                key={e.id}
                className="bg-white p-3 rounded shadow-sm text-blue-800"
              >
                {e.car_model}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
