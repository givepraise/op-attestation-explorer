"use client";

import { DataType, DecodedData } from "../../eas/types/decoded-data.type";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type RawDataProps = {
  data: DecodedData;
};

export function RawData({ data }: RawDataProps): JSX.Element {
  return (
    <>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full border-b-4 border-theme-gray-1">
              <div className="text-2xl font-semibold text-left">
                Raw data{" "}
                {open ? (
                  <FontAwesomeIcon icon={faChevronUp} className="w-5 h-5" />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5" />
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full text-xs text-left sm:text-base">
              <div className="w-full grid grid-cols-4">
                <div>
                  <strong>Name</strong>
                </div>
                <div>
                  <strong>Type</strong>
                </div>
                <div className="col-span-2">
                  <strong>Value</strong>
                </div>
                {data.map((item: DataType) => (
                  <>
                    <div>{item.value.name}</div>
                    <div>{item.value.type}</div>
                    <div className="col-span-2 text-ellipsis overflow-clip">
                      {item.value.value.toString()}
                    </div>
                  </>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
