import { LngLatLike } from "maplibre-gl";
import { ScoutLocation } from "types/location";

export interface ViewProps {
  darkMode?: boolean;
  stripTailwindClasses?: boolean;
  children?: React.ReactNode;
}

export interface ViewLocationsProps extends ViewProps {
  locations: ScoutLocation[];
}

export interface ViewLocationProps extends ViewProps {
  location: ScoutLocation;
  mapAccessToken: string;
  mapStyle?: string;
}

export interface MainViewProps extends ViewLocationsProps {
  mapAccessToken: string;
  mapDefaultCoords?: LngLatLike;
  mapStyle?: string;
  apiKey: string;
  username: string;
}

export enum Views {
  Map = "map",
  Location = "location",
  Thumbnail = "thumbnail",
}
