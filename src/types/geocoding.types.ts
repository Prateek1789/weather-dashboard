export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
    country: string;
    admin1: string;
    admin2: string
};

export interface GeoResponse {
    results: City[];
};

export interface GeoDataError {
    error: boolean;
    reason: string;
};
