import React from "react";
import { monthDayTime, prettyDate } from "@utils/dates";
import DotIcon from "@components/icons/Dot";
import * as cn from "./classNames";
import { useConfig } from "@hooks/useConfig";

interface Props {
  url: string;
  timestamp: string;
  onClick: () => void;
  isActive?: boolean;
}

const Thumbnail: React.FC<Props> = ({ url, timestamp, onClick, isActive }) => {
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
      <div className={cn.thumbnailDate()}>{monthDayTime(timestamp)}</div>
      <div className={cn.thumbnailPrettyDate()}>
        <DotIcon size="8px" />
        <span className={cn.thumbnailPrettyDateSpan()}>
          {prettyDate(timestamp, true)}
        </span>
      </div>
    </div>
  );
};

export default Thumbnail;
