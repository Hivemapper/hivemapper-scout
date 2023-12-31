import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import MapIcon from "@components/icons/Map";
import ListIcon from "@components/icons/List";
import SquareIcon from "@components/icons/Square";
import { Views } from "types/view";
import palette from "@styles/palette";
import { useConfig } from "@hooks/useConfig";
import * as cn from "./classNames";
export interface ViewSelectorProps {
  activeView: Views;
  setActiveView: Dispatch<SetStateAction<Views>>;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  activeView,
  setActiveView,
}) => {
  const { darkMode } = useConfig();

  const isActive = (view: Views) =>
    activeView === view
      ? undefined
      : palette[darkMode ? "dark" : "default"].accent;

  return (
    <div className={cn.viewSelectorWrapper()}>
      <div className={cn.viewSelectorIconSection()}>
        <div
          className={cn.viewSelectorIcon()}
          onClick={() => setActiveView(Views.Map)}
        >
          <MapIcon color={isActive(Views.Map)} width={18} height={18} />
        </div>
        <div
          className={cn.viewSelectorIcon()}
          onClick={() => setActiveView(Views.Thumbnail)}
        >
          <ListIcon color={isActive(Views.Thumbnail)} width={18} height={18} />
        </div>
        <div
          className={cn.viewSelectorIcon(true)}
          onClick={() => setActiveView(Views.Location)}
        >
          <SquareIcon color={isActive(Views.Location)} width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default ViewSelector;
