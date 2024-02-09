import { getMapAccessToken } from "@utils/map";
import { ScoutLocation } from "types/location";

export const registerLocations = async (
    locations: ScoutLocation[]
) => {
  try {
    const api = `https://hivemapper.com/api`;
    const route = `loi/register`;

    const url = `${api}/${route}`;

    const payload = {
      locations
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`${response.status} while fetching ${url}`);
    }

    return response.json();
  } catch (error) {
    return { error };
  }
};

export const getPointFromAddress = async (
    address: string
) => {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&access_token=${getMapAccessToken()}`

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`${response.status} while fetching ${url}`);
    }

    return response.json();
  } catch (error) {
    return { error };
  }
};
