"use client";

import { useEffect, useState } from "react";
import { useAddCarModal } from "../context/AddCarModalContext";
import { useSelectedCar } from "../context/SelectedCar";

const GetFullCarInfo = ({ id, index }) => {
  const { carsForComparison, setCarsForComparison, setSelectedCar } =
    useSelectedCar();
  const { setAddCarModalOpen } = useAddCarModal();
  const [data, setData] = useState();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const response = await fetch(
        `https://www.fueleconomy.gov/ws/rest/vehicle/${id}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const carInfo = await response.json();
      setData(carInfo);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedCars = [...carsForComparison];
    updatedCars[index] = {
      ...data,
    };
    setCarsForComparison(updatedCars);
    setSelectedCar({
      make: "",
      model: "",
      year: "",
      id: "",
    });
    setAddCarModalOpen(false);
  };

  return (
    <div className="pt-4 flex">
      <button
        type="button"
        disabled={!data}
        onClick={handleSubmit}
        className="rounded-md w-full  bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        {data ? (
          "Add car"
        ) : (
          <div className="inline-flex  space-x-2 justify-center">
            <span className="-mt-0.5"> Loading</span>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default GetFullCarInfo;
