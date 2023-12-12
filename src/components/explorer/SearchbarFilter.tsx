import React from 'react';
import { ISearchbarFilters } from "../../interfaces/explorer/searchbarFilters";

interface SearchbarFilterProps {
  handleFilters: (filters: ISearchbarFilters) => void;   
}

export default function SearchbarFilter(props: SearchbarFilterProps): JSX.Element {
  return (
    <div>
      <h1>SearchbarFilter</h1>
    </div>
  );
}