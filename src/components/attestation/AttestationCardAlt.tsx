import Link from "next/link";
import { Attestation } from "../../eas/types/attestation.type";
import { From } from "../attestation-card/From";
import { SchemaName } from "../attestation-card/SchemaName";
import { Time } from "../attestation-card/Time";
import { Uid } from "../attestation-card/Uid";

type AttestationCardAltProps = {
  attestation: Attestation;
};

export function AttestationCardAlt({ attestation }: AttestationCardAltProps) {
  return (
    <Link href={`/attestation/${attestation.id}`}>
      <div className="flex justify-between items-center p-5 w-full gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1 bg-white">
        <div className="grid grid-cols-3 w-32">
          <div>From</div>
          <From from={attestation.attester} className="col-span-2" />
          <div>Uid</div>
          <Uid uid={attestation.id} className="col-span-2" />
        </div>
        <Time time={attestation.time.toString()} />
        <SchemaName attestation={attestation} />
      </div>
    </Link>
  );
}
