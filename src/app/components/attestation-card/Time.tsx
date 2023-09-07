import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type TimeProps = {
  time: string;
};

export function Time({ time }: TimeProps) {
  dayjs.extend(relativeTime);
  return <div className="w-32">{dayjs.unix(parseInt(time)).fromNow()}</div>;
}
