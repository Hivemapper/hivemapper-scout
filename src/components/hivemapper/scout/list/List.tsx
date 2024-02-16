import React, { useRef, useState } from "react";
import Pagination from "@components/hivemapper/ui/Pagination";
import Detailed from "./item/Detailed/Detailed";
import { ScoutLocation } from "types/location";
import useDisableBackSwipe from "@hooks/useDisableBackSwipe";
import { useIsomorphicLayoutEffect } from "@utils/helpers";
import * as cn from "./classNames";

export interface ListProps {
  apiKey: string;
  username: string;
  locations: ScoutLocation[];
  itemsPerPage?: number;
  selectionCallback?: (id: string | number) => void;
}

const List: React.FC<ListProps> = ({
  apiKey,
  username,
  locations,
  itemsPerPage = 10,
  selectionCallback = () => {},
}) => {
  const [page, setPage] = useState(1);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  const scrollToRef = useRef<HTMLDivElement>(null);

  useDisableBackSwipe();

  let encodedCredentials: string | null = null;
  if (apiKey && username) {
    encodedCredentials = btoa(`${username}:${apiKey}`);
  }

  const currentLocations = locations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const scrollToTarget = () => {
    if (scrollToRef?.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (scrollToRef.current) {
      const rect = scrollToRef.current.getBoundingClientRect();
      setDistanceFromTop(Math.floor(rect.top));
    }
  }, []);

  return (
    <div ref={scrollToRef} className={cn.listWrapper()}>
      {currentLocations.map((location) => {
        return (
          <Detailed
            key={location._id}
            location={location}
            encodedCredentials={encodedCredentials}
            selectionCallback={selectionCallback}
          />
        );
      })}
      {locations.length > 0 ? (
        <Pagination
          total={locations.length}
          onChange={(page) => {
            setPage(page);
            scrollToTarget();
          }}
        />
      ): <div className={cn.listNullState()} style={{ minHeight: `calc(95vh - ${distanceFromTop}px)` }}>Press "Upload" to start monitoring locations with Scout.</div>}
    </div>
  );
};

export default List;
