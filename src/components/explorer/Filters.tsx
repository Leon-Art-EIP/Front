import CheckIcon from "@mui/icons-material/Check";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import React, { useEffect, useRef, useState } from "react";
import { ArtTypeFilter, artTypeFilters } from "../../configs/explorer/artTypes";
import { IFilters } from "../../interfaces/explorer/filters";

interface FiltersProps {
  handleFilters: (filters: IFilters) => void;
  filters: IFilters;
}

export default function Filters(props: FiltersProps): JSX.Element {
  const [collapseFilters, setCollapseFilters] = useState<boolean>(false);
  const [collapseSort, setCollapseSort] = useState<boolean>(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);

  const [artTypes, setArtTypes] = useState<ArtTypeFilter[]>(artTypeFilters);

  function onCollapseFilter(event: React.MouseEvent) {
    event.stopPropagation();
    setCollapseFilters(!collapseFilters);
    if (collapseSort) setCollapseSort(false);
  }

  function onCollapseSort(event: React.MouseEvent) {
    event.stopPropagation();
    setCollapseSort(!collapseSort);
    if (collapseFilters) setCollapseFilters(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        (filterButtonRef.current && filterButtonRef.current.contains(target)) ||
        (sortButtonRef.current && sortButtonRef.current.contains(target)) ||
        (filterRef.current && filterRef.current.contains(target)) ||
        (sortRef.current && sortRef.current.contains(target))
      ) {
        return;
      }

      setCollapseFilters(false);
      setCollapseSort(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleArtCategory(index: number) {
    const newArtTypes = [...artTypes];
    newArtTypes[index].collapsed = !newArtTypes[index].collapsed;
    setArtTypes(newArtTypes);
  }

  function selectArtType(type: string) {
    const newArtTypes = [...artTypes];
    newArtTypes.forEach((artType) => {
      artType.types.forEach((artTypeType) => {
        if (artTypeType.type === type) artTypeType.selected = !artTypeType.selected;
      });
    });
    setArtTypes(newArtTypes);
    let artTypeAlreadySelected: string = props.filters.artType;
    if (artTypeAlreadySelected.includes(type)) {
      artTypeAlreadySelected = artTypeAlreadySelected.replace(`${type},`, "");
      artTypeAlreadySelected = artTypeAlreadySelected.replace(`${type}`, "");
    } else {
      artTypeAlreadySelected += `${type},`;
    }
    props.handleFilters({ ...props.filters, artType: artTypeAlreadySelected });
  }

  function handleSort(sort: string) {
    props.handleFilters({ ...props.filters, sort: sort });
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="relative flex flex-col gap-4">
        <button
          type="button"
          ref={filterButtonRef}
          className="py-3 px-4 flex flex-row gap-2 items-center rounded-xl transition hover:bg-secondary hover:shadow-lg duration-300 ease-in-out"
          onClick={(event) => onCollapseFilter(event)}
        >
          <span className="text-lg font-medium text-tertiary">Filtres</span>
          <FilterAltIcon className={`text-tertiary`} />
        </button>
        {collapseFilters && (
          <div
            ref={filterRef}
            className="absolute top-[110%] right-0 w-[320px] h-[450px] overflow-y-auto z-10 bg-gray-100 shadow-lg rounded-xl p-4"
          >
            <div className="flex flex-col gap-2">
              {artTypes.map((artType, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="py-2 w-full flex flex-row justify-between items-center px-4 rounded-xl hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out"
                    onClick={() => toggleArtCategory(index)}
                  >
                    {artType.category}
                    {artType.collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </button>
                  {artType.collapsed && (
                    <div className="flex flex-col gap-2 pl-4">
                      {artType.types.map((type, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`py-2 w-full flex flex-row justify-between items-center px-4 rounded-xl hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out ${
                            type.selected ? "bg-gray-200" : ""
                          }`}
                          onClick={() => selectArtType(type.type)}
                        >
                          {type.type}
                          {type.selected && <CheckIcon className="text-green-300" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-col gap-4">
        <button
          type="button"
          id="sortButton"
          className="py-3 px-4 flex flex-row gap-2 items-center rounded-xl transition hover:bg-secondary hover:shadow-lg duration-300 ease-in-out"
          onClick={(event) => onCollapseSort(event)}
        >
          <span className="text-lg font-medium text-tertiary">Trier</span>
          <SortIcon className={`text-tertiary`} />
        </button>
        {collapseSort && (
          <div
            ref={sortRef}
            className="absolute top-[110%] right-0 w-[260px] h-fit overflow-y-auto z-10 bg-gray-100 shadow-lg rounded-xl p-4"
          >
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className={`py-2 w-full flex flex-row justify-between items-center px-4 rounded-xl hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out
                ${props.filters.sort === "" ? "bg-gray-200" : ""}`}
                onClick={() => handleSort("")}
              >
                Nouveauté
                {props.filters.sort === "" && <CheckIcon className="text-green-300" />}
              </button>
              <button
                type="button"
                className={`py-2 w-full flex flex-row justify-between items-center px-4 rounded-xl hover:bg-gray-200 hover:shadow-lg duration-300 ease-in-out
                ${props.filters.sort === "popularity" ? "bg-gray-200" : ""}`}
                onClick={() => handleSort("popularity")}
              >
                Popularité
                {props.filters.sort === "popularity" && <CheckIcon className="text-green-300" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
