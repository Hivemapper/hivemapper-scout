import Ajv from "ajv";
const ajv = new Ajv();

export const validateCsv = (content: any) => {

}

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
        throw Error(validation.errors[0].message);
    }

    return content;
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
            type: { type: "string", enum: ["Polygon", "MultiPolygon"] },
            coordinates: {
                oneOf: [
                    // For Polygon
                    {
                    type: "array",
                    items: {
                        type: "array",
                        items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 }
                    },
                    minItems: 1
                    },
                    // For MultiPolygon
                    {
                    type: "array",
                    items: {
                        type: "array",
                        items: {
                        type: "array",
                        items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 }
                        },
                        minItems: 1
                    }
                    }
                ]
            }
        },
        required: ["type", "coordinates"],
        additionalProperties: false
        },
        name: { type: "string" },
        description: { type: "string" },
        tags: { type: "string" }
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
            type: { type: "string", enum: ["Polygon", "MultiPolygon"] },
            coordinates: {
              oneOf: [
                // For Polygon
                {
                  type: "array",
                  items: {
                    type: "array",
                    items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 }
                  },
                  minItems: 1
                },
                // For MultiPolygon
                {
                  type: "array",
                  items: {
                    type: "array",
                    items: {
                      type: "array",
                      items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 }
                    },
                    minItems: 1
                  }
                }
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
          type: { type: "string", enum: ["Polygon", "MultiPolygon"] },
          coordinates: {
            oneOf: [
              // For Polygon
              {
                type: "array",
                items: { type: "array", items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 } },
                minItems: 1
              },
              // For MultiPolygon
              {
                type: "array",
                items: {
                  type: "array",
                  items: { type: "array", items: { type: "array", items: { type: "number" }, minItems: 2, maxItems: 2 } },
                  minItems: 1
                }
              }
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