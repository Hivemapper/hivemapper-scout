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
  const filteredFailures = Object.entries(failures).filter(([key, value]) => value > 0);
  let errorMessage = "Some locations failed to register: ";
  const last = filteredFailures.length - 1;
  let index = 0;
  filteredFailures.forEach(([key, value]) => {
    const formattedKey = camelCaseToTitle(key);
    errorMessage += `${formattedKey}: ${value}${index === last ? "" : ", "}`;
    index++;
  });

  return errorMessage;
}
