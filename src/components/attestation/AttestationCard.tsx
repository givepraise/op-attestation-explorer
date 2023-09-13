import { Attestation } from "../../eas/types/gql/attestation.type";
import { From } from "../attestation-card/From";
import Link from "next/link";
import { Recipient } from "../attestation-card/Recipient";
import { SchemaName } from "../attestation-card/SchemaName";
import { Time } from "../attestation-card/Time";
import { Uid } from "../attestation-card/Uid";
import { UserIcon } from "../user/UserIcon";
import { getUserName } from "../../eas/getUserName";

type AttestationCardProps = {
  attestation: Attestation;
};

export async function AttestationCard({ attestation }: AttestationCardProps) {
  return (
    <Link href={`/attestation/${attestation.id}`}>
      <div className="flex items-center justify-between w-full p-5 text-sm bg-white md:text-base gap-x-5 hover:ring-4 hover:ring-theme-3 hover:ring-opacity-40 rounded-xl shadow-theme-shadow-1">
        <UserIcon address={attestation.recipient} />
        <Recipient recipient={attestation.recipient} />
        <Time time={attestation.time.toString()} />
        <div className="@2xl:grid @2xl:grid-cols-3 @2xl:w-56 text-left hidden">
          <div>From</div>
          <From from={attestation.attester} className="col-span-2" />
          <div>Uid</div>
          <Uid uid={attestation.id} className="col-span-2" />
        </div>
        <SchemaName attestation={attestation} />
      </div>
    </Link>
  );
}
