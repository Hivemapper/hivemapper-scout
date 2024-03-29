import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { FilesWithLocations, ScoutLocation } from "types/location";
import { useConfig } from "@hooks/useConfig";
import palette from "@styles/palette";
import * as cn from "./classNames";
import { processFile } from "@utils/files";
import { Button } from "@components/shadcn/Button";
import Upload from "@components/icons/Upload";
import { createOrganization, registerLocations } from "@api/locations";
import { setMapAccessToken } from "@utils/map";
import { buildErrorMessage } from "@utils/string";
import Loader from "@components/icons/Loader";

interface DropzoneProps {
  callback: (
    locations: ScoutLocation[],
    mode: "add" | "delete",
    hasFailures: boolean,
  ) => void;
  filesWithLocations: FilesWithLocations;
  setFilesWithLocations: Dispatch<SetStateAction<FilesWithLocations>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Dropzone: React.FC<DropzoneProps> = ({
  callback,
  filesWithLocations,
  setFilesWithLocations,
  isLoading,
  setIsLoading,
}) => {
  const { darkMode, mapAccessToken } = useConfig();
  const pal = palette[darkMode ? "dark" : "default"];

  const [error, setError] = useState("");

  const baseStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "64px 24px",
    paddingBottom: "40px",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: pal.accent,
    borderStyle: "dashed",
    color: pal.accentForeground,
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer",
    backgroundColor: pal.ring,
    fontWeight: 600,
  };

  const focusedStyle = {
    borderColor: pal.accent,
  };

  const acceptStyle = {
    borderColor: pal.success,
  };

  const rejectStyle = {
    borderColor: pal.destructive,
  };

  const containsFailures = (failures: Record<string, number>) => {
    if (typeof failures !== "object") {
      return false;
    }

    for (const value of Object.values(failures)) {
      if (value > 0) {
        return true;
      }
    }
  };

  const addFilesAndLocations = async (
    newLocations: ScoutLocation[],
    file: File,
  ) => {
    let locations = newLocations;
    let hasFailures = false;

    if (
      process.env.DEVELOPMENT === "true" ||
      window.location.host === "hivemapper.com"
    ) {
      let response = await registerLocations(locations);

      if ("error" in response || !response.locations) {
        if (response.error === "User has no organization") {
          // Try to create organization on the fly
          const res = await createOrganization();

          if ("error" in res || !res.userOrganization) {
            setError(
              `There was an error creating the organization: ${res.error}`,
            );
            return;
          }

          response = await registerLocations(locations);

          if ("error" in response || !response.locations) {
            setError(
              `There was an error registering the locations: ${response.error}`,
            );
            return;
          }
        } else {
          setError(
            `There was an error registering the locations: ${response.error}`,
          );
          return;
        }
      }

      if (containsFailures(response.failures)) {
        hasFailures = true;
        const { failures } = response;
        const errorMessage = buildErrorMessage(failures);
        setError(errorMessage);
      }

      if (response.locations) {
        locations = response.locations;
      }
    }

    setFilesWithLocations((prevState) => {
      const copy = { ...prevState };
      copy[file.name] = { file, locations };
      callback(locations, "add", hasFailures);
      return copy;
    });

    setIsLoading(false);
  };

  const handleError = (error: string) => {
    setError(error);
    setIsLoading(false);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        // const exists = filesWithLocations && filesWithLocations[file.name];
        // if (exists) {
        //   console.error("File already exists:", file.name);
        //   setError(`File ${file.name} already exists`);
        //   return;
        // }

        const fileType = file.type;
        const fileName = file.name;
        const fileExtension = fileName.split(".").pop().toLowerCase();

        setIsLoading(true);

        try {
          setMapAccessToken(mapAccessToken);

          if (fileType === "text/csv" || fileExtension === "csv") {
            processFile(file, "csv", addFilesAndLocations, handleError);
          } else if (
            fileType === "application/json" ||
            fileExtension === "json"
          ) {
            processFile(file, "json", addFilesAndLocations, handleError);
          } else if (
            fileType === "application/geo+json" ||
            fileExtension === "geojson"
          ) {
            processFile(file, "geojson", addFilesAndLocations, handleError);
          } else {
            throw new Error("Unsupported file type");
          }
        } catch (error) {
          console.error("Error processing file:", error.message);
          handleError(error.message);
        }
      }
    },
    [filesWithLocations],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
      "application/geo+json": [".geojson"],
    },
  });

  const style = useMemo(() => {
    if (!isFocused) {
      setError("");
    }

    return {
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    };
  }, [isFocused, isDragAccept, isDragReject]);

  return (
    <div className={cn.dropzoneWrapper()}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <>
          <Upload width={60} />
          {isDragActive ? (
            <p className={cn.dropzoneMarginTop()}>Drop your files here!</p>
          ) : (
            <p className={cn.dropzoneMarginTop()}>
              Drag and drop a CSV or GeoJSON file
            </p>
          )}
          <Button className={cn.dropzoneMarginTop()}>Select a File</Button>
          <div className={cn.dropzoneFeedback()}>
            {isLoading && <Loader className={cn.dropzoneLoader()} />}
            <p className={cn.dropzoneError(!!error)}>{error}</p>
          </div>
        </>
      </div>
      {/* <div className={cn.dropzoneFileBadgeWrapper()}>
        {Object.values(filesWithLocations).map((fileWithLocation, index) => (
          <Badge
            key={`${fileWithLocation.file.lastModified}_${index}`}
            className={cn.dropzoneFileBadge()}
          >
            {fileWithLocation.file.name}
            <button
              className={cn.dropzoneFileBadgeCloseButton()}
              onClick={() => removeFileAndLocations(fileWithLocation.file.name)}
            >
              &times;
            </button>
          </Badge>
        ))}
      </div> */}
    </div>
  );
};

export default Dropzone;
