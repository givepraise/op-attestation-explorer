import { PraiseCustomDisplay } from "./components/attestation/custom-displays/PraiseCustomDisplay";
import { SchemaListItem } from "./eas/types/schema-list-item.type";

export const OP_SAFE_ADDRESS = "0xf6937E015d5337F648fE01a03A74c9FAA4f90d54";

export const EAS_SCHEMAS: SchemaListItem[] = [
  {
    name: "Praise",
    description:
      "Praise is a community intelligence system that promotes active participation and collaboration through peer recognition and rewards. We help communities become more intelligent, productive and inclusive by providing a simple way for community members to acknowledge, praise and reward each other’s contributions.",
    projectUrl: "https://givepraise.xyz/",
    uid: "0x569cab01c87d76b5e85706a4eca2a10a7499758a3e7aa0e81feeb3aaf95255be",
    displayComponent: PraiseCustomDisplay,
    gqlWhere: {
      attester: {
        equals: "0xf6937E015d5337F648fE01a03A74c9FAA4f90d54",
      },
      AND: [
        {
          schemaId: {
            equals:
              "0x569cab01c87d76b5e85706a4eca2a10a7499758a3e7aa0e81feeb3aaf95255be",
          },
        },
      ],
    },
  },
  {
    name: "Regen Score",
    uid: "0x808a1200857ee4e47a52b510cf85046ff05b7b4b15db40659b8143777564c4a7",
    gqlWhere: {
      schemaId: {
        equals:
          "0x808a1200857ee4e47a52b510cf85046ff05b7b4b15db40659b8143777564c4a7",
      },
    },
  },
];

export const PRAISE_API_URL = "https://gnosisdao.givepraise.xyz/api/users";

export const USERS_PER_PAGE = 6;

export const ATTESTATIONS_PER_PAGE = 6;

export const WHERE_ALL_SCHEMAS = {
  OR: EAS_SCHEMAS.map((schema) => schema.gqlWhere),
};
