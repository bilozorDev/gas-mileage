"use client";

import { createContext, useContext, useState } from "react";

type AddCarModalContextType = {
    addCarModalOpen: boolean;
  setAddCarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCarModalContext = createContext<AddCarModalContextType | undefined>(
  undefined
);
export const AddCarModalProvider = (props: { children: React.ReactNode }) => {
  const [addCarModalOpen, setAddCarModalOpen] = useState(false);
  return (
    <AddCarModalContext.Provider value={{ addCarModalOpen, setAddCarModalOpen }}>
      {props.children}
    </AddCarModalContext.Provider>
  );
};

export const useAddCarModal = () => {
  const context = useContext(AddCarModalContext);
  if (context === undefined) {
    throw new Error("useAddCarModal must be used within a AddCarModalProvider");
  }
  return context;
};
