"use client";

import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";

type SortOrderOption = {
  id: number;
  name: string;
};

const options: SortOrderOption[] = [
  { id: 1, name: "Sort by: Username" },
  { id: 2, name: "Sort order: # of attestations" },
];

export function UserSortBy() {
  const router = useRouter();
  const pathName = usePathname();

  const selectedOption = pathName.startsWith("/users/by-attestations")
    ? options[1]
    : options[0];

  const changeOption = (option: SortOrderOption) => {
    if (option.id === 1) {
      if (pathName.includes("desc")) {
        router.push("/users/desc/1");
        return;
      }
      router.push("/users/1");
    }
    if (option.id === 2) {
      if (pathName.includes("desc")) {
        router.push("/users/by-attestations/desc/1");
        return;
      }
      router.push("/users/by-attestations/1");
    }
  };

  return (
    <div className="relative justify-center">
      <Listbox value={selectedOption} onChange={changeOption}>
        <Listbox.Button className="w-full p-2 border-none hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 focus:ring-1 focus:ring-theme-3 rounded-xl shadow-theme-shadow-1 focus:shadow-theme-shadow-1">
          <div className="flex items-center w-full">
            {selectedOption ? selectedOption.name : "Sort order"}
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 pl-2" />
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 p-2 bg-white border-none top-12 rounded-xl shadow-theme-shadow-1 focus:shadow-theme-shadow-1">
          {options.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              className="px-3 py-1 my-1 cursor-pointer w-72 ui-active:bg-theme-3 ui-active:bg-opacity-10 whitespace-nowrap"
            >
              {person.name}
              <FontAwesomeIcon
                icon={faCheck}
                className="hidden ml-3 ui-selected:inline-block"
              />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}