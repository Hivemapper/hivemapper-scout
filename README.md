# Hivemapper Scout
Scout is a React UI Library for geospatial imagery visualization of Hivemapper's map data. It enables users to input a dataset of locations and seamlessly integrate with Hivemapper's Map Image API to display the associated imagery. Whether for urban planning, environmental monitoring, geographic research or other location tracking use cases, the Scout UI Library is the easiest way to plug into fresh geospatial imagery.

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
- **API Credits:** These are required to use Hivemapper APIs. Please [contact us](mailto:sales@hivemapper.com) and we will provide you some free credits to get started with Scout.


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
<details>
  <summary>Example dataset</summary>

  ```typescript
  import { ScoutLocation } from '@hivemapper/scout';

  const locations: ScoutLocation[] = [
    {
      _id: 'location_1',
      geojson: {
        type: 'Polygon',
        coordinates: [
          [
            [-97.74848379487175, 30.269797133209707],
            [-97.74825643127735, 30.269797133209707],
            [-97.74825643127735, 30.26940440211014],
            [-97.7486149661761, 30.269464822381238],
            [-97.74862371092993, 30.26963097793636], 
            [-97.74848379487175, 30.269797133209707],
          ],
        ],
      },
      name: '6th Street',
      description: 'Sewer excavation construction site',
      tags: ['sidewalk', 'bike path'],
    },
    {
      _id: 'location_2',
      geojson: {
        type: 'Polygon',
        coordinates: [
          [
            [-97.76030405541717, 30.29320863703245],
            [-97.75940735917186, 30.292273071825477],
            [-97.76007988135585, 30.290853576539803],
            [-97.76090185291376, 30.29182141646328],
            [-97.76030405541717, 30.29320863703245],
          ],
        ],
      },
      name: 'North Mopac Expressway',
      description: 'Overpass renovation site',
      tags: ['right lane'],
    },
  ]
  ```
</details>

## Styles

The Scout UI library utilizes [Tailwind CSS](https://tailwindcss.com/) and [Shadcn](https://shadcn.com/) for styling. To use the default styles provided by Scout, import the CSS file from the package into your app:

```typescript
import '@hivemapper/scout/index.css';
```

See the Config section for additional styling options.

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

```typescript
import { Location, Map, List } from '@hivemapper/scout';
```

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

Usage:

```typescript
// Component must be within the scope of the Config component
const { darkMode, stripTailwindClasses } = useConfig();
```
