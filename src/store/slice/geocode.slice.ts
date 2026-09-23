import type { StateCreator } from "zustand";
import type { GeoResponse, City } from "@/types/geocoding.types";

let abortController: AbortController | null = null;

export interface GeoDataSlice {
  cityList: City[] | [];
  isGeoDataLoading: boolean;
  geoDataError: string;
  prevQuery: string;
  getGeoData: (query: string) => void;
	clearGeoError: () => void;
};

export const createGeoDataSlice: StateCreator<GeoDataSlice> = (set) => ({
  cityList: [],
  isGeoDataLoading: false,
  geoDataError: '',
  prevQuery: '',
	clearGeoError: () => {
		set(({ geoDataError: '' }));
	},
  getGeoData: async (query) => {
    if (abortController) {
      abortController.abort();
    };

    if (!query) {
      set(({ isGeoDataLoading: false, geoDataError: '' }));
      return;
    };

		set(({ isGeoDataLoading: true, geoDataError: '' }));
    abortController = new AbortController();
    const { signal } = abortController;

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4`,
				{ signal }
      );

			const data: GeoResponse = await response.json();

			if (!data.results || data.results.length === 0) {
				throw new Error('No locations found.'); 
			};

			set(({ cityList: data.results ?? [], isGeoDataLoading: false, geoDataError: '' }));
    }
    catch (err: any) {
			if (err.name === 'AbortError') return;
			set(({
				geoDataError: err instanceof Error ? err.message : 'Unknown Error',
				isGeoDataLoading: false,
			}))
    }	
  }
});