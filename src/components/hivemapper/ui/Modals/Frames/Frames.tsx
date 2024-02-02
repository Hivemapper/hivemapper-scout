import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
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
}

const Frames: React.FC<Props> = ({
  sortedSequences,
  activeSequence,
  activeSequenceIndex,
  setActiveSequenceIndex,
  activeFrameIndex,
  setActiveFrameIndex,
  setShowModal,
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
        case "Escape":
          setShowModal(false);
          break;
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
    [handleNavigation, setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);
    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
    };
  }, [eventKeyCallback]);

  return (
    <>
      {activeSequence[activeFrameIndex.value] && (
        <>
          <div className={cn.frameModalSequence()}>
            {activeFrameIndex.value + 1} / {activeSequence.length}
          </div>
          <div className={cn.frameModalDate()}>
            {prettyDate(activeSequence[activeFrameIndex.value].timestamp, true)}
            {", "}
            {monthDayTime(
              new Date(activeSequence[activeFrameIndex.value].timestamp),
            )}
          </div>
        </>
      )}
      <img
        className={cn.frameModalFrame()}
        src={activeSequence[activeFrameIndex.value].url}
        alt="Active frame"
      />
    </>
  );
};

export default Frames;
