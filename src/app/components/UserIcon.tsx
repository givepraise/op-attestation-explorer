import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

type UserIconProps = {
  address: string;
};

export function UserIcon({ address }: UserIconProps) {
  return (
    <div className="flex">
      <div>
        <FontAwesomeIcon icon={faUserCircle} size="2x" />
      </div>
    </div>
  );
}
