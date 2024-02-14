import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  MouseEvent,
  useRef,
} from "react";
import Dropzone from "@components/hivemapper/ui/Dropzone";
import { FilesWithLocations, ScoutLocation } from "types/location";
import * as cn from "./classNames";
import { downloadJson } from "@utils/files";
import Close from "@components/icons/Close";

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
  const modalRef = useRef<HTMLDivElement>(null);

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
          const index = copy.findIndex((loc) => loc._id === location._id);
          copy.splice(index, 1);
        });
        return copy;
      });
    }

    setShowModal(false);
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

  const handleClickOutside = useCallback((event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  }, [setShowModal])

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [eventKeyCallback]);

  return (
    <div ref={modalRef} className={cn.uploadModalWrapper()}>
      <div
        onClick={() => {
          setShowModal(false);
        }}
        className={cn.uploadModalCloseButton()}
      >
        <Close />
      </div>
      <div className={cn.uploadModalHeader()}>
        <div className={cn.uploadModalBold()}>Add Locations</div>
        <div>
          Try our sample files:{" "}
          <a
            className={cn.uploadModalLink()}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              downloadJson(
                "https://hivemapper-static.s3.us-west-2.amazonaws.com/geodata/scout-example.geojson",
                "scout-example.geojson",
              );
            }}
          >
            GeoJSON
          </a>{" "}
          <a
            className={cn.uploadModalLink()}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              downloadJson(
                "https://hivemapper-static.s3.us-west-2.amazonaws.com/geodata/scout-example.json",
                "scout-example.json",
              );
            }}
          >
            JSON
          </a>{" "}
          <a
            className={cn.uploadModalLink()}
            href="https://hivemapper-static.s3.us-west-2.amazonaws.com/geodata/scout-example.csv"
            download={"scout-example.csv"}
          >
            CSV
          </a>
        </div>
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
