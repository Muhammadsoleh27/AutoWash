"use client";
import React, { useEffect } from "react";
import Washstations from "@/stores/washstations/washstations";
import AddWashstation from "@/components/wash station components/add wash station/washstation";
import EditWashstationDialog from "@/components/wash station components/edit wash station/editDialog";

const Washstation = () => {
  const { funGetWash, data, funDeleteWashstation } = Washstations();

  useEffect(() => {
    funGetWash();
  }, []);

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day} - ${month} - ${year} | ${hours}:${minutes}`;
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 w-[75%]">
      <div>
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm">
            Wash Station
          </h1>
          <AddWashstation />
        </div>

        {data.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-5">
            {data.map((e) => (
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
                      Adress
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      {e.adress}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider">
                      Created
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      {formatDateTime(e.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider">
                      Active
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      {e.is_active ? (
                        <p className="text-blue-600 text-xl font-bold">
                          Active
                        </p>
                      ) : (
                        <p className="text-red-600 text-xl font-bold">
                          Inactive
                        </p>
                      )}
                    </p>
                  </div>
                </div>
                <EditWashstationDialog id={e.id} />
                <button
                  onClick={() => funDeleteWashstation(e.id)}
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

export default Washstation;
