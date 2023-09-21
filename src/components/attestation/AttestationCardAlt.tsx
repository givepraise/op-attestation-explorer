import { Attestation } from "../../eas/types/gql/attestation.type";
import { From } from "../attestation-card/From";
import Link from "next/link";
import { SchemaName } from "../attestation-card/SchemaName";
import { Time } from "../attestation-card/Time";
import { Uid } from "../attestation-card/Uid";
import { UserIcon } from "../user/UserIcon";

type AttestationCardAltProps = {
  attestation: Attestation;
};

export function AttestationCardAlt({ attestation }: AttestationCardAltProps) {
  return (
    <Link href={`/attestation/${attestation.id}`}>
      <div className="flex items-center justify-between w-full p-5 bg-white gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1">
        <div className="grid w-32 grid-cols-3">
          <div className="flex items-center w-12 text-xs text-gray-500">
            From
          </div>
          <div className="flex items-center col-span-2 gap-1">
            <UserIcon
              address={attestation.attester}
              size="tiny"
              className="inline-block"
            />
            <From from={attestation.attester} />
          </div>
          <div className="flex items-center w-12 text-xs text-gray-500">
            Uid
          </div>
          <Uid uid={attestation.id} className="col-span-2" />
        </div>
        <Time time={attestation.time.toString()} />
        <SchemaName attestation={attestation} />
      </div>
    </Link>
  );
}
