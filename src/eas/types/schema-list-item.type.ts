import { Attestation } from "./gql/attestation.type";
import {chains} from "@/config";

type DisplayComponentProps = {
  attestation: Attestation;
};

export type SchemaListItem = {
  name: string;
  slug: string;
  description?: string;
  projectUrl?: string;
  uid: string;
  displayComponent?: (
    props: DisplayComponentProps
  ) => JSX.Element | Promise<JSX.Element>;
  logo?: any;
  gqlWhere?: any;
  chain?: chains;
};
