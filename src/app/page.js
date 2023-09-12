import { AttestationsLandingPageList } from "../components/attestations/AttestationsLandingPageList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Jonas from "../components/images/jonas.png";
import Kristofer from "../components/images/kristofer.jpeg";
import LandingPage1 from "../components/images/landingpage-1.svg";
import LandingPage2 from "../components/images/landingpage-2.svg";
import Link from "next/link";
import Praise from "../components/images/praise.svg";
import RegenScore from "../components/images/regenscore.svg";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-20 md:max-w-3xl">
      <div className="flex justify-center w-full landingpage-gradient-1">
        <div className="max-w-2xl text-3xl md:text-4xl mt-10 md:mt-0 font-bold leading-[2.5rem] md:leading-[3.5rem] text-center">
          An attestation explorer for Optimism focusing on attestations that are
          relevant for the OP Citizens eligibility process.
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-10">
        <Image src={Praise} alt="Praise" width={100} />
        <Image src={RegenScore} alt="Regen Score" width={180} />
      </div>

      <div className="flex justify-center w-full">
        <div className="w-[35rem] ">
          <AttestationsLandingPageList />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Link href="/1">
          <div className="px-8 py-3 text-xl font-semibold text-white rounded-full bg-theme-1 hover:bg-theme-2">
            Explore Attestations
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center w-full gap-10 md:flex-row">
        <Image
          src={LandingPage1}
          alt="Landing Page 1"
          className="w-40 max-w-none md:block"
        />
        <div>
          <h1>What Are Attestations?</h1>
          <p className="text-xl leading-8">
            Attestations are digital signatures on a structured piece of
            information. They play a critical role whenever you need to prove or
            verify something. EAS enables anyone to make attestations onchain or
            offchain about anything, fostering a more trustful and transparent
            world.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-10 md:flex-row">
        <div className="text-right">
          <h1>What is EAS?</h1>
          <p className="text-xl leading-8">
            Ethereum Attestation Service (EAS) is a public infrastructure for
            making attestations either onchain or offchain. It serves as a
            standard and base layer where any entity can make attestations about
            anything, providing a decentralized ledger for attestations.
          </p>
        </div>
        <Image
          src={LandingPage2}
          alt="Landing Page 1"
          className="w-40 max-w-none"
        />
      </div>

      <div className="text-center landingpage-gradient-1">
        <h1>Why Trust Matters</h1>
        <p className="text-xl leading-8">
          In a world filled with both genuine and deceptive information, trust
          is crucial. EAS aims to provide a common way to trust the authenticity
          of information and the safety of interactions, both online and
          onchain.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <Link href="/1">
          <div className="px-8 py-3 text-xl font-semibold text-white rounded-full bg-theme-1 hover:bg-theme-2">
            Explore Attestations
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center w-full gap-10 md:flex-row">
        <Image
          src={Jonas}
          alt="Jonas"
          className="w-40 max-w-none rounded-3xl"
        />
        <div>
          <p className="text-xl italic leading-8">
            <FontAwesomeIcon icon={faQuoteLeft} className="w-10 h-10 mr-2" />
            The determination of citizenship distribution will eventually be the
            responsibility of Optimism’s two-house governance system and will be
            issued based on the reputation that Optimism Collective members have
            earned. – Jonas
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-10 md:flex-row">
        <Image
          src={Kristofer}
          alt="Kristofer"
          className="w-40 max-w-none rounded-3xl"
        />
        <div>
          <p className="text-xl italic leading-8">
            <FontAwesomeIcon icon={faQuoteLeft} className="w-10 h-10 mr-2" />
            As part of the Praise on OP project, we will build an OP branded
            attestation explorer to showcase the attestations that have been
            created based on Praise data as well as other relevant attestations.
            This will be a simplified version of{" "}
            <a href="https://easscan.org" className="underline">
              https://easscan.org
            </a>
            , showing only what is relevant to OP in the context of the future
            OP citizenship selection. – Kristofer
          </p>
        </div>
      </div>
    </div>
  );
}

