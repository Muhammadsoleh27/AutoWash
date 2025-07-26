"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import history from "../../assets/image.png";
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-blue-400 py-2 px-7 rounded-[10px] cursor-pointer">
          <Image src={history} alt="history" className="w-[20px]" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Records</DialogTitle>
        </DialogHeader>

        {/* Tab Buttons */}
        <div className="flex gap-4 mb-4">
          <Button
            variant={activeTab === "today" ? "default" : "outline"}
            onClick={() => setActiveTab("today")}
          >
            Today
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
          >
            History Car
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "today" && (
          <section>
            <div className="flex justify-between items-center border-b-2 border-b-gray-400">
              <div className="flex items-center gap-5">
                <Image src={car} alt="car" className="w-[50px]" />
                <h2 className="font-bold text-2xl">Total Cars</h2>
              </div>
              <h1 className="font-bold text-2xl text-gray-400">
                {dataHisT.total_cars}
              </h1>
            </div>
            <div className="flex justify-between items-center border-b-2 my-5 py-2 border-b-gray-400">
              <div className="flex items-center gap-5">
                <Image src={price} alt="car" className="w-[50px]" />
                <h2 className="font-bold text-2xl">Total Price</h2>
              </div>
              <h1 className="font-bold text-2xl text-gray-400">
                {dataHisT.total_price}$
              </h1>
            </div>
          </section>
        )}
        {activeTab === "history" && (
          <section>
            <div className="flex justify-between items-center border-b-2 border-b-gray-400">
              <div className="flex items-center gap-5">
                <Image src={car} alt="car" className="w-[50px]" />
                <h2 className="font-bold text-2xl">Total Cars</h2>
              </div>
              <h1 className="font-bold text-2xl text-gray-400">
                {dataHisA.total_cars}
              </h1>
            </div>
            <div className="flex justify-between items-center border-b-2 my-5 py-2 border-b-gray-400">
              <div className="flex items-center gap-5">
                <Image src={price} alt="car" className="w-[50px]" />
                <h2 className="font-bold text-2xl">Total Price</h2>
              </div>
              <h1 className="font-bold text-2xl text-gray-400">
                {dataHisA.total_price}$
              </h1>
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default History_car;
