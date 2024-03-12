import React, { Dispatch, SetStateAction } from "react";
import Search from "@components/hivemapper/ui/Search";
import { FilterTypes, FiltersState } from "types/filter";
import * as cn from "./classNames";
import { Views } from "types/view";

export interface FiltersProps {
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  activeView: Views;
}

const Filters: React.FC<FiltersProps> = ({ setFilters, activeView }) => {
  const onChange = (key: keyof FiltersState, value: string | string[]) => {
    setFilters((filters) => ({
      ...filters,
      [key]: value,
    }));
  };

  return (
    <div className={cn.filterWrapper()}>
      <Search
        activeView={activeView}
        placeholder={"Search all locations"}
        onChange={(value) => onChange(FilterTypes.SEARCH, value)}
      />
    </div>
  );
};

export default Filters;
