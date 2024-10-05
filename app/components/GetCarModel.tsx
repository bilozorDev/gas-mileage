import { useEffect, useState } from "react";
import { useSelectedCar } from "../context/SelectedCar";
import OptionsSelector from "./OptionsSelector";
import DisabledSelector from "./DisabledSelector";

const GetCarModel = () => {
  const [carModels, setCarModels] = useState([]);
  const { selectedCar, setSelectedCar } = useSelectedCar();
  useEffect(() => {
    if (!selectedCar.make || !selectedCar.year) {
      return;
    }
    fetch(
      `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${selectedCar.year}&make=${selectedCar.make}`,
      {
        headers: { Accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCarModels(data.menuItem);
      });
  }, [selectedCar]);
  if (carModels.length === 0) {
    return <DisabledSelector placeholder="Loading car models..." title="model" waiting={true}/>;
  }
  return <OptionsSelector options={carModels} params="model" />;
};

export default GetCarModel;
