import { Attestation } from "../../../eas/types/gql/attestation.type";
import { DecodedData } from "../../../eas/types/decoded-data.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { getDecodedValue } from "../../../eas/getDecodedValue";
import { getProfileMetaData } from "../../../eas/optimist/getProfileMetadata";
import { isEmpty } from "lodash";

type CustomDisplayProps = {
  attestation: Attestation;
};

export async function OptimistCustomDisplay({
  attestation,
}: CustomDisplayProps) {
  const json: DecodedData = JSON.parse(attestation.decodedDataJson);
  let profileName = getDecodedValue<string>(json, "name");
  let profileMetadataPtr = getDecodedValue<string>(json, "profileMetadataPtr");
  let metadata = await getProfileMetaData(profileMetadataPtr);

  return (
    <div className="flex w-full gap-10">
      <div className="flex flex-col w-full gap-5 sm:flex-row items-start">
        {metadata?.profileImageUrl ? (
          <img src={metadata.profileImageUrl} className="w-20 h-20" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} className="w-20 h-20" />
        )}
        <div className="flex flex-col justify-start w-full gap-2">
          <div className="text-2xl font-semibold">{profileName}</div>
          {isEmpty(metadata) ? (
            <div>No attestation metadata found</div>
          ) : (
            <>
              {metadata.bio && <div>{metadata.bio}</div>}
              {metadata.websiteUrl && (
                <a
                  href={metadata.websiteUrl}
                  target="_blank"
                  className="underline"
                >
                  {metadata.websiteUrl}
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}