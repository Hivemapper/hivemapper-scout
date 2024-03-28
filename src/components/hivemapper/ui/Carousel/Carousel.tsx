import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import ArrowLeftCircle from "@components/icons/ArrowLeftCircle";
import ArrowRightCircle from "@components/icons/ArrowRightCircle";
import Maximize from "@components/icons/Maximize";
import { monthDayTime, prettyDate } from "@utils/dates";
import { Frame } from "types/location";
import * as cn from "./classNames";

interface Props {
  sortedSequences: Frame[][];
  activeSequence: Frame[];
  activeSequenceIndex: number;
  setActiveSequenceIndex: Dispatch<SetStateAction<number>>;
  activeFrameIndex: { value: number };
  setActiveFrameIndex: Dispatch<SetStateAction<{ value: number }>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showDates?: boolean;
}

const Carousel: React.FC<Props> = ({
  sortedSequences,
  activeSequence,
  activeSequenceIndex,
  setActiveSequenceIndex,
  activeFrameIndex,
  setActiveFrameIndex,
  setShowModal,
  showDates = true,
}) => {
  const isLastFrame =
    activeFrameIndex.value === activeSequence.length - 1 &&
    activeSequenceIndex === sortedSequences.length - 1;

  const isFirstFrame =
    activeFrameIndex.value === 0 && activeSequenceIndex === 0;

  const handleNavigation = useCallback(
    (direction: "left" | "right") => {
      if (direction === "right") {
        if (isLastFrame) return;

        if (activeFrameIndex.value === activeSequence.length - 1) {
          setActiveSequenceIndex((prevState) => {
            return prevState === sortedSequences.length - 1
              ? prevState
              : prevState + 1;
          });
          setActiveFrameIndex({ value: 0 });
        } else {
          setActiveFrameIndex({ value: activeFrameIndex.value + 1 });
        }
      } else if (direction === "left") {
        if (isFirstFrame) return;

        if (activeFrameIndex.value === 0) {
          setActiveSequenceIndex((prevState) => {
            return prevState > 0 ? prevState - 1 : prevState;
          });

          setActiveFrameIndex({
            value: sortedSequences[activeSequenceIndex - 1]
              ? sortedSequences[activeSequenceIndex - 1].length - 1
              : 0,
          });
        } else {
          setActiveFrameIndex({ value: activeFrameIndex.value - 1 });
        }
      }
    },
    [
      activeFrameIndex.value,
      activeSequence.length,
      isFirstFrame,
      isLastFrame,
      setActiveFrameIndex,
      activeSequenceIndex,
      setActiveSequenceIndex,
      sortedSequences,
    ],
  );

  const eventKeyCallback = useCallback(
    (event: any) => {
      switch (event.key) {
        case "ArrowLeft":
          handleNavigation("left");
          break;
        case "ArrowRight":
          handleNavigation("right");
          break;
        default:
          break;
      }
    },
    [handleNavigation],
  );

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);

    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
    };
  }, [eventKeyCallback]);

  return (
    <>
      <div className={cn.carouselWrapper()}>
        <div
          className={cn.carouselMaximize()}
          onClick={() => setShowModal(true)}
        >
          <Maximize />
        </div>
        {showDates && (
          <div className={cn.carouselDate()}>
            <div>
              {prettyDate(
                activeSequence[activeFrameIndex.value].timestamp,
                true,
              )}
              {", "}
              {monthDayTime(
                new Date(activeSequence[activeFrameIndex.value].timestamp),
              )}
            </div>
          </div>
        )}
        <div className={cn.carouselSequence()}>
          {activeFrameIndex.value + 1} / {activeSequence.length}
        </div>
        <div
          className={cn.carouselLeftArrow(isFirstFrame)}
          onClick={() => handleNavigation("left")}
        >
          <div>
            <ArrowLeftCircle />
          </div>
        </div>
        <div
          className={cn.carouseRightArrow(isLastFrame)}
          onClick={() => handleNavigation("right")}
        >
          <div>
            <ArrowRightCircle />
          </div>
        </div>
        <div className={cn.carouselSection()}>
          {activeSequence.map((frame: Frame, index: number) => {
            return (
              <div
                className={cn.carouselFrame(activeFrameIndex.value === index)}
                key={frame.url}
              >
                <img
                  className={cn.carouselImg()}
                  src={frame.url}
                  alt={`Active frame}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Carousel;
