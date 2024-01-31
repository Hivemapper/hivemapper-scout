import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import Carousel from "@components/hivemapper/ui/Carousel";
import Thumbnail from "@components/hivemapper/ui/Thumbnail";
import { getImagesForPolygon } from "@api/developer";
import {
  filterFramesFresherThan14Days,
  getLastThreeMondays,
} from "@utils/dates";
import { sortSequencesByTimestamp } from "@utils/sort";
import { stitch } from "@utils/imagery";
import { Frame, ScoutLocation } from "types/location";
import { preventScroll } from "@utils/keyboard";
import Loader from "@components/icons/Loader";
import * as cn from "./classNames";

interface Props {
  apiKey: string;
  username: string;
  location: ScoutLocation;
  sortedSequences: Frame[][] | null;
  setSortedSequences: Dispatch<SetStateAction<Frame[][] | null>>;
  activeSequence: Frame[] | null;
  activeSequenceIndex: number;
  setActiveSequenceIndex: Dispatch<SetStateAction<number>>;
  apiCallsComplete: boolean;
  setApiCallsComplete: Dispatch<SetStateAction<boolean>>;
  activeFrameIndex: { value: number };
  setActiveFrameIndex: Dispatch<SetStateAction<{ value: number }>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setFramesLength: Dispatch<SetStateAction<number>>;
}

const Imagery: React.FC<Props> = ({
  apiKey,
  username,
  location,
  sortedSequences,
  setSortedSequences,
  activeSequence,
  activeSequenceIndex,
  setActiveSequenceIndex,
  apiCallsComplete,
  setApiCallsComplete,
  activeFrameIndex,
  setActiveFrameIndex,
  setShowModal,
  setFramesLength,
}) => {
  const isFirstRender = useRef(true);

  const divRef: RefObject<HTMLDivElement> = useRef(null);
  const thumbnailRefs = useRef<Array<RefObject<HTMLDivElement>>>([]);

  const encodedCredentials = btoa(`${username}:${apiKey}`);

  useEffect(() => {
    const fetchImagery = async () => {
      const allFrames = [];
      const weeks = getLastThreeMondays();

      for (const week of weeks) {
        const data = await getImagesForPolygon(
          location.geometry.type,
          location.geometry.coordinates,
          week,
          encodedCredentials,
        );

        if (!data || "error" in data) {
          return;
        }

        const { frames }: { frames: Frame[] } = data;
        allFrames.push(...frames);
      }

      const framesFresherThan14Days = filterFramesFresherThan14Days(allFrames);

      if (framesFresherThan14Days.length > 0) {
        const stitched = stitch(framesFresherThan14Days);
        setSortedSequences(sortSequencesByTimestamp(stitched));
        setFramesLength(framesFresherThan14Days.length);
      }

      setApiCallsComplete(true);
    };

    fetchImagery();
  }, [setApiCallsComplete, location.geometry.coordinates]);

  useEffect(() => {
    const divElement = divRef.current;
    if (!divElement) return;

    const addPreventScroll = () => {
      window.addEventListener("keydown", preventScroll);
    };

    const removePreventScroll = () => {
      window.removeEventListener("keydown", preventScroll);
    };

    divElement.addEventListener("focus", addPreventScroll);
    divElement.addEventListener("blur", removePreventScroll);

    return () => {
      divElement.removeEventListener("focus", addPreventScroll);
      divElement.removeEventListener("blur", removePreventScroll);
    };
  }, []);

  const scrollTo = (activeSequenceIndex: number) => {
    if (thumbnailRefs.current.length < 1) return;
    if (thumbnailRefs.current[activeSequenceIndex].current) {
      thumbnailRefs.current[activeSequenceIndex].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    if (activeSequenceIndex === 0 && isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    scrollTo(activeSequenceIndex);
  }, [activeSequenceIndex]);

  return (
    <div className={cn.imageryWrapper()}>
      {!apiCallsComplete ? (
        <div className={cn.imageryLoader()}>
          <Loader />
        </div>
      ) : (
        <>
          <div>
            {sortedSequences && activeSequence && (
              <Carousel
                sortedSequences={sortedSequences}
                activeSequence={activeSequence}
                activeSequenceIndex={activeSequenceIndex}
                setActiveSequenceIndex={setActiveSequenceIndex}
                activeFrameIndex={activeFrameIndex}
                setActiveFrameIndex={setActiveFrameIndex}
                setShowModal={setShowModal}
              />
            )}
          </div>
          {sortedSequences.length > 0 ? (
            <div ref={divRef} className={cn.imageryThumbnails()} tabIndex={0}>
              {sortedSequences.map((sequence, index) => {
                const ref = React.createRef<HTMLDivElement>();
                thumbnailRefs.current[index] = ref;

                const isLast = index === sortedSequences.length - 1;
                return (
                  <div
                    key={sequence[0].url}
                    ref={ref}
                    className={cn.imageryThumbnail(isLast)}
                  >
                    <Thumbnail
                      key={sequence[0].url}
                      url={sequence[0].url}
                      timestamp={sequence[0].timestamp}
                      onClick={() => {
                        setActiveSequenceIndex(index);
                        setActiveFrameIndex({ value: 0 });
                      }}
                      isActive={index === activeSequenceIndex}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={cn.imageryNullState()}>
              No imagery available in the last 14 days.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Imagery;
