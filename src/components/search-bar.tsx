import { useState, useEffect, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useWeatherStore } from "@/store/store";

import { SearchIcon, LoaderCircle } from "lucide-react";

const Searchbar = () => {
  const [query, setQuery] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const debouncedQuery = useDebounce(query, 600);

	const getGeodata = useWeatherStore(state => state.getGeoData);
	const geoData = useWeatherStore(state => state.cityList);
	const geoError = useWeatherStore(state => state.geoDataError);
	const isGeoDataLoading = useWeatherStore(state => state.isGeoDataLoading);
	const clearGeoError = useWeatherStore(state => state.clearGeoError);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const skipFetchRef = useRef<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		skipFetchRef.current = false;
		setQuery(e.target.value);

		if (geoError) clearGeoError();

		if (geoData.length === 0) {
			setIsOpen(false);
			setActiveIndex(-1);
		}
	};

	const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) return;

		switch(e.key) {
			case 'ArrowDown': 
				e.preventDefault();
				setActiveIndex(prev => prev < geoData.length - 1 ? prev + 1 : 0 );
				break;
			
			case 'ArrowUp':
				e.preventDefault();
				setActiveIndex(prev => prev > 0 ? prev - 1 : geoData.length - 1);
				break;
			
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0) {
					skipFetchRef.current = true;
					setQuery(geoData[activeIndex].name);
					setActiveIndex(-1);
					setIsOpen(false);
				}
				break;
			
			case 'Escape':
				e.preventDefault();
				setQuery('');
				if (!query) {
					inputRef.current?.blur();
					setIsOpen(false);
					setActiveIndex(-1);
				};
				break;

			default:
				break;
		}
	};

  useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
				setActiveIndex(-1);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		
		return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
		if (skipFetchRef.current) {
			skipFetchRef.current = false;
			return;
		};

		if (debouncedQuery) {
			setIsOpen(true);
			setActiveIndex(-1);
			getGeodata(debouncedQuery);
		};
  }, [debouncedQuery]);

  return (
    <div 
			ref={containerRef}
			className="w-full max-w-sm relative"
		>
      <label 
        className="w-full max-w-sm p-1 px-2 rounded-lg flex items-center justify-center gap-1.5 border border-neutral-200 has-focus:border-neutral-400 has-focus:outline-3 has-focus:outline-neutral-300 dark:border-neutral-600 dark:outline-neutral-700"
      >
				<span className="sr-only">Search for a city</span>
        <SearchIcon size={18} />
        <input
					ref={inputRef} 
          type="search"
          placeholder="Search for city..."
					autoComplete="off"
					value={query}
					onChange={handleChange}
					onKeyDown={handleKeydown}
					onFocus={() => {
						if (geoData.length > 0) setIsOpen(true);
					}}
					role="combobox"
					aria-expanded={isOpen}
					aria-autocomplete="list"
					aria-controls="suggestion-list"
          className="w-full h-8 focus:outline-0 text-sm" 
        />
      </label>

			{ isOpen && (
				<div 
					className="w-full h-auto p-1 bg-card top-[120%] left-0 absolute flex flex-col shadow-lg rounded-lg border border-neutral-200 dark:border-neutral-700"
				>
				
				{ isGeoDataLoading && (
					<span 
						className="w-full p-1 rounded-sm text-sm flex items-center justify-center gap-1.5"
					>
						<LoaderCircle size={18} className="animate-spin" />
						Searching...
					</span>
					)
				}

				{ geoError && <p className="w-full p-1 rounded-sm text-sm flex grow items-center justify-center">{geoError}</p>}

				{ (!isGeoDataLoading && !geoError) && (
					<ul 
						id="suggestion-list"
						role="listbox"
						className="w-full flex flex-col gap-1 rounded-lg"
					>
						{ geoData.map((itm, idx) => {
							return (
								<li
									key={idx}
									id={`suggestion-item-${itm}`} 
									role="option"
									aria-selected={idx === activeIndex}
									onClick={() => {
										skipFetchRef.current = true;
										setQuery(itm.name);
										setIsOpen(false);
										setActiveIndex(-1);
									}}
									onMouseOver={() => setActiveIndex(idx)}
									onMouseLeave={() => setActiveIndex(-1)}
									className={`w-full py-1 px-1.5 flex items-center capitalize justify-start gap-1.5 rounded-sm cursor-pointer ${idx === activeIndex ? 'bg-neutral-300/50 dark:bg-neutral-700' : ''}`}
								>
									{`${itm.name}, ${itm.admin1}, ${itm.country}`}
								</li>
							)
						}
					)}
					</ul>)
				}
				</div>
			)}
    </div>
  )
};

export default Searchbar