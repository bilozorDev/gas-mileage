"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import GetCarYear from "./GetCarYear";
import { useSelectedCar } from "../context/SelectedCar";
import GetCarMake from "./GetCarMake";
import GetCarModel from "./GetCarModel";
import GetCarOptions from "./GetCarOptions";
import GetFullCarInfo from "./GetFullCarInfo";
import DisabledSelector from "./DisabledSelector";
import { useAddCarModal } from "../context/AddCarModalContext";

export default function ComparisonTable() {
  const { carsForComparison, setCarsForComparison } = useSelectedCar();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setAddCarModalOpen } = useAddCarModal();

  // Simulate data fetching from an API

  const sections = [
    {
      name: "Fuel Efficiency and Cost",
      features: [
        { name: "City MPG", key: "city08", symbol: "MPG" }, // city MPG for fuelType1
        { name: "Highway MPG", key: "highway08", symbol: "MPG" }, // highway MPG for fuelType1
        { name: "Combined MPG", key: "comb08", symbol: "MPG" }, // combined MPG for fuelType1
        { name: "Fuel Type", key: "fuelType" }, // fuel type with fuelType1 and fuelType2
        { name: "Annual Fuel Cost", key: "fuelCost08", symbol: "$" }, // annual fuel cost for fuelType1 ($)
        {
          name: "You Save/Spend Over 5 Years",
          key: "youSaveSpend",
          symbol: "$",
        }, // you save/spend over 5 years compared to an average car
      ],
    },
    {
      name: "Performance and Engine",
      features: [
        { name: "Engine Displacement (L)", key: "displ", symbol: "L" }, // engine displacement in liters
        { name: "Cylinders", key: "cylinders", symbol: "cylinder" }, // engine cylinders
        { name: "Transmission", key: "trany" }, // transmission
      ],
    },
    {
      name: "Emissions and Environmental Impact",
      features: [
        {
          name: "CO2 Emissions (g/mile)",
          key: "co2TailpipeGpm",
          symbol: "(g/mile)",
        }, // tailpipe CO2 in grams/mile for fuelType1

        { name: "Greenhouse Gas Score", key: "ghgScore" }, // greenhouse gas score
      ],
    },
  ];

  const handleDeleteCar = (i: number) => {
    const updatedCars = [...carsForComparison];
    updatedCars[i] = {};
    setCarsForComparison(updatedCars);
  };

  const handleAddCar = (i: number) => {
    setSelectedIndex(i);
    setAddCarModalOpen(true);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-pretty text-5xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Compare Cars
        </h1>
        <p className="mt-6 max-w-3xl text-xl font-medium text-gray-600 sm:text-2xl">
          Compare fuel efficiency, performance, and environmental impact of
          different cars.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 pt-16 sm:pt-24 lg:max-w-7xl lg:px-8">
        <table className="w-full text-left">
          <caption className="sr-only">Car comparison table</caption>
          <colgroup>
            <col className="w-2/5" />
            <col className="w-1/5" />

            <col className="w-1/5" />
          </colgroup>
          <thead>
            <tr>
              <td className="p-0" />

              {carsForComparison.map((car, i) => {
                console.log("car", car);
                return Object.keys(car).length != 0 ? (
                  <th key={i} scope="col" className="p-0 text-center ">
                    <div className="text-md font-semibold text-cyan-700 relative">
                      {car?.year} {car?.make} {car?.model}
                      <div
                        className="absolute -top-5 right-0 text-red-600 font-light cursor-pointer"
                        onClick={() => handleDeleteCar(i)}
                      >
                        x
                      </div>
                      <span className="sr-only">car</span>
                    </div>
                  </th>
                ) : (
                  <th key={i} scope="col" className="p-0 text-center">
                    <button
                      className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                      onClick={() => handleAddCar(i)}
                    >
                      Select Car{" "}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          {sections.map((section) => (
            <tbody key={section.name} className="group">
              <tr>
                <th
                  scope="colgroup"
                  colSpan={
                    carsForComparison.length <= 2
                      ? 4
                      : carsForComparison.length + 1
                  }
                  className="px-0 pb-0 pt-10 group-first-of-type:pt-5"
                >
                  <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold text-gray-950">
                    {section.name}
                  </div>
                </th>
              </tr>
              {section.features.map((feature) => (
                <tr
                  key={feature.name}
                  className="border-b border-gray-100 last:border-none"
                >
                  <th
                    scope="row"
                    className="px-0 py-4 text-sm/6 font-normal text-gray-600"
                  >
                    {feature.name}
                  </th>
                  {carsForComparison.length === 0
                    ? [1, 2, 3].map((_, i) => (
                        <td className="p-4" key={i}>
                          <span className="text-sm/6 text-gray-950">-</span>
                        </td>
                      ))
                    : carsForComparison.map((car, i) => {
                        return (
                          <td key={i} className="p-4 text-center">
                            <span className="text-sm/6 text-gray-950">
                              {car[feature.key] ? (
                                <>
                                  {car[feature.key]} {feature.symbol || ""}
                                </>
                              ) : (
                                "-"
                              )}
                            </span>
                          </td>
                        );
                      })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <Modal index={selectedIndex} />
    </div>
  );
}

interface ModalProps {
  index: number;
}

const Modal = ({ index }: ModalProps) => {
  const { selectedCar } = useSelectedCar();
  const { addCarModalOpen, setAddCarModalOpen } = useAddCarModal();
  console.log("index", index);
  return (
    <>
      <AnimatePresence>
        {addCarModalOpen && (
          <Dialog
            static
            open={addCarModalOpen}
            onClose={() => setAddCarModalOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white p-12 min-w-[520px]"
              >
                <DialogTitle className="text-lg font-bold">
                  Add vehicle
                </DialogTitle>

                <GetCarYear />

                {selectedCar.year ? (
                  <GetCarMake />
                ) : (
                  <DisabledSelector placeholder="Select make" title="make" />
                )}
                {selectedCar.make ? (
                  <GetCarModel />
                ) : (
                  <DisabledSelector placeholder="Select model" title="model" />
                )}
                {selectedCar.model ? (
                  <GetCarOptions />
                ) : (
                  <DisabledSelector
                    placeholder="Select options"
                    title="options"
                  />
                )}

                {selectedCar.id ? (
                  <GetFullCarInfo id={selectedCar.id} index={index} />
                ) : (
                  <div className="pt-4 flex">
                    <button
                      type="button"
                      disabled
                      className="rounded-md w-full  bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      Add car
                    </button>
                  </div>
                )}
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
