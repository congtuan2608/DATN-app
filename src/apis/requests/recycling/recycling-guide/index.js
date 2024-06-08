import { GetRecyclingGuide } from "./get-recycling-guide";
import { SearchRecyclingGuide } from "./search-recycling-guide";

export function RecyclingGuide(params) {
  const getRecyclingGuide = GetRecyclingGuide();
  const searchRecyclingGuide = SearchRecyclingGuide();
  return { getRecyclingGuide, searchRecyclingGuide };
}
