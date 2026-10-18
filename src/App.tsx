import Searchbar from "./components/search-bar";
import CurrentTempCard from "./components/current-temperature-card";
import WeeklyOutlook from "./components/weekly-outlook-card";
import HourlyTempChart from "./components/hourly-temp-chart";
import WindChart from "./components/wind-chart";
import AQICard from "./components/aqi-card";
import HumidityCard from "./components/humidity-card";
import PressureCard from "./components/pressure-card";
import UVIndexCard from "./components/uv-card";
import PrecipitationCard from "./components/precipitation-card";
import SunCycleCard from "./components/sun-cycle-card";

export function App() {
  return (
    <>
      <nav className="w-full max-w-7xl h-auto flex justify-center items-center xl:grid xl:grid-cols-3 xl:gap-4 justify-items-center">
        <div className="hidden xl:flex"></div>
        <Searchbar />
        <div className="hidden xl:flex"></div>
      </nav>
      <main className="w-full max-w-7xl h-auto">
        <section className="w-full h-auto flex flex-col items-center justify-center gap-4">
          {/* --- Row 1: Current weather, Weekly overview and weather details --- */}

          <div className="w-full h-full grid grid-rows-[1fr_1fr_auto] grid-cols-1 xl:grid-rows-1 xl:grid-cols-3 gap-4">
            <CurrentTempCard />
            <WeeklyOutlook />
            <div className="w-full h-110 xl:h-120 rounded-lg grid grid-cols-2 grid-rows-2 gap-4">
              <AQICard />
              <HumidityCard />
              <PressureCard />
              <UVIndexCard />
            </div>
          </div>
          {/* --- Row 2: Hourly Temp chart, Wind chart, Precipitation and Sunrise & Sunset --- */}

          <div className="w-full h-full max-w-7xl grid grid-rows-3 grid-cols-1 xl:grid-rows-1 xl:grid-cols-[1fr_1fr_auto] gap-4">
            <HourlyTempChart />
            <WindChart />
            <div className="w-full xl:w-80 h-70 grid grid-rows-2 grid-cols-1 rounded-lg gap-4">
              <SunCycleCard />
              <PrecipitationCard />
            </div>
          </div>
        </section>
      </main>
    </>
  )
};

export default App
