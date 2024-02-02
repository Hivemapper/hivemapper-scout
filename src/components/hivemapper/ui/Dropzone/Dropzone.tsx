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
import { Badge } from "@components/shadcn/Badge";

interface Props {
  callback: (locations: ScoutLocation[], mode: "add" | "delete") => void;
  filesWithLocations: FilesWithLocations;
  setFilesWithLocations: Dispatch<SetStateAction<FilesWithLocations>>;
}

const Dropzone: React.FC<Props> = ({
  callback,
  filesWithLocations,
  setFilesWithLocations,
}) => {
  const { darkMode } = useConfig();
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
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: pal.destructive,
  };

  const removeFileAndLocations = (fileName: string) => {
    setFilesWithLocations((prevState) => {
      const copy = { ...prevState };
      const locations = copy[fileName].locations;
      delete copy[fileName];
      callback(locations, "delete");
      return copy;
    });
  };

  const addFilesAndLocations = (locations: ScoutLocation[], file: File) => {
    setFilesWithLocations((prevState) => {
      const copy = { ...prevState };
      copy[file.name] = { file, locations };
      callback(locations, "add");
      return copy;
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const exists = filesWithLocations && filesWithLocations[file.name];
        if (exists) {
          console.error("File already exists:", file.name);
          setError(`File ${file.name} already exists`);
          return;
        }

        const fileType = file.type;
        const fileName = file.name;
        const fileExtension = fileName.split(".").pop().toLowerCase();

        try {
          if (fileType === "text/csv" || fileExtension === "csv") {
            processFile(file, "csv", addFilesAndLocations, setError);
          } else if (
            fileType === "application/json" ||
            fileExtension === "json"
          ) {
            processFile(file, "json", addFilesAndLocations, setError);
          } else if (
            fileType === "application/geo+json" ||
            fileExtension === "geojson"
          ) {
            processFile(file, "geojson", addFilesAndLocations, setError);
          } else {
            throw new Error("Unsupported file type");
          }
        } catch (error) {
          console.error("Error processing file:", error.message);
          setError(error.message);
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
    setError("");
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
              Drag and drop a GeoJSON, JSON or CSV file
            </p>
          )}
          <Button className={cn.dropzoneMarginTop()}>Select a File</Button>
          <p className={cn.dropzoneError(!!error)}>{error}</p>
        </>
      </div>
      <div className={cn.dropzoneFileBadgeWrapper()}>
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
      </div>
    </div>
  );
};

export default Dropzone;
