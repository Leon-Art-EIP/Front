import { useState } from "react";
import { IPriceRangeFilter, priceRangeFilters } from "../../configs/explorer/priceRanges";
import { IFilters } from "../../interfaces/explorer/filters";

interface PriceFiltersProps {
  handleFilters: (filters: IFilters) => void;
  filters: IFilters;
}

export default function PriceFilters(props: PriceFiltersProps): JSX.Element {
  const [priceRanges, setPriceRanges] = useState<IPriceRangeFilter[]>(priceRangeFilters);
  const [isNotForSale, setIsNotForSale] = useState<boolean>(false);

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

    if (!clearPriceRange) {
      setIsNotForSale(false);
    }
    props.handleFilters({
      ...props.filters,
      isForSale: false,
      priceRange: clearPriceRange ? "" : priceRangeToggled.priceRangeValue,
    });
  }

  function handleSelectIsForSale(isForSale: boolean) {
    setIsNotForSale(isForSale);
    priceRanges.forEach((priceRange) => {
      priceRange.selected = false;
    });
    props.handleFilters({ ...props.filters, priceRange: "", isForSale: isForSale });
  }

  return (
    <div className="flex flex-row gap-4">
      <button
        type="button"
        className={`py-2 w-full whitespace-nowrap border-secondary border-2 flex flex-row justify-between items-center px-4 rounded-xl hover:bg-secondary-hover hover:shadow-lg duration-300 ease-in-out text-tertiary ${
          isNotForSale ? "bg-secondary" : ""
        }`}
        onClick={() => handleSelectIsForSale(!isNotForSale)}
      >
        {"Indisponible à la vente"}
      </button>
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
