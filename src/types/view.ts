import { LngLatLike } from "maplibre-gl";
import { ScoutLocation } from "types/location";

export interface ViewProps {
  dark?: boolean;
  stripTailwindClasses?: boolean;
  children?: React.ReactNode;
}

export interface ViewLocationsProps extends ViewProps {
  locations: ScoutLocation[];
}

export interface ViewLocationProps extends ViewProps {
  location: ScoutLocation;
}

export interface MapViewLocationsProps extends ViewLocationsProps {
  mapAccessToken: string;
  defaultCoords: LngLatLike;
  mapStyle?: string;
}

