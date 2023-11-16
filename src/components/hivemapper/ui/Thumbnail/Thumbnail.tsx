import React from "react";
import { monthDayTime, prettyDate } from "@utils/dates";
import DotIcon from "@components/icons/Dot";

interface Props {
  url: string;
  timestamp: string;
  onClick: () => void;
  isActive?: boolean;
}

const Thumbnail: React.FC<Props> = ({ url, timestamp, onClick, isActive }) => {
  return (
    <div className={`flex flex-col cursor-pointer`} onClick={onClick}>
      <div className="flex w-full aspect-w-2 aspect-h-1">
        <img
          className={`${
            isActive ? "border-2 border-white" : "border-2 border-transparent"
          } rounded-md`}
          src={url}
          alt="Active sequence"
        />
      </div>
      <div className="text-primary text-sm font-medium tracking-normal mt-1">
        {monthDayTime(timestamp)}
      </div>
      <div className="flex items-center text-md font-bold tracking-normal">
        <DotIcon size="8px" />
        <span className="ml-2">{prettyDate(timestamp, true)}</span>
      </div>
    </div>
  );
};

export default Thumbnail;
