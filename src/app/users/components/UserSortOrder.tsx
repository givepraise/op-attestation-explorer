"use client";

import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useParams, usePathname, useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

type SortOrderOption = {
  id: number;
  name: string;
};

const options: SortOrderOption[] = [
  { id: 1, name: "Sort order: Asc" },
  { id: 2, name: "Sort order: Desc" },
];

export function UserSortOrder() {
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const router = useRouter();
  const pathName = usePathname();

  const selectedOption = pathName.includes("desc") ? options[1] : options[0];

  const changeOption = (option: SortOrderOption) => {
    if (option.id === 1) {
      if (pathName.includes("by-attestations")) {
        router.push("/users/by-attestations/1");
        return;
      }
      router.push("/users/1");
    }
    if (option.id === 2) {
      if (pathName.includes("by-attestations")) {
        router.push("/users/by-attestations/desc/1");
        return;
      }
      router.push("/users/desc/1");
    }
  };

  return (
    <div className="relative flex justify-center">
      <Listbox value={selectedOption} onChange={changeOption}>
        <Listbox.Button className="p-2 text-left cursor-pointer border hover:bg-opacity-10 hover:bg-white">
          <div className="flex w-full">
            {selectedOption ? selectedOption.name : "Sort order"}
            <FontAwesomeIcon icon={faChevronDown} className="pl-2 w-4 h-4" />
          </div>
        </Listbox.Button>
        <Listbox.Options className="absolute left-0 p-2 border bg-black top-12 ">
          {options.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              className="px-3 my-1 py-1 cursor-pointer w-48 ui-active:bg-white ui-active:bg-opacity-10 ui-active:text-white whitespace-nowrap"
            >
              {person.name}
              <FontAwesomeIcon
                icon={faCheck}
                className="hidden ui-selected:inline-block ml-3"
              />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
