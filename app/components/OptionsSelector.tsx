"use client";
import { useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelectedCar } from "../context/SelectedCar";
import DisabledSelector from "./DisabledSelector";

type Option = {
  text: string;
  value: string;
};
type SelectorOptions = {
  options: Option[];
};

const OptionsSelector: React.FC<SelectorOptions & { params: string }> = ({
  options,
  params,
}) => {
  const [selected, setSelected] = useState({ text: "Select", value: "Select" });
  const {
    selectedCar,
    handleMakeChange,
    handleModelChange,
    handleYearChange,
    handleOptionChange,
  } = useSelectedCar() as {
    selectedCar: { make: string; model: string; year: string };
    handleMakeChange: (make: string) => void;
    handleModelChange: (model: string) => void;
    handleYearChange: (year: string) => void;
    handleOptionChange: (option: string) => void;
  };
  // Sync the local selected state when the options or selectedCar changes
  useEffect(() => {
    if (params === "make" && selectedCar.make === "") {
      setSelected({ text: "Select", value: "Select" }); // Reset selected when make is cleared
    } else if (params === "model" && selectedCar.model === "") {
      setSelected({ text: "Select", value: "Select" }); // Reset selected when model is cleared
    } else if (params === "year" && selectedCar.year === "") {
      setSelected({ text: "Select", value: "Select" }); // Reset selected when year is cleared
    }
  }, [selectedCar, options, params]);
  // Function to update the selected car based on params (make, model, year)
  const handleSelectionChange = (option: Option) => {
    setSelected(option);
    switch (params) {
      case "make":
        handleMakeChange(option.value);
        console.log("Make: " + option.value);
        break;
      case "model":
        handleModelChange(option.value);
        break;
      case "year":
        handleYearChange(option.value);
        break;
      case "option":
        handleOptionChange(option.value);
        break;
      default:
        break;
    }
  };
  if (options.length === 0) {
    return <DisabledSelector placeholder="Loading..."/>;
  }
  // Ensure options is always an array (even if a single object is returned)
  const normalizedOptions = Array.isArray(options) ? options : [options];

  return (
    <Listbox value={selected} onChange={handleSelectionChange}>
      <Label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {params}
      </Label>
      <div className="relative mt-2">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span className="block truncate">{selected.text}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {normalizedOptions.map((option) => (
            <ListboxOption
              key={option.value}
              value={option}
              className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option.text}
              </span>

              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default OptionsSelector;
