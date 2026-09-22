import { create } from "zustand";
import { type GeoDataSlice, createGeoDataSlice } from "./slice/geocode.slice";

type WeatherStore = GeoDataSlice;

export const useWeatherStore = create<WeatherStore>()((...set) => ({
    ...createGeoDataSlice(...set),
}));