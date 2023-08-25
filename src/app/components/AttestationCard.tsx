import { Attestation } from "../eas/types/attestation.type";
import { From } from "./attestation-card/From";
import Link from "next/link";
import { Recipient } from "./attestation-card/Recipient";
import { SchemaName } from "./attestation-card/SchemaName";
import { Time } from "./attestation-card/Time";
import { Uid } from "./attestation-card/Uid";
import { UserIcon } from "./UserIcon";

type AttestationCardProps = {
  attestation: Attestation;
};

export function AttestationCard({ attestation }: AttestationCardProps) {
  console.log(attestation);
  return (
    <Link href={`/attestation/${attestation.id}`}>
      <div className="flex justify-between border p-5 w-full gap-x-5 hover:bg-white hover:bg-opacity-10">
        <div className="flex items-center content-center gap-5">
          <UserIcon address={attestation.recipient} />
          <div>
            <Recipient recipient={attestation.recipient} />
            <Time time={attestation.time.toString()} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <From from={attestation.attester} />
          <Uid uid={attestation.id} />
        </div>
        <SchemaName attestation={attestation} />
      </div>
    </Link>
  );
}
