
export interface CountryProperties {
    ISO_A3: string;
    totalCount: number;
    totalCountText: string;
    color?: string;
    ADMIN: string;
}

export interface Feature {
    type: string;
    properties: CountryProperties;
    geometry: Record<string, any>;
}
