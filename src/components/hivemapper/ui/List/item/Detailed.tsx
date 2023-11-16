import React, { useEffect, useState } from "react";
import turf from "@turf/centroid";
import { Frame, ScoutLocation } from "types/location";
import Thumbnail from "@components/hivemapper/ui/Thumbnail";
import { useInView } from "react-intersection-observer";
import {
  filterFramesFresherThan14Days,
  getLastThreeMondays,
  prettyDate,
} from "@utils/dates";
import { getImagesForPolygon } from "@api/developer";
import { stitch } from "@utils/imagery";
import { sortSequencesByTimestamp } from "@utils/sort";
import Loader from "@components/icons/Loader";
import { Badge } from "@components/shadcn/Badge";
import DotIcon from "@components/icons/Dot";

export interface DetailedProps {
  location: ScoutLocation;
  encodedCredentials: string;
  selectionCallback?: (id: string | number) => void;
}

const Detailed: React.FC<DetailedProps> = ({
  location,
  encodedCredentials,
  selectionCallback,
}) => {
  const [sortedSequences, setSortedSequences] = useState<Frame[][] | null>([]);
  const [apiCallsComplete, setApiCallsComplete] = useState(false);
  const [framesLength, setFramesLength] = useState(0);

  const latestSequence = sortedSequences[0] || [];
  const lastFrame: Frame | undefined =
    latestSequence[latestSequence.length - 1];
  const lastMapped = (lastFrame && lastFrame.timestamp) || null;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.01,
  });

  const centroid = turf(location.geojson);

  useEffect(() => {
    if (inView) {
      const fetchImagery = async () => {
        const allFrames = [];
        const weeks = getLastThreeMondays();

        for (const week of weeks) {
          const data: { frames: Frame[] } | { error: Error } =
            await getImagesForPolygon(
              location.searchShape.coordinates,
              week,
              encodedCredentials
            );

          if (!data || "error" in data) {
            return;
          }

          const { frames }: { frames: Frame[] } = data;
          allFrames.push(...frames);
        }

        const framesFresherThan14Days =
          filterFramesFresherThan14Days(allFrames);

        if (framesFresherThan14Days.length > 0) {
          const stitched = stitch(framesFresherThan14Days);
          setSortedSequences(sortSequencesByTimestamp(stitched));
          setFramesLength(framesFresherThan14Days.length);
        }

        setApiCallsComplete(true);
      };

      fetchImagery();
    }
  }, [inView, location.searchShape.coordinates]);

  return (
    <div ref={ref} className="flex p-4 border-b border-b-1">
      <div className="w-1/3">
        <div className="text-2xl font-semibold tracking-tight text-left">
          {location.name}
        </div>
        <div className="text-primary text-lg font-semibold tracking-tight mt-2">
          {location.description}
        </div>
        <div className="mt-2">
          {location.tags.map((tag, index) => (
            <Badge key={`${tag}_${index.toString()}`}>{tag}</Badge>
          ))}
        </div>
        {centroid && (
          <div className="text-sm font-medium tracking-normal text-blue-400 mt-2">
            {`${centroid.geometry.coordinates[1].toFixed(
              5
            )}, ${centroid.geometry.coordinates[0].toFixed(5)}`}
          </div>
        )}
        {sortedSequences.length > 0 && (
          <div className="text-sm font-bold tracking-normal mt-2">
            {sortedSequences.length} collections, {framesLength} images
          </div>
        )}
        {lastMapped && (
          <div className="flex items-center mt-2">
            <DotIcon />
            <span className="text-md font-bold ml-2">
              Mapped {prettyDate(lastMapped, true)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-row w-2/3">
        {!apiCallsComplete ? (
          <div className="flex w-full justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div
            className="flex flex-row w-full overflow-x-scroll mt-3 focus:outline-none"
            tabIndex={0}
            style={{
              scrollbarWidth: "none",
            }}
          >
            {sortedSequences.map((sequence: Frame[], index) => {
              const { url, timestamp } = sequence[0];
              const isLast = index === sortedSequences.length - 1;

              return (
                <div
                  key={url}
                  className={`min-w-[30%] ${isLast ? "mr-0" : "mr-2"}`}
                >
                  <Thumbnail
                    url={url}
                    timestamp={timestamp}
                    onClick={() => selectionCallback(location._id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detailed;
