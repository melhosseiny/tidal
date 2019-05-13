import { Duration } from 'luxon';

export default function(n) {
  return Duration.fromObject({seconds: n}).toFormat("mm:ss");
}
