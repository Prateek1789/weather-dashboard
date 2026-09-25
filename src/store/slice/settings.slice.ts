import type { StateCreator } from "zustand";

type UnitSystem = 'metric' | 'imperial';

export interface SettingSlice {
    unitSystem: UnitSystem;
    switchUnitSystem: () => void;
};

export const createSettingsSlice: StateCreator<SettingSlice> = (set) => ({
    unitSystem: 'metric',
    switchUnitSystem: () => {
        set(state => ({ unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric' }));
    }
});