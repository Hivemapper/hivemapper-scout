import React, { useEffect, useState } from "react";
import turf from "@turf/centroid";
import MiniMap from "@components/hivemapper/ui/MiniMap";
import Imagery from "@components/hivemapper/ui/Imagery";
import Modal from "@components/hivemapper/ui/Modal";
import { ScoutLocation, Frame } from "types/location";
import DotIcon from "@components/icons/Dot";
import { monthDayTime, prettyDate } from "@utils/dates";
import * as cn from "./classNames";
import useDisableBackSwipe from "@hooks/useDisableBackSwipe";

export interface LocationProps {
  location: ScoutLocation;
  mapAccessToken: string;
  mapStyle?: string;
  username: string;
  apiKey: string;
  isFirstResult?: boolean;
}

const Location: React.FC<LocationProps> = ({
  location,
  mapAccessToken,
  mapStyle,
  username,
  apiKey,
}) => {
  const [sortedSequences, setSortedSequences] = useState<Frame[][] | null>([]);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState({ value: 0 });
  const [apiCallsComplete, setApiCallsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [framesLength, setFramesLength] = useState(0);

  useDisableBackSwipe();

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
      <div key={location._id} className={cn.locationWrapper()}>
        <div className={cn.locationSectionTop()}>
          <div className={cn.locationSectionTopLeft()}>
            <div className={cn.locationName()}>{location.name}</div>
            <div className={cn.locationDescription()}>
              {location.description}
            </div>
            {centroid && (
              <div className={cn.locationCentroid()}>
                {`${centroid.geometry.coordinates[1]}, ${centroid.geometry.coordinates[0]}`}
              </div>
            )}
          </div>
          <div className={cn.locationSectionTopRight()}>
            <div>
              {lastMapped && (
                <>
                  <div className={cn.locationLastMapped()}>
                    <DotIcon />
                    <span className={cn.locationLastMappedText()}>
                      Mapped {prettyDate(lastMapped, true)}
                    </span>
                  </div>
                  <div className={cn.locationLastMappedDate()}>
                    <span className={cn.locationLastMappedDateText()}>
                      {monthDayTime(lastMapped)}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div>
              {sortedSequences.length > 0 && (
                <div className={cn.locationCollectionsImages()}>
                  {sortedSequences.length} collections, {framesLength} images
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={cn.locationSectionBottom()}>
          <div className={cn.locationMiniMap()}>
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
          <div className={cn.locationImagery()}>
            <Imagery
              location={location}
              username={username}
              apiKey={apiKey}
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
