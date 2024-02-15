export type Coordinate = [number, number];
export type Coordinates = Coordinate[];

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: GeoJSONType.Polygon | GeoJSONType.MultiPolygon;
    coordinates: Coordinates[] | Coordinates[][];
  };
  properties?: {
    name: string;
    description?: string;
    tags?: string[];
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface GeoJSONPolygon {
  type: GeoJSONType.Polygon;
  coordinates: Coordinates[];
}

export interface GeoJSONMultiPolygon {
  type: GeoJSONType.MultiPolygon;
  coordinates: Coordinates[][];
}

export enum GeoJSONType {
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Address = 'Address',
}