import { v4 as uuidv4 } from "uuid";
import { parse } from "csv-parse/sync";
import { CSVLocation, ScoutLocation } from "types/location";
import { GeoJSONFeatureCollection } from "types/geojson";
import { convertPointToPolygon } from "@utils/h3";
import { getPointFromAddress } from "@api/locations";

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

        const parsedCsv = [];
        for(const location of locations) {
          const geojson = await geojsonBasedOnType(location);

          parsedCsv.push({
            _id: uuidv4(),
            name: location.name,
            description: location.description,
            tags: location.tags?.split(",").map((tag: string) => tag.trim()),
            geojson,
          })
        }

        onSuccess(parsedCsv, file);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        onFailure(error.message);
      }
    } else if (type === "json") {
      try {
        const json = JSON.parse(content);
        const parsedJson = parseJsonToLocations(json);
        onSuccess(parsedJson, file);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        onFailure(error.message);
      }
    } else if (type === "geojson") {
      try {
        const geojson = JSON.parse(content);
        const parsedGeojson = parseGeojsonToLocations(geojson);
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

export const geojsonBasedOnType = async (location: CSVLocation) => {
  if (location.type === "Address") {
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
  } else if (location.type === "Point") {
    return convertPointToPolygon(location.coordinates);
  } else if (location.type === "Polygon" || location.type === "MultiPolygon") {
    return {
      type: location.type,
      coordinates: JSON.parse(
        "[[" + location.coordinates.replace(/, /g, ",") + "]]",
      ),
    }
  } else {
    return null;
  }
};