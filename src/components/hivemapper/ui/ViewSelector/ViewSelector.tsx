import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import { useStyles } from "@hooks/useStyles";
import MapIcon from "@components/icons/Map";
import ListIcon from "@components/icons/List";
import SquareIcon from "@components/icons/Square";
import { Views } from "types/view";
import palette from "@styles/palette";

export interface ViewSelectorProps {
  activeView: Views;
  setActiveView: Dispatch<SetStateAction<Views>>;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  activeView,
  setActiveView,
}) => {
  const { stripTailwindClasses, darkMode } = useStyles();

  const container = classNames(
    {
      "flex w-full border-b border-solid p-3 bg-background":
        !stripTailwindClasses,
    },
    "hm-filters"
  );

  const iconsWrapper = classNames(
    { "flex rounded-md border border-solid": !stripTailwindClasses },
    "hm-icons-wrapper"
  );

  const icons = (isLast?: boolean) =>
    classNames(
      { "inline-block p-2 cursor-pointer": !stripTailwindClasses },
      { "border-r border-solid": !isLast },
      "hm-icons"
    );

  const isActive = (view: Views) =>
    activeView === view
      ? undefined
      : palette[darkMode ? "dark" : "default"].accent;

  return (
    <div className={container}>
      <div className={iconsWrapper}>
        <div className={icons()} onClick={() => setActiveView(Views.Map)}>
          <MapIcon color={isActive(Views.Map)} width={18} height={18} />
        </div>
        <div className={icons()} onClick={() => setActiveView(Views.Thumbnail)}>
          <ListIcon color={isActive(Views.Thumbnail)} width={18} height={18} />
        </div>
        <div
          className={icons(true)}
          onClick={() => setActiveView(Views.Location)}
        >
          <SquareIcon color={isActive(Views.Location)} width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default ViewSelector;
