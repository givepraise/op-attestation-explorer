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
    <div className="flex items-center justify-center space-x-2">
      {/* First Button */}
      {currentPage > 1 && <Link href={`${baseUrl}/1`}>{"< First"}</Link>}

      {/* Previous Button */}
      {currentPage > 1 && (
        <Link href={`${baseUrl}/${currentPage - 1}`}>{"< Previous"}</Link>
      )}

      {/* Current Page Info */}
      <span>
        [page {currentPage} of {totalPages}]
      </span>

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}/${currentPage + 1}`}>{"Next >"}</Link>
      )}

      {/* Last Button */}
      {currentPage < totalPages && (
        <Link href={`${baseUrl}/${totalPages}`}>{"Last >"}</Link>
      )}
    </div>
  );
}

export default UsersPageChooser;
