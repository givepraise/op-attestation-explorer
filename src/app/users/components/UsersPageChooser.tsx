import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { USERS_PER_PAGE } from "../../../constants";
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
    <div className="flex justify-between w-full">
      <div className="w-52">
        {/* First Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1 mr-4">
          {currentPage > 1 && (
            <Link href={`${baseUrl}/1`}>
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 pr-2" />
              First
            </Link>
          )}
        </div>

        {/* Previous Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1">
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
      <div>
        page {currentPage} of {totalPages}
      </div>

      <div className="w-52 flex justify-end">
        {/* Next Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1 mr-4">
          {currentPage < totalPages && (
            <Link href={`${baseUrl}/${currentPage + 1}`}>
              Next
              <FontAwesomeIcon icon={faArrowRight} className="pl-2 w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Last Button */}
        <div className="hover:border-b-2 inline-block hover:border-theme-1">
          {currentPage < totalPages && (
            <Link href={`${baseUrl}/${totalPages}`}>
              Last
              <FontAwesomeIcon icon={faArrowRight} className="pl-2 w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersPageChooser;
