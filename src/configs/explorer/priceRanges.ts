export interface IPriceRangeFilter {
  priceRangeTitle: string;
  priceRangeValue: string;
  selected: boolean;
}

export const priceRangeFilters: IPriceRangeFilter[] = [
  { priceRangeTitle: "0€ - 20€", priceRangeValue: "0-20", selected: false },
  { priceRangeTitle: "20€ - 50€", priceRangeValue: "20-50", selected: false },
  { priceRangeTitle: "50€ - 100€", priceRangeValue: "50-100", selected: false },
  { priceRangeTitle: "100€ - 600€", priceRangeValue: "100-600", selected: false },
  { priceRangeTitle: "+ 500€", priceRangeValue: "500-9999", selected: false },
];
