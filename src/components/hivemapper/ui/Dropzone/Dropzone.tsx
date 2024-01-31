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
    width: "50%",
    minWidth: "356px",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "64px 24px",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: pal.accent,
    borderStyle: "dashed",
    color: pal.accentForeground,
    outline: "none",
    transition: "border .24s ease-in-out",
    cursor: "pointer",
  };

  const focusedStyle = {
    borderColor: pal.accentForeground,
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
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

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className={cn.dropzoneWrapper()}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag 'n' drop your files here, or click to select files</p>
            <em>Supports .csv, .json and .geojson formats</em>
          </>
        )}
      </div>
      {Object.keys(filesWithLocations).length > 0 && (
        <aside>
          <h4>Files</h4>
          <ul>
            {Object.values(filesWithLocations).map(
              (fileWithLocation, index) => (
                <li key={`${fileWithLocation.file.lastModified}_${index}`}>
                  {fileWithLocation.file.name} - {fileWithLocation.file.size}{" "}
                  bytes
                  <span
                    onClick={(e) =>
                      removeFileAndLocations(fileWithLocation.file.name)
                    }
                  >
                    ❌
                  </span>
                </li>
              ),
            )}
          </ul>
        </aside>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Dropzone;
