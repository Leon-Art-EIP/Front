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
  const [priceRanges] = useState<IPriceRangeFilter[]>(priceRangeFilters);

  useEffect(() => {
    priceRanges.forEach((priceRange) => {
      priceRange.selected = false;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectPriceRange(priceRangeToggled: IPriceRangeFilter) {
    let clearPriceRange = false;

    priceRanges.forEach((priceRange) => {
      if (priceRange.priceRangeTitle === priceRangeToggled.priceRangeTitle) {
        if (priceRange.selected) clearPriceRange = true;
        priceRange.selected = !priceRange.selected;
      } else {
        priceRange.selected = false;
      }
    });

    props.handleFilters({
      ...props.filters,
      isForSale: false,
      priceRange: clearPriceRange ? "" : priceRangeToggled.priceRangeValue,
    });
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
      <button
        type="button"
        className={`py-2 w-full whitespace-nowrap border-secondary border-2 flex flex-row justify-between items-center px-4 rounded-xl hover:bg-secondary-hover hover:shadow-lg duration-300 ease-in-out text-tertiary ${
          props.unavailableToBuy ? "bg-secondary" : ""
        }`}
        onClick={() => props.setUnavailableToBuy(!props.unavailableToBuy)}
      >
        {"Indisponible à la vente"}
      </button>
    </div>
  );
}
