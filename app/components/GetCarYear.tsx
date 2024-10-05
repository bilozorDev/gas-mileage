"use client";
import { Suspense, useEffect, useState } from "react";
import OptionsSelector from "./OptionsSelector";
import { useSelectedCar } from "../context/SelectedCar";

const GetCarYear = () => {
  const [availableYears, setAvailableYears] = useState([]);
  const { selectedCar, setSelectedCar } = useSelectedCar();
  useEffect(() => {
    fetch("https://www.fueleconomy.gov/ws/rest/vehicle/menu/year", {
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setAvailableYears(data.menuItem);
      });
  }, []);

  if (availableYears.length === 0) {
    return <p>Loading car years...</p>;
  }

  return <OptionsSelector options={availableYears} params="year" />;
};
export default GetCarYear;
