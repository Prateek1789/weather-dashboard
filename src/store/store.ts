import { create } from "zustand";
import { type GeoDataSlice, createGeoDataSlice } from "./slice/geocode.slice";
import { type WeatherSlice, createWeatherSlice } from "./slice/weather.slice";
import { type SettingSlice, createSettingsSlice } from "./slice/settings.slice";

type WeatherStore = GeoDataSlice & WeatherSlice & SettingSlice;

export const useWeatherStore = create<WeatherStore>()((...set) => ({
    ...createGeoDataSlice(...set),
    ...createWeatherSlice(...set),
    ...createSettingsSlice(...set),
}));