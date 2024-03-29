import React from "react";
import { monthDayTime, prettyDate } from "@utils/dates";
import * as cn from "./classNames";
import { useConfig } from "@hooks/useConfig";

interface Props {
  url: string;
  timestamp: string;
  onClick: () => void;
  isActive?: boolean;
  showDates?: boolean;
}

const Thumbnail: React.FC<Props> = ({
  url,
  timestamp,
  onClick,
  isActive,
  showDates = true,
}) => {
  const { darkMode } = useConfig();

  return (
    <div className={cn.thumbnailWrapper()} onClick={onClick}>
      <div className={cn.thumbnailImgSection()}>
        <img
          className={cn.thumbnailImg(isActive, darkMode)}
          src={url}
          alt="Active sequence"
        />
      </div>
      {showDates && (
        <>
          <div className={cn.thumbnailDate()}>{monthDayTime(timestamp)}</div>
          <div className={cn.thumbnailPrettyDate()}>
            <span>{prettyDate(timestamp, true)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Thumbnail;
