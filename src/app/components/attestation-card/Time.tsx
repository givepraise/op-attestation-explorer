type TimeProps = {
  time: string;
};

export function Time({ time }: TimeProps) {
  return <div>{time}</div>;
}
