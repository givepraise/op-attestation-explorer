import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { ATTESTATIONS_PER_PAGE } from "../../constants";
import { getAllAttestations } from "../../eas/getAllAttestations";

type AttestationsPageChooserProps = {
  currentPage: number;
};

async function AttestationsPageChooser({
  currentPage,
}: AttestationsPageChooserProps) {
  const attestations = await getAllAttestations();
  const totalPages = Math.ceil(attestations.length / ATTESTATIONS_PER_PAGE);
  currentPage = Number(currentPage);

  return (
    <div className="flex justify-between w-full items-center">
      <div className="w-40">
        {/* First Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1 mr-4">
          {currentPage > 1 && (
            <Link href="/1">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              First
            </Link>
          )}
        </div>

        {/* Previous Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1">
          {currentPage > 1 && (
            <Link href={`/${currentPage - 1}`}>
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              Previous
            </Link>
          )}
        </div>
      </div>

      {/* Current Page Info */}
      <div className="text-sm text-gray-500 whitespace-nowrap">
        {currentPage} of {totalPages}
      </div>

      <div className="w-40 flex justify-end">
        {/* Next Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1 mr-4">
          {currentPage < totalPages && (
            <Link href={`/${currentPage + 1}`}>
              Next
              <FontAwesomeIcon icon={faArrowRight} className="pl-2 w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Last Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`/${totalPages}`}>
              Last
              <FontAwesomeIcon icon={faArrowRight} className="pl-2 w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttestationsPageChooser;
