import Attestation from "@/components/attestation/Attestation";

export default async function AttestationPage({
                                                  params,
                                              }: {
    params: { id: string };
}) {
    return <Attestation params={params} />;
}
