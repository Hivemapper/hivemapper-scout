import maplibre, { AddLayerObject, LngLatLike, MapGeoJSONFeature, MapMouseEvent, Map as MlMap, ResourceType } from 'maplibre-gl';
import {
  isMapboxURL,
  transformMapboxUrl,
} from 'maplibregl-mapbox-request-transformer';
import { BoundEvents, EventKeys, EventTypes, InitializationParams, SourceOptions, SourceTypes } from 'types/map';

export const DEFAULT_MAP_COORDS = [-122.431297, 37.773972] as LngLatLike; // San Francisco

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
} & Object, eventKey: EventTypes, map: MlMap, clickCallback: (id: string | number) => void) => {
  switch (eventKey) {
    case EventTypes.CLICK:
      const { id } = e.features?.[0] || {};
      clickCallback && clickCallback(id);
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

export const handleBoundEvents = (map: MlMap, layer: string, clickCallback?: (id: string | number) => void) => {
  Object.keys(boundEvents).forEach((eventType) => {
    const eventKey = eventType as EventKeys;

    if (!boundEvents[eventKey][layer]) {
      boundEvents[eventKey][layer] = true;
  
      map.on(eventKey, layer, (e) => {
        triggerEvent(e, eventKey, map, clickCallback);
      });
    }
  });
}

export const clearStaticLayersAndSources = (map: MlMap, layerIds: string[], sourceIds: string[]) => {
  map.getStyle().layers.forEach((layer) => {
    layerIds.forEach((layerId) => {
      if (layer.id.includes(layerId)) {
        map.removeLayer(layer.id);
      }
    });
  });

  Object.keys(map.getStyle().sources).forEach((source) => {
    sourceIds.forEach((sourceId) => {
      if (source.includes(sourceId)) {
        map.removeSource(source);
      }
    });
  });
}

export const clearAllDynamicLayersAndSources = (map: MlMap, keyword: 'dynamic' | 'active') => {
  map.getStyle().layers.forEach((layer) => {
    if (layer.id.includes(keyword)) {
      map.removeLayer(layer.id);
    }
  });

  Object.keys(map.getStyle().sources).forEach((source) => {
    if (source.includes(keyword)) {
      map.removeSource(source);
    }
  });
};

export const createLayersAndSources = (map: MlMap, layerOptions: AddLayerObject[], sourceOptions: SourceOptions[]) => {
  sourceOptions.forEach((sourceOption) => {
    map.addSource(sourceOption.id, {
      type: sourceOption.options.type,
      data: sourceOption.options.data,
      promoteId: sourceOption.options.promoteId ? 'id' : undefined,
    })
  });

  layerOptions.forEach((layerOption) => {
    map.addLayer(layerOption);
  });
};

export const initializeMap = ({ mapContainer, mapDefaultCoords, onLoadCallback, mapStyle, zoom}: InitializationParams) => {
  const newMap = new maplibre.Map({
    container: mapContainer,
    style:
      mapStyle || "mapbox://styles/arielseidman/cln9moj49001l01ps0ptk99mp",
    center: mapDefaultCoords as LngLatLike,
    zoom: zoom || 12,
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

export const getBounds = (
  coords: [number, number][],
) : [LngLatLike, LngLatLike] => {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const [lng, lat] of coords) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  return [
    { lon: minLng, lat: minLat },
    { lon: maxLng, lat: maxLat },
  ];
}
