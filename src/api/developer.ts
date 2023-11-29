export const getImagesForPolygon = async (
  data: number[][][],
  day: string | null,
  encodedCredentials: string,
) => {
  try {
    const url = `https://hivemapper.com/api/developer/imagery/poly${
      day ? `?week=${day}` : ""
    }`;

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      redirect: "follow",
      body: JSON.stringify({
        coordinates: data,
        type: "Polygon",
      }),
    });
    return response.json();
  } catch (error) {
    return { error };
  }
};
