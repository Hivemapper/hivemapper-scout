import * as turf from '@turf/turf';
import { GeoJSONPolygon } from 'types/geojson';
import { latLngToCell, gridDisk, cellToBoundary} from 'h3-js';

function findTouchedH3Hexagons(lon: number, lat: number, radius: number): string[] {
    const resolution = 11;
    const h3Index = latLngToCell(lat, lon, resolution);
    return gridDisk(h3Index, radius);
}

export function h3Poly(cell: string) {
    const coordinates = cellToBoundary(cell).map(coord => coord.reverse());
    coordinates.push(coordinates[0]);
    const geom = {
        type: 'Polygon',
        coordinates: [coordinates],
    } as GeoJSONPolygon;

    return geom;
}
  

export function h3PolyFromCells(cells: string[]) {
    const polys = cells.map(cell => h3Poly(cell)) as GeoJSONPolygon[];
    if (polys.length < 2) {
      return polys[0]!;
    }
  
    let p = turf.union(polys[0], polys[1]);
    for (let i = 2; i < polys.length; i++) {
      p = turf.union(p!, polys[i]);
    }
    return p!.geometry as GeoJSONPolygon;
}

export const convertPointToPolygon = (coordinates: string) => {
    const [lon, lat] = coordinates.split(',').map(Number);
    const radius = 1.25;

    const touchedHexes = findTouchedH3Hexagons(lon, lat, radius);
    const h3Polygon = h3PolyFromCells(touchedHexes); 
    
    return h3Polygon;
};