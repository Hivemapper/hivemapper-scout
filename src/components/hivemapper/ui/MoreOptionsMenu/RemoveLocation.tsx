import React, { Dispatch, SetStateAction } from "react";
import * as cn from "./classNames";
import { ScoutLocation } from "types/location";
import { deregisterLocations } from "@api/locations";

interface RemoveLocationProps {
  id: string;
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
}

const RemoveLocation: React.FC<RemoveLocationProps> = ({
  id,
  setLocations,
}) => {
  return (
    <div
      className={cn.moreOptionsRemoveLocation()}
      onClick={async () => {
        if (window.location.host === "hivemapper.com") {
          let response = await deregisterLocations(id);

          if ("error" in response) {
            console.log(response.error);
            return;
          }

          setLocations((prevState) =>
            prevState.filter((loc) => loc._id !== id),
          );
        } else {
          setLocations((prevState) =>
            prevState.filter((loc) => loc._id !== id),
          );
        }
      }}
    >
      Remove Location
    </div>
  );
};

export default RemoveLocation;
