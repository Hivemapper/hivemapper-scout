# Hivemapper Scout SDK
Scout is a UI Library for Geospatial Imagery Visualization. It enables users to input a dataset of locations and seamlessly integrate with Hivemapper to display associated geospatial imagery. Whether for urban planning, environmental monitoring, geographic research and more, Scout provides fresh geospacial imagery.

## Installation

npm:

```bash
npm install @hivemapper/scout
```

yarn:

```bash
yarn add @hivemapper/scout
```

pnpm:

```bash
pnpm add @hivemapper/scout
```

## Before Getting Started

Before using the Scout SDK, ensure you have the following:

- **Mapbox Access Token:** Necessary for map rendering and geospatial functionalities. Obtain it from [Mapbox](https://www.mapbox.com/).
- **Hivemapper Username:** Your unique username for logging into Hivemapper. Visit [Hivemapper Login](https://www.hivemapper.com/login).
- **Hivemapper API Key:** Essential for authenticating with the Hivemapper API. Generate this key on the [Hivemapper Developer Page](https://www.hivemapper.com/developer/map-image-api).

Having these elements ready is crucial for integrating with the Scout SDK.

## Locations Dataset Format

The locations dataset for Scout should be an array of `ScoutLocation` objects. Each `ScoutLocation` object has the following structure:

```typescript
export interface ScoutLocation {
  _id: string;             // Unique identifier
  geojson: {               // Geospatial data in GeoJSON format
    type: string;          // Type of GeoJSON object
    coordinates: number[][][]; // Coordinates array
  };
  name: string;            // Location name
  description?: string;    // Optional description
  tags?: string[];         // Optional array of tags
}
```

## Using the Demo

To use the Scout demo in your project, import it from the package:

```typescript
import { Demo } from '@hivemapper/scout';
```

After importing, you can integrate the Demo component into your application to explore its features and functionalities.

