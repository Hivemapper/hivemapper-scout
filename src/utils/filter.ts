import { FiltersState } from "types/filter";
import { ScoutLocation } from "types/location";

export const filterLocations = (locations: ScoutLocation[], filters: FiltersState) => {
  return locations.filter((location) => {
    if (filters.tags.length > 0) {
      const hasTag = location.tags?.some((tag) =>
        filters.tags.includes(tag)
      );
      if (!hasTag) {
        return false;
      }
    }

    if (filters.description) {
      const hasDescription = location.description?.toLowerCase().includes(filters.description);
      if (!hasDescription) {
        return false;
      }
    }

    if (filters.search) {
      const hasSearch = location.description?.toLowerCase().includes(filters.search) || location.name?.toLowerCase().includes(filters.search) || location.tags?.some((tag) => tag.toLowerCase().includes(filters.search));
      if (!hasSearch) {
        return false;
      }
    }

    return true;
  });
}