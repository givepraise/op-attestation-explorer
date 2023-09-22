import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <div className="sticky flex items-center w-full pt-3 px-7 bg-footer h-28">
      <div className="flex items-center justify-end w-full px-7">
        <div>
          Built by{" "}
          <a href="https://givepraise.xyz" className="underline">
            Praise
            <FontAwesomeIcon
              icon={faPrayingHands}
              className="inline-block w-4 h-4 ml-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
