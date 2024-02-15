import React, { Dispatch, SetStateAction } from "react";
import MapIcon from "@components/icons/Map";
import ListIcon from "@components/icons/List";
import SquareIcon from "@components/icons/Square";
import { Views } from "types/view";
import palette from "@styles/palette";
import { useConfig } from "@hooks/useConfig";
import * as cn from "./classNames";
import { Button } from "@components/shadcn/Button";
export interface ViewSelectorProps {
  activeView: Views;
  setActiveView: Dispatch<SetStateAction<Views>>;
  omitBottomBorder?: boolean;
  setIsUploadModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  activeView,
  setActiveView,
  omitBottomBorder = false,
  setIsUploadModalVisible,
}) => {
  const { darkMode } = useConfig();

  const isActive = (view: Views) =>
    activeView === view
      ? undefined
      : palette[darkMode ? "dark" : "default"].accent;

  return (
    <div className={cn.viewSelectorWrapper(omitBottomBorder)}>
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
      <Button onClick={() => setIsUploadModalVisible(true)}>Upload</Button>
    </div>
  );
};

export default ViewSelector;
