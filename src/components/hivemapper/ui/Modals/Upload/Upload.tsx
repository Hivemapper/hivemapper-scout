import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Dropzone from "@components/hivemapper/ui/Dropzone";
import { FilesWithLocations, ScoutLocation } from "types/location";
import * as cn from "./classNames";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
  filesWithLocations: FilesWithLocations;
  setFilesWithLocations: Dispatch<SetStateAction<FilesWithLocations>>;
}

const Upload: React.FC<Props> = ({
  setShowModal,
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
        locations.forEach((location) => {
          const index = copy.findIndex(
            (loc) => loc.fileUniqueIdentifier === location.fileUniqueIdentifier,
          );
          copy.splice(index, 1);
        });
        return copy;
      });
    }
  };

  const eventKeyCallback = useCallback(
    (event: any) => {
      switch (event.key) {
        case "Escape":
          setShowModal(false);
          break;
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);
    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
    };
  }, [eventKeyCallback]);

  return (
    <div className={cn.uploadModalWrapper()}>
      <div className={cn.uploadModalHeader()}>
        <div className={cn.uploadModalBold()}>Add Locations</div>
        {/* <div>Try our sample files: GeoJSON JSON CSV</div> */}
      </div>
      <Dropzone
        callback={handleParsedLocations}
        filesWithLocations={filesWithLocations}
        setFilesWithLocations={setFilesWithLocations}
      />
    </div>
  );
};

export default Upload;
