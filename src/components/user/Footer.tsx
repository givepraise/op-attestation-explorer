import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrayingHands } from "@fortawesome/free-solid-svg-icons";

export function Footer() {
  return (
    <div className="flex items-center w-full pt-3 px-7 bg-footer h-28 sticky">
      <div className="flex items-center justify-end w-full px-7">
        <div>
          Built by{" "}
          <a href="https://givepraise.xyz" className="underline">
            Praise
            <FontAwesomeIcon
              icon={faPrayingHands}
              className="ml-1 w-4 h-4 inline-block"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
