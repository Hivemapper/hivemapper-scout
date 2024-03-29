import React, {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import * as turf from "@turf/turf";
import MiniMap from "@components/hivemapper/ui/MiniMap";
import Imagery from "@components/hivemapper/ui/Imagery";
import Frames from "@components/hivemapper/ui/Modals/Frames";
import { ScoutLocation, Frame } from "types/location";
import useDisableBackSwipe from "@hooks/useDisableBackSwipe";
import Modal from "@components/hivemapper/ui/Modals/Modal";
import { useIsomorphicLayoutEffect } from "@utils/helpers";
import MoreOptionsMenu from "@components/hivemapper/ui/MoreOptionsMenu";
import RemoveLocation from "@components/hivemapper/ui/MoreOptionsMenu/RemoveLocation";
import * as cn from "./classNames";

export interface LocationProps {
  location: ScoutLocation;
  setLocations: Dispatch<SetStateAction<ScoutLocation[]>>;
  mapAccessToken: string;
  mapStyle?: string;
  username: string;
  apiKey: string;
  isFirstResult?: boolean;
}

const Location: React.FC<LocationProps> = ({
  location,
  setLocations,
  mapAccessToken,
  mapStyle,
  username,
  apiKey,
}) => {
  const [distanceFromTop, setDistanceFromTop] = useState(0);
  const [sortedSequences, setSortedSequences] = useState<Frame[][] | null>([]);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState({ value: 0 });
  const [apiCallsComplete, setApiCallsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [_, setFramesLength] = useState(0);
  const [requestCost, setRequestCost] = useState<number | null>(null);

  const nullStateRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (nullStateRef.current) {
      const rect = nullStateRef.current.getBoundingClientRect();
      setDistanceFromTop(Math.floor(rect.top));
    }
  }, []);

  useEffect(() => {
    if (location) {
      setApiCallsComplete(false);
      setSortedSequences([]);
    }
  }, [location]);

  useDisableBackSwipe();

  if (!location) {
    return (
      <div
        ref={nullStateRef}
        className={cn.locationNullState()}
        style={{ minHeight: `calc(95vh - ${distanceFromTop}px)` }}
      >
        Press "Upload" to start monitoring locations with Scout.
      </div>
    );
  }

  const activeSequence = sortedSequences?.[activeSequenceIndex] || null;
  const centroid = turf.centroid(location.geojson);

  return (
    <>
      {sortedSequences && activeSequence && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <Frames
            sortedSequences={sortedSequences}
            activeSequence={activeSequence}
            activeSequenceIndex={activeSequenceIndex}
            setActiveSequenceIndex={setActiveSequenceIndex}
            activeFrameIndex={activeFrameIndex}
            setActiveFrameIndex={setActiveFrameIndex}
            setShowModal={setShowModal}
          />
        </Modal>
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
            <div className={cn.locationMoreOptionsMenu()}>
              {requestCost !== null && (
                <div className={cn.locationOptionsCredits()}>
                  {requestCost} credits
                </div>
              )}
              <MoreOptionsMenu
                elements={[
                  <RemoveLocation
                    id={location._id}
                    setLocations={setLocations}
                    callback={() => {
                      setActiveSequenceIndex(0);
                      setActiveFrameIndex({ value: 0 });
                    }}
                  />,
                ]}
              />
            </div>
          </div>
        </div>
        <div className={cn.locationSectionBottom()}>
          <div className={cn.locationMiniMap()}>
            <MiniMap
              mapStyle={mapStyle}
              mapAccessToken={mapAccessToken}
              center={centroid.geometry.coordinates}
              geojson={{
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
              setRequestCost={setRequestCost}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
