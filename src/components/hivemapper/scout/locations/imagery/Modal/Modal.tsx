import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { monthDayTime, prettyDate } from "@utils/dates";
import { Frame } from "types/location";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/shadcn/Dialog";
import { Button } from "@components/shadcn/Button";
import Close from "@components/icons/Close";

interface Props {
  sortedSequences: Frame[][];
  activeSequence: Frame[];
  activeSequenceIndex: number;
  setActiveSequenceIndex: Dispatch<SetStateAction<number>>;
  activeFrameIndex: { value: number };
  setActiveFrameIndex: Dispatch<SetStateAction<{ value: number }>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({
  sortedSequences,
  activeSequence,
  activeSequenceIndex,
  setActiveSequenceIndex,
  activeFrameIndex,
  setActiveFrameIndex,
  showModal,
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
    ]
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
    [handleNavigation, setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", eventKeyCallback, false);
    return () => {
      document.removeEventListener("keydown", eventKeyCallback, false);
    };
  }, [eventKeyCallback]);

  return (
    <Dialog open={showModal}>
      <DialogContent>
        <div className="flex items-center justify-center h-screen overflow-hidden">
          <div className="relative">
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <Close />
            </div>
            {activeSequence[activeFrameIndex.value] && (
              <>
                <div className="text-2xl absolute bottom-5 right-5">
                  {activeFrameIndex.value + 1} / {activeSequence.length}
                </div>
                <div className="text-2xl absolute bottom-5 left-5">
                  {prettyDate(
                    activeSequence[activeFrameIndex.value].timestamp,
                    true
                  )}
                  {", "}
                  {monthDayTime(
                    new Date(activeSequence[activeFrameIndex.value].timestamp)
                  )}
                </div>
              </>
            )}
            <img
              className="max-w-full max-h-screen"
              src={activeSequence[activeFrameIndex.value].url}
              alt="Active frame"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
