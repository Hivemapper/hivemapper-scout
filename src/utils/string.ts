export const capitalizeFirstCharacter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelCaseToTitle = (str) => {
  const spaced = str.replace(/([A-Z])/g, ' $1');
  const capitalized = spaced.charAt(0).toUpperCase() + spaced.slice(1);
  return capitalized;
}

export const buildErrorMessage = (failures: Record<string, number>) => {
  let errorMessage = "Some locations failed to register: ";
  const last = Object.keys(failures).length - 1;
  let index = 0;
  for (const [key, value] of Object.entries(failures)) {
    const formattedKey = camelCaseToTitle(key);
    errorMessage += `${formattedKey}: ${value}${index === last ? "" : ", "}`;
    index++;
  }

  return errorMessage;
}
