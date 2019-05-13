import {DateTime} from 'luxon';

export default function(date) {
  return DateTime.fromFormat(date, "yyyy-mm-dd").toFormat("yyyy");
}
