"use client";
import React, { useEffect } from "react";
import Washstations from "@/stores/washstations/washstations";
import ServicesStore from "@/stores/services/services";
import AddServices from "@/components/services components/add services/addDialog";
import EditServicesDialog from "@/components/services components/edit services/editDialog";

const Services = () => {
  const { funGetWash, data } = Washstations();
  const { funGetServices, datas, funDeleteServices } = ServicesStore();

  useEffect(() => {
    funGetWash();
    funGetServices();
  }, []);

  function GetWash(id) {
    const wash = data.find((e) => e.id == id);
    return wash?.name || "Unknown";
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 w-[75%]">
      <div>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm">
            Services
          </h1>
          <AddServices/>
        </div>

        {datas.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-5">
            {datas.map((e) => (
              <div
                key={e.id}
                className="w-full sm:w-72 md:w-80 lg:w-80 xl:w-80
                           bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                           flex flex-col items-center p-6 border-t-4 border-blue-600"
              >
                <div className="text-center mb-4">
                  <h2 className="text-blue-900 text-3xl font-extrabold capitalize leading-tight">
                    {e.name}
                  </h2>
                </div>

                <div className="w-full text-center space-y-4 mb-6">
                  <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider">
                      Price
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      {e.price}$
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider">
                      Wash Station
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      {GetWash(e.wash_id)}
                    </p>
                  </div>
                </div>
                <EditServicesDialog id={e.id} />
                <button
                  onClick={() => funDeleteServices(e.id)}
                  className="cursor-pointer mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md
                             transition-colors duration-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 text-xl">
            Loading employees or no data available...
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
