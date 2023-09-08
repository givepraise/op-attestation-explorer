import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { USERS_PER_PAGE } from "../../constants";
import { getUsers } from "../../eas/getUsers";

type UsersPageChooserProps = {
  baseUrl: string;
  currentPage: number;
};

async function UsersPageChooser({
  baseUrl,
  currentPage,
}: UsersPageChooserProps) {
  const users = await getUsers();
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  currentPage = Number(currentPage);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-40">
        {/* First Button */}
        <div className="inline-block mr-4 hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link href={`${baseUrl}/1`}>
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              First
            </Link>
          )}
        </div>

        {/* Previous Button */}
        <div className="inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage > 1 && (
            <Link href={`${baseUrl}/${currentPage - 1}`}>
              {" "}
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              Previous
            </Link>
          )}
        </div>
      </div>

      {/* Current Page Info */}
      <div className="text-sm text-gray-500">
        {currentPage} of {totalPages}
      </div>

      <div className="flex justify-end w-40">
        {/* Next Button */}
        <div className="inline-block mr-4 hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`${baseUrl}/${currentPage + 1}`}>
              Next
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>

        {/* Last Button */}
        <div className="inline-block hover:border-b-2 hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`${baseUrl}/${totalPages}`}>
              Last
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 pl-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPageChooser;
