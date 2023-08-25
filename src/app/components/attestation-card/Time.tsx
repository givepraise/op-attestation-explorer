import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type TimeProps = {
  time: string;
};

export function Time({ time }: TimeProps) {
  dayjs.extend(relativeTime);
  return <div>{dayjs.unix(parseInt(time)).fromNow()}</div>;
}
