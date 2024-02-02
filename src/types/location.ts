import { Coordinates } from "./geojson";

export interface ScoutLocation extends InputLocation {
  _id: string;
}

export interface InputLocation {
  geometry: {
    type: "Polygon" | "MultiPolygon";
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

export interface CSVLocation {
  _id: string;
  type: "Polygon" | "MultiPolygon";
  coordinates: string;
  name: string;
  description?: string;
  tags?: string;
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
