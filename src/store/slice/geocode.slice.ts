import type { StateCreator } from "zustand";
import type { City, GeoDataError } from "@/types/geocoding.types";

let abortController: AbortController | null = null;

export interface GeoDataSlice {
  cityList: City[] | [];
  isGeoDataLoading: boolean;
  geoDataError: string;
  prevQuery: string;
  getGeoData: (query: string) => void;
};

export const createGeoDataSlice: StateCreator<GeoDataSlice> = (set) => ({
  cityList: [],
  isGeoDataLoading: false,
  geoDataError: '',
  prevQuery: '',
  getGeoData: async (query) => {
    if (abortController) {
      abortController.abort();
    };

    if (!query) {
      set(({ isGeoDataLoading: false, geoDataError: '' }));
      return;
    };

    set(({ prevQuery: query, isGeoDataLoading: true, }));
    abortController = new AbortController();
    const { signal } = abortController;

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4`,
				{ signal }
      );

			if (!response.ok) {
				const error: GeoDataError = await response.json();
				throw new Error(error.reason || 'Failed to fetch'); 
			};

			const data = await response.json();
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