import { useEffect, useState } from "react";
import { useSelectedCar } from "../context/SelectedCar";
import OptionsSelector from "./OptionsSelector";
import DisabledSelector from "./DisabledSelector";

const GetCarOptions = () => {
  const [carOptions, setCarOptions] = useState([]);
  const { selectedCar } = useSelectedCar();
  useEffect(() => {
    if (!selectedCar.make || !selectedCar.year || !selectedCar.model) {
      return;
    }
    fetch(
      `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${selectedCar.year}&make=${selectedCar.make}&model=${selectedCar.model}`,
      {
        headers: { Accept: "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCarOptions(data.menuItem);
      });
  }, [selectedCar]);
  if (carOptions.length === 0) {
    return <DisabledSelector placeholder="Loading available options..." title="option" waiting={true}/>;
  }
  console.log(carOptions);
  return <OptionsSelector options={carOptions} params="option" />;
};
export default GetCarOptions;