// What are attestations and the Ethereum Attestation Service?
// - This is the first version of an Optimism Attestation Explorer
// - We select attestations that might be relevant in the Citizens eligibility process

// Here are som background info:

// Ethereum Attestation Service (EAS) is an infrastructure public good for making attestations onchain or offchain.

// How do you decide who and what to trust? Our online and onchain worlds are filled with both genuine and deceptive information. We need a common way we can trust the authenticity of information and safety of our interactions. Anytime you need to prove or verify something, attestations will play a critical role.

// EAS is a standard and base layer where any entity can make attestations about anything. This primitive and ledger of attestations will help us decentralize more than just money and assets. We'll be able to coordinate and build reputation systems, voting systems, governance systems, decentralized social media, provenance of goods, knowledge and social graphs, and much much more.

// Explore the docs to learn more. We're excited to see what you'll build with EAS, and we can't wait to see how you'll use attestations to create a more trustful and transparent world.

// Learn more about why EAS was built.

// Why Attestations Matter
// INFO
// At its core, attestations are simply a digital signatures on a structured piece of information.

// In the age of misinformation - verifying facts, proving the authenticity and trustworthiness of information become critical. In our offline worlds, people attest to things all the time. A notary attests that you signed a document, a doctor attests to your health, a university attests to your diploma, you attest to the post and likes you make on social media, a bank attests you're qualified for a loan, and even your friends attest that they like you or that they trust you. The interactions are endless. However there is no universal and standard way for making attestations online or onchain.

// At the heart of every interaction, whether it's a financial transaction or a simple online conversation, trust is essential. EAS enables anyone to make attestations onchain or offchain about anything. You simply register a schema (or use an existing one) about any topic and make attestations referencing that schema.

// We believe that by creating a free and open-source platform for attestations, we can foster innovation and enable people to verify and trust each other in a more efficient and transparent way. Join us and help build the global attestation layer for the Ethereum ecosystem.

// And.. this is the page you should rework.
// - Add as many new div sections as you like.
// - Also suggest headers for the different sections, use h1

// export default function AboutPage() {
//   return (
//     <div className="flex flex-col items-center justify-center gap-10">
//       <div>About</div>
//       <div>
//         {" "}
//         Attestations: Attestations are signed statements about a person, entity,
//         or thing, made by an individual, company, or organization and are one of
//         the building blocks of decentralized identity. Praise attestations are
//         generated by the Ethereum Attestation Service (EAS) on the{" "}
//         <a href="https://www.optimism.io/" target="_blank" rel="noreferrer">
//           Optimism
//         </a>
//         blockchain.
//       </div>
//       <div>
//         Jonas quote: The determination of citizenship distribution will
//         eventually be the responsibility of Optimism’s two-house governance
//         system and will be issued based on the reputation that Optimism
//         Collective members have earned. Citizens are meant to represent
//         individual human stakeholders of the Collective: builders, users, and
//         community members who are aligned with the project’s values and are
//         interested in the long-term benefit of the Collective.
//       </div>
//       <div>
//         Kristofer quote: As part of the Praise on OP project we will build an OP
//         branded attestation explorer to showcase the attestations that have been
//         created based on Praise data. This will be a simplified version of
//         https://easscan.org, cutting through the “noise” that is currently there
//         (test schemas etc etc), showing only what is relevant to OP in the
//         context of the future OP citizenship selection. We will be able to show
//         not only Praise attestations but also other relevant attestation that
//         will (or might) be used for citizenship selection. How I have envisioned
//         the future citizens selection scenario is: A subset of the attestations
//         floating around on EAS are selected to be included to “count for
//         citizenship”. These attestation types would need to be weighted against
//         each other to create some kind of aggregate “citizens score”. Anyone can
//         look up their identity on the OP citizens website to see if they are
//         eligible. We will build a simple first first version of this website.
//         Eligible citizens are minted a token for governance access. Unless
//         governance tools will support built in "attestation gating".
//       </div>
//     </div>
//   );
// }
