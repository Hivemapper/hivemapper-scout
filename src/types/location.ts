import {
  Coordinates,
  GeoJSONMultiPolygon,
  GeoJSONPolygon,
  GeoJSONType,
} from "./geojson";

export interface ScoutLocation extends InputLocation {
  _id: string;
}

export interface InputLocation {
  _id?: string;
  geojson: {
    type: GeoJSONType.Polygon | GeoJSONType.MultiPolygon;
    coordinates: Coordinates[] | Coordinates[][];
  };
  name: string;
  description?: string;
  tags?: string[];
}

export interface FilesWithLocations {
  [key: string]: {
    file: File;
    locations: ScoutLocation[];
  };
}

export interface ScoutPayload {
  name: string;
  geojson: GeoJSONPolygon | GeoJSONMultiPolygon;
  tags?: string[];
  description?: string;
}

export interface Frame {
  url: string;
  timestamp: string;
  idx: number;
  sequence: string;
  position: {
    lat: number;
    latRef: string;
    lon: number;
    lonRef: string;
    mountPosition: "front" | "right" | "left" | "back";
    gdop: number;
    hdop: number;
    pdop: number;
    eph: number;
  };
}

export interface CSVLocation {
  type: GeoJSONType;
  coordinates: string;
  name?: string;
  description?: string;
  tags?: string;
}
