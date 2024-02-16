import { v4 as uuidv4 } from "uuid";
import { parse } from "csv-parse/sync";
import { CSVLocation, ScoutLocation } from "types/location";
import { GeoJSONFeatureCollection, GeoJSONType } from "types/geojson";
import { convertPointToPolygon } from "@utils/h3";
import { getPointFromAddress } from "@api/locations";
import { validate } from "@utils/validation";

export const getLocationName = (location: Record<string, string>) => {
  try {
    if (location.name) {
        return location.name;
    }
  
    if (location.type.toLowerCase() === GeoJSONType.Address.toLowerCase()) {
        return location.coordinates;
    }
  
    return location.type || "Location Name Missing";
  } catch (error) {
    return "Location Name Missing";
  }
}

export const getPopulatedProperties = (location: Record<string, string>) => {
  const populatedProperties = [];
  for (let [key, value] of Object.entries(location)) {
    if (key.trim() === "" && value.trim() === "") {
      continue;
    }

    if(key.trim() === "" || value.trim() === "") {
      key = key || value;
      value = value || key;
    }

    populatedProperties.push({ key, value });
  }

  return populatedProperties;
}

export const inferType = (value: string) => {
  const regex = /^-?\d+\.\d+,\s*-?\d+\.\d+$/;

  if (regex.test(value)) {
    return GeoJSONType.Point;
  }

  return GeoJSONType.Address;
};

export const processFile = (
  file: File,
  type: string,
  onSuccess: (locations: ScoutLocation[], file: File) => void,
  onFailure: (errorMessage: string) => void,
) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const content = e.target.result as string;

    if (type === "csv") {
      try {
        const locations = parse(content, {
          columns: true,
          skip_empty_lines: true,
        });

        if(locations.length < 1) {
          throw new Error("No locations found in CSV");
        }

        const parsedCsv = [];
        for(const location of locations) {
          const properties = getPopulatedProperties(location);

          if (properties.length < 1) {
            throw new Error("No valid properties found in CSV");
          }

          if (properties.length === 1) {
            location.type = inferType(properties[0].value);
            location.coordinates = properties[0].value;
          }

          const geojson = await geojsonBasedOnType(location);

          parsedCsv.push({
            _id: uuidv4(),
            name: getLocationName(location),
            geojson,
            description: location.description,
            tags: location.tags?.split(",").map((tag: string) => tag.trim()).filter(Boolean),
          })
        }

        const validCsv = validate(parsedCsv, 'csv') as ScoutLocation[];
        onSuccess(validCsv, file);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        onFailure(error.message);
      }
    } else if (type === "geojson") {
      try {
        const validGeoJson = validate(content, 'geojson');
        const parsedGeojson = parseGeojsonToLocations(validGeoJson as GeoJSONFeatureCollection);
        onSuccess(parsedGeojson, file);
      } catch (error) {
        console.error("Error parsing GeoJSON:", error);
        onFailure(error.message);
      }
    } else {
      onFailure("Unsupported file type");
    }
  };

  reader.readAsText(file);
};

export const parseGeojsonToLocations = (
  geojson: GeoJSONFeatureCollection,
): ScoutLocation[] => {
  const locations = [];
  for (const feature of geojson.features) {
    const location = {
      _id: uuidv4(),
      geojson: feature.geometry,
      name: feature.properties.name,
      description: feature.properties.description,
      tags: feature.properties.tags,
    };
    locations.push(location);
  }
  return locations;
};

export const parseJsonToLocations = (
  json: ScoutLocation[],
): ScoutLocation[] => {
  const locations = json.map((location) => ({
    ...location,
    _id: uuidv4(),
  }));

  return locations;
};

export function downloadJson(url, filename) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const blob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
    .catch(console.error);
}

export const geojsonBasedOnType = async (location: Record<string, string>) => {
  try {
    if (location.type.toLowerCase() === GeoJSONType.Address.toLowerCase()) {
      const response = await getPointFromAddress(location.coordinates);
      if("error" in response || !response.features) {
        throw new Error("Error getting point from address: " + location.coordinates);
      }

      const { center } = response.features[0];
      if(!center) {
        throw new Error("Error getting center from address: " + location.coordinates);
      }

      const coords = center.join(", ");
      return convertPointToPolygon(coords);
    } else if (location.type.toLowerCase() === GeoJSONType.Point.toLowerCase()) {
      return convertPointToPolygon(location.coordinates, true);
    } else if (location.type.toLowerCase() === GeoJSONType.Polygon.toLowerCase() || location.type.toLowerCase() === GeoJSONType.MultiPolygon.toLowerCase()) {
      return {
        type: location.type,
        coordinates: JSON.parse(
          "[" + location.coordinates.replace(/, /g, ",") + "]",
        ),
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};