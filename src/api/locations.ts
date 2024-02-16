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

    let json: any;

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/json')) {
        json = await response.json();
      }
  
      throw new Error(json?.error || `${response.status} while fetching ${url}`);
    }

    json = await response.json()
    return json;
  } catch (error) {
    if(error instanceof Error) {
      return { error: error.message };
    }
    
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

    let json: any;

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/json')) {
        json = await response.json();
      }
  
      throw new Error(json?.error || `${response.status} while fetching ${url}`);
    }

    json = await response.json()
    return json;
  } catch (error) {
    return { error };
  }
};
