import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Filters from "@components/hivemapper/ui/Filters";
import List from "@components/hivemapper/ui/List";
import ViewSelector from "@components/hivemapper/ui/ViewSelector";
import View from "@components/hivemapper/ui/View";
import Map from "@components/hivemapper/scout/maps/Map";
import { useStyles } from "@hooks/useStyles";
import { useConfig } from "@hooks/useConfig";
import { ListType } from "types/list";
import { FiltersState } from "types/filter";
import { filterLocations } from "@utils/filter";
import { ScoutLocation } from "types/location";
import { Views } from "types/view";
import Location from "@components/hivemapper/scout/locations/Location";

export interface AppProps {
  locations: ScoutLocation[];
  children?: React.ReactNode;
}

const App: React.FC<AppProps> = ({ locations }) => {
  const { stripTailwindClasses } = useStyles();
  const { mapAccessToken, mapDefaultCoords } = useConfig();

  const [activeView, setActiveView] = useState(Views.Thumbnail);
  const [filters, setFilters] = useState<FiltersState>({
    tags: [],
    description: "",
    search: "",
  });

  const [activeLocationId, setActiveLocationId] = useState<
    string | number | null
  >(null);
  const activeLocation = locations.find(
    (location) => location._id === activeLocationId
  );

  const filteredLocations = filterLocations(locations, filters);

  const selectionCallback = (locationId: string | number) => {
    setActiveLocationId(locationId);
    setActiveView(Views.Location);
  };

  const containerClasses = classNames(
    {
      "w-full max-w-7xl mx-auto relative font-sans pt-8": !stripTailwindClasses,
      "pb-8": !stripTailwindClasses && activeView !== Views.Map,
    },
    "hm-container"
  );

  const renderView = (view: Views) => {
    switch (view) {
      case Views.Map:
        return (
          <Map
            mapAccessToken={mapAccessToken}
            mapDefaultCoords={mapDefaultCoords}
            locations={filteredLocations}
            selectionCallback={selectionCallback}
          />
        );
      case Views.Thumbnail:
        return (
          <List
            type={ListType.Thumbnail}
            locations={filteredLocations}
            itemsPerPage={10}
            selectionCallback={selectionCallback}
          />
        );
      case Views.Location:
        return (
          <Location
            location={activeLocation || filteredLocations[0]}
            mapAccessToken={mapAccessToken}
          />
        );
    }
  };

  return (
    <div className={containerClasses}>
      <Filters locations={locations} setFilters={setFilters} />
      <View>
        <ViewSelector activeView={activeView} setActiveView={setActiveView} />
        {renderView(activeView)}
      </View>
    </div>
  );
};

export default App;
