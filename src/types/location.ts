export interface ScoutLocation {
  _id: string;
  disabledAt: null;
  geojson: {
    type: string;
    coordinates: number[][][];
  };
  name: string;
  owner: string;
  searchShape: {
    type: string;
    coordinates: number[][][];
  };
  tag: string;
  createdAt: string;
  updatedAt?: string;
}