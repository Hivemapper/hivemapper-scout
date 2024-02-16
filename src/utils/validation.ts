import Ajv from "ajv";
import { GeoJSONType } from "types/geojson";
const ajv = new Ajv();

const geoJsonTypeEnum = [GeoJSONType.Polygon, GeoJSONType.MultiPolygon, GeoJSONType.Polygon.toLowerCase(), GeoJSONType.MultiPolygon.toLowerCase()]

export const validate = (content: string | object, type: 'csv' | 'json' | 'geojson') => {
    if (typeof content === 'string') {
        content = JSON.parse(content);
    }

    let schema: any;
    if (type === 'csv') {
        schema = csvSchema;
    } else if (type === 'json') {
        schema = jsonSchema;
    } else {
        schema = geoJSONFeatureCollectionSchema;
    }

    const validation = ajv.compile(schema);
    const valid = validation(content);
    if (!valid) {
        console.error(`Invalid ${type}: `, validation.errors);
        throw Error(`Upload error: please refer to our documentation for proper upload formatting.`);
    }

    return content;
}

const polygonSchema = {
  type: "array",
  items: {
    type: "array",
    items: {
      type: "array",
      minItems: 2,
      maxItems: 2,
      items: [
        {
          type: "number",
          minimum: -180,
          maximum: 180
        },
        {
          type: "number",
          minimum: -90,
          maximum: 90
        }
      ]
    },
    minItems: 4
  },
  minItems: 1
};

const multiPolygonSchema = {
  type: "array",
  items: polygonSchema,
  minItems: 1
}

const csvSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        _id: { type: "string" },
        geojson: {
        type: "object",
        properties: {
            type: { type: "string", enum: geoJsonTypeEnum },
            coordinates: {
                oneOf: [
                  polygonSchema,
                  multiPolygonSchema
                ]
            }
        },
        required: ["type", "coordinates"],
        additionalProperties: false
        },
        name: { type: "string" },
        description: { type: "string" },
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["geojson", "name"],
      additionalProperties: false
    }
}

const jsonSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        geojson: {
          type: "object",
          properties: {
            type: { type: "string", enum: geoJsonTypeEnum },
            coordinates: {
              oneOf: [
                polygonSchema,
                multiPolygonSchema
              ]
            }
          },
          required: ["type", "coordinates"],
          additionalProperties: false
        },
        name: { type: "string" },
        description: { type: "string" },
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["geojson", "name"],
      additionalProperties: false
    }
  };

  export const geoJSONFeatureSchema = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["Feature"] },
      geometry: {
        type: "object",
        properties: {
          type: { type: "string", enum: geoJsonTypeEnum },
          coordinates: {
            oneOf: [
              polygonSchema,
              multiPolygonSchema
            ]
          }
        },
        required: ["type", "coordinates"]
      },
      properties: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          tags: { type: "array", items: { type: "string" } }
        },
        required: ["name"],
        additionalProperties: false
      }
    },
    required: ["type", "geometry"],
    additionalProperties: false
  };

  export const geoJSONFeatureCollectionSchema = {
    type: "object",
    properties: {
      type: { type: "string", enum: ["FeatureCollection"] },
      features: {
        type: "array",
        items: geoJSONFeatureSchema
      }
    },
    required: ["type", "features"],
    additionalProperties: false
  };