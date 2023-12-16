import {
  GeoJSONSourceSpecification,
  LngLatLike,
  Map as MlMap,
} from "maplibre-gl";

export enum EventTypes {
  CLICK = "click",
  MOUSE_ENTER = "mouseenter",
  MOUSE_LEAVE = "mouseleave",
}

export interface InitializationParams {
  mapContainer: HTMLDivElement;
  mapDefaultCoords?: LngLatLike;
  onLoadCallback: (newMap: MlMap) => void;
  zoom: number;
  mapStyle?: string;
}

export type SourceTypes =
  | "geojson"
  | "raster"
  | "raster-dem"
  | "vector"
  | "image"
  | "video";

export type LayerTypes =
  | "symbol"
  | "fill"
  | "circle"
  | "line"
  | "heatmap"
  | "fill-extrusion"
  | "raster"
  | "hillshade"
  | "background";

export type SourceOptions = {
  id: string;
  options: GeoJSONSourceSpecification;
};
