"use client";

import { useEffect, useState } from "react";
import { useSelectedCar } from "../context/SelectedCar";

const GetFullCarInfo = ({ id, index }) => {
  const { carsForComparison, setCarsForComparison, setSelectedCar } =
    useSelectedCar();
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

  if (!data) {
    return <div>Loading...</div>;
  }

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
  };

  return (
    <div className="flex">
      <button
        type="button"
        onClick={handleSubmit}
        className="rounded-md mx-auto bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      >
        Add car
      </button>
    </div>
  );
};

export default GetFullCarInfo;
