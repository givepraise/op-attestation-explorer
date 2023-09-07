import { AttestationLoadingCard } from "../../components/AttestationLoadingCard";

export function AttestationsLoadingList() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
      <AttestationLoadingCard />
    </div>
  );
}
