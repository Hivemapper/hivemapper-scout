import React, { useState } from "react";
import { LngLatLike } from "maplibre-gl";
import Filters from "@components/hivemapper/ui/Filters";
import List from "@components/hivemapper/scout/list";
import ViewSelector from "@components/hivemapper/ui/ViewSelector";
import View from "@components/hivemapper/ui/View";
import Map from "@components/hivemapper/scout/maps/Map";
import { FiltersState } from "types/filter";
import { filterLocations } from "@utils/filter";
import { ScoutLocation } from "types/location";
import { Views } from "types/view";
import Location from "@components/hivemapper/scout/location/Location";
import Config from "@components/hivemapper/hoc/Config";
import Container from "@components/hivemapper/ui/Container";

export interface DemoProps {
  locations: ScoutLocation[];
  mapAccessToken: string;
  apiKey: string;
  username: string;
  mapDefaultCoords?: LngLatLike;
  mapStyle?: string;
  darkMode?: boolean;
  stripTailwindClasses?: boolean;
}

const Demo: React.FC<DemoProps> = ({
  locations,
  darkMode,
  stripTailwindClasses,
  mapAccessToken,
  mapDefaultCoords,
  mapStyle,
  apiKey,
  username,
}) => {
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
    (location) => location._id === activeLocationId,
  );

  const filteredLocations = filterLocations(locations, filters);

  const selectionCallback = (locationId: string | number) => {
    setActiveLocationId(locationId);
    setActiveView(Views.Location);
  };

  const renderView = (view: Views) => {
    switch (view) {
      case Views.Map:
        return (
          <Map
            mapAccessToken={mapAccessToken}
            mapDefaultCoords={mapDefaultCoords}
            locations={filteredLocations}
            selectionCallback={selectionCallback}
            mapStyle={mapStyle}
          />
        );
      case Views.Thumbnail:
        return (
          <List
            locations={filteredLocations}
            itemsPerPage={10}
            selectionCallback={selectionCallback}
            username={username}
            apiKey={apiKey}
          />
        );
      case Views.Location:
        return (
          <Location
            location={activeLocation || filteredLocations[0]}
            mapAccessToken={mapAccessToken}
            username={username}
            apiKey={apiKey}
          />
        );
    }
  };

  return (
    <Config darkMode={!!darkMode} stripTailwindClasses={!!stripTailwindClasses}>
      <Container activeView={activeView}>
        <Filters locations={locations} setFilters={setFilters} />
        <View>
          <ViewSelector activeView={activeView} setActiveView={setActiveView} />
          {renderView(activeView)}
        </View>
      </Container>
    </Config>
  );
};

export default Demo;
