import React, { useRef, useState } from "react";
import Pagination from "@components/hivemapper/ui/Pagination";
import Detailed from "./item/Detailed/Detailed";
import { ScoutLocation } from "types/location";

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

  const scrollToRef = useRef<HTMLDivElement>(null);

  const encodedCredentials = btoa(`${username}:${apiKey}`);

  const currentLocations = locations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const scrollToTarget = () => {
    if (scrollToRef?.current) {
      const topPosition =
        scrollToRef.current.getBoundingClientRect().top + window.scrollY;
      const desiredPosition = topPosition - 100;
      window.scrollTo({ top: desiredPosition, behavior: "smooth" });
    }
  };

  return (
    <div ref={scrollToRef}>
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
      <Pagination
        total={locations.length}
        onChange={(page) => {
          setPage(page);
          scrollToTarget();
        }}
      />
    </div>
  );
};

export default List;
