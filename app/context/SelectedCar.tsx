"use client";
import React, { useContext, useState } from "react";
type Car = {
  make: string;
  model: string;
  year: string;
  id: string;
};

type SelectedCarContextType = {
  selectedCar: Car;
  setSelectedCar: React.Dispatch<React.SetStateAction<Car>>;
  handleYearChange: (year: string) => void;
  handleMakeChange: (make: string) => void;
  handleModelChange: (model: string) => void;
  handleOptionChange: (option: string) => void;
};

const SelectedCarContext = React.createContext<SelectedCarContextType | null>(
  null
);

interface SelectedCarProviderProps {
  children: React.ReactNode;
}

export const SelectedCarProvider: React.FC<SelectedCarProviderProps> = ({
  children,
}) => {
  const [selectedCar, setSelectedCar] = useState<Car>({
    make: "",
    model: "",
    year: "",
    id: "",
  });

  const handleYearChange = (year: string) => {
    setSelectedCar((prev) => ({
      ...prev,
      year: year,
      make: "",
      model: "",
      id: "",
    }));
  };
  const handleMakeChange = (make: string) => {
    setSelectedCar((prev) => ({ ...prev, make: make, model: "", id: "" }));
  };
  const handleModelChange = (model: string) => {
    setSelectedCar((prev) => ({ ...prev, model: model, id: "" }));
  };
  const handleOptionChange = (option: string) => {
    setSelectedCar((prev) => ({ ...prev, id: option }));
  };

  return (
    <SelectedCarContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        handleYearChange,
        handleMakeChange,
        handleModelChange,
        handleOptionChange,
      }}
    >
      {children}
    </SelectedCarContext.Provider>
  );
};

export const useSelectedCar = () => {
  const context = useContext(SelectedCarContext);
  if (!context) {
    throw new Error("useSelectedCar must be used within a SelectedCarProvider");
  }
  return context;
};
