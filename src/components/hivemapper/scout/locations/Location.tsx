import React, { useState } from "react";
import turf from "@turf/centroid";
import MiniMap from "@components/hivemapper/scout/maps/MiniMap";
import Imagery from "@components/hivemapper/scout/locations/imagery/Imagery";
import Modal from "@components/hivemapper/scout/locations/imagery/Modal";
import { ScoutLocation, Frame } from "types/location";
import DotIcon from "@components/icons/Dot";
import { monthDayTime, prettyDate } from "@utils/dates";

export interface LocationProps {
  location: ScoutLocation;
  mapAccessToken: string;
  mapStyle?: string;
  isFirstResult?: boolean;
}

const Location: React.FC<LocationProps> = ({
  location,
  mapAccessToken,
  mapStyle,
  isFirstResult = true,
}) => {
  const [sortedSequences, setSortedSequences] = useState<Frame[][] | null>([]);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState({ value: 0 });
  const [apiCallsComplete, setApiCallsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [framesLength, setFramesLength] = useState(0);

  const latestSequence = sortedSequences[0] || [];
  const lastFrame: Frame | undefined =
    latestSequence[latestSequence.length - 1];
  const lastMapped = (lastFrame && lastFrame.timestamp) || null;

  const activeSequence = sortedSequences?.[activeSequenceIndex] || null;

  const centroid = turf(location.geojson);

  return (
    <>
      {sortedSequences && activeSequence && (
        <Modal
          sortedSequences={sortedSequences}
          activeSequence={activeSequence}
          activeSequenceIndex={activeSequenceIndex}
          setActiveSequenceIndex={setActiveSequenceIndex}
          activeFrameIndex={activeFrameIndex}
          setActiveFrameIndex={setActiveFrameIndex}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div
        key={location._id}
        className={`bg-black-100 rounded-md mx-1 ${
          isFirstResult ? "mt-0" : "mt-1"
        } px-3 py-3`}
      >
        <div className="flex w-full">
          <div className="w-2/5">
            <div className="text-3xl font-bold tracking-tight">
              {location.name}
            </div>
            <div className="text-primary text-2xl font-semibold tracking-tight mt-2">
              {location.description}
            </div>
            {centroid && (
              <div className="text-md font-medium tracking-normal text-blue-400 mt-2">
                {`${centroid.geometry.coordinates[1]}, ${centroid.geometry.coordinates[0]}`}
              </div>
            )}
          </div>
          <div className="w-3/5 flex flex-col justify-between">
            <div>
              {lastMapped && (
                <div className="flex items-center justify-end mt-2">
                  <DotIcon />
                  <span className="text-md font-bold ml-2">
                    Mapped {prettyDate(lastMapped, true)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-end mt-2">
                <span className="text-primary text-sm font-medium tracking-normal">
                  {monthDayTime(lastMapped)}
                </span>
              </div>
            </div>
            <div>
              {sortedSequences.length > 0 && (
                <div className="text-base font-bold tracking-normal">
                  {sortedSequences.length} collections, {framesLength} images
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full mt-2">
          <div className="relative flex flex-col w-2/5 h-[478px] pr-3">
            <MiniMap
              mapStyle={mapStyle}
              mapAccessToken={mapAccessToken}
              center={centroid.geometry.coordinates}
              geometry={{
                type: "Feature",
                geometry: location.geojson,
              }}
              sortedSequences={sortedSequences}
              activeSequence={activeSequence}
              activeSequenceIndex={activeSequenceIndex}
              apiCallsComplete={apiCallsComplete}
              activeFrameIndex={activeFrameIndex}
            />
          </div>
          <div className="flex flex-wrap w-3/5">
            <Imagery
              location={location}
              sortedSequences={sortedSequences}
              setSortedSequences={setSortedSequences}
              activeSequence={activeSequence}
              activeSequenceIndex={activeSequenceIndex}
              setActiveSequenceIndex={setActiveSequenceIndex}
              apiCallsComplete={apiCallsComplete}
              setApiCallsComplete={setApiCallsComplete}
              activeFrameIndex={activeFrameIndex}
              setActiveFrameIndex={setActiveFrameIndex}
              setShowModal={setShowModal}
              setFramesLength={setFramesLength}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
