import Image from "next/image";
import OptionsSelector from "./components/OptionsSelector";
import GetCarYear from "./components/GetCarYear";

export default function Home() {
  return (
    <div className="w-60">
      <GetCarYear />
    </div>
  );
}
