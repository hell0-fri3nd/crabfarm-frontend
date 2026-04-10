import type { SchedulerPayload } from "~/types/scheduler";
import api from "./api";
import type { ApiResponse } from "~/types";

export const postScheduler = async (data : SchedulerPayload): Promise<ApiResponse> => {
    try {
      let url = `controls/schedule`;
      const response = await api.post(url,data);
      return response.data;
    } catch (err: any) {
      throw err.response?.data;
    }
};