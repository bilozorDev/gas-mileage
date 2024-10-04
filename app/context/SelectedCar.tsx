import React, { useState } from "react";
type Car = {
  make: string;
  model: string;
  year: number;
};

const SelectedCarContext = React.createContext<Car | null>(null);

interface SelectedCarProviderProps {
  children: React.ReactNode;
}

export const SelectedCarProvider: React.FC<SelectedCarProviderProps> = ({
  children,
}) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>({
    make: "",
    model: "",
    year: 0,
  });

  return (
    <SelectedCarContext.Provider value={selectedCar}>
      {children}
    </SelectedCarContext.Provider>
  );
};
