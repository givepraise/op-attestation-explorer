import { PraiseCustomDisplay } from "./components/attestation/custom-displays/PraiseCustomDisplay";
import { RegenScoreCustomDisplay } from "./components/attestation/custom-displays/RegenScoreCustomDisplay";
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
    description: "On-chain reputation layer for regens in public goods.",
    projectUrl: "https://regenscore.io/",
    uid: "0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd",
    displayComponent: RegenScoreCustomDisplay,
    gqlWhere: {
      schemaId: {
        equals:
          "0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd",
      },
    },
  },
];

export const PRAISE_API_URL = "https://gnosisdao.givepraise.xyz/api/users";

export const USERS_PER_PAGE = 15;

export const ATTESTATIONS_PER_PAGE = 15;

export const WHERE_ALL_SCHEMAS = {
  OR: EAS_SCHEMAS.map((schema) => schema.gqlWhere),
};
