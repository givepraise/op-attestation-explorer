import Optimism from "./components/images/optimism.svg";
import { OptimistCustomDisplay } from "./components/attestation/custom-displays/OptimistCustomDisplay";
import Passport from "./components/images/passport.svg";
import { PassportCustomDisplay } from "./components/attestation/custom-displays/PassportCustomDisplay";
import Praise from "./components/images/praise.svg";
import { PraiseCustomDisplay } from "./components/attestation/custom-displays/PraiseCustomDisplay";
import RegenScore from "./components/images/regenscore.svg";
import { RegenScoreCustomDisplay } from "./components/attestation/custom-displays/RegenScoreCustomDisplay";
import { SchemaListItem } from "./eas/types/schema-list-item.type";

export const EAS_API_URL = "https://optimism.easscan.org/graphql";

export const PRAISE_API_URL = "https://gnosisdao.givepraise.xyz/api/users";

export const USERS_PER_PAGE = 15;
export const ATTESTATIONS_PER_PAGE = 15;

export const DEFAULT_REVALIDATE_TIME = 60 * 15; // 15 minutes

// The schema IDs for the EAS schemas
export const UID_OPTIMIST =
  "0xac4c92fc5c7babed88f78a917cdbcdc1c496a8f4ab2d5b2ec29402736b2cf929";
export const UID_PRAISE =
  "0x1c622d3fdb24759ed71266b218c4750ad54549a7612451851f3b0432ce167e68";
export const UID_REGEN_SCORE =
  "0xa1285d8c9b3164eb94f22a4084d4d01fc7fb66d27c56ddba32033c63a5ed76cd";
export const UID_PASSPORT_SCORE =
  "0x6ab5d34260fca0cfcf0e76e96d439cace6aa7c3c019d7c4580ed52c6845e9c89";

// The Safe address that is used to attest to Praise attestations
export const OP_PRAISE_SAFE_ADDRESS =
  "0x6435dCABb62Cb46c9fB94De763CD19a40Ff6Ce23";

export const EAS_SCHEMAS: SchemaListItem[] = [
  {
    name: "Praise",
    description:
      "Praise is a community intelligence system that promotes active participation and collaboration through peer recognition and rewards. We help communities become more intelligent, productive and inclusive by providing a simple way for community members to acknowledge, praise and reward each other’s contributions.",
    projectUrl: "https://givepraise.xyz/",
    uid: UID_PRAISE,
    displayComponent: PraiseCustomDisplay,
    logo: Praise,
    gqlWhere: {
      attester: {
        equals: OP_PRAISE_SAFE_ADDRESS,
      },
      AND: [
        {
          schemaId: {
            equals: UID_PRAISE,
          },
        },
      ],
    },
  },
  {
    name: "Regen Score",
    description: "On-chain reputation layer for regens in public goods.",
    projectUrl: "https://regenscore.io/",
    uid: UID_REGEN_SCORE,
    displayComponent: RegenScoreCustomDisplay,
    logo: RegenScore,
    gqlWhere: {
      schemaId: {
        equals: UID_REGEN_SCORE,
      },
      attester: {
        equals: "0xd8dA8766431366E9aD63eA6D16d9199cece2aA08",
      },
    },
  },
  {
    name: "Optimist",
    description:
      "Retroactive Public Goods Funding is moving towards a future in which the Collective gives projects the ability to quantify their impact. The Optimist Profile is a first step towards this future, enabling projects to self-report their impact & profit and provide references to relevant data sources.",
    projectUrl: "https://gov.optimism.io/",
    uid: UID_OPTIMIST,
    displayComponent: OptimistCustomDisplay,
    logo: Optimism,
    gqlWhere: {
      schemaId: {
        equals: UID_OPTIMIST,
      },
    },
  },
  {
    name: "Passport Score",
    description:
      "By collecting “stamps” of validation for your identity and online reputation, you can gain access to the most trustworthy web3 experiences and maximize your ability to benefit from platforms like Gitcoin Grants. The more you verify your identity, the more opportunities you will have to vote and participate across the web3.",
    projectUrl: "https://passport.gitcoin.co",
    uid: UID_PASSPORT_SCORE,
    displayComponent: PassportCustomDisplay,
    logo: Passport,
    gqlWhere: {
      schemaId: {
        equals: UID_PASSPORT_SCORE,
      },
    },
  },
];

export const WHERE_ALL_SCHEMAS = {
  OR: EAS_SCHEMAS.map((schema) => schema.gqlWhere),
};
