export interface ScoutLocation {
  _id: string;
  disabledAt: null;
  geojson: {
    type: string;
    coordinates: number[][][];
  };
  name: string;
  description?: string;
  tags: string[];
  owner: string;
  searchShape: {
    type: string;
    coordinates: number[][][];
  };
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
    mountPosition: 'front' | 'right' | 'left' | 'back';
    gdop: number;
    hdop: number;
    pdop: number;
    eph: number;
  };
}