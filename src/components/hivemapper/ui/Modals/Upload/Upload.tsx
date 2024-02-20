import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Dropzone from "@components/hivemapper/ui/Dropzone";
import { FilesWithLocations, ScoutLocation } from "types/location";
import * as cn from "./classNames";
import Close from "@components/icons/Close";
import { Views } from "types/view";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
  filesWithLocations: FilesWithLocations;
  setFilesWithLocations: Dispatch<SetStateAction<FilesWithLocations>>;
  setActiveView: Dispatch<SetStateAction<Views>>;
}

const Upload: React.FC<Props> = ({
  setShowModal,
  setLocations,
  filesWithLocations,
  setFilesWithLocations,
  setActiveView,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleParsedLocations = (
    locations: ScoutLocation[],
    mode: "add" | "delete",
    hasFailures: boolean,
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

    if(!hasFailures) {
      setShowModal(false);
    }

    setActiveView(prevState => {
      if(prevState === Views.Location) {
        return Views.Thumbnail;
      }

      return prevState; 
    });
  };

  const eventKeyCallback = useCallback(
    (event: any) => {
      if (isLoading) {
        return;
      }

      switch (event.key) {
        case "Escape":
          setShowModal(false);
          break;
      }
    },
    [setShowModal, isLoading],
  );

  const handleClickOutside = useCallback((event: any) => {
    if (!isLoading && modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  }, [setShowModal, isLoading])

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [eventKeyCallback, isLoading, handleClickOutside, eventKeyCallback]);

  return (
    <div ref={modalRef} className={cn.uploadModalWrapper()}>
      <div
        onClick={() => {
          !isLoading && setShowModal(false);
        }}
        className={cn.uploadModalCloseButton(isLoading)}
      >
        <Close />
      </div>
      <div className={cn.uploadModalHeader()}>
        <div className={cn.uploadModalBold()}>Add Locations</div>
        <div>
          <a href="https://docs.hivemapper.com/use-the-map/scout/scout-hosted-service" target="_blank">
            View supported upload formats
          </a>
        </div>
      </div>
      <Dropzone
        callback={handleParsedLocations}
        filesWithLocations={filesWithLocations}
        setFilesWithLocations={setFilesWithLocations}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Upload;
