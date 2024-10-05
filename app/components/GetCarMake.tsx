"use client";
import { useEffect, useState } from "react";
import OptionsSelector from "./OptionsSelector";
import { useSelectedCar } from "../context/SelectedCar";
import DisabledSelector from "./DisabledSelector";

const GetCarMake = () => {
    const {selectedCar, setSelectedCar} = useSelectedCar();
    const [availableMakes, setAvailableMakes] = useState([]);
    useEffect(() => {
      if (!selectedCar.year) {
        return;
      }
      fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${selectedCar.year}`, {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          setAvailableMakes(data.menuItem);
        });
    }, [selectedCar]);
    if (availableMakes.length === 0) {
      return <DisabledSelector placeholder="Loading car makes..." title="make" waiting={true} />;
    }
  return <OptionsSelector options={availableMakes} params="make" />;
};
export default GetCarMake;