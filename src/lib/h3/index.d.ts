export function gridDisk(h3Index: H3IndexInput, ringSize: number): H3Index[];

export function latLngToCell(lat: number, lng: number, res: number): H3Index;

export function cellToBoundary(h3Index: H3IndexInput, formatAsGeoJson?: boolean): CoordPair[];