"use client";

import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function DisabledSelector({
  placeholder,
  title = "",
  waiting = false,
}: {
  placeholder: string;
  title?: string;
  waiting?: boolean;
}) {
  return (
    <Listbox>
      <Label className="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {title}
      </Label>
      <div className="relative mt-2">
        <ListboxButton
          disabled
          className="relative bg-gray-100 w-full rounded-md opacity-70 cursor-not-allowed py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <span className="block truncate capitalize">
            {" "}
            {waiting ? (
              <div className="inline-flex  space-x-2 justify-center">
               <span className="-mt-0.5"> {placeholder}</span>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                
              </div>
            ) : (
              placeholder
            )}
          </span>
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
          <ListboxOption
            value=""
            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
          >
            <span className="block truncate font-normal group-data-[selected]:font-semibold"></span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
              <CheckIcon aria-hidden="true" className="h-5 w-5" />
            </span>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
