"use client";
import GetCarYear from "./components/GetCarYear";
import GetCarMake from "./components/GetCarMake";
import { useSelectedCar } from "./context/SelectedCar";
import GetCarModel from "./components/GetCarModel";
import GetCarOptions from "./components/GetCarOptions";
import GetFullCarInfo from "./components/GetFullCarInfo";
export default function Home() {
  const { selectedCar } = useSelectedCar();

  return (
    <div className="w-60">
      {/* Server Component for fetching and displaying car year */}

      <GetCarYear />

      {selectedCar.year ? <GetCarMake /> : null}
      {selectedCar.make ? <GetCarModel /> : null}
      {selectedCar.model ? <GetCarOptions /> : null}

      {selectedCar.id ? <GetFullCarInfo id={selectedCar.id} /> : null}
    </div>
  );
}
