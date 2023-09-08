import { Attestation } from "./attestation.type";

type DisplayComponentProps = {
  attestation: Attestation;
};

export type SchemaListItem = {
  name: string;
  description?: string;
  projectUrl?: string;
  uid: string;
  displayComponent?: (props: DisplayComponentProps) => JSX.Element;
};
