import { handleResponse } from "@utils/api";
import { Frame, ScoutLocation } from "types/location";

export const getImagesForPolygon = async (
  location: ScoutLocation,
  day: string | null,
  encodedCredentials: string | null,
): Promise<{ frames: Frame[]; cost: number } | { error: string }> => {
  try {
    const api = process.env.API_ROOT ?? `https://hivemapper.com/api`;
    const forwarder = `forwarder`;
    const route = `developer/imagery/poly${day ? `?week=${day}` : ""}`;

    const url = encodedCredentials ? `${api}/${route}` : `${api}/${forwarder}`;

    const payload = {
      coordinates: location.geojson.coordinates,
      type: location.geojson.type,
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

    return await handleResponse(response, url);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error };
  }
};
