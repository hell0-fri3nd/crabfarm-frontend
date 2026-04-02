import type { ApiCrabResponse } from "~/types/crab";
import api from "./api";

export const postPredictedCrab = async (crabId: number): Promise<ApiCrabResponse> => {
  try {
    let url = `predictions/${crabId}`;
    const response = await api.post(url);
    return response.data;
  } catch (err: any) {
    throw err.response?.data;
  }
};