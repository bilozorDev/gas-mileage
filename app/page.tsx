"use client";
import GetCarYear from "./components/GetCarYear";
import GetCarMake from "./components/GetCarMake";
import { useSelectedCar } from "./context/SelectedCar";
import GetCarModel from "./components/GetCarModel";
import GetCarOptions from "./components/GetCarOptions";
import GetFullCarInfo from "./components/GetFullCarInfo";
import CompirationTable from "./components/CompirationTable";
export default function Home() {
  const { selectedCar } = useSelectedCar();

  return (
    <div >
      {/* Server Component for fetching and displaying car year */}
      <CompirationTable />
      
    </div>
  );
}
