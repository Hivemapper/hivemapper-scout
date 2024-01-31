export type Coordinate = [number, number];
export type Coordinates = Coordinate[];

export interface GeoJSONFeature {
  type: "Feature";
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Coordinates[] | Coordinates[][];
  };
  properties?: {
    _id: string;
    name: string;
    description?: string;
    tags?: string[];
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
