import React from "react";
import classNames from "classnames";
import { useStyles } from "@hooks/useStyles";
import MapIcon from "@components/icons/MapIcon";
import ListIcon from "@components/icons/ListIcon";
import ThumbnailsIcon from "@components/icons/ThumbnailsIcon";
import LocationIcon from "@components/icons/LocationIcon";

export interface FiltersProps {}

const Filters: React.FC<FiltersProps> = () => {
  const { stripTailwindClasses } = useStyles();

  const filterClasses = classNames(
    { "w-full": !stripTailwindClasses },
    "hm-filters"
  );

  const iconsClasses = classNames(
    { "inline-block rounded border border-solid p-0.5": !stripTailwindClasses },
    "hm-icons"
  );

  return (
    <div className={filterClasses}>
      <div className={iconsClasses}>
        <MapIcon />
      </div>
      <div className={iconsClasses}>
        <ListIcon />
      </div>
      <div className={iconsClasses}>
        <ThumbnailsIcon />
      </div>
      <div className={iconsClasses}>
        <LocationIcon />
      </div>
    </div>
  );
};

export default Filters;
