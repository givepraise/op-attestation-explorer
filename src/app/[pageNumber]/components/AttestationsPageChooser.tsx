import { ATTESTATIONS_PER_PAGE } from "../../../constants";
import Link from "next/link";
import React from "react";
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
    <div className="flex items-center justify-center space-x-2">
      {/* First Button */}
      {currentPage > 1 && <Link href="/1">{"< First"}</Link>}

      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`/${currentPage - 1}`}>{"< Previous"}</Link>
      )}

      {/* Current Page Info */}
      <span>
        [page {currentPage} of {totalPages}]
      </span>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`/${currentPage + 1}`}>{"Next >"}</Link>
      )}

      {/* Last Button */}
      {currentPage < totalPages && (
        <Link href={`/${totalPages}`}>{"Last >"}</Link>
      )}
    </div>
  );
}

export default AttestationsPageChooser;
