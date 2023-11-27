# Hivemapper Scout
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

Before using Scout, ensure you have the following:

- **Mapbox Access Token:** Necessary for map rendering and geospatial functionalities. Obtain it from [Mapbox](https://www.mapbox.com/).
- **Hivemapper Username:** Your unique username for logging into Hivemapper. Visit [Hivemapper Login](https://www.hivemapper.com/login).
- **Hivemapper API Key:** Essential for authenticating with the Hivemapper API. Generate this key on the [Hivemapper Developer Page](https://www.hivemapper.com/developer/map-image-api).

## Locations Dataset Format

The locations dataset for Scout should be an array of `ScoutLocation` objects. Each `ScoutLocation` object has the following structure:

```typescript
export interface ScoutLocation {
  _id: string;             // Unique identifier
  geojson: {               // Geospatial data in GeoJSON format
    type: 'Polygon';          // Type of GeoJSON object
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
<details>
  <summary>Props</summary>

  ```typescript
  export interface DemoProps {
    locations: ScoutLocation[];
    mapAccessToken: string;
    apiKey: string;
    username: string;
    mapDefaultCoords?: LngLatLike; // Default center point of Map View
    mapStyle?: string; // Mapbox style for Map and Minimap components
    darkMode?: boolean; // Dark themed components (See Styles section)
    stripTailwindClasses?: boolean; // Option to strip out Tailwind CSS classes from DOM (See Styles section)
  }
  ```
</details>

After importing, you can integrate the Demo component into your application to explore its features and functionalities.

## Scout UI Components

Scout provides UI components which can be individually integrated into your application as needed.

<details>
  <summary>Location</summary>

  ```typescript
  export interface LocationProps {
    location: ScoutLocation;
    mapAccessToken: string;
    mapStyle?: string;
    username: string;
    apiKey: string;
    isFirstResult?: boolean;
  }
  ```
</details>
<details>
  <summary>Map</summary>
  
  ```typescript
  export interface MapProps {
    locations: ScoutLocation[];
    mapAccessToken: string;
    mapDefaultCoords?: LngLatLike;
    mapStyle?: string;
    selectionCallback?: (id: string | number) => void;
  }
  ```
</details>
<details>
  <summary>List</summary>
  
  ```typescript
  export interface ListProps {
    apiKey: string;
    username: string;
    locations: ScoutLocation[];
    itemsPerPage?: number;
    selectionCallback?: (id: string | number) => void;
  }
  ```
</details>

## Styles

The Scout UI library utilizes [Tailwind CSS](https://tailwindcss.com/) and [Shadcn](https://shadcn.com/) for styling. To use the default styles provided by Scout, import the CSS file from the package:

```typescript
import '@hivemapper/scout/index.css';
```

See the Config section for additional styling options.

## Config

The `Config` Higher Order Component in Scout allows for additional configuration options:

- `darkMode` (boolean): Enables the dark theme palette.
- `stripTailwindClasses` (boolean): Removes Tailwind CSS utility classes to avoid class name collisions.

Usage:

  ```typescript
  <Config darkMode>
    <Location {...props} />
  </Config>
  ```

## useConfig Hook

The `useConfig` hook provides a convenient way to access configuration settings within the scope of the `Config` Higher Order Component. This hook can be used throughout your application to retrieve and utilize the current configuration.

Example usage:

```typescript
// Component must be within the scope of the Config component
const { darkMode, stripTailwindClasses } = useConfig();
```
