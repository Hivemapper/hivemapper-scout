export enum FilterTypes {
  DESCRIPTION = 'description',
  TAGS = 'tags',
  SEARCH = 'search',
}

export type FiltersState = {
  [FilterTypes.DESCRIPTION]: string;
  [FilterTypes.TAGS]: string[];
  [FilterTypes.SEARCH]: string;
}