export interface LocationDto {
	name: string;
	local_names: { [lang_code: string]: string };
	lat: number;
	lon: number;
	country: string;
	state?: string;
}