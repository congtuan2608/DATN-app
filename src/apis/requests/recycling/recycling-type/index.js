import { GetRecyclingType } from "./get-recycling-type";

export function RecyclingType(params) {
  const getRecyclingType = GetRecyclingType();
  return { getRecyclingType };
}
