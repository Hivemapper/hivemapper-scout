import { handleResponse } from "@utils/api";
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

    return await handleResponse(response, url);
  } catch (error) {
    if(error instanceof Error) {
      return { error: error.message };
    }
    
    return { error };
  }
};

export const createOrganization = async (
) => {
  try {
    const api = `https://hivemapper.com/api`;
    const route = `organization/create`;

    const url = `${api}/${route}`;

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      credentials: "include",
    });

    return await handleResponse(response, url);
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

    return await handleResponse(response, url);
  } catch (error) {
    if(error instanceof Error) {
      return { error: error.message };
    }
    
    return { error };
  }
};

