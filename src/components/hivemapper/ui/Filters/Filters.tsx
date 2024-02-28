import React, { Dispatch, SetStateAction } from "react";
import Search from "@components/hivemapper/ui/Search";
import Tags from "@components/hivemapper/ui/Tags";
import { ScoutLocation } from "types/location";
import { FilterTypes, FiltersState } from "types/filter";
import * as cn from "./classNames";
import { Views } from "types/view";

export interface FiltersProps {
  locations: ScoutLocation[];
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  activeView: Views;
}

const Filters: React.FC<FiltersProps> = ({
  locations,
  setFilters,
  activeView,
}) => {
  const onChange = (key: keyof FiltersState, value: string | string[]) => {
    setFilters((filters) => ({
      ...filters,
      [key]: value,
    }));
  };

  return (
    <div className={cn.filterWrapper()}>
      <div className={cn.filterSection()}>
        <Tags
          activeView={activeView}
          tags={locations
            .filter((location) => !!location.tags)
            .map((l) => l.tags)
            .flat()}
          onChange={(value) => onChange(FilterTypes.TAGS, value)}
        />
      </div>
      <Search
        activeView={activeView}
        placeholder={"Search all locations"}
        onChange={(value) => onChange(FilterTypes.SEARCH, value)}
      />
    </div>
  );
};

export default Filters;
