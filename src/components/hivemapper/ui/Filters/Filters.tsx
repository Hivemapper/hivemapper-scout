import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import Search from "@components/hivemapper/ui/Search";
import Dropdown from "@components/hivemapper/ui/Dropdown";
import Tags from "@components/hivemapper/ui/Tags";
import { useStyles } from "@hooks/useStyles";
import { ScoutLocation } from "types/location";
import { FilterTypes, FiltersState } from "types/filter";

export interface FiltersProps {
  locations: ScoutLocation[];
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

const Filters: React.FC<FiltersProps> = ({ locations, setFilters }) => {
  const { stripTailwindClasses } = useStyles();

  const headerClasses = classNames(
    { "flex w-full justify-between": !stripTailwindClasses },
    "hm-header"
  );

  const onChange = (key: keyof FiltersState, value: string | string[]) => {
    setFilters((filters) => ({
      ...filters,
      [key]: value,
    }));
  };

  return (
    <div className={headerClasses}>
      <div className="flex">
        <div className="mr-2">
          <Dropdown
            elements={locations
              .filter((location) => !!location.description)
              .map((l) => l.description.toLowerCase())}
            onChange={(value) => onChange(FilterTypes.DESCRIPTION, value)}
          />
        </div>
        <Tags
          tags={locations
            .filter((location) => !!location.tags)
            .map((l) => l.tags)
            .flat()}
          onChange={(value) => onChange(FilterTypes.TAGS, value)}
        />
      </div>
      <Search
        placeholder={"Search all locations"}
        onChange={(value) => onChange(FilterTypes.SEARCH, value)}
      />
    </div>
  );
};

export default Filters;
