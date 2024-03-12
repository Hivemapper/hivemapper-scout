import React, { Dispatch, SetStateAction } from "react";
import MapIcon from "@components/icons/Map";
import ListIcon from "@components/icons/List";
import SquareIcon from "@components/icons/Square";
import { Views } from "types/view";
import palette from "@styles/palette";
import { useConfig } from "@hooks/useConfig";
import * as cn from "./classNames";
import { Button } from "@components/shadcn/Button";
import Multiselect from "@components/shadcn/MultiSelect";
import { FiltersState } from "types/filter";
export interface ViewSelectorProps {
  activeView: Views;
  setActiveView: Dispatch<SetStateAction<Views>>;
  omitBottomBorder?: boolean;
  setIsUploadModalVisible: Dispatch<SetStateAction<boolean>>;
  tags: string[];
  selectedTags: string[];
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  activeView,
  setActiveView,
  omitBottomBorder = false,
  setIsUploadModalVisible,
  tags,
  selectedTags,
  setFilters,
}) => {
  const { darkMode } = useConfig();

  const isActive = (view: Views) =>
    activeView === view
      ? undefined
      : palette[darkMode ? "dark" : "default"].accent;

  const handleTags = (tags: string[]) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        tags,
      };
    });
  };

  return (
    <div className={cn.viewSelectorWrapper(omitBottomBorder)}>
      <div className={cn.viewSelectorAndTags()}>
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
            <ListIcon
              color={isActive(Views.Thumbnail)}
              width={18}
              height={18}
            />
          </div>
          <div
            className={cn.viewSelectorIcon(true)}
            onClick={() => setActiveView(Views.Location)}
          >
            <SquareIcon
              color={isActive(Views.Location)}
              width={18}
              height={18}
            />
          </div>
        </div>
        {tags.length > 0 && (
          <Multiselect
            options={tags}
            selected={selectedTags}
            onChange={handleTags}
            placeholder="Tags"
          />
        )}
      </div>
      <Button onClick={() => setIsUploadModalVisible(true)}>Upload</Button>
    </div>
  );
};

export default ViewSelector;
