import React, { Dispatch, SetStateAction } from "react";
import * as cn from "./classNames";
import Dropzone from "@components/hivemapper/ui/Dropzone";
import { FilesWithLocations, ScoutLocation } from "types/location";

interface Props {
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
  filesWithLocations: FilesWithLocations;
  setFilesWithLocations: Dispatch<SetStateAction<FilesWithLocations>>;
}

const Upload: React.FC<Props> = ({
  setLocations,
  filesWithLocations,
  setFilesWithLocations,
}) => {
  const handleParsedLocations = (
    locations: ScoutLocation[],
    mode: "add" | "delete",
  ) => {
    if (mode === "add") {
      setLocations((prevState) => [...locations, ...prevState]);
    } else {
      setLocations((prevState) => {
        const copy = [...prevState];
        return copy.filter(
          (location) =>
            !locations.some(
              (l) => l.fileUniqueIdentifier === location.fileUniqueIdentifier,
            ),
        );
      });
    }
  };

  return (
    <div className={cn.uploadWrapper()}>
      <Dropzone
        callback={handleParsedLocations}
        filesWithLocations={filesWithLocations}
        setFilesWithLocations={setFilesWithLocations}
      />
    </div>
  );
};

export default Upload;
