export interface Location {
	id: string;
	name: string;
	country: string;
	state?: string;
	geo: {
		lat: number;
		lon: number;
	},
}

export function buildLocationId(name: string, country: string, state?: string): string {
	return `${name}|${state}|${country}`;
}