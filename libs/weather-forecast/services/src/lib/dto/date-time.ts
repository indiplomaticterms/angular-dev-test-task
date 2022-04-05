export type DateTime = number;

export function toDate(dt: DateTime): Date {
	return new Date(dt * 1000);
}