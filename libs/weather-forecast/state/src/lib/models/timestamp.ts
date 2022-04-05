import { format } from 'date-fns/fp';

export interface Timestamp {
	id: string;
	dt: Date;
}

const formatAsDay = format('dd.MM.yyyy');
const formatAsHour = format('HH.dd.MM.yyyy');

export const buildDayTimestampId = (date: Date) => formatAsDay(date);
export const buildHourTimestampId = (date: Date) => formatAsHour(date);