export interface SearchLocationsRequest {
	locationName: string;
	/** @default 1 */
	limit?: number;
}