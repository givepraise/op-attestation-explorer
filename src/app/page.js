import { AttestationsLandingPageList } from "../components/attestations/AttestationsLandingPageList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Jonas from "../components/images/jonas.png";
import Kristofer from "../components/images/kristofer.jpeg";
import LandingPage1 from "../components/images/landingpage-1.svg";
import LandingPage2 from "../components/images/landingpage-2.svg";
import Link from "next/link";
import Optimism from "../components/images/optimism.svg";
import Passport from "../components/images/passport.svg";
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

      <div className="relative w-full overflow-hidden">
        <div className="flex items-center justify-between w-[2304px] animate-scrollHorizontally">
          {/* Original Logos */}
          <Image src={Praise} alt="Praise" width={100} />
          <Image src={Passport} alt="Gitcoin Passport" width={120} />
          <Image src={Optimism} alt="Optimism" width={100} />
          <Image src={RegenScore} alt="Regen Score" width={150} />

          {/* Duplicated Logos - 1st Set */}
          <Image src={Praise} alt="Praise" width={100} />
          <Image src={Passport} alt="Gitcoin Passport" width={120} />
          <Image src={Optimism} alt="Optimism" width={100} />
          <Image src={RegenScore} alt="Regen Score" width={150} />

          {/* Duplicated Logos - 2nd Set */}
          <Image src={Praise} alt="Praise" width={100} />
          <Image src={Passport} alt="Gitcoin Passport" width={120} />
          <Image src={Optimism} alt="Optimism" width={100} />
          <Image src={RegenScore} alt="Regen Score" width={150} />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-[35rem] ">
          <AttestationsLandingPageList />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Link href="/1">
          <div className="px-8 py-3 font-semibold text-center text-white rounded-full text-md md:text-xl bg-theme-1 hover:bg-theme-2">
            Explore Attestations
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-start justify-center w-full mt-10 gap-32">
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
              information. They play a critical role whenever you need to prove
              or verify something. EAS enables anyone to make attestations
              onchain or offchain about anything, fostering a more trustful and
              transparent world.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-10 md:flex-row">
          <div className="text-right">
            <h1>What is EAS?</h1>
            <p className="text-xl leading-8">
              <a
                href="https://attest.sh/"
                target="_blank"
                className="underline-red"
              >
                Ethereum Attestation Service
              </a>{" "}
              (EAS) is a public infrastructure for making attestations either
              onchain or offchain. It serves as a standard and base layer where
              any entity can make attestations about anything, providing a
              decentralized ledger for attestations.
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
            is crucial. EAS aims to provide a common way to trust the
            authenticity of information and the safety of interactions, both
            online and onchain.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <Link href="/1">
            <div className="px-8 py-3 font-semibold text-center text-white rounded-full text-md md:text-xl bg-theme-1 hover:bg-theme-2">
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
              The determination of citizenship distribution will eventually be
              the responsibility of Optimism’s two-house governance system and
              will be issued based on the reputation that Optimism Collective
              members have earned. – Jonas
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
              created based on Praise data as well as other relevant
              attestations. This will be a simplified version of{" "}
              <a
                href="https://easscan.org"
                target="_blank"
                className="underline-red"
              >
                https://easscan.org
              </a>
              , showing only what is relevant to OP in the context of the future
              OP citizenship selection. – Kristofer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
