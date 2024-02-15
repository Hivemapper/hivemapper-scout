import { Frame, ScoutLocation } from "types/location";

export const getImagesForPolygon = async (
  location: ScoutLocation,
  day: string | null,
  encodedCredentials: string | null,
): Promise<{ frames: Frame[] } | { error: string }> => {
  try {
    const api = `https://hivemapper.com/api`;
    const forwarder = `forwarder`;
    const route = `developer/imagery/poly${day ? `?week=${day}` : ""}`;

    const url = encodedCredentials ? `${api}/${route}` : `${api}/${forwarder}`;

    const payload = {
      coordinates: location.searchShape ? location.searchShape.coordinates : location.geojson.coordinates,
      type: location.searchShape ? location.searchShape.type : location.geojson.type,
    };

    const forwarderPayload = {
      route,
      method: "POST",
      data: {
        coordinates: payload.coordinates,
        type: payload.type,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: encodedCredentials
          ? `Basic ${encodedCredentials}`
          : undefined,
      },
      redirect: "follow",
      body: JSON.stringify(encodedCredentials ? payload : forwarderPayload),
      credentials: !encodedCredentials ? "include" : undefined,
    });

    if (!response.ok) {
      throw new Error(`${response.status} while fetching ${url}`);
    }

    return response.json();
  } catch (error) {
    return { error };
  }
};
