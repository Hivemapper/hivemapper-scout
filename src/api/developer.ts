import { Coordinates } from "types/geojson";

export const getImagesForPolygon = async (
  type: "Polygon" | "MultiPolygon",
  data: Coordinates[] | Coordinates[][],
  day: string | null,
  encodedCredentials: string | null,
) => {
  try {
    const api = `https://hivemapper.com/api`;
    const forwarder = `forwarder`;
    const route = `developer/imagery/poly${day ? `?week=${day}` : ""}`;

    const url = encodedCredentials ? `${api}/${route}` : `${api}/${forwarder}`;

    const payload = {
      coordinates: data,
      type,
    };

    const forwarderPayload = {
      route,
      method: "POST",
      data: {
        coordinates: data,
        type,
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
    return response.json();
  } catch (error) {
    return { error };
  }
};
