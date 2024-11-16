import { useEffect, useState } from "react";
import { IPriceRangeFilter, priceRangeFilters } from "../../configs/explorer/priceRanges";
import { IFilters } from "../../interfaces/explorer/filters";

interface PriceFiltersProps {
  handleFilters: (filters: IFilters) => void;
  filters: IFilters;
  unavailableToBuy: boolean;
  setUnavailableToBuy: (unavailableToBuy: boolean) => void;
}

export default function PriceFilters(props: PriceFiltersProps): JSX.Element {
  const [priceRanges, setPriceRanges] = useState<IPriceRangeFilter[]>(priceRangeFilters);

  function handleSelectPriceRange(priceRangeToggled: IPriceRangeFilter) {
    const updatedPriceRanges = priceRanges.map((priceRange) => {
      if (priceRange.priceRangeTitle === priceRangeToggled.priceRangeTitle) {
        return { ...priceRange, selected: !priceRange.selected };
      }
      return priceRange;
    });

    setPriceRanges(updatedPriceRanges);

    const selectedRanges = updatedPriceRanges
      .filter((priceRange) => priceRange.selected)
      .map((priceRange) => priceRange.priceRangeValue);

    if (selectedRanges.length > 0) {
      const minPrice = Math.min(...selectedRanges.map((range) => Number(range.split("-")[0])));
      const maxPrice = Math.max(...selectedRanges.map((range) => Number(range.split("-")[1])));
      props.handleFilters({
        ...props.filters,
        priceRange: `${minPrice}-${maxPrice}`,
      });
    } else {
      props.handleFilters({
        ...props.filters,
        priceRange: "",
      });
    }
  }

  return (
    <div className="flex flex-row gap-4">
      {priceRanges.map((priceRange, index) => (
        <button
          key={index}
          type="button"
          className={`py-2 w-full whitespace-nowrap border-secondary border-2 flex flex-row justify-between items-center px-4 rounded-xl hover:bg-secondary-hover hover:shadow-lg duration-300 ease-in-out text-tertiary ${
            priceRange.selected ? "bg-gray-200" : ""
          }`}
          onClick={() => handleSelectPriceRange(priceRange)}
        >
          {priceRange.priceRangeTitle}
        </button>
      ))}
    </div>
  );
}
