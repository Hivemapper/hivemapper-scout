import maplibre, { LngLatLike, MapGeoJSONFeature, MapMouseEvent, Map as MlMap, ResourceType } from 'maplibre-gl';
import {
  isMapboxURL,
  transformMapboxUrl,
} from 'maplibregl-mapbox-request-transformer';
import { ScoutLocation } from 'types/location';
import { BoundEvents, EventKeys, EventTypes } from 'types/map';

const GEOJSON_LAYER = "geojson_hm-layer";
const GEOJSON_STROKE_LAYER = "geojson_hm-stroke-layer";
const GEOJSON_SOURCE = "geojson_hm-source";

export let mapAccessToken: string = '';

export const setMapAccessToken = (accessToken: string) => {
  mapAccessToken = accessToken;
}

export const getMapAccessToken = () => {
  return mapAccessToken;
}

export const transformRequest = (
  url: string,
  resourceType?: ResourceType,
) => {
  if(!url ||  !resourceType) return;

  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, getMapAccessToken());
  }

  return { url };
};

const boundEvents: BoundEvents = {
  click: {},
  mouseenter: {},
  mouseleave: {},
};

const triggerEvent = (e: MapMouseEvent & {
  features?: MapGeoJSONFeature[] | undefined;
} & Object, eventKey: EventTypes, map: MlMap) => {
  switch (eventKey) {
    case EventTypes.CLICK:
      const { id } = e.features?.[0] || {};
      console.log("click", id);
      break;
    case EventTypes.MOUSE_ENTER:
      map.getCanvas().style.cursor = "pointer"
      break;
    case EventTypes.MOUSE_LEAVE:
      map.getCanvas().style.cursor = ""
      break;
    default:
      break;
  }
}

export const handleBoundEvents = (map: MlMap) => {
  Object.keys(boundEvents).forEach((eventType) => {
    const eventKey = eventType as EventKeys;

    if (!boundEvents[eventKey].GEOJSON_LAYER) {
      boundEvents[eventKey].GEOJSON_LAYER = true;
  
      map.on(eventKey, GEOJSON_LAYER, (e) => {
        triggerEvent(e, eventKey, map);
      });
    }
  });
}

export const clearAllLayersAndSources = (map: MlMap) => {
  map.getStyle().layers.forEach((layer) => {
    if (layer.id.includes(GEOJSON_LAYER) || layer.id.includes(GEOJSON_STROKE_LAYER)) {
      map.removeLayer(layer.id);
    }
  });

  Object.keys(map.getStyle().sources).forEach((source) => {
    if (source.includes(GEOJSON_SOURCE)) {
      map.removeSource(source);
    }
  });
}

export const createLayersAndSources = (map: MlMap, locations: ScoutLocation[]) => {
  const featureCollection = {
    type: "FeatureCollection",
    features: locations.map(location => ({
      type: "Feature",
      properties: {
        id: location._id,
      },
      geometry: location.geojson,
    })),
  };
  
  map.addSource(GEOJSON_SOURCE, {
    type: "geojson",
    data: featureCollection,
    promoteId: "id",
  });

  map.addLayer({
    id: GEOJSON_LAYER,
    type: "fill",
    source: GEOJSON_SOURCE,
    layout: {},
    paint: {
      "fill-color": "black",
      "fill-opacity": 0.5,
    },
  });

  map.addLayer({
    id: `geojson_hm-stroke`,
    type: "line",
    source: GEOJSON_SOURCE,
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 1,
    }
  });

  handleBoundEvents(map);
};

export const handleMapLayers = (map: MlMap, locations: ScoutLocation[]) => {
  clearAllLayersAndSources(map);
  createLayersAndSources(map, locations);
};

export const initializeMap = (mapContainer: HTMLDivElement, defaultCoords: LngLatLike, onLoadCallback: (newMap: MlMap) => void, mapStyle?: string, ) => {
  const newMap = new maplibre.Map({
    container: mapContainer,
    style:
      mapStyle || "mapbox://styles/arielseidman/cln9moj49001l01ps0ptk99mp",
    center: defaultCoords as LngLatLike,
    zoom: 12,
    transformRequest,
    maxPitch: 0,
  });
  
  const nav = new maplibre.NavigationControl({
    showCompass: false,
  });
  newMap.addControl(nav, "bottom-right");
  
  newMap.on("style.load", function () {
    onLoadCallback(newMap);
  });
  
  newMap.on("error", (e: any) => {
    console.warn("Map error: ", e);
  });
}      