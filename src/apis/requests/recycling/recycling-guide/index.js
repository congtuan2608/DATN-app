import { GetRecyclingGuide } from "./get-recycling-guide";

export function RecyclingGuide(params) {
  const getRecyclingGuide = GetRecyclingGuide();
  return { getRecyclingGuide };
}
