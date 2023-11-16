import { id } from "date-fns/locale";
import { GeoJSONSourceSpecification, LngLatLike, Map as MlMap } from "maplibre-gl";

export enum EventTypes {
  CLICK = 'click',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
}

export interface BoundEvents {
  [EventTypes.CLICK]: {
    [key: string]: boolean;
  };
  [EventTypes.MOUSE_ENTER]: {
    [key: string]: boolean;
  };
  [EventTypes.MOUSE_LEAVE]: {
    [key: string]: boolean;
  };
}

export type EventKeys = keyof BoundEvents;

export interface InitializationParams {
  mapContainer: HTMLDivElement;
  mapDefaultCoords?: LngLatLike;
  onLoadCallback: (newMap: MlMap) => void, 
  zoom?: number
  mapStyle?: string
}

export type SourceTypes = 'geojson' | 'raster' | 'raster-dem' | 'vector' | 'image' | 'video'

export type LayerTypes = "symbol" | "fill" | "circle" | "line" | "heatmap" | "fill-extrusion" | "raster" | "hillshade" | "background"

export type SourceOptions = {
  id: string;
  options: GeoJSONSourceSpecification
}
