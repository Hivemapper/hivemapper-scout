export type Coordinate = [number, number];
export type Coordinates = Coordinate[];

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Polygon" | "MultiPolygon";
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
  type: 'Polygon';
  coordinates: Coordinates[];
}

export interface GeoJSONMultiPolygon {
  type: 'MultiPolygon';
  coordinates: Coordinates[][];
}