import api from "./api";
import type { ApiResponse } from "~/types";

export const postPredictedCrab = async (crabId: number): Promise<ApiResponse> => {
    try {
      let url = `predictions/${crabId}`;
      const response = await api.post(url);
      return response.data;
    } catch (err: any) {
      throw err.response?.data;
    }
};