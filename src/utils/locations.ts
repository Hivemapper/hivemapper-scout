import { CSVLocation } from "types/location";

export const getLocationName = (location: CSVLocation) => {
    if (location.name) {
        return location.name;
    }

    if (location.type === "Address") {
        return location.coordinates;
    }

    return location.type || "Location Name Missing";
}