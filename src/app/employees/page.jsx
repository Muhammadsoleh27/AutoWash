"use client";
import React, { useEffect } from "react";
import Employees from "@/stores/employees/employees";
import logoEmploy from "../../assets/Gemini_Generated_Image_uhxl8quhxl8quhxl.png"; // Assuming this is your placeholder image
import Image from "next/image";
import Washstations from "@/stores/washstations/washstations";
import AddEmployees from "@/components/employees components/add employees/addEmployees";
import EditEmployeesDialog from "@/components/employees components/edit employees/editEmployees";

const EmployeesPage = () => {
  const { funGetEmployees, datae, funDeleteEmployees } = Employees();
  const { funGetWash, data } = Washstations();

  useEffect(() => {
    funGetEmployees();
    funGetWash();
  }, []);

  // Helper function to get wash station name
  function GetWash(id) {
    const wash = data.find((e) => e.id == id);
    return wash?.name || "Unknown";
  }

  // --- Placeholder functions for button actions ---
  const handleAddEmployee = () => {
    console.log("Add New Employee button clicked!");
    // Implement navigation to add employee page or open a modal
  };

  const handleEditEmployee = (employeeId) => {
    console.log(`Edit Employee with ID: ${employeeId} clicked!`);
    // Implement navigation to edit employee page or open a modal with employee data
  };
  // --- End Placeholder functions ---

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 w-[75%]">
      <div>
        {/* Page Header: Title and Add Button */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm">
            Our Valued Employees
          </h1>
          <AddEmployees />
        </div>

        {/* Employee Cards Container (Flexbox) */}
        {datae.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-5">
            {datae.map((e) => (
              <div
                key={e.id}
                className="w-full sm:w-72 md:w-80 lg:w-80 xl:w-80
                           bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                           flex flex-col items-center p-6 border-t-4 border-blue-600"
              >
                {/* Employee Image */}
                <Image
                  src={logoEmploy} // Ensure this path is correct and accessible
                  alt={`Profile picture of ${e.name}`}
                  width={140} // Specify width for Next/Image optimization
                  height={140} // Specify height for Next/Image optimization
                  className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-500 mb-6"
                />

                {/* Employee Name */}
                <div className="text-center mb-4">
                  <h2 className="text-blue-900 text-3xl font-extrabold capitalize leading-tight">
                    {e.name}
                  </h2>
                </div>

                {/* Employee Details */}
                <div className="w-full text-center space-y-4 mb-6">
                  <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider">
                      Phone Number
                    </p>
                    <p className="text-blue-600 text-xl font-bold">
                      +992 {e.phone_number}
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

                {/* Edit Button */}
                <EditEmployeesDialog id={e.id} />
                <button
                  onClick={() => funDeleteEmployees(e.id)}
                  className="cursor-pointer mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md
                             transition-colors duration-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Optional: Loading/Empty State
          <div className="col-span-full text-center py-20 text-gray-500 text-xl">
            Loading employees or no data available...
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
